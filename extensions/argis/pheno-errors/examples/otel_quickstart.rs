//! pheno-errors + pheno-otel quickstart.
//!
//! Demonstrates:
//!   * `pheno_otel::exporters::stdout::StdoutExporter` (no network, prints OTLP-shaped JSON lines to stderr).
//!   * `pheno_otel::trace::span()` to wrap a unit of work in a span.
//!   * `pheno_otel::trace::emit()` to emit a structured event inside the span.
//!   * `pheno_errors::AppError` constructed with the `otel_cx` context attached for correlation.
//!
//! Run:
//! ```text
//! cargo run --example otel_quickstart -p pheno-errors
//! ```

use pheno_errors::{AppError, ErrorContext};
use pheno_otel::exporters::stdout::StdoutExporter;
use pheno_otel::trace::{emit, span};
use pheno_otel::{ExporterConfig, OtlpPort};
use serde_json::json;

fn main() -> Result<(), AppError> {
    // 1. Install a stdout exporter so spans/events are visible without an OTLP collector.
    let exporter = StdoutExporter::new(ExporterConfig::default());
    let cx = ErrorContext::new("quickstart");

    // 2. Wrap a unit of work in a span.
    let span_cx = span("pheno-errors.demo", &cx);

    // 3. Emit a structured event inside the span.
    emit(
        "demo.run",
        &span_cx,
        json!({
            "step": "start",
            "user_agent": "pheno-errors-example/0.1",
        }),
    );

    // 4. Do some real work and surface an error with context if it fails.
    let port: u16 = std::env::var("PORT")
        .unwrap_or_else(|_| "8080".to_string())
        .parse()
        .map_err(|e: std::num::ParseIntError| {
            AppError::from(e).with_context(ErrorContext::new("parse-port"))
        })?;

    emit(
        "demo.port.parsed",
        &span_cx,
        json!({ "port": port }),
    );

    // 5. Flush.
    let _ = exporter.export(b"pheno-errors quickstart flushed\n");

    Ok(())
}