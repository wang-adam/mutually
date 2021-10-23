from rest_framework import serializers
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from moneypool.models import User
from moneypool.models import Request

class UserSerializer(serializers.Serializer):
    userid = serializers.IntegerField(blank=False, unique=True)
    name = serializers.CharField(blank=False, max_length=100)
    email = serializers.EmailField(blank=False)

    def create(self, validated_data):
        return User.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.userid = validated_data.get('userid', instance.userid)
        instance.name = validated_data.get('name', instance.name)
        instance.email = validated_data.get('email', instance.email)

class RequestSerializer(serializers.Serializer):
    amount = serializers.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10000)])
    message = serializers.CharField(blank=False, max_length=1000)
    active = serializers.BooleanField(blank=False)
    user = serializers.ForeignKey('User', on_delete=models.CASCADE, related_name='requests')

    def create(self, validated_data):
        return Request.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.amount = validated_data.get('amount', instance.amount)
        instance.message = validated_data.get('message', instance.message)
        instance.active = validated_data.get('active', instance.active)
        instance.user = validated_data.get('user', instance.user)

