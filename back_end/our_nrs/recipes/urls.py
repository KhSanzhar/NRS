from django.urls import path, include
from .views import RecipeDetailView, RecipeListView, MyRecipeListView

urlpatterns = [
    path('recipes/', RecipeListView.as_view()),
    path('recipes/<int:id>/', RecipeDetailView.as_view()),
    path('my-recipes/', MyRecipeListView.as_view())
]
