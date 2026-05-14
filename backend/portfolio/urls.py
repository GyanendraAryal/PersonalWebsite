from django.urls import path
from .views import HeroView, ResumeView, ContactCreateView

urlpatterns = [
    path('hero/', HeroView.as_view()),
    path('resume/', ResumeView.as_view()),
    path('contact/', ContactCreateView.as_view()),
]