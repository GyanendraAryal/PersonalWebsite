from django.contrib import admin
from django import forms
from django.core.exceptions import SuspiciousFileOperation, ValidationError
from django.utils.html import format_html

from .models import PortfolioImage, Resume, Contact
from .storage import store_resume
from .validators import get_resume_file_error


@admin.register(PortfolioImage)
class PortfolioImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title']
    ordering = ['-created_at']


class ResumeAdminForm(forms.ModelForm):
    resume_file = forms.FileField(
        required=False,
        label="PDF file",
        help_text="Upload a PDF to local storage. Add a new resume to replace the active version.",
    )

    class Meta:
        model = Resume
        fields = ["title", "is_active", "resume_file"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance._state.adding:
            self.fields["resume_file"].required = True

    def clean_resume_file(self):
        uploaded_file = self.cleaned_data.get("resume_file")
        if uploaded_file is None:
            return None

        error = get_resume_file_error(uploaded_file)
        if error:
            raise ValidationError(error)
        return uploaded_file

    def clean(self):
        cleaned_data = super().clean()
        if self.errors:
            return cleaned_data

        uploaded_file = cleaned_data.get("resume_file")
        if uploaded_file is None:
            return cleaned_data

        try:
            self.resume_storage_details = store_resume(uploaded_file)
        except (OSError, SuspiciousFileOperation) as exc:
            self.add_error("resume_file", f"Local resume storage failed: {exc}")
        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        storage_details = getattr(self, "resume_storage_details", None)
        if storage_details:
            _, instance.public_id, instance.file_url = storage_details

        if commit:
            instance.save()
            self.save_m2m()
        return instance


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    form = ResumeAdminForm
    list_display = ['title', 'is_active', 'uploaded_at', 'file_link']
    list_filter = ['is_active', 'uploaded_at']
    search_fields = ['title']
    ordering = ['-uploaded_at']
    readonly_fields = ['file_url', 'public_id', 'uploaded_at']
    fields = ['title', 'is_active', 'resume_file', 'file_url', 'public_id', 'uploaded_at']

    @admin.display(description="Resume file")
    def file_link(self, obj):
        return format_html('<a href="{}" target="_blank" rel="noopener">View PDF</a>', obj.file_url)

    def get_fields(self, request, obj=None):
        fields = super().get_fields(request, obj)
        if obj is not None and "resume_file" in fields:
            fields.remove("resume_file")
        return fields

    def delete_queryset(self, _request, queryset):
        for resume in queryset.iterator():
            resume.delete()


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email']
    readonly_fields = ['name', 'email', 'message', 'created_at']
    ordering = ['-created_at']