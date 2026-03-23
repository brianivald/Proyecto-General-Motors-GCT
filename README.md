# GM - Sistema de Gestión de Carga de Trabajo (SGCT)

Este es el repositorio base para el Sistema de Gestión de Carga de Trabajo, desarrollado con una arquitectura moderna corporativa utilizando **Python (Django REST Framework)** en el backend y **React (Vite + TailwindCSS + ChartJS)** en el frontend, todo orquestado mediante **Docker** y una base de datos **PostgreSQL**.

---

## 🚀 Despliegue Rápido (Recomendado Automático)

La forma más rápida de levantar el ecosistema completo con recarga en caliente (Hot Reload) y bases de datos integradas es usar Docker.

### Requisitos previos
- Docker Desktop y/o Docker Compose instalados.

### Pasos
1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd GM-SGCT
   ```
2. Construye y levanta los servicios en fondo:
   ```bash
   docker compose up -d --build
   ```
3. Ejecuta las migraciones estructurales de la base de datos (Solo la primera vez):
   ```bash
   docker compose exec backend python manage.py migrate
   ```
4. Crea una cuenta de Administrador Maestro para interactuar:
   ```bash
   docker compose exec backend python manage.py createsuperuser
   ```
5. ¡Listo! Abre tu navegador:
   - **Sistema (Dashboard React)**: [http://localhost:5173](http://localhost:5173)
   - **Administración DB Django**: [http://localhost:8000/admin](http://localhost:8000/admin)
   - **API REST Cruda**: [http://localhost:8000/api/](http://localhost:8000/api/)

---

## 🛠️ Instalación y Despliegue Manual (Sin Docker)

Si deseas configurar tu entorno de desarrollo instalando las dependencias manualmente en tu computadora, sigue esta guía:

### 1. Base de Datos (PostgreSQL)
Asegúrate de instalar PostgreSQL y tenerlo corriendo en el puerto **`5432`**. Crea una base de datos vacía. Deberás configurar las variables de entorno `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST` para que coincidan con la DB local que acabas de crear al correr el backend.

### 2. Configurar Backend (Django)
Abre tu consola de comandos en la carpeta del repositorio:
```bash
cd backend

# (Opcional) Crea y activa un entorno virtual
python -m venv venv
# Windows: venv\Scripts\activate 
# Mac/Linux: source venv/bin/activate

# 1. Instalar requerimientos de Python
pip install -r requirements.txt

# 2. Migrar la base de datos
python manage.py makemigrations
python manage.py migrate

# 3. Arrancar servidor
python manage.py runserver 0.0.0.0:8000
```

### 3. Configurar Frontend (React + Vite)
Con el backend aún corriendo, abre una terminal separada:
```bash
cd frontend

# 1. Instalar módulos y librerías NodeJS
npm install

# 2. Iniciar el empaquetador Vite
npm run dev -- --host
```
