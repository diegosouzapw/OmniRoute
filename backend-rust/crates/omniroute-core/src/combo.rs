//! Combo types (multi-model cascade / fallback chains).

use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Combo id (UUID).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ComboId(pub Uuid);

impl ComboId {
    pub fn new() -> Self {
        Self(Uuid::new_v4())
    }
}

impl Default for ComboId {
    fn default() -> Self {
        Self::new()
    }
}

impl std::fmt::Display for ComboId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

/// Strategy for picking a step in a combo.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ComboStrategy {
    /// Try steps in order; on failure, move to the next.
    Fallback,
    /// Run all steps in parallel; return the first non-error response.
    Race,
    /// Run steps in order; combine their outputs (cascaded context).
    Cascade,
    /// Distribute load across steps in a round-robin.
    RoundRobin,
    /// Run all steps and merge the outputs.
    Ensemble,
}

/// A single step in a combo.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ComboStep {
    pub model: String,
    /// Optional provider id; if absent, the registry picks the default for that model.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub provider: Option<String>,
    /// Optional weight (0-100) for ensemble / round-robin.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub weight: Option<u32>,
    /// Step-specific generation params.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub params: Option<serde_json::Value>,
}

/// A combo (chain / race / cascade / ensemble) of model steps.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Combo {
    pub id: ComboId,
    pub name: String,
    pub strategy: ComboStrategy,
    pub steps: Vec<ComboStep>,
    /// Optional description.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    /// Optional owner (user id).
    pub owner_id: Option<Uuid>,
    /// Created at.
    pub created_at: chrono::DateTime<chrono::Utc>,
    /// Last used at.
    pub last_used_at: Option<chrono::DateTime<chrono::Utc>>,
}

impl Combo {
    pub fn first_model(&self) -> Option<&str> {
        self.steps.first().map(|s| s.model.as_str())
    }
}
