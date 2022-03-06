from rest_framework import serializers
from .models import MovieModel, RatingModel


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieModel
        fields = ['id','title','description']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingModel
        fields = ['stars','users','movie']