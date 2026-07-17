//! Migration runner.
//!
//! Maintains a `schema_version` table. Each migration is a function that
//! takes a connection and runs its SQL. Migrations are append-only; never
//! edit a migration that has already been applied.

use crate::error::StorageError;
use crate::schema::ensure_schema;
use sqlx::{Connection, SqliteConnection, SqlitePool};

/// A single migration.
pub struct Migration {
    /// Version (monotonically increasing).
    pub version: i64,
    /// Human-readable description.
    pub description: &'static str,
    /// SQL statements to apply.
    pub sql: &'static str,
}

/// Built-in migrations, in order.
pub const MIGRATIONS: &[Migration] = &[
    Migration {
        version: 1,
        description: "initial schema",
        sql: include_str!("../migrations/0001_initial.sql"),
    },
];

/// Apply all pending migrations.
pub async fn run_migrations(pool: &SqlitePool) -> Result<(), StorageError> {
    // Ensure schema_version table exists
    ensure_schema(pool).await?;

    let mut conn = pool.acquire().await?;
    let current: Option<i64> = sqlx::query_scalar("SELECT MAX(version) FROM schema_version")
        .fetch_optional(&mut *conn)
        .await?
        .flatten();

    for mig in MIGRATIONS {
        if current.map(|c| c >= mig.version).unwrap_or(false) {
            continue;
        }
        run_migration(&mut conn, mig).await?;
    }
    Ok(())
}

async fn run_migration(
    conn: &mut SqliteConnection,
    mig: &Migration,
) -> Result<(), StorageError> {
    tracing::info!(version = mig.version, desc = mig.description, "applying migration");
    let mut tx = conn.begin().await?;
    for stmt in mig.sql.split(';') {
        let trimmed = stmt.trim();
        if trimmed.is_empty() {
            continue;
        }
        sqlx::query(trimmed).execute(&mut *tx).await.map_err(|e| {
            StorageError::Migration(format!("v{}: {e}: {trimmed}", mig.version))
        })?;
    }
    sqlx::query("INSERT OR IGNORE INTO schema_version (version, description) VALUES (?, ?)")
        .bind(mig.version)
        .bind(mig.description)
        .execute(&mut *tx)
        .await?;
    tx.commit().await?;
    Ok(())
}
