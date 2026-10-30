from django.db import models
import cloudinary.uploader
from .storage import LOCAL_RESUME_PREFIX, resume_storage


class PortfolioImage(models.Model):
    CATEGORY_CHOICES = [
        ('hero', 'Hero'),
        ('work', 'Work'),
        ('about', 'About'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='other')
    image_url = models.URLField(max_length=500)
    public_id = models.CharField(max_length=300, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.category})"

    def delete(self, *args, **kwargs):
        if self.public_id:
            try:
                cloudinary.uploader.destroy(self.public_id)
            except:
                pass  # Continue deletion even if Cloudinary fails
        super().delete(*args, **kwargs)


class Resume(models.Model):
    title = models.CharField(max_length=200, default='Resume')
    file_url = models.URLField(max_length=500)
    public_id = models.CharField(max_length=300)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.title} ({'Active' if self.is_active else 'Inactive'})"

    def save(self, *args, **kwargs):
        if self.is_active:
            Resume.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.public_id:
            if self.public_id.startswith(LOCAL_RESUME_PREFIX):
                resume_storage.delete(self.public_id[len(LOCAL_RESUME_PREFIX):])
            else:
                cloudinary.uploader.destroy(self.public_id, resource_type="raw")
        super().delete(*args, **kwargs)


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.email}"