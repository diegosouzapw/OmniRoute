//! Network I/O metrics collection using sysinfo.
//!
//! Provides cumulative bytes/packets counters per network interface.
//! The caller must track previous values and interval to compute rates.
//! In sysinfo 0.33+, `Networks` is a standalone type (not accessed through
//! `System`).

/// Collect a snapshot of cumulative network I/O counters from all interfaces.
///
/// Creates and refreshes its own `Networks` instance (sysinfo 0.33+ API).
/// Returns a list of `NetworkInterfaceSnapshot` entries, one per interface.
///
/// # Errors
///
/// Returns an error string if no network interfaces are found.
pub fn collect() -> Result<Vec<NetworkInterfaceSnapshot>, String> {
    let mut networks = sysinfo::Networks::new_with_refreshed_list();
    let interfaces = networks.list();
    if interfaces.is_empty() {
        return Err("no network interfaces found".to_string());
    }

    let mut snapshots = Vec::new();

    for (name, data) in interfaces.iter() {
        snapshots.push(NetworkInterfaceSnapshot {
            interface_name: name.clone(),
            total_received: data.total_received(),
            total_transmitted: data.total_transmitted(),
            total_packets_received: data.total_packets_received(),
            total_packets_transmitted: data.total_packets_transmitted(),
            total_errors_on_received: data.total_errors_on_received(),
            total_errors_on_transmitted: data.total_errors_on_transmitted(),
        });
    }

    Ok(snapshots)
}

/// A snapshot of cumulative network I/O counters for a single interface.
#[derive(Debug, Clone)]
pub struct NetworkInterfaceSnapshot {
    /// Interface name (e.g., "en0", "eth0").
    pub interface_name: String,
    /// Cumulative bytes received.
    pub total_received: u64,
    /// Cumulative bytes transmitted.
    pub total_transmitted: u64,
    /// Cumulative packets received.
    pub total_packets_received: u64,
    /// Cumulative packets transmitted.
    pub total_packets_transmitted: u64,
    /// Cumulative errors on received.
    pub total_errors_on_received: u64,
    /// Cumulative errors on transmitted.
    pub total_errors_on_transmitted: u64,
}

/// Aggregate rates from two snapshots and an interval.
///
/// Sums across all interfaces. Returns
/// `(bytes_in_per_sec, bytes_out_per_sec, packets_in_per_sec, packets_out_per_sec, errors_per_sec)`.
pub fn compute_rates(
    prev: &[NetworkInterfaceSnapshot],
    curr: &[NetworkInterfaceSnapshot],
    interval_secs: f64,
) -> (u64, u64, u64, u64, u64) {
    if interval_secs <= 0.0 || prev.is_empty() || curr.is_empty() {
        return (0, 0, 0, 0, 0);
    }

    // Build a map from interface name for both snapshots.
    use std::collections::HashMap;
    let prev_map: HashMap<&str, &NetworkInterfaceSnapshot> =
        prev.iter().map(|s| (s.interface_name.as_str(), s)).collect();
    let curr_map: HashMap<&str, &NetworkInterfaceSnapshot> =
        curr.iter().map(|s| (s.interface_name.as_str(), s)).collect();

    let mut total_bytes_in: u64 = 0;
    let mut total_bytes_out: u64 = 0;
    let mut total_packets_in: u64 = 0;
    let mut total_packets_out: u64 = 0;
    let mut total_errors: u64 = 0;

    for (name, curr_interf) in &curr_map {
        if let Some(prev_interf) = prev_map.get(name) {
            total_bytes_in = total_bytes_in
                .saturating_add(curr_interf.total_received.saturating_sub(prev_interf.total_received));
            total_bytes_out = total_bytes_out.saturating_add(
                curr_interf.total_transmitted.saturating_sub(prev_interf.total_transmitted),
            );
            total_packets_in = total_packets_in.saturating_add(
                curr_interf
                    .total_packets_received
                    .saturating_sub(prev_interf.total_packets_received),
            );
            total_packets_out = total_packets_out.saturating_add(
                curr_interf
                    .total_packets_transmitted
                    .saturating_sub(prev_interf.total_packets_transmitted),
            );
            let errors_on_rx = curr_interf
                .total_errors_on_received
                .saturating_sub(prev_interf.total_errors_on_received);
            let errors_on_tx = curr_interf
                .total_errors_on_transmitted
                .saturating_sub(prev_interf.total_errors_on_transmitted);
            total_errors = total_errors.saturating_add(errors_on_rx.saturating_add(errors_on_tx));
        }
    }

    let bytes_in_per_sec = (total_bytes_in as f64 / interval_secs) as u64;
    let bytes_out_per_sec = (total_bytes_out as f64 / interval_secs) as u64;
    let packets_in_per_sec = (total_packets_in as f64 / interval_secs) as u64;
    let packets_out_per_sec = (total_packets_out as f64 / interval_secs) as u64;
    let errors_per_sec = (total_errors as f64 / interval_secs) as u64;

    (bytes_in_per_sec, bytes_out_per_sec, packets_in_per_sec, packets_out_per_sec, errors_per_sec)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_snapshot(
        name: &str,
        rx: u64,
        tx: u64,
        prx: u64,
        ptx: u64,
        erx: u64,
        etx: u64,
    ) -> NetworkInterfaceSnapshot {
        NetworkInterfaceSnapshot {
            interface_name: name.to_string(),
            total_received: rx,
            total_transmitted: tx,
            total_packets_received: prx,
            total_packets_transmitted: ptx,
            total_errors_on_received: erx,
            total_errors_on_transmitted: etx,
        }
    }

    #[test]
    fn test_compute_rates_basic() {
        let prev = vec![make_snapshot("eth0", 1000, 500, 10, 5, 0, 0)];
        let curr = vec![make_snapshot("eth0", 2000, 1000, 20, 10, 0, 1)];
        let (r, t, pr, pt, e) = compute_rates(&prev, &curr, 1.0);
        assert_eq!(r, 1000);
        assert_eq!(t, 500);
        assert_eq!(pr, 10);
        assert_eq!(pt, 5);
        assert_eq!(e, 1);
    }

    #[test]
    fn test_compute_rates_no_activity() {
        let prev = vec![make_snapshot("eth0", 1000, 500, 10, 5, 0, 0)];
        let curr = vec![make_snapshot("eth0", 1000, 500, 10, 5, 0, 0)];
        let (r, t, pr, pt, e) = compute_rates(&prev, &curr, 1.0);
        assert_eq!(r, 0);
        assert_eq!(t, 0);
        assert_eq!(pr, 0);
        assert_eq!(pt, 0);
        assert_eq!(e, 0);
    }

    #[test]
    fn test_compute_rates_zero_interval() {
        let prev = vec![make_snapshot("eth0", 1000, 500, 10, 5, 0, 0)];
        let curr = vec![make_snapshot("eth0", 2000, 1000, 20, 10, 0, 1)];
        let (r, t, pr, pt, e) = compute_rates(&prev, &curr, 0.0);
        assert_eq!(r, 0);
        assert_eq!(t, 0);
        assert_eq!(pr, 0);
        assert_eq!(pt, 0);
        assert_eq!(e, 0);
    }
}
