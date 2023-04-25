from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404

from .models import Recipe, Category, Ingredient
from .serializers import RecipeSerializer, CategorySerializer, IngredientSerializer
from .premissions import IsOwnerOrReadOnly

# Create your views here.
class RecipeListView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Recipe.objects.all().select_related('author')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)

class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (IsOwnerOrReadOnly, )
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        id = self.kwargs['id']
        recipe = Recipe.objects.filter(id=id)
        return recipe


class MyRecipeListView(generics.ListCreateAPIView):
    serializer_class =  RecipeSerializer
    premission_class = (IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        user = self.recipe.user
        queryset = self.queryset.filter(author=user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CategoryList(generics.ListAPIView):
    serializer_class=CategorySerializer
    premission_class = (AllowAny, )
