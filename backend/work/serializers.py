from rest_framework.serializers import ModelSerializer
from .models import PortfolioProfile, Service, SkillCategory, Work


class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work
        fields = "__all__"


class ServiceSerializer(ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "icon", "tag", "title", "description", "display_order"]


class SkillCategorySerializer(ModelSerializer):
    class Meta:
        model = SkillCategory
        fields = ["id", "icon", "label", "skills", "display_order"]


class PortfolioProfileSerializer(ModelSerializer):
    class Meta:
        model = PortfolioProfile
        fields = [
            "display_name",
            "hero_roles",
            "hero_summary",
            "resume_summary",
            "contact_summary",
            "footer_summary",
            "is_available",
            "contact_email",
            "location",
            "github_url",
            "linkedin_url",
            "instagram_url",
        ]
