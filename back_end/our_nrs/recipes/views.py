from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404

from .models import Recipe
from .serializers import RecipeSerializer

# Create your views here.
class RecipeListView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Recipe.objects.all()

class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (AllowAny, )
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        id = self.kwargs['id']
        recipe = get_object_or_404(Recipe, id=id)
        return recipe


