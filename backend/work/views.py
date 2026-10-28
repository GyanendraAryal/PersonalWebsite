from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from drf_spectacular.utils import extend_schema, inline_serializer
from .models import PortfolioProfile, Service, SkillCategory, Work
from .serializers import (
    PortfolioProfileSerializer,
    ServiceSerializer,
    SkillCategorySerializer,
    WorkSerializer,
)

# Create your views here.


class WorkAPIView(APIView):
    @extend_schema(
        responses=inline_serializer(
            name="WorkListResponse",
            fields={"data": WorkSerializer(many=True)},
        ),
        description="List portfolio work items.",
    )
    def get(self, request):
        works = Work.objects.all().order_by("id")
        serializer = WorkSerializer(works, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class ServiceListAPIView(ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.filter(is_active=True)


class SkillCategoryListAPIView(ListAPIView):
    serializer_class = SkillCategorySerializer

    def get_queryset(self):
        return SkillCategory.objects.filter(is_active=True)


class PortfolioProfileAPIView(APIView):
    @extend_schema(
        responses=PortfolioProfileSerializer,
        description="Return public portfolio profile and contact information.",
    )
    def get(self, request):
        profile = get_object_or_404(PortfolioProfile, pk=1)
        return Response(PortfolioProfileSerializer(profile).data)
