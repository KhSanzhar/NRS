from django.urls import path, include
from .views import RecipeDetailView, RecipeListView

urlpatterns = [
    path('recipes/', RecipeListView.as_view()),
    path('recipes/<int:id>/', RecipeDetailView.as_view())
]
