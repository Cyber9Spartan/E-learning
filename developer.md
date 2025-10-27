# Developer Guide

This guide provides instructions for setting up and running the SkillHub-Pro project for development.

## Project Overview

SkillHub-Pro is a polyglot learning platform with a microservices architecture. The project is structured as a monorepo with a Next.js frontend and several backend services.

## Prerequisites

- Docker
- Node.js
- Java
- Go
- Rust

## Getting Started

1.  **Clone the repository.**
2.  **Install dependencies:** This is a monorepo using npm workspaces. From the root of the project, run:
    ```bash
    npm install
    ```
3.  **Set up environment variables:** Copy the `.env.example` file to `.env` and fill in the required secrets.
4.  **Build and run the services:** The easiest way to get all services running is to use Docker Compose:
    ```bash
    docker compose build && docker compose up
    ```
5.  **Access the application:**
    *   Frontend: `http://localhost:3000`
    *   Gateway: `http://localhost:4000`

## Services

The `docker-compose.yml` file defines the following services:

| Service             | Port   | Language    | Description                                      |
| ------------------- | ------ | ----------- | ------------------------------------------------ |
| `gateway`           | `4000` | Node.js     | The main entry point for the backend.            |
| `auth-service`      | `4001` | Node.js     | Handles user authentication and authorization.   |
| `ai-service`        | `5001` | Python      | Provides AI-powered features.                    |
| `analytics-service` | `6001` | Go          | Collects and processes analytics data.           |
| `course-service`    | `7001` | Java        | Manages courses and course content.              |
| `rust-service`      | -      | Rust        | A Rust-based service. (Purpose to be determined) |

### Running Services Individually

It is also possible to run each service individually.

#### Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`.

#### Backend Services

To run a backend service individually, navigate to its directory and run the appropriate command. For example, for the `gateway` service:

```bash
cd backend/gateway
npm start
```

## Project Structure

The project is a monorepo with the following structure:

```
.
├── backend
│   ├── gateway
│   └── services
│       ├── ai-service
│       ├── analytics-service
│       ├── auth-service
│       ├── course-service
│       └── rust-service
├── database
├── docs
├── frontend
└── ...
```

-   `frontend`: Contains the Next.js frontend application.
-   `backend`: Contains the backend services.
    -   `gateway`: The API gateway.
    -   `services`: Contains the individual microservices.
-   `docs`: Contains project documentation.
-   `database`: Contains database-related files.

## Building for Production

To build the services for production, you can use the following command:

```bash
docker compose build
```

## Running Tests

(Information on how to run tests to be added here.)
