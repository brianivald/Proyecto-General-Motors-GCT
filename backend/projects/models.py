from django.db import models
from django.conf import settings

class Project(models.Model):
    STATUS_CHOICES = (
        ('active', 'Activo'),
        ('on_hold', 'En Pausa'),
        ('completed', 'Completado'),
    )

    name = models.CharField(max_length=255, verbose_name="Nombre del Proyecto")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")
    start_date = models.DateField(verbose_name="Fecha de Inicio")
    estimated_end_date = models.DateField(verbose_name="Fecha Estimada de Finalización")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', verbose_name="Estado")

    def __str__(self):
        return self.name

class UserProject(models.Model):
    """Tabla pivote N:M para asignar empleados a proyectos con un rol específico"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='project_assignments')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='assigned_users')
    role_in_project = models.CharField(max_length=150, verbose_name="Rol en el Proyecto", help_text="Ej: Ingeniero CAD, Gerente de Calidad")

    class Meta:
        unique_together = ('user', 'project')
        verbose_name = "Asignación de Proyecto"
        verbose_name_plural = "Asignaciones de Proyectos"

    def __str__(self):
        return f"{self.user} -> {self.project} ({self.role_in_project})"
