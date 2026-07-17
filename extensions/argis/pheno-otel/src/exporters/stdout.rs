//! `StdoutExporter` — writes OTLP/JSON payloads to stderr.
//!
//! Useful for local dev, CI smoke tests, and dogfooding. **Not** for prod.

use crate::{ExportHandle, OtlpError, OtlpPort};
use super::ExporterConfig;

/// OTLP exporter that writes payloads to stderr.
#[derive(Debug)]
pub struct StdoutExporter {
    config: ExporterConfig,
}

impl StdoutExporter {
    /// Build a new `StdoutExporter` with the given config.
    pub fn new(config: ExporterConfig) -> Self {
        Self { config }
    }
}

impl OtlpPort for StdoutExporter {
    fn name(&self) -> &str {
        "stdout"
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
        eprintln!(
            "[pheno-otel/stdout] endpoint={} service={} bytes={}",
            self.config.endpoint,
            self.config.service_name,
            payload.len()
        );
        Ok(ExportHandle {
            endpoint: self.config.endpoint.clone(),
            service_name: self.config.service_name.clone(),
        })
    }

    fn flush(&self) -> Result<(), OtlpError> {
        // stderr is unbuffered; nothing to flush.
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn stdout_exporter_name() {
        let exp = StdoutExporter::new(ExporterConfig::new("http://localhost:4318", "test"));
        assert_eq!(exp.name(), "stdout");
    }

    #[test]
    fn stdout_exporter_health() {
        let exp = StdoutExporter::new(ExporterConfig::new("http://localhost:4318", "test"));
        assert!(exp.health().is_ok());
    }

    #[test]
    fn stdout_exporter_health_fails_with_empty_endpoint() {
        let exp = StdoutExporter::new(ExporterConfig::new("", "test"));
        assert!(matches!(exp.health(), Err(OtlpError::NotConfigured(_))));
    }

    #[test]
    fn stdout_exporter_export_returns_handle() {
        let exp = StdoutExporter::new(ExporterConfig::new("http://localhost:4318", "test"));
        let handle = exp.export(br#"{"resourceSpans":[]}"#).unwrap();
        assert_eq!(handle.endpoint, "http://localhost:4318");
        assert_eq!(handle.service_name, "test");
    }

    #[test]
    fn stdout_exporter_export_empty_fails() {
        let exp = StdoutExporter::new(ExporterConfig::new("http://localhost:4318", "test"));
        assert!(matches!(exp.export(b""), Err(OtlpError::SerializeFailed(_))));
    }

    #[test]
    fn stdout_exporter_flush() {
        let exp = StdoutExporter::new(ExporterConfig::new("http://localhost:4318", "test"));
        assert!(exp.flush().is_ok());
    }
}
