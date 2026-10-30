import json
from tempfile import TemporaryDirectory
from unittest.mock import patch

from cloudinary.exceptions import Error
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import RequestFactory, TestCase, override_settings
from rest_framework.test import APIClient

from .admin import ResumeAdmin, ResumeAdminForm
from .models import Contact, Resume
from .storage import resume_storage, store_resume


class ResumeAdminTests(TestCase):
    def setUp(self):
        self.request = RequestFactory().get("/admin/portfolio/resume/")
        self.model_admin = ResumeAdmin(Resume, None)
        self.media_dir = TemporaryDirectory()
        self.original_storage_location = resume_storage._location
        self.original_storage_base_url = resume_storage._base_url
        resume_storage._location = self.media_dir.name
        resume_storage._base_url = "http://testserver/api/resume/files/"
        resume_storage.__dict__.pop("location", None)
        resume_storage.__dict__.pop("base_url", None)
        self.addCleanup(self.restore_resume_storage)

    def restore_resume_storage(self):
        resume_storage._location = self.original_storage_location
        resume_storage._base_url = self.original_storage_base_url
        resume_storage.__dict__.pop("location", None)
        resume_storage.__dict__.pop("base_url", None)
        self.media_dir.cleanup()

    def test_admin_pages_render_for_resume_crud(self):
        admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secure-test-password",
        )
        self.client.force_login(admin_user)
        resume = Resume.objects.create(
            title="Existing resume",
            file_url="https://res.cloudinary.com/demo/raw/upload/existing.pdf",
            public_id="portfolio/resumes/existing",
        )

        for url in (
            "/admin/portfolio/resume/",
            "/admin/portfolio/resume/add/",
            f"/admin/portfolio/resume/{resume.pk}/change/",
        ):
            with self.subTest(url=url):
                response = self.client.get(url)
                self.assertEqual(response.status_code, 200)

    def test_openapi_schema_and_documentation_pages_are_available(self):
        schema_response = self.client.get("/api/schema/?format=json")
        swagger_response = self.client.get("/api/schema/swagger-ui/")
        redoc_response = self.client.get("/api/schema/redoc/")

        self.assertEqual(schema_response.status_code, 200)
        schema = json.loads(schema_response.content)
        self.assertIn("/api/resume/", schema["paths"])
        self.assertIn("/api/images/", schema["paths"])
        self.assertIn("/api/token/", schema["paths"])
        self.assertIn("/api/user/", schema["paths"])
        self.assertIn("/api/contact/", schema["paths"])
        self.assertIn("/api/contacts/", schema["paths"])
        self.assertIn("/api/work/", schema["paths"])
        self.assertIn("/api/work/profile/", schema["paths"])
        self.assertIn("/api/work/services/", schema["paths"])
        self.assertIn("/api/work/skills/", schema["paths"])
        self.assertEqual(swagger_response.status_code, 200)
        self.assertEqual(redoc_response.status_code, 200)

    def test_resume_data_is_public_but_mutations_require_admin(self):
        resume = Resume.objects.create(
            title="Existing resume",
            file_url="https://res.cloudinary.com/demo/raw/upload/existing.pdf",
            public_id="portfolio/resumes/existing",
        )
        client = APIClient()

        self.assertEqual(client.get("/api/resume/").status_code, 200)
        self.assertEqual(client.post("/api/resume/upload/", {}).status_code, 401)
        self.assertEqual(client.delete(f"/api/resume/{resume.pk}/").status_code, 401)
        self.assertTrue(Resume.objects.filter(pk=resume.pk).exists())

    @patch("portfolio.serializers.store_resume")
    def test_api_rejects_non_pdf_invalid_pdf_and_oversized_resume(self, store):
        admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secure-test-password",
        )
        client = APIClient()
        client.force_authenticate(user=admin_user)
        invalid_uploads = (
            SimpleUploadedFile("resume.txt", b"%PDF-1.7 sample", content_type="application/pdf"),
            SimpleUploadedFile("resume.pdf", b"not a PDF", content_type="application/pdf"),
            SimpleUploadedFile(
                "resume.pdf",
                b"%PDF-" + b"0" * (10 * 1024 * 1024),
                content_type="application/pdf",
            ),
        )

        for uploaded_file in invalid_uploads:
            with self.subTest(filename=uploaded_file.name, size=uploaded_file.size):
                response = client.post(
                    "/api/resume/upload/",
                    {"title": "My resume", "file": uploaded_file},
                    format="multipart",
                )
                self.assertEqual(response.status_code, 400)
                self.assertIn("file", response.json())

        store.assert_not_called()
        self.assertEqual(Resume.objects.count(), 0)

    def test_api_upload_accepts_valid_pdf_and_replaces_active_resume(self):
        admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secure-test-password",
        )
        previous = Resume.objects.create(
            title="Previous resume",
            file_url="https://res.cloudinary.com/demo/raw/upload/previous.pdf",
            public_id="portfolio/resumes/previous",
        )
        client = APIClient()
        client.force_authenticate(user=admin_user)

        response = client.post(
            "/api/resume/upload/",
            {
                "title": "New resume",
                "file": SimpleUploadedFile(
                    "resume.pdf",
                    b"%PDF-1.7 valid sample",
                    content_type="application/pdf",
                ),
            },
            format="multipart",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["file_url"], Resume.objects.get(is_active=True).file_url)
        self.assertTrue(response.json()["is_active"])
        self.assertTrue(response.json()["file_url"].startswith("http://testserver/api/resume/files/"))
        public_response = client.get("/api/resume/")
        self.assertEqual(public_response.status_code, 200)
        self.assertEqual(public_response.json()["file_url"], response.json()["file_url"])
        file_response = client.get(response.json()["file_url"])
        self.assertEqual(file_response.status_code, 200)
        self.assertEqual(file_response["Content-Type"], "application/pdf")
        self.assertEqual(b"".join(file_response.streaming_content), b"%PDF-1.7 valid sample")
        previous.refresh_from_db()
        self.assertFalse(previous.is_active)
        self.assertTrue(Resume.objects.get(is_active=True).public_id.startswith("local:"))

    def test_public_image_reads_work_but_admin_data_is_protected(self):
        client = APIClient()

        self.assertEqual(client.get("/api/images/").status_code, 200)
        self.assertEqual(client.post("/api/images/", {}).status_code, 401)
        self.assertEqual(client.get("/api/contacts/").status_code, 401)

    @override_settings(CORS_ALLOWED_ORIGINS=["https://personal-website-nwbx.vercel.app"])
    def test_allowed_frontend_can_preflight_admin_login(self):
        response = self.client.options(
            "/api/token/",
            HTTP_ORIGIN="https://personal-website-nwbx.vercel.app",
            HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response["access-control-allow-origin"],
            "https://personal-website-nwbx.vercel.app",
        )

    @patch("portfolio.models.cloudinary.uploader.destroy")
    def test_staff_admin_can_manage_resume_api(self, destroy):
        admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secure-test-password",
        )
        resume = Resume.objects.create(
            title="Existing resume",
            file_url="https://res.cloudinary.com/demo/raw/upload/existing.pdf",
            public_id="portfolio/resumes/existing",
        )
        client = APIClient()
        client.force_authenticate(user=admin_user)

        response = client.delete(f"/api/resume/{resume.pk}/")

        self.assertEqual(response.status_code, 204)
        self.assertFalse(Resume.objects.filter(pk=resume.pk).exists())
        destroy.assert_called_once_with(resume.public_id, resource_type="raw")

    def test_new_resume_requires_a_pdf_upload(self):
        form = ResumeAdminForm(data={"title": "My resume", "is_active": True})

        self.assertFalse(form.is_valid())
        self.assertIn("resume_file", form.errors)

    @patch("portfolio.admin.store_resume")
    def test_admin_rejects_non_pdf_files_without_uploading(self, store):
        non_pdf = SimpleUploadedFile("resume.txt", b"not a PDF")
        form = ResumeAdminForm(
            data={"title": "My resume", "is_active": True},
            files={"resume_file": non_pdf},
        )

        self.assertFalse(form.is_valid())
        self.assertIn("resume_file", form.errors)
        store.assert_not_called()

    @patch("portfolio.admin.store_resume")
    def test_local_storage_error_is_reported_on_the_form(self, store):
        store.side_effect = OSError("Storage unavailable")
        pdf = SimpleUploadedFile("resume.pdf", b"%PDF-1.7 sample")
        form = ResumeAdminForm(
            data={"title": "My resume", "is_active": True},
            files={"resume_file": pdf},
        )

        self.assertFalse(form.is_valid())
        self.assertIn("Local resume storage failed", str(form.errors["resume_file"]))

    def test_admin_uploads_pdf_to_local_storage_and_saves_public_url(self):
        pdf = SimpleUploadedFile("resume.pdf", b"%PDF-1.7 sample", content_type="application/pdf")
        form = ResumeAdminForm(
            data={"title": "My resume", "is_active": True},
            files={"resume_file": pdf},
        )

        self.assertTrue(form.is_valid(), form.errors)
        resume = form.save()

        self.assertTrue(resume.file_url.startswith("http://testserver/api/resume/files/"))
        self.assertTrue(resume.public_id.startswith("local:"))
        response = self.client.get(resume.file_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(b"".join(response.streaming_content), b"%PDF-1.7 sample")

    def test_existing_resume_can_be_edited_without_reuploading(self):
        resume = Resume.objects.create(
            title="Existing resume",
            file_url="https://res.cloudinary.com/demo/raw/upload/existing.pdf",
            public_id="portfolio/resumes/existing",
            is_active=False,
        )
        form = ResumeAdminForm(
            data={"title": "Updated title", "is_active": False},
            instance=resume,
        )

        self.assertTrue(form.is_valid(), form.errors)
        self.assertNotIn("resume_file", self.model_admin.get_fields(self.request, resume))
        updated_resume = form.save()

        self.assertEqual(updated_resume.title, "Updated title")
        self.assertEqual(updated_resume.file_url, resume.file_url)

    def test_new_upload_makes_previous_resume_inactive(self):
        previous = Resume.objects.create(
            title="Previous resume",
            file_url="https://res.cloudinary.com/demo/raw/upload/previous.pdf",
            public_id="portfolio/resumes/previous",
        )
        pdf = SimpleUploadedFile("new.pdf", b"%PDF-1.7 sample")
        form = ResumeAdminForm(
            data={"title": "New resume", "is_active": True},
            files={"resume_file": pdf},
        )

        self.assertTrue(form.is_valid(), form.errors)
        form.save()

        previous.refresh_from_db()
        self.assertFalse(previous.is_active)

    def test_delete_removes_a_locally_stored_resume_file(self):
        pdf = SimpleUploadedFile("resume.pdf", b"%PDF-1.7 sample")
        name, public_id, file_url = store_resume(pdf)
        resume = Resume.objects.create(
            title="Local resume",
            file_url=file_url,
            public_id=public_id,
        )
        self.assertTrue(resume_storage.exists(name))

        resume.delete()

        self.assertFalse(resume_storage.exists(name))

    @patch("portfolio.models.cloudinary.uploader.destroy")
    def test_admin_bulk_delete_removes_raw_cloudinary_asset(self, destroy):
        resume = Resume.objects.create(
            title="Delete me",
            file_url="https://res.cloudinary.com/demo/raw/upload/delete.pdf",
            public_id="portfolio/resumes/delete",
        )

        self.model_admin.delete_queryset(self.request, Resume.objects.filter(pk=resume.pk))

        self.assertFalse(Resume.objects.filter(pk=resume.pk).exists())
        destroy.assert_called_once_with(resume.public_id, resource_type="raw")

    @patch("portfolio.models.cloudinary.uploader.destroy")
    def test_cloudinary_delete_failure_preserves_resume_record(self, destroy):
        resume = Resume.objects.create(
            title="Keep me",
            file_url="https://res.cloudinary.com/demo/raw/upload/keep.pdf",
            public_id="portfolio/resumes/keep",
        )
        destroy.side_effect = Error("Cloudinary unavailable")

        with self.assertRaises(Error):
            resume.delete()

        self.assertTrue(Resume.objects.filter(pk=resume.pk).exists())


class ContactAPITests(TestCase):
    def test_public_contact_endpoint_rejects_short_messages_and_saves_valid_ones(self):
        client = APIClient()
        payload = {
            "name": "Visitor",
            "email": "visitor@example.com",
            "message": "Too short",
        }

        rejected = client.post("/api/contact/", payload, format="json")

        self.assertEqual(rejected.status_code, 400)
        self.assertEqual(Contact.objects.count(), 0)

        payload["message"] = "A message long enough to submit."
        accepted = client.post("/api/contact/", payload, format="json")

        self.assertEqual(accepted.status_code, 201)
        self.assertEqual(Contact.objects.get().message, payload["message"])
