from google.oauth2 import id_token
from google.auth.transport import requests as auth_requests
import dubhacks.settings as settings


def get_validated_id(token):
    try:
        # Request validation from Google
        idinfo = id_token.verify_oauth2_token(token, auth_requests.Request(), settings.OAUTH_CLIENT_ID)
        # ID token is valid. Pass info back
        return idinfo

    except ValueError:
        # Invalid token; raise error to next level
        raise
