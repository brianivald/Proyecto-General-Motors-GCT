from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, UserProjectViewSet

router = DefaultRouter()
router.register(r'assignments', UserProjectViewSet, basename='userproject')
router.register(r'', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
]
