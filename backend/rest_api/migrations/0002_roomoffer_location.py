# Generated by Django 3.0.7 on 2020-07-05 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rest_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='roomoffer',
            name='location',
            field=models.CharField(default='Krzyki', max_length=100),
            preserve_default=False,
        ),
    ]