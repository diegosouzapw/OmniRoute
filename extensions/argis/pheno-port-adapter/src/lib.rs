use thiserror::Error;

/// Error type for port adapter operations.
#[derive(Debug, Error)]
pub enum AdapterError {
    #[error("connect failed: {0}")]
    ConnectFailed(String),
    #[error("disconnect failed: {0}")]
    DisconnectFailed(String),
    #[error("health check failed: {0}")]
    HealthCheckFailed(String),
    #[error("timeout")]
    Timeout,
}

/// Opaque handle representing an active connection.
#[derive(Debug)]
#[allow(dead_code)]
pub struct Connection {
    pub(crate) id: String,
}

/// Trait for port adapters.
pub trait PortAdapter: Send + Sync {
    fn name(&self) -> &str;
    fn health(&self) -> Result<(), AdapterError>;
    fn connect(&self, endpoint: &str) -> Result<Connection, AdapterError>;
    fn disconnect(&self) -> Result<(), AdapterError>;
}

/// Concrete transport adapters (TCP, Unix-domain socket).
pub mod adapters;

#[cfg(test)]
mod tests {
    use super::*;

    struct MockAdapter {
        name: String,
        healthy: bool,
        valid_endpoint: String,
    }

    impl PortAdapter for MockAdapter {
        fn name(&self) -> &str {
            &self.name
        }

        fn health(&self) -> Result<(), AdapterError> {
            if self.healthy {
                Ok(())
            } else {
                Err(AdapterError::HealthCheckFailed("unhealthy".to_string()))
            }
        }

        fn connect(&self, endpoint: &str) -> Result<Connection, AdapterError> {
            if endpoint == self.valid_endpoint {
                Ok(Connection {
                    id: endpoint.to_string(),
                })
            } else {
                Err(AdapterError::ConnectFailed(format!(
                    "invalid endpoint: {endpoint}"
                )))
            }
        }

        fn disconnect(&self) -> Result<(), AdapterError> {
            Ok(())
        }
    }

    #[test]
    fn connect_returns_connection() {
        let adapter = MockAdapter {
            name: "mock".to_string(),
            healthy: true,
            valid_endpoint: "tcp://localhost:8080".to_string(),
        };
        let conn = adapter.connect("tcp://localhost:8080").unwrap();
        assert_eq!(conn.id, "tcp://localhost:8080");
    }

    #[test]
    fn disconnect_returns_ok() {
        let adapter = MockAdapter {
            name: "mock".to_string(),
            healthy: true,
            valid_endpoint: "tcp://localhost:8080".to_string(),
        };
        assert!(adapter.disconnect().is_ok());
    }

    #[test]
    fn health_check_passes() {
        let adapter = MockAdapter {
            name: "mock".to_string(),
            healthy: true,
            valid_endpoint: "tcp://localhost:8080".to_string(),
        };
        assert!(adapter.health().is_ok());
    }

    #[test]
    fn connect_to_invalid_endpoint_fails() {
        let adapter = MockAdapter {
            name: "mock".to_string(),
            healthy: true,
            valid_endpoint: "tcp://localhost:8080".to_string(),
        };
        let result = adapter.connect("invalid://nope");
        assert!(matches!(result, Err(AdapterError::ConnectFailed(_))));
    }

    #[test]
    fn adapter_name_is_non_empty() {
        let adapter = MockAdapter {
            name: "mock-adapter".to_string(),
            healthy: true,
            valid_endpoint: "tcp://localhost:8080".to_string(),
        };
        assert!(!adapter.name().is_empty());
    }
}
