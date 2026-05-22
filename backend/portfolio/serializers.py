from rest_framework import serializers
import cloudinary.uploader
from .models import PortfolioImage, Resume, Contact


class PortfolioImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(write_only=True, required=True)

    class Meta:
        model = PortfolioImage
        fields = ['id', 'title', 'category', 'image_url', 'public_id', 'created_at', 'image']
        read_only_fields = ['id', 'image_url', 'public_id', 'created_at']

    def create(self, validated_data):
        image_file = validated_data.pop('image')
        result = cloudinary.uploader.upload(
            image_file,
            folder='portfolio/images',
            resource_type='image',
        )
        return PortfolioImage.objects.create(
            image_url=result['secure_url'],
            public_id=result['public_id'],
            **validated_data
        )

    def update(self, instance, validated_data):
        validated_data.pop('image', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ResumeSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ['id', 'title', 'file', 'file_url', 'uploaded_at', 'is_active']
        read_only_fields = ['id', 'uploaded_at', 'file_url']

    def get_file_url(self, obj):
        if obj.file:
            return obj.file.url
        return None

    def validate_file(self, value):
        if not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError("Only PDF files are allowed.")
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError("Resume must be under 10MB.")
        return value


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message too short.")
        return value
