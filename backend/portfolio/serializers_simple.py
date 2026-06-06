from rest_framework import serializers
import cloudinary.uploader
from .models import PortfolioImage, Resume, Contact


class PortfolioImageSerializer(serializers.ModelSerializer):
    image = serializers.FileField(write_only=True, required=True)

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
        validated_data.pop('image', None)  # Don't update image
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ResumeSerializer(serializers.ModelSerializer):
    file = serializers.FileField(write_only=True, required=True)
    file_url = serializers.URLField(read_only=True)

    class Meta:
        model = Resume
        fields = ['id', 'title', 'file', 'file_url', 'uploaded_at', 'is_active']
        read_only_fields = ['id', 'file_url', 'uploaded_at']

    def create(self, validated_data):
        file = validated_data.pop('file')
        result = cloudinary.uploader.upload(
            file,
            folder='portfolio/resumes',
            resource_type='raw',
        )
        return Resume.objects.create(
            file_url=result['secure_url'],
            public_id=result['public_id'],
            **validated_data
        )


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message too short.")
        return value


class ContactReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'message', 'created_at']