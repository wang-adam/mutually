from rest_framework import serializers
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class UserSerializer(serializers.Serializer):
    userid = serializers.IntegerField(blank=False, unique=True)
    name = serializers.CharField(blank=False, max_length=100)
    email = serializers.EmailField(blank=False)

class RequestSerializer(serializers.Serializer):
    amount = serializers.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    message = serializers.CharField(blank=False, max_length=1000)
    active = serializers.BooleanField(blank=False)
    user = serializers.ForeignKey('User', on_delete=models.CASCADE, related_name='requests')
