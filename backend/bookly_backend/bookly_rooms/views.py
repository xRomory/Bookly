from django.shortcuts import render
from django.core.paginator import Paginator
from rest_framework import generics, permissions, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.exceptions import ValidationError

from .models import BooklyRooms, RoomImage
from .serializers import BooklyRoomSerializers, RoomImageSerializers

from bookly_property.models import BooklyProperty
from bookly_property.serializers import BooklyPropertySerializers


#  Room Image Upload View
class RoomImageUploadView(generics.CreateAPIView):
    serializer_class = RoomImageSerializers
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        room = serializer.validated_data.get('room')
        if room.property.user != self.request.user:
            raise ValidationError("You can only upload images for your own room.")
        serializer.save()


#  Room Create View with Property Ownership Check
class BooklyRoomCreateView(generics.CreateAPIView):
    serializer_class = BooklyRoomSerializers
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        property = serializer.validated_data.get('property')
        if property.user != self.request.user:
            raise serializers.ValidationError("You can only add rooms to your own properties.")
        serializer.save()


#  DRF Root View
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'rooms': reverse('room-list', request=request, format=format)
    })


#  Public Room List (no auth)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_rooms(request):
    rooms = BooklyRooms.objects.all()
    serializer = BooklyRoomSerializers(rooms, many=True, context={'request': request})
    return Response(serializer.data)


#  Pagination Class
class RoomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    django_paginator_class = Paginator


#  Room List (Filtered by User + Property)
class BooklyRoomList(generics.ListCreateAPIView):
    serializer_class = BooklyRoomSerializers
    pagination_class = RoomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = BooklyRooms.objects.all()

        if self.request.user.is_authenticated:
            qs = qs.filter(property__user=self.request.user)

        property_id = self.request.query_params.get('property_id')
        if property_id:
            qs = qs.filter(property__property_id=property_id)

        return qs


#  Room Detail View
class BooklyRoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BooklyRooms.objects.select_related('property__user').all()
    serializer_class = BooklyRoomSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'room_id'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# Grouped Property + Room Listing per User 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_property_listing(request):
    properties = BooklyProperty.objects.filter(user=request.user).prefetch_related('rooms')
    data = []

    for prop in properties:
        prop_data = BooklyPropertySerializers(prop, context={'request': request}).data
        rooms = BooklyRoomSerializers(prop.rooms.all(), many=True, context={'request': request}).data
        prop_data['rooms'] = rooms
        data.append(prop_data)

    return Response(data)
