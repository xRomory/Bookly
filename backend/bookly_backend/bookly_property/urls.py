from django.urls import path
from .views import get_property, BooklyPropertyCreateView, MyPropertyList, BooklyPropertyDetail, BooklyPropertyDeleteView

urlpatterns = [
    path('property-list/', get_property, name='property_details'),
    path('property-detail/<int:pk>', BooklyPropertyDetail.as_view(), name='property_detail'),
    path('property-create/', BooklyPropertyCreateView.as_view(), name='property_create'),
    path('property-delete/<int:property_id>/', BooklyPropertyDeleteView.as_view(), name='property_delete'),
    path('my-properties/', MyPropertyList.as_view(), name='my-properties'),
]