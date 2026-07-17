//! TCP transport adapter.
//!
//! [`TcpAdapter`] wraps a single [`std::net::TcpStream`] held in interior
//! mutability so the synchronous [`PortAdapter`] trait methods (which take
//! `&self`) can open and close the underlying connection. The endpoint
//! string is the conventional `host:port` form accepted by
//! [`TcpStream::connect`] (e.g. `127.0.0.1:8080` or `localhost:9000`).
//!
//! Calling [`PortAdapter::connect`] on an already-connected adapter drops
//! the previous stream and replaces it with the new one; the [`Connection`]
//! returned to the caller always reflects the most recent endpoint. Calling
//! [`PortAdapter::disconnect`] on an adapter that was never connected is a
//! no-op that returns `Ok(())`.

use std::net::TcpStream;
use std::sync::Mutex;

use crate::{AdapterError, Connection, PortAdapter};

/// TCP transport adapter backed by a single [`TcpStream`].
#[derive(Debug, Default)]
pub struct TcpAdapter {
    inner: Mutex<TcpState>,
}

#[derive(Debug, Default)]
struct TcpState {
    stream: Option<TcpStream>,
    endpoint: Option<String>,
}

impl TcpAdapter {
    /// Create a new, unconnected TCP adapter.
    pub fn new() -> Self {
        Self::default()
    }
}

impl PortAdapter for TcpAdapter {
    fn name(&self) -> &str {
        "tcp"
    }

    fn health(&self) -> Result<(), AdapterError> {
        let state = self.inner.lock().expect("tcp adapter mutex poisoned");
        let stream = state
            .stream
            .as_ref()
            .ok_or_else(|| AdapterError::HealthCheckFailed("not connected".to_string()))?;
        // `peer_addr` returns `NotConnected` after a peer has closed; this
        // is the cheapest cross-platform liveness probe without requiring
        // additional syscalls.
        stream
            .peer_addr()
            .map_err(|e| AdapterError::HealthCheckFailed(e.to_string()))?;
        Ok(())
    }

    fn connect(&self, endpoint: &str) -> Result<Connection, AdapterError> {
        if endpoint.is_empty() {
            return Err(AdapterError::ConnectFailed("empty endpoint".to_string()));
        }
        let stream = TcpStream::connect(endpoint)
            .map_err(|e| AdapterError::ConnectFailed(format!("{endpoint}: {e}")))?;
        let mut state = self.inner.lock().expect("tcp adapter mutex poisoned");
        // Replace any previously held stream; we don't surface the old id
        // because the trait has no way to return two values.
        state.stream = Some(stream);
        state.endpoint = Some(endpoint.to_string());
        Ok(Connection {
            id: endpoint.to_string(),
        })
    }

    fn disconnect(&self) -> Result<(), AdapterError> {
        let mut state = self.inner.lock().expect("tcp adapter mutex poisoned");
        // `take()` drops the inner `TcpStream`, which sends FIN to the peer.
        state.stream = None;
        state.endpoint = None;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Read;
    use std::net::TcpListener;
    use std::thread;

    /// Spin up a TCP listener on an OS-assigned port; return the address
    /// the listener bound to (in `host:port` form) plus a join handle that
    /// accepts exactly one connection and echoes nothing.
    fn spawn_echo_listener() -> (String, thread::JoinHandle<()>) {
        let listener = TcpListener::bind("127.0.0.1:0").expect("bind ephemeral port");
        let addr = listener.local_addr().expect("local_addr");
        let handle = thread::spawn(move || {
            if let Ok((mut stream, _)) = listener.accept() {
                // Drain whatever the client sends so the connection stays
                // healthy and closes cleanly when the client drops it.
                let mut buf = [0u8; 16];
                let _ = stream.read(&mut buf);
            }
        });
        (addr.to_string(), handle)
    }

    #[test]
    fn name_is_tcp() {
        let adapter = TcpAdapter::new();
        assert_eq!(adapter.name(), "tcp");
    }

    #[test]
    fn health_when_disconnected_returns_error() {
        let adapter = TcpAdapter::new();
        let result = adapter.health();
        assert!(matches!(result, Err(AdapterError::HealthCheckFailed(_))));
    }

    #[test]
    fn disconnect_when_disconnected_is_ok() {
        let adapter = TcpAdapter::new();
        assert!(adapter.disconnect().is_ok());
    }

    #[test]
    fn connect_to_empty_endpoint_fails() {
        let adapter = TcpAdapter::new();
        let result = adapter.connect("");
        assert!(matches!(result, Err(AdapterError::ConnectFailed(_))));
    }

    #[test]
    fn connect_to_unroutable_endpoint_fails() {
        let adapter = TcpAdapter::new();
        // Port 1 on localhost is unprivileged + almost certainly unbound
        // and not accepting connections, so connect fails fast.
        let result = adapter.connect("127.0.0.1:1");
        assert!(matches!(result, Err(AdapterError::ConnectFailed(_))));
    }

    #[test]
    fn connect_to_listener_succeeds_and_health_passes() {
        let (addr, handle) = spawn_echo_listener();
        let adapter = TcpAdapter::new();
        let conn = adapter.connect(&addr).expect("connect to echo listener");
        assert_eq!(conn.id, addr);
        assert!(adapter.health().is_ok());
        assert!(adapter.disconnect().is_ok());
        // The peer may have already closed its side; we still expect the
        // server thread to finish.
        let _ = handle.join();
    }

    #[test]
    fn reconnect_replaces_previous_connection() {
        let (addr1, h1) = spawn_echo_listener();
        let (addr2, h2) = spawn_echo_listener();
        let adapter = TcpAdapter::new();
        let _ = adapter.connect(&addr1).expect("first connect");
        let conn2 = adapter.connect(&addr2).expect("second connect");
        assert_eq!(conn2.id, addr2);
        // The new endpoint is now authoritative.
        assert!(adapter.disconnect().is_ok());
        let _ = h1.join();
        let _ = h2.join();
    }
}

/// Chaos / anti-fragility tests (Pillar L11).
///
/// These exercise the adapter under stress and against a peer that
/// misbehaves, so that production failure modes are caught in CI rather
/// than in production. All scenarios use only `std` — no test-runner
/// features beyond the synchronous `#[test]` harness.
#[cfg(test)]
mod chaos {
    use super::*;
    use std::io::{Read, Write};
    use std::net::TcpListener;
    use std::sync::atomic::{AtomicUsize, Ordering};
    use std::sync::Arc;
    use std::thread;
    use std::time::{Duration, Instant};

    /// Spawn a TCP listener that accepts up to `max_connections` then drops
    /// them (no I/O). Returns the address and join handle.
    fn spawn_silent_listener(max_connections: usize) -> (String, thread::JoinHandle<()>) {
        let listener = TcpListener::bind("127.0.0.1:0").expect("bind ephemeral port");
        let addr = listener.local_addr().expect("local_addr");
        let handle = thread::spawn(move || {
            for stream in listener.incoming().take(max_connections) {
                drop(stream);
            }
        });
        (addr.to_string(), handle)
    }

    /// Spawn a listener that reads `n` bytes then sends FIN. Used to
    /// simulate a peer that disconnects after one transaction.
    fn spawn_one_shot_listener() -> (String, thread::JoinHandle<()>) {
        let listener = TcpListener::bind("127.0.0.1:0").expect("bind ephemeral port");
        let addr = listener.local_addr().expect("local_addr");
        let handle = thread::spawn(move || {
            if let Ok((mut stream, _)) = listener.accept() {
                let mut buf = [0u8; 64];
                let _ = stream.read(&mut buf);
                // Drop closes the socket; client sees FIN.
            }
        });
        (addr.to_string(), handle)
    }

    #[test]
    fn health_after_peer_drop_returns_error() {
        // Peer drops the connection; health() must surface the failure
        // rather than silently reporting OK.
        let (addr, handle) = spawn_one_shot_listener();
        let adapter = TcpAdapter::new();
        let _ = adapter.connect(&addr).expect("connect");
        // Wait for the peer thread to finish reading and drop the socket.
        let _ = handle.join();
        // Give the kernel a beat to deliver FIN.
        thread::sleep(Duration::from_millis(50));
        let result = adapter.health();
        assert!(
            matches!(result, Err(AdapterError::HealthCheckFailed(_))),
            "health after peer drop should report failure, got {result:?}"
        );
    }

    #[test]
    fn rapid_connect_disconnect_cycles_do_not_leak_or_panic() {
        let (addr, handle) = spawn_silent_listener(64);
        let adapter = TcpAdapter::new();
        // 32 cycles is well above any plausible connection-table threshold
        // and below the test default timeout on every CI runner we ship to.
        for _ in 0..32 {
            let _ = adapter.connect(&addr).expect("connect under chaos");
            assert!(adapter.disconnect().is_ok());
        }
        // After all the cycling the adapter should be cleanly disconnected.
        let _ = adapter.disconnect();
        assert!(matches!(
            adapter.health(),
            Err(AdapterError::HealthCheckFailed(_))
        ));
        let _ = handle.join();
    }

    #[test]
    fn connect_to_host_with_port_zero_is_rejected() {
        // Port 0 is reserved (IANA "tcpmux"); an attempt to connect must
        // not panic and must return an error.
        let adapter = TcpAdapter::new();
        let result = adapter.connect("127.0.0.1:0");
        assert!(matches!(result, Err(AdapterError::ConnectFailed(_))));
    }

    #[test]
    fn connect_to_malformed_endpoint_is_rejected() {
        let adapter = TcpAdapter::new();
        for bad in ["not-a-socket", "host::dup::colon", "999.999.999.999:80", ""] {
            let result = adapter.connect(bad);
            assert!(
                matches!(result, Err(AdapterError::ConnectFailed(_))),
                "malformed endpoint {bad:?} should be rejected, got {result:?}"
            );
        }
    }

    #[test]
    fn concurrent_adapters_do_not_block_each_other() {
        // Each adapter has its own mutex; verify that contention across
        // many adapters does not deadlock under stress.
        let counter = Arc::new(AtomicUsize::new(0));
        let listener = TcpListener::bind("127.0.0.1:0").expect("bind ephemeral port");
        let addr = listener.local_addr().expect("local_addr");
        let server = thread::spawn(move || {
            // Accept up to 64 connections, one per client adapter.
            for stream in listener.incoming().take(64) {
                let mut s = stream.expect("accept");
                let _ = s.write_all(b"pong");
                counter.fetch_add(1, Ordering::Relaxed);
                drop(s);
            }
        });
        let mut handles = Vec::new();
        for _ in 0..16 {
            let addr = addr.to_string();
            handles.push(thread::spawn(move || {
                let adapter = TcpAdapter::new();
                for _ in 0..4 {
                    let _ = adapter.connect(&addr);
                    let _ = adapter.health();
                    let _ = adapter.disconnect();
                }
            }));
        }
        for h in handles {
            h.join().expect("client thread panicked");
        }
        let _ = server.join();
        assert!(counter.load(Ordering::Relaxed) >= 16);
    }

    #[test]
    fn connect_timeout_returns_error_not_block() {
        // Connect to a non-routable IP (RFC 5737 documentation block)
        // must fail in bounded time, not hang the test runner.
        let adapter = TcpAdapter::new();
        let start = Instant::now();
        let result = adapter.connect("192.0.2.1:80");
        let elapsed = start.elapsed();
        assert!(matches!(result, Err(AdapterError::ConnectFailed(_))));
        // 5s is generous; on most networks this fails in <100ms.
        assert!(
            elapsed < Duration::from_secs(5),
            "connect to unroutable IP took {elapsed:?} — possible hang"
        );
    }
}
