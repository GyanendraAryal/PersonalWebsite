from django.urls import path
from .views import AdminProfileView

urlpatterns = [
    path("",AdminProfileView.as_view())
]
