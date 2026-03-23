from django.db import models
from django.conf import settings
from projects.models import Project

class WeeklyRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='weekly_records', verbose_name="Usuario")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='workload_records', verbose_name="Proyecto")
    week_start_date = models.DateField(verbose_name="Inicio de Semana", help_text="Lunes de la semana que se reporta")
    percentage_allocated = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        verbose_name="Porcentaje Reportado (%)",
        help_text="Porcentaje de la capacidad semanal asignado (0.0 a 100.0)"
    )
    
    @property
    def hours_calculated(self):
        """Calcula el equivalente en horas reales basándose en el registro y la capacidad del usuario."""
        if self.user and self.user.weekly_capacity:
            return round((self.percentage_allocated / 100) * self.user.weekly_capacity, 2)
        return 0

    class Meta:
        # Un usuario no debería tener dos registros distintos para el MISMO proyecto en la MISMA semana.
        unique_together = ('user', 'project', 'week_start_date')
        verbose_name = "Registro Semanal"
        verbose_name_plural = "Registros Semanales"

    def __str__(self):
        return f"{self.user} | {self.project} | {self.week_start_date} ({self.percentage_allocated}%)"
