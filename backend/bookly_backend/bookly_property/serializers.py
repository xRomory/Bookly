from rest_framework import serializers
from .models import PropertyImage, BooklyProperty

# class PropertyImage(serializers.ModelSerializer):

class BooklyPropertySerializers(serializers.ModelSerializer):
    class Meta:
        model = BooklyProperty
        fields = '__all__'