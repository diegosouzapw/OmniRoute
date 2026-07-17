//! API key repository.

use crate::error::StorageError;
use chrono::{DateTime, Utc};
use omniroute_core::key::{ApiKey, ApiKeyStatus};
use sqlx::Row;
use sqlx::SqlitePool;

pub struct ApiKeyRepo<'a> {
    pool: &'a SqlitePool,
}

impl<'a> ApiKeyRepo<'a> {
    pub fn new(pool: &'a SqlitePool) -> Self { Self { pool } }

    pub async fn get_by_hash(&self, key_hash: &str) -> Result<ApiKey, StorageError> {
        let row = sqlx::query(
            "SELECT id, name, key_hash, last4, scopes_json, status, user_id, workspace_id, \
                    expires_at, last_used_at, rate_limit_rps, created_at FROM api_keys WHERE key_hash = ?"
        )
        .bind(key_hash)
        .fetch_optional(self.pool)
        .await?
        .ok_or_else(|| StorageError::NotFound("api_key".to_string()))?;
        row_to_key(row)
    }

    pub async fn get(&self, id: &str) -> Result<ApiKey, StorageError> {
        let row = sqlx::query(
            "SELECT id, name, key_hash, last4, scopes_json, status, user_id, workspace_id, \
                    expires_at, last_used_at, rate_limit_rps, created_at FROM api_keys WHERE id = ?"
        )
        .bind(id)
        .fetch_optional(self.pool)
        .await?
        .ok_or_else(|| StorageError::NotFound(format!("api_key {id}")))?;
        row_to_key(row)
    }

    pub async fn list(&self) -> Result<Vec<ApiKey>, StorageError> {
        let rows = sqlx::query(
            "SELECT id, name, key_hash, last4, scopes_json, status, user_id, workspace_id, \
                    expires_at, last_used_at, rate_limit_rps, created_at FROM api_keys ORDER BY created_at DESC"
        )
        .fetch_all(self.pool)
        .await?;
        rows.into_iter().map(row_to_key).collect()
    }

    pub async fn insert(&self, k: &ApiKey) -> Result<(), StorageError> {
        let status = match k.status {
            ApiKeyStatus::Active => "active",
            ApiKeyStatus::Suspended => "suspended",
            ApiKeyStatus::Revoked => "revoked",
            ApiKeyStatus::Expired => "expired",
        };
        sqlx::query(
            "INSERT INTO api_keys (id, name, key_hash, last4, scopes_json, status, user_id, \
                    workspace_id, expires_at, last_used_at, rate_limit_rps, created_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(&k.id)
        .bind(&k.name)
        .bind(&k.key_hash)
        .bind(&k.last4)
        .bind(serde_json::to_string(&k.scopes)?)
        .bind(status)
        .bind(&k.user_id)
        .bind(&k.workspace_id)
        .bind(k.expires_at.map(|d| d.to_rfc3339()))
        .bind(k.last_used_at.map(|d| d.to_rfc3339()))
        .bind(k.rate_limit_rps.map(|n| n as i64))
        .bind(k.created_at.to_rfc3339())
        .execute(self.pool)
        .await?;
        Ok(())
    }

    pub async fn revoke(&self, id: &str) -> Result<(), StorageError> {
        let n = sqlx::query("UPDATE api_keys SET status = 'revoked' WHERE id = ?")
            .bind(id)
            .execute(self.pool)
            .await?
            .rows_affected();
        if n == 0 { return Err(StorageError::NotFound(format!("api_key {id}"))); }
        Ok(())
    }

    pub async fn touch_last_used(&self, id: &str) -> Result<(), StorageError> {
        sqlx::query("UPDATE api_keys SET last_used_at = datetime('now') WHERE id = ?")
            .bind(id)
            .execute(self.pool)
            .await?;
        Ok(())
    }
}

fn row_to_key(row: sqlx::sqlite::SqliteRow) -> Result<ApiKey, StorageError> {
    let scopes_json: String = row.try_get("scopes_json").unwrap_or_default();
    let status: String = row.try_get("status").unwrap_or_else(|_| "active".to_string());
    let expires_at: Option<String> = row.try_get("expires_at").ok();
    let last_used_at: Option<String> = row.try_get("last_used_at").ok();
    let created_at: String = row.try_get("created_at").unwrap_or_default();
    let rate_limit_rps: Option<i64> = row.try_get("rate_limit_rps").ok();
    let status = match status.as_str() {
        "active" => ApiKeyStatus::Active,
        "suspended" => ApiKeyStatus::Suspended,
        "revoked" => ApiKeyStatus::Revoked,
        "expired" => ApiKeyStatus::Expired,
        _ => ApiKeyStatus::Active,
    };
    Ok(ApiKey {
        id: row.try_get("id")?,
        name: row.try_get("name")?,
        key_hash: row.try_get("key_hash")?,
        last4: row.try_get("last4")?,
        scopes: serde_json::from_str(&scopes_json).unwrap_or_default(),
        status,
        user_id: row.try_get("user_id")?,
        workspace_id: row.try_get("workspace_id")?,
        expires_at: expires_at.and_then(|s| DateTime::parse_from_rfc3339(&s).ok().map(|d| d.with_timezone(&Utc))),
        last_used_at: last_used_at.and_then(|s| DateTime::parse_from_rfc3339(&s).ok().map(|d| d.with_timezone(&Utc))),
        rate_limit_rps: rate_limit_rps.map(|n| n as u32),
        created_at: DateTime::parse_from_rfc3339(&created_at)
            .map(|d| d.with_timezone(&Utc))
            .unwrap_or_else(|_| Utc::now()),
    })
}
