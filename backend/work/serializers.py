from rest_framework.serializers import ModelSerializer
from .models import Work


class WorkSerializer(ModelSerializer):
    class Meta:
        model = Work
        fields = "__all__"

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
