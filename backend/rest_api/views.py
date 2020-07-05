from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from .serializers import *
# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    print(request.data)
    data = request.data
    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


