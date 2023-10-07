from django.urls import path, include
from accounts.views import UserRegistrationView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
]
