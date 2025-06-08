from django.db import models
from bookly_rooms.models import BooklyRooms
from bookly_user.models import BooklyUser
from .utils import generate_reference_number

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
    guest_first_name = models.CharField(max_length=100, blank=True, null=True)
    guest_last_name = models.CharField(max_length=100, blank=True, null=True)
    guest_email = models.EmailField(blank=True, null=True)
    guest_contact_number = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        ordering = ['-booking_date']
        constraints = [
            models.UniqueConstraint(
                fields=['room', 'booking_check_in', 'booking_check_out'],
                name='unique_booking_per_room_dates',
                condition=models.Q(booking_status__in=['confirmed', 'pending', 'reserved']),
            )
        ]

    def __str__(self):
        return f"Booking #{self.booking_id} - {self.user}: {self.booking_status}"
    
    @property
    def duration(self):
        return(self.booking_check_out - self.booking_check_in).days
    
    @property
    def total_amount(self):
        return self.duration * self.room.price_per_night
    
    def clean(self):
        from django.core.exceptions import ValidationError

        if self.booking_check_in >= self.booking_check_out:
            raise ValidationError("Check-out date must be after check-in data")
        
        if self.guest > self.room.capacity:
            raise ValidationError(f"Room capacity exceeded (max {self.room.capacity})")
        
        overlapping = BooklyBooking.objects.filter(
            room=self.room,
            booking_check_out__gt=self.booking_check_in,
            booking_check_in__lt=self.booking_check_out,
            booking_status__in=['confirmed', 'pending', 'reserved'],
        ).exclude(booking_id=self.pk)
        
        if overlapping.exists():
            raise ValidationError("Room is already booked for these dates")
        
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
    
    
class BooklyTransaction(models.Model):
    PAYMENT_METHODS = (
        ('card', 'Card Payment'),
        ('cash', 'Cash Payment'),
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

    reference_number = models.CharField(max_length=20, unique=True, blank=True)

    def __str__(self):
        return f"Transaction #{self.transaction_id} - {self.get_payment_method_display()}"
    
    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = generate_reference_number()
        super().save(*args, **kwargs)