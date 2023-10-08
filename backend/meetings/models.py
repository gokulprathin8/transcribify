from django.db import models
from django.utils.translation import gettext_lazy as _


class TranscriptionStatus(models.TextChoices):
    STARTED = 'STARTED', _('STARTED')
    IN_PROGRESS = 'IN_PROGRESS', _('IN_PROGRESS')
    COMPLETED = 'COMPLETED', _('COMPLETED')


class Meetings(models.Model):
    title = models.TextField(max_length=1024, null=False, blank=False)
    video_url = models.URLField(null=False, blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class AWSTranscriptions(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    transcription_url = models.URLField(blank=False, null=False)
    transcription_id = models.UUIDField(blank=False, null=False)
    status = models.CharField(max_length=255,
                              choices=TranscriptionStatus.choices,
                              default=TranscriptionStatus.STARTED)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MeetingNotes(models.Model):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE)
    note = models.TextField(max_length=2048, null=True, blank=True)
    is_important = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
