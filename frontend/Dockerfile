# Usamos una imagen oficial de Node.js Alpine por su ligereza
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos los archivos de requerimientos primero
COPY package.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de la aplicación
COPY . ./

# Exponemos el puerto de Vite por defecto
EXPOSE 5173

# Comando para ejecutar el servidor de desarrollo en todas las interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
