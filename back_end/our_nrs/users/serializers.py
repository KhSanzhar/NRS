from rest_framework import serializers
from users.models import Profile
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user



class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    ''' Image validation
    image = serializers.ImageField(
        allowed_types=['image/jpeg', 'image/png'],
        max_length=10 * 1024 * 1024,  # 10 MB
        max_width=1920,
        max_height=1080
    )
    '''

    class Meta:
        model = Profile
        fields = '__all__'

