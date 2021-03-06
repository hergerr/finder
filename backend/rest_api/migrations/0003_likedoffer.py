# Generated by Django 3.0.7 on 2020-07-05 13:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rest_api', '0002_roomoffer_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='LikedOffer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mate_offers', models.ManyToManyField(to='rest_api.MateOffer')),
                ('room_offers', models.ManyToManyField(to='rest_api.RoomOffer')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
