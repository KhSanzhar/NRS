from rest_framework import serializers
from .models import Recipe, Category, Ingredient
from users.serializers import ProfileSerializer


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50, read_only=True)



class IngredientSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    amount = serializers.CharField()

    def create(self, validated_data):
        ingredient = Ingredient.objects.create(**validated_data)
        return ingredient

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.save()
        return instance




class RecipeSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(default=serializers.CurrentUserDefault(), read_only=True)
    categories = serializers.ListSerializer(child=serializers.CharField())
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model=Recipe
        exclude  = ('likes', )

    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for category_name in categories_data:
            category = Category.objects.get(name=category_name)
            recipe.categories.add(category)
        for ingredient in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient)
        return recipe

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories', [])
        ingredients_data = validated_data.pop('ingredients')
        super().update(instance, validated_data)
        instance.categories.clear()
        instance.ingredients.all().delete()
        for category_name in categories_data:
            category = Category.objects.get(name=category_name)
            instance.categories.add(category)
        for ingredient in ingredients_data:
            ing = Ingredient.objects.create(recipe=instance, **ingredient)
            instance.ingredients.add(ing)
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['likes'] = instance.all_likes()
        return representation

