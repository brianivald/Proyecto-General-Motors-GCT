# Arquitectura y Lógica Core - SGCT

Este documento consolida la arquitectura de la base de datos, la estructura recomendada para los repositorios y un algoritmo base en Python para calcular proyecciones de carga de trabajo semanales, cumpliendo con la regla de negocio de General Motors (100% de carga = 42.5 horas/semana).

---

## 1. Modelo de Base de Datos (PostgreSQL / Django ORM)

### 1.1 Entidad `User` (Extiende `AbstractUser` de Django)
Representa a los empleados o supervisores del sistema.
- `id` (UUID o Serial)
- `username` (Employee ID, único, 9 dígitos)
- `first_name`, `last_name`
- `role` (Admin, Manager, Employee)
- `department` (Ingeniería, Manufactura, etc)
- `weekly_capacity` (Decimal, Default: 42.5) -> Las horas semanales base para el usuario.

### 1.2 Entidad `Project`
Contiene la información general de la tarea/agrupador principal.
- `id` (UUID o Serial)
- `name` (String, max 255)
- `description` (Text)
- `start_date` (Date)
- `estimated_end_date` (Date)
- `status` (Active, Completed, OnHold)

### 1.3 Entidad `UserProject` (Tabla de Asignación / Relación N:M)
Relaciona directamente qué usuario participará en qué proyecto de forma histórica o a futuro.
- `user_id` (FK a User)
- `project_id` (FK a Project)
- `role_in_project` (String) -> El "puesto" que tiene el empleado en ese proyecto en particular (ej: Líder, Consultor, Ejecutor).

### 1.4 Entidad `WeeklyRecord` (Registro Semanal - El Reporte)
Aquí se asientan exactamente las horas reportadas en una semana específica.
- `id` (UUID o Serial)
- `user_id` (FK a User)
- `project_id` (FK a Project)
- `week_start_date` (Date) -> Lunes de la semana correspondiente al registro.
- `percentage_allocated` (Decimal 0.00 a 100.00) -> El % del tiempo total registrado esa semana.
- `hours_calculated` (Decimal) -> Se calcula en base a `percentage_allocated * user.weekly_capacity / 100`.

*Regla de validación BD*: Para cualquier `user_id` dado y `week_start_date` dado, la SUMATORIA de `percentage_allocated` no puede exceder `100.00`.

---

## 2. Estructura de Directorios Recomendada

### Backend (Django REST Framework)
Se recomienda utilizar el concepto de "Apps" modulares de Django:
```text
backend/
├── sgct_core/            # Configuración principal y orquestador (settings, urls, wsgi)
├── users/                # Django App: Authentication, JWT, model User
├── projects/             # Django App: Modelos Project, asignaciones, API CRUD
├── workloads/            # Django App: Registro semanal y proyecciones de carga (Algoritmos)
├── manage.py
└── requirements.txt
```

### Frontend (React + Vite)
Siguiendo las mejores prácticas para escalar una aplicación SPA:
```text
frontend/
├── src/
│   ├── assets/           # Imágenes y SVGs genéricos (Logo GM)
│   ├── components/       # Componentes UI reutilizables
│   │   ├── dashboard/    # Sidebar, Header, DashboardPanel, PendingReports
│   │   ├── charts/       # Gráficos Chart.js reutilizables (ProjectStats)
│   │   └── ui/           # Botones, Modales, Alertas usando TailwindCSS base
│   ├── pages/            # View principal del ruteador
│   ├── hooks/            # Custom React hooks (ej. useUserWorkload)
│   ├── services/         # Llamadas centralizadas a la API usando Axios
│   ├── main.jsx          # Setup base (StrictMode)
│   └── App.jsx           # Ruteador (React Router DOM si es necesario)
├── tailwind.config.js    # Definición corporativa de GM (brand colors)
└── package.json
```

---

## 3. Algoritmo Analítico: Proyección de Carga Futura (Python)

El sistema debe proveer una visualización rápida de cuál será la carga de trabajo *futura* basada en los proyectos actualmente activos.

El siguiente algoritmo toma un usuario, una fecha específica a futuro, y calcula si su carga de trabajo estará por debajo, igual al 100%, o sobrepasada (identificando cuellos de botella). Asume que los proyectos tienen una asignación base prestablecida por semana.

```python
from datetime import date
from decimal import Decimal

# Constante de GM definida en los requerimientos
HORAS_POR_SEMANA_MAX = Decimal('42.5')

def calcular_carga_futura_usuario(usuario_id, fecha_objetivo: date, proyectos_asignados: list):
    """
    Calcula la proyección de carga para una fecha futura.
    
    `proyectos_asignados`: Lista de diccionarios que simula un queryset de Django de proyectos 
    donde el usuario tiene asignación activa:
    {
        'id': int,
        'nombre': str,
        'fecha_fin_estimada': date,
        'porcentaje_asignado_esperado': Decimal # % fijo que el usuario se compromete semanalmente
    }
    """
    carga_total_porcentaje = Decimal('0.0')
    
    for proyecto in proyectos_asignados:
        # Evaluamos si el proyecto seguirá vivo en la fecha objetivo futura.
        # En la realidad se deben considerar también fechas de inicio:
        # if proyecto['fecha_inicio'] <= fecha_objetivo <= proyecto['fecha_fin_estimada']
        if proyecto['fecha_fin_estimada'] >= fecha_objetivo:
            carga_total_porcentaje += proyecto['porcentaje_asignado_esperado']
            
    # Computar las horas equivalentes (Regla de Oro GM)
    horas_proyectadas = (carga_total_porcentaje / Decimal('100.0')) * HORAS_POR_SEMANA_MAX
    
    # Determinar estado de la carga
    estado = "Óptimo (100% Cubierto)"
    if carga_total_porcentaje > Decimal('100.0'):
        estado = f"Peligro - Cuello de Botella ({carga_total_porcentaje}% asignado)"
    elif carga_total_porcentaje < Decimal('100.0'):
        capacidad_disponible = Decimal('100.0') - carga_total_porcentaje
        estado = f"Aceptable - Capacidad sobrante ({capacidad_disponible}%)"
        
    return {
        "fecha_consulta": fecha_objetivo.isoformat(),
        "carga_total_porcentaje": float(carga_total_porcentaje),
        "horas_semana_proyectadas": float(horas_proyectadas),
        "estado_general": estado
    }

# --- EJEMPLO DE USO (Simulando una prueba Unitaria) ---
if __name__ == "__main__":
    proyectos_mock = [
        # Proyecto largo plazo
        {"id": 101, "nombre": "Motor EV 2026", "fecha_fin_estimada": date(2026, 8, 1), "porcentaje_asignado_esperado": Decimal('50.0')},
        # Proyecto corto plazo que acabará pronto
        {"id": 102, "nombre": "Software Chasis", "fecha_fin_estimada": date(2026, 4, 15), "porcentaje_asignado_esperado": Decimal('70.0')}
    ]

    # Proyección a Corto Plazo: Ambos proyectos activos (Sobrecarga de 120%)
    print("--- Proyección actual (Marzo 2026) ---")
    res_actual = calcular_carga_futura_usuario(1, date(2026, 3, 25), proyectos_mock)
    print(res_actual)
    # Output: Carga 120.0%, 51 horas - "Peligro - Cuello de Botella"

    # Proyección a Largo Plazo: Solo 1 proyecto activo (El 102 ya terminó)
    print("\n--- Proyección futura (Mayo 2026) ---")
    res_futura = calcular_carga_futura_usuario(1, date(2026, 5, 1), proyectos_mock)
    print(res_futura)
    # Output: Carga 50.0%, 21.25 horas - "Capacidad sobrante (50.0%)"
```
