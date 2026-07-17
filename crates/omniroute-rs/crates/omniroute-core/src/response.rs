//! Provider response envelopes.

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

use crate::chat::ChatResponse;
use crate::embedding::EmbeddingResponse;
use crate::image::ImageResponse;
use crate::usage::{Usage, CostBreakdown};

/// Provider response envelope.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ProviderResponse {
    /// Provider id.
    pub provider: String,
    /// Upstream request id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub upstream_request_id: Option<String>,
    /// Latency in milliseconds.
    pub latency_ms: u64,
    /// HTTP status from the upstream.
    pub status: u16,
    /// Headers from the upstream (lowercased keys).
    #[serde(default)]
    pub headers: std::collections::HashMap<String, String>,
    /// One of: chat / embedding / image / raw.
    pub body: ProviderResponseBody,
    /// Usage (if applicable).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub usage: Option<Usage>,
    /// Cost breakdown (if pricing configured).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cost: Option<CostBreakdown>,
    /// Upstream model id (after alias resolution).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub upstream_model: Option<String>,
}

/// Response body variants.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum ProviderResponseBody {
    /// Chat completion response.
    Chat(ChatResponse),
    /// Embedding response.
    Embedding(EmbeddingResponse),
    /// Image generation response.
    Image(ImageResponse),
    /// Raw JSON response (passthrough).
    Raw(serde_json::Value),
    /// Streaming chunk (rare; usually streamed).
    Stream(serde_json::Value),
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::chat::ChatResponse;

    #[test]
    fn response_body_chat_roundtrip() {
        let body = ProviderResponseBody::Chat(ChatResponse::empty("gpt-4o", "openai"));
        let v = serde_json::to_value(&body).unwrap();
        assert_eq!(v["type"], "chat");
        let back: ProviderResponseBody = serde_json::from_value(v).unwrap();
        match back {
            ProviderResponseBody::Chat(c) => assert_eq!(c.model, "gpt-4o"),
            _ => panic!("expected chat"),
        }
    }
}
