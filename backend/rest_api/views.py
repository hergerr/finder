from django.shortcuts import render
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
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

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_mate_list_offers(request):
    data = MateOffer.objects.all()
    serializer = MateOfferListSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_mate_offer_detail(request, mate_offer_id):
    data = get_object_or_404(MateOffer, id=room_offer_id)
    serializer = MateOfferDetailSerializer(data)
    return Response(serializer.data)


# -----------------------USER VIEWS----------------------

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