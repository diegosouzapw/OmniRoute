//! Database schema bootstrap (idempotent CREATE TABLE IF NOT EXISTS).
//!
//! This module is the single source of truth for the OmniRoute Rust schema.
//! It mirrors the existing TypeScript app's tables (with a few additions
//! and cleanups) and is intentionally idempotent so it can run at startup.

use crate::error::StorageError;
use sqlx::SqlitePool;

/// All schema statements, in dependency order.
pub const SCHEMA_STATEMENTS: &[&str] = &[
    // Schema version (for upgrade tracking)
    r#"CREATE TABLE IF NOT EXISTS schema_version (
        version INTEGER PRIMARY KEY,
        applied_at TEXT NOT NULL DEFAULT (datetime('now')),
        description TEXT
    )"#,

    // Providers
    r#"CREATE TABLE IF NOT EXISTS providers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        kind TEXT NOT NULL,
        base_url TEXT NOT NULL,
        default_model TEXT,
        models_json TEXT NOT NULL DEFAULT '{}',
        api_key_env TEXT,
        api_key_encrypted BLOB,
        headers_json TEXT NOT NULL DEFAULT '{}',
        timeout_ms INTEGER NOT NULL DEFAULT 60000,
        max_retries INTEGER NOT NULL DEFAULT 0,
        enabled INTEGER NOT NULL DEFAULT 1,
        priority INTEGER NOT NULL DEFAULT 0,
        weight INTEGER NOT NULL DEFAULT 100,
        region TEXT,
        tags_json TEXT NOT NULL DEFAULT '[]',
        cost_tier INTEGER NOT NULL DEFAULT 3,
        quality_tier INTEGER NOT NULL DEFAULT 3,
        latency_tier INTEGER NOT NULL DEFAULT 3,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_providers_enabled ON providers(enabled)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_providers_kind ON providers(kind)"#,

    // Combos
    r#"CREATE TABLE IF NOT EXISTS combos (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        logical_model TEXT NOT NULL,
        strategy TEXT NOT NULL,
        steps_json TEXT NOT NULL DEFAULT '[]',
        enabled INTEGER NOT NULL DEFAULT 1,
        tags_json TEXT NOT NULL DEFAULT '[]',
        quality_gate_json TEXT,
        budget_usd_per_day REAL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_combos_logical_model ON combos(logical_model)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_combos_enabled ON combos(enabled)"#,

    // API keys
    r#"CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        key_hash TEXT NOT NULL,
        last4 TEXT NOT NULL,
        scopes_json TEXT NOT NULL DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'active',
        user_id TEXT,
        workspace_id TEXT,
        expires_at TEXT,
        last_used_at TEXT,
        rate_limit_rps INTEGER,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys(status)"#,

    // Request log
    r#"CREATE TABLE IF NOT EXISTS request_logs (
        id TEXT PRIMARY KEY,
        request_id TEXT NOT NULL,
        user_id TEXT,
        workspace_id TEXT,
        provider_id TEXT,
        combo_id TEXT,
        model TEXT NOT NULL,
        upstream_model TEXT,
        method TEXT NOT NULL,
        path TEXT NOT NULL,
        status INTEGER NOT NULL,
        latency_ms INTEGER NOT NULL,
        prompt_tokens INTEGER NOT NULL DEFAULT 0,
        completion_tokens INTEGER NOT NULL DEFAULT 0,
        total_tokens INTEGER NOT NULL DEFAULT 0,
        cost_usd REAL NOT NULL DEFAULT 0,
        error_code TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_request_logs_created_at ON request_logs(created_at)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_request_logs_request_id ON request_logs(request_id)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_request_logs_user_id ON request_logs(user_id)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_request_logs_provider_id ON request_logs(provider_id)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_request_logs_model ON request_logs(model)"#,

    // Usage history (per-day rollup)
    r#"CREATE TABLE IF NOT EXISTS usage_history (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        user_id TEXT,
        workspace_id TEXT,
        provider_id TEXT,
        model TEXT NOT NULL,
        requests INTEGER NOT NULL DEFAULT 0,
        prompt_tokens INTEGER NOT NULL DEFAULT 0,
        completion_tokens INTEGER NOT NULL DEFAULT 0,
        total_tokens INTEGER NOT NULL DEFAULT 0,
        cost_usd REAL NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        UNIQUE (date, user_id, workspace_id, provider_id, model)
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_usage_history_date ON usage_history(date)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_usage_history_user_id ON usage_history(user_id)"#,

    // MCP audit
    r#"CREATE TABLE IF NOT EXISTS mcp_audit (
        id TEXT PRIMARY KEY,
        request_id TEXT NOT NULL,
        tool_name TEXT NOT NULL,
        user_id TEXT,
        workspace_id TEXT,
        arguments_json TEXT,
        result_json TEXT,
        error TEXT,
        latency_ms INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_mcp_audit_created_at ON mcp_audit(created_at)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_mcp_audit_tool_name ON mcp_audit(tool_name)"#,

    // Config audit
    r#"CREATE TABLE IF NOT EXISTS config_audit (
        id TEXT PRIMARY KEY,
        actor TEXT NOT NULL,
        action TEXT NOT NULL,
        target TEXT NOT NULL,
        before_json TEXT,
        after_json TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_config_audit_created_at ON config_audit(created_at)"#,

    // Webhooks
    r#"CREATE TABLE IF NOT EXISTS webhooks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        events_json TEXT NOT NULL DEFAULT '[]',
        secret_encrypted BLOB,
        enabled INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_webhooks_enabled ON webhooks(enabled)"#,

    // Sessions
    r#"CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        workspace_id TEXT,
        ip_address TEXT,
        user_agent TEXT,
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)"#,

    // Users (minimal; full identity lives in the upstream IdP)
    r#"CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        password_hash TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        role TEXT NOT NULL DEFAULT 'user',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )"#,
    r#"CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)"#,
    r#"CREATE INDEX IF NOT EXISTS idx_users_status ON users(status)"#,
];

/// Run the schema bootstrap. Idempotent: safe to call on every startup.
pub async fn ensure_schema(pool: &SqlitePool) -> Result<(), StorageError> {
    for stmt in SCHEMA_STATEMENTS {
        sqlx::query(stmt).execute(pool).await.map_err(|e| {
            StorageError::Migration(format!("{e}: {stmt}"))
        })?;
    }
    // Record schema version if not present
    sqlx::query("INSERT OR IGNORE INTO schema_version (version, description) VALUES (?, ?)")
        .bind(env!("CARGO_PKG_VERSION"))
        .bind("OmniRoute Rust rewrite initial schema")
        .execute(pool)
        .await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::pool::{open, PoolOptions};

    #[tokio::test]
    async fn schema_is_idempotent() {
        let pool = open(PoolOptions::in_memory()).await.unwrap();
        ensure_schema(&pool).await.unwrap();
        ensure_schema(&pool).await.unwrap();
        let count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM schema_version")
            .fetch_one(&pool)
            .await
            .unwrap();
        assert_eq!(count, 1);
    }

    #[tokio::test]
    async fn providers_table_exists() {
        let pool = open(PoolOptions::in_memory()).await.unwrap();
        let n: i64 = sqlx::query_scalar(
            "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name='providers'"
        )
        .fetch_one(&pool)
        .await
        .unwrap();
        assert_eq!(n, 1);
    }
}
