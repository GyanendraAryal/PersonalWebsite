from django.contrib import admin
from .models import Work


# Register your models here.
class WorkAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "live_url", "created_at")
    ordering = ("id",)
    search_fields = ("title",)


admin.site.register(Work, WorkAdmin)
