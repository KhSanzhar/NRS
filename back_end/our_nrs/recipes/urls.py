from django.urls import path, include
from recipes import views
from .views import RecipeDetailView, RecipeListView, MyRecipeListView, CategoryRecipeListView, CategoryList

urlpatterns = [
    path('recipes/', RecipeListView.as_view()),
    path('recipes/<int:id>/', RecipeDetailView.as_view()),
    path('my-recipes/', MyRecipeListView.as_view()),
    path('category/<pk>/', CategoryRecipeListView.as_view()),
    path('category/', CategoryList.as_view()),
    path('recipes/<int:id>/', include('comments.urls')),
    path('recipes/<int:pk>/like/', views.PostLike)
]
