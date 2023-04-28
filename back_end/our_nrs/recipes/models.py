from django.db import models
from users.models import Profile
# Create your models here.



class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name



class Recipe(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    steps = models.TextField()
    description = models.TextField()
    categories = models.ManyToManyField(Category)
    created_at = models.DateTimeField(auto_now_add=True)
    #images = models.ImageField(upload_to='images/', blank=True)
    #rating = 


    def __str__(self):
        return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=255)
    amount =  models.CharField(max_length=15)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name = 'ingredients')

    def __str__(self):
        return self.name

