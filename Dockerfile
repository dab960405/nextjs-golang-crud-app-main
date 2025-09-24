FROM golang:1.23

WORKDIR /app

COPY go.mod go.sum ./
COPY .env ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o main .

# Puerto interno del contenedor
EXPOSE 8080

CMD ["/app/main"]
