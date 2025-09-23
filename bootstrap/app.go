package bootstrap

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/pooulad/nextjs-golang-crud-app/database/migrations"
	"github.com/pooulad/nextjs-golang-crud-app/database/storage"
	"github.com/pooulad/nextjs-golang-crud-app/repository"
)

func InitializeApp(app *fiber.App) {
	_, ok := os.LookupEnv("APP_ENV")

	if !ok {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal(err)
		}
	}

	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("could not load the database")
	}

	err = migrations.MigrateUsers(db)
	if err != nil {
		log.Fatal("Could not migrate db")
	}

	repo := repository.Repository{
		DB: db,
	}

	// ✅ Configuración CORS actualizada
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000", // frontend
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		ExposeHeaders:    "Content-Length",
		AllowCredentials: true,
	}))

	repo.SetupRoutes(app)

	// 🔹 Leer el puerto desde las variables de entorno
	port := os.Getenv("API_PORT")
	if port == "" {
		port = "8080" // valor por defecto
	}

	log.Printf("🚀 Server running on port %s", port)
	listenErr := app.Listen(":" + port)
	if listenErr != nil {
		log.Fatal(listenErr)
	}
}
