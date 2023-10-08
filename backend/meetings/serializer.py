from .models import Meetings
from rest_framework import serializers


class CreateMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meetings
        fields = ('title', 'video_url', 'owner',)


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

