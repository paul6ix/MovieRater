from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from .models import MovieModel, RatingModel
from django.contrib.auth.models import User
from .serializer import MovieSerializer, RatingSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class MovieViewSet(viewsets.ModelViewSet):
    queryset = MovieModel.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=['POST'])
    def rate(self, request, pk=None):
        if 'stars' in request.data:
            movie = MovieModel.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user
            print(user)
            try:
                rating = RatingModel.objects.get(user=user.id, movie=movie.id)
                rating.stars = stars
                rating.save()
                serializer = RatingSerializer(rating, many=False)
            except:
                RatingModel.objects.create(movie=movie, user=user, stars=stars)
            response = {"Message": "Created Successfully", "Data": serializer.data}
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Error"}, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = RatingModel.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
