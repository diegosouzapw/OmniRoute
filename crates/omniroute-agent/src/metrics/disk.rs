//! Disk I/O metrics collection using sysinfo.
//!
//! Provides read/write bytes counters and attempts to derive utilization
//! and queue depth. In sysinfo 0.33+, `Disks` is a standalone type (not
//! accessed through `System`).

use tracing::warn;

/// Collect disk I/O metrics aggregated across all physical disks.
///
/// Creates and refreshes its own `Disks` instance (sysinfo 0.33+ API).
/// Returns `(current_snapshot, active_disk_count)` where `current_snapshot`
/// holds cumulative byte counters.
///
/// # Errors
///
/// Returns an error string if no disks are found.
pub fn collect() -> Result<(DiskSnapshot, u32), String> {
    let mut disks = sysinfo::Disks::new_with_refreshed_list();
    let disk_list = disks.list();
    if disk_list.is_empty() {
        warn!("no disks found");
        return Err("no disks found".to_string());
    }

    let mut total_read_bytes: u64 = 0;
    let mut total_written_bytes: u64 = 0;
    let mut active_disks: u32 = 0;

    for disk in disk_list {
        total_read_bytes = total_read_bytes.saturating_add(disk.usage().total_read_bytes);
        total_written_bytes = total_written_bytes.saturating_add(disk.usage().total_written_bytes);
        if disk.usage().total_read_bytes > 0 || disk.usage().total_written_bytes > 0 {
            active_disks += 1;
        }
    }

    let snapshot = DiskSnapshot {
        total_read_bytes,
        total_written_bytes,
    };

    Ok((snapshot, active_disks))
}

/// A snapshot of cumulative disk I/O counters.
#[derive(Debug, Clone, Copy, Default)]
pub struct DiskSnapshot {
    /// Cumulative read bytes.
    pub total_read_bytes: u64,
    /// Cumulative write bytes.
    pub total_written_bytes: u64,
}

/// Compute per-second rates from two snapshots and an interval.
///
/// Returns `(read_bytes_per_sec, write_bytes_per_sec, io_util_pct, queue_depth)`.
///
/// `io_util_pct` is an estimate: if any disk has non-zero I/O, we assume at
/// least some utilization. A more accurate measurement would require
/// /proc/diskstats parsing (see `compute_from_procfs`).
/// `queue_depth` is estimated from the number of active disks.
pub fn compute_rates(
    prev: &DiskSnapshot,
    curr: &DiskSnapshot,
    interval_secs: f64,
    active_disks: u32,
) -> (u64, u64, f64, u32) {
    if interval_secs <= 0.0 {
        return (0, 0, 0.0, 0);
    }

    let read_delta = curr.total_read_bytes.saturating_sub(prev.total_read_bytes);
    let write_delta = curr.total_written_bytes.saturating_sub(prev.total_written_bytes);
    let read_per_sec = (read_delta as f64 / interval_secs) as u64;
    let write_per_sec = (write_delta as f64 / interval_secs) as u64;

    // If any disk is active, estimate moderate utilization.
    // Without /proc/diskstats, this is a best-effort heuristic.
    let io_util = if active_disks > 0 {
        (active_disks as f64).min(100.0)
    } else {
        0.0
    };

    // Queue depth heuristic: fraction of disks with activity, scaled.
    let queue_depth = active_disks.min(16);

    (read_per_sec, write_per_sec, io_util, queue_depth)
}

/// Parse /proc/diskstats for precise I/O utilization and queue depth.
///
/// This is only available on Linux. On other platforms, returns `None`.
///
/// Returns `(read_bytes_per_sec_delta, write_bytes_per_sec_delta, io_time_ms, weighted_io_time_ms)`.
/// The caller must compute rates by dividing by the interval.
#[cfg(target_os = "linux")]
pub fn read_proc_diskstats() -> Result<Vec<DiskStatEntry>, String> {
    use std::fs::read_to_string;
    use std::path::Path;

    let content = read_to_string(Path::new("/proc/diskstats"))
        .map_err(|e| format!("failed to read /proc/diskstats: {e}"))?;

    let mut entries = Vec::new();

    for line in content.lines() {
        let parts: Vec<&str> = line.split_whitespace().collect();
        // Format: major minor name rio rmerge rsect ruse wio wmerge wsect wuse running use aveq
        // We need at least 14 fields.
        if parts.len() < 14 {
            continue;
        }

        let device_name = parts[2].to_string();

        // Only consider physical devices (sd*, nvme*, vd*, mmcblk*)
        let is_physical = device_name.starts_with("sd")
            || device_name.starts_with("nvme")
            || device_name.starts_with("vd")
            || device_name.starts_with("mmcblk");

        if !is_physical {
            continue;
        }

        // Parse numeric fields (1-indexed in /proc/diskstats):
        // 3: rio, 4: rmerge, 5: rsect, 6: ruse, 7: wio, 8: wmerge, 9: wsect, 10: wuse
        // 11: running, 12: use (io_time), 13: aveq (weighted_io_time)
        let parse_u64 = |idx: usize| -> Result<u64, String> {
            parts
                .get(idx)
                .and_then(|s| s.parse().ok())
                .ok_or_else(|| format!("failed to parse field {idx} in /proc/diskstats"))
        };

        let read_ops = parse_u64(3)?;
        let read_sectors = parse_u64(5)?;
        let write_ops = parse_u64(7)?;
        let write_sectors = parse_u64(9)?;
        let io_time_ms = parse_u64(12)?; // Field 12: "use" = milliseconds spent doing I/Os
        let weighted_io_time_ms = parse_u64(13)?; // Field 13: "aveq" = weighted I/O time

        // Convert sectors to bytes (1 sector = 512 bytes)
        let read_bytes = read_sectors.saturating_mul(512);
        let write_bytes = write_sectors.saturating_mul(512);

        entries.push(DiskStatEntry {
            device_name,
            read_bytes,
            write_bytes,
            read_ops,
            write_ops,
            io_time_ms,
            weighted_io_time_ms,
        });
    }

    if entries.is_empty() {
        return Err("no physical disk devices found in /proc/diskstats".to_string());
    }

    Ok(entries)
}

/// A single entry from /proc/diskstats.
#[derive(Debug, Clone)]
pub struct DiskStatEntry {
    /// Device name (e.g., sda, nvme0n1).
    pub device_name: String,
    /// Cumulative read bytes.
    pub read_bytes: u64,
    /// Cumulative write bytes.
    pub write_bytes: u64,
    /// Cumulative read operations.
    pub read_ops: u64,
    /// Cumulative write operations.
    pub write_ops: u64,
    /// Cumulative I/O time in milliseconds (field 12).
    pub io_time_ms: u64,
    /// Weighted I/O time in milliseconds (field 13).
    pub weighted_io_time_ms: u64,
}

/// Compute disk rates from two /proc/diskstats snapshots and an interval.
///
/// Aggregates across all devices. Returns
/// `(read_bytes_per_sec, write_bytes_per_sec, io_util_pct, weighted_avg_queue_depth)`.
#[cfg(target_os = "linux")]
pub fn compute_rates_from_procfs(
    prev: &[DiskStatEntry],
    curr: &[DiskStatEntry],
    interval_secs: f64,
    num_cpus: u32,
) -> (u64, u64, f64, u32) {
    if interval_secs <= 0.0 || prev.is_empty() || curr.is_empty() {
        return (0, 0, 0.0, 0);
    }

    // Build a map from device name for both snapshots.
    use std::collections::HashMap;
    let prev_map: HashMap<&str, &DiskStatEntry> =
        prev.iter().map(|e| (e.device_name.as_str(), e)).collect();
    let curr_map: HashMap<&str, &DiskStatEntry> =
        curr.iter().map(|e| (e.device_name.as_str(), e)).collect();

    let mut total_read_bytes: u64 = 0;
    let mut total_write_bytes: u64 = 0;
    let mut total_io_time_delta: u64 = 0;
    let mut total_weighted_io_time_delta: u64 = 0;
    let mut device_count: u32 = 0;

    for (name, curr_entry) in &curr_map {
        if let Some(prev_entry) = prev_map.get(name) {
            let read_delta = curr_entry.read_bytes.saturating_sub(prev_entry.read_bytes);
            let write_delta = curr_entry.write_bytes.saturating_sub(prev_entry.write_bytes);
            let io_time_delta = curr_entry.io_time_ms.saturating_sub(prev_entry.io_time_ms);
            let weighted_delta = curr_entry
                .weighted_io_time_ms
                .saturating_sub(prev_entry.weighted_io_time_ms);

            total_read_bytes = total_read_bytes.saturating_add(read_delta);
            total_write_bytes = total_write_bytes.saturating_add(write_delta);
            total_io_time_delta = total_io_time_delta.saturating_add(io_time_delta);
            total_weighted_io_time_delta =
                total_weighted_io_time_delta.saturating_add(weighted_delta);
            device_count += 1;
        }
    }

    let read_per_sec = if interval_secs > 0.0 {
        (total_read_bytes as f64 / interval_secs) as u64
    } else {
        0
    };

    let write_per_sec = if interval_secs > 0.0 {
        (total_write_bytes as f64 / interval_secs) as u64
    } else {
        0
    };

    // I/O utilization = io_time_delta / (interval_ms * device_count)
    // Clamped to [0.0, 100.0].
    let interval_ms = interval_secs * 1000.0;
    let io_util = if device_count > 0 && interval_ms > 0.0 {
        let util = (total_io_time_delta as f64) / (interval_ms * device_count as f64) * 100.0;
        util.clamp(0.0, 100.0)
    } else {
        0.0
    };

    // Average queue depth = weighted_io_time_delta / interval_ms / device_count
    let avg_queue_depth = if device_count > 0 && interval_ms > 0.0 {
        let qd = (total_weighted_io_time_delta as f64) / interval_ms / device_count as f64;
        (qd.round() as u32).min(1024)
    } else {
        0
    };

    (read_per_sec, write_per_sec, io_util, avg_queue_depth)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compute_rates_basic() {
        let prev = DiskSnapshot {
            total_read_bytes: 1000,
            total_written_bytes: 500,
        };
        let curr = DiskSnapshot {
            total_read_bytes: 2000,
            total_written_bytes: 1000,
        };
        let (r, w, util, qd) = compute_rates(&prev, &curr, 1.0, 2);
        assert_eq!(r, 1000);
        assert_eq!(w, 500);
        assert!(util > 0.0);
        assert_eq!(qd, 2);
    }

    #[test]
    fn test_compute_rates_zero_interval() {
        let prev = DiskSnapshot::default();
        let curr = DiskSnapshot::default();
        let (r, w, util, qd) = compute_rates(&prev, &curr, 0.0, 0);
        assert_eq!(r, 0);
        assert_eq!(w, 0);
        assert_eq!(util, 0.0);
        assert_eq!(qd, 0);
    }

    #[test]
    fn test_compute_rates_no_activity() {
        let prev = DiskSnapshot {
            total_read_bytes: 1000,
            total_written_bytes: 500,
        };
        let curr = DiskSnapshot {
            total_read_bytes: 1000,
            total_written_bytes: 500,
        };
        let (r, w, util, qd) = compute_rates(&prev, &curr, 1.0, 0);
        assert_eq!(r, 0);
        assert_eq!(w, 0);
        assert_eq!(util, 0.0);
        assert_eq!(qd, 0);
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn test_read_proc_diskstats_exists() {
        let result = read_proc_diskstats();
        // /proc/diskstats always exists on Linux. If it doesn't (e.g. container), skip.
        if let Ok(entries) = result {
            assert!(!entries.is_empty());
        }
    }
}
