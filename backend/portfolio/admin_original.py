from django.contrib import admin
from django.utils.html import format_html

from unfold.admin import ModelAdmin

from .models import PortfolioImage, Resume, Contact


@admin.register(PortfolioImage)
class PortfolioImageAdmin(ModelAdmin):
    list_display = (
        "preview",
        "title",
        "category",
        "created_at",
    )

    list_filter = (
        "category",
        "created_at",
    )

    search_fields = (
        "title",
        "category",
    )

    ordering = ("-created_at",)

    readonly_fields = (
        "preview_large",
        "image_url",
        "public_id",
        "created_at",
    )

    fieldsets = (
        ("Portfolio Image", {
            "fields": (
                "title",
                "category",
            ),
        }),

        ("Cloudinary Data", {
            "fields": (
                "image_url",
                "public_id",
            ),
        }),

        ("Preview", {
            "fields": ("preview_large",),
        }),

        ("Metadata", {
            "fields": ("created_at",),
        }),
    )

    def preview(self, obj):
        return format_html(
            """
            <img 
                src="{}" 
                style="
                    height:60px;
                    width:100px;
                    object-fit:cover;
                    border-radius:12px;
                    box-shadow:0 2px 8px rgba(0,0,0,0.15);
                "
            />
            """,
            obj.image_url,
        )

    preview.short_description = "Preview"

    def preview_large(self, obj):
        return format_html(
            """
            <img 
                src="{}" 
                style="
                    max-height:320px;
                    border-radius:16px;
                    box-shadow:0 4px 16px rgba(0,0,0,0.2);
                "
            />
            """,
            obj.image_url,
        )

    preview_large.short_description = "Image Preview"


@admin.register(Resume)
class ResumeAdmin(ModelAdmin):
    list_display = (
        "title",
        "is_active",
        "uploaded_at",
    )

    list_filter = (
        "is_active",
        "uploaded_at",
    )

    search_fields = ("title",)

    ordering = ("-uploaded_at",)

    readonly_fields = ("uploaded_at",)

    fieldsets = (
        ("Resume File", {
            "fields": (
                "title",
                "file",
                "is_active",
            ),
        }),

        ("Metadata", {
            "fields": ("uploaded_at",),
        }),
    )


@admin.register(Contact)
class ContactAdmin(ModelAdmin):
    list_display = (
        "name",
        "email",
        "short_message",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "message",
    )

    list_filter = ("created_at",)

    ordering = ("-created_at",)

    readonly_fields = (
        "name",
        "email",
        "message",
        "created_at",
    )

    fieldsets = (
        ("Contact Information", {
            "fields": (
                "name",
                "email",
            ),
        }),

        ("Message", {
            "fields": ("message",),
        }),

        ("Metadata", {
            "fields": ("created_at",),
        }),
    )

    def short_message(self, obj):
        if len(obj.message) > 50:
            return obj.message[:50] + "..."
        return obj.message

    short_message.short_description = "Message Preview"

    def has_add_permission(self, request):
        return False