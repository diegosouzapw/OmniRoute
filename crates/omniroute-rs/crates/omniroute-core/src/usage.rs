//! Token usage and cost types.

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

/// Token usage.
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize, JsonSchema)]
pub struct Usage {
    /// Tokens in the prompt.
    pub prompt_tokens: u32,
    /// Tokens in the completion.
    pub completion_tokens: u32,
    /// Total tokens.
    pub total_tokens: u32,
    /// Optional: cached prompt tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cache_creation_input_tokens: Option<u32>,
    /// Optional: cached read tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cache_read_input_tokens: Option<u32>,
    /// Optional: reasoning tokens (o-series).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub reasoning_tokens: Option<u32>,
    /// Optional: detailed per-source counts.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub prompt_tokens_details: Option<PromptTokensDetails>,
    /// Optional: completion token details.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub completion_tokens_details: Option<CompletionTokensDetails>,
}

impl Usage {
    /// Create a usage struct with prompt + completion + total.
    pub fn new(prompt_tokens: u32, completion_tokens: u32) -> Self {
        Self {
            prompt_tokens,
            completion_tokens,
            total_tokens: prompt_tokens + completion_tokens,
            cache_creation_input_tokens: None,
            cache_read_input_tokens: None,
            reasoning_tokens: None,
            prompt_tokens_details: None,
            completion_tokens_details: None,
        }
    }
}

/// Detailed prompt token breakdown.
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize, JsonSchema)]
pub struct PromptTokensDetails {
    /// Cached prompt tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cached_tokens: Option<u32>,
    /// Audio input tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub audio_tokens: Option<u32>,
}

/// Detailed completion token breakdown.
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize, JsonSchema)]
pub struct CompletionTokensDetails {
    /// Reasoning tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub reasoning_tokens: Option<u32>,
    /// Audio output tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub audio_tokens: Option<u32>,
    /// Accepted prediction tokens (speculative decoding).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub accepted_prediction_tokens: Option<u32>,
    /// Rejected prediction tokens.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub rejected_prediction_tokens: Option<u32>,
}

/// Cost estimate in USD, broken down.
#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize, JsonSchema)]
pub struct CostBreakdown {
    /// Input cost in USD.
    pub input_cost_usd: f64,
    /// Output cost in USD.
    pub output_cost_usd: f64,
    /// Cached read cost in USD (negative savings on some providers).
    pub cache_read_cost_usd: f64,
    /// Cache write cost in USD.
    pub cache_write_cost_usd: f64,
    /// Total cost in USD.
    pub total_cost_usd: f64,
    /// Currency code.
    pub currency: String,
    /// Source (e.g. "litellm", "manual").
    pub source: String,
}

impl CostBreakdown {
    /// Round all costs to 9 decimal places (microunits).
    pub fn normalized(mut self) -> Self {
        let round = |v: &mut f64| { *v = (*v * 1e9).round() / 1e9; };
        round(&mut self.input_cost_usd);
        round(&mut self.output_cost_usd);
        round(&mut self.cache_read_cost_usd);
        round(&mut self.cache_write_cost_usd);
        round(&mut self.total_cost_usd);
        self
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn usage_new() {
        let u = Usage::new(10, 20);
        assert_eq!(u.prompt_tokens, 10);
        assert_eq!(u.completion_tokens, 20);
        assert_eq!(u.total_tokens, 30);
    }

    #[test]
    fn cost_normalized() {
        let c = CostBreakdown {
            input_cost_usd: 0.0000001234_f64,
            output_cost_usd: 0.0000005678_f64,
            cache_read_cost_usd: 0.0,
            cache_write_cost_usd: 0.0,
            total_cost_usd: 0.0000006912_f64,
            currency: "USD".into(),
            source: "test".into(),
        };
        let n = c.normalized();
        assert_eq!(n.input_cost_usd, 0.000000123);
    }
}
