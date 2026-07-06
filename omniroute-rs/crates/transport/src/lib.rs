//! omniroute-transport: axum 0.8 HTTP surface for /v1/chat/completions.

use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::{get, post}, Json, Router};
use serde_json::json;
use tracing::info;

use omniroute_combo;
use omniroute_core::{ChatRequest, ChatResponse, ProviderError, RouteRequest};
use omniroute_providers::Registry;

#[derive(Clone)]
pub struct AppState {
    pub registry: Arc<Registry>,
    pub http: reqwest::Client,
}

pub fn router(state: AppState) -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/openapi.json", get(openapi))
        .route("/v1/chat/completions", post(chat_completions))
        .with_state(state)
}

async fn health() -> &'static str { "ok" }

async fn openapi() -> Json<serde_json::Value> {
    Json(json!({
        "openapi": "3.1.0",
        "info": {
            "title": "omniroute-rs",
            "version": env!("CARGO_PKG_VERSION"),
            "description": "OmniRoute backend (Rust rewrite, first slice)"
        },
        "paths": {
            "/v1/chat/completions": {
                "post": {
                    "operationId": "createChatCompletion",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": { "$ref": "#/components/schemas/ChatRequest" }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "OK",
                            "content": {
                                "application/json": {
                                    "schema": { "$ref": "#/components/schemas/ChatResponse" }
                                }
                            }
                        }
                    }
                }
            }
        },
        "components": {
            "schemas": {
                "ChatRequest": { "type": "object" },
                "ChatResponse": { "type": "object" }
            }
        }
    }))
}

async fn chat_completions(
    State(state): State<AppState>,
    Json(req): Json<ChatRequest>,
) -> Result<Json<ChatResponse>, ApiError> {
    let combo = omniroute_combo::resolve(&RouteRequest {
        model: req.model.clone(),
        tenant_id: "_default".to_string(),
    });
    let mut chain = vec![combo.provider.clone()];
    chain.extend(combo.fallback_chain.iter().cloned());

    let mut last_err: Option<ProviderError> = None;
    for provider_name in &chain {
        let Some(p) = state.registry.get(provider_name) else { continue };
        info!(provider = %provider_name, model = %req.model, "trying provider");
        match p.chat(&req).await {
            Ok(r) => return Ok(Json(r)),
            Err(e) => {
                tracing::warn!(provider = %provider_name, error = %e, "provider failed, trying next");
                last_err = Some(e);
            }
        }
    }
    Err(last_err.map(ApiError::from).unwrap_or(ApiError::NoProvider))
}

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    #[error("no provider available for the requested model")]
    NoProvider,
    #[error("provider error: {0}")]
    Provider(#[from] ProviderError),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> axum::response::Response {
        let (status, body) = match &self {
            ApiError::NoProvider => (StatusCode::SERVICE_UNAVAILABLE, json!({"error": "no_provider"})),
            ApiError::Provider(e) => {
                let status = match e {
                    ProviderError::Auth(_) => StatusCode::UNAUTHORIZED,
                    ProviderError::RateLimit(_) => StatusCode::TOO_MANY_REQUESTS,
                    ProviderError::Upstream { status: s, .. } if *s >= 500 => StatusCode::BAD_GATEWAY,
                    ProviderError::Upstream { .. } => StatusCode::BAD_REQUEST,
                    _ => StatusCode::INTERNAL_SERVER_ERROR,
                };
                (status, json!({"error": e.to_string()}))
            }
        };
        (status, Json(body)).into_response()
    }
}
