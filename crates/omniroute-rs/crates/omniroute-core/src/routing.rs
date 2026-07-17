//! Routing strategies and step selection.

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum RoutingStrategy {
    /// Strict priority order (try step 1, then 2, etc.) — falls back on error.
    Priority,
    /// Round-robin across enabled steps.
    RoundRobin,
    /// Weighted random — weight from each ComboStep.
    Weighted,
    /// Cheapest step first, with a quality floor.
    Cheapest,
    /// Lowest-latency step first.
    LowestLatency,
    /// Highest quality (provider quality_tier) first.
    HighestQuality,
    /// Latency budget first; degrade to higher quality if not met.
    LatencyBudget,
    /// Custom (provider plugin decides).
    Custom,
}

impl Default for RoutingStrategy {
    fn default() -> Self { Self::Priority }
}

impl RoutingStrategy {
    /// Wire string.
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Priority => "priority",
            Self::RoundRobin => "round_robin",
            Self::Weighted => "weighted",
            Self::Cheapest => "cheapest",
            Self::LowestLatency => "lowest_latency",
            Self::HighestQuality => "highest_quality",
            Self::LatencyBudget => "latency_budget",
            Self::Custom => "custom",
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn strategy_roundtrip() {
        let s = RoutingStrategy::LatencyBudget;
        let v = serde_json::to_value(&s).unwrap();
        assert_eq!(v, "latency_budget");
        let back: RoutingStrategy = serde_json::from_value(v).unwrap();
        assert_eq!(back, s);
    }
}
