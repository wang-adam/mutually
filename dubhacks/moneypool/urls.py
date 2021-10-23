from django.urls import path
from moneypool.views import RequestView

urlpatterns = [
    path('requests', RequestView.as_view(), name='requests')
]