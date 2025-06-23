from rest_framework import serializers
from .models import PropertyImage, BooklyProperty, CityProvince, Region
from bookly_user.serializers import BooklyUserSerializer

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_primary', 'uploaded_at']

class BooklyPropertyCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    property_logo = serializers.ImageField(required=False)

    class Meta:
        model = BooklyProperty
        fields = [
            'property_name',
            'property_logo',
            'address',
            'property_description',
            'latitude',
            'longitude',
            'contact_number',
            'category',
            'images',
        ]
    
    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        user = self.context['request'].user
        property_instance = BooklyProperty.objects.create(user=user, **validated_data)

        for img in images_data:
            PropertyImage.objects.create(property=property_instance, image=img)

        return property_instance

class BooklyPropertySerializers(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    property_logo_url = serializers.SerializerMethodField()

    def get_property_logo_url(self, obj):
        if obj.property_logo:
            return self.context['request'].build_absolute_uri(obj.property_logo.url)
        return None

    class Meta:
        model = BooklyProperty
        fields = [
            'property_id',
            'user',
            'property_name',
            'property_logo_url',
            'address',
            'property_description',
            'latitude',
            'longitude',
            'contact_number',
            'category',
            'images',
        ]

class PropertyOwnerSerializers(serializers.ModelSerializer):
    owner = BooklyUserSerializer(source='user', read_only=True)
    property_logo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = BooklyProperty
        fields = [
            'property_logo_url',
            'address',
            'contact_number',
            'owner',
            'property_name',
        ]

    def get_property_logo_url(self, obj):
        if obj.property_logo:
            return self.context['request'].build_absolute_uri(obj.property_logo.url)
        return None
    
class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = [
            'id',
            'name'
        ]
    
class CityProvinceSerializer(serializers.ModelSerializer):
    region_name = serializers.CharField(source='region.name', read_only=True)

    class Meta:
        model = CityProvince
        fields = [
            'id',
            'name',
            'region',
            'region_name',
        ]