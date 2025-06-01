from django.urls import path
from .views import RegisterView, Login, Logout, get_csrf, register_user, csrf_token_view, get_me

urlpatterns = [
    path('csrf/', get_csrf, name='get_csrf'),
    path('csrf/token/', csrf_token_view, name="csrf_token"),
    path('register/', RegisterView.as_view(), name='register'),
    path('register-user/', register_user, name='register_user'),
    path('register-cbv/', RegisterView.as_view(), name='register_cbv'),
    path('me/', get_me, name='get_me'),
    path('auth/login/', Login.as_view(), name='login'),
    path('auth/logout/', Logout.as_view(), name='logout'),
]