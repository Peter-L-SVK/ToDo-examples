use axum::{http::{Method, HeaderValue, header::HeaderName}};
use tokio::net::TcpListener;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use axum_csrf::{CsrfConfig, CsrfLayer};

mod models;
mod routes;
mod database;

const X_CSRF_TOKEN: HeaderName = HeaderName::from_static("x-csrf-token");

#[tokio::main]
async fn main() {
    let pool = database::create_pool().await.expect("Failed to create pool");
    
    let app = routes::create_router(pool)
        .layer(CsrfLayer::new(CsrfConfig::default().with_cookie_name("authenticity_token")))
        .layer(
            CorsLayer::new()
                .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
                .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
                .allow_headers([
                    axum::http::header::CONTENT_TYPE,
                    axum::http::header::AUTHORIZATION,
                    axum::http::header::ACCEPT,
                    axum::http::header::ORIGIN,
                    X_CSRF_TOKEN,
                ])
                .allow_credentials(true)
        );

    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));
    let listener = TcpListener::bind(addr).await.unwrap();
    println!("Server running on {}", addr);
    axum::serve(listener, app).await.unwrap();
}
