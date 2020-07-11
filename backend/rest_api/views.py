from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from datetime import datetime
from .serializers import *
from .models import *


# -----------------------GUEST VIEWS----------------------
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

# ---------------------- Room section -----------------

# TODO: paging?
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_room_list_offers(request):
    data = RoomOffer.objects.all()
    serializer = RoomOfferListSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_room_offer_detail(request, room_offer_id):
    data = get_object_or_404(RoomOffer, id=room_offer_id)
    serializer = RoomOfferDetailSerializer(data)
    return Response(serializer.data)

# ---------------------- Mate section -----------------

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_mate_list_offers(request):
    data = MateOffer.objects.all()
    serializer = MateOfferListSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_mate_offer_detail(request, mate_offer_id):
    data = get_object_or_404(MateOffer, id=mate_offer_id)
    serializer = MateOfferDetailSerializer(data)
    return Response(serializer.data)


# -----------------------USER VIEWS----------------------

# ---------------------- Room section -----------------
# view for user (adding, editing, deleting user's offer)
@api_view(['POST', 'PUT', 'DELETE'])
def user_room_detail(request):
    data = request.data
    data['owner'] = request.user.id

    if request.method == 'POST':
        serializer = RoomOfferDetailSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'PUT':
        offer = get_object_or_404(RoomOffer,  id=data['id'], owner=data['owner'])
        serializer = RoomOfferDetailSerializer(offer, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        offer = get_object_or_404(RoomOffer,  id=data['id'], owner=data['owner'])
        offer.delete()
        return Response(status=200)

@api_view(['GET'])
def user_room_list(request):
    data = RoomOffer.objects.filter(owner=request.user)
    serializer = RoomOfferListSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_room_offer_to_liked(request):
    data = request.data
    data['owner'] = request.user.id

    try:
        user_liked_offers = get_object_or_404(LikedOffer, user=data['owner'])
        liked_offer = get_object_or_404(RoomOffer, id=data['id'])
        user_liked_offers.room_offers.add(liked_offer)
        return Response(status=200)
    except:    
        return Response(status=400)

@api_view(['GET'])
def get_liked_room_offers(request):
    data = request.data
    data['owner'] = request.user.id

    try:
        current_user = User.objects.get(pk=data['owner'])
        data = current_user.liked_offer.room_offers.all()
        serializer = RoomOfferListSerializer(data=data, many=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.data, status=404, safe=False)
    except:
        import traceback
        for line in traceback.format_exc().splitlines():
            print(line)    
        return Response(status=400)

# -------------------- Mates section --------------------

@api_view(['POST', 'PUT', 'DELETE'])
def user_mate_detail(request):
    data = request.data
    data['owner'] = request.user.id

    if request.method == 'POST':
        serializer = MateOfferDetailSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'PUT':
        offer = get_object_or_404(MateOffer,  id=data['id'], owner=data['owner'])
        serializer = MateOfferDetailSerializer(offer, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        offer = get_object_or_404(MateOffer,  id=data['id'], owner=data['owner'])
        offer.delete()
        return Response(status=200)

@api_view(['GET'])
def user_mate_list(request):
    data = MateOffer.objects.filter(owner=request.user)
    serializer = MateOfferListSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_mate_offer_to_liked(request):
    data = request.data
    data['owner'] = request.user.id
    print(data)

    try:
        user_liked_offers = get_object_or_404(LikedOffer, user=data['owner'])
        liked_offer = get_object_or_404(MateOffer, id=data['id'])
        user_liked_offers.mate_offers.add(liked_offer)
        return Response(status=200)
    except:    
        return Response(status=400)

@api_view(['GET'])
def get_liked_mate_offers(request):
    data = request.data
    data['owner'] = request.user.id

    try:
        current_user = User.objects.get(pk=data['owner'])
        data = current_user.liked_offer.mate_offers.all()
        serializer = MateOfferListSerializer(data=data, many=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.data, status=404, safe=False)
    except:
        import traceback
        for line in traceback.format_exc().splitlines():
            print(line)    
        return Response(status=400)

@api_view(['POST'])
def send_message(request, subject, receiver, content):
    sender = request.user.id
    conv = Conversation.objects.filter(members__in=[sender, owner], subject=subject)

    # check if converstaion exists
    if conv:
        new_message = Message(owner=sender, conversation=conv, datetime=datetime.now(), content=content)
        new_message.save()
        new_message.conversation = conv
    else:
        user1 = User.objects.get(pk=sender)
        user2 = User.objects.get(pk=receiver)
    
        new_conversation = Conversation(subject=subject)
        new_conversation.members.add(user1, user2)

        new_message = Message(owner=sender, conversation=conv, datetime=datetime.now(), content=content)
        new_message.save()
        new_message.conversation = conv

