from django.urls import path
from .views import DashboardAPIView

urlpatterns = [
    path('stats/', DashboardAPIView.as_view(), name='dashboard-api-view'),
]
