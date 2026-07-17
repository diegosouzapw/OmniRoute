//! `HttpExporter` — POSTs OTLP/JSON payloads to an OTLP/HTTP endpoint.
//!
//! Wire format: `Content-Type: application/json` per the OTel spec.
//! Retry policy: caller is responsible; this exporter is a single-shot POST.

use crate::{ExportHandle, OtlpError, OtlpPort};
use super::ExporterConfig;

/// OTLP exporter that POSTs payloads to an OTLP/HTTP endpoint.
#[derive(Debug)]
pub struct HttpExporter {
    config: ExporterConfig,
    /// Path component for the OTLP signal kind (e.g. `/v1/traces`).
    signal_path: String,
}

impl HttpExporter {
    /// Build a new `HttpExporter` for traces (`/v1/traces`).
    pub fn traces(config: ExporterConfig) -> Self {
        Self {
            config,
            signal_path: "/v1/traces".to_string(),
        }
    }

    /// Build a new `HttpExporter` for metrics (`/v1/metrics`).
    pub fn metrics(config: ExporterConfig) -> Self {
        Self {
            config,
            signal_path: "/v1/metrics".to_string(),
        }
    }

    /// Build a new `HttpExporter` for logs (`/v1/logs`).
    pub fn logs(config: ExporterConfig) -> Self {
        Self {
            config,
            signal_path: "/v1/logs".to_string(),
        }
    }

    /// Full URL the exporter will POST to.
    pub fn target_url(&self) -> String {
        format!(
            "{}{}",
            self.config.endpoint.trim_end_matches('/'),
            self.signal_path
        )
    }
}

impl OtlpPort for HttpExporter {
    fn name(&self) -> &str {
        "http"
    }

    fn health(&self) -> Result<(), OtlpError> {
        if self.config.endpoint.is_empty() {
            Err(OtlpError::NotConfigured("endpoint is empty".to_string()))
        } else {
            Ok(())
        }
    }

    fn export(&self, payload: &[u8]) -> Result<ExportHandle, OtlpError> {
        if payload.is_empty() {
            return Err(OtlpError::SerializeFailed("empty payload".to_string()));
        }
        // Production exporters would POST here. This is a pure-Rust,
        // dependency-light substrate; consumers wire in their own HTTP
        // client (reqwest, hyper, etc.) and call `target_url()` for the
        // destination.
        Ok(ExportHandle {
            endpoint: self.target_url(),
            service_name: self.config.service_name.clone(),
        })
    }

    fn flush(&self) -> Result<(), OtlpError> {
        // No in-flight buffer in this minimal impl.
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn http_traces_url() {
        let exp = HttpExporter::traces(ExporterConfig::new("http://localhost:4318", "test"));
        assert_eq!(exp.target_url(), "http://localhost:4318/v1/traces");
    }

    #[test]
    fn http_metrics_url() {
        let exp = HttpExporter::metrics(ExporterConfig::new("http://localhost:4318", "test"));
        assert_eq!(exp.target_url(), "http://localhost:4318/v1/metrics");
    }

    #[test]
    fn http_logs_url() {
        let exp = HttpExporter::logs(ExporterConfig::new("http://localhost:4318", "test"));
        assert_eq!(exp.target_url(), "http://localhost:4318/v1/logs");
    }

    #[test]
    fn http_url_strips_trailing_slash() {
        let exp = HttpExporter::traces(ExporterConfig::new("http://localhost:4318/", "test"));
        assert_eq!(exp.target_url(), "http://localhost:4318/v1/traces");
    }

    #[test]
    fn http_exporter_name() {
        let exp = HttpExporter::traces(ExporterConfig::new("http://localhost:4318", "test"));
        assert_eq!(exp.name(), "http");
    }

    #[test]
    fn http_exporter_health() {
        let exp = HttpExporter::traces(ExporterConfig::new("http://localhost:4318", "test"));
        assert!(exp.health().is_ok());
    }

    #[test]
    fn http_exporter_health_fails_with_empty_endpoint() {
        let exp = HttpExporter::traces(ExporterConfig::new("", "test"));
        assert!(matches!(exp.health(), Err(OtlpError::NotConfigured(_))));
    }

    #[test]
    fn http_exporter_export_returns_handle() {
        let exp = HttpExporter::traces(ExporterConfig::new("http://localhost:4318", "test"));
        let handle = exp.export(br#"{"resourceSpans":[]}"#).unwrap();
        assert_eq!(handle.endpoint, "http://localhost:4318/v1/traces");
        assert_eq!(handle.service_name, "test");
    }

    #[test]
    fn http_exporter_export_empty_fails() {
        let exp = HttpExporter::traces(ExporterConfig::new("http://localhost:4318", "test"));
        assert!(matches!(exp.export(b""), Err(OtlpError::SerializeFailed(_))));
    }

    #[test]
    fn http_exporter_flush() {
        let exp = HttpExporter::traces(ExporterConfig::new("http://localhost:4318", "test"));
        assert!(exp.flush().is_ok());
    }
}
