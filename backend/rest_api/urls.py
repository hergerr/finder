from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user),
    path('all_room_offers_list/', views.get_all_room_list_offers),
    path('room_offer_detail/<int:room_offer_id>', views.get_room_offer_detail),
    path('user_room_detail/', views.user_room_detail),
]