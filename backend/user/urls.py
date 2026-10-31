from django.urls import path
from .views import AdminProfileView, PingAPIView

urlpatterns = [
    path("", AdminProfileView.as_view()),
    path("ping/", PingAPIView.as_view()),
]
