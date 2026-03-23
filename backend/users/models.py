from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Se usa 'username' como el ID de GM (Employee ID) heredado de AbstractUser
    department = models.CharField(max_length=100, blank=True, null=True, verbose_name="Departamento")
    weekly_capacity = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=42.50, 
        verbose_name="Capacidad Semanal (Hrs)",
        help_text="Horas base a la semana según el contrato GM"
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"
