from django.shortcuts import render
from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from .models import BooklyBooking, BooklyTransaction
from .serializers import BooklyBookingSerializer, BooklyTransactionSerializer
from bookly_rooms.models import BooklyRooms
from bookly_user.models import BooklyUser


# Create your views here.
class CreateBookingView(generics.CreateAPIView):
    queryset = BooklyBooking.objects.all()
    serializer_class = BooklyBookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                room_id = request.data.get('room_id')
                try:
                    room = BooklyRooms.objects.get(pk=room_id)
                except BooklyRooms.DoesNotExist:
                    return Response(
                        {"error": "Room not found"}, 
                        status=status.HTTP_404_NOT_FOUND
                    )

                user_id = request.data.get('user_id')
                if user_id:
                    try:
                        user = BooklyUser.objects.get(pk=user_id)
                    except BooklyUser.DoesNotExist:
                        return Response(
                            {"error": "User not found"},
                            status=status.HTTP_404_NOT_FOUND
                        )
                else:
                    user = request.user

                try:
                    check_in = datetime.strptime(request.data.get('check_in_date'), '%Y-%m-%d').date()
                    check_out = datetime.strptime(request.data.get('check_out_date'), '%Y-%m-%d').date()
                except (ValueError, TypeError):
                    return Response(
                        {"error": "Invalid date format. Use YYYY-MM-DD"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )

                overlapping_bookings = BooklyBooking.objects.filter(
                    room=room,
                    booking_check_out__gt=check_in,
                    booking_check_in__lt=check_out,
                ).exclude(booking_status='cancelled')

                if overlapping_bookings.exists():
                    return Response(
                        {"error": "Room is not available for the selected dates"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                booking_data = {
                    'user': user.pk,
                    'room': room.pk,
                    'booking_date': timezone.now().date(),
                    'booking_check_in': check_in,
                    'booking_check_out': check_out,
                    'guest': request.data.get('guests', 1),
                    'booking_status': 'pending',
                    'first_name': request.data.get('first_name', user.first_name),
                    'last_name': request.data.get('last_name', user.last_name),
                    'email': request.data.get('email', user.email),
                    'contact_number': request.data.get('contact_number', user.contact_number),
                }

                serializer = self.get_serializer(data=booking_data)
                serializer.is_valid(raise_exception=True)
                booking = serializer.save()
                

                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class BookingDetailsView(generics.RetrieveAPIView):
    queryset = BooklyBooking.objects.all()
    serializer_class = BooklyBookingSerializer
    lookup_field = 'booking_id'

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
class CreateTransactionView(generics.CreateAPIView):
    queryset = BooklyTransaction.objects.all()
    serializer_class = BooklyTransactionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        try:
            booking_id = request.data.get('booking_id')

            try:
                booking = BooklyBooking.objects.get(pk=booking_id, user=request.user)
            except BooklyBooking.DoesNotExist:
                return Response(
                    {"error": "Booking not found or not owned by user"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            duration = (booking.booking_check_out - booking.booking_check_in).days
            total_amount = duration * booking.room.price_per_night

            transaction_data = {
                'user': request.user.pk,
                'room': booking.room.pk,
                'booking': booking.pk,
                'payment_method': request.data.get('payment_method'),
                'payment_token': request.data.get('payment_token'),
            }
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )