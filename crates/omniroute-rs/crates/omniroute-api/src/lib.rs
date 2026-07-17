//! omniroute-api: axum HTTP API.
//!
//! Implements the OpenAI-compatible surface that the existing TypeScript
//! app and CLI tools depend on:
//!
//! - GET  /health
//! - GET  /ready
//! - GET  /v1/models
//! - POST /v1/chat/completions
//! - POST /v1/responses
//! - POST /v1/embeddings
//! - POST /v1/images/generations
//! - POST /v1/audio/speech
//! - POST /v1/audio/transcriptions
//! - POST /v1/rerank
//! - POST /v1/completions
//!
//! Plus the OmniRoute-specific surface (subset of the TS app):
//! - /v1/combo/* (combo CRUD)
//! - /v1/keys/* (API key management)
//! - /v1/usage/* (usage history)
//! - /v1/policy/* (policy CRUD)
//! - /v1/guardrails/* (guardrail CRUD)
//! - /v1/mcp/* (MCP HTTP transport)
//! - /v1/a2a/* (A2A agent tasks)
//! - /v1/management/proxies/* (proxy assignment + health)

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod auth;
pub mod error;
pub mod middleware;
pub mod openai;
pub mod omniroute;
pub mod router;
pub mod state;
pub mod streaming;

pub use router::build_router;
pub use state::AppState;

#[cfg(test)]
mod tests {
    #[test]
    fn placeholder() { assert!(true); }
}
