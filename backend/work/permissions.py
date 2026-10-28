from rest_framework.permissions import BasePermission


class AdminOnlyRoute(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False
