from django.db import models
from django.core.validators import RegexValidator
from bookly_user.models import BooklyUser

# Create your models here.
class BooklyProperty(models.Model):
    PROPERTY_CATEGORIES = [
        ('hotel', 'Hotel'),
        ('apartment', 'Apartment'),
        ('motel', 'Motel'),
        ('villa', 'Villa'),
        ('resort', 'Resort'),
        ('lodge', 'Lodge'),
        ('inn', 'Inn'),
    ]

    property_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(BooklyUser, on_delete=models.CASCADE, related_name='owned_properties')
    property_name = models.CharField(max_length=100)
    property_logo = models.ImageField(upload_to='property_logos/')
    address = models.TextField()
    property_description = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    phone_regex = RegexValidator(regex=r"^(09\d{9}|639\d{9}|\+639\d{9})$")    
    contact_number = models.CharField(validators=[phone_regex], max_length=15)
    category = models.CharField(max_length=20, choices=PROPERTY_CATEGORIES)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.property_name} ({self.get_category_display()})"
    
class PropertyImage(models.Model):
    property = models.ForeignKey(
        BooklyProperty,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='property_images/')
    is_primary = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_primary', 'uploaded_at']

    def __str__(self):
        return f"{self.property.property_name}"