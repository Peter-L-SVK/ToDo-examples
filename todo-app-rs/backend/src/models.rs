use chrono::{DateTime, Utc};
use serde::{Serialize, Deserialize};
use sqlx::FromRow;
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, FromRow, Validate)]
pub struct Task {
    pub id: String,
    #[validate(length(min = 1, max = 100))]
    pub title: String,
    pub completed: bool,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreateTask {
    #[validate(length(min = 1, max = 100))]
    pub title: String,
}

#[derive(Debug, Deserialize, Validate)]
pub struct UpdateTask {
    #[validate(length(min = 1, max = 100))]
    pub title: Option<String>,
    pub completed: Option<bool>,
}

#[derive(Debug, Serialize)]
pub struct ApiResponse<T> {
    pub status: &'static str,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<T>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub message: Option<String>,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T) -> Self {
        Self {
            status: "success",
            data: Some(data),
            message: None,
        }
    }

    pub fn error(message: String) -> Self {
        Self {
            status: "error",
            data: None,
            message: Some(message),
        }
    }
}
