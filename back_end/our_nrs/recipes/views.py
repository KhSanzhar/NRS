from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from .models import Recipe, Category, Ingredient
from .serializers import RecipeSerializer, CategorySerializer, IngredientSerializer
from .premissions import IsOwnerStaffOrReadOnly

# Create your views here.
class RecipeListView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Recipe.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)


class CategoryRecipeListView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    premission_class = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        queryset = Recipe.objects.filter(categories = pk)
        return queryset

class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (IsOwnerStaffOrReadOnly, )
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        id = self.kwargs['id']
        recipe = Recipe.objects.filter(id=id)
        return recipe


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def PostLike(request, pk):
    recipe = get_object_or_404(Recipe, id=pk)
    if recipe.likes.filter(id=request.user.id).exists():
        recipe.likes.remove(request.user)
        return Response("Like removed")

    recipe.likes.add(request.user)
    return Response("Like added")


class MyRecipeListView(generics.ListCreateAPIView):
    serializer_class =  RecipeSerializer
    premission_class = (IsAuthenticatedOrReadOnly, )

    def get_queryset(self):
        user = self.request.user
        queryset = Recipe.objects.filter(author=user.profile)
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.profile)

class CategoryList(generics.ListAPIView):
    serializer_class=CategorySerializer
    queryset = Category.objects.all()
    premission_class = (AllowAny, )
