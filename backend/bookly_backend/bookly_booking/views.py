from django.shortcuts import render
from django.db import transaction
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.utils import timezone
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from .models import BooklyBooking, BooklyTransaction
from .serializers import BooklyBookingSerializer, BooklyTransactionSerializer, BooklyBookingDetailsSerializer

class BookingCreateListView(generics.ListCreateAPIView):
    queryset = BooklyBooking.objects.all()
    serializer_class = BooklyBookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if not user.is_superuser and not user.is_staff:
            return BooklyBooking.objects.filter(user=user) or BooklyBooking.objects.none()
        return super().get_queryset()
    
    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise PermissionDenied("You must be logged in to book a room.")
        
        booking = serializer.save(user=self.request.user)
        if hasattr(booking, "room") and booking.room:
            booking.room.status = "confirmed"
            booking.room.save()

    def post(self, request, *args, **kwargs):
        serializer = BooklyBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            print(serializer.errors) 
            return Response(serializer.errors, status=400)

        
class BookingDetailsView(generics.RetrieveAPIView):
    queryset = BooklyBooking.objects.all()
    serializer_class = BooklyBookingDetailsSerializer
    lookup_field = 'pk'

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

            if duration <= 0:
                return Response({'error': "Invalid booking duration"}, status=status.HTTP_400_BAD_REQUEST)

            total_amount = duration * booking.room.price_per_night

            transaction_data = {
                'user': request.user.pk,
                'room': booking.room.pk,
                'booking': booking.pk,
                'payment_method': request.data.get('payment_method'),
                'payment_token': request.data.get('payment_token', ''),
                'last_four_digits': request.data.get('last_four_digits', ''),
                'cash_amount': total_amount,
                'total_amount': total_amount,
            }

            serializer = self.get_serializer(data=transaction_data)
            serializer.is_valid(raise_exception=True)
            transaction = serializer.save(is_successful=True)

            booking.booking_status = 'confirmed'
            booking.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )