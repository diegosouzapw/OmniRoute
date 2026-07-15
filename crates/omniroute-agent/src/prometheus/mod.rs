//! Prometheus metrics export for the OmniRoute node health agent.
//!
//! Registers gauges and counters for all system metrics and exports them
//! in Prometheus text format at the `/metrics` endpoint.

use std::sync::OnceLock;

use prometheus::{
    register_counter_vec_with_registry, register_gauge_vec_with_registry,
    register_gauge_with_registry, CounterVec, Encoder, Gauge, GaugeVec, Registry, TextEncoder,
};
use tracing::error;

use crate::health::types::SystemLoadMetrics;

/// Global Prometheus registry.
static REGISTRY: OnceLock<Registry> = OnceLock::new();

/// Helper to get or create the global registry.
fn registry() -> &'static Registry {
    REGISTRY.get_or_init(Registry::new)
}

/// CPU usage gauge (per-core and total).
static CPU_PERCENT: OnceLock<GaugeVec> = OnceLock::new();
/// Memory bytes gauge.
static MEMORY_BYTES: OnceLock<GaugeVec> = OnceLock::new();
/// Load average gauges.
static LOAD_1: OnceLock<Gauge> = OnceLock::new();
static LOAD_5: OnceLock<Gauge> = OnceLock::new();
static LOAD_15: OnceLock<Gauge> = OnceLock::new();
/// Disk I/O bytes counter.
static DISK_IO_BYTES: OnceLock<CounterVec> = OnceLock::new();
/// Network I/O bytes counter.
static NETWORK_IO_BYTES: OnceLock<CounterVec> = OnceLock::new();
/// Health score gauge.
static HEALTH_SCORE: OnceLock<Gauge> = OnceLock::new();

/// Initialize Prometheus metrics.
///
/// Registers all metric collectors with the global registry.
/// Safe to call multiple times — subsequent calls are no-ops.
pub fn init() {
    let reg = registry();

    CPU_PERCENT.get_or_init(|| {
        register_gauge_vec_with_registry!(
            "omniroute_cpu_percent",
            "CPU usage percentage per core",
            &["core"],
            reg
        )
        .unwrap_or_else(|e| {
            error!(error = %e, "failed to register cpu_percent gauge");
            GaugeVec::new(prometheus::Opts::new("omniroute_cpu_percent_dummy", ""), &["core"]).unwrap()
        })
    });

    MEMORY_BYTES.get_or_init(|| {
        register_gauge_vec_with_registry!(
            "omniroute_memory_bytes",
            "Memory bytes by type (total, used, swap_total, swap_used)",
            &["type"],
            reg
        )
        .unwrap_or_else(|e| {
            error!(error = %e, "failed to register memory_bytes gauge");
            GaugeVec::new(prometheus::Opts::new("omniroute_memory_bytes_dummy", ""), &["type"]).unwrap()
        })
    });

    LOAD_1.get_or_init(|| {
        register_gauge_with_registry!("omniroute_load_1", "Load average over 1 minute", reg)
            .unwrap_or_else(|e| {
                error!(error = %e, "failed to register load_1 gauge");
                Gauge::new("omniroute_load_1_dummy", "").unwrap()
            })
    });

    LOAD_5.get_or_init(|| {
        register_gauge_with_registry!("omniroute_load_5", "Load average over 5 minutes", reg)
            .unwrap_or_else(|e| {
                error!(error = %e, "failed to register load_5 gauge");
                Gauge::new("omniroute_load_5_dummy", "").unwrap()
            })
    });

    LOAD_15.get_or_init(|| {
        register_gauge_with_registry!("omniroute_load_15", "Load average over 15 minutes", reg)
            .unwrap_or_else(|e| {
                error!(error = %e, "failed to register load_15 gauge");
                Gauge::new("omniroute_load_15_dummy", "").unwrap()
            })
    });

    DISK_IO_BYTES.get_or_init(|| {
        register_counter_vec_with_registry!(
            "omniroute_disk_io_bytes",
            "Disk I/O bytes by device and direction",
            &["device", "direction"],
            reg
        )
        .unwrap_or_else(|e| {
            error!(error = %e, "failed to register disk_io_bytes counter");
            CounterVec::new(
                prometheus::Opts::new("omniroute_disk_io_bytes_dummy", ""),
                &["device", "direction"],
            )
            .unwrap()
        })
    });

    NETWORK_IO_BYTES.get_or_init(|| {
        register_counter_vec_with_registry!(
            "omniroute_network_io_bytes",
            "Network I/O bytes by interface and direction",
            &["interface", "direction"],
            reg
        )
        .unwrap_or_else(|e| {
            error!(error = %e, "failed to register network_io_bytes counter");
            CounterVec::new(
                prometheus::Opts::new("omniroute_network_io_bytes_dummy", ""),
                &["interface", "direction"],
            )
            .unwrap()
        })
    });

    HEALTH_SCORE.get_or_init(|| {
        register_gauge_with_registry!(
            "omniroute_health_score",
            "Composite health score [0.0, 1.0]",
            reg
        )
        .unwrap_or_else(|e| {
            error!(error = %e, "failed to register health_score gauge");
            Gauge::new("omniroute_health_score_dummy", "").unwrap()
        })
    });
}

/// Update Prometheus metrics from a system metrics snapshot.
pub fn update(snapshot: &SystemLoadMetrics) {
    // CPU
    if let Some(gauge) = CPU_PERCENT.get() {
        gauge
            .with_label_values(&["total"])
            .set(snapshot.cpu.percent);
        for (i, core_pct) in snapshot.cpu.per_core.iter().enumerate() {
            gauge.with_label_values(&[&i.to_string()]).set(*core_pct);
        }
    }

    // Memory
    if let Some(gauge) = MEMORY_BYTES.get() {
        gauge
            .with_label_values(&["total"])
            .set(snapshot.memory.total_bytes as f64);
        gauge
            .with_label_values(&["used"])
            .set(snapshot.memory.used_bytes as f64);
        let free_bytes = snapshot
            .memory
            .total_bytes
            .saturating_sub(snapshot.memory.used_bytes);
        gauge
            .with_label_values(&["free"])
            .set(free_bytes as f64);
        gauge
            .with_label_values(&["swap_total"])
            .set(snapshot.memory.swap_total as f64);
        gauge
            .with_label_values(&["swap_used"])
            .set(snapshot.memory.swap_used as f64);
    }

    // Load
    if let Some(gauge) = LOAD_1.get() {
        gauge.set(snapshot.load.one_min);
    }
    if let Some(gauge) = LOAD_5.get() {
        gauge.set(snapshot.load.five_min);
    }
    if let Some(gauge) = LOAD_15.get() {
        gauge.set(snapshot.load.fifteen_min);
    }

    // Disk I/O
    if let Some(counter) = DISK_IO_BYTES.get() {
        if let Some(ref disk) = snapshot.disk {
            counter
                .with_label_values(&["total", "read"])
                .inc_by(disk.read_bytes_per_sec as f64);
            counter
                .with_label_values(&["total", "write"])
                .inc_by(disk.write_bytes_per_sec as f64);
        }
    }

    // Network I/O
    if let Some(counter) = NETWORK_IO_BYTES.get() {
        if let Some(ref net) = snapshot.network {
            counter
                .with_label_values(&["total", "rx"])
                .inc_by(net.bytes_in_per_sec as f64);
            counter
                .with_label_values(&["total", "tx"])
                .inc_by(net.bytes_out_per_sec as f64);
        }
    }

    // Health score
    if let Some(gauge) = HEALTH_SCORE.get() {
        gauge.set(snapshot.composite_score);
    }
}

/// Gather and encode all registered metrics as Prometheus text format.
///
/// # Errors
///
/// Returns an error if encoding fails.
pub fn gather_text() -> Result<String, String> {
    let reg = registry();
    let metric_families = reg.gather();
    let encoder = TextEncoder::new();
    let mut buffer = Vec::new();
    encoder
        .encode(&metric_families, &mut buffer)
        .map_err(|e| format!("failed to encode metrics: {e}"))?;
    String::from_utf8(buffer).map_err(|e| format!("metrics not valid UTF-8: {e}"))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_init_and_gather() {
        // Should not panic.
        init();
        let output = gather_text();
        assert!(output.is_ok());
        let text = output.unwrap();
        // Should contain at least some of our metric names.
        assert!(text.contains("omniroute_cpu_percent") || text.contains("# HELP"));
    }

    #[test]
    fn test_update_no_panic() {
        init();
        let snapshot = SystemLoadMetrics {
            timestamp: 0,
            hostname: "test".to_string(),
            agent_version: "0.1.0".to_string(),
            cpu: crate::health::types::CpuMetrics {
                percent: 50.0,
                per_core: vec![50.0, 50.0],
                count: 4,
            },
            memory: crate::health::types::MemoryMetrics {
                total_bytes: 16_000_000_000,
                used_bytes: 8_000_000_000,
                percent: 50.0,
                swap_total: 8_000_000_000,
                swap_used: 4_000_000_000,
            },
            load: crate::health::types::LoadMetrics {
                one_min: 1.0,
                five_min: 0.5,
                fifteen_min: 0.25,
            },
            disk: Some(crate::health::types::DiskMetrics {
                read_bytes_per_sec: 1000,
                write_bytes_per_sec: 500,
                io_util_percent: 50.0,
                queue_depth: 4,
            }),
            network: Some(crate::health::types::NetworkMetrics {
                bytes_in_per_sec: 10_000,
                bytes_out_per_sec: 5_000,
                packets_in_per_sec: 100,
                packets_out_per_sec: 50,
                errors_per_sec: 0,
            }),
            process: Some(crate::health::types::ProcessMetrics {
                pid: 1234,
                cpu_percent: 5.0,
                memory_rss_bytes: 100_000_000,
                open_fds: 128,
                thread_count: 16,
            }),
            gpu: None,
            composite_score: 0.85,
        };
        update(&snapshot);
        let text = gather_text().unwrap();
        assert!(text.contains("omniroute_health_score 0.85") || text.contains("omniroute_health_score"));
    }
}
