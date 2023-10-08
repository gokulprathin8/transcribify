from rest_framework import views, permissions, status
from rest_framework.response import Response
from django.db.models import Count, Q
from meetings.models import Meetings, AWSTranscriptions, MeetingNotes

class DashboardAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        dashboard_data = {'total_notes': MeetingNotes.objects.filter(meeting__owner=user).count(),
                          'total_meetings': Meetings.objects.filter(owner=user).count(),
                          'total_transcribed_meetings': AWSTranscriptions.objects.filter(
                              meeting__owner=user).count(), 'status_counts': AWSTranscriptions.objects.filter(
                meeting__owner=user
            ).values('status').annotate(
                total=Count('status')
            ).order_by('status')}
        return Response(dashboard_data, status=status.HTTP_200_OK)
