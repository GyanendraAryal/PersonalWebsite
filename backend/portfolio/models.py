from django.db import models
from django.core.exceptions import ValidationError

from solo.models import SingletonModel
from cloudinary.models import CloudinaryField
from cloudinary_storage.storage import RawMediaCloudinaryStorage


# =========================
# Validators
# =========================

def validate_image(image):
    """
    Validate hero image uploads.
    """

    max_size = 3 * 1024 * 1024  # 3 MB

    if image.size > max_size:
        raise ValidationError(
            "Image size must be below 3MB."
        )


def validate_resume(file):
    """
    Validate resume uploads.
    """

    max_size = 5 * 1024 * 1024  # 5 MB

    if file.size > max_size:
        raise ValidationError(
            "Resume file size must be below 5MB."
        )

    allowed_extensions = [".pdf"]

    file_name = file.name.lower()

    if not any(file_name.endswith(ext) for ext in allowed_extensions):
        raise ValidationError(
            "Only PDF files are allowed."
        )


# =========================
# Hero Model
# =========================

class Hero(SingletonModel):

    image = CloudinaryField(
        'image',
        folder='portfolio/hero'
    )

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"

    def __str__(self):
        return "Hero Settings"


# =========================
# Resume Model
# =========================

class Resume(SingletonModel):

    file = models.FileField(
        upload_to='resume/',
        storage=RawMediaCloudinaryStorage(),
        validators=[validate_resume]
    )

    class Meta:
        verbose_name = "Resume"
        verbose_name_plural = "Resume"

    def __str__(self):
        return "Resume Settings"


# =========================
# Contact Model
# =========================

class Contact(models.Model):

    name = models.CharField(
        max_length=100
    )

    email = models.EmailField(
        db_index=True
    )

    message = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name