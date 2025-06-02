from django.shortcuts import render
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