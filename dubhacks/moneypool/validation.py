import math
from google.oauth2 import id_token
from google.auth.transport import requests as auth_requests
import dubhacks.settings as settings
from rest_framework.response import Response
from moneypool.models import User


def get_validated_id(token):
    try:
        # Request validation from Google
        idinfo = id_token.verify_oauth2_token(token, auth_requests.Request(), settings.OAUTH_CLIENT_ID)
        # ID token is valid. Pass info back
        return idinfo

    except ValueError:
        # Invalid token; raise bad request
        raise


def get_vote_weight(user):
    return math.floor(math.log10(user.contribution)) + 1


def get_vote_threshold():
    eligible_voters = User.objects.filter(contribution__gt=0).count()
    return math.ceil(eligible_voters / 3)
