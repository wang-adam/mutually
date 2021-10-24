from django.urls import path
from moneypool.views import FundView, UserView, RequestView, DonationView, VoteView

urlpatterns = [
    path('users', UserView.as_view(), name='users'),
    path('users/<str:userid>', UserView.as_view(), name='users'),
    path('requests', RequestView.as_view(), name='requests'),
    path('requests/<str:userid>', RequestView.as_view(), name='requests'),
    path('donations', DonationView.as_view(), name='donations'),
    path('donations/<str:userid>', DonationView.as_view(), name='donations'),
    path('vote/<str:req_userid>', VoteView.as_view(), name='vote'),
    path('fund', FundView.as_view(), name='fund'),
]