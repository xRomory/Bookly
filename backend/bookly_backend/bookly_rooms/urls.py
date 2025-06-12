from django.urls import path
from .views import (
    BooklyRoomList,
    BooklyRoomDetailView,
    BooklyRoomCreateView,
    RoomImageUploadView,
    get_rooms,
    api_root,
    my_property_listing,
)

urlpatterns = [
    path('api-root/', api_root, name='api_room_root'),
    path('room-list/', BooklyRoomList.as_view(), name='room_list'),
    path('room-detail/', get_rooms, name='room_details'),
    path('room-detail/<int:room_id>/', BooklyRoomDetailView.as_view(), name='room_details'),
    path('room-create/', BooklyRoomCreateView.as_view(), name='room_create'),
    path('room-image-upload/', RoomImageUploadView.as_view(), name='room_image_upload'),
    path('my-listing/', my_property_listing, name='my_property_listing'),
]
