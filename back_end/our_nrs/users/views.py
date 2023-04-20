from django.shortcuts import render, redirect, get_object_or_404

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import ProfileSerializer

from .models import Profile
from django.contrib.auth.models import User

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['user']['username'],
                password=serializer.validated_data['user']['password']
            )
#user_profile = UserProfile(user=user, image=serializer.validated_data['image'])
            profile = Profile(user=user)
            profile.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class UserLoginView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('user', {}).get('username')
        password = request.data.get('user', {}).get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'message': 'Login successful'})#toke or etc
        return Response({'message': 'Invalid credentials'})


class UserLogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'Logout successful'})
