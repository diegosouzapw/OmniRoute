//! OmniRoute core types, traits, and errors.
//!
//! This crate has NO I/O. Everything here is pure types that can be tested
//! without a database, network, or filesystem. It is the foundation that all
//! other crates depend on.

#![deny(unsafe_code)]
#![warn(missing_debug_implementations)]
#![allow(clippy::module_inception)]

pub mod auth;
pub mod combo;
pub mod error;
pub mod format;
pub mod model;
pub mod provider;
pub mod quota;
pub mod request;
pub mod response;

pub use auth::{ApiKey, ApiKeyId, KeyHealth, KeyScope, KeyTier};
pub use combo::{Combo, ComboId, ComboStep, ComboStrategy};
pub use error::{Error, Result};
pub use format::Format;
pub use model::{Model, ModelCapabilities, ModelFamily, ModelId};
pub use provider::{Provider, ProviderId, ProviderMetadata};
pub use quota::{Quota, QuotaBucket, QuotaTracker, RateLimit};
pub use request::{
    ChatMessage, ChatRequest, ChatRole, ContentPart, EmbeddingInput, EmbeddingRequest,
    FunctionCall, FunctionDef, GenerationParams, ImageRequest, ResponseFormat, Tool,
    ToolCall, ToolChoice, Usage,
};
pub use response::{
    ChatChoice, ChatResponse, ChatStreamChunk, ChoiceDelta, Embedding, EmbeddingResponse,
    FinishReason, ImageResponse, StreamChoice,
};
