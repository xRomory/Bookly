from django.db import models
from django.core.validators import RegexValidator
from bookly_user.models import BooklyUser

# Create your models here.
class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']

class CityProvince(models.Model):
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name='cities')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        unique_together = ("region", "name")

    def __str__(self):
        return f"{self.name}, {self.region}"

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
    property_description = models.TextField()
    
    region = models.ForeignKey(Region, on_delete=models.PROTECT, null=True, related_name='properties')
    city_province = models.ForeignKey(CityProvince, on_delete=models.PROTECT, null=True, related_name='properties')
    address = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    phone_regex = RegexValidator(regex=r"^(09\d{9}|639\d{9}|\+639\d{9})$")    
    contact_number = models.CharField(validators=[phone_regex], max_length=15)
    category = models.CharField(max_length=20, choices=PROPERTY_CATEGORIES)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.property_name} ({self.get_category_display()}) - {self.city_province}, {self.region}"
    
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