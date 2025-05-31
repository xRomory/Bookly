from django.db import models
from bookly_property.models import BooklyProperty
from django.core.validators import MinValueValidator

# Create your models here.
class BooklyRooms(models.Model):
    ROOM_TYPES = [
        ('hotel', 'Hotel'),
        ('apartment', 'Apartment'),
        ('suite', 'Suite'),
        ('motel', 'Motel'),
        ('villa', 'Villa'),
        ('resort', 'Resort'),
        ('lodge', 'Lodge'),
        ('inn', 'Inn'),
    ]

    ROOM_STATUSES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('occupied', 'Occupied'),
    ]

    room_id = models.AutoField(primary_key=True)
    property = models.ForeignKey(BooklyProperty, on_delete=models.CASCADE, related_name='rooms')
    room_name = models.CharField(max_length=100)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPES)
    room_description = models.TextField()
    price_per_night = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    room_image = models.ImageField(upload_to='room_main_image/')
    amenities = models.JSONField()
    room_status = models.CharField(max_length=20, choices=ROOM_STATUSES, default='available')
    capacity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.property.property_name} - {self.get_room_type_display()}"
    
class RoomImage(models.Model):
    room = models.ForeignKey(BooklyRooms, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='room_images/') #provide the right URL
    is_primary = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_primary', 'uploaded_at']

    def __str__(self):
        return f"Extra image for {self.room.room_name}"