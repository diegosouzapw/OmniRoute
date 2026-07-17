//! OpenAI-compatible embedding types.

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

use crate::usage::Usage;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum EmbeddingInputType {
    SearchDocument,
    SearchQuery,
    Classification,
    Clustering,
    Similarity,
}

impl Default for EmbeddingInputType {
    fn default() -> Self { Self::SearchDocument }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "lowercase")]
pub enum EmbeddingEncodingFormat {
    Float,
    Base64,
}

impl Default for EmbeddingEncodingFormat {
    fn default() -> Self { Self::Float }
}

/// OpenAI-compatible embedding request.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
pub struct EmbeddingRequest {
    /// Model id.
    pub model: String,
    /// Input — can be a string, list of strings, list of token arrays, or list of token-id arrays.
    pub input: EmbeddingInput,
    /// Encoding format.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub encoding_format: Option<EmbeddingEncodingFormat>,
    /// Dimensions (for models that support it).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub dimensions: Option<u32>,
    /// User id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub user: Option<String>,
    /// Input type (Cohere-style).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub input_type: Option<EmbeddingInputType>,
}

/// Embedding input variants.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(untagged)]
pub enum EmbeddingInput {
    /// Single string.
    Single(String),
    /// List of strings.
    Many(Vec<String>),
    /// List of token-id arrays.
    Tokens(Vec<Vec<i64>>),
}

impl Default for EmbeddingInput {
    fn default() -> Self { Self::Single(String::new()) }
}

/// Embedding item.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Embedding {
    /// Index in the input list.
    pub index: u32,
    /// The embedding vector.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub embedding: Option<Vec<f32>>,
    /// Base64-encoded embedding (when `encoding_format=base64`).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub embedding_b64: Option<String>,
    /// Object type (always "embedding").
    #[serde(default = "default_object")]
    pub object: String,
}

fn default_object() -> String { "embedding".to_string() }

/// OpenAI-compatible embedding response.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct EmbeddingResponse {
    /// Object type (always "list").
    pub object: String,
    /// Data (the embeddings).
    pub data: Vec<Embedding>,
    /// Model.
    pub model: String,
    /// Usage.
    pub usage: Usage,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn single_input_roundtrip() {
        let r = EmbeddingRequest {
            model: "text-embedding-3-small".into(),
            input: EmbeddingInput::Single("hello".into()),
            ..Default::default()
        };
        let v = serde_json::to_value(&r).unwrap();
        let back: EmbeddingRequest = serde_json::from_value(v).unwrap();
        match back.input {
            EmbeddingInput::Single(s) => assert_eq!(s, "hello"),
            _ => panic!("expected single"),
        }
    }

    #[test]
    fn many_input_roundtrip() {
        let r = EmbeddingRequest {
            model: "x".into(),
            input: EmbeddingInput::Many(vec!["a".into(), "b".into()]),
            ..Default::default()
        };
        let v = serde_json::to_value(&r).unwrap();
        assert!(v["input"].is_array());
    }
}
