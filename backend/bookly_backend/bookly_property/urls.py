from django.urls import path
from .views import get_property

urlpatterns = [
    path('property-list/', get_property, name='property_details')
]