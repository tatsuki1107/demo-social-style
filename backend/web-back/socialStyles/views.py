from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import generics
from .models import SocialStyle
from .serializers import TodoSerializer


class ListSocialStyle(generics.ListAPIView):
    queryset = SocialStyle.objects.all()
    serializer_class = TodoSerializer


class DetailSocialStyle(generics.RetrieveAPIView):
    queryset = SocialStyle.objects.all()
    serializer_class = TodoSerializer
