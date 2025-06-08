from rest_framework import serializers
from .models import BooklyBooking, BooklyTransaction
from bookly_rooms.serializers import BooklyRoomSerializers
from bookly_property.serializers import BooklyPropertySerializers
from bookly_user.serializers import BooklyUserSerializer

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
            'guest_first_name',
            'guest_last_name',
            'guest_email',
            'guest_contact_number',
        ]
    
class BooklyBookingDetailsSerializer(serializers.ModelSerializer):
    user = BooklyUserSerializer(read_only=True)
    room = BooklyRoomSerializers(read_only=True)
    property_details = BooklyPropertySerializers(source='room.property_details', read_only=True)

    booking_check_in = serializers.SerializerMethodField()
    booking_check_out = serializers.SerializerMethodField()

    class Meta:
        model = BooklyBooking
        fields = [
            'booking_id',
            'user',
            'room',
            'property_details',
            'booking_date',
            'booking_check_in',
            'booking_check_out',
            'booking_status',
            'guest',
            'guest_first_name',
            'guest_last_name',
            'guest_email',
            'guest_contact_number',
        ]

    def get_booking_check_in(self, obj):
        return obj.booking_check_in.strftime('%Y-%m-%d')
    
    def get_booking_check_out(self, obj):
        return obj.booking_check_out.strftime('%Y-%m-%d')

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