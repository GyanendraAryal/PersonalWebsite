from django.urls import path
from .views import (
    ServiceListAPIView,
    SkillCategoryListAPIView,
    PortfolioProfileAPIView,
    WorkAPIView,
)

urlpatterns = [
    path("", WorkAPIView.as_view(), name="work"),
    path("profile/", PortfolioProfileAPIView.as_view(), name="portfolio-profile"),
    path("services/", ServiceListAPIView.as_view(), name="services"),
    path("skills/", SkillCategoryListAPIView.as_view(), name="skills"),
]
