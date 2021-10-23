from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from moneypool.models import User, Request


class RequestView(APIView):
    """
    View to interact with requests
    """
    
    def get(self, request):
        data = [{'user': req.user.username, 'amount': req.amount, 'message': req.message} for req in Request.objects.all()]
        return Response(data)
