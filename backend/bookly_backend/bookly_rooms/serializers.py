from rest_framework import serializers
from .models import BooklyRooms, RoomImage
from bookly_property.serializers import BooklyPropertySerializers, PropertyOwnerSerializers

class RoomImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = RoomImage
        fields = ['id', 'image', 'is_primary', 'uploaded_at']

class BooklyRoomCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = BooklyRooms
        fields = [
            'property',
            'room_name',
            'room_type',
            'room_description',
            'price_per_night',
            'room_image',
            'amenities',
            'room_status',
            'capacity',
            'images',
        ]
        extra_kwargs = {
            'property': {'required': True},
            'room_image': {'required': True},
        }

    def validate_property(self, value):
        request = self.context['request']
        if value.user != request.user:
            raise serializers.ValidationError("You can only add rooms to your own property.")
        return value
    
    def validate_amenities(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Amenities must be a list")
        return value

    def validate_property(self, value):
        request = self.context['request']
        if value.user != request.user:
            raise serializers.ValidationError("You can only add rooms to your own property.")
        return value
    
    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        room = BooklyRooms.objects.create(**validated_data)

        if images_data and not validated_data.get('room_image'):
            room.room_image = images_data[0]
            room.save()

        for image in images_data:
            RoomImage.objects.create(room=room, image=image)
        return room

class BooklyRoomSerializer(serializers.ModelSerializer):
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