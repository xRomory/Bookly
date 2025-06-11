from django.urls import path
from .views import (
    RegisterView,
    Login,
    Logout,
    get_csrf,
    register_user,
    csrf_token_view,
    get_me,
    UpdateProfileView,
)

urlpatterns = [
    # CSRF
    path('csrf/', get_csrf, name='get_csrf'),
    path('csrf/token/', csrf_token_view, name="csrf_token"),

    # Registration
    path('register/', RegisterView.as_view(), name='register_cbv'),
    path('register-user/', register_user, name='register_user'),  # function-based version

    # Auth
    path('auth/login/', Login.as_view(), name='login'),
    path('auth/logout/', Logout.as_view(), name='logout'),

    # User Profile
    path('me/', get_me, name='get_me'),
    path('me/update/', UpdateProfileView.as_view(), name='update_profile'),
]
