from django.shortcuts import render
from django.core.paginator import Paginator
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import BooklyRooms

from .serializers import BooklyRoomSerializers
from .models import RoomImage, BooklyRooms
from .serializers import RoomImageSerializers
from rest_framework.exceptions import ValidationError

class RoomImageUploadView(generics.CreateAPIView):
    serializer_class = RoomImageSerializers
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        room = serializer.validated_data.get('room')
        if room.property.user != self.request.user:
            raise ValidationError("You can only upload images for your own room.")
        serializer.save()
        
class BooklyRoomCreateView(generics.CreateAPIView):
    serializer_class = BooklyRoomSerializers
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        property = serializer.validated_data.get('property')
        if property.user != self.request.user:
            raise serializers.ValidationError("You can only add rooms to your own properties.")
        serializer.save()

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'rooms': reverse('room-list', request=request, format=format)
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_rooms(request):
    rooms = BooklyRooms.objects.all()
    serializer = BooklyRoomSerializers(rooms, many=True)
    return Response(serializer.data)

class RoomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    django_paginator_class = Paginator

class BooklyRoomList(generics.ListCreateAPIView):
    queryset = BooklyRooms.objects.all()
    serializer_class = BooklyRoomSerializers
    pagination_class = RoomPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BooklyRoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BooklyRooms.objects.select_related('property__user').all()
    serializer_class = BooklyRoomSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'room_id'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
