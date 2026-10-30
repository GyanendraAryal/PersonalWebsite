import os
import uuid
from pathlib import Path

from django.conf import settings
from django.core.files.storage import FileSystemStorage


LOCAL_RESUME_PREFIX = "local:"


class ResumeFileSystemStorage(FileSystemStorage):
    def __init__(self):
        location = os.environ.get(
            "RESUME_STORAGE_ROOT",
            str(Path(settings.BASE_DIR) / "media" / "resumes"),
        )
        base_url = os.environ.get(
            "RESUME_PUBLIC_BASE_URL",
            "http://127.0.0.1:8000/api/resume/files/",
        )
        if not base_url.endswith("/"):
            base_url = f"{base_url}/"
        super().__init__(location=location, base_url=base_url)


resume_storage = ResumeFileSystemStorage()


def store_resume(uploaded_file):
    name = resume_storage.save(f"{uuid.uuid4().hex}.pdf", uploaded_file)
    return name, f"{LOCAL_RESUME_PREFIX}{name}", resume_storage.url(name)
