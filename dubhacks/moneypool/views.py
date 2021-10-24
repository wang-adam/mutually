from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from datetime import datetime, timezone
from moneypool.models import User, Request, Donation, Vote
from moneypool.validation import get_validated_id, get_vote_weight, get_vote_threshold
from moneypool.payment import pay_request
from moneypool.serializers import UserSerializer, RequestSerializer, DonationSerializer, VoteSerializer


class UserView(APIView):
    """
    View to interact with users
    """

    def get(self, request, userid=None):
        """
        /users
            Fetch for all users: userid, name, email
        /users/<userid>
            Fetch for user: userid, name, email
        """
        if userid:
            try:
                user = User.objects.get(userid=userid)
                serialized = UserSerializer(user)
                return Response(serialized.data)
            except User.DoesNotExist:
                return Response(status=404)
        else:
            data = [UserSerializer(user).data for user in User.objects.all()]
            return Response(data)

    def post(self, request):
        data = request.data
        auth_token = data.get('auth_token')
        try:
            idinfo = get_validated_id(auth_token)
        except ValueError:
            return Response(status=400)
        userid = idinfo.get('userid')
        name = idinfo.get('name')
        email = idinfo.get('email')

        print(f'{userid=}, {name=}, {email=}')
        
        User.objects.create(userid=userid, name=name, email=email)

        return Response(status=200)


class RequestView(APIView):
    """
    View to interact with requests
    """

    def get(self, request, userid=None):
        """
        /requests
            Fetch all requests: amount, message, active, accepted, timestamp, vote_count, vote_value, user
        /requests/<userid>
            Fetch requests by the user
        GET param: active: True to get only active requests
        """
        if userid:
            try:
                user = User.objects.get(userid=userid)
                reqs = Request.objects.filter(user=user)
                if 'active' in request.query_params:
                    reqs = reqs.filter(active=request.query_params['active'])
                data = [ RequestSerializer(req).data for req in reqs ]
                return Response(data)
            except User.DoesNotExist:
                return Response(status=404)
        else:
            if 'active' in request.query_params:
                data = [ RequestSerializer(req).data for req in Request.objects.filter(active=request.query_params['active']) ]
            else:
                data = [ RequestSerializer(req).data for req in Request.objects.all() ]
            return Response(data)

    def post(self, request):
        """
        /requests
            Create a new request.
            POST data:
                auth_token: id token from google oauth (auth2.currentUser.get().getAuthResponse().id_token)
                amount: request amount
                message: request message
        """
        data = request.data
        auth_token = data.auth_token

        try:
            idinfo = get_validated_id(auth_token)
        except ValueError:
            return Response(status=400)

        userid = idinfo.get('userid')
        amount = data.get('amount')
        message = data.get('message')
        now = datetime.now().replace(tzinfo=timezone.utc)
        try:
            user = User.objects.get(userid=userid)
        except models.Model.DoesNotExist:
            return Response(status=400)

        active_requests = Request.objects.filter(user=user, active=True)
        if active_requests.count() != 0:  # if the user already has an active request
           return Response(status=400) 

        Request.objects.create(amount=amount, message=message, active=True, timestamp=now, user=user)

        return Response(status=200)


class DonationView(APIView):
    """
    View for interacting with donations
    """

    def get(self, request, userid=None):
        """
        /donations
            Fetch all donations: amount, message, timestamp, user
        /donations/<userid>
            Fetch donations by the user
        """
        if userid:
            try:
                user = User.objects.get(userid=userid)
                donations = Donation.objects.filter(user=user)
                data = [ DonationSerializer(donation).data for donation in donations ]
                return Response(data)
            except User.DoesNotExist:
                return Response(status=404)
        else:
            data = [ DonationSerializer(donation).data for donation in Donation.objects.all() ]
            return Response(data)

    def post(self, request):
        """
        /donations
            Create a new donation.
            POST data:
                auth_token: id token from google oauth
                amount: donation amount
                message: (opt) donation message
        """
        data = request.data
        auth_token = data.auth_token
        try:
            idinfo = get_validated_id(auth_token)
        except ValueError:
            return Response(status=400)

        userid = idinfo.get('userid')
        amount = data.get('amount')
        message = data.get('message')
        now = datetime.now().replace(tzinfo=timezone.utc)

        try:
            user = User.objects.get(userid=userid)
        except User.DoesNotExist:
            return Response(status=400)

        Donation.objects.create(amount=amount, timestamp=now, message=message, user=user)
        user.contribution += amount
        user.save()

        return Response(status=200)


class VoteView(APIView):
    """
    View to interact with Votes
    """
    def post(self, request, req_userid):
        data = request.data
        auth_token = data.auth_token
        try:
            idinfo = get_validated_id(auth_token)
        except ValueError:
            return Response(status=400)

        userid = idinfo.get('userid')
        value = data.get('value')

        try:
            user = User.objects.get(userid=userid)
        except User.DoesNotExist:
            return Response(status=400)
        try:
            req_user = User.objects.get(userid=req_userid)
        except User.DoesNotExist:
            return Response(status=400)
        
        try:
            req = Request.objects.get(user=req_user, active=True)
        except Request.DoesNotExist:
            return Response(status=404)

        if user.votes.filter(request=req).count() == 0:
            weight = get_vote_weight(user)
            Vote.objects.create(request=req, user=user, weight=weight, value=value)
            req.vote_count += 1
            req.vote_value += weight * value
            req.save()
        
            if req.vote_count > get_vote_threshold():
                req.active = False
                if req.vote_value > 0:
                    req.accepted = True
                    req.save()
                    pay_request(req)
        
        return Response(status=200)
