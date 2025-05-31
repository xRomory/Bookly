from django.db import models
from django.conf import settings
from bookly_rooms.models import BooklyRooms
from bookly_user.models import BooklyUser

# Create your models here.
class BooklyBooking(models.Model):
    BOOKING_STATUSES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('reserved', 'Reserved'),
    )

    booking_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(BooklyUser, on_delete=models.CASCADE, related_name='bookings')
    room = models.ForeignKey(BooklyRooms, on_delete=models.CASCADE, related_name='bookings')
    booking_date = models.DateField()
    booking_check_in = models.DateTimeField()
    booking_check_out = models.DateTimeField()
    booking_status = models.CharField(max_length=20, choices=BOOKING_STATUSES, default='pending')
    guest = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Booking #{self.booking_id} - {self.user}: {self.booking_status}"
    
class BooklyTransaction(models.Model):
    PAYMENT_METHODS = (
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('cash', 'Cash Payment'),
        ('gcash', 'GCash'),
        ('paymaya', 'Paymaya'),
    )

    transaction_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(BooklyUser, on_delete=models.CASCADE, related_name='transactions')
    room = models.ForeignKey(BooklyRooms, on_delete=models.CASCADE)
    booking = models.ForeignKey(BooklyBooking, on_delete=models.CASCADE, related_name='transactions')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)

    payment_token = models.CharField(max_length=100, blank=True)
    last_four_digits = models.CharField(max_length=4, blank=True)

    cash_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    is_successful = models.BooleanField(default=False)

    def __str__(self):
        return f"Transaction #{self.transaction_id} - {self.get_payment_method_display()}"