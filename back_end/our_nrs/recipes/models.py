from django.db import models
from users.models import Profile
from PIL import Image
from django.contrib.auth.models import User
# Create your models here.



class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

"""
To get Categories:
[
    {
        "id": 1,
        "name": "aaa"
    },
    {
        "id": 2,
        "name": "bbb"
    },
    {
        "id": 3,
        "name": "ccc"
    }
]
"""



class Recipe(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField()
    categories = models.ManyToManyField(Category)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to = 'recipeimages/', default='recipeimages/default.png')
    likes = models.ManyToManyField(User, related_name='recipeLike')

    def __str__(self):
        return self.name

    def all_likes(self):
        return self.likes.count()

"""
Get example of Recipe or Recipe LIST:
    {
        "id": 14,
        "author": {
            "id": 2,
            "user": "testUser",
            "image": "http://127.0.0.1:8000/media/userimages/default.png"
        },
        "categories": [
            "bbb"
        ],
        "ingredients": [],
        "name": "Minetest",
        "steps": "testing stuff",
        "description": "desde",
        "created_at": "2023-04-30T20:08:09.097103Z",
        "image": "http://127.0.0.1:8000/media/recipeimages/default.png",
        "likes": 0
    }


To Add a Recie and Update:
{
    "name":         "____",
    "steps":        "____",
    "description":  "____",
    "categories": [
        "____",
        "____",
        ...
    ],
    "ingredients": [
        {
            "name":   "____",
            "amount": "____"
        },
        {
            "name":   "____",
            "amount": "____"
        },
        ...
    ]
}
"""


class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    amount =  models.CharField(max_length=15)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name = 'ingredients')

    def __str__(self):
        return self.name


class Step(models.Model):
    step = models.TextField()
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name = 'steps')

    def __str__(self):
        return self.step


