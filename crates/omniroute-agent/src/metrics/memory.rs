//! Memory metrics collection using sysinfo.
//!
//! Provides total and used RAM bytes, memory usage percentage,
//! and total and used swap.

use tracing::warn;

/// Collect memory and swap metrics.
///
/// Returns `(total_bytes, used_bytes, percent, swap_total, swap_used)`.
///
/// # Errors
///
/// Returns an error string if total memory is reported as zero (unlikely on
/// real hardware).
pub fn collect(
    system: &sysinfo::System,
) -> Result<(u64, u64, f64, u64, u64), String> {
    let total = system.total_memory();
    if total == 0 {
        warn!("total memory reported as 0");
        return Err("total memory reported as 0".to_string());
    }

    let used = system.used_memory();
    let percent = (used as f64 / total as f64) * 100.0;

    let swap_total = system.total_swap();
    let swap_used = system.used_swap();

    Ok((total, used, percent, swap_total, swap_used))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_memory_collect_non_zero() {
        let system = sysinfo::System::new_with_specifics(
            sysinfo::RefreshKind::nothing().with_memory(),
        );
        let result = collect(&system);
        // On any real machine, total memory should be > 0.
        assert!(result.is_ok());
        let (_total, _used, percent, _swap_total, _swap_used) = result.unwrap();
        assert!(percent >= 0.0);
    }
}
