from rest_framework import serializers
from .models import Recipe, Category
from users.serializers import ProfileSerializer


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50, read_only=True)

    def to_representation(self, instance):
        return instance.save()



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


    class Meta:
        model=Recipe
        fields = ['id', 'name', 'steps', 'created_at', 'author', 'categories']

    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        recipe = Recipe.objects.create(**validated_data)
        for category_name in categories_data:
            category = Category.objects.get(name=category_name)
            recipe.categories.add(category)
        return recipe

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories', [])
        super().update(instance, validated_data)
        for category_name in categories_data:
            category = Category.objects.get(name=category_name)
            instance.categories.add(category)
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        categories = representation.get('categories', [])
        representation['categories'] = [name for name in categories]
        return representation

