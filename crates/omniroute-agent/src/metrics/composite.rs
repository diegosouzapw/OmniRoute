//! Composite health score computation.
//!
//! Combines individual pressure metrics (CPU, memory, load, I/O, network,
//! process, GPU) into a single [0.0, 1.0] health score using weighted
//! summation. Higher scores are better (1.0 = perfect health).

use crate::health::types::{
    HealthScoreComponents, SystemLoadMetrics,
};

/// Compute all pressure components from a system metrics snapshot.
///
/// Each component is in [0.0, 1.0], where 0.0 = no pressure, 1.0 =
/// maximum pressure.
pub fn compute_components(snapshot: &SystemLoadMetrics) -> HealthScoreComponents {
    // --- CPU pressure: min(1.0, cpu_percent / 100.0) ---
    let cpu = (snapshot.cpu.percent / 100.0).clamp(0.0, 1.0);

    // --- Memory pressure: min(1.0, memory_used_percent / 100.0) ---
    let memory = (snapshot.memory.percent / 100.0).clamp(0.0, 1.0);

    // --- Load pressure: min(1.0, load_1min / num_cpus) ---
    let num_cpus = snapshot.cpu.count.max(1);
    let load = (snapshot.load.one_min / num_cpus as f64).clamp(0.0, 1.0);

    // --- I/O pressure: min(1.0, io_queue_depth / 16.0) ---
    // or min(1.0, io_util_percent / 100.0) if available
    let io = if let Some(ref disk) = snapshot.disk {
        let queue_pressure = (disk.queue_depth as f64 / 16.0).clamp(0.0, 1.0);
        let util_pressure = (disk.io_util_percent / 100.0).clamp(0.0, 1.0);
        // Use the higher of the two as the I/O pressure signal.
        queue_pressure.max(util_pressure)
    } else {
        0.0
    };

    // --- Network pressure: normalize to 5% bandwidth utilization ---
    // Formula: min(1.0, (bytes_in + bytes_out) / (bandwidth * 0.05))
    // We approximate bandwidth as 1 Gbps (125,000,000 bytes/sec) which is
    // a common baseline. In production, this should be configured per node.
    const ESTIMATED_BANDWIDTH_BYTES_PER_SEC: f64 = 125_000_000.0; // 1 Gbps
    let network = if let Some(ref net) = snapshot.network {
        let total = (net.bytes_in_per_sec as f64) + (net.bytes_out_per_sec as f64);
        let threshold = ESTIMATED_BANDWIDTH_BYTES_PER_SEC * 0.05;
        if threshold > 0.0 {
            (total / threshold).clamp(0.0, 1.0)
        } else {
            0.0
        }
    } else {
        0.0
    };

    // --- Process pressure: weighted combination ---
    // open_fds / max_fds * 0.8 + thread_count / max_threads * 0.2
    // Reasonable defaults: max_fds = 65536, max_threads = 32768
    const MAX_FDS: f64 = 65536.0;
    const MAX_THREADS: f64 = 32768.0;
    let process = if let Some(ref proc) = snapshot.process {
        let fd_pressure = (proc.open_fds as f64 / MAX_FDS).clamp(0.0, 1.0);
        let thread_pressure = (proc.thread_count as f64 / MAX_THREADS).clamp(0.0, 1.0);
        fd_pressure * 0.8 + thread_pressure * 0.2
    } else {
        0.0
    };

    // --- GPU pressure: min(1.0, util / 100 * 0.6 + mem% / 100 * 0.2) ---
    let gpu = snapshot.gpu.as_ref().map(|gpu| {
        let util_pressure = (gpu.util_percent / 100.0).clamp(0.0, 1.0);
        let mem_pressure = if gpu.memory_total_bytes > 0 {
            (gpu.memory_used_bytes as f64 / gpu.memory_total_bytes as f64).clamp(0.0, 1.0)
        } else {
            0.0
        };
        util_pressure * 0.6 + mem_pressure * 0.2
    });

    HealthScoreComponents {
        cpu,
        memory,
        load,
        io,
        network,
        process,
        gpu,
    }
}

/// Compute the composite health score from pre-computed components.
///
/// Formula:
/// ```text
/// score = 1.0
///   - 0.25 * cpu_pressure
///   - 0.20 * memory_pressure
///   - 0.15 * load_pressure
///   - 0.10 * io_pressure
///   - 0.10 * network_pressure
///   - 0.10 * process_pressure
///   - 0.10 * gpu_pressure (if GPU metrics available, else redistribute)
/// ```
///
/// If GPU pressure is not available, its weight is redistributed equally
/// among CPU, memory, and load (the three highest-weight components).
/// Returns a score in [0.0, 1.0].
pub fn compute_score(components: &HealthScoreComponents) -> f64 {
    let cpu_w = 0.25;
    let mem_w = 0.20;
    let load_w = 0.15;
    let io_w = 0.10;
    let net_w = 0.10;
    let proc_w = 0.10;
    let gpu_w = 0.10;

    let (gpu_pressure, actual_cpu_w, actual_mem_w, actual_load_w) = if let Some(gpu_val) = components.gpu {
        // GPU metrics available: use standard weights.
        (
            gpu_val,
            cpu_w,
            mem_w,
            load_w,
        )
    } else {
        // No GPU: redistribute 0.10 equally among cpu, memory, load.
        let extra = gpu_w / 3.0;
        (
            0.0,
            cpu_w + extra,
            mem_w + extra,
            load_w + extra,
        )
    };

    let score = 1.0
        - actual_cpu_w * components.cpu
        - actual_mem_w * components.memory
        - actual_load_w * components.load
        - io_w * components.io
        - net_w * components.network
        - proc_w * components.process
        - gpu_w * gpu_pressure;

    score.clamp(0.0, 1.0)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::health::types::*;

    fn zero_snapshot() -> SystemLoadMetrics {
        SystemLoadMetrics {
            timestamp: 0,
            hostname: "test".to_string(),
            agent_version: "0.1.0".to_string(),
            cpu: CpuMetrics {
                percent: 0.0,
                per_core: vec![0.0],
                count: 4,
            },
            memory: MemoryMetrics {
                total_bytes: 16_000_000_000,
                used_bytes: 0,
                percent: 0.0,
                swap_total: 0,
                swap_used: 0,
            },
            load: LoadMetrics {
                one_min: 0.0,
                five_min: 0.0,
                fifteen_min: 0.0,
            },
            disk: Some(DiskMetrics {
                read_bytes_per_sec: 0,
                write_bytes_per_sec: 0,
                io_util_percent: 0.0,
                queue_depth: 0,
            }),
            network: Some(NetworkMetrics {
                bytes_in_per_sec: 0,
                bytes_out_per_sec: 0,
                packets_in_per_sec: 0,
                packets_out_per_sec: 0,
                errors_per_sec: 0,
            }),
            process: Some(ProcessMetrics {
                pid: 1,
                cpu_percent: 0.0,
                memory_rss_bytes: 0,
                open_fds: 0,
                thread_count: 0,
            }),
            gpu: None,
            composite_score: 0.0,
        }
    }

    #[test]
    fn test_all_zero_pressure() {
        let snapshot = zero_snapshot();
        let components = compute_components(&snapshot);
        let score = compute_score(&components);

        // All pressure values are near 0 → score should be ~1.0.
        assert!((score - 1.0).abs() < 1e-10, "score = {score}, expected ~1.0");
    }

    #[test]
    fn test_all_max_pressure() {
        let snapshot = SystemLoadMetrics {
            cpu: CpuMetrics {
                percent: 100.0,
                per_core: vec![100.0; 4],
                count: 4,
            },
            memory: MemoryMetrics {
                total_bytes: 16_000_000_000,
                used_bytes: 16_000_000_000,
                percent: 100.0,
                swap_total: 8_000_000_000,
                swap_used: 8_000_000_000,
            },
            load: LoadMetrics {
                one_min: 8.0,  // 8 > 4 CPUs → 1.0 pressure
                five_min: 4.0,
                fifteen_min: 2.0,
            },
            disk: Some(DiskMetrics {
                read_bytes_per_sec: 1_000_000,
                write_bytes_per_sec: 500_000,
                io_util_percent: 100.0,
                queue_depth: 64,
            }),
            network: Some(NetworkMetrics {
                bytes_in_per_sec: 100_000_000,
                bytes_out_per_sec: 100_000_000,
                packets_in_per_sec: 1000,
                packets_out_per_sec: 500,
                errors_per_sec: 10,
            }),
            process: Some(ProcessMetrics {
                pid: 1,
                cpu_percent: 50.0,
                memory_rss_bytes: 1_000_000_000,
                open_fds: 65536,   // 65536/65536 = 1.0
                thread_count: 32768, // 32768/32768 = 1.0
            }),
            gpu: None,
            ..zero_snapshot()
        };

        let components = compute_components(&snapshot);
        let score = compute_score(&components);

        // With max pressure (no GPU), score should be:
        // 1.0 - (0.25+0.0333)*1.0 - (0.20+0.0333)*1.0 - (0.15+0.0333)*1.0
        //   - 0.10*1.0 - 0.10*1.0 - 0.10*1.0
        // = 1.0 - 0.2833 - 0.2333 - 0.1833 - 0.10 - 0.10 - 0.10
        // = 1.0 - 1.0 = 0.0
        assert!(
            (score - 0.0).abs() < 1e-10,
            "score = {score}, expected ~0.0"
        );
    }

    #[test]
    fn test_half_pressure_no_gpu() {
        let snapshot = SystemLoadMetrics {
            cpu: CpuMetrics {
                percent: 50.0,
                per_core: vec![50.0; 4],
                count: 4,
            },
            memory: MemoryMetrics {
                total_bytes: 16_000_000_000,
                used_bytes: 8_000_000_000,
                percent: 50.0,
                swap_total: 8_000_000_000,
                swap_used: 4_000_000_000,
            },
            load: LoadMetrics {
                one_min: 2.0,
                five_min: 1.0,
                fifteen_min: 0.5,
            },
            disk: Some(DiskMetrics {
                read_bytes_per_sec: 500_000,
                write_bytes_per_sec: 250_000,
                io_util_percent: 50.0,
                queue_depth: 8,
            }),
            network: Some(NetworkMetrics {
                bytes_in_per_sec: 3_125_000,
                bytes_out_per_sec: 3_125_000,
                packets_in_per_sec: 500,
                packets_out_per_sec: 250,
                errors_per_sec: 5,
            }),
            process: Some(ProcessMetrics {
                pid: 1,
                cpu_percent: 25.0,
                memory_rss_bytes: 500_000_000,
                open_fds: 32768,   // 0.5
                thread_count: 16384, // 0.5
            }),
            gpu: None,
            ..zero_snapshot()
        };

        let components = compute_components(&snapshot);
        let score = compute_score(&components);

        // With all pressures at 0.5:
        // cpu=0.5, mem=0.5, load=0.5 (2.0/4), io=max(8/16=0.5, 50/100=0.5)=0.5
        // network: (3125000+3125000)/(125000000*0.05)=0.5, process: 0.5*0.8+0.5*0.2=0.5
        // gpu: 0.0 (redistributed weights)
        // Redistributed: cpu_w = 0.25+0.03333 = 0.28333, mem_w = 0.20+0.03333 = 0.23333, load_w = 0.15+0.03333 = 0.18333
        // Score = 1.0 - 0.28333*0.5 - 0.23333*0.5 - 0.18333*0.5 - 0.10*0.5 - 0.10*0.5 - 0.10*0.5
        //        = 1.0 - 0.5*(0.28333+0.23333+0.18333+0.10+0.10+0.10)
        //        = 1.0 - 0.5*1.0 = 0.5
        assert!(
            (score - 0.5).abs() < 1e-6,
            "score = {score}, expected ~0.5"
        );
    }

    #[test]
    fn test_gpu_pressure_included() {
        let mut snapshot = zero_snapshot();
        snapshot.gpu = Some(GpuMetrics {
            util_percent: 100.0,
            memory_used_bytes: 8_000_000_000,
            memory_total_bytes: 16_000_000_000,
            temperature_celsius: 85.0,
        });

        let components = compute_components(&snapshot);
        let score = compute_score(&components);

        // GPU pressure = 1.0*0.6 + 0.5*0.2 = 0.6 + 0.1 = 0.7
        // Since all other pressures are 0, score = 1.0 - 0.10 * 0.7 = 0.93
        assert!(
            (score - 0.93).abs() < 1e-10,
            "score = {score}, expected ~0.93"
        );
    }

    #[test]
    fn test_missing_disk_network_process() {
        let snapshot = SystemLoadMetrics {
            disk: None,
            network: None,
            process: None,
            gpu: None,
            ..zero_snapshot()
        };

        let components = compute_components(&snapshot);
        let score = compute_score(&components);

        // Missing disk/network/process → defaults to 0 pressure for those.
        // With zero CPU/memory/load too → score = 1.0
        assert!(
            (score - 1.0).abs() < 1e-10,
            "score = {score}, expected ~1.0"
        );
    }

    #[test]
    fn test_disk_queue_depth_over_capacity() {
        let mut snapshot = zero_snapshot();
        snapshot.disk = Some(DiskMetrics {
            read_bytes_per_sec: 0,
            write_bytes_per_sec: 0,
            io_util_percent: 100.0,
            queue_depth: 1024,
        });

        let components = compute_components(&snapshot);
        // io = max(1024/16=1.0, 100/100=1.0) = 1.0
        assert!((components.io - 1.0).abs() < 1e-10);
    }

    #[test]
    fn test_load_pressure_over_capacity() {
        let mut snapshot = zero_snapshot();
        snapshot.load.one_min = 40.0; // 4 CPUs → min(1.0, 40/4) = 1.0

        let components = compute_components(&snapshot);
        assert!((components.load - 1.0).abs() < 1e-10);
    }

    #[test]
    fn test_network_zero_bandwidth() {
        // When network metrics have 0 bandwidth, pressure should be 0.
        let mut snapshot = zero_snapshot();
        snapshot.network = Some(NetworkMetrics {
            bytes_in_per_sec: 0,
            bytes_out_per_sec: 0,
            packets_in_per_sec: 0,
            packets_out_per_sec: 0,
            errors_per_sec: 0,
        });

        let components = compute_components(&snapshot);
        assert!(
            (components.network - 0.0).abs() < 1e-10
        );
    }
}
