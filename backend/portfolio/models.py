from django.db import models
from solo.models import SingletonModel


class Hero(SingletonModel):

    image=models.ImageField(
        upload_to='hero/'
    )

    def __str__(self):

        return "Hero Settings"



class Resume(SingletonModel):

    file=models.FileField(
        upload_to='resume/'
    )

    def __str__(self):

        return "Resume Settings"



class Contact(models.Model):

    name=models.CharField(
        max_length=100
    )

    email=models.EmailField()

    message=models.TextField()

    created_at=models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.name