from django.db.models import Q
from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
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


@api_view(['GET'])
@permission_classes([AllowAny])
def search_mates(request, age_from, age_to, district, features, customs):
    data = MateOffer.objects.filter(age__gte=age_from, age__lte=age_to)

    if district:
        data = Mateoffer.objects.filter(district=district)
    
    if features:
        data = MateOffer.objects.filter(Q(features__icontains=feaures))
    
    if customs:
        data = MateOffer.objects.filter(Q(customs__icontains=customs))

    serializer = MateOfferListSerializer(data, many=True)
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
        offer = get_object_or_404(RoomOffer, id=data['id'])
        offer.delete()
        data = RoomOffer.objects.filter(owner=request.user)
        serializer = RoomOfferListSerializer(data, many=True)
        return Response(serializer.data)


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
        # https://stackoverflow.com/a/52068090
        current_user = User.objects.get(pk=data['owner'])
        data = current_user.liked_offer.room_offers.all()
        serializer = RoomOfferListSerializer(data, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)
    except:
        import traceback
        for line in traceback.format_exc().splitlines():
            print(line)    
        return Response(status=400)

@api_view(['DELETE'])
def delete_liked_room_offer(request):
    data = request.data
    data['owner'] = request.user.id
    print(data)

    offers = get_object_or_404(LikedOffer, user=data['owner'])
    offers.room_offers.remove(data['id'])
    
    current_user = User.objects.get(pk=data['owner'])
    data = current_user.liked_offer.room_offers.all()
    serializer = RoomOfferListSerializer(data, many=True)
    return JsonResponse(serializer.data, status=200, safe=False)

# -------------------- Mates section --------------------

@api_view(['POST', 'PUT', 'DELETE'])
@parser_classes([MultiPartParser,FormParser,JSONParser])
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
        offer = get_object_or_404(MateOffer,  id=data['id'])
        serializer = MateOfferDetailSerializer(offer, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        offer = get_object_or_404(MateOffer, id=data['id'])

        # delete image file
        if offer.image:
            offer.image.delete()
        offer.delete()

        data = MateOffer.objects.filter(owner=request.user)
        serializer = MateOfferListSerializer(data, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
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
        import traceback
        for line in traceback.format_exc().splitlines():
            print(line)    
        return Response(status=400)

@api_view(['GET'])
def get_liked_mate_offers(request):
    data = request.data
    data['owner'] = request.user.id

    try:
        current_user = User.objects.get(pk=data['owner'])
        data = current_user.liked_offer.mate_offers.all()
        serializer = MateOfferListSerializer(data, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)
    except:
        import traceback
        for line in traceback.format_exc().splitlines():
            print(line)    
        return Response(status=400)


@api_view(['DELETE'])
def delete_liked_mate_offer(request):
    data = request.data
    data['owner'] = request.user.id

    offers = get_object_or_404(LikedOffer, user=data['owner'])
    offers.mate_offers.remove(data['id'])

    current_user = User.objects.get(pk=data['owner'])
    data = current_user.liked_offer.mate_offers.all()
    serializer = MateOfferListSerializer(data, many=True)
    return JsonResponse(serializer.data, status=200, safe=False)


@api_view(['POST'])
def send_message(request):
    sender = request.user
    subject = request.data['subject']
    receiver = request.data['receiver']
    content = request.data['content']

    conv = Conversation.objects.filter(members__in=[sender, receiver], subject=subject).first()

    # check if converstaion exists
    if conv:
        new_message = Message(owner=sender, conversation=conv, datetime=timezone.now(), content=content)
        new_message.save()
        new_message.conversation = conv
        return Response(status=200)
    else:
        user1 = sender
        user2 = User.objects.get(pk=receiver)
    
        new_conversation = Conversation(subject=subject)
        new_conversation.save()
        new_conversation.members.add(user1, user2)

        new_message = Message(owner=sender, conversation=new_conversation, datetime=timezone.now(), content=content)
        new_message.save()
        return Response(status=200)
    return Response(status=400)


@api_view(['POST'])
def send_message_conv_id(request):
    sender = request.user
    conv = Conversation.objects.get(pk=request.data['id'])
    new_message = Message(owner=sender, conversation=conv, datetime=timezone.now(), content=request.data['content'])
    new_message.save()
    serializer = ConversationSerializer(conv)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def get_conversation(request, conversation_id):
    try:
        owner = request.user
        data = Conversation.objects.get(pk=conversation_id)
        serializer = ConversationSerializer(data)
        return Response(serializer.data, status=200)
    except:
        import traceback
        for line in traceback.format_exc().splitlines():
            print(line)    
        return Response(status=400)

@api_view(['GET'])
def get_user_conversations(request):
    owner = request.user    
    data = Conversation.objects.filter(members__in=[owner])

    serializer = ConversationSerializer(data, many=True)
    return Response(serializer.data, status=200)


@api_view(['DELETE'])
def delete_conversation(request, id):
    try:
        conv = get_object_or_404(Conversation, pk=id)
        conv.delete()
        return Response(status=200)
    except:
        import traceback
        for line in traceback.format_exc().splitlines():
            print(line)    
        return Response(status=400)


@api_view(['GET'])
def get_user_id(request):
    print(request.user.id)
    return Response(request.user.id)