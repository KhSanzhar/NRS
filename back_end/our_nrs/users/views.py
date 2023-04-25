from django.shortcuts import render, redirect, get_object_or_404

from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


from .serializers import ProfileSerializer, UserSerializer

from .models import Profile
from django.contrib.auth.models import User



#USER REGISTRATION
@api_view(['POST'])
def register(request):
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        profile_serilizer = ProfileSerializer(data=request.data)
        profile_serilizer.is_valid(raise_exception=True)
        profile_serilizer.save(user=user)
        return Response("REGISTRATION COMPLETE", status=201)
    return Response(user_serializer.errors)


#USER PASSWORD UPDATE
@api_view(['POST'])
@login_required
def change_password(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    if not user.check_password(current_password):
        return Response({'detail': 'Current password is incorrect.'})

    user.password = make_password(new_password)
    user.save()
    return Response({'detail': 'Password changed successfully.'})


#USER LOGOUT

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

"""
#USER PROFILE UPDATE (only image and bio, can be modiffied)
@api_view(['PUT'])
def update_profile(request):
    profile = Profile.objects.get(user = request.user)
    serializer = ProfileSerializer(profile, data = request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    allowed_fields = {'bio': request.data.get('bio'), 'image': request.data.get('image')}
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OaK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST
)"""



