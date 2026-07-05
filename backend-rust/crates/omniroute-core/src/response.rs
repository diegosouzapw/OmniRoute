//! Canonical response types.

use crate::format::Format;
use crate::model::ModelId;
use crate::request::{ChatMessage, ToolCall, Usage};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum FinishReason {
    Stop,
    Length,
    ToolCalls,
    ContentFilter,
    /// Coalesced into "stop" in the wire response; used for combo handoff.
    Handoff,
    /// Coalesced into "stop" in the wire response; used for cascade success.
    Cascade,
    #[serde(other)]
    Other,
}

impl FinishReason {
    pub fn as_wire_str(self) -> &'static str {
        match self {
            Self::Stop | Self::Handoff | Self::Cascade => "stop",
            Self::Length => "length",
            Self::ToolCalls => "tool_calls",
            Self::ContentFilter => "content_filter",
            Self::Other => "stop",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ChatChoice {
    pub index: u32,
    pub message: ChatMessage,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub finish_reason: Option<FinishReason>,
    /// Log probabilities, if requested.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub logprobs: Option<serde_json::Value>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ChatResponse {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub model: ModelId,
    pub choices: Vec<ChatChoice>,
    pub usage: Usage,
    /// Optional provider that actually served the request (for combo tracking).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub served_by: Option<String>,
    /// Optional format that served it.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub served_format: Option<Format>,
    /// System fingerprint (OpenAI convention).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub system_fingerprint: Option<String>,
}

impl ChatResponse {
    pub fn new(model: ModelId, choices: Vec<ChatChoice>, usage: Usage) -> Self {
        Self {
            id: format!("chatcmpl-{}", uuid::Uuid::new_v4().simple()),
            object: "chat.completion".to_owned(),
            created: chrono::Utc::now().timestamp(),
            model,
            choices,
            usage,
            served_by: None,
            served_format: None,
            system_fingerprint: None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ChoiceDelta {
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub role: Option<crate::request::ChatRole>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tool_calls: Option<Vec<ToolCall>>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub finish_reason: Option<FinishReason>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct StreamChoice {
    pub index: u32,
    pub delta: ChoiceDelta,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub finish_reason: Option<FinishReason>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub logprobs: Option<serde_json::Value>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ChatStreamChunk {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub model: ModelId,
    pub choices: Vec<StreamChoice>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub usage: Option<Usage>,
    /// System fingerprint.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub system_fingerprint: Option<String>,
}

impl ChatStreamChunk {
    pub fn first(model: ModelId) -> Self {
        Self {
            id: format!("chatcmpl-{}", uuid::Uuid::new_v4().simple()),
            object: "chat.completion.chunk".to_owned(),
            created: chrono::Utc::now().timestamp(),
            model,
            choices: vec![StreamChoice {
                index: 0,
                delta: ChoiceDelta {
                    role: Some(crate::request::ChatRole::Assistant),
                    content: None,
                    tool_calls: None,
                    finish_reason: None,
                },
                finish_reason: None,
                logprobs: None,
            }],
            usage: None,
            system_fingerprint: None,
        }
    }

    pub fn content_delta(model: ModelId, text: String) -> Self {
        Self {
            id: format!("chatcmpl-{}", uuid::Uuid::new_v4().simple()),
            object: "chat.completion.chunk".to_owned(),
            created: chrono::Utc::now().timestamp(),
            model,
            choices: vec![StreamChoice {
                index: 0,
                delta: ChoiceDelta {
                    role: None,
                    content: Some(text),
                    tool_calls: None,
                    finish_reason: None,
                },
                finish_reason: None,
                logprobs: None,
            }],
            usage: None,
            system_fingerprint: None,
        }
    }

    pub fn final_chunk(model: ModelId, finish: FinishReason, usage: Option<Usage>) -> Self {
        Self {
            id: format!("chatcmpl-{}", uuid::Uuid::new_v4().simple()),
            object: "chat.completion.chunk".to_owned(),
            created: chrono::Utc::now().timestamp(),
            model,
            choices: vec![StreamChoice {
                index: 0,
                delta: ChoiceDelta {
                    role: None,
                    content: None,
                    tool_calls: None,
                    finish_reason: Some(finish),
                },
                finish_reason: Some(finish),
                logprobs: None,
            }],
            usage,
            system_fingerprint: None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Embedding {
    pub index: u32,
    pub object: String,
    pub embedding: Vec<f32>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EmbeddingResponse {
    pub object: String,
    pub data: Vec<Embedding>,
    pub model: ModelId,
    pub usage: Usage,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ImageResponse {
    pub created: i64,
    pub data: Vec<ImageData>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ImageData {
    Url { url: String },
    B64 { b64_json: String },
    Revised { url: String, revised_prompt: Option<String> },
}
