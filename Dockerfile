# Imagen base liviana con Node.js 20
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar primero los archivos de dependencias
COPY package*.json ./
RUN npm install --omit=dev

# Copiar el código fuente
COPY . .

# Puerto que expone la aplicación
EXPOSE 3000

# Comando de arranque
CMD ["node", "app.js"]
