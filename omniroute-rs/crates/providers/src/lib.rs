//! omniroute-providers: provider trait + 5 concrete impls.

use std::collections::HashMap;
use std::sync::Arc;

use async_trait::async_trait;
use omniroute_core::{ChatRequest, ChatResponse, ProviderError};

#[async_trait]
pub trait Provider: Send + Sync {
    fn name(&self) -> &'static str;
    async fn chat(&self, req: &ChatRequest) -> Result<ChatResponse, ProviderError>;
}

#[derive(Default)]
pub struct Registry {
    by_name: HashMap<String, Arc<dyn Provider>>,
}

impl Registry {
    pub fn register(&mut self, p: Arc<dyn Provider>) {
        self.by_name.insert(p.name().to_string(), p);
    }
    pub fn get(&self, name: &str) -> Option<Arc<dyn Provider>> {
        self.by_name.get(name).cloned()
    }
    pub fn names(&self) -> Vec<String> {
        let mut v: Vec<String> = self.by_name.keys().cloned().collect();
        v.sort();
        v
    }
}

pub mod openai;
pub mod anthropic;
pub mod google;
pub mod openrouter;
pub mod groq;

pub fn default_registry() -> Registry {
    let mut r = Registry::default();
    if let Ok(key) = std::env::var("OPENAI_API_KEY") {
        r.register(Arc::new(openai::OpenAIProvider::new(key)));
    }
    if let Ok(key) = std::env::var("ANTHROPIC_API_KEY") {
        r.register(Arc::new(anthropic::AnthropicProvider::new(key)));
    }
    if let Ok(key) = std::env::var("GOOGLE_API_KEY") {
        r.register(Arc::new(google::GoogleProvider::new(key)));
    }
    if let Ok(key) = std::env::var("OPENROUTER_API_KEY") {
        r.register(Arc::new(openrouter::OpenRouterProvider::new(key)));
    }
    if let Ok(key) = std::env::var("GROQ_API_KEY") {
        r.register(Arc::new(groq::GroqProvider::new(key)));
    }
    r
}
