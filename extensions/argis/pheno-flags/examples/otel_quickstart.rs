//! pheno-flags + pheno-otel quickstart.
//!
//! Demonstrates:
//!   * Defining a typed `FlagSet` (CLI flags) with `pheno-flags`.
//!   * Initializing pheno-otel (stdout exporter) and wrapping `parse()` in a span.
//!   * Emitting a structured event for the resolved flag values.
//!
//! Run:
//! ```text
//! cargo run --example otel_quickstart -p pheno-flags -- --name koosha --verbose
//! ```

use pheno_flags::{Flag, FlagSet};
use pheno_otel::exporters::stdout::StdoutExporter;
use pheno_otel::trace::{emit, span};
use pheno_otel::ExporterConfig;
use serde_json::json;

fn main() {
    // 1. Install a stdout exporter.
    let exporter = StdoutExporter::new(ExporterConfig::default());

    // 2. Define a typed FlagSet.
    let flags = FlagSet::new("otel-quickstart")
        .flag(Flag::<String>::new("name", "koosha").short('n'))
        .flag(Flag::<bool>::new("verbose", false).short('v'));

    // 3. Wrap parsing in a span.
    let cx = span("pheno-flags.demo.parse", "otel-quickstart");
    emit("flags.start", &cx, json!({"bin": "otel-quickstart"}));

    let resolved = flags.parse_from(std::env::args());

    emit(
        "flags.parsed",
        &cx,
        json!({
            "name": resolved.get::<String>("name"),
            "verbose": resolved.get::<bool>("verbose"),
        }),
    );

    // 4. Print + flush.
    println!(
        "hello, {} (verbose={})",
        resolved.get::<String>("name"),
        resolved.get::<bool>("verbose")
    );

    let _ = exporter.export(b"pheno-flags quickstart flushed\n");
}