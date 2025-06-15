from django.shortcuts import render
from django.core.paginator import Paginator
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import PermissionDenied
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from bookly_property.models import BooklyProperty
from .models import BooklyRooms
from .serializers import BooklyRoomSerializer, BooklyRoomCreateSerializer, RoomUpdateSerializer

# Create your views here.
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'rooms': reverse('room-list', request=request, format=format)
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_rooms(request):
    rooms = BooklyRooms.objects.all()
    serializer = BooklyRoomSerializer(rooms, many=True)
    return Response(serializer.data)

class RoomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100
    django_paginator_class = Paginator

class BooklyRoomList(generics.ListCreateAPIView):
    queryset = BooklyRooms.objects.all()
    serializer_class = BooklyRoomSerializer
    pagination_class = RoomPagination
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = BooklyRooms.objects.select_related('property').all()
        property_id = self.request.query_params.get('property')
        if property_id:
            queryset = queryset.filter(property_id=property_id)
        return queryset

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BooklyRoomCreateSerializer
        return BooklyRoomSerializer
    
    def perform_create(self, serializer):
        property_id = self.request.data.get('property')
        property = BooklyProperty.objects.get(pk=property_id)
        if property.user != self.request.user:
            raise PermissionDenied("You can only add rooms to your own properties")
        serializer.save()

class IsPropertyOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.property.user == request.user

class BooklyRoomDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = BooklyRooms.objects.select_related('property__user').all()
    serializer_class = BooklyRoomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsPropertyOwnerOrReadOnly]
    lookup_field = 'room_id'

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return RoomUpdateSerializer
        return BooklyRoomSerializer