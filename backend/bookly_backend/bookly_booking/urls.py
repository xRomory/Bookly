from django.urls import path
from .views import BookingDetailsView, BookingCreateListView

urlpatterns = [
    path('room-booking/', BookingCreateListView.as_view(), name='create_booking'),
    path('room-booking/<int:pk>/', BookingDetailsView.as_view(), name='booking_details')
]