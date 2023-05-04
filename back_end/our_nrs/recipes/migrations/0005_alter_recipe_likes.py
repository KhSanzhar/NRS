# Generated by Django 4.1.7 on 2023-04-30 18:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipes', '0004_recipe_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='likes',
            field=models.ManyToManyField(related_name='recipeLike', to=settings.AUTH_USER_MODEL),
        ),
    ]