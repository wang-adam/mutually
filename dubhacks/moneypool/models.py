from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class User(models.Model):
    userid = models.IntegerField(blank=False, unique=True, primary_key=True)
    name = models.CharField(blank=False, max_length=100)
    email = models.EmailField(blank=False)
    contribution = models.PositiveIntegerField(blank=False)


class Request(models.Model):
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    message = models.CharField(blank=False, max_length=1000)
    active = models.BooleanField(blank=False, default=True)
    timestamp = models.DateTimeField(blank=False)
    vote_count = models.PositiveIntegerField(blank=False, default=0)
    vote_value = models.IntegerField(blank=False, default=0)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='requests')


class Donation(models.Model):
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    timestamp = models.DateTimeField(blank=False)
    message = models.CharField(max_length=200)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='donations')
