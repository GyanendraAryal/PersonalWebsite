from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers


# Create your views here.
class AdminProfileView(APIView):
    permission_classes = [IsAdminUser]

    @extend_schema(
        responses=inline_serializer(
            name="AdminProfileResponse",
            fields={"data": UserSerializer()},
        ),
        description="Return the authenticated admin profile.",
    )
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(
            {
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        request=UserSerializer,
        responses=inline_serializer(
            name="AdminProfileUpdateResponse",
            fields={
                "message": serializers.CharField(),
                "data": UserSerializer(),
            },
        ),
        description="Update the authenticated admin's profile fields.",
    )
    def patch(self, request):
        serializer = UserSerializer(
            instance=request.user,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "message": "User updated successfully",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )


class PingAPIView(APIView):
    def get(self, request):
        return Response(
            {"message": "Request received"},
            status=status.HTTP_200_OK,
        )
