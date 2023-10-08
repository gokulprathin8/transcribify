from .models import Meetings, AWSTranscriptions
from rest_framework import serializers


class CreateMeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meetings
        fields = ('title', 'video_url', 'owner',)


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class TranscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AWSTranscriptions
        fields = ('transcription_url', 'transcription_id', 'status',)


class AWSTranscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AWSTranscriptions
        fields = '__all__'
        depth = 1
