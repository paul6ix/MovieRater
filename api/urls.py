from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import MovieViewSet,RatingViewSet

routers = routers.DefaultRouter()
routers.register('movies',MovieViewSet )
routers.register('ratings',RatingViewSet)
urlpatterns = [

    path('', include(routers.urls))
]
