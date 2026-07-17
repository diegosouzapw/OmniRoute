//! Stub: config_audit repository. Will be expanded.

use crate::error::StorageError;
use sqlx::SqlitePool;

pub struct Repo<'a> { pool: &'a SqlitePool }

impl<'a> Repo<'a> {
    pub fn new(pool: &'a SqlitePool) -> Self { Self { pool } }
    pub async fn ping(&self) -> Result<(), StorageError> {
        sqlx::query("SELECT 1").execute(self.pool).await?;
        Ok(())
    }
}
