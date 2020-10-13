from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import RoomOffer


# https://www.django-rest-framework.org/api-guide/testing/
class GuestViewsTests(APITestCase):
    def test_get_rooms(self):
        """
        Ensure that it is publically available to get room offers.
        """
        url = reverse('get_all_rooms')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_get_mates(self):
        url = reverse('get_all_mates')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
