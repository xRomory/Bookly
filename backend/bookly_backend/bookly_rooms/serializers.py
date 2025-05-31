from rest_framework import serializers
from .models import BooklyRooms, RoomImage

class RoomImageSerializers(serializers.ModelSerializer):
    bookly_room = serializers.HyperlinkedRelatedField(
        view_name = 'room-detail',
        query_set = BooklyRooms.objects.all(),
    )

    class Meta:
        model = RoomImage
        fields = ['id', 'image', 'is_primary', 'uploaded_at',]

class BooklyRoomSerializers(serializers.ModelSerializer):
    images = RoomImageSerializers(many=True, read_only=True)
    class Meta:
        model = BooklyRooms
        fields = '__all__'