//! Health endpoint handlers for the OmniRoute agent HTTP server.

pub mod types;

use std::sync::Arc;

use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Json},
};
use serde_json::json;
use tokio::sync::Mutex;

use crate::metrics::composite;
use crate::metrics::MetricsCollector;

use self::types::StatusResponse;

/// GET /healthz — liveness probe.
pub async fn healthz() -> impl IntoResponse {
    Json(StatusResponse {
        status: "ok".to_string(),
    })
}

/// GET /readyz — readiness probe.
pub async fn readyz(
    State(collector): State<Arc<Mutex<MetricsCollector>>>,
) -> Result<impl IntoResponse, (StatusCode, Json<serde_json::Value>)> {
    let inner = collector.lock().await;
    if inner.is_initialized() {
        Ok(Json(StatusResponse {
            status: "ok".to_string(),
        }))
    } else {
        Err((
            StatusCode::SERVICE_UNAVAILABLE,
            Json(json!({"status": "not ready", "reason": "metrics collector not initialized"})),
        ))
    }
}

/// GET /system-load — full system metrics snapshot.
pub async fn system_load(
    State(collector): State<Arc<Mutex<MetricsCollector>>>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
    let inner = collector.lock().await;
    let snapshot = inner.get_last_snapshot().ok_or_else(|| {
        (
            StatusCode::SERVICE_UNAVAILABLE,
            "metrics collector not yet initialized".to_string(),
        )
    })?;
    Ok(Json(snapshot.clone()))
}

/// GET /health-score — composite health score only.
pub async fn health_score(
    State(collector): State<Arc<Mutex<MetricsCollector>>>,
) -> Result<impl IntoResponse, (StatusCode, String)> {
    let inner = collector.lock().await;
    let snapshot = inner.get_last_snapshot().ok_or_else(|| {
        (
            StatusCode::SERVICE_UNAVAILABLE,
            "metrics collector not yet initialized".to_string(),
        )
    })?;

    let components = composite::compute_components(snapshot);
    let score = composite::compute_score(&components);

    Ok(Json(types::HealthScoreResponse {
        timestamp: snapshot.timestamp,
        hostname: snapshot.hostname.clone(),
        score,
        components,
    }))
}
