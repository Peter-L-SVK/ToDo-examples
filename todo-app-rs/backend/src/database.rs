use sqlx::sqlite::{SqlitePool, SqlitePoolOptions};
use std::env;

pub async fn create_pool() -> Result<SqlitePool, sqlx::Error> {
    dotenv::dotenv().ok();
    
    let database_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "sqlite:todo.db".to_string());
    
    SqlitePoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
}
