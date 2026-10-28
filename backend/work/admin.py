from django.contrib import admin
from .models import PortfolioProfile, Service, SkillCategory, Work


class WorkAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "tag", "live_url", "created_at")
    ordering = ("id",)
    search_fields = ("title",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "tag", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    ordering = ("display_order", "id")
    search_fields = ("title", "tag", "description")


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ("label", "display_order", "is_active")
    list_editable = ("display_order", "is_active")
    ordering = ("display_order", "id")
    search_fields = ("label",)


admin.site.register(Work, WorkAdmin)


@admin.register(PortfolioProfile)
class PortfolioProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Identity", {"fields": ("display_name", "is_available")}),
        ("Homepage", {"fields": ("hero_roles", "hero_summary")}),
        ("Profile copy", {"fields": ("resume_summary", "contact_summary", "footer_summary")}),
        ("Contact details", {
            "fields": (
                "contact_email",
                "location",
                "github_url",
                "linkedin_url",
                "instagram_url",
            )
        }),
    )

    def has_add_permission(self, request):
        return not PortfolioProfile.objects.exists()
