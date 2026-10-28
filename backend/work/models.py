from django.db import models


# Create your models here.
class Work(models.Model):
    tag = models.CharField(max_length=50)
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.JSONField(default=list, blank=True)
    live_url = models.URLField(max_length=500, null=True, blank=True)
    repo_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.title
