//! Request log repository.

use crate::error::StorageError;
use chrono::{DateTime, Utc};
use omniroute_core::chat::RequestLog;
use sqlx::SqlitePool;

pub struct RequestLogRepo<'a> {
    pool: &'a SqlitePool,
}

impl<'a> RequestLogRepo<'a> {
    pub fn new(pool: &'a SqlitePool) -> Self { Self { pool } }

    pub async fn insert(&self, log: &RequestLog) -> Result<(), StorageError> {
        sqlx::query(
            "INSERT INTO request_logs (id, request_id, user_id, workspace_id, provider_id, combo_id, \
                    model, upstream_model, method, path, status, latency_ms, prompt_tokens, \
                    completion_tokens, total_tokens, cost_usd, error_code, created_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(&log.id)
        .bind(&log.request_id)
        .bind(&log.user_id)
        .bind(&log.workspace_id)
        .bind(&log.provider_id)
        .bind(&log.combo_id)
        .bind(&log.model)
        .bind(&log.upstream_model)
        .bind(&log.method)
        .bind(&log.path)
        .bind(log.status as i64)
        .bind(log.latency_ms as i64)
        .bind(log.prompt_tokens as i64)
        .bind(log.completion_tokens as i64)
        .bind(log.total_tokens as i64)
        .bind(log.cost_usd)
        .bind(&log.error_code)
        .bind(log.created_at.to_rfc3339())
        .execute(self.pool)
        .await?;
        Ok(())
    }

    pub async fn count_since(&self, since: DateTime<Utc>) -> Result<i64, StorageError> {
        let n: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM request_logs WHERE created_at >= ?")
            .bind(since.to_rfc3339())
            .fetch_one(self.pool)
            .await?;
        Ok(n)
    }

    pub async fn recent(&self, limit: i64) -> Result<Vec<RequestLog>, StorageError> {
        let rows = sqlx::query(
            "SELECT id, request_id, user_id, workspace_id, provider_id, combo_id, model, \
                    upstream_model, method, path, status, latency_ms, prompt_tokens, \
                    completion_tokens, total_tokens, cost_usd, error_code, created_at \
             FROM request_logs ORDER BY created_at DESC LIMIT ?"
        )
        .bind(limit)
        .fetch_all(self.pool)
        .await?;
        let mut out = Vec::with_capacity(rows.len());
        for row in rows {
            let created_at: String = row.try_get("created_at")?;
            out.push(RequestLog {
                id: row.try_get("id")?,
                request_id: row.try_get("request_id")?,
                user_id: row.try_get("user_id")?,
                workspace_id: row.try_get("workspace_id")?,
                provider_id: row.try_get("provider_id")?,
                combo_id: row.try_get("combo_id")?,
                model: row.try_get("model")?,
                upstream_model: row.try_get("upstream_model")?,
                method: row.try_get("method")?,
                path: row.try_get("path")?,
                status: row.try_get::<i64, _>("status")? as u16,
                latency_ms: row.try_get::<i64, _>("latency_ms")? as u64,
                prompt_tokens: row.try_get::<i64, _>("prompt_tokens")? as u32,
                completion_tokens: row.try_get::<i64, _>("completion_tokens")? as u32,
                total_tokens: row.try_get::<i64, _>("total_tokens")? as u32,
                cost_usd: row.try_get("cost_usd")?,
                error_code: row.try_get("error_code")?,
                created_at: DateTime::parse_from_rfc3339(&created_at)
                    .map(|d| d.with_timezone(&Utc))
                    .unwrap_or_else(|_| Utc::now()),
            });
        }
        Ok(out)
    }
}
