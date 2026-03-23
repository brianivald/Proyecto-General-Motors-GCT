from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint para listar y consultar empleados de GM.
    Usa ReadOnly porque los usuarios suelen crearse por sincronización de LDAP/Active Directory o por Administradores.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
