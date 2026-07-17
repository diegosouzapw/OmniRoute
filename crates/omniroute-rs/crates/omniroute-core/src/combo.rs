//! Combo (multi-provider routing) types.

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

use crate::routing::RoutingStrategy;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ComboStep {
    /// Stable id.
    pub id: String,
    /// Provider id.
    pub provider_id: String,
    /// Upstream model id.
    pub upstream_model: String,
    /// Step order (0-based).
    pub order: u32,
    /// Whether this step is enabled.
    #[serde(default = "default_true")]
    pub enabled: bool,
    /// Step-specific weight (for weighted LB).
    #[serde(default = "default_weight")]
    pub weight: u32,
    /// Optional cost cap (USD per 1k tokens) to prefer cheaper steps.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cost_cap_per_1k_usd: Option<f64>,
    /// Optional region constraint.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub region: Option<String>,
}

fn default_true() -> bool { true }
fn default_weight() -> u32 { 100 }

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Combo {
    /// Stable combo id (e.g. "smart-fast-cheap").
    pub id: String,
    /// Human-friendly name.
    pub name: String,
    /// Description.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    /// Logical (canonical) model the combo targets.
    pub logical_model: String,
    /// Strategy.
    pub strategy: RoutingStrategy,
    /// Steps (ordered list of provider+model attempts).
    pub steps: Vec<ComboStep>,
    /// Whether this combo is enabled.
    #[serde(default = "default_true")]
    pub enabled: bool,
    /// Tag for filtering.
    #[serde(default)]
    pub tags: Vec<String>,
    /// Optional quality gate (require a "good" response before considering the combo successful).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub quality_gate: Option<QualityGate>,
    /// Optional budget (USD/day) for the combo.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub budget_usd_per_day: Option<f64>,
    /// Created at.
    pub created_at: chrono::DateTime<chrono::Utc>,
    /// Updated at.
    pub updated_at: chrono::DateTime<chrono::Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct QualityGate {
    /// Required finish reason.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub required_finish_reason: Option<String>,
    /// Minimum content length.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub min_content_length: Option<u32>,
    /// If true, retry on content-filter finish reasons.
    #[serde(default)]
    pub retry_on_content_filter: bool,
}

impl Combo {
    /// Number of enabled steps.
    pub fn enabled_step_count(&self) -> usize {
        self.steps.iter().filter(|s| s.enabled).count()
    }

    /// True if the combo has at least one enabled step.
    pub fn is_routable(&self) -> bool {
        self.enabled && self.enabled_step_count() > 0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn step(id: &str, enabled: bool) -> ComboStep {
        ComboStep {
            id: id.into(),
            provider_id: "openai".into(),
            upstream_model: "gpt-4o-mini".into(),
            order: 0,
            enabled,
            weight: 100,
            cost_cap_per_1k_usd: None,
            region: None,
        }
    }

    #[test]
    fn enabled_step_count() {
        let c = Combo {
            id: "c1".into(),
            name: "c".into(),
            description: None,
            logical_model: "gpt-4o".into(),
            strategy: RoutingStrategy::Priority,
            steps: vec![step("s1", true), step("s2", false)],
            enabled: true,
            tags: vec![],
            quality_gate: None,
            budget_usd_per_day: None,
            created_at: chrono::Utc::now(),
            updated_at: chrono::Utc::now(),
        };
        assert_eq!(c.enabled_step_count(), 1);
        assert!(c.is_routable());
    }

    #[test]
    fn disabled_combo_not_routable() {
        let c = Combo {
            id: "c1".into(),
            name: "c".into(),
            description: None,
            logical_model: "gpt-4o".into(),
            strategy: RoutingStrategy::Priority,
            steps: vec![step("s1", true)],
            enabled: false,
            tags: vec![],
            quality_gate: None,
            budget_usd_per_day: None,
            created_at: chrono::Utc::now(),
            updated_at: chrono::Utc::now(),
        };
        assert!(!c.is_routable());
    }
}
