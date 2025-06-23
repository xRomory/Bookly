from django.urls import path
from .views import get_property, city_autocomplete, region_autocomplete, cities_by_region, BooklyPropertyCreateView, MyPropertyList, BooklyPropertyDetail, BooklyPropertyDeleteView

urlpatterns = [
    path('property-list/', get_property, name='property_details'),
    path('property-detail/<int:pk>', BooklyPropertyDetail.as_view(), name='property_detail'),
    path('property-create/', BooklyPropertyCreateView.as_view(), name='property_create'),
    path('property-delete/<int:property_id>/', BooklyPropertyDeleteView.as_view(), name='property_delete'),
    path('my-properties/', MyPropertyList.as_view(), name='my-properties'),
    path('cities/autocomplete/', city_autocomplete, name='city_autocomplete'),
    path('regions/autocomplete/', region_autocomplete, name='region_autocomplete'),
    path('cities/by-region/<int:region_id>/', cities_by_region, name='cities_by_region'),
]