from rest_framework import serializers
from .models import MovieModel, RatingModel
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        # Extra features for the user serializer
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

        def create(self, validated_data):
            user = User.objects.create(**validated_data)
            token = Token.objects.create(user=user)
            return user


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieModel
        fields = ['id', 'title', 'description', 'get_ratings', 'avg_ratings']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingModel
        fields = ['stars', 'user', 'movie']
