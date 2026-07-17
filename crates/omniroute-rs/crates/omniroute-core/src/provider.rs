//! Provider trait and registry.

use std::collections::HashMap;
use std::sync::Arc;
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

use crate::chat::ChatRequest;
use crate::embedding::EmbeddingRequest;
use crate::error::Result;
use crate::image::ImageRequest;
use crate::response::ProviderResponse;
use crate::stream::ChatChunk;
use bytes::Bytes;
use futures::Stream;

/// Provider kind (chat / embeddings / image / audio / multimodal / custom).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "lowercase")]
pub enum ProviderKind {
    /// OpenAI Chat Completions compatible.
    OpenaiChat,
    /// OpenAI Responses API compatible.
    OpenaiResponses,
    /// Anthropic Messages API.
    Anthropic,
    /// Google Gemini (generativelanguage.googleapis.com).
    Gemini,
    /// Mistral AI.
    Mistral,
    /// Cohere.
    Cohere,
    /// Groq (OpenAI-compatible).
    Groq,
    /// Ollama (local).
    Ollama,
    /// OpenAI-compatible custom base URL.
    CustomOpenai,
    /// Anthropic-compatible custom base URL.
    CustomAnthropic,
    /// Catch-all for unknown / extension providers.
    Extension,
}

/// Provider configuration.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ProviderConfig {
    /// Stable provider id (e.g. "openai", "anthropic", "ollama-local").
    pub id: String,
    /// Human-friendly name.
    pub name: String,
    /// Kind.
    pub kind: ProviderKind,
    /// Base URL (e.g. "https://api.openai.com/v1").
    pub base_url: String,
    /// Default model (optional).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub default_model: Option<String>,
    /// Supported models (canonical -> upstream id).
    #[serde(default)]
    pub models: HashMap<String, String>,
    /// Static API key (overridden by env or per-key store).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub api_key: Option<String>,
    /// API key env var name to look up at runtime.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub api_key_env: Option<String>,
    /// Custom HTTP headers to send with every request.
    #[serde(default)]
    pub headers: HashMap<String, String>,
    /// Request timeout (ms).
    #[serde(default = "default_timeout")]
    pub timeout_ms: u64,
    /// Max retries on transient errors.
    #[serde(default)]
    pub max_retries: u32,
    /// Whether the provider is enabled.
    #[serde(default = "default_true")]
    pub enabled: bool,
    /// Per-provider priority (lower = higher priority in combos).
    #[serde(default)]
    pub priority: i32,
    /// Per-provider weight for load balancing.
    #[serde(default = "default_weight")]
    pub weight: u32,
    /// Region (e.g. "us-east-1", "eu-west-1") for routing decisions.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub region: Option<String>,
    /// Tags for filtering (e.g. "free", "open-source", "production").
    #[serde(default)]
    pub tags: Vec<String>,
    /// Cost tier (1-5; 1 = cheapest).
    #[serde(default = "default_cost_tier")]
    pub cost_tier: u8,
    /// Quality tier (1-5; 5 = highest quality).
    #[serde(default = "default_quality_tier")]
    pub quality_tier: u8,
    /// Latency tier (1-5; 1 = lowest latency).
    #[serde(default = "default_latency_tier")]
    pub latency_tier: u8,
}

fn default_timeout() -> u64 { 60_000 }
fn default_true() -> bool { true }
fn default_weight() -> u32 { 100 }
fn default_cost_tier() -> u8 { 3 }
fn default_quality_tier() -> u8 { 3 }
fn default_latency_tier() -> u8 { 3 }

impl Default for ProviderConfig {
    fn default() -> Self {
        Self {
            id: String::new(),
            name: String::new(),
            kind: ProviderKind::OpenaiChat,
            base_url: String::new(),
            default_model: None,
            models: HashMap::new(),
            api_key: None,
            api_key_env: None,
            headers: HashMap::new(),
            timeout_ms: default_timeout(),
            max_retries: 0,
            enabled: true,
            priority: 0,
            weight: 100,
            region: None,
            tags: Vec::new(),
            cost_tier: 3,
            quality_tier: 3,
            latency_tier: 3,
        }
    }
}

/// Stream of chat chunks.
pub type ChatChunkStream = std::pin::Pin<Box<dyn Stream<Item = Result<ChatChunk>> + Send>>;

/// Stream of bytes (raw response body).
pub type ByteStream = std::pin::Pin<Box<dyn Stream<Item = Result<Bytes>> + Send>>;

/// Provider trait — every provider implements this.
#[async_trait]
pub trait Provider: Send + Sync {
    /// Stable provider id.
    fn id(&self) -> &str;

    /// Kind.
    fn kind(&self) -> ProviderKind;

    /// Configuration snapshot.
    fn config(&self) -> &ProviderConfig;

    /// Health check.
    async fn health(&self) -> Result<ProviderHealth>;

    /// List available models (canonical ids).
    async fn list_models(&self) -> Result<Vec<String>>;

    /// Send a chat completion (non-streaming).
    async fn chat(&self, request: &ChatRequest) -> Result<ProviderResponse>;

    /// Send a chat completion (streaming).
    async fn chat_stream(&self, request: &ChatRequest) -> Result<ChatChunkStream>;

    /// Send an embedding request.
    async fn embed(&self, request: &EmbeddingRequest) -> Result<ProviderResponse> {
        let _ = request;
        Err(crate::OmniRouteError::NotFound(format!(
            "provider {} does not support embeddings",
            self.id()
        )))
    }

    /// Send an image generation request.
    async fn image(&self, request: &ImageRequest) -> Result<ProviderResponse> {
        let _ = request;
        Err(crate::OmniRouteError::NotFound(format!(
            "provider {} does not support image generation",
            self.id()
        )))
    }
}

/// Health check result.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ProviderHealth {
    /// Provider id.
    pub provider: String,
    /// Healthy?
    pub healthy: bool,
    /// Latency in milliseconds (if measurable).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub latency_ms: Option<u64>,
    /// Optional detail.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub detail: Option<String>,
    /// When the check was made.
    pub checked_at: chrono::DateTime<chrono::Utc>,
}

impl ProviderHealth {
    /// Mark the provider healthy.
    pub fn ok(provider: impl Into<String>, latency_ms: u64) -> Self {
        Self {
            provider: provider.into(),
            healthy: true,
            latency_ms: Some(latency_ms),
            detail: None,
            checked_at: chrono::Utc::now(),
        }
    }

    /// Mark the provider unhealthy.
    pub fn fail(provider: impl Into<String>, detail: impl Into<String>) -> Self {
        Self {
            provider: provider.into(),
            healthy: false,
            latency_ms: None,
            detail: Some(detail.into()),
            checked_at: chrono::Utc::now(),
        }
    }
}

/// Provider registry.
#[derive(Default, Clone)]
pub struct ProviderRegistry {
    inner: Arc<parking_lot::RwLock<HashMap<String, Arc<dyn Provider>>>>,
}

impl ProviderRegistry {
    /// Empty registry.
    pub fn new() -> Self { Self::default() }

    /// Register a provider.
    pub fn register(&self, provider: Arc<dyn Provider>) {
        let mut g = self.inner.write();
        g.insert(provider.id().to_string(), provider);
    }

    /// Unregister a provider.
    pub fn unregister(&self, id: &str) -> Option<Arc<dyn Provider>> {
        self.inner.write().remove(id)
    }

    /// Get a provider by id.
    pub fn get(&self, id: &str) -> Option<Arc<dyn Provider>> {
        self.inner.read().get(id).cloned()
    }

    /// List provider ids.
    pub fn list_ids(&self) -> Vec<String> {
        self.inner.read().keys().cloned().collect()
    }

    /// List providers.
    pub fn list(&self) -> Vec<Arc<dyn Provider>> {
        self.inner.read().values().cloned().collect()
    }

    /// Number of providers.
    pub fn len(&self) -> usize {
        self.inner.read().len()
    }

    /// True if registry is empty.
    pub fn is_empty(&self) -> bool {
        self.inner.read().is_empty()
    }
}

impl std::fmt::Debug for ProviderRegistry {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("ProviderRegistry")
            .field("count", &self.len())
            .field("ids", &self.list_ids())
            .finish()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_provider_config() {
        let c = ProviderConfig::default();
        assert_eq!(c.timeout_ms, 60_000);
        assert!(c.enabled);
    }

    #[test]
    fn provider_health_ok() {
        let h = ProviderHealth::ok("openai", 42);
        assert!(h.healthy);
        assert_eq!(h.latency_ms, Some(42));
    }

    #[test]
    fn registry_register_get() {
        use std::sync::Arc;
        let reg = ProviderRegistry::new();
        assert_eq!(reg.len(), 0);
    }
}
