from django.urls import path
from moneypool.views import UserView, RequestView

urlpatterns = [
    path('users', UserView.as_view(), name='users'),
    path('users/<int:userid>', UserView.as_view(), name='users'),
    path('requests', RequestView.as_view(), name='requests'),
    path('requests/<int:userid>', RequestView.as_view(), name='requests'),
]