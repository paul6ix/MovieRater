from rest_framework import serializers
from .models import MovieModel, RatingModel


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieModel
        fields = ['id','title','description','get_ratings','avg_ratings']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = RatingModel
        fields = ['stars','user','movie']