from rest_framework import serializers
from .models import Recipe, Category
from users.serializers import ProfileSerializer


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50, read_only=True)

    def to_representation(self, instance):
        return {
            'name': instance.name
        }

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
    author = ProfileSerializer(default=serializers.CurrentUserDefault())
    categories = CategorySerializer(many=True)

    class Meta:
        model=Recipe
        fields = ['id', 'name', 'steps', 'created_at', 'author', 'categories']

    def create(self, validated_data):
        categories = validated_data.pop('categories', [])
        recipe = Recipe.objects.create(**validated_data)
        for category in categories:
            new_category = Category.objects.create(**category)
            recipe.categories.add(new_category)
        return recipe

    def update(self, instance, validated_data):
        categories = validated_data.pop('categories', [])
        instance = super().update(instance, validated_data)
        instance.categories.clear()
        for category in categories:
            new_category = Category.objects.create(**category)
            instance.categories.add(new_category)
        return instance
