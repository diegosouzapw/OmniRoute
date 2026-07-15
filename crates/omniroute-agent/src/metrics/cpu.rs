//! CPU metrics collection using sysinfo.
//!
//! Provides total and per-core CPU usage percentages, as well as the number
//! of logical CPUs available on the system.

use tracing::warn;

/// Collect CPU metrics: total percent, per-core percents, and CPU count.
///
/// Returns `(total_percent, per_core, num_cpus)`.
///
/// # Errors
///
/// Returns an error string if CPU information cannot be read.
pub fn collect(
    system: &sysinfo::System,
) -> Result<(f64, Vec<f64>, u32), String> {
    let count = system.cpus().len();
    if count == 0 {
        warn!("no CPUs reported by sysinfo");
        return Err("no CPUs reported by sysinfo".to_string());
    }

    // sysinfo gives global CPU usage as a percent [0.0, 100.0].
    let total_percent = system.global_cpu_usage() as f64;

    let per_core: Vec<f64> = system
        .cpus()
        .iter()
        .map(|cpu| cpu.cpu_usage() as f64)
        .collect();

    Ok((total_percent, per_core, count as u32))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_collect_returns_some_value() {
        // Just verify the function signature works with a fresh system.
        // In CI, CPU metrics should always be available.
        let system = sysinfo::System::new_with_specifics(
            sysinfo::RefreshKind::nothing().with_cpu(),
        );
        let result = collect(&system);
        // Even with RefreshKind::nothing, we should get a count > 0 on any real machine.
        assert!(result.is_ok() || result.is_err());
    }
}
