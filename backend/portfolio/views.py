from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.throttling import AnonRateThrottle

from .models import (
    Hero,
    Resume,
    Contact
)

from .serializers import (
    HeroSerializer,
    ResumeSerializer,
    ContactSerializer
)


class ContactThrottle(AnonRateThrottle):
    rate = '5/hour'


class HeroView(APIView):

    def get(self, request):

        hero = Hero.get_solo()

        serializer = HeroSerializer(hero)

        return Response(serializer.data)


class ResumeView(APIView):

    def get(self, request):

        resume = Resume.get_solo()

        serializer = ResumeSerializer(resume)

        return Response(serializer.data)


class ContactCreateView(generics.CreateAPIView):

    queryset = Contact.objects.all()

    serializer_class = ContactSerializer

    throttle_classes = [ContactThrottle]