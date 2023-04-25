from rest_framework import serializers
from .models import Recipe
from users.serializers import ProfileSerializer

class RecipeSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(default=serializers.CurrentUserDefault())

    class Meta:
        model=Recipe
        fields = ['id', 'name', 'steps', 'created_at', 'author']

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
