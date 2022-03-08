from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator


class MovieModel(models.Model):
    title = models.CharField(max_length=256, default="Please provide Movie title", blank=False, null=False)
    description = models.TextField(blank=True, null=True, max_length=1000)
    release_date = models.DateField

    def get_ratings(self):
        ratings = RatingModel.objects.filter(movie=self)
        return len(ratings)

    def avg_ratings(self):
        sum = 0
        ratings = RatingModel.objects.filter(movie=self)
        for rating in ratings:
            sum = + rating.stars
        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0

    def __str__(self):
        return self.title


class RatingModel(models.Model):
    movie = models.ForeignKey(MovieModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
