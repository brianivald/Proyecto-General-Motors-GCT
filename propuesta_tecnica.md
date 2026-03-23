# Propuesta Técnica: Sistema de Gestión de Carga de Trabajo (SGCT) para General Motors

## 1. Resumen Ejecutivo
El **Sistema de Gestión de Carga de Trabajo (SGCT)** es una plataforma integral diseñada para optimizar, monitorear y distribuir eficientemente las tareas, proyectos y recursos dentro de los equipos de ingeniería y manufactura de General Motors. Su propósito es garantizar una asignación equitativa de la carga, identificar cuellos de botella en tiempo real y mejorar la productividad general del personal.

## 2. Objetivos del Sistema
- **Visibilidad Integral**: Proveer paneles interactivos para monitorear la capacidad operativa y el estado de las tareas.
- **Asignación Inteligente**: Facilitar la distribución de tareas basada en disponibilidad, habilidades y carga actual de los empleados.
- **Trazabilidad y Reportes**: Generar reportes automatizados sobre tiempos de ejecución, eficiencia y cumplimiento de SLAs.
- **Escalabilidad y Seguridad**: Arquitectura preparada para integrarse con los sistemas corporativos existentes de GM bajo estrictos estándares de seguridad y auditoría.

## 3. Arquitectura y Stack Tecnológico
La solución se construirá bajo una arquitectura moderna de microservicios o monolito modular, separando claramente el frontend del backend y contenerizando todo el ecosistema con **Docker** para facilitar su despliegue en cualquier entorno (On-Premise o Cloud).

- **Backend: Python (Django & Django REST Framework)**
  - **Por qué**: Django ofrece un desarrollo rápido, un ORM robusto y un panel de administración integrado (`Django Admin`), ideal para que los administradores de GM gestionen catálogos (usuarios, roles, departamentos) de forma inmediata.
  - **API**: Implementación de una API RESTful que permite la futura integración con aplicaciones móviles u otros sistemas internos de GM.

- **Frontend: React.js (Vite)**
  - **Por qué**: React permite construir interfaces de usuario altamente reactivas y modulares (Single Page Application - SPA). Se utilizará **Vite** como empaquetador para tiempos de desarrollo insuperables.
  - **Estilos**: TailwindCSS o Material-UI para asegurar interfaces modernas, accesibles e institucionales que mantengan el estándar visual de GM.

- **Base de Datos: PostgreSQL**
  - **Por qué**: Es el motor relacional Open Source más robusto, capaz de manejar grandes volúmenes de datos con alta integridad referencial, vistas materializadas y consultas espaciales si fuera necesario en el futuro.

- **Infraestructura y Contenedores: Docker & Docker Compose**
  - Estandarización de entornos de desarrollo, pruebas y producción. Eliminación del problema de "funciona en mi máquina".

## 4. Estructura del Código
El proyecto sigue una estructura limpia enfocada en contenedores:

```text
GM-SGCT/
├── docker-compose.yml       # Orquestación de servicios locales
├── propuesta_tecnica.md     # Documentación del proyecto
├── backend/                 # Código de la API REST (Django)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
└── frontend/                # Aplicación cliente (React)
    ├── Dockerfile
    ├── package.json
    └── src/
```

## 5. Modelo de Datos Propuesto (MVP)
1. **Usuarios (Empleados/Supervisores)**: Perfil extendido con rol, departamento, habilidades y capacidad semanal (horas).
2. **Proyectos**: Agrupadores grandes de carga de trabajo.
3. **Tareas**: Unidad mínima de trabajo, asignada a uno o varios usuarios, con estado (Pendiente, En Progreso, Bloqueado, Terminado), fecha límite y estimación de horas.
4. **Registro de Tiempo (Timesheets)**: Entradas diarias de tiempo invertido por tarea para calcular la eficiencia vs planificación.

## 6. Siguientes Pasos
1. Aprobación de la propuesta técnica y de los esquemas iniciales (Scaffolding).
2. Configuración de CI/CD para despliegues automatizados.
3. Desarrollo del primer sprint: Autenticación, Roles y ABM (Alta/Baja/Modificación) de Tareas.
4. Desarrollo del segundo sprint: Tableros interactivos (Kanban/Gantt) en React y reportes.
