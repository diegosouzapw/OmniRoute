//! Error model for the OmniRoute Rust rewrite.
//!
//! All crates return [`OmniRouteError`] as the canonical error type. Each
//! variant is intentionally small and stable; richer context is conveyed via
//! the `source()` chain and the optional `context` map.

use serde::{Deserialize, Serialize};
use std::fmt;
use thiserror::Error;

/// Canonical error type for the OmniRoute backend.
#[derive(Debug, Error)]
pub enum OmniRouteError {
    /// Configuration error (missing/invalid env, malformed file).
    #[error("config error: {0}")]
    Config(String),

    /// Authentication error (missing, invalid, or expired credentials).
    #[error("auth error: {0}")]
    Auth(String),

    /// Authorization error (insufficient permissions).
    #[error("forbidden: {0}")]
    Forbidden(String),

    /// Resource not found.
    #[error("not found: {0}")]
    NotFound(String),

    /// Conflict (duplicate, version mismatch).
    #[error("conflict: {0}")]
    Conflict(String),

    /// Validation error (input did not pass validation).
    #[error("validation error: {0}")]
    Validation(String),

    /// Rate-limit error.
    #[error("rate limit exceeded: {0}")]
    RateLimited(String),

    /// Upstream provider error (network, 4xx, 5xx).
    #[error("upstream error ({provider}): {message}")]
    Upstream {
        /// Provider that produced the error.
        provider: String,
        /// Human-readable error message.
        message: String,
        /// Optional upstream status code.
        status: Option<u16>,
    },

    /// Streaming interrupted.
    #[error("stream interrupted: {0}")]
    Stream(String),

    /// Database / storage error.
    #[error("storage error: {0}")]
    Storage(String),

    /// Encryption / decryption error.
    #[error("crypto error: {0}")]
    Crypto(String),

    /// MCP protocol error.
    #[error("mcp error: {0}")]
    Mcp(String),

    /// Internal bug / unexpected state.
    #[error("internal error: {0}")]
    Internal(String),

    /// Wrapped I/O error.
    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    /// Wrapped JSON error.
    #[error("json error: {0}")]
    Json(#[from] serde_json::Error),

    /// Wrapped URL parse error.
    #[error("url error: {0}")]
    Url(#[from] url::ParseError),
}

impl OmniRouteError {
    /// Stable error code (snake_case) suitable for API error responses.
    pub fn code(&self) -> &'static str {
        match self {
            Self::Config(_) => "config_error",
            Self::Auth(_) => "auth_error",
            Self::Forbidden(_) => "forbidden",
            Self::NotFound(_) => "not_found",
            Self::Conflict(_) => "conflict",
            Self::Validation(_) => "validation_error",
            Self::RateLimited(_) => "rate_limited",
            Self::Upstream { .. } => "upstream_error",
            Self::Stream(_) => "stream_error",
            Self::Storage(_) => "storage_error",
            Self::Crypto(_) => "crypto_error",
            Self::Mcp(_) => "mcp_error",
            Self::Internal(_) => "internal_error",
            Self::Io(_) => "io_error",
            Self::Json(_) => "json_error",
            Self::Url(_) => "url_error",
        }
    }

    /// HTTP status code mapping for API responses.
    pub fn http_status(&self) -> u16 {
        match self {
            Self::Config(_) => 500,
            Self::Auth(_) => 401,
            Self::Forbidden(_) => 403,
            Self::NotFound(_) => 404,
            Self::Conflict(_) => 409,
            Self::Validation(_) => 400,
            Self::RateLimited(_) => 429,
            Self::Upstream { status, .. } => status.unwrap_or(502),
            Self::Stream(_) => 502,
            Self::Storage(_) => 500,
            Self::Crypto(_) => 500,
            Self::Mcp(_) => 500,
            Self::Internal(_) => 500,
            Self::Io(_) => 500,
            Self::Json(_) => 400,
            Self::Url(_) => 400,
        }
    }

    /// True if the error is a client-side mistake (4xx).
    pub fn is_client_error(&self) -> bool {
        let s = self.http_status();
        (400..500).contains(&s)
    }

    /// True if the error is a server-side fault (5xx).
    pub fn is_server_error(&self) -> bool {
        let s = self.http_status();
        (500..600).contains(&s)
    }
}

/// Wire-shaped error payload for API responses (OpenAI-compatible).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiErrorBody {
    /// Stable error code.
    pub code: String,
    /// Human-readable error message.
    pub message: String,
    /// Optional error type (e.g. `"invalid_request_error"`).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub error_type: Option<String>,
    /// Optional parameter that caused the error.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub param: Option<String>,
    /// Optional request id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
}

impl ApiErrorBody {
    /// Construct a new error body.
    pub fn new(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            code: code.into(),
            message: message.into(),
            error_type: None,
            param: None,
            request_id: None,
        }
    }

    /// Add an error type.
    #[must_use]
    pub fn with_error_type(mut self, error_type: impl Into<String>) -> Self {
        self.error_type = Some(error_type.into());
        self
    }

    /// Add a request id.
    #[must_use]
    pub fn with_request_id(mut self, request_id: impl Into<String>) -> Self {
        self.request_id = Some(request_id.into());
        self
    }
}

impl fmt::Display for ApiErrorBody {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.code, self.message)
    }
}

impl std::error::Error for ApiErrorBody {}

/// Convenient result alias.
pub type Result<T, E = OmniRouteError> = std::result::Result<T, E>;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn error_code_is_stable() {
        assert_eq!(
            OmniRouteError::Auth("bad".into()).code(),
            "auth_error"
        );
        assert_eq!(
            OmniRouteError::NotFound("nope".into()).code(),
            "not_found"
        );
    }

    #[test]
    fn http_status_mapping() {
        assert_eq!(OmniRouteError::Auth("x".into()).http_status(), 401);
        assert_eq!(OmniRouteError::Forbidden("x".into()).http_status(), 403);
        assert_eq!(OmniRouteError::NotFound("x".into()).http_status(), 404);
        assert_eq!(OmniRouteError::Validation("x".into()).http_status(), 400);
        assert_eq!(OmniRouteError::RateLimited("x".into()).http_status(), 429);
        assert_eq!(
            OmniRouteError::Upstream {
                provider: "openai".into(),
                message: "x".into(),
                status: Some(503),
            }
            .http_status(),
            503
        );
    }
}
