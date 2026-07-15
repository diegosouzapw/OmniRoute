//! System metrics collection module.
//!
//! Provides a unified [`MetricsCollector`] that periodically collects CPU,
//! memory, disk, network, process, and GPU (optional) metrics and computes
//! a composite health score.

pub mod composite;
pub mod cpu;
pub mod disk;
pub mod gpu;
pub mod memory;
pub mod network;
pub mod process;

use std::time::{Duration, Instant};

use tracing::{debug, info, warn};

use crate::health::types::{
    CpuMetrics, DiskMetrics, GpuMetrics, LoadMetrics, MemoryMetrics, NetworkMetrics,
    ProcessMetrics, SystemLoadMetrics,
};

/// A collector for system metrics.
///
/// Manages periodic collection of all system metrics and maintains
/// the previous snapshots needed for computing rates (disk, network).
pub struct MetricsCollector {
    /// Shared sysinfo System handle (lazy-refreshed).
    system: sysinfo::System,
    /// Previous disk I/O snapshot for rate computation.
    prev_disk: disk::DiskSnapshot,
    /// Previous network I/O snapshots for rate computation.
    prev_network: Vec<network::NetworkInterfaceSnapshot>,
    /// Previous diskstat entries for /proc/diskstats rate computation.
    #[cfg(target_os = "linux")]
    prev_diskstat: Vec<disk::DiskStatEntry>,
    /// Previous utime+stime for process CPU percent computation.
    #[cfg(target_os = "linux")]
    prev_utime_stime: u64,
    /// Timestamp of last collection.
    last_collection: Option<Instant>,
    /// Whether the collector has been initialized (at least one successful collection).
    initialized: bool,
    /// Number of logical CPUs (cached).
    num_cpus: u32,
    /// Hostname (cached).
    hostname: String,
    /// Agent version string.
    agent_version: String,
    /// Metrics collection interval.
    interval: Duration,
    /// Whether per-process metrics collection is enabled.
    process_enabled: bool,
    /// Last collected snapshot cache (for health endpoint reads).
    last_snapshot: Option<SystemLoadMetrics>,
}

impl MetricsCollector {
    /// Create a new `MetricsCollector`.
    ///
    /// # Errors
    ///
    /// Returns an error if system information cannot be accessed.
    pub fn new(
        interval: Duration,
        process_enabled: bool,
    ) -> Result<Self, String> {
        let mut system = sysinfo::System::new_with_specifics(
            sysinfo::RefreshKind::everything(),
        );

        // Initial refresh to populate hostname, CPU count etc.
        system.refresh_memory();
        system.refresh_cpu();

        let hostname = sysinfo::System::host_name()
            .unwrap_or_else(|| "unknown".to_string());
        let num_cpus = system.cpus().len().max(1) as u32;

        let agent_version = format!(
            "{}-{}",
            env!("CARGO_PKG_VERSION"),
            option_env!("BUILD_SHA").unwrap_or("dev")
        );

        Ok(Self {
            system,
            prev_disk: disk::DiskSnapshot::default(),
            prev_network: Vec::new(),
            #[cfg(target_os = "linux")]
            prev_diskstat: Vec::new(),
            #[cfg(target_os = "linux")]
            prev_utime_stime: 0,
            last_collection: None,
            initialized: false,
            num_cpus,
            hostname,
            agent_version,
            interval,
            process_enabled,
            last_snapshot: None,
        })
    }

    /// Returns whether the collector has completed at least one successful
    /// collection cycle.
    pub fn is_initialized(&self) -> bool {
        self.initialized
    }

    /// Returns a reference to the last collected snapshot, if available.
    pub fn get_last_snapshot(&self) -> Option<&SystemLoadMetrics> {
        self.last_snapshot.as_ref()
    }

    /// Perform a full metrics collection cycle and return a snapshot.
    ///
    /// # Errors
    ///
    /// Returns an error if any critical subsystem fails. Individual subsystems
    /// (disk, network, process, GPU) that fail will return `None` for their
    /// respective fields rather than failing the entire collection.
    pub fn snapshot(&mut self) -> Result<SystemLoadMetrics, String> {
        let now = Instant::now();
        let interval_secs = self
            .last_collection
            .map(|t| now.duration_since(t).as_secs_f64())
            .unwrap_or(self.interval.as_secs_f64());
        self.last_collection = Some(now);

        let now_millis = chrono::Utc::now().timestamp_millis();

        // Refresh all metrics on the shared system handle.
        self.system.refresh_cpu();
        self.system.refresh_memory();

        // --- CPU ---
        let cpu_metrics = match cpu::collect(&self.system) {
            Ok((percent, per_core, count)) => {
                debug!(percent, count, "CPU metrics collected");
                CpuMetrics {
                    percent,
                    per_core,
                    count,
                }
            }
            Err(e) => {
                warn!(error = %e, "failed to collect CPU metrics, using fallback");
                CpuMetrics {
                    percent: 0.0,
                    per_core: vec![0.0; self.num_cpus as usize],
                    count: self.num_cpus,
                }
            }
        };

        // --- Memory ---
        let memory_metrics = match memory::collect(&self.system) {
            Ok((total, used, percent, swap_total, swap_used)) => {
                debug!(percent, "memory metrics collected");
                MemoryMetrics {
                    total_bytes: total,
                    used_bytes: used,
                    percent,
                    swap_total,
                    swap_used,
                }
            }
            Err(e) => {
                warn!(error = %e, "failed to collect memory metrics, using fallback");
                MemoryMetrics {
                    total_bytes: 0,
                    used_bytes: 0,
                    percent: 0.0,
                    swap_total: 0,
                    swap_used: 0,
                }
            }
        };

        // --- Load ---
        let load_metrics = {
            let load = sysinfo::System::load_average();
            LoadMetrics {
                one_min: load.one,
                five_min: load.five,
                fifteen_min: load.fifteen,
            }
        };

        // --- Disk ---
        let disk_metrics = match disk::collect() {
            Ok((curr_snapshot, active_disks)) => {
                let (read_ps, write_ps, io_util, queue_depth) = disk::compute_rates(
                    &self.prev_disk,
                    &curr_snapshot,
                    interval_secs,
                    active_disks,
                );

                // Also try /proc/diskstats on Linux for more accurate metrics.
                #[cfg(target_os = "linux")]
                let (proc_read_ps, proc_write_ps, proc_util, proc_qd) = {
                    match disk::read_proc_diskstats() {
                        Ok(curr_diskstat) => {
                            let result = disk::compute_rates_from_procfs(
                                &self.prev_diskstat,
                                &curr_diskstat,
                                interval_secs,
                                self.num_cpus,
                            );
                            self.prev_diskstat = curr_diskstat;
                            result
                        }
                        Err(e) => {
                            debug!(error = %e, "procfs diskstats not available");
                            (0, 0, 0.0, 0)
                        }
                    }
                };

                // Prefer procfs values when available, fall back to sysinfo.
                #[cfg(target_os = "linux")]
                let (final_read, final_write, final_util, final_qd) = {
                    let r = if proc_read_ps > 0 { proc_read_ps } else { read_ps };
                    let w = if proc_write_ps > 0 { proc_write_ps } else { write_ps };
                    let u = if proc_util > 0.0 { proc_util } else { io_util };
                    let q = if proc_qd > 0 { proc_qd } else { queue_depth };
                    (r, w, u, q)
                };

                #[cfg(not(target_os = "linux"))]
                let (final_read, final_write, final_util, final_qd) =
                    (read_ps, write_ps, io_util, queue_depth);

                self.prev_disk = curr_snapshot;

                debug!(read = final_read, write = final_write, "disk metrics collected");
                Some(DiskMetrics {
                    read_bytes_per_sec: final_read,
                    write_bytes_per_sec: final_write,
                    io_util_percent: final_util,
                    queue_depth: final_qd,
                })
            }
            Err(e) => {
                debug!(error = %e, "disk metrics not available");
                None
            }
        };

        // --- Network ---
        let network_metrics = match network::collect() {
            Ok(curr_network) => {
                let (b_in, b_out, p_in, p_out, e) = network::compute_rates(
                    &self.prev_network,
                    &curr_network,
                    interval_secs,
                );
                self.prev_network = curr_network;
                debug!(bytes_in = b_in, bytes_out = b_out, "network metrics collected");
                Some(NetworkMetrics {
                    bytes_in_per_sec: b_in,
                    bytes_out_per_sec: b_out,
                    packets_in_per_sec: p_in,
                    packets_out_per_sec: p_out,
                    errors_per_sec: e,
                })
            }
            Err(e) => {
                debug!(error = %e, "network metrics not available");
                None
            }
        };

        // --- Process ---
        let process_metrics = if self.process_enabled {
            #[cfg(target_os = "linux")]
            {
                match process::collect_with_delta(self.prev_utime_stime, interval_secs) {
                    Ok((stats, cur_utime_stime)) => {
                        self.prev_utime_stime = cur_utime_stime;
                        Some(ProcessMetrics {
                            pid: stats.pid,
                            cpu_percent: stats.cpu_percent,
                            memory_rss_bytes: stats.memory_rss_bytes,
                            open_fds: stats.open_fds,
                            thread_count: stats.thread_count,
                        })
                    }
                    Err(e) => {
                        debug!(error = %e, "process metrics not available");
                        None
                    }
                }
            }
            #[cfg(not(target_os = "linux"))]
            {
                match process::collect() {
                    Ok(stats) => Some(ProcessMetrics {
                        pid: stats.pid,
                        cpu_percent: stats.cpu_percent,
                        memory_rss_bytes: stats.memory_rss_bytes,
                        open_fds: stats.open_fds,
                        thread_count: stats.thread_count,
                    }),
                    Err(e) => {
                        debug!(error = %e, "process metrics not available");
                        None
                    }
                }
            }
        } else {
            None
        };

        // --- GPU ---
        let gpu_metrics = match gpu::collect() {
            Ok(Some(gpu)) => {
                debug!(
                    util = gpu.util_percent,
                    temp = gpu.temperature_celsius,
                    "GPU metrics collected"
                );
                Some(gpu)
            }
            Ok(None) => None,
            Err(e) => {
                warn!(error = %e, "failed to collect GPU metrics");
                None
            }
        };

        // --- Composite Score Computation ---
        let snapshot = SystemLoadMetrics {
            timestamp: now_millis,
            hostname: self.hostname.clone(),
            agent_version: self.agent_version.clone(),
            cpu: cpu_metrics,
            memory: memory_metrics,
            load: load_metrics,
            disk: disk_metrics,
            network: network_metrics,
            process: process_metrics,
            gpu: gpu_metrics,
            composite_score: 0.0, // computed below
        };

        let components = composite::compute_components(&snapshot);
        let score = composite::compute_score(&components);

        let mut final_snapshot = snapshot;
        final_snapshot.composite_score = score;

        // Cache the snapshot for health endpoint reads.
        self.last_snapshot = Some(final_snapshot.clone());

        if !self.initialized {
            info!(score, "first metrics snapshot collected");
            self.initialized = true;
        }

        debug!(score, "composite health score computed");

        Ok(final_snapshot)
    }

    /// Get the metrics collection interval.
    pub fn interval(&self) -> Duration {
        self.interval
    }

    /// Get the cached hostname.
    pub fn hostname(&self) -> &str {
        &self.hostname
    }
}
