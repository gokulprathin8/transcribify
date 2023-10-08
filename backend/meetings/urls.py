from django.urls import path
from . import views

urlpatterns = [
    path("create_meeting/", views.CreateMeeting.as_view(), name='create-meeting'),
]
