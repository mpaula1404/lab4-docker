# Laboratorio 4 — Contenedores y Despliegue con Docker

# Integrantes
- Santiago Palacio Cardenas
- Juan Esteban Mosquera Perea
- Maria Paula Mosquera Alvarez

Aplicación web en **Node.js + Express** empaquetada en un contenedor Docker.

## Endpoints

| Método | Ruta | Descripción | Ejemplo |
|---|---|---|---|
| GET | `/` | Interfaz web interactiva (calculadora) | http://localhost:3000/ |
| GET | `/saludo` | Mensaje de bienvenida | http://localhost:3000/saludo |
| GET | `/calcular?op=&a=&b=` | Operación matemática (`sumar`, `restar`, `multiplicar`, `dividir`) | http://localhost:3000/calcular?op=sumar&a=5&b=3 |
| GET | `/health` | Estado del servicio y hostname del contenedor | http://localhost:3000/health |

## Estructura

```
lab4-docker/
├── app.js            # Servidor y endpoints
├── public/index.html # Interfaz web interactiva
├── package.json      # Dependencias (express)
├── Dockerfile        # Receta para construir la imagen
├── .dockerignore     # Archivos excluidos de la imagen
└── Informe_Lab4.pdf  # Informe con capturas del proceso
```

## Pasos

```bash
# 1. Construir la imagen
docker build -t miapp-docker:v1 .

# 2. Ver la imagen creada
docker images

# 3. Ejecutar el contenedor (puerto host 3000 -> puerto contenedor 3000)
docker run -d --name miapp -p 3000:3000 miapp-docker:v1

# 4. Verificar que está corriendo
docker ps
docker logs miapp

# 5. Probar: abrir http://localhost:3000 en el navegador o Postman

# 6. Etiquetar y publicar en Docker Hub
docker tag miapp-docker:v1 mpaula14/miapp-docker:v1
docker login
docker push mpaula14/miapp-docker:v1

# 7. (Opcional) Probar desde un entorno limpio
docker rm -f miapp
docker rmi miapp-docker:v1 mpaula14/miapp-docker:v1
docker pull mpaula14/miapp-docker:v1
docker run -d -p 3000:3000 mpaula14/miapp-docker:v1
```

