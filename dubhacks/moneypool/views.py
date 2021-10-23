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
    
    def post(self, request):
        data = request.data
        username = data.get('username')
        amount = data.get('amount')
        message = data.get('message')
        user = User.objects.get(username=username)
        active_requests = Request.objects.get(user=user, active=True)
        if len(active_requests) != 0: 
           return Response(status=400) 
        Request.objects.create(user=user, amount=amount, message=message, active=True)
        
        return Response(status=200)
