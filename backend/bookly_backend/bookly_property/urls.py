from django.urls import path
from .views import BooklyPropertyList, BooklyPropertyCreateView, get_property
urlpatterns = [
    path('property-list/', get_property, name='property_details'),
    path('property-list-approved/', BooklyPropertyList.as_view(), name='approved_property_list'),
    path('property-create/', BooklyPropertyCreateView.as_view(), name='property_create'),
    path('has-property/', user_has_properties, name="has_property"),
]
