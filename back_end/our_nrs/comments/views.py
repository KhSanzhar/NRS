from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404

from .serializers import CommentSerializer
from .models import Comment
from recipes.models import Recipe
from .premissions import IsOwnerStaffOrReadOnly

# Create your views here.
class RecipeComentsListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        recipe_id = self.kwargs['id']
        recipe = get_object_or_404(Recipe, id=recipe_id)
        return recipe.comments.all()

    def perform_create(self, serializer):
        recipe_id = self.kwargs['id']
        recipe_d = get_object_or_404(Recipe, id=recipe_id)
        serializer.save(author=self.request.user.profile, recipe = recipe_d)


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerStaffOrReadOnly, )
    lookup_url_kwarg = 'pk'


    def get_queryset(self):
        pk = self.kwargs.get('pk', None)
        comment = Comment.objects.filter(id=pk)
        return comment

