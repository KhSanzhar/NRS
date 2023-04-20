from django.db import models
from django.contrib.auth.models import User
# Create your models here.

"""
class Product(models.Model):
    name = models.CharField(max_length=255)
    #um = CharField(max_length=12, null=True, blank=True) Unit of measurment
    # other stuff

    def __str__(self):
        return self.name """


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    steps = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    #images = models.ImageField(upload_to='images/', blank=True)
    #rating = 
    #date = 
    #Other stuff

    def __str__(self):
        return self.name

