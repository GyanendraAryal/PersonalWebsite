from django.contrib import admin

from solo.admin import SingletonModelAdmin

from .models import (
    Hero,
    Resume,
    Contact
)


@admin.register(Hero)
class HeroAdmin(SingletonModelAdmin):
    pass


@admin.register(Resume)
class ResumeAdmin(SingletonModelAdmin):
    pass


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'email',
        'created_at'
    )

    search_fields = (
        'name',
        'email'
    )

    list_filter = (
        'created_at',
    )

    ordering = (
        '-created_at',
    )