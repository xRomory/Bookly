from django.shortcuts import render
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import BooklyUser
from .serializers import BooklyUserSerializer

# Create your views here.
@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'message': get_token(request)})

@api_view(['GET'])
def csrf_token_view(request):
    return Response({'detail': get_token(request)})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_me(request):
    serializer = BooklyUserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = BooklyUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': serializer.data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = BooklyUser.objects.all()
    serializer_class = BooklyUserSerializer
    permission_classes = [AllowAny]

class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                'user': BooklyUserSerializer(user).data,
                "token": token.key,
            })

        if user is None:
            print("Authentication Failed")
            raise AuthenticationFailed('Invalid email or Password')
        
        
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )