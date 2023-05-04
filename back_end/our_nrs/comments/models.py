from django.db import models
from users.models import Profile
from recipes.models import Recipe

# Create your models here.

class Comment(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


"""
To Get COMMENT OR LIST of COMMENTS:
{
    "id":          6,
    "author": {
        "id":      200,
        "user":    "testUser",
        "image":   "http://127.0.0.1:8000/media/userimages/default.png"
    },
    "recipe":      13, <CAN BE IGNORED>
    "created_at":  "2023-05-04T16:50:01.197836Z",
    "text":        "THat tasty"
}



TO POST or CHANGE:
{
    "text": "_____"
}

"""
