//! Stable public API of the compression core.
//!
//! This crate is intentionally free of any OmniRoute-specific types.
//! It defines the contracts that every adapter (N-API, sidecar, CLI)
//! implements, so algorithms stay independent of the host project.

use serde::{Deserialize, Serialize};

/// Role of a message in a conversation.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Role {
    System,
    User,
    Assistant,
    Tool,
}

/// One chat message. Field-compatible with OpenAI `messages[]` entries.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Message {
    pub role: Role,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tool_call_id: Option<String>,
}

/// Tokenizer encodings supported by the core.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum Encoding {
    #[serde(rename = "cl100k_base")]
    Cl100kBase,
    #[serde(rename = "o200k_base")]
    O200kBase,
}

/// Configuration for a compression pass.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
pub struct CompressionConfig {
    /// Target token budget for the compressed messages.
    pub budget_tokens: Option<u64>,
    /// Engine stack priority hint (rtk=10, ionizer=13, headroom=15, ...).
    pub stack_priority: Option<u32>,
}

/// Outcome of a compression pass.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CompressionResult {
    pub messages: Vec<Message>,
    pub compressed: bool,
    pub stats: Option<CompressionStats>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CompressionStats {
    pub saved_tokens: Option<u64>,
    pub input_tokens: Option<u64>,
    pub output_tokens: Option<u64>,
}

/// A token counter. Pure, stateless, thread-safe.
pub trait TokenCounter {
    fn count(&self, text: &str) -> usize;
}

/// A compressor. Pure, deterministic, stateless per call.
pub trait Compressor {
    fn compress(
        &self,
        messages: &[Message],
        config: &CompressionConfig,
    ) -> CompressionResult;
}
