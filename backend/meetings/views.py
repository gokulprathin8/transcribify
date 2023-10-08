import uuid
import boto3
from rest_framework.response import Response

from backend.settings import env
from rest_framework import generics, permissions

from meetings.models import AWSTranscriptions, Meetings, TranscriptionStatus

from meetings.serializer import CreateMeetingSerializer


class CreateMeeting(generics.CreateAPIView):
    serializer_class = CreateMeetingSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        data = request.data
        transcribe = boto3.client('transcribe', region_name='us-east-1',
                                  aws_access_key_id=env('aws_access_key_id'),
                                  aws_secret_access_key=env('aws_secret_access_key'),
                                  aws_session_token=env('aws_session_token'))
        job_name = str(uuid.uuid4())
        output_bucket = 'gmu-hackathon-devbucket0g33v4'

        meeting = Meetings.objects.create(
            title=data["title"],
            video_url=data["video_url"]
        )

        resp = transcribe.start_transcription_job(
            TranscriptionJobName=job_name,
            Media={'MediaFileUri': request.data['video_url']},
            MediaFormat='mp4',  # Change this format according to your video format
            LanguageCode=request.data['language_code'],
            Settings={
                'ShowSpeakerLabels': True,
                'MaxSpeakerLabels': 6,
            },
            OutputBucketName=output_bucket
        )

        AWSTranscriptions.objects.create(
            meeting=meeting,
            transcription_id=resp['TranscriptionJob']['TranscriptionJobName'],
            transcription_url="",
            status=TranscriptionStatus.IN_PROGRESS
        )

        return Response(data=resp)
