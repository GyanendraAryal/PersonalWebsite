from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import PortfolioImage, Resume, Contact
from .serializers import PortfolioImageSerializer, ResumeSerializer, ContactSerializer


class PortfolioImageListCreateView(generics.ListCreateAPIView):
    serializer_class = PortfolioImageSerializer
    parser_classes = [MultiPartParser, FormParser]

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

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)


class ResumeListView(APIView):
    def get(self, request):
        active = Resume.objects.filter(is_active=True).first()
        if not active:
            return Response({'file_url': None, 'id': None})
        return Response(ResumeSerializer(active).data)


class ResumeUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = ResumeSerializer(data=request.data)
        if serializer.is_valid():
            resume = serializer.save(is_active=True)
            return Response(ResumeSerializer(resume).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResumeDeleteView(generics.DestroyAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer


class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
