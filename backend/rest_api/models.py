from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class RoomOffer(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='room_offer', on_delete=models.CASCADE, null=False, blank=False)
    title = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    area = models.IntegerField(default=0)
    location = models.CharField(max_length=100)
    number_of_flatmates = models.IntegerField(default=0)
    building_features = models.TextField()
    flat_features = models.TextField()
    flatmates_features = models.TextField()
    rules = models.TextField()
    phone = models.CharField(max_length=20)

    def __repr__(self):
        return f'{self.area}: {self.title}'

class MateOffer(models.Model):
    owner = models.ForeignKey(
        'auth.user', related_name='mate_offer', on_delete=models.CASCADE, null=False, blank=False)
    title = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    area = models.IntegerField(default=0)
    field_of_study = models.CharField(max_length=100)
    features = models.TextField()
    customs = models.TextField()
    phone = models.CharField(max_length=20)

    def __repr__(self):
        return f'{self.area}: {self.title}'

# https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#extending-the-existing-user-model
class LikedOffer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    room_offers = models.ManyToManyField(RoomOffer)
    mate_offers = models.ManyToManyField(MateOffer)


class Conversation(models.Model):
    members = models.ManyToManyField(User)
    subject = models.CharField(max_length=100)

    def __repr__(self):
        return f'Conversation: {self.subject}'

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    receivers = models.ManyToManyField(User)
    content = models.TextField()
    date = models.DateField()

    def __repr__(self):
        return f'Message from: {self.date}'
