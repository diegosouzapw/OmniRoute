//! Provider trait + metadata. Each upstream LLM provider implements this.

use crate::error::Result;
use crate::format::Format;
use crate::model::ModelId;
use crate::request::{ChatRequest, EmbeddingRequest, ImageRequest};
use crate::response::{ChatResponse, EmbeddingResponse, ImageResponse};
use async_trait::async_trait;
use bytes::Bytes;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt;
use uuid::Uuid;

/// Stable provider identifier (matches the TypeScript registry keys).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ProviderId(pub String);

impl ProviderId {
    pub fn new(s: impl Into<String>) -> Self {
        Self(s.into())
    }
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl fmt::Display for ProviderId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.0)
    }
}

impl From<&str> for ProviderId {
    fn from(s: &str) -> Self {
        Self(s.to_owned())
    }
}

impl From<String> for ProviderId {
    fn from(s: String) -> Self {
        Self(s)
    }
}

/// Static metadata about a provider (immutable per registry entry).
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ProviderMetadata {
    pub id: ProviderId,
    pub display_name: String,
    pub format: Format,
    /// Base URL (e.g. `https://api.openai.com`).
    pub base_url: String,
    /// Whether the provider requires an API key.
    pub requires_api_key: bool,
    /// Whether the provider supports OAuth instead of API keys.
    pub supports_oauth: bool,
    /// Whether the provider supports streaming.
    pub supports_streaming: bool,
    /// Whether the provider supports tool / function calling.
    pub supports_tools: bool,
    /// Whether the provider supports vision.
    pub supports_vision: bool,
    /// Whether the provider supports audio.
    pub supports_audio: bool,
    /// Whether the provider supports image generation.
    pub supports_images: bool,
    /// Whether the provider supports embeddings.
    pub supports_embeddings: bool,
    /// Optional upstream request timeout (ms). 0 = use default.
    pub request_timeout_ms: u32,
    /// Optional auth header name override.
    pub auth_header: Option<String>,
    /// Optional auth scheme override (default: "Bearer").
    pub auth_scheme: Option<String>,
    /// Whether responses go through Anthropic-style SSE (`event:` + `data:`)
    /// vs OpenAI-style SSE (`data:` only).
    pub anthropic_sse: bool,
    /// Per-model upstream model name overrides. If absent, we pass through
    /// the alias unchanged.
    pub model_overrides: HashMap<ModelId, String>,
    /// Custom headers to send on every request.
    pub custom_headers: HashMap<String, String>,
}

/// A request context (per-request) the provider needs to fulfill a call.
#[derive(Debug, Clone)]
pub struct ProviderCallContext {
    /// The unique request id (for tracing / call_logs).
    pub request_id: Uuid,
    /// The API key (or OAuth token) to use.
    pub credential: String,
    /// Optional per-account / per-key metadata.
    pub metadata: HashMap<String, String>,
}

/// Stream event emitted by a provider's chat streaming call.
#[derive(Debug, Clone)]
pub enum StreamEvent {
    /// A content token delta.
    Content(String),
    /// A tool-call delta.
    ToolCallDelta(ToolCallPartial),
    /// Reasoning delta (if the model emits reasoning tokens).
    Reasoning(String),
    /// Final usage (only on the last event for some providers).
    Usage(crate::request::Usage),
    /// Provider-specific final metadata; the last event before `Done`.
    Done,
    /// An upstream error mid-stream.
    Error(String),
}

/// Partial tool call emitted during streaming.
#[derive(Debug, Clone, PartialEq)]
pub struct ToolCallPartial {
    pub index: u32,
    pub id: Option<String>,
    pub name: Option<String>,
    pub arguments_delta: Option<String>,
}

/// The core provider trait. All 231 providers implement this.
#[async_trait]
pub trait Provider: Send + Sync {
    fn metadata(&self) -> &ProviderMetadata;

    /// Send a non-streaming chat request.
    async fn chat(
        &self,
        ctx: &ProviderCallContext,
        req: &ChatRequest,
    ) -> Result<ChatResponse>;

    /// Send a streaming chat request, yielding `StreamEvent`s.
    async fn chat_stream(
        &self,
        ctx: &ProviderCallContext,
        req: &ChatRequest,
    ) -> Result<StreamEventSource>;

    /// Send an embedding request.
    async fn embed(
        &self,
        ctx: &ProviderCallContext,
        req: &EmbeddingRequest,
    ) -> Result<EmbeddingResponse>;

    /// Send an image generation request.
    async fn image(
        &self,
        ctx: &ProviderCallContext,
        req: &ImageRequest,
    ) -> Result<ImageResponse>;
}

/// A boxed async stream of `StreamEvent`s.
pub type StreamEventSource =
    std::pin::Pin<Box<dyn futures::Stream<Item = Result<StreamEvent>> + Send + 'static>>;

/// Helper for translating a canonical `ChatRequest` to a provider-specific
/// upstream body. Most adapters call this rather than hand-rolling.
pub fn render_upstream_body(
    req: &ChatRequest,
    model_override: Option<&str>,
) -> Result<serde_json::Value> {
    let mut body = serde_json::json!({
        "model": model_override.unwrap_or_else(|| req.model.as_str()),
        "messages": req.messages,
        "stream": req.stream.unwrap_or(false),
    });
    if let Some(temp) = req.params.temperature {
        body["temperature"] = serde_json::json!(temp);
    }
    if let Some(top_p) = req.params.top_p {
        body["top_p"] = serde_json::json!(top_p);
    }
    if let Some(mt) = req.params.max_tokens {
        body["max_tokens"] = serde_json::json!(mt);
    }
    if let Some(mt) = req.params.max_completion_tokens {
        body["max_completion_tokens"] = serde_json::json!(mt);
    }
    if let Some(stop) = &req.params.stop {
        body["stop"] = serde_json::json!(stop);
    }
    if let Some(pp) = req.params.presence_penalty {
        body["presence_penalty"] = serde_json::json!(pp);
    }
    if let Some(fp) = req.params.frequency_penalty {
        body["frequency_penalty"] = serde_json::json!(fp);
    }
    if let Some(seed) = req.params.seed {
        body["seed"] = serde_json::json!(seed);
    }
    if let Some(user) = &req.params.user {
        body["user"] = serde_json::json!(user);
    }
    if let Some(effort) = &req.params.reasoning_effort {
        body["reasoning_effort"] = serde_json::json!(effort);
    }
    if let Some(tools) = &req.tools {
        body["tools"] = serde_json::json!(tools);
    }
    if let Some(choice) = &req.tool_choice {
        body["tool_choice"] = serde_json::json!(choice);
    }
    if let Some(rf) = &req.response_format {
        body["response_format"] = serde_json::json!(rf);
    }
    if !req.params.extra.is_empty() {
        if let Some(obj) = body.as_object_mut() {
            for (k, v) in &req.params.extra {
                obj.entry(k.clone()).or_insert(v.clone());
            }
        }
    }
    Ok(body)
}

/// Helper for parsing a non-streaming chat response. OpenAI-compatible
/// providers can use this verbatim.
pub fn parse_openai_chat_response(
    bytes: &Bytes,
    requested_model: &ModelId,
) -> Result<ChatResponse> {
    let v: serde_json::Value = serde_json::from_slice(bytes)?;
    let id = v.get("id").and_then(|x| x.as_str()).unwrap_or("chatcmpl-unknown").to_owned();
    let object = v.get("object").and_then(|x| x.as_str()).unwrap_or("chat.completion").to_owned();
    let created = v.get("created").and_then(|x| x.as_i64()).unwrap_or_else(|| chrono::Utc::now().timestamp());
    let model = v
        .get("model")
        .and_then(|x| x.as_str())
        .map(|s| ModelId::new(s))
        .unwrap_or_else(|| requested_model.clone());
    let mut choices = Vec::new();
    if let Some(arr) = v.get("choices").and_then(|x| x.as_array()) {
        for (i, c) in arr.iter().enumerate() {
            let message = c.get("message").cloned().unwrap_or(serde_json::json!({}));
            let finish_reason = c
                .get("finish_reason")
                .and_then(|x| x.as_str())
                .and_then(|s| match s {
                    "stop" => Some(crate::response::FinishReason::Stop),
                    "length" => Some(crate::response::FinishReason::Length),
                    "tool_calls" => Some(crate::response::FinishReason::ToolCalls),
                    "content_filter" => Some(crate::response::FinishReason::ContentFilter),
                    _ => None,
                });
            let chat_message = serde_json::from_value::<crate::request::ChatMessage>(message)?;
            choices.push(crate::response::ChatChoice {
                index: i as u32,
                message: chat_message,
                finish_reason,
                logprobs: c.get("logprobs").cloned(),
            });
        }
    }
    let usage = v
        .get("usage")
        .cloned()
        .map(serde_json::from_value)
        .transpose()?
        .unwrap_or_default();
    Ok(ChatResponse {
        id,
        object,
        created,
        model,
        choices,
        usage,
        served_by: None,
        served_format: None,
        system_fingerprint: v.get("system_fingerprint").and_then(|x| x.as_str()).map(|s| s.to_owned()),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn render_body_preserves_overrides() {
        let req = ChatRequest {
            model: ModelId::new("gpt-4o"),
            messages: vec![],
            stream: Some(false),
            tools: None,
            tool_choice: None,
            response_format: None,
            params: crate::request::GenerationParams {
                temperature: Some(0.7),
                max_tokens: Some(256),
                ..Default::default()
            },
            target_format: None,
            combo_id: None,
        };
        let body = render_upstream_body(&req, Some("gpt-4o-2024-08-06")).unwrap();
        assert_eq!(body["model"], "gpt-4o-2024-08-06");
        assert_eq!(body["temperature"], 0.7);
        assert_eq!(body["max_tokens"], 256);
    }
}
