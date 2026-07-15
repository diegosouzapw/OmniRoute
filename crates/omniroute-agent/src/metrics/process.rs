//! Per-process metrics collection using procfs.
//!
//! Provides per-process statistics: CPU usage, RSS, file descriptors, and
//! thread count for the current process via `/proc/self/stat` and friends.
//!
//! On non-Linux platforms, falls back gracefully.

/// Statistics for the current process.
#[derive(Debug, Clone, Default)]
pub struct ProcessStats {
    /// Process ID.
    pub pid: u32,
    /// CPU usage percentage (as fraction of one core, 0.0–100.0).
    pub cpu_percent: f64,
    /// Resident set size in bytes.
    pub memory_rss_bytes: u64,
    /// Number of open file descriptors.
    pub open_fds: u32,
    /// Number of threads.
    pub thread_count: u32,
}

/// Collect per-process metrics for the current process.
///
/// On Linux, reads `/proc/self/stat` and `/proc/self/status`.
/// On other platforms, returns a best-effort snapshot from sysinfo
/// with fewer fields populated.
///
/// The `cpu_percent` computation requires two calls with a known interval
/// (the delta of utime+stime over the interval, divided by the interval
/// in ticks). Since most callers want a single-shot value, we return
/// 0.0 for CPU percent in single-shot mode. Use `collect_with_delta`
/// for proper CPU percent computation.
///
/// # Errors
///
/// Returns an error string if `/proc` is not accessible (non-Linux or container).
pub fn collect() -> Result<ProcessStats, String> {
    #[cfg(target_os = "linux")]
    {
        collect_linux_internal()
    }

    #[cfg(not(target_os = "linux"))]
    {
        collect_fallback()
    }
}

/// Collect per-process metrics with a previous snapshot for CPU percent computation.
///
/// `prev_utime_stime` is the sum of utime and stime (in clock ticks) from
/// a previous call. `interval_secs` is the wall-clock time between snapshots.
///
/// Returns the updated process stats and the current utime+stime for the next call.
///
/// # Errors
///
/// Returns an error string if `/proc` is not accessible.
#[cfg(target_os = "linux")]
pub fn collect_with_delta(
    prev_utime_stime: u64,
    interval_secs: f64,
) -> Result<(ProcessStats, u64), String> {
    use std::fs;

    let stat_content =
        fs::read_to_string("/proc/self/stat").map_err(|e| format!("failed to read /proc/self/stat: {e}"))?;
    let parts: Vec<&str> = stat_content.split_whitespace().collect();

    if parts.len() < 23 {
        return Err(format!(
            "unexpected /proc/self/stat format: {} fields",
            parts.len()
        ));
    }

    let pid: u32 = parts[0].parse().map_err(|e| format!("invalid pid: {e}"))?;
    let utime: u64 = parts[13].parse().map_err(|e| format!("invalid utime: {e}"))?;
    let stime: u64 = parts[14].parse().map_err(|e| format!("invalid stime: {e}"))?;
    let rss_pages: u64 = parts[23].parse().map_err(|e| format!("invalid rss: {e}"))?;
    let thread_count: u32 = parts[20].parse().map_err(|e| format!("invalid thread count: {e}"))?;

    // RSS in pages → bytes, assuming page size 4096.
    let rss_bytes = rss_pages.saturating_mul(4096);

    let cur_utime_stime = utime.saturating_add(stime);

    // CPU percent: (delta_ticks / interval_secs) / CLK_TCK * 100.0
    // CLK_TCK is typically 100 on Linux.
    let cpu_percent = if interval_secs > 0.0 {
        let delta = cur_utime_stime.saturating_sub(prev_utime_stime);
        let clk_tck: f64 = 100.0; // sysconf(_SC_CLK_TCK), typically 100
        (delta as f64 / interval_secs / clk_tck) * 100.0
    } else {
        0.0
    };

    // Open file descriptors: count entries in /proc/self/fd.
    let open_fds = match fs::read_dir("/proc/self/fd") {
        Ok(entries) => entries.count() as u32,
        Err(_) => 0,
    };

    Ok((
        ProcessStats {
            pid,
            cpu_percent,
            memory_rss_bytes: rss_bytes,
            open_fds,
            thread_count,
        },
        cur_utime_stime,
    ))
}

/// Internal: one-shot Linux collection (CPU percent = 0).
#[cfg(target_os = "linux")]
fn collect_linux_internal() -> Result<ProcessStats, String> {
    use std::fs;

    let stat_content =
        fs::read_to_string("/proc/self/stat").map_err(|e| format!("failed to read /proc/self/stat: {e}"))?;
    let parts: Vec<&str> = stat_content.split_whitespace().collect();

    if parts.len() < 24 {
        return Err(format!(
            "unexpected /proc/self/stat format: {} fields",
            parts.len()
        ));
    }

    let pid: u32 = parts[0].parse().map_err(|e| format!("invalid pid: {e}"))?;
    let rss_pages: u64 = parts[23].parse().map_err(|e| format!("invalid rss: {e}"))?;
    let thread_count: u32 = parts[20].parse().map_err(|e| format!("invalid thread count: {e}"))?;
    let rss_bytes = rss_pages.saturating_mul(4096);

    let open_fds = match fs::read_dir("/proc/self/fd") {
        Ok(entries) => entries.count() as u32,
        Err(_) => 0,
    };

    Ok(ProcessStats {
        pid,
        cpu_percent: 0.0,
        memory_rss_bytes: rss_bytes,
        open_fds,
        thread_count,
    })
}

/// Fallback for non-Linux platforms: use sysinfo for basic process info.
#[cfg(not(target_os = "linux"))]
fn collect_fallback() -> Result<ProcessStats, String> {
    // On non-Linux, we can attempt to get the current PID and basic info
    // from the OS. sysinfo's System::process() can help.
    let pid = std::process::id();
    Ok(ProcessStats {
        pid,
        cpu_percent: 0.0,
        memory_rss_bytes: 0,
        open_fds: 0,
        thread_count: 0,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_collect_basic() {
        let result = collect();
        // Should not crash on any platform.
        if let Ok(stats) = result {
            assert!(stats.pid > 0);
        }
    }

    #[cfg(target_os = "linux")]
    #[test]
    fn test_collect_with_delta_first_call() {
        let result = collect_with_delta(0, 1.0);
        assert!(result.is_ok());
        let (stats, cur) = result.unwrap();
        assert!(stats.pid > 0);
        assert!(cur > 0 || stats.thread_count > 0);
    }
}
