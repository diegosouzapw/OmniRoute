//! Compression types (RTK + Caveman).

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "lowercase")]
pub enum CompressionEngine {
    None,
    Rtk,
    Caveman,
    Zstd,
    Lz4,
    Brotli,
    Gzip,
}

impl Default for CompressionEngine { fn default() -> Self { Self::None } }

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct CompressionRule {
    pub id: String,
    pub name: String,
    pub engine: CompressionEngine,
    pub enabled: bool,
    pub pattern: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub model: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub cost_per_1k_usd: Option<f64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
pub struct CompressionResult {
    pub original_bytes: usize,
    pub compressed_bytes: usize,
    pub tokens_saved: u32,
    pub engine: CompressionEngine,
    pub latency_us: u64,
    pub changed: bool,
}

impl CompressionResult {
    pub fn ratio(&self) -> f64 {
        if self.original_bytes == 0 { 1.0 }
        else { self.compressed_bytes as f64 / self.original_bytes as f64 }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn ratio() {
        let r = CompressionResult {
            original_bytes: 1000,
            compressed_bytes: 500,
            tokens_saved: 250,
            engine: CompressionEngine::Rtk,
            latency_us: 100,
            changed: true,
        };
        assert!((r.ratio() - 0.5).abs() < 1e-9);
    }
}
