//! Rerank request/response types (Cohere-style).

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RerankRequest {
    /// Model id.
    pub model: String,
    /// Query.
    pub query: String,
    /// Documents to rerank.
    pub documents: Vec<String>,
    /// Top N to return.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub top_n: Option<u32>,
    /// Return documents in the response.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub return_documents: Option<bool>,
    /// Max chunks per doc.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub max_chunks_per_doc: Option<u32>,
    /// User id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub user: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RerankResult {
    /// Index in the input.
    pub index: u32,
    /// Relevance score.
    pub relevance_score: f32,
    /// Optional document text (if `return_documents=true`).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub document: Option<RerankDocument>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RerankDocument {
    /// Document text.
    pub text: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct RerankResponse {
    /// Provider id.
    pub provider: String,
    /// Model id.
    pub model: String,
    /// Results.
    pub results: Vec<RerankResult>,
    /// Usage (if returned by provider).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub usage: Option<crate::usage::Usage>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rerank_roundtrip() {
        let r = RerankRequest {
            model: "rerank-english-v3.0".into(),
            query: "q".into(),
            documents: vec!["a".into(), "b".into()],
            top_n: Some(1),
            return_documents: Some(true),
            max_chunks_per_doc: None,
            user: None,
        };
        let v = serde_json::to_value(&r).unwrap();
        let back: RerankRequest = serde_json::from_value(v).unwrap();
        assert_eq!(back.documents.len(), 2);
        assert_eq!(back.top_n, Some(1));
    }
}
