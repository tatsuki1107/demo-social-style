from rest_framework import serializers
from .models import SocialStyle


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialStyle
        fields = ('id', 'title', 'body')
