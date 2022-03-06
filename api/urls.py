from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

routers = routers.DefaultRouter()
urlpatterns = [

    path('', include(routers.urls))
]
