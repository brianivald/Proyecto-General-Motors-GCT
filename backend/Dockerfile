# Usamos una imagen oficial y ligera de Python
FROM python:3.11-slim

# Evitamos que Python genere archivos .pyc (.py bytecode)
ENV PYTHONDONTWRITEBYTECODE 1
# Forzamos la salida estándar sin búfer (mejor para logs en Docker)
ENV PYTHONUNBUFFERED 1

# Directorio de trabajo en el contenedor
WORKDIR /app

# Instalamos dependencias del sistema necesarias para compilar paquetes como psycopg2
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiamos primero requirements para aprovechar la capa de caché de Docker
COPY requirements.txt /app/

# Instalamos las dependencias de Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copiamos el resto del código del backend
COPY . /app/
