from rest_framework import serializers
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from moneypool.models import User
from moneypool.models import Request

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'
