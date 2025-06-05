from rest_framework import serializers
from .models import BooklyBooking, BooklyTransaction

class BooklyBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BooklyBooking
        fields = [
            'booking_id',
            'user',
            'room',
            'booking_date',
            'booking_check_in',
            'booking_check_out',
            'booking_status',
            'guest',
        ]

class BooklyTransactionSerializer(serializers.ModelSerializer):
    booking_details = BooklyBookingSerializer(source='booking', read_only=True)

    class Meta:
        model = BooklyTransaction
        fields = [
            'transaction_id',
            'user',
            'room',
            'booking',
            'booking_details',
            'payment_method',
            'payment_token',
            'last_four_digits',
            'cash_amount',
            'total_amount',
            'transaction_date',
            'is_successful',
        ]