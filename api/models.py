from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class MovieModel(models.Model):
    title = models.CharField(max_length=256, default="Please provide Movie title", blank=False, null=False)
    description = models.TextField(blank=True, null=True, max_length=1000)
    release_date = models.DateField


class RatingModel(models.Model):
    movie = models.ForeignKey(MovieModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
