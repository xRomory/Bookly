from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from .models import BooklyProperty, CityProvince, Region, PropertyImage
from .serializers import BooklyPropertySerializers, BooklyPropertyCreateSerializer, CityProvinceSerializer, RegionSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_property(request):
    properties = BooklyProperty.objects.all()
    serializer = BooklyPropertySerializers(properties, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def city_autocomplete(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return Response([])
    
    cities = CityProvince.objects.filter(name__icontains=query).select_related('region')[:10]
    serializer = CityProvinceSerializer(cities, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def region_autocomplete(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return Response([])
    regions = Region.objects.filter(name__icontains=query)[:10]
    serializer = RegionSerializer(regions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cities_by_region(request, region_id):
    cities = CityProvince.objects.filter(region_id=region_id)
    serializer = CityProvinceSerializer(cities, many=True)
    return Response(serializer.data)

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        if request.user.is_staff or request.user.is_superuser:
            return True
        
        return obj.user == request.user
    
class BooklyPropertyDeleteView(generics.DestroyAPIView):
    queryset = BooklyProperty.objects.all()
    serializer_class = BooklyPropertySerializers
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    lookup_field = 'property_id'

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
    
class BooklyPropertyDetail(generics.RetrieveAPIView):
    queryset = BooklyProperty.objects.all().select_related('user').prefetch_related('images')
    serializer_class = BooklyPropertySerializers

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
class BooklyPropertyCreateView(generics.CreateAPIView):
    queryset = BooklyProperty.objects.all()
    serializer_class = BooklyPropertyCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
class MyPropertyList(generics.ListAPIView):
    serializer_class = BooklyPropertySerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.is_staff or user.is_superuser:
            return BooklyProperty.objects.all().select_related('user').prefetch_related('images')
        return BooklyProperty.objects.filter(user=user).select_related('user').prefetch_related('images')
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context