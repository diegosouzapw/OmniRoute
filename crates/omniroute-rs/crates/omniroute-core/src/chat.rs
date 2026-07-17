//! OpenAI-compatible chat types.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use schemars::JsonSchema;
use std::collections::HashMap;

use crate::usage::Usage;
use crate::stream::StreamingChoice;

/// Role of a chat message.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "lowercase")]
pub enum Role {
    /// System message (instructions to the model).
    System,
    /// User message.
    User,
    /// Assistant message.
    Assistant,
    /// Tool message.
    Tool,
    /// Developer message (OpenAI Responses API).
    Developer,
    /// Function message (legacy).
    Function,
}

impl Role {
    /// Lowercase string form for SSE / wire formats.
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::System => "system",
            Self::User => "user",
            Self::Assistant => "assistant",
            Self::Tool => "tool",
            Self::Developer => "developer",
            Self::Function => "function",
        }
    }
}

impl std::str::FromStr for Role {
    type Err = crate::OmniRouteError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_ascii_lowercase().as_str() {
            "system" => Ok(Self::System),
            "user" => Ok(Self::User),
            "assistant" => Ok(Self::Assistant),
            "tool" => Ok(Self::Tool),
            "developer" => Ok(Self::Developer),
            "function" => Ok(Self::Function),
            other => Err(crate::OmniRouteError::Validation(format!(
                "invalid role: {other}"
            ))),
        }
    }
}

/// A single chat message.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Message {
    /// Role.
    pub role: Role,
    /// Text content. For multimodal messages use [`content_parts`].
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    /// Multimodal content parts.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content_parts: Option<Vec<ContentPart>>,
    /// Optional author name.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    /// Tool call id (tool messages).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tool_call_id: Option<String>,
    /// Tool calls produced by the assistant.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tool_calls: Option<Vec<ToolCall>>,
    /// Optional Anthropic-style cache control marker.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cache_control: Option<CacheControl>,
}

impl Message {
    /// Convenience constructor: system message.
    pub fn system(content: impl Into<String>) -> Self {
        Self { role: Role::System, content: Some(content.into()), content_parts: None, name: None, tool_call_id: None, tool_calls: None, cache_control: None }
    }
    /// Convenience constructor: user message.
    pub fn user(content: impl Into<String>) -> Self {
        Self { role: Role::User, content: Some(content.into()), content_parts: None, name: None, tool_call_id: None, tool_calls: None, cache_control: None }
    }
    /// Convenience constructor: assistant message.
    pub fn assistant(content: impl Into<String>) -> Self {
        Self { role: Role::Assistant, content: Some(content.into()), content_parts: None, name: None, tool_call_id: None, tool_calls: None, cache_control: None }
    }
    /// Convenience constructor: tool message.
    pub fn tool(tool_call_id: impl Into<String>, content: impl Into<String>) -> Self {
        Self { role: Role::Tool, content: Some(content.into()), content_parts: None, name: None, tool_call_id: Some(tool_call_id.into()), tool_calls: None, cache_control: None }
    }
}

/// A single multimodal content part.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum ContentPart {
    /// Plain text.
    Text {
        /// The text.
        text: String,
    },
    /// Image content.
    ImageUrl {
        /// Image URL wrapper.
        image_url: ImageUrl,
    },
    /// Image as base64 data.
    ImageData {
        /// Base64 data and mime type.
        data: String,
        /// MIME type (e.g. image/png).
        mime_type: String,
    },
    /// Audio content (input).
    InputAudio {
        /// Base64 audio data.
        data: String,
        /// Audio format (wav, mp3).
        format: String,
    },
    /// Refusal (assistant refused to answer).
    Refusal {
        /// Refusal reason.
        refusal: String,
    },
}

/// Image URL with optional detail level.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ImageUrl {
    /// URL or data URI.
    pub url: String,
    /// Detail level: auto, low, high.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub detail: Option<String>,
}

/// Tool definition for chat completions.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Tool {
    /// Type (always "function" today).
    #[serde(rename = "type")]
    pub kind: String,
    /// Function definition.
    pub function: ToolFunction,
}

/// Function definition.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ToolFunction {
    /// Function name.
    pub name: String,
    /// Description for the model.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    /// JSON Schema for the parameters.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub parameters: Option<serde_json::Value>,
    /// Whether the tool is strict (structured outputs).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub strict: Option<bool>,
}

/// A tool call produced by the model.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ToolCall {
    /// Tool call id.
    pub id: String,
    /// Type (function).
    #[serde(rename = "type")]
    pub kind: String,
    /// Function call.
    pub function: ToolCallFunction,
}

/// Function call payload.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ToolCallFunction {
    /// Function name.
    pub name: String,
    /// JSON-encoded arguments.
    pub arguments: String,
}

/// Cache control marker (Anthropic-style).
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CacheControl {
    /// Cache type (e.g. "ephemeral").
    #[serde(rename = "type")]
    pub kind: String,
}

/// Response format hint.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ResponseFormat {
    /// Format type: "text" or "json_object" or "json_schema".
    #[serde(rename = "type")]
    pub kind: String,
    /// JSON schema (when kind=json_schema).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub schema: Option<serde_json::Value>,
    /// Strict mode (when kind=json_schema).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub strict: Option<bool>,
}

/// OpenAI-compatible chat completions request.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
pub struct ChatRequest {
    /// Model id (provider-specific or canonical alias).
    pub model: String,
    /// Messages.
    #[serde(default)]
    pub messages: Vec<Message>,
    /// Sampling temperature.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub temperature: Option<f32>,
    /// Top-p.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub top_p: Option<f32>,
    /// Max output tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub max_tokens: Option<u32>,
    /// Max completion tokens (newer OpenAI API).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub max_completion_tokens: Option<u32>,
    /// Stop sequences.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub stop: Option<Vec<String>>,
    /// Stream flag.
    #[serde(default)]
    pub stream: bool,
    /// Stream options.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub stream_options: Option<StreamOptions>,
    /// Presence penalty.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub presence_penalty: Option<f32>,
    /// Frequency penalty.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub frequency_penalty: Option<f32>,
    /// Logit bias.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub logit_bias: Option<HashMap<String, f32>>,
    /// User identifier (for abuse tracking).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub user: Option<String>,
    /// Tools.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tools: Option<Vec<Tool>>,
    /// Tool choice.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tool_choice: Option<serde_json::Value>,
    /// Response format.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub response_format: Option<ResponseFormat>,
    /// Reasoning effort (o-series).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub reasoning_effort: Option<String>,
    /// Seed (for sampling determinism).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub seed: Option<i64>,
    /// Metadata.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub metadata: Option<HashMap<String, String>>,
    /// Top logprobs.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub top_logprobs: Option<u32>,
    /// Modalities.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub modalities: Option<Vec<String>>,
    /// Audio options.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub audio: Option<serde_json::Value>,
    /// Prediction content (for speculative decoding).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub prediction: Option<serde_json::Value>,
    /// Parallel tool calls flag.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub parallel_tool_calls: Option<bool>,
    /// Extra body (provider-specific passthrough).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub extra_body: Option<serde_json::Value>,
    /// Request id (set by the gateway, used for tracing).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
}

/// Streaming options.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
pub struct StreamOptions {
    /// Include usage in the final chunk.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub include_usage: Option<bool>,
}

/// OpenAI-compatible chat completions response (non-streaming).
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ChatResponse {
    /// Response id.
    pub id: String,
    /// Object type (always "chat.completion").
    pub object: String,
    /// Unix epoch seconds.
    pub created: i64,
    /// Model that produced the response.
    pub model: String,
    /// Provider that served the request.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub provider: Option<String>,
    /// Choices.
    pub choices: Vec<Choice>,
    /// Usage.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub usage: Option<Usage>,
    /// System fingerprint.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub system_fingerprint: Option<String>,
    /// Request id (set by the gateway).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
    /// Latency in milliseconds.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub latency_ms: Option<u64>,
    /// Combo used to dispatch.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub combo: Option<String>,
}

impl ChatResponse {
    /// Construct an empty "created" response.
    pub fn empty(model: impl Into<String>, provider: impl Into<String>) -> Self {
        Self {
            id: format!("chatcmpl-{}", ulid::Ulid::new()),
            object: "chat.completion".to_string(),
            created: Utc::now().timestamp(),
            model: model.into(),
            provider: Some(provider.into()),
            choices: Vec::new(),
            usage: None,
            system_fingerprint: None,
            request_id: None,
            latency_ms: None,
            combo: None,
        }
    }
}

/// Non-streaming choice.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Choice {
    /// Index.
    pub index: u32,
    /// Message.
    pub message: ResponseMessage,
    /// Finish reason ("stop", "length", "tool_calls", "content_filter").
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub finish_reason: Option<String>,
    /// Logprobs.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub logprobs: Option<serde_json::Value>,
}

/// Assistant message in a response.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ResponseMessage {
    /// Role.
    pub role: Role,
    /// Text content.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    /// Refusal reason.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub refusal: Option<String>,
    /// Tool calls.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tool_calls: Option<Vec<ToolCall>>,
}

/// Streaming chunk (OpenAI-compatible).
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ChatChunk {
    /// Chunk id.
    pub id: String,
    /// Object type (always "chat.completion.chunk").
    pub object: String,
    /// Unix epoch seconds.
    pub created: i64,
    /// Model that produced the chunk.
    pub model: String,
    /// Provider.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub provider: Option<String>,
    /// Streaming choices.
    pub choices: Vec<StreamingChoice>,
    /// System fingerprint.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub system_fingerprint: Option<String>,
    /// Usage (only present in the final chunk if `include_usage=true`).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub usage: Option<Usage>,
    /// Request id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
}

/// Request log entry (DB row shape).
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RequestLog {
    /// Internal id.
    pub id: String,
    /// Public request id (ULID).
    pub request_id: String,
    /// User id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub user_id: Option<String>,
    /// Workspace id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub workspace_id: Option<String>,
    /// Provider id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub provider_id: Option<String>,
    /// Combo id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub combo_id: Option<String>,
    /// Model id (canonical).
    pub model: String,
    /// Upstream model id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub upstream_model: Option<String>,
    /// HTTP method.
    pub method: String,
    /// Path.
    pub path: String,
    /// HTTP status returned.
    pub status: u16,
    /// Latency in milliseconds.
    pub latency_ms: u64,
    /// Prompt tokens.
    #[serde(default)]
    pub prompt_tokens: u32,
    /// Completion tokens.
    #[serde(default)]
    pub completion_tokens: u32,
    /// Total tokens.
    #[serde(default)]
    pub total_tokens: u32,
    /// Cost in USD.
    #[serde(default)]
    pub cost_usd: f64,
    /// Error code, if any.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub error_code: Option<String>,
    /// Created at.
    pub created_at: DateTime<Utc>,
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn chat_request_roundtrips_minimal() {
        let r = ChatRequest { model: "gpt-4o".into(), ..Default::default() };
        let v = serde_json::to_value(&r).unwrap();
        let back: ChatRequest = serde_json::from_value(v.clone()).unwrap();
        assert_eq!(back.model, "gpt-4o");
        assert_eq!(v["model"], "gpt-4o");
    }

    #[test]
    fn chat_request_full() {
        let r = ChatRequest {
            model: "gpt-4o".into(),
            messages: vec![Message::user("hi"), Message::assistant("hello!")],
            temperature: Some(0.7),
            max_tokens: Some(256),
            stream: true,
            ..Default::default()
        };
        let v = serde_json::to_value(&r).unwrap();
        let back: ChatRequest = serde_json::from_value(v).unwrap();
        assert_eq!(back.messages.len(), 2);
        assert_eq!(back.temperature, Some(0.7));
    }

    #[test]
    fn role_parsing() {
        use std::str::FromStr;
        assert_eq!(Role::from_str("user").unwrap(), Role::User);
        assert_eq!(Role::from_str("ASSISTANT").unwrap(), Role::Assistant);
        assert!(Role::from_str("wizard").is_err());
    }

    #[test]
    fn multimodal_message_roundtrip() {
        let m = Message {
            role: Role::User,
            content: None,
            content_parts: Some(vec![
                ContentPart::Text { text: "what is this?".into() },
                ContentPart::ImageUrl { image_url: ImageUrl { url: "https://x/y.png".into(), detail: Some("low".into()) } },
            ]),
            name: None,
            tool_call_id: None,
            tool_calls: None,
            cache_control: None,
        };
        let v = serde_json::to_value(&m).unwrap();
        assert_eq!(v["content_parts"][0]["type"], "text");
        assert_eq!(v["content_parts"][1]["type"], "image_url");
    }

    #[test]
    fn json_schema_generated() {
        let s = schemars::schema_for!(ChatRequest);
        let j = serde_json::to_value(&s).unwrap();
        assert!(j["properties"]["model"].is_object(), "schema should expose model");
    }

    #[test]
    fn test_message_constructors() {
        let _ = Message::system("s");
        let _ = Message::user("u");
        let _ = Message::assistant("a");
        let _ = Message::tool("id", "content");
        let _ = json!({});
    }
}
