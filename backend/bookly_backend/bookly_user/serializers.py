from rest_framework import serializers
from .models import BooklyUser

class BooklyUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    if_property_owner = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = BooklyUser
        fields = [
            'user_id', 'first_name', 'last_name', 'email', 'contact_number', 'password', 'if_property_owner',
        ]

        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = BooklyUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            contact_number=validated_data.get('contact_number', ''),
            if_property_owner=validated_data.get('if_property_owner', False)
        )

        return user

class BooklyUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BooklyUser
        fields = ['first_name', 'last_name', 'contact_number']
