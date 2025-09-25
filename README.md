
🚨 Proyecto full-stack con Next.js y Golang


Lista de tecnologías en este proyecto

En el back-end:

Fiber

JWT token

Validator

Godotenv

Paginate

Postgres

GORM

En el front-end:

React hook form

Axios

React-toastify

Tailwindcss

Typescript

Next-auth

Cómo ejecutar

🚦 Incluí el archivo .env intencionalmente en el proyecto para que puedas ver cómo funcionan los servicios y con qué configuraciones. De lo contrario, no debería mostrarse en el proyecto.

Con Docker 🐳:

Ejecutar la base de datos y el servicio API

  docker compose up -d


Ejecutar Next.js

  cd ./frontend
  yarn install
  yarn run dev


Manual ✌️:

Crear la base de datos basada en el archivo .env (puedes cambiarlo en el archivo .env).

En la raíz del proyecto fuente deberías ejecutar tu proyecto en Go

  go mod tidy
  go run main.go


o ejecutar con actualización en vivo usando air.

Instalar air

  go install github.com/air-verse/air@latest


Luego ejecutar:

  air


En la carpeta raíz del frontend deberías ejecutar tu proyecto de Next.js

  yarn install
  yarn run dev

Referencia de API
Dirección local
  http://127.0.0.1:8080

Todos los endpoints
  GET /api/users -> obtener todos los usuarios
  POST /api/user -> crear un nuevo usuario
  PATCH /api/user/:id -> actualizar usuario
  GET /api/user/:id -> obtener un usuario específico
  DELETE /api/user/:id -> eliminar usuario
  POST /api/login -> iniciar sesión en la cuenta

  API documentada en Swagger 👉 http://localhost:8080/swagger/index.html

Lista de tareas (TODO)

Esta sección rastrea el progreso de las funcionalidades implementadas en el proyecto.

 ✅Agregar Swagger al proyecto.

 ✅Agregar Next-auth al proyecto -> directorio frontend.

 ✅Agregar todos los estados de respuesta de la API (éxito, error).

 ✅Dockerizar el proyecto.

