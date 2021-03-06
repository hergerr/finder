from django.urls import path, re_path
from . import views

urlpatterns = [
    # ------ GUEST VIEWS -----
    path('register/', views.register_user, name='register'),
    path('all_room_offers_list/', views.get_all_room_list_offers, name='get_all_rooms'),
    path('room_offer_detail/<int:room_offer_id>', views.get_room_offer_detail),
    
    path('all_mate_offers_list/', views.get_all_mate_list_offers, name='get_all_mates'),
    path('mate_offer_detail/<int:mate_offer_id>', views.get_mate_offer_detail),
    # https://stackoverflow.com/a/3711426
    re_path(r'^search_mates/$', views.search_mates),
    re_path(r'^search_rooms/$', views.search_rooms),
   
    # ------ USER VIEWS -----
    path('user_room_detail/', views.user_room_detail),
    path('user_room_list/', views.user_room_list),
    path('add_room_offer_to_liked/', views.add_room_offer_to_liked),
    path('get_liked_room_offers/', views.get_liked_room_offers),
    path('delete_liked_room_offer/', views.delete_liked_room_offer),

    path('user_mate_detail/', views.user_mate_detail, name='mate_detail'),
    path('user_mate_list/', views.user_mate_list),
    path('add_mate_offer_to_liked/', views.add_mate_offer_to_liked),
    path('get_liked_mate_offers/', views.get_liked_mate_offers),
    path('delete_liked_mate_offer/', views.delete_liked_mate_offer),

    path('send_message/', views.send_message),
    path('send_message_conv_id/', views.send_message_conv_id),
    path('get_conversation/<int:conversation_id>', views.get_conversation),
    path('get_user_conversations/', views.get_user_conversations),
    path('delete_conversation/<int:id>/', views.delete_conversation),

    path('get_user_id/', views.get_user_id),
    path('get_user/', views.get_user),
]