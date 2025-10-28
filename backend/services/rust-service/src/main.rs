use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;

#[derive(Deserialize)]
struct User {
    username: String,
    password: String,
}

#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().json("Rust service is healthy 🚀")
}

#[post("/api/auth/signup")]
async fn signup(user: web::Json<User>) -> impl Responder {
    // In a real application, you would hash the password and save the user to a database.
    println!("Signup: username: {}, password: {}", user.username, user.password);
    HttpResponse::Ok().json("Signup successful")
}

#[post("/api/auth/login")]
async fn login(user: web::Json<User>) -> impl Responder {
    // In a real application, you would check the credentials against a database.
    println!("Login: username: {}, password: {}", user.username, user.password);
    HttpResponse::Ok().json("Login successful")
}

#[get("/api/dashboard")]
async fn dashboard() -> impl Responder {
    // In a real application, this would be a protected endpoint.
    HttpResponse::Ok().json("Welcome to the dashboard!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(health)
            .service(signup)
            .service(login)
            .service(dashboard)
    })
    .bind(("0.0.0.0", 7001))?
    .run()
    .await
}
