from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'

    def __str__(self):
        return f'{self.user.username} Profile'
