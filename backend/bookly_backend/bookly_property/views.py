from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import BooklyProperty, PropertyImage
from .serializers import BooklyPropertySerializers

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_property(request):
    properties = BooklyProperty.objects.all()
    serializer = BooklyPropertySerializers(properties, many=True, context={'request': request})
    return Response(serializer.data)

class BooklyPropertyList(generics.ListAPIView):
    queryset = BooklyProperty.objects.filter(
        is_approved=True,
        latitude__isnull = False,
        longitude__isnull = False
    ).select_related('user').prefetch_related('images')
    serializer_class = BooklyPropertySerializers

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context