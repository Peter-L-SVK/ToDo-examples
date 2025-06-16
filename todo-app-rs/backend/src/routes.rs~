use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json, Router, routing::{get, post, patch, delete},
};
use serde_json::{json, Value};
use sqlx::SqlitePool;
use uuid::Uuid;
use axum_csrf::CsrfToken;
use crate::models::{Task, CreateTask, UpdateTask};

pub fn create_router(pool: SqlitePool) -> Router {
    Router::new()
        .route("/api/tasks", get(get_tasks).post(create_task))
        .route("/api/tasks/{id}", patch(update_task).delete(delete_task)) 
        .route("/api/csrf", get(get_csrf_token))
        .with_state(pool)
}


#[axum::debug_handler]
async fn get_csrf_token(
    token: CsrfToken,
) -> (StatusCode, Json<Value>) {
    let token_value = token.authenticity_token().unwrap_or_default();
    (StatusCode::OK, Json(json!({ "csrfToken": token_value })))
}

async fn create_task(
    State(pool): State<SqlitePool>,
    Json(payload): Json<CreateTask>,
) -> impl IntoResponse {
    let id = Uuid::new_v4().to_string();
    let now = chrono::Utc::now();
    
    match sqlx::query(
        "INSERT INTO tasks (id, title, completed, created_at) VALUES (?, ?, ?, ?)"
    )
    .bind(&id)
    .bind(&payload.title)
    .bind(false)
    .bind(now.to_rfc3339())
    .execute(&pool)
    .await
    {
        Ok(_) => (StatusCode::CREATED, Json(json!({"status": "success", "id": id}))),
        Err(e) => {
            eprintln!("Database error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"status": "error", "message": "Failed to create task"})))
        },
    }
}

async fn get_tasks(State(pool): State<SqlitePool>) -> Result<impl IntoResponse, impl IntoResponse> {
    match sqlx::query_as::<_, Task>("SELECT * FROM tasks ORDER BY created_at DESC")
        .fetch_all(&pool)
        .await
    {
        Ok(tasks) => Ok((StatusCode::OK, Json(tasks))),
        Err(e) => {
            eprintln!("Database error: {}", e);
            Err((StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"status": "error", "message": "Failed to fetch tasks"}))))
        },
    }
}

async fn update_task(
    Path(id): Path<String>,
    State(pool): State<SqlitePool>,
    Json(payload): Json<UpdateTask>,
) -> impl IntoResponse {
    match sqlx::query(
        "UPDATE tasks SET title = ?, completed = ? WHERE id = ?"
    )
    .bind(&payload.title)
    .bind(&payload.completed)
    .bind(&id)
    .execute(&pool)
    .await
    {
        Ok(result) => {
            if result.rows_affected() > 0 {
                (StatusCode::OK, Json(json!({"status": "success"})))
            } else {
                (StatusCode::NOT_FOUND, Json(json!({"status": "error", "message": "Task not found"})))
            }
        },
        Err(e) => {
            eprintln!("Database error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"status": "error", "message": "Failed to update task"})))
        },
    }
}

async fn delete_task(
    Path(id): Path<String>,
    State(pool): State<SqlitePool>,
) -> impl IntoResponse {
    match sqlx::query(
        "DELETE FROM tasks WHERE id = ?"
    )
    .bind(&id)
    .execute(&pool)
    .await
    {
        Ok(result) => {
            if result.rows_affected() > 0 {
                (StatusCode::OK, Json(json!({"status": "success"})))
            } else {
                (StatusCode::NOT_FOUND, Json(json!({"status": "error", "message": "Task not found"})))
            }
        },
        Err(e) => {
            eprintln!("Database error: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"status": "error", "message": "Failed to delete task"})))
        },
    }
}
