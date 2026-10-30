from django.http import Http404, HttpResponse
from django.urls import reverse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from drf_spectacular.utils import extend_schema, OpenApiParameter
from django.views.decorators.http import require_GET

from .models import PortfolioImage, Resume, Contact
from .permissions import IsAdminOrReadOnly
from .serializers import (
    PortfolioImageSerializer,
    ResumeSerializer,
    ContactSerializer,
    ContactReadSerializer,
)
from .validators import get_resume_file_error


@require_GET
def resume_file(request, file_path):
    resume = Resume.objects.order_by("-created_at").first()
    if resume is None or not resume.content:
        raise Http404("Resume file not found.")
    response = HttpResponse(bytes(resume.content), content_type="application/pdf")
    response["Content-Disposition"] = 'inline; filename="resume.pdf"'
    return response


class PortfolioImageListCreateView(generics.ListCreateAPIView):
    serializer_class = PortfolioImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAdminOrReadOnly]

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="category",
                type=str,
                location=OpenApiParameter.QUERY,
                enum=["hero", "work", "about", "other"],
                description="Filter images by category.",
            ),
        ],
        description="List portfolio images, optionally filtered by category.",
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @extend_schema(description="Upload an image to Cloudinary. Requires admin authentication.")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def get_queryset(self):
        qs = PortfolioImage.objects.all()
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs


class PortfolioImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PortfolioImage.objects.all()
    serializer_class = PortfolioImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAdminOrReadOnly]

    @extend_schema(description="Retrieve a portfolio image.")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

    @extend_schema(description="Update image title and/or category. Requires admin authentication.")
    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

    @extend_schema(description="Delete the image record and its Cloudinary asset. Requires admin authentication.")
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class ResumeListView(APIView):
    @extend_schema(
        responses=ResumeSerializer,
        description="Return the active resume, or null file URL and ID when none is active.",
    )
    def get(self, request):
        active = Resume.objects.filter(is_active=True).first()
        if not active:
            return Response({'file_url': None, 'id': None})
        return Response(ResumeSerializer(active).data)


class ResumeUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAdminUser]

    @extend_schema(
        request=ResumeSerializer,
        responses={201: ResumeSerializer},
        description="Upload a PDF resume to the database and make it active. Requires admin authentication.",
    )
    def post(self, request):
        uploaded_file = request.FILES.get("file")
        if uploaded_file is None:
            return Response(
                {"file": "A PDF file is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        file_error = get_resume_file_error(uploaded_file)
        if file_error:
            return Response({"file": file_error}, status=status.HTTP_400_BAD_REQUEST)

        title = request.data.get("title") or "Resume"
        if len(title) > Resume._meta.get_field("title").max_length:
            return Response(
                {"title": "Ensure this field has no more than 200 characters."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        file_url = request.build_absolute_uri(
            reverse("resume_file", kwargs={"file_path": "resume.pdf"})
        )
        resume = Resume.objects.create(
            title=title,
            content=uploaded_file.read(),
            file_url=file_url,
            public_id="",
            is_active=True,
        )
        return Response(
            ResumeSerializer(resume).data,
            status=status.HTTP_201_CREATED,
        )


class ResumeDeleteView(generics.DestroyAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAdminUser]

    @extend_schema(description="Delete a resume and its stored file. Requires admin authentication.")
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    @extend_schema(description="Submit a contact message.")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class ContactListView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactReadSerializer
    permission_classes = [IsAdminUser]

    @extend_schema(description="List contact messages. Requires admin authentication.")
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
