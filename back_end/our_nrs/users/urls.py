from django.urls import path
from users import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import LogoutView


urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('update/', views.update_profile, name='update'),
    path('', views.profile_details, name='getprofile') # GET PROFILE DETAILS to PROFILE page
]

