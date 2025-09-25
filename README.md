# 🚨 Proyecto Full-Stack con Next.js y Golang

Este proyecto está diseñado como un ejemplo educativo para aprender a implementar una aplicación **full-stack** con una arquitectura limpia y escalable.

---

## 🛠️ Lista de Tecnologías

### Back-End
- [Fiber](https://gofiber.io/)  
- [JWT Token](https://jwt.io/)  
- [Validator](https://github.com/go-playground/validator)  
- [Godotenv](https://github.com/joho/godotenv)  
- [Paginate](https://github.com/morkid/paginate)  
- [Postgres](https://www.postgresql.org/)  
- [GORM](https://gorm.io/)  

### Front-End
- [React Hook Form](https://react-hook-form.com/)  
- [Axios](https://axios-http.com/)  
- [React-Toastify](https://fkhadra.github.io/react-toastify/introduction)  
- [TailwindCSS](https://tailwindcss.com/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Next-Auth](https://next-auth.js.org/)  

---

## 🚀 Cómo ejecutar

⚠️ El archivo **.env** está incluido **intencionalmente** en este proyecto para mostrar la configuración de los servicios. En un entorno real no debería compartirse.

### Con Docker 🐳
1. Ejecutar la base de datos y el servicio API:
   ```bash
   docker compose up -d
Ejecutar el front-end (Next.js):

bash
Copy code
cd ./frontend
yarn install
yarn run dev
Manual ✌️
Crear la base de datos basada en el archivo .env (puedes cambiar las variables según sea necesario).

En la raíz del proyecto back-end, ejecutar:

bash
Copy code
go mod tidy
go run main.go
O bien, ejecutar con actualización en vivo usando air:

bash
Copy code
go install github.com/air-verse/air@latest
air
En la carpeta raíz del front-end, ejecutar:

bash
Copy code
yarn install
yarn run dev
📡 Referencia de API
Dirección local: http://127.0.0.1:8080

Endpoints
GET /api/users → Obtener todos los usuarios

POST /api/user → Crear un nuevo usuario

PATCH /api/user/:id → Actualizar un usuario

GET /api/user/:id → Obtener un usuario específico

DELETE /api/user/:id → Eliminar un usuario

POST /api/login → Iniciar sesión en la cuenta

📑 API documentada en Swagger 👉 http://localhost:8080/swagger/index.html

✅ Lista de tareas (TODO)
Seguimiento del progreso de funcionalidades implementadas:

 Agregar Swagger al proyecto.

 Agregar Next-Auth al proyecto → directorio frontend.

 Agregar todos los estados de respuesta de la API (éxito, error).

 Dockerizar el proyecto.

sql
Copy code

## 📚 Aprendizaje y Mejoras

Durante la implementación de este proyecto, aprendí los fundamentos de la sintaxis de **Go (Golang)**, lo cual me permitió comprender cómo estructurar el código de manera más eficiente. Además, trabajé con **Fiber**, un framework que facilitó mucho la creación del CRUD gracias a su simplicidad y rapidez.  

Antes de este proyecto no tenía experiencia con este lenguaje ni con este framework, así que me permitió reforzar mi capacidad de adaptación y aprender a aplicar nuevos conceptos en un entorno práctico.  

### 🔧 Mejoras identificadas
- El proceso de levantar el proyecto podría **optimizarse**, ya que actualmente se utilizan dos archivos `.env` separados para el backend y el frontend. Sería mejor unificar o gestionar de manera más eficiente las variables de entorno para simplificar la configuración.  
- La implementación de la **interfaz frontend** aún presenta algunos bugs que no logré resolver por falta de tiempo.  