from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from moneypool.models import User, Request


class UserView(APIView):
    """
    View to interact with users
    """

    def get(self, request, userid=None):
        if userid:
            try:
                user = User.objects.get(userid=userid)
                data = {'userid': userid, 'name': user.name, 'email': user.email, 'requests': user.requests.all()}
                return Response(data)
            except models.Model.DoesNotExist:
                return Response(status=404)
        else:
            data = [{'userid': userid, 'name': user.name, 'email': user.email, 'requests': user.requests.all()} for user in User.objects.all()]
            return Response(data)


class RequestView(APIView):
    """
    View to interact with requests
    """
    
    def get(self, request):
        data = [{'user': req.user.username, 'amount': req.amount, 'message': req.message} for req in Request.objects.all()]
        return Response(data)
    
    def post(self, request):
        data = request.data
        userid = data.get('userid')
        amount = data.get('amount')
        message = data.get('message')
        user = User.objects.get(userid=userid)
        Request.objects.create(user=user, amount=amount, message=message, active=True)

        return Response(status=200)
