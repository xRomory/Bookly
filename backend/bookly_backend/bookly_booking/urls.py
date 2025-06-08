from django.urls import path
from .views import BookingDetailsView, BookingCreateListView, CreateTransactionView, TransactionDetailsView

urlpatterns = [
    path('room-booking/', BookingCreateListView.as_view(), name='create_booking'),
    path('room-booking/<int:pk>/', BookingDetailsView.as_view(), name='booking_details'),
    path('transaction/', CreateTransactionView.as_view(), name='transaction_list'),
    path('transaction/<int:pk>/', TransactionDetailsView.as_view(), name='transaction_details'),

]