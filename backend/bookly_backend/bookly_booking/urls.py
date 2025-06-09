from django.urls import path
from .views import BookingDetailsView, BookingCreateListView, BookingCancelView, CreateTransactionView, TransactionDetailsView, TransactionByBookingView

urlpatterns = [
    path('room-booking/', BookingCreateListView.as_view(), name='create_booking'),
    path('room-booking/<int:pk>/', BookingDetailsView.as_view(), name='booking_details'),
    path('room-booking/<int:pk>/cancel/', BookingCancelView.as_view(), name='booking_cancel'),
    path('transaction/', CreateTransactionView.as_view(), name='transaction_list'),
    path('transaction/<int:pk>/', TransactionDetailsView.as_view(), name='transaction_details'),
    path('transaction/by-booking/<int:booking_id>/', TransactionByBookingView.as_view(), name='transaction_by_booking'),
]