from rest_framework import serializers
from .models import PropertyImage, BooklyProperty
from bookly_user.serializers import BooklyUserSerializer

# class PropertyImage(serializers.ModelSerializer):

class BooklyPropertySerializers(serializers.ModelSerializer):
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