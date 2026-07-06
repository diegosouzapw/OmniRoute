//! omniroute-combo: combo resolution + cascade routing (first slice: hardcoded).

use std::collections::HashMap;

use omniroute_core::{RouteDecision, RouteRequest};

pub fn resolve(req: &RouteRequest) -> RouteDecision {
    let chain = fallback_for(&req.model);
    RouteDecision {
        provider: chain[0].clone(),
        model: req.model.clone(),
        fallback_chain: chain[1..].to_vec(),
    }
}

fn fallback_for(model: &str) -> Vec<String> {
    let mut map: HashMap<&'static str, Vec<&'static str>> = HashMap::new();
    map.insert("gpt-4o", vec!["openai", "openrouter", "groq"]);
    map.insert("gpt-4o-mini", vec!["openai", "openrouter", "groq"]);
    map.insert("claude-3-5-sonnet-latest", vec!["anthropic", "openrouter"]);
    map.insert("gemini-2.0-flash", vec!["google", "openrouter"]);
    map.insert("llama-3.3-70b-versatile", vec!["groq", "openrouter"]);
    map.get(model)
        .map(|v| v.iter().map(|s| s.to_string()).collect())
        .unwrap_or_else(|| vec!["openrouter".to_string()])
}
