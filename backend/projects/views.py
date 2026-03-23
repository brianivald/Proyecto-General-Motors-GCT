from rest_framework import viewsets
from .models import Project, UserProject
from .serializers import ProjectSerializer, UserProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """Endpoints CRUD base para manejar el catálogo de proyectos activos"""
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class UserProjectViewSet(viewsets.ModelViewSet):
    """Endpoint para asignar empleados a los proyectos con un rol específico"""
    queryset = UserProject.objects.all()
    serializer_class = UserProjectSerializer
