from django.shortcuts import render
from django.db import transaction
from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.views import APIView
from .models import BooklyBooking, BooklyTransaction
from bookly_rooms.models import BooklyRooms
from .serializers import (
    BooklyBookingSerializer, 
    BooklyTransactionSerializer, 
    BooklyBookingDetailsSerializer, 
    BooklyTransactionDetailsSerializer,
    AdminBookingListSerializer
)
from .utils import generate_temp_payment_token

class AdminBookingListView(generics.ListAPIView):
    queryset = BooklyBooking.objects.all()
    serializer_class = AdminBookingListSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return BooklyBooking.objects.all().order_by('-booking_date')
    
class AdminBookingActionView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            booking = BooklyBooking.objects.get(pk=pk)
        except BooklyBooking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        action = request.data.get('action')
        if action == 'cancel':
            if booking.booking_status == 'pending':
                booking.booking_status == 'cancelled'
                booking.save()
                return Response({'success': 'Booking Cancelled.'})
            else:
                return Response({'error': 'Only pending bookings can be cancelled.'}, status=status.HTTP_400_BAD_REQUEST)
        elif action == 'delete':
            if booking.booking_status in ['pending', 'cancelled']:
                booking.delete()
                return Response({'success': 'Booking deleted.'})
            else:
                return Response({'error': 'Only pending or cancelled bookings can be deleted.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)


class BookingCreateListView(generics.ListCreateAPIView):
    queryset = BooklyBooking.objects.all()
    serializer_class = BooklyBookingSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return BooklyBookingDetailsSerializer
        return BooklyBookingSerializer

    def get_queryset(self):
        user = self.request.user

        if not user.is_superuser and not user.is_staff:
            return BooklyBooking.objects.filter(user=user) or BooklyBooking.objects.none()
        return super().get_queryset()
    
    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise PermissionDenied("You must be logged in to book a room.")
        
        room_id = self.request.data.get('room')
        check_in = self.request.data.get('booking_check_in')
        check_out = self.request.data.get('booking_check_out')

        overlapping = BooklyBooking.objects.filter(
            room_id=room_id,
            booking_check_out__gt=check_in,
            booking_check_in__lt=check_out,
            booking_status__in=['confirmed', 'reserved']
        )

        if overlapping.exists():
            raise serializers.ValidationError("Room is already booked for these dates")
            
        
        booking = serializer.save(user=self.request.user)
        
        if hasattr(booking, "room") and booking.room:
            booking.room.status = "confirmed"
            booking.room.save()

    def post(self, request, *args, **kwargs):
        serializer = BooklyBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class BookingDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BooklyBooking.objects.all()
    serializer_class = BooklyBookingDetailsSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_superuser or user.is_staff:
            return super().get_queryset()
        return BooklyBooking.objects.filter(user=user)
    
    def perform_update(self, serializer):
        instance = self.get_object()

        if (serializer.validated_data.get('booking_status') == 'cancelled' and
            instance.booking_status == 'pending'):
            serializer.save()
        else:
            raise serializers.ValidationError("You can only cancel pending bookings")
        
    def perform_destroy(self, instance):
        if instance.booking_status != 'pending':
            raise serializers.ValidationError("You can only delete pending bookings")
        
        instance.delete()

    
    
class BookingCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            booking = BooklyBooking.objects.get(pk=pk, user=request.user)
            if booking.booking_status != 'pending':
                return Response({'error': 'Only pending bookings can be cancelled.'}, status=status.HTTP_400_BAD_REQUEST)
            booking.booking_status = 'cancelled'
            booking.save()
            return Response({'success': 'Booking Cancelled.'})
        except BooklyBooking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_400_BAD_REQUEST)
        
class CheckAvailabilityView(APIView):
    permission_classes = [AllowAny]

    def post (self, request):
        room_id = request.data.get('room_id')
        booking_check_in = request.data.get('booking_check_in')
        booking_check_out = request.data.get('booking_check_out')
        guest = int(request.data.get('guest', 1))

        if not (room_id and booking_check_in and booking_check_out):
            return Response({'error': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            room = BooklyRooms.objects.get(pk=room_id)
        except BooklyRooms.DoesNotExist:
            return Response({'error': 'Rooms not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        if guest > room.capacity:
            return Response({'available': False, 'reason': f'Room capacity exceeded (max {room.capacity})'}, status=status.HTTP_200_OK)
        
        overlapping = BooklyBooking.objects.filter(
            room=room,
            booking_check_out__gt=booking_check_in,
            booking_check_in__lt=booking_check_out,
            booking_status__in=['confirmed' 'reserved']
        )

        if overlapping.exists():
            return Response({'available': False, 'reason': 'Room is already booked for these dates.'}, status=status.HTTP_200_OK)
        
        return Response({'available': True}, status=status.HTTP_200_OK)
    
class CreateTransactionView(generics.CreateAPIView):
    queryset = BooklyTransaction.objects.all()
    serializer_class = BooklyTransactionSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            booking_id = request.data.get('booking_id')

            try:
                booking = BooklyBooking.objects.get(pk=booking_id, user=request.user)

                overlapping = BooklyBooking.objects.filter(
                    room=booking.room,
                    booking_check_out__gt=booking.booking_check_in,
                    booking_check_in__lt=booking.booking_check_out,
                    booking_status='confirmed'
                ).exclude(pk=booking_id)

                if overlapping.exists():
                    return Response(
                        {"error": "Room is already booked for these dates"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                BooklyBooking.objects.filter(
                    user=request.user,
                    room=booking.room,
                    booking_check_out__gt=booking.booking_check_in,
                    booking_check_in__lt=booking.booking_check_out,
                    booking_status='pending'
                ).exclude(pk=booking.pk).delete()

            except BooklyBooking.DoesNotExist:
                return Response(
                    {"error": "Booking not found or not owned by user"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            duration = (booking.booking_check_out - booking.booking_check_in).days

            if duration <= 0:
                return Response({'error': "Invalid booking duration"}, status=status.HTTP_400_BAD_REQUEST)

            total_amount = duration * booking.room.price_per_night

            payment_method = request.data.get('payment_method')
            payment_token = ""
            last_four_digits = ""

            if payment_method == 'card':
                card_number = request.data.get('card_number', '')
                if not card_number or len(card_number) < 4:
                    return Response({"error": "Invalid card details provided."}, status=status.HTTP_400_BAD_REQUEST)
                last_four_digits = card_number[-4:]

                payment_token = generate_temp_payment_token(last_four_digits)

            transaction_data = {
                'user': request.user.pk,
                'room': booking.room.pk,
                'booking': booking.pk,
                'payment_method': payment_method,
                'payment_token': payment_token,
                'last_four_digits': last_four_digits,
                'cash_amount': total_amount,
                'total_amount': total_amount,
            }

            serializer = self.get_serializer(data=transaction_data)
            serializer.is_valid(raise_exception=True)
            transaction = serializer.save(is_successful=True)

            booking.booking_status = 'confirmed'
            booking.save()

            BooklyBooking.objects.filter(
                room=booking.room,
                booking_check_out__gt=booking.booking_check_in,
                booking_check_in__lt=booking.booking_check_out,
                    booking_status='pending'
            ).exclude(pk=booking.pk).delete()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class TransactionDetailsView(generics.RetrieveAPIView):
    queryset = BooklyTransaction.objects.all()
    serializer_class = BooklyTransactionDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return self.queryset 
        return self.queryset.filter(user=user)
    
class TransactionByBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, booking_id):
        print(f"Attempting to fetch transaction for booking {booking_id}") 
        try:
            if request.user.is_staff or request.user.is_superuser:
                transaction = BooklyTransaction.objects.get(booking_id=booking_id)
            else:
                transaction = BooklyTransaction.objects.get(
                    booking_id=booking_id, 
                    user=request.user
                )
            serializer = BooklyTransactionDetailsSerializer(transaction, context={'request': request})
            return Response(serializer.data)
        except BooklyTransaction.DoesNotExist:
            return Response({"error": "Transaction not found."}, status=status.HTTP_400_BAD_REQUEST)