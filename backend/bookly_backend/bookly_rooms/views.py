from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import BooklyRooms
from .serializers import BooklyRoomSerializers

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
    serializer = BooklyRoomSerializers(rooms, many=True)
    return Response(serializer.data)

class BooklyRoomList(generics.ListCreateAPIView):
    queryset = BooklyRooms.objects.all()
    serializer_class = BooklyRoomSerializers
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