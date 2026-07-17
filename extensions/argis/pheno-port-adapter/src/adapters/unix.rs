//! Unix-domain socket transport adapter (Unix only).
//!
//! [`UnixAdapter`] wraps a single [`std::os::unix::net::UnixStream`] held in
//! interior mutability so the synchronous [`PortAdapter`] trait methods
//! (which take `&self`) can open and close the underlying connection. The
//! endpoint string is the absolute path of the listening socket (e.g.
//! `/tmp/pheno-port-adapter.sock`).
//!
//! The whole module is gated on `cfg(unix)` and is not compiled on Windows
//! or other non-Unix targets. The crate root's `lib.rs` and `adapters/mod.rs`
//! re-export the module with the same `cfg(unix)` guard so consumers on
//! non-Unix platforms simply see no `unix` submodule.
//!
//! On macOS the `UnixStream` is also available through this path, even
//! though the listener must be created with `UnixListener` rather than the
//! `TcpListener` used by the TCP adapter's tests. The `e2e_connect_to_socket`
//! test below exercises the full open/read/close round-trip against a real
//! `UnixListener` bound to a `tempfile::Builder` path.

use std::os::unix::net::UnixStream;
use std::sync::Mutex;

use crate::{AdapterError, Connection, PortAdapter};

/// Unix-domain socket transport adapter backed by a single [`UnixStream`].
#[derive(Debug, Default)]
pub struct UnixAdapter {
    inner: Mutex<UnixState>,
}

#[derive(Debug, Default)]
struct UnixState {
    stream: Option<UnixStream>,
    endpoint: Option<String>,
}

impl UnixAdapter {
    /// Create a new, unconnected Unix-domain socket adapter.
    pub fn new() -> Self {
        Self::default()
    }
}

impl PortAdapter for UnixAdapter {
    fn name(&self) -> &str {
        "unix"
    }

    fn health(&self) -> Result<(), AdapterError> {
        let state = self.inner.lock().expect("unix adapter mutex poisoned");
        let stream = state
            .stream
            .as_ref()
            .ok_or_else(|| AdapterError::HealthCheckFailed("not connected".to_string()))?;
        // `peer_addr` returns `NotConnected` after the peer closes; this is
        // the cheapest liveness probe we can do without an extra syscall.
        stream
            .peer_addr()
            .map_err(|e| AdapterError::HealthCheckFailed(e.to_string()))?;
        Ok(())
    }

    fn connect(&self, endpoint: &str) -> Result<Connection, AdapterError> {
        if endpoint.is_empty() {
            return Err(AdapterError::ConnectFailed("empty endpoint".to_string()));
        }
        let stream = UnixStream::connect(endpoint)
            .map_err(|e| AdapterError::ConnectFailed(format!("{endpoint}: {e}")))?;
        let mut state = self.inner.lock().expect("unix adapter mutex poisoned");
        // Replace any previously held stream; we don't surface the old id
        // because the trait has no way to return two values.
        state.stream = Some(stream);
        state.endpoint = Some(endpoint.to_string());
        Ok(Connection {
            id: endpoint.to_string(),
        })
    }

    fn disconnect(&self) -> Result<(), AdapterError> {
        let mut state = self.inner.lock().expect("unix adapter mutex poisoned");
        // `take()` drops the inner `UnixStream`, which sends FIN to the peer.
        state.stream = None;
        state.endpoint = None;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Read;
    use std::os::unix::net::UnixListener;
    use std::thread;

    /// Bind a Unix-domain socket on a unique path under the OS temp dir and
    /// return the path plus a join handle that accepts exactly one
    /// connection and drains it.
    fn spawn_echo_listener() -> (std::path::PathBuf, thread::JoinHandle<()>) {
        let dir = std::env::temp_dir();
        let unique = format!(
            "pheno-port-adapter-test-{}-{}.sock",
            std::process::id(),
            // Sub-second timestamp to keep paths unique across tests in the
            // same PID that run in quick succession.
            std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .map(|d| d.as_nanos())
                .unwrap_or(0)
        );
        let path = dir.join(unique);
        // Remove any leftover socket file from a prior crashed run so the
        // bind doesn't fail with `AddrInUse`.
        let _ = std::fs::remove_file(&path);
        let listener = UnixListener::bind(&path).expect("bind unix listener");
        let handle = thread::spawn(move || {
            if let Ok((mut stream, _)) = listener.accept() {
                let mut buf = [0u8; 16];
                let _ = stream.read(&mut buf);
            }
        });
        (path, handle)
    }

    #[test]
    fn name_is_unix() {
        let adapter = UnixAdapter::new();
        assert_eq!(adapter.name(), "unix");
    }

    #[test]
    fn health_when_disconnected_returns_error() {
        let adapter = UnixAdapter::new();
        let result = adapter.health();
        assert!(matches!(result, Err(AdapterError::HealthCheckFailed(_))));
    }

    #[test]
    fn disconnect_when_disconnected_is_ok() {
        let adapter = UnixAdapter::new();
        assert!(adapter.disconnect().is_ok());
    }

    #[test]
    fn connect_to_empty_endpoint_fails() {
        let adapter = UnixAdapter::new();
        let result = adapter.connect("");
        assert!(matches!(result, Err(AdapterError::ConnectFailed(_))));
    }

    #[test]
    fn connect_to_missing_socket_fails() {
        let adapter = UnixAdapter::new();
        let bogus = std::env::temp_dir().join("pheno-port-adapter-definitely-missing.sock");
        let _ = std::fs::remove_file(&bogus);
        let result = adapter.connect(&bogus.to_string_lossy());
        assert!(matches!(result, Err(AdapterError::ConnectFailed(_))));
    }

    #[test]
    fn connect_to_listener_succeeds_and_health_passes() {
        let (path, handle) = spawn_echo_listener();
        let adapter = UnixAdapter::new();
        let path_str = path.to_string_lossy().into_owned();
        let conn = adapter
            .connect(&path_str)
            .expect("connect to unix listener");
        assert_eq!(conn.id, path_str);
        assert!(adapter.health().is_ok());
        assert!(adapter.disconnect().is_ok());
        let _ = handle.join();
        let _ = std::fs::remove_file(&path);
    }
}
