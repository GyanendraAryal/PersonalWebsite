from django.contrib import admin
from solo.admin import SingletonModelAdmin

from .models import *


admin.site.register(
Hero,
SingletonModelAdmin
)

admin.site.register(
Resume,
SingletonModelAdmin
)

admin.site.register(
Contact
)