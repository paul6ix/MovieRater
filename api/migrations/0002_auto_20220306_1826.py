# Generated by Django 3.2.5 on 2022-03-06 17:26

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Movie',
            new_name='MovieModel',
        ),
        migrations.RenameModel(
            old_name='Rating',
            new_name='RatingModel',
        ),
    ]
