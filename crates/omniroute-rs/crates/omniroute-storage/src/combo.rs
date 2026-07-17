//! Combo repository.

use crate::error::StorageError;
use chrono::{DateTime, Utc};
use omniroute_core::combo::{Combo, ComboStep};
use omniroute_core::routing::RoutingStrategy;
use sqlx::Row;
use sqlx::SqlitePool;

pub struct ComboRepo<'a> {
    pool: &'a SqlitePool,
}

impl<'a> ComboRepo<'a> {
    pub fn new(pool: &'a SqlitePool) -> Self { Self { pool } }

    pub async fn list_enabled(&self) -> Result<Vec<Combo>, StorageError> {
        let rows = sqlx::query(
            "SELECT id, name, description, logical_model, strategy, steps_json, enabled, \
                    tags_json, quality_gate_json, budget_usd_per_day, created_at, updated_at \
             FROM combos WHERE enabled = 1"
        )
        .fetch_all(self.pool)
        .await?;
        rows.into_iter().map(row_to_combo).collect()
    }

    pub async fn list(&self) -> Result<Vec<Combo>, StorageError> {
        let rows = sqlx::query(
            "SELECT id, name, description, logical_model, strategy, steps_json, enabled, \
                    tags_json, quality_gate_json, budget_usd_per_day, created_at, updated_at \
             FROM combos"
        )
        .fetch_all(self.pool)
        .await?;
        rows.into_iter().map(row_to_combo).collect()
    }

    pub async fn get(&self, id: &str) -> Result<Combo, StorageError> {
        let row = sqlx::query(
            "SELECT id, name, description, logical_model, strategy, steps_json, enabled, \
                    tags_json, quality_gate_json, budget_usd_per_day, created_at, updated_at \
             FROM combos WHERE id = ?"
        )
        .bind(id)
        .fetch_optional(self.pool)
        .await?
        .ok_or_else(|| StorageError::NotFound(format!("combo {id}")))?;
        row_to_combo(row)
    }

    pub async fn upsert(&self, c: &Combo) -> Result<(), StorageError> {
        let strategy = c.strategy.as_str();
        sqlx::query(
            "INSERT INTO combos (id, name, description, logical_model, strategy, steps_json, \
                    enabled, tags_json, quality_gate_json, budget_usd_per_day, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')) \
             ON CONFLICT(id) DO UPDATE SET \
                name=excluded.name, description=excluded.description, \
                logical_model=excluded.logical_model, strategy=excluded.strategy, \
                steps_json=excluded.steps_json, enabled=excluded.enabled, \
                tags_json=excluded.tags_json, quality_gate_json=excluded.quality_gate_json, \
                budget_usd_per_day=excluded.budget_usd_per_day, updated_at=datetime('now')"
        )
        .bind(&c.id)
        .bind(&c.name)
        .bind(&c.description)
        .bind(&c.logical_model)
        .bind(strategy)
        .bind(serde_json::to_string(&c.steps)?)
        .bind(c.enabled as i64)
        .bind(serde_json::to_string(&c.tags)?)
        .bind(serde_json::to_string(&c.quality_gate)?)
        .bind(c.budget_usd_per_day)
        .execute(self.pool)
        .await?;
        Ok(())
    }

    pub async fn delete(&self, id: &str) -> Result<(), StorageError> {
        let n = sqlx::query("DELETE FROM combos WHERE id = ?")
            .bind(id)
            .execute(self.pool)
            .await?
            .rows_affected();
        if n == 0 { return Err(StorageError::NotFound(format!("combo {id}"))); }
        Ok(())
    }

    pub async fn find_by_logical_model(&self, model: &str) -> Result<Vec<Combo>, StorageError> {
        let rows = sqlx::query(
            "SELECT id, name, description, logical_model, strategy, steps_json, enabled, \
                    tags_json, quality_gate_json, budget_usd_per_day, created_at, updated_at \
             FROM combos WHERE logical_model = ? AND enabled = 1"
        )
        .bind(model)
        .fetch_all(self.pool)
        .await?;
        rows.into_iter().map(row_to_combo).collect()
    }
}

fn row_to_combo(row: sqlx::sqlite::SqliteRow) -> Result<Combo, StorageError> {
    let steps_json: String = row.try_get("steps_json").unwrap_or_default();
    let tags_json: String = row.try_get("tags_json").unwrap_or_default();
    let qg_json: Option<String> = row.try_get("quality_gate_json").ok();
    let created_at: String = row.try_get("created_at").unwrap_or_default();
    let updated_at: String = row.try_get("updated_at").unwrap_or_default();
    let strategy: String = row.try_get("strategy")?;
    let strategy = match strategy.as_str() {
        "priority" => RoutingStrategy::Priority,
        "round_robin" => RoutingStrategy::RoundRobin,
        "weighted" => RoutingStrategy::Weighted,
        "cheapest" => RoutingStrategy::Cheapest,
        "lowest_latency" => RoutingStrategy::LowestLatency,
        "highest_quality" => RoutingStrategy::HighestQuality,
        "latency_budget" => RoutingStrategy::LatencyBudget,
        "custom" => RoutingStrategy::Custom,
        _ => RoutingStrategy::Priority,
    };
    Ok(Combo {
        id: row.try_get("id")?,
        name: row.try_get("name")?,
        description: row.try_get("description")?,
        logical_model: row.try_get("logical_model")?,
        strategy,
        steps: serde_json::from_str::<Vec<ComboStep>>(&steps_json).unwrap_or_default(),
        enabled: row.try_get::<i64, _>("enabled")? != 0,
        tags: serde_json::from_str(&tags_json).unwrap_or_default(),
        quality_gate: qg_json.and_then(|s| serde_json::from_str(&s).ok()),
        budget_usd_per_day: row.try_get("budget_usd_per_day").ok(),
        created_at: parse_dt(&created_at),
        updated_at: parse_dt(&updated_at),
    })
}

fn parse_dt(s: &str) -> DateTime<Utc> {
    DateTime::parse_from_rfc3339(s)
        .map(|d| d.with_timezone(&Utc))
        .unwrap_or_else(|_| {
            chrono::NaiveDateTime::parse_from_str(s, "%Y-%m-%d %H:%M:%S")
                .map(|d| d.and_utc())
                .unwrap_or_else(|_| Utc::now())
        })
}
