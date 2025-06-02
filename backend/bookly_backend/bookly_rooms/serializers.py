from rest_framework import serializers
from .models import BooklyRooms, RoomImage
from bookly_property.serializers import BooklyPropertySerializers, PropertyOwnerSerializers

class RoomImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = ['id', 'image', 'is_primary', 'uploaded_at']

class BooklyRoomSerializers(serializers.ModelSerializer):
    images = RoomImageSerializers(many=True, read_only=True)
    main_image = serializers.SerializerMethodField()

    owner = PropertyOwnerSerializers(source='property', read_only=True)
    property_details = BooklyPropertySerializers(source='property', read_only=True)

    def get_main_image(self, obj):
        if obj.room_image:
            return self.context['request'].build_absolute_uri(obj.room_image.url)
        return None

    class Meta:
        model = BooklyRooms
        fields = [
            'room_id',
            'property',
            'property_details',
            'owner',
            'room_name', 
            'room_type',
            'room_description',
            'price_per_night',
            'amenities',
            'room_status',
            'capacity',
            'images',
            'main_image',
        ]