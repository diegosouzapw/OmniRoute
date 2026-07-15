//! Response types for health endpoints, matching the fleet DB schema.

use serde::Serialize;

/// Full system load metrics snapshot.
#[derive(Debug, Clone, Serialize)]
pub struct SystemLoadMetrics {
    /// Unix timestamp in milliseconds.
    pub timestamp: i64,
    /// Hostname of the machine.
    pub hostname: String,
    /// Agent version string.
    pub agent_version: String,
    /// CPU metrics.
    pub cpu: CpuMetrics,
    /// Memory metrics.
    pub memory: MemoryMetrics,
    /// Load average metrics.
    pub load: LoadMetrics,
    /// Disk I/O metrics, if available.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub disk: Option<DiskMetrics>,
    /// Network I/O metrics, if available.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub network: Option<NetworkMetrics>,
    /// Per-process metrics, if enabled.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub process: Option<ProcessMetrics>,
    /// GPU metrics, if available and feature is enabled.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub gpu: Option<GpuMetrics>,
    /// Composite health score [0.0, 1.0].
    pub composite_score: f64,
}

/// CPU metrics.
#[derive(Debug, Clone, Serialize)]
pub struct CpuMetrics {
    /// Total CPU usage percentage [0.0, 100.0].
    pub percent: f64,
    /// Per-core CPU usage percentages.
    pub per_core: Vec<f64>,
    /// Number of logical CPUs.
    pub count: u32,
}

/// Memory metrics.
#[derive(Debug, Clone, Serialize)]
pub struct MemoryMetrics {
    /// Total physical RAM in bytes.
    pub total_bytes: u64,
    /// Used physical RAM in bytes.
    pub used_bytes: u64,
    /// Memory usage percentage [0.0, 100.0].
    pub percent: f64,
    /// Total swap in bytes.
    pub swap_total: u64,
    /// Used swap in bytes.
    pub swap_used: u64,
}

/// Load average metrics.
#[derive(Debug, Clone, Serialize)]
pub struct LoadMetrics {
    /// Load average over 1 minute.
    pub one_min: f64,
    /// Load average over 5 minutes.
    pub five_min: f64,
    /// Load average over 15 minutes.
    pub fifteen_min: f64,
}

/// Disk I/O metrics.
#[derive(Debug, Clone, Serialize)]
pub struct DiskMetrics {
    /// Read bytes per second.
    pub read_bytes_per_sec: u64,
    /// Write bytes per second.
    pub write_bytes_per_sec: u64,
    /// I/O utilization percentage [0.0, 100.0].
    pub io_util_percent: f64,
    /// I/O queue depth.
    pub queue_depth: u32,
}

/// Network I/O metrics.
#[derive(Debug, Clone, Serialize)]
pub struct NetworkMetrics {
    /// Incoming bytes per second.
    pub bytes_in_per_sec: u64,
    /// Outgoing bytes per second.
    pub bytes_out_per_sec: u64,
    /// Incoming packets per second.
    pub packets_in_per_sec: u64,
    /// Outgoing packets per second.
    pub packets_out_per_sec: u64,
    /// Errors per second.
    pub errors_per_sec: u64,
}

/// Per-process metrics.
#[derive(Debug, Clone, Serialize)]
pub struct ProcessMetrics {
    /// Process ID.
    pub pid: u32,
    /// CPU usage percentage [0.0, 100.0].
    pub cpu_percent: f64,
    /// Resident set size in bytes.
    pub memory_rss_bytes: u64,
    /// Number of open file descriptors.
    pub open_fds: u32,
    /// Number of threads.
    pub thread_count: u32,
}

/// GPU metrics (feature-gated).
#[derive(Debug, Clone, Serialize)]
pub struct GpuMetrics {
    /// GPU utilization percentage [0.0, 100.0].
    pub util_percent: f64,
    /// Used GPU memory in bytes.
    pub memory_used_bytes: u64,
    /// Total GPU memory in bytes.
    pub memory_total_bytes: u64,
    /// GPU temperature in Celsius.
    pub temperature_celsius: f32,
}

/// Composite health score response.
#[derive(Debug, Clone, Serialize)]
pub struct HealthScoreResponse {
    /// Unix timestamp in milliseconds.
    pub timestamp: i64,
    /// Hostname of the machine.
    pub hostname: String,
    /// Composite health score [0.0, 1.0].
    pub score: f64,
    /// Individual component scores.
    pub components: HealthScoreComponents,
}

/// Individual pressure component scores.
#[derive(Debug, Clone, Serialize)]
pub struct HealthScoreComponents {
    /// CPU pressure component [0.0, 1.0].
    pub cpu: f64,
    /// Memory pressure component [0.0, 1.0].
    pub memory: f64,
    /// Load pressure component [0.0, 1.0].
    pub load: f64,
    /// I/O pressure component [0.0, 1.0].
    pub io: f64,
    /// Network pressure component [0.0, 1.0].
    pub network: f64,
    /// Process pressure component [0.0, 1.0].
    pub process: f64,
    /// GPU pressure component, if available.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub gpu: Option<f64>,
}

/// Simple liveness/readiness response.
#[derive(Debug, Clone, Serialize)]
pub struct StatusResponse {
    /// Status string, e.g. "ok".
    pub status: String,
}
