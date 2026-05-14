from rest_framework import generics
from .models import Hero, Resume, Contact
from .serializers import (
    HeroSerializer,
    ResumeSerializer,
    ContactSerializer
)


class HeroView(generics.ListAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer


class ResumeView(generics.ListAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer


class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer