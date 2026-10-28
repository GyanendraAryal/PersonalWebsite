from django.contrib.auth.models import User as DjangoUser


class User(DjangoUser):
    class Meta:
        proxy = True
        verbose_name = "Admin account"
        verbose_name_plural = "Admin accounts"
