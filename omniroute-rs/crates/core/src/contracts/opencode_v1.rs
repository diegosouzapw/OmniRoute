//! OpenCode plugin v1 wire-shape contract.
//!
//! Locks the `/v1/models` response shape consumed by the OpenCode
//! plugin at `contract_version = "v1"`. Consumers may tolerate extra
//! fields but MUST emit at least the `object` field with value
//! `"list"` (the hard contract below).
//!
//! Forward compatibility: `unknown_capability_fields_are_tolerated`
//! test guards against future capability additions breaking v1 readers.
//!
//! See <https://github.com/KooshaPari/OmniRoute/issues/PR2-followup>
//! for the version-bump protocol when v2 lands.

use serde::{Deserialize, Serialize};

/// Pinned contract version. Bumping requires:
/// 1. New module (`opencode_v2.rs`) parallel to this one
/// 2. ADR documenting the breaking change
/// 3. Coordination with the OpenCode plugin maintainer
pub const OPENCODE_CONTRACT_VERSION: &str = "v1";

/// Top-level wire response from `/v1/models`.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ModelsResponseV1 {
    /// MUST be `"list"`. OpenCode's `getModels()` rejects anything else.
    pub object: String,

    /// The list of models. Empty list is valid (e.g. when the catalog is
    /// being warmed).
    pub data: Vec<ModelV1>,

    /// Cursor pagination: true when the catalog returned the last batch
    /// at this page. Defaults to false per v1 semantics.
    #[serde(default)]
    pub has_more: Option<bool>,

    /// Cursor pagination: opaque id returned for the next batch. Future
    /// versioning may add cursor-based pagination; for v1 the catalog
    /// always returns the full model set in a single page.
    #[serde(default)]
    pub last_id: Option<String>,
}

/// A single model entry.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ModelV1 {
    /// Stable model identifier (e.g. `"gpt-4o"`, `"claude-opus-4"`).
    pub id: String,

    /// MUST be `"model"`.
    pub object: String,

    /// Unix epoch seconds. Optional in v1; consumers that need
    /// ordering should sort by `(provider, id)` instead.
    #[serde(default)]
    pub created: Option<u64>,

    /// Owning provider slug (e.g. `"openai"`, `"anthropic"`). Maps 1:1
    /// to `ProviderKind::as_str()` in the dispatcher.
    pub owned_by: String,

    /// Human-friendly display name (e.g. `"GPT-4o"`). Defaults to id
    /// if absent (caller can fall back).
    #[serde(default)]
    pub display_name: Option<String>,

    /// Capabilities gate. The presence of a capability affects whether
    /// the OpenCode UI shows the model in the selector for that channel
    /// (chat / stream / tools / vision / json_mode).
    #[serde(default)]
    pub capabilities: Option<ModelCapabilitiesV1>,
}

/// Capability flags for the OpenCode plugin's model selector UI.
///
/// All flags are optional. The OpenCode plugin treats absent capabilities
/// as "unspecified" rather than "missing" — it defaults to true for
/// ChatProvider.MOST_CAPABLE and false for everything else. Wire consumers
/// reading v1 should normalize via `Capabilities::normalize()`.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Default)]
pub struct ModelCapabilitiesV1 {
    #[serde(default = "default_true")]
    pub chat: bool,

    #[serde(default = "default_true")]
    pub stream: bool,

    #[serde(default)]
    pub tools: bool,

    #[serde(default)]
    pub vision: bool,

    #[serde(default)]
    pub json_mode: bool,
}

fn default_true() -> bool {
    true
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn contract_version_is_pinned_v1() {
        assert_eq!(
            OPENCODE_CONTRACT_VERSION, "v1",
            "OpenCode plugin contract must remain at v1; bump requires an ADR"
        );
    }

    #[test]
    fn minimal_models_response_roundtrips() {
        // The wire minimum the OpenCode plugin will accept: object + data.
        let json = r#"{
            "object": "list",
            "data": [
                {
                    "id": "gpt-4o",
                    "object": "model",
                    "owned_by": "openai"
                }
            ]
        }"#;
        let parsed: ModelsResponseV1 = serde_json::from_str(json).expect("parse");
        assert_eq!(parsed.object, "list");
        assert_eq!(parsed.data.len(), 1);
        let m = &parsed.data[0];
        assert_eq!(m.id, "gpt-4o");
        assert_eq!(m.object, "model");
        assert_eq!(m.owned_by, "openai");
        assert!(m.created.is_none());
        assert!(m.display_name.is_none());
        assert!(m.capabilities.is_none());
        assert!(parsed.has_more.is_none());
        assert!(parsed.last_id.is_none());
    }

    #[test]
    fn full_models_response_roundtrips() {
        let json = r#"{
            "object": "list",
            "has_more": false,
            "last_id": "y",
            "data": [
                {
                    "id": "claude-opus-4",
                    "object": "model",
                    "created": 1715000000,
                    "owned_by": "anthropic",
                    "display_name": "Claude Opus 4",
                    "capabilities": {
                        "chat": true,
                        "stream": true,
                        "tools": true,
                        "vision": false,
                        "json_mode": true
                    }
                }
            ]
        }"#;
        let parsed: ModelsResponseV1 = serde_json::from_str(json).expect("parse");
        assert_eq!(parsed.has_more, Some(false));
        let m = &parsed.data[0];
        assert_eq!(m.created, Some(1715000000));
        assert_eq!(m.display_name.as_deref(), Some("Claude Opus 4"));
        let caps = m.capabilities.as_ref().expect("caps");
        assert_eq!(caps.chat, true);
        assert_eq!(caps.stream, true);
        assert_eq!(caps.tools, true);
        assert_eq!(caps.vision, false);
        assert_eq!(caps.json_mode, true);
    }

    #[test]
    fn missing_object_field_is_rejected() {
        // Hard contract: `object` MUST be present and equal "list".
        // The OpenCode plugin's selector rejects any response where
        // this check fails.
        let bad = r#"{ "data": [] }"#;
        let err = serde_json::from_str::<ModelsResponseV1>(bad);
        assert!(err.is_err(), "missing object field must error");
    }

    #[test]
    fn unknown_capability_fields_are_tolerated() {
        // Forward compat: a v1.1 reader might add a "reasoning" flag.
        // v1 consumers must NOT error on unknown fields.
        let json = r#"{
            "object": "list",
            "data": [
                {
                    "id": "o3",
                    "object": "model",
                    "owned_by": "openai",
                    "capabilities": {
                        "chat": true,
                        "stream": true,
                        "tools": true,
                        "vision": false,
                        "json_mode": true,
                        "reasoning": true
                    }
                }
            ]
        }"#;
        let parsed: ModelsResponseV1 = serde_json::from_str(json).expect("tolerate extra");
        let caps = parsed.data[0].capabilities.as_ref().expect("caps");
        assert_eq!(caps.chat, true);
        // Unknown field is silently dropped (not in struct, not an error).
    }
}
