from django.shortcuts import render
from rest_framework import viewsets
from .models import MovieModel, RatingModel
from .serializer import MovieSerializer,RatingSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = MovieModel.objects.all()
    serializer_class = MovieSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = RatingModel.objects.all()
    serializer_class = RatingSerializer
