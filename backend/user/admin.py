from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group, User as DjangoUser

from .models import User


class SingleAdminUserAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    readonly_fields = ("last_login", "date_joined")
    list_display = ("username", "email", "is_active")
    search_fields = ("username", "email")
    ordering = ("username",)

    def has_add_permission(self, request):
        return not User.objects.exists() and super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

    def save_model(self, request, obj, form, change):
        obj.is_staff = True
        obj.is_superuser = True
        super().save_model(request, obj, form, change)


admin.site.unregister(Group)
admin.site.unregister(DjangoUser)
admin.site.register(User, SingleAdminUserAdmin)
