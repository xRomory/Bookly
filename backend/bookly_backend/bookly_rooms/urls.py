from django.urls import path
from .views import BooklyRoomList, BooklyRoomDetailView, api_root, get_rooms

urlpatterns = [
    path('api-root/', api_root, name='api_room_root'),
    path('room-list/', BooklyRoomList.as_view(), name='room_list'),
    path('room-detail/', get_rooms, name="room_details"),
    path('room-detail/<int:room_id>/', BooklyRoomDetailView.as_view(), name="room_details"),
]