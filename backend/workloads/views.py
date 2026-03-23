from rest_framework import viewsets
from .models import WeeklyRecord
from .serializers import WeeklyRecordSerializer

class WeeklyRecordViewSet(viewsets.ModelViewSet):
    """
    Endpoint principal de transacciones del SGCT. 
    Aquí es donde el Frontend enviará (POST/PATCH) las horas capturadas por el usuario.
    """
    queryset = WeeklyRecord.objects.all()
    serializer_class = WeeklyRecordSerializer
