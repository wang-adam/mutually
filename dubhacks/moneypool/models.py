from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class User(models.Model):
    userid = models.IntegerField(blank=False, unique=True)
    name = models.CharField(blank=False, max_length=100)
    email = models.EmailField(blank=False)


class Request(models.Model):
    amount = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    message = models.CharField(blank=False, max_length=1000)
    active = models.BooleanField(blank=False)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='requests')