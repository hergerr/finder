# Generated by Django 3.0.7 on 2020-07-04 18:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=100)),
                ('members', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RoomOffer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('price', models.IntegerField(default=0)),
                ('area', models.IntegerField(default=0)),
                ('number_of_flatmates', models.IntegerField(default=0)),
                ('building_features', models.TextField()),
                ('flat_features', models.TextField()),
                ('flatmates_features', models.TextField()),
                ('rules', models.TextField()),
                ('phone', models.CharField(max_length=20)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='room_offer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('date', models.DateField()),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest_api.Conversation')),
                ('receivers', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MateOffer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('age', models.IntegerField(default=0)),
                ('area', models.IntegerField(default=0)),
                ('field_of_study', models.CharField(max_length=100)),
                ('features', models.TextField()),
                ('customs', models.TextField()),
                ('phone', models.CharField(max_length=20)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mate_offer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]