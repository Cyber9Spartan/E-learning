# syntax=docker/dockerfile:1

FROM rust:latest  AS builder
WORKDIR /usr/src/app

# Copy your manifest first (for caching)
COPY Cargo.toml Cargo.lock ./
COPY src ./src

# Build dependencies
RUN cargo fetch

# Build the app
RUN cargo build --release

# Final lightweight image
FROM debian:bookworm-slim
WORKDIR /app
COPY --from=builder /usr/src/app/target/release/rust-service .
EXPOSE 7001
CMD ["./rust-service"]
