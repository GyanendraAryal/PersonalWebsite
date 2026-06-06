from django.db import models
from django.core.exceptions import ValidationError
import cloudinary
from cloudinary_storage.storage import RawMediaCloudinaryStorage


ALLOWED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']


def validate_image_file(file):
    if hasattr(file, 'content_type') and file.content_type not in ALLOWED_IMAGE_FORMATS:
        raise ValidationError("Only JPEG, PNG, WebP, and GIF images are allowed.")
    if file.size > 5 * 1024 * 1024:
        raise ValidationError("Image must be under 5MB.")


def validate_pdf(file):
    if not file.name.lower().endswith('.pdf'):
        raise ValidationError("Only PDF files are allowed.")
    if file.size > 10 * 1024 * 1024:
        raise ValidationError("Resume must be under 10MB.")


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
            cloudinary.uploader.destroy(self.public_id)
        super().delete(*args, **kwargs)


class Resume(models.Model):
    title = models.CharField(max_length=200, default='Resume')
    file = models.FileField(
        upload_to='resumes/',
        storage=RawMediaCloudinaryStorage(),
        validators=[validate_pdf]
    )
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


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(db_index=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
