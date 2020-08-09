from django.urls import path
from . import views

urlpatterns = [
    # ------ GUEST VIEWS -----
    path('register/', views.register_user),
    path('all_room_offers_list/', views.get_all_room_list_offers),
    path('room_offer_detail/<int:room_offer_id>', views.get_room_offer_detail),
    
    path('all_mate_offers_list/', views.get_all_mate_list_offers),
    path('mate_offer_detail/<int:mate_offer_id>', views.get_mate_offer_detail),
   
    # ------ USER VIEWS -----
    path('user_room_detail/', views.user_room_detail),
    path('user_room_list/', views.user_room_list),
    path('add_room_offer_to_liked/', views.add_room_offer_to_liked),
    path('get_liked_room_offers/', views.get_liked_room_offers),
    path('delete_liked_room_offer/', views.delete_liked_room_offer),

    path('user_mate_detail/', views.user_mate_detail),
    path('user_mate_list/', views.user_mate_list),
    path('add_mate_offer_to_liked/', views.add_mate_offer_to_liked),
    path('get_liked_mate_offers/', views.get_liked_mate_offers),
    path('delete_liked_mate_offer/', views.delete_liked_mate_offer),

    path('send_message/', views.send_message),
    path('get_conversation/<int:conversation_id>', views.get_conversation),
    path('get_user_conversations/', views.get_user_conversations),
    path('delete_conversation/<int:id>/', views.delete_conversation),

    path('get_user_id/', views.get_user_id),
]