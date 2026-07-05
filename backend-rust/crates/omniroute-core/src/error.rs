//! Typed errors that flow through every layer of the backend.

use thiserror::Error;

/// Crate-wide Result alias.
pub type Result<T> = std::result::Result<T, Error>;

/// The master error type for OmniRoute backend.
#[derive(Debug, Error)]
pub enum Error {
    #[error("invalid request: {0}")]
    BadRequest(String),

    #[error("unauthorized: {0}")]
    Unauthorized(String),

    #[error("forbidden: {0}")]
    Forbidden(String),

    #[error("not found: {0}")]
    NotFound(String),

    #[error("conflict: {0}")]
    Conflict(String),

    #[error("rate limit exceeded: {0}")]
    RateLimited(String),

    #[error("quota exhausted: {0}")]
    QuotaExhausted(String),

    #[error("upstream provider error: {provider}: {message}")]
    Upstream {
        provider: String,
        status: Option<u16>,
        message: String,
    },

    #[error("upstream timeout: {provider}")]
    UpstreamTimeout { provider: String },

    #[error("upstream stream closed unexpectedly: {provider}")]
    UpstreamStreamEof { provider: String },

    #[error("all providers in combo failed: {combo}")]
    ComboExhausted { combo: String },

    #[error("no provider available for model: {0}")]
    NoProviderForModel(String),

    #[error("format translation failed: {from} -> {to}: {message}")]
    FormatTranslation {
        from: String,
        to: String,
        message: String,
    },

    #[error("model locked: {0}")]
    ModelLocked(String),

    #[error("cooldown: {provider} until {until}")]
    Cooldown { provider: String, until: chrono::DateTime<chrono::Utc> },

    #[error("circuit breaker open: {0}")]
    CircuitOpen(String),

    #[error("compression failed: {0}")]
    Compression(String),

    #[error("storage error: {0}")]
    Storage(String),

    #[error("serialization error: {0}")]
    Serde(#[from] serde_json::Error),

    #[error("internal error: {0}")]
    Internal(String),
}

impl Error {
    pub fn status_code(&self) -> u16 {
        match self {
            Self::BadRequest(_) => 400,
            Self::Unauthorized(_) => 401,
            Self::Forbidden(_) => 403,
            Self::NotFound(_) => 404,
            Self::Conflict(_) => 409,
            Self::RateLimited(_) => 429,
            Self::QuotaExhausted(_) => 429,
            Self::NoProviderForModel(_) => 404,
            Self::ModelLocked(_) => 423,
            Self::CircuitOpen(_) => 503,
            Self::Upstream { status, .. } => status.unwrap_or(502),
            Self::UpstreamTimeout { .. } | Self::UpstreamStreamEof { .. } => 504,
            Self::ComboExhausted { .. } => 502,
            Self::FormatTranslation { .. } => 500,
            Self::Cooldown { .. } => 503,
            Self::Compression(_) => 500,
            Self::Storage(_) => 500,
            Self::Serde(_) => 400,
            Self::Internal(_) => 500,
        }
    }

    pub fn code(&self) -> &'static str {
        match self {
            Self::BadRequest(_) => "bad_request",
            Self::Unauthorized(_) => "unauthorized",
            Self::Forbidden(_) => "forbidden",
            Self::NotFound(_) => "not_found",
            Self::Conflict(_) => "conflict",
            Self::RateLimited(_) => "rate_limited",
            Self::QuotaExhausted(_) => "quota_exhausted",
            Self::Upstream { .. } => "upstream_error",
            Self::UpstreamTimeout { .. } => "upstream_timeout",
            Self::UpstreamStreamEof { .. } => "upstream_stream_eof",
            Self::ComboExhausted { .. } => "combo_exhausted",
            Self::NoProviderForModel(_) => "no_provider_for_model",
            Self::FormatTranslation { .. } => "format_translation_error",
            Self::ModelLocked(_) => "model_locked",
            Self::Cooldown { .. } => "cooldown",
            Self::CircuitOpen(_) => "circuit_open",
            Self::Compression(_) => "compression_error",
            Self::Storage(_) => "storage_error",
            Self::Serde(_) => "invalid_json",
            Self::Internal(_) => "internal_error",
        }
    }
}

impl From<sqlx_error_compat::Error> for Error {
    fn from(value: sqlx_error_compat::Error) -> Self {
        Self::Storage(value.to_string())
    }
}

/// Tiny shim so the `From` impl above compiles without depending on the
/// `omniroute-storage` crate from `omniroute-core`. Storage adapters map
/// their real error type into `Error::Storage`.
pub mod sqlx_error_compat {
    use std::fmt;

    #[derive(Debug)]
    pub struct Error(pub String);

    impl fmt::Display for Error {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            f.write_str(&self.0)
        }
    }

    impl std::error::Error for Error {}
}

impl Clone for Error {
    fn clone(&self) -> Self {
        // Errors are usually cheap to re-create from a description; this keeps
        // the public surface Clone-friendly for use in response builders.
        match self {
            Self::BadRequest(s) => Self::BadRequest(s.clone()),
            Self::Unauthorized(s) => Self::Unauthorized(s.clone()),
            Self::Forbidden(s) => Self::Forbidden(s.clone()),
            Self::NotFound(s) => Self::NotFound(s.clone()),
            Self::Conflict(s) => Self::Conflict(s.clone()),
            Self::RateLimited(s) => Self::RateLimited(s.clone()),
            Self::QuotaExhausted(s) => Self::QuotaExhausted(s.clone()),
            Self::Upstream { provider, status, message } => Self::Upstream {
                provider: provider.clone(),
                status: *status,
                message: message.clone(),
            },
            Self::UpstreamTimeout { provider } => Self::UpstreamTimeout { provider: provider.clone() },
            Self::UpstreamStreamEof { provider } => {
                Self::UpstreamStreamEof { provider: provider.clone() }
            }
            Self::ComboExhausted { combo } => Self::ComboExhausted { combo: combo.clone() },
            Self::NoProviderForModel(s) => Self::NoProviderForModel(s.clone()),
            Self::FormatTranslation { from, to, message } => Self::FormatTranslation {
                from: from.clone(),
                to: to.clone(),
                message: message.clone(),
            },
            Self::ModelLocked(s) => Self::ModelLocked(s.clone()),
            Self::Cooldown { provider, until } => Self::Cooldown { provider: provider.clone(), until: *until },
            Self::CircuitOpen(s) => Self::CircuitOpen(s.clone()),
            Self::Compression(s) => Self::Compression(s.clone()),
            Self::Storage(s) => Self::Storage(s.clone()),
            Self::Serde(e) => { let msg = e.to_string(); Self::Serde(serde_json::Error::io(std::io::Error::other(msg))) },
            Self::Internal(s) => Self::Internal(s.clone()),
        }
    }
}
