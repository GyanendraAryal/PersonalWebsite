from django.urls import path
from .views import (
    PortfolioImageListCreateView,
    PortfolioImageDetailView,
    ResumeListView,
    ResumeUploadView,
    ResumeDeleteView,
    ContactCreateView,
)

urlpatterns = [
    path('images/', PortfolioImageListCreateView.as_view()),
    path('images/<int:pk>/', PortfolioImageDetailView.as_view()),
    path('resume/', ResumeListView.as_view()),
    path('resume/upload/', ResumeUploadView.as_view()),
    path('resume/<int:pk>/', ResumeDeleteView.as_view()),
    path('contact/', ContactCreateView.as_view()),
]
