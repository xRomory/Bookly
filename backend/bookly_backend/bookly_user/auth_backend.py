from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password

class EmailBackend(ModelBackend):
    def authenticate(self, request, username = None, password = None, **kwargs):
        BooklyUserModel = get_user_model()

        try:
            user = BooklyUserModel.objects.get(email=username)
            if user and check_password(password, user.password):
                return user

        except BooklyUserModel.DoesNotExist:
            return None
        return None