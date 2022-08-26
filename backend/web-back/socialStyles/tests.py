from django.test import TestCase

# Create your tests here.
from .models import SocialStyle


class SocialstyleModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        SocialStyle.objects.create(
            title="first socialstyle", body="a body here")

    def test_title_content(self):
        socialstyle = SocialStyle.objects.get(id=1)
        excepted_object_name = f'{socialstyle.title}'
        self.assertEqual(excepted_object_name, 'first socialstyle')

    def test_body_content(self):
        socialstyle = SocialStyle.objects.get(id=1)
        excepted_object_name = f'{socialstyle.body}'
        self.assertEqual(excepted_object_name, 'a body here')
