//! OmniRoute Node Health Agent
//!
//! A standalone binary that collects system metrics (CPU, memory, disk, network,
//! process, GPU), computes a composite health score, and exposes them via an
//! HTTP API (liveness, readiness, system-load, health-score, and Prometheus
//! `/metrics`). Designed for fleet-wide distributed deployment.
//!
//! ## Usage
//!
//! ```text
//! omniroute-agent [OPTIONS]
//!
//! Options:
//!   -p, --port <PORT>            HTTP server port [default: 9600]
//!   -i, --interval <MS>          Metrics collection interval in ms [default: 5000]
//!   -H, --host <HOST>            Bind address [default: 0.0.0.0]
//!   -l, --log-level <LEVEL>      Log level [default: info]
//!       --enable-gpu             Enable GPU metrics collection (requires nvidia-ml)
//!       --no-process             Disable per-process metrics collection
//!   -h, --help                   Print help
//!   -V, --version                Print version
//! ```

#![forbid(unsafe_code)]
#![deny(clippy::correctness, clippy::suspicious)]
#![warn(clippy::pedantic)]
#![allow(
    clippy::module_name_repetitions,
    clippy::must_use_candidate,
    clippy::missing_errors_doc,
    clippy::missing_panics_doc,
)]

use std::sync::Arc;
use std::time::Duration;

use clap::Parser;
use tokio::signal;
use tracing::{error, info, warn};

use omniroute_agent::metrics::MetricsCollector;

/// CLI arguments for the OmniRoute node health agent.
#[derive(Debug, Parser)]
#[command(name = "omniroute-agent", version, about = "OmniRoute node health agent")]
struct Args {
    /// HTTP server port.
    #[arg(short = 'p', long, default_value = "9600")]
    port: u16,

    /// Metrics collection interval in milliseconds.
    #[arg(short = 'i', long, default_value = "5000")]
    interval: u64,

    /// Bind address.
    #[arg(short = 'H', long, default_value = "0.0.0.0")]
    host: String,

    /// Log level (trace, debug, info, warn, error).
    #[arg(short = 'l', long, default_value = "info")]
    log_level: String,

    /// Enable GPU metrics collection (requires nvidia-ml).
    #[arg(long)]
    enable_gpu: bool,

    /// Disable per-process metrics collection.
    #[arg(long)]
    no_process: bool,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let args = Args::parse();

    // Initialize tracing subscriber.
    tracing_subscriber::fmt()
        .with_env_filter(&args.log_level)
        .with_target(true)
        .with_thread_ids(false)
        .with_file(false)
        .with_line_number(false)
        .init();

    info!(
        port = args.port,
        interval_ms = args.interval,
        host = %args.host,
        gpu = args.enable_gpu,
        process = !args.no_process,
        "OmniRoute health agent starting"
    );

    if cfg!(not(feature = "gpu")) && args.enable_gpu {
        warn!("GPU metrics requested but `gpu` feature is not enabled. Rebuild with `--features gpu`.");
    }

    // Initialize Prometheus metrics.
    omniroute_agent::prometheus::init();
    info!("Prometheus metrics registered");

    // Create metrics collector.
    let interval = Duration::from_millis(args.interval);
    let process_enabled = !args.no_process;

    let collector = Arc::new(tokio::sync::Mutex::new(
        MetricsCollector::new(interval, process_enabled)
            .map_err(|e| anyhow::anyhow!("failed to create metrics collector: {e}"))?,
    ));

    // Spawn background metrics collection task.
    let collector_clone = Arc::clone(&collector);
    let collect_handle = tokio::spawn(async move {
        background_collection_loop(collector_clone, interval).await;
    });

    // Build router.
    let app = omniroute_agent::build_router(Arc::clone(&collector));

    // Bind and serve.
    let addr = format!("{}:{}", args.host, args.port);
    let listener = tokio::net::TcpListener::bind(&addr).await.map_err(|e| {
        anyhow::anyhow!("failed to bind to {addr}: {e}")
    })?;

    info!(addr = %addr, "HTTP server listening");

    // Run server with graceful shutdown.
    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .map_err(|e| anyhow::anyhow!("server error: {e}"))?;

    // Wait for background task to finish.
    collect_handle.await.ok();

    info!("OmniRoute health agent shut down");
    Ok(())
}

/// Background loop that periodically collects metrics and updates Prometheus.
async fn background_collection_loop(
    collector: Arc<tokio::sync::Mutex<MetricsCollector>>,
    interval: Duration,
) {
    let mut ticker = tokio::time::interval(interval);
    // Skip the first immediate tick so we don't collect before server is ready.
    ticker.tick().await;

    loop {
        ticker.tick().await;

        let snapshot = {
            let mut guard = collector.lock().await;
            match guard.snapshot() {
                Ok(s) => s,
                Err(e) => {
                    error!(error = %e, "failed to collect metrics");
                    continue;
                }
            }
        };

        omniroute_agent::prometheus::update(&snapshot);
    }
}

/// Wait for SIGTERM or SIGINT.
async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install SIGTERM handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {
            info!("Received SIGINT, shutting down");
        }
        _ = terminate => {
            info!("Received SIGTERM, shutting down");
        }
    }
}
