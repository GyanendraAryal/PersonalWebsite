from django.db import models


# Create your models here.
class Work(models.Model):
    tag = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.JSONField(default=list, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    live_url = models.URLField(max_length=500, null=True, blank=True)
    repo_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.title


class Service(models.Model):
    icon = models.CharField(max_length=50)
    tag = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "id"]

    def __str__(self):
        return self.title


class SkillCategory(models.Model):
    icon = models.CharField(max_length=50)
    label = models.CharField(max_length=100)
    skills = models.JSONField(default=list, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["display_order", "id"]
        verbose_name_plural = "skill categories"

    def __str__(self):
        return self.label


class PortfolioProfile(models.Model):
    id = models.PositiveSmallIntegerField(
        primary_key=True,
        default=1,
        editable=False,
    )
    display_name = models.CharField(max_length=100)
    hero_roles = models.JSONField(default=list, blank=True)
    hero_summary = models.TextField()
    resume_summary = models.TextField()
    contact_summary = models.TextField()
    footer_summary = models.TextField()
    is_available = models.BooleanField(default=True)
    contact_email = models.EmailField()
    location = models.CharField(max_length=150)
    github_url = models.URLField(max_length=500, blank=True)
    linkedin_url = models.URLField(max_length=500, blank=True)
    instagram_url = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return self.display_name
