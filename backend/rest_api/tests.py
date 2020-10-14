from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, force_authenticate
from .models import MateOffer
from django.contrib.auth.models import User


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

    def test_user_registatrion(self):
        url = reverse('register')
        data = {"username": "example", "password": "gjkfnjkgfnjkgnfjk",
                "password_confirm": "gjkfnjkgfnjkgnfjk", "email": "a@niepodam.pl"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.get().username, 'example')


class UserViewsTests(APITestCase):
    """
    Testing user-only operations
    general guide: https://stackoverflow.com/questions/47576635/django-rest-framework-jwt-unit-test
    """

    def setUp(self):
        url = reverse('register')
        data = {"username": "example", "password": "gjkfnjkgfnjkgnfjk",
                "password_confirm": "gjkfnjkgfnjkgnfjk", "email": "a@niepodam.pl"}
        self.client.post(url, data, format='json')

    def test_login(self):
        self._get_token()
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)

    def test_add_mate(self):
        self._get_token()
        self._add_mate()
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MateOffer.objects.count(), 1)
        self.assertEqual(MateOffer.objects.get().phone, '123456789')

    def test_edit_mate(self):
        self._get_token()
        self._add_mate()
        url = reverse('mate_detail')
        id = MateOffer.objects.get().id
        # changes phone
        data = {"id": id, "title": "Peaceful IT student", "age": "22",
                "location": "Grunwaldzki Square", "field_of_study": "Computer science",
                "features": "peaceful;quiet;gaming;cycling",
                "customs": "no smoking;no partying;wakes up at 11-12;goes to bed 23-24",
                "phone": "1"}
        self.response = self.client.put(url, data, format='json')
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(MateOffer.objects.count(), 1)
        self.assertEqual(MateOffer.objects.get().phone, '1')

    def test_delete_mate(self):
        self._get_token()
        self._add_mate()
        url = reverse('mate_detail')
        id = MateOffer.objects.get().id
        data = {"id": id}
        self.response = self.client.delete(url, data, format='json')
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(MateOffer.objects.count(), 0)

    def _get_token(self):
        url = reverse('token_obtain_pair')
        data = {"username": "example", "password": "gjkfnjkgfnjkgnfjk"}
        self.response = self.client.post(url, data, format='json')
        self.token = self.response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def _add_mate(self):
        url = reverse('mate_detail')
        data = {"title": "Peaceful IT student", "age": "22",
                "location": "Grunwaldzki Square", "field_of_study": "Computer science",
                "features": "peaceful;quiet;gaming;cycling",
                "customs": "no smoking;no partying;wakes up at 11-12;goes to bed 23-24",
                "phone": "123456789"}
        self.response = self.client.post(url, data, format='json')
