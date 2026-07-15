//! OmniRoute Node Health Agent library crate.
//!
//! Provides system metrics collection, composite health scoring,
//! HTTP health endpoints, and Prometheus metrics export for fleet-wide
//! distributed deployment.

#![forbid(unsafe_code)]
#![deny(clippy::correctness, clippy::suspicious)]
#![warn(clippy::pedantic)]
#![allow(
    clippy::module_name_repetitions,
    clippy::must_use_candidate,
    clippy::missing_errors_doc,
    clippy::missing_panics_doc,
)]

pub mod health;
pub mod metrics;
pub mod prometheus;

use std::sync::Arc;

use axum::{
    routing::get,
    Router,
};
use tokio::sync::Mutex;

use crate::metrics::MetricsCollector;

/// Build the axum Router with all health endpoints.
///
/// Called from `main.rs` and integration tests.
pub fn build_router(collector: Arc<Mutex<MetricsCollector>>) -> Router {
    Router::new()
        .route("/healthz", get(health::healthz))
        .route("/readyz", get(health::readyz))
        .route("/system-load", get(health::system_load))
        .route("/health-score", get(health::health_score))
        .route("/metrics", get(prometheus_handler))
        .with_state(collector)
}

/// Handler for GET /metrics — Prometheus text format.
async fn prometheus_handler() -> Result<String, (axum::http::StatusCode, String)> {
    match crate::prometheus::gather_text() {
        Ok(text) => Ok(text),
        Err(e) => Err((
            axum::http::StatusCode::INTERNAL_SERVER_ERROR,
            format!("failed to gather metrics: {e}"),
        )),
    }
}
