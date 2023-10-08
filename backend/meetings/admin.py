from django.contrib import admin
from .models import Meetings, MeetingNotes, AWSTranscriptions


admin.site.register(Meetings)
admin.site.register(MeetingNotes)
admin.site.register(AWSTranscriptions)
