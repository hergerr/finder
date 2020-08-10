from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

        # hides password in response
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class RoomOfferDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomOffer
        fields = ['owner', 'title', 'price', 'area', 'location',
        'number_of_flatmates','building_features', 'flat_features',
        'flatmates_features', 'rules', 'phone']

class RoomOfferListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomOffer
        fields = ['id', 'title', 'price', 'area', 'location', 'number_of_flatmates']


class MateOfferDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = MateOffer
        fields = "__all__"


class MateOfferListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MateOffer
        fields = ['id', 'title', 'age', 'location', 'features']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['owner', 'content', 'datetime']


# https://www.django-rest-framework.org/api-guide/relations/#nested-relationships
class ConversationSerializer(serializers.ModelSerializer):
    message = MessageSerializer(many=True, read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'members', 'subject', 'message']
