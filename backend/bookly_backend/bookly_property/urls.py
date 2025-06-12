from django.urls import path
from .views import get_property, BooklyPropertyCreateView, MyPropertyList

urlpatterns = [
    path('property-list/', get_property, name='property_details'),
    path('property-create/', BooklyPropertyCreateView.as_view(), name='property_create'),
    path('my-properties/', MyPropertyList.as_view(), name='my-properties'),
]