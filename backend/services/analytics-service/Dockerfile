# syntax=docker/dockerfile:1

FROM golang:1.22-alpine AS builder
WORKDIR /app

# Copy go.mod and go.sum first (improves caching)
COPY go.mod go.sum ./
RUN go mod download

# Then copy source
COPY . .

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -o analytics .

# Minimal final image
FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/analytics .
EXPOSE 6001
CMD ["./analytics"]
