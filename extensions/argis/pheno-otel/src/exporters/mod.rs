//! Concrete OTLP exporter implementations.
//!
//! Two in-tree adapters per ADR-038:
//! - [`StdoutExporter`] — writes OTLP/JSON to stderr (local dev, smoke tests).
//! - [`HttpExporter`] — POSTs OTLP/JSON to an OTLP/HTTP endpoint.

pub mod http;
pub mod stdout;

/// Common configuration for any OTLP exporter.
#[derive(Debug, Clone)]
pub struct ExporterConfig {
    /// OTLP/HTTP endpoint URL (e.g. `http://localhost:4318`).
    pub endpoint: String,
    /// OTel `service.name` resource attribute.
    pub service_name: String,
    /// OTel `service.version` resource attribute.
    pub service_version: String,
}

impl ExporterConfig {
    /// Build a new config with the given endpoint and service name.
    pub fn new(endpoint: impl Into<String>, service_name: impl Into<String>) -> Self {
        Self {
            endpoint: endpoint.into(),
            service_name: service_name.into(),
            service_version: env!("CARGO_PKG_VERSION").to_string(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn config_new_sets_endpoint_and_service() {
        let c = ExporterConfig::new("http://localhost:4318", "pheno-otel");
        assert_eq!(c.endpoint, "http://localhost:4318");
        assert_eq!(c.service_name, "pheno-otel");
        assert!(!c.service_version.is_empty());
    }
}
