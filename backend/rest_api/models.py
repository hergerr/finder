from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class RoomOffer(models.Model):
    owner = models.ForeignKey(User, related_name='room_offer', on_delete=models.CASCADE, null=False, blank=False)
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

    def __str__(self):
        return f'{self.area}: {self.title}'

class RoomPhotos(models.Model):
    offer = models.ForeignKey(RoomOffer, related_name='photos', on_delete=models.CASCADE, null=True)
    image = models.ImageField()

class MateOffer(models.Model):
    owner = models.ForeignKey(User, related_name='mate_offer', on_delete=models.CASCADE, null=False, blank=False)
    title = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    location = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100)
    features = models.TextField()
    customs = models.TextField()
    phone = models.CharField(max_length=20)
    image = models.ImageField(null=True)

    def __str__(self):
        return f'{self.location}: {self.title}'

# https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#extending-the-existing-user-model
class LikedOffer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='liked_offer')
    room_offers = models.ManyToManyField(RoomOffer)
    mate_offers = models.ManyToManyField(MateOffer)

# create / update 1:1 user extension when user model created / updated
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        LikedOffer.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.liked_offer.save()


class Conversation(models.Model):
    members = models.ManyToManyField(User)
    subject = models.CharField(max_length=100)

    def __str__(self):
        return f'Conversation: {self.subject}'

class Message(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='message')
    content = models.TextField()
    datetime = models.DateTimeField()

    def __str__(self):
        return f'{self.datetime} message from {self.owner}: {self.content}'
