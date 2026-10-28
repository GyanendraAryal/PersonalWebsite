from django.urls import path
from .views import WorkAPIView

urlpatterns = [
    path("", WorkAPIView.as_view(), name="work"),
]
