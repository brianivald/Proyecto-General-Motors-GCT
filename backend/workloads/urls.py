from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WeeklyRecordViewSet

router = DefaultRouter()
router.register(r'', WeeklyRecordViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
