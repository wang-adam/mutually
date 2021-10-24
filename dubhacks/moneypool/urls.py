from django.urls import path
from moneypool.views import UserView, RequestView, DonationView, VoteView

urlpatterns = [
    path('users', UserView.as_view(), name='users'),
    path('users/<int:userid>', UserView.as_view(), name='users'),
    path('requests', RequestView.as_view(), name='requests'),
    path('requests/<int:userid>', RequestView.as_view(), name='requests'),
    path('donations', DonationView.as_view(), name='donations'),
    path('donations/<int:userid>', DonationView.as_view(), name='donations'),
    path('vote/<int:req_userid>', VoteView.as_view(), name='vote')
]