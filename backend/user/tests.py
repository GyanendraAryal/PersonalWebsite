from types import SimpleNamespace

from django.contrib import admin
from django.contrib.auth.models import User as DjangoUser
from django.test import RequestFactory, TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from .admin import SingleAdminUserAdmin
from .models import User
from .views import AdminProfileView


class SingleAdminUserAdminTests(TestCase):
    def setUp(self):
        self.model_admin = SingleAdminUserAdmin(User, admin.site)
        self.request = RequestFactory().get("/admin/user/user/add/")
        self.request.user = SimpleNamespace(has_perm=lambda _permission: True)

    def test_first_admin_account_can_be_created(self):
        self.assertTrue(self.model_admin.has_add_permission(self.request))

    def test_adding_another_account_is_disabled(self):
        User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secure-test-password",
        )

        self.assertFalse(self.model_admin.has_add_permission(self.request))

    def test_accounts_created_in_admin_are_superusers(self):
        user = User(username="admin")
        user.set_password("secure-test-password")

        self.model_admin.save_model(
            self.request,
            user,
            form=None,
            change=False,
        )

        user.refresh_from_db()
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_admin_accounts_cannot_be_deleted_in_admin(self):
        self.assertFalse(self.model_admin.has_delete_permission(self.request))

    def test_profile_endpoint_returns_safe_auth_user_fields(self):
        user = DjangoUser.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="secure-test-password",
        )
        request = APIRequestFactory().get("/api/user/")
        force_authenticate(request, user=user)

        response = AdminProfileView.as_view()(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["data"]["username"], "admin")
        self.assertNotIn("password", response.data["data"])
