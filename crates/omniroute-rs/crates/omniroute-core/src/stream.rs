//! Streaming response types.

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;
use crate::usage::Usage;

/// Streaming choice (delta + finish reason).
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct StreamingChoice {
    /// Choice index.
    pub index: u32,
    /// Incremental delta.
    pub delta: Delta,
    /// Finish reason (set on the final chunk).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub finish_reason: Option<String>,
    /// Logprobs.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub logprobs: Option<serde_json::Value>,
}

/// Incremental content in a streaming response.
#[derive(Debug, Clone, Default, Serialize, Deserialize, JsonSchema)]
pub struct Delta {
    /// Role (only on the first chunk).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub role: Option<String>,
    /// Incremental text.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub content: Option<String>,
    /// Incremental refusal.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub refusal: Option<String>,
    /// Incremental tool calls.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub tool_calls: Option<Vec<DeltaToolCall>>,
}

/// Incremental tool call.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct DeltaToolCall {
    /// Index.
    pub index: u32,
    /// Tool call id (only on the first delta).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub id: Option<String>,
    /// Type (function).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    #[serde(rename = "type")]
    pub kind: Option<String>,
    /// Function name (first delta).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub function: Option<DeltaFunction>,
}

/// Incremental function call.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct DeltaFunction {
    /// Function name.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    /// Incremental arguments.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub arguments: Option<String>,
}

/// Server-sent-event frame.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct SseEvent {
    /// Event name (defaults to "message" if absent).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub event: Option<String>,
    /// Event id (for resumability).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub id: Option<String>,
    /// Event data (serialized payload).
    pub data: String,
    /// Retry interval (ms).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub retry: Option<u32>,
}

impl SseEvent {
    /// Build a "data: <json>\n\n" frame.
    pub fn data_json<T: Serialize>(payload: &T) -> Result<Self, crate::OmniRouteError> {
        Ok(Self {
            event: None,
            id: None,
            data: serde_json::to_string(payload)?,
            retry: None,
        })
    }

    /// Render the SSE wire frame.
    pub fn render(&self) -> String {
        let mut s = String::with_capacity(self.data.len() + 16);
        if let Some(event) = &self.event {
            s.push_str("event: ");
            s.push_str(event);
            s.push('\n');
        }
        if let Some(id) = &self.id {
            s.push_str("id: ");
            s.push_str(id);
            s.push('\n');
        }
        for line in self.data.split('\n') {
            s.push_str("data: ");
            s.push_str(line);
            s.push('\n');
        }
        s.push('\n');
        s
    }
}

/// Final usage summary that is emitted on the last chunk.
#[derive(Debug, Clone, Default, Serialize, Deserialize, JsonSchema)]
pub struct StreamUsage {
    /// Stream usage.
    pub usage: Usage,
    /// Echo upstream prompt tokens to client.
    pub prompt_tokens: u32,
    /// Total tokens (prompt + completion).
    pub total_tokens: u32,
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::chat::ChatChunk;
    use crate::usage::Usage;

    #[test]
    fn sse_event_render() {
        let ev = SseEvent {
            event: Some("message".into()),
            id: Some("42".into()),
            data: r#"{"a":1}"#.to_string(),
            retry: None,
        };
        let r = ev.render();
        assert!(r.contains("event: message"));
        assert!(r.contains("id: 42"));
        assert!(r.contains("data: {\"a\":1}"));
        assert!(r.ends_with("\n\n"));
    }

    #[test]
    fn chunk_roundtrip() {
        let c = ChatChunk {
            id: "x".into(),
            object: "chat.completion.chunk".into(),
            created: 0,
            model: "gpt-4o".into(),
            provider: Some("openai".into()),
            choices: vec![StreamingChoice {
                index: 0,
                delta: Delta { role: Some("assistant".into()), content: Some("hi".into()), refusal: None, tool_calls: None },
                finish_reason: None,
                logprobs: None,
            }],
            system_fingerprint: None,
            usage: Some(Usage { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 }),
            request_id: None,
        };
        let v = serde_json::to_value(&c).unwrap();
        let back: ChatChunk = serde_json::from_value(v).unwrap();
        assert_eq!(back.choices[0].delta.content.as_deref(), Some("hi"));
    }
}
