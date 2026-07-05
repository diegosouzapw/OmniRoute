//! Canonical Model types.

use serde::{Deserialize, Serialize};
use std::fmt;
use uuid::Uuid;

/// Stable identifier for a model within OmniRoute. Internally we always speak
/// model aliases (e.g. `gpt-4o`, `claude-3-5-sonnet`); the upstream
/// `upstream_model` field is a per-provider detail.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ModelId(pub String);

impl ModelId {
    pub fn new(s: impl Into<String>) -> Self {
        Self(s.into())
    }
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl fmt::Display for ModelId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}

impl From<&str> for ModelId {
    fn from(s: &str) -> Self {
        Self(s.to_owned())
    }
}

impl From<String> for ModelId {
    fn from(s: String) -> Self {
        Self(s)
    }
}

/// Coarse model family grouping used for combo fall-back decisions.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ModelFamily {
    Gpt,
    Claude,
    Gemini,
    Command,
    Llama,
    Mistral,
    Deepseek,
    Qwen,
    Grok,
    Other,
}

impl ModelFamily {
    pub fn detect(model: &str) -> Self {
        let m = model.to_ascii_lowercase();
        if m.starts_with("gpt-") || m.starts_with("o1") || m.starts_with("o3") || m.starts_with("o4") {
            Self::Gpt
        } else if m.starts_with("claude") {
            Self::Claude
        } else if m.starts_with("gemini") {
            Self::Gemini
        } else if m.starts_with("command") {
            Self::Command
        } else if m.starts_with("llama") {
            Self::Llama
        } else if m.starts_with("mistral") || m.starts_with("mixtral") {
            Self::Mistral
        } else if m.starts_with("deepseek") {
            Self::Deepseek
        } else if m.starts_with("qwen") {
            Self::Qwen
        } else if m.starts_with("grok") {
            Self::Grok
        } else {
            Self::Other
        }
    }
}

/// Static capabilities a model advertises.
#[derive(Debug, Clone, Default, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub struct ModelCapabilities {
    /// Chat completions
    pub chat: bool,
    /// Tool / function calling
    pub tools: bool,
    /// Vision (image inputs)
    pub vision: bool,
    /// Audio input
    pub audio_in: bool,
    /// Audio output
    pub audio_out: bool,
    /// Streaming
    pub streaming: bool,
    /// JSON-mode / structured outputs
    pub json_mode: bool,
    /// Reasoning tokens
    pub reasoning: bool,
    /// Max context window (tokens)
    pub context_window: Option<u32>,
    /// Max output tokens
    pub max_output: Option<u32>,
}

/// A registered model.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Model {
    pub id: ModelId,
    pub family: ModelFamily,
    pub capabilities: ModelCapabilities,
    /// Optional display name.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub display_name: Option<String>,
    /// Provider that originally serves this model (None = virtual/alias).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub primary_provider: Option<Uuid>,
    /// Cost in micro-cents per input token (for billing). None = unknown.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub input_cost_micro_cents: Option<u64>,
    /// Cost in micro-cents per output token. None = unknown.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub output_cost_micro_cents: Option<u64>,
}

impl Model {
    pub fn supports_tools(&self) -> bool {
        self.capabilities.tools
    }
    pub fn supports_vision(&self) -> bool {
        self.capabilities.vision
    }
    pub fn supports_streaming(&self) -> bool {
        self.capabilities.streaming
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn family_detection() {
        assert_eq!(ModelFamily::detect("gpt-4o"), ModelFamily::Gpt);
        assert_eq!(ModelFamily::detect("o3-mini"), ModelFamily::Gpt);
        assert_eq!(ModelFamily::detect("claude-3-5-sonnet"), ModelFamily::Claude);
        assert_eq!(ModelFamily::detect("gemini-1.5-pro"), ModelFamily::Gemini);
        assert_eq!(ModelFamily::detect("llama-3.1-70b"), ModelFamily::Llama);
        assert_eq!(ModelFamily::detect("unknown-model"), ModelFamily::Other);
    }
}
