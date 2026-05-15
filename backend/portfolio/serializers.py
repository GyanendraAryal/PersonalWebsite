from rest_framework import serializers

from .models import (
    Hero,
    Resume,
    Contact
)


class HeroSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()

    class Meta:
        model = Hero
        fields = ['id', 'image']

    def get_image(self, obj):

        if not obj.image:
            return None

        return obj.image.url


class ResumeSerializer(serializers.ModelSerializer):

    file = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ['id', 'file']

    def get_file(self, obj):

        if not obj.file:
            return None

        return obj.file.url


class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = [
            'name',
            'email',
            'message'
        ]

    def validate_message(self, value):

        if len(value.strip()) < 10:
            raise serializers.ValidationError(
                "Message too short."
            )

        return value