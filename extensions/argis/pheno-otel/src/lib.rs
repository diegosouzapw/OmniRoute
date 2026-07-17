//! `pheno-otel` — OpenTelemetry OTLP exporter substrate for the pheno-* fleet.
//!
//! Per ADR-037, this crate is the canonical **OTLP wire-format export**
//! substrate. It exposes a `OtlpPort` trait (hexagonal Port side, per ADR-038)
//! and ships two concrete exporters in-tree: `StdoutExporter` (logs to
//! stderr/stdout for local dev) and `HttpExporter` (POSTs OTLP/JSON to an
//! OTLP/HTTP endpoint).
//!
//! Consumers depend on `pheno-otel` for consistent OTLP export, batch
//! processor behavior, and resource attribute propagation. This crate is
//! sibling to `pheno-tracing` (ADR-036) — `pheno-tracing` produces spans,
//! `pheno-otel` exports them.
//!
//! # When to use
//!
//! - You need to export traces/metrics/logs in OTLP wire format.
//! - You want a `Port` trait + `Adapter` impl shape per ADR-038.
//! - You want to plug a custom OTLP backend without changing consumer code.
//!
//! # When NOT to use
//!
//! - You only need in-process tracing → use `pheno-tracing`.
//! - You need Prometheus-format export → use `pheno-otel` + a Prometheus
//!   scrape target via the `HttpExporter` adapter.
//! - You need language-specific SDKs → use the `opentelemetry` crate family
//!   directly (this crate is a thin fleet-port wrapper, not a full SDK).

#![warn(missing_docs)]
#![deny(unsafe_code)]
#![deny(rust_2018_idioms)]

use thiserror::Error;

/// Error type for OTLP export operations.
#[derive(Debug, Error)]
pub enum OtlpError {
    /// Serialization of an OTLP payload failed.
    #[error("serialization failed: {0}")]
    SerializeFailed(String),
    /// The HTTP transport returned a non-2xx status.
    #[error("transport error: {0}")]
    Transport(String),
    /// The exporter was used before being configured.
    #[error("exporter not configured: {0}")]
    NotConfigured(String),
    /// A resource attribute or span attribute is invalid per OTel semconv.
    #[error("invalid attribute: {0}")]
    InvalidAttribute(String),
}

/// Opaque handle representing an active export pipeline.
#[derive(Debug, Clone)]
#[allow(dead_code)]
pub struct ExportHandle {
    /// Endpoint URL the exporter is bound to.
    pub endpoint: String,
    /// Service name (from OTel `service.name` resource attribute).
    pub service_name: String,
}

/// Trait for OTLP exporters (hexagonal Port side, per ADR-038).
///
/// Implementors are responsible for taking a serialized OTLP payload and
/// shipping it to the configured backend. The trait is sync; async
/// backends should buffer internally.
pub trait OtlpPort: Send + Sync {
    /// Stable, human-readable exporter name (e.g. `stdout`, `http`).
    fn name(&self) -> &str;

    /// Lightweight liveness check; returns `Ok(())` when the exporter
    /// is configured and reachable.
    fn health(&self) -> Result<(), OtlpError>;

    /// Export a single OTLP/JSON payload (traces, metrics, or logs).
    ///
    /// `payload` is the JSON-serialized OTLP request body per the
    /// OpenTelemetry protocol specification.
    fn export(&self, payload: &[u8]) -> Result<ExportHandle, OtlpError>;

    /// Flush any in-flight batched exports; blocks until drained.
    fn flush(&self) -> Result<(), OtlpError>;
}

/// Concrete OTLP exporters (Stdout, HTTP).
pub mod exporters;

/// Build an OTel `service.name`-flavored `ExportHandle` for tests.
pub fn test_handle(endpoint: &str) -> ExportHandle {
    ExportHandle {
        endpoint: endpoint.to_string(),
        service_name: "pheno-otel-tests".to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct MockExporter {
        name: String,
        endpoint: String,
        healthy: bool,
    }

    impl OtlpPort for MockExporter {
        fn name(&self) -> &str {
            &self.name
        }

        fn health(&self) -> Result<(), OtlpError> {
            if self.healthy {
                Ok(())
            } else {
                Err(OtlpError::NotConfigured(self.endpoint.clone()))
            }
        }

        fn export(&self, _payload: &[u8]) -> Result<ExportHandle, OtlpError> {
            if _payload.is_empty() {
                return Err(OtlpError::SerializeFailed("empty payload".to_string()));
            }
            Ok(ExportHandle {
                endpoint: self.endpoint.clone(),
                service_name: "pheno-otel-mock".to_string(),
            })
        }

        fn flush(&self) -> Result<(), OtlpError> {
            Ok(())
        }
    }

    #[test]
    fn export_returns_handle() {
        let exp = MockExporter {
            name: "mock".to_string(),
            endpoint: "http://localhost:4318".to_string(),
            healthy: true,
        };
        let payload = br#"{"resourceSpans":[]}"#;
        let handle = exp.export(payload).unwrap();
        assert_eq!(handle.endpoint, "http://localhost:4318");
    }

    #[test]
    fn export_empty_payload_fails() {
        let exp = MockExporter {
            name: "mock".to_string(),
            endpoint: "http://localhost:4318".to_string(),
            healthy: true,
        };
        let result = exp.export(b"");
        assert!(matches!(result, Err(OtlpError::SerializeFailed(_))));
    }

    #[test]
    fn health_check_passes() {
        let exp = MockExporter {
            name: "mock".to_string(),
            endpoint: "http://localhost:4318".to_string(),
            healthy: true,
        };
        assert!(exp.health().is_ok());
    }

    #[test]
    fn health_check_fails_when_unhealthy() {
        let exp = MockExporter {
            name: "mock".to_string(),
            endpoint: "http://localhost:4318".to_string(),
            healthy: false,
        };
        assert!(matches!(exp.health(), Err(OtlpError::NotConfigured(_))));
    }

    #[test]
    fn flush_returns_ok() {
        let exp = MockExporter {
            name: "mock".to_string(),
            endpoint: "http://localhost:4318".to_string(),
            healthy: true,
        };
        assert!(exp.flush().is_ok());
    }

    #[test]
    fn exporter_name_is_non_empty() {
        let exp = MockExporter {
            name: "mock-exporter".to_string(),
            endpoint: "http://localhost:4318".to_string(),
            healthy: true,
        };
        assert!(!exp.name().is_empty());
    }

    #[test]
    fn test_handle_builds() {
        let h = test_handle("http://localhost:4318");
        assert_eq!(h.endpoint, "http://localhost:4318");
        assert_eq!(h.service_name, "pheno-otel-tests");
    }
}
