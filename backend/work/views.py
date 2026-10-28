from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, inline_serializer
from .models import Work
from .serializers import WorkSerializer

# Create your views here.


class WorkAPIView(APIView):
    @extend_schema(
        responses=inline_serializer(
            name="WorkListResponse",
            fields={"data": WorkSerializer(many=True)},
        ),
        description="List portfolio work items.",
    )
    def get(self, request):
        works = Work.objects.all()
        serializer = WorkSerializer(works, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
