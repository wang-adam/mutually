import math
from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime, timezone
from moneypool.models import User, Request, Donation
from moneypool.validation import get_validated_id
from moneypool.serializers import UserSerializer, RequestSerializer


class UserView(APIView):
    """
    View to interact with users
    """

    def get(self, request, userid=None):
        if userid:
            try:
                user = User.objects.get(userid=userid)
                serialized = UserSerializer(user)
                return Response(serialized.data)
            except models.Model.DoesNotExist:
                return Response(status=404)
        else:
            data = [UserSerializer(user).data for user in User.objects.all()]
            return Response(data)

    def post(self, request):
        data = request.data
        auth_token = data.auth_token
        try:
            idinfo = get_validated_id(auth_token)
        except ValueError:
            return Response(status=400)
        userid = idinfo.get('sub')
        name = idinfo.get('name')
        email = idinfo.get('email')
        
        User.objects.create(userid=userid, name=name, email=email)


class RequestView(APIView):
    """
    View to interact with requests
    """

    def get(self, request, userid=None):
        if userid:
            try:
                user = User.objects.get(userid=userid)
                serialized = UserSerializer(user)
                return Response(serialized.data)
            except models.Model.DoesNotExist:
                return Response(status=404)
        else:
            data = [RequestSerializer(req).data for req in Request.objects.all()]
            return Response(data)

    def post(self, request):
        data = request.data
        auth_token = data.auth_token

        try:
            idinfo = get_validated_id(auth_token)
        except ValueError:
            return Response(status=400)

        userid = idinfo.get('sub')
        amount = data.get('amount')
        message = data.get('message')
        now = datetime.now().replace(tzinfo=timezone.utc)
        try:
            user = User.objects.get(userid=userid)
        except models.Model.DoesNotExist:
            return Response(status=400)

        active_requests = Request.objects.filter(user=user, active=True)
        if len(active_requests) != 0:  # if the user already has an active request
           return Response(status=400) 

        Request.objects.create(amount=amount, message=message, active=True, timestamp=now, user=user)

        return Response(status=200)

class DonationView(APIView):
    def post(self, request):
        data = request.data
        auth_token = data.auth_token
        try:
            idinfo = get_validated_id(auth_token)
        except ValueError:
            return Response(status=400)

        userid = idinfo.get('sub')
        amount = data.get('amount')
        message = data.get('message')
        try:
            user = User.objects.get(userid=userid)
        except models.Model.DoesNotExist:
            return Response(status=400)

        Donation.objects.create(amount=amount, timestamp=datetime.now(), message=message, user=user)

        return Response(status=200)
