from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class User(models.Model):
    username = models.CharField(blank=False, unique=True, max_length=100)


class Request(models.Model):
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    message = models.CharField(blank=False, max_length=1000)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='request')