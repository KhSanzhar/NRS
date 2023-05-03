from django.urls import path
from .views import CommentDetailView, RecipeComentsListView


urlpatterns = [
    path('comment/', RecipeComentsListView.as_view(), name='comments'),
    path('comment/<int:pk>/', CommentDetailView.as_view(), name='updateComment')
]


