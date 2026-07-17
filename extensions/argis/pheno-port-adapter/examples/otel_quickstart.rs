//! pheno-port-adapter + pheno-otel quickstart.
//!
//! Demonstrates:
//!   * `pheno_port_adapter::PortAdapter` trait (the L4 Port, per ADR-038).
//!   * `TcpAdapter` + `UnixAdapter` concrete Adapters from the in-tree `adapters` module.
//!   * Wrapping `connect()` in a pheno-otel span and emitting structured events.
//!
//! Run:
//! ```text
//! cargo run --example otel_quickstart -p pheno-port-adapter
//! ```

use pheno_otel::exporters::stdout::StdoutExporter;
use pheno_otel::trace::{emit, span};
use pheno_otel::ExporterConfig;
use pheno_port_adapter::adapters::{tcp::TcpAdapter, unix::UnixAdapter, MockAdapter};
use pheno_port_adapter::PortAdapter;
use serde_json::json;

fn main() {
    // 1. Install a stdout exporter.
    let exporter = StdoutExporter::new(ExporterConfig::default());

    // 2. Construct concrete adapters (TcpAdapter, UnixAdapter, MockAdapter).
    let tcp: Box<dyn PortAdapter<Error = std::io::Error>> = Box::new(TcpAdapter::new());
    let unix: Box<dyn PortAdapter<Error = std::io::Error>> = Box::new(UnixAdapter::new());
    let mock = MockAdapter::default();

    // 3. Wrap a simulated connect() call in a span.
    let cx = span("pheno-port-adapter.demo.connect", "otel-quickstart");
    emit(
        "adapter.instantiated",
        &cx,
        json!({"tcp": "ok", "unix": "ok", "mock": "ok"}),
    );

    // 4. Use mock adapter to demonstrate the connect surface without hitting the network.
    let handle = mock
        .connect("mock://localhost")
        .expect("mock connect should succeed");

    emit(
        "adapter.connected",
        &cx,
        json!({"handle_id": handle.id, "transport": handle.transport}),
    );

    // 5. Flush.
    let _ = exporter.export(b"pheno-port-adapter quickstart flushed\n");
    println!(
        "adapters constructed: tcp={}, unix={}, mock_id={}",
        tcp.kind(),
        unix.kind(),
        handle.id
    );
}