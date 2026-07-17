//! Connection pool management (sqlx + SQLite).

use crate::error::StorageError;
use crate::schema::ensure_schema;
use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions, SqliteSynchronous};
use sqlx::SqlitePool;
use std::path::{Path, PathBuf};
use std::str::FromStr;
use std::time::Duration;

/// Default data directory: `~/.omniroute`.
pub fn default_data_dir() -> PathBuf {
    if let Ok(dir) = std::env::var("OMNIROUTE_DATA_DIR") {
        return PathBuf::from(dir);
    }
    let home = std::env::var("HOME")
        .or_else(|_| std::env::var("USERPROFILE"))
        .unwrap_or_else(|_| "/tmp".to_string());
    PathBuf::from(home).join(".omniroute")
}

/// Resolve the database path under the data directory.
pub fn default_db_path() -> PathBuf {
    default_data_dir().join("omniroute.sqlite")
}

/// Connection pool options.
#[derive(Debug, Clone)]
pub struct PoolOptions {
    /// Path to the SQLite file (":memory:" for in-memory).
    pub path: PathBuf,
    /// Max connections (SQLite benefits from a small pool with WAL).
    pub max_connections: u32,
    /// Busy timeout (ms).
    pub busy_timeout_ms: u64,
    /// Enable WAL mode.
    pub wal: bool,
    /// Enable foreign keys.
    pub foreign_keys: bool,
}

impl Default for PoolOptions {
    fn default() -> Self {
        Self {
            path: default_db_path(),
            max_connections: 16,
            busy_timeout_ms: 30_000,
            wal: true,
            foreign_keys: true,
        }
    }
}

impl PoolOptions {
    /// Use an in-memory database (for tests).
    #[must_use]
    pub fn in_memory() -> Self {
        Self {
            path: PathBuf::from(":memory:"),
            max_connections: 1,
            busy_timeout_ms: 5_000,
            wal: false,
            foreign_keys: true,
        }
    }

    /// Set the database path.
    #[must_use]
    pub fn with_path(mut self, path: impl Into<PathBuf>) -> Self {
        self.path = path.into();
        self
    }

    /// Set max connections.
    #[must_use]
    pub fn with_max_connections(mut self, n: u32) -> Self {
        self.max_connections = n;
        self
    }
}

/// Open a SQLite pool with the given options and run migrations.
pub async fn open(opts: PoolOptions) -> Result<SqlitePool, StorageError> {
    let url = if opts.path == Path::new(":memory:") {
        "sqlite::memory:".to_string()
    } else {
        format!("sqlite://{}", opts.path.display())
    };

    let connect_opts = SqliteConnectOptions::from_str(&url)
        .map_err(|e| StorageError::Connection(e.to_string()))?
        .create_if_missing(true)
        .busy_timeout(Duration::from_millis(opts.busy_timeout_ms))
        .foreign_keys(opts.foreign_keys)
        .journal_mode(if opts.wal { SqliteJournalMode::Wal } else { SqliteJournalMode::Delete })
        .synchronous(if opts.wal { SqliteSynchronous::Normal } else { SqliteSynchronous::Full });

    let pool = SqlitePoolOptions::new()
        .max_connections(opts.max_connections)
        .min_connections(1)
        .acquire_timeout(Duration::from_secs(10))
        .connect_with(connect_opts)
        .await
        .map_err(|e| StorageError::Connection(e.to_string()))?;

    // Ensure parent directory exists
    if let Some(parent) = opts.path.parent() {
        if !parent.as_os_str().is_empty() && parent != Path::new(":memory:") {
            tokio::fs::create_dir_all(parent).await.map_err(StorageError::Io)?;
        }
    }

    ensure_schema(&pool).await?;
    Ok(pool)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn in_memory_pool_works() {
        let pool = open(PoolOptions::in_memory()).await.unwrap();
        let v: i64 = sqlx::query_scalar("SELECT 1").fetch_one(&pool).await.unwrap();
        assert_eq!(v, 1);
    }
}
