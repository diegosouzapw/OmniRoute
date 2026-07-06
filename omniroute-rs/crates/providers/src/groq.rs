//! Groq provider.

use async_trait::async_trait;
use omniroute_core::{ChatRequest, ChatResponse, ChatMessage, ChatChoice, ChatUsage, ProviderError};
use serde::{Deserialize, Serialize};

#[derive(Clone)]
pub struct GroqProvider {
    api_key: String,
    base_url: String,
    client: reqwest::Client,
}

#[derive(Debug, Serialize)]
struct GroqRequest<'a> {
    model: &'a str,
    messages: Vec<GroqMessage<'a>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    temperature: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    max_tokens: Option<u32>,
    #[serde(skip_serializing_if = "std::ops::Not::not")]
    stream: bool,
}

#[derive(Debug, Serialize)]
struct GroqMessage<'a> {
    role: &'a str,
    content: &'a str,
}

#[derive(Debug, Deserialize)]
struct GroqResponse {
    id: String,
    #[serde(default)]
    object: String,
    #[serde(default)]
    created: u64,
    #[serde(default)]
    model: String,
    choices: Vec<GroqChoice>,
    #[serde(default)]
    usage: Option<GroqUsage>,
}

#[derive(Debug, Deserialize)]
struct GroqChoice {
    index: u32,
    message: GroqResponseMessage,
    #[serde(default)]
    finish_reason: String,
}

#[derive(Debug, Deserialize)]
struct GroqResponseMessage {
    role: String,
    content: String,
}

#[derive(Debug, Deserialize, Default)]
struct GroqUsage {
    prompt_tokens: u32,
    completion_tokens: u32,
    total_tokens: u32,
}

impl GroqProvider {
    pub fn new(api_key: String) -> Self {
        Self {
            api_key,
            base_url: std::env::var("GROQ_BASE_URL").unwrap_or_else(|_| "https://api.groq.com/openai".to_string()),
            client: reqwest::Client::builder()
                .timeout(std::time::Duration::from_secs(60))
                .build()
                .expect("reqwest client"),
        }
    }
}

#[async_trait]
impl super::Provider for GroqProvider {
    fn name(&self) -> &'static str { "groq" }

    async fn chat(&self, req: &ChatRequest) -> Result<ChatResponse, ProviderError> {
        let body = GroqRequest {
            model: &req.model,
            messages: req.messages.iter().map(|m| GroqMessage {
                role: &m.role,
                content: &m.content,
            }).collect(),
            temperature: req.temperature,
            max_tokens: req.max_tokens,
            stream: false,
        };
        let url = format!("{}/v1/chat/completions", self.base_url);
        let resp = self.client.post(&url)
            .bearer_auth(&self.api_key)
            .json(&body)
            .send()
            .await
            .map_err(|e| ProviderError::Transport(e.to_string()))?;
        let status = resp.status().as_u16();
        let text = resp.text().await.map_err(|e| ProviderError::Transport(e.to_string()))?;
        if status == 401 || status == 403 {
            return Err(ProviderError::Auth(text));
        }
        if status == 429 {
            return Err(ProviderError::RateLimit(text));
        }
        if status >= 400 {
            return Err(ProviderError::Upstream { status, body: text });
        }
        let parsed: GroqResponse = serde_json::from_str(&text).map_err(|e| ProviderError::Parse(e.to_string()))?;
        Ok(ChatResponse {
            id: parsed.id,
            object: parsed.object,
            created: parsed.created,
            model: parsed.model,
            provider: "groq".to_string(),
            choices: parsed.choices.into_iter().map(|c| ChatChoice {
                index: c.index,
                message: ChatMessage { role: c.message.role, content: c.message.content },
                finish_reason: c.finish_reason,
            }).collect(),
            usage: ChatUsage {
                prompt_tokens: parsed.usage.as_ref().map(|u| u.prompt_tokens).unwrap_or(0),
                completion_tokens: parsed.usage.as_ref().map(|u| u.completion_tokens).unwrap_or(0),
                total_tokens: parsed.usage.as_ref().map(|u| u.total_tokens).unwrap_or(0),
            },
        })
    }
}
