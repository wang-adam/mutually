from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class User(models.Model):
    userid = models.CharField(blank=False, unique=True, primary_key=True, max_length=30)
    name = models.CharField(blank=False, max_length=100)
    email = models.EmailField(blank=False)
    contribution = models.PositiveIntegerField(blank=False, default=0)


class Request(models.Model):
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    message = models.CharField(blank=False, max_length=1000)
    active = models.BooleanField(blank=False, default=True)
    accepted = models.BooleanField(blank=False, default=False)
    timestamp = models.DateTimeField(blank=False)
    vote_count = models.PositiveIntegerField(blank=False, default=0)
    vote_value = models.IntegerField(blank=False, default=0)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='requests')


class Donation(models.Model):
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    timestamp = models.DateTimeField(blank=False)
    message = models.CharField(max_length=200)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='donations')


class Vote(models.Model):
    class VoteChoices(models.IntegerChoices):
        YES = 1
        NO = -1

    request = models.ForeignKey('Request', on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='votes')
    weight = models.PositiveIntegerField(blank=False, default=1)
    value = models.IntegerField(choices=VoteChoices.choices)
