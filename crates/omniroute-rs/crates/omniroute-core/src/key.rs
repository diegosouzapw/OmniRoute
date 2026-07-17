//! API key types.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ApiKeyStatus {
    Active,
    Suspended,
    Revoked,
    Expired,
}

impl Default for ApiKeyStatus {
    fn default() -> Self { Self::Active }
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ApiKey {
    /// Stable id (ULID).
    pub id: String,
    /// Display name.
    pub name: String,
    /// Hashed key (argon2id). Plaintext is never stored.
    pub key_hash: String,
    /// Last 4 chars (display only).
    pub last4: String,
    /// Scopes.
    #[serde(default)]
    pub scopes: Vec<String>,
    /// Status.
    pub status: ApiKeyStatus,
    /// Optional user id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub user_id: Option<String>,
    /// Optional workspace id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub workspace_id: Option<String>,
    /// Optional expiry.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub expires_at: Option<DateTime<Utc>>,
    /// Optional last-used timestamp.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub last_used_at: Option<DateTime<Utc>>,
    /// Optional rate limit override (req/sec).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub rate_limit_rps: Option<u32>,
    /// Created at.
    pub created_at: DateTime<Utc>,
}

impl ApiKey {
    /// True if the key is currently usable.
    pub fn is_active(&self) -> bool {
        if self.status != ApiKeyStatus::Active {
            return false;
        }
        if let Some(exp) = self.expires_at {
            if exp < Utc::now() {
                return false;
            }
        }
        true
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn active_key_is_active() {
        let k = ApiKey {
            id: "x".into(),
            name: "k".into(),
            key_hash: "h".into(),
            last4: "1234".into(),
            scopes: vec![],
            status: ApiKeyStatus::Active,
            user_id: None,
            workspace_id: None,
            expires_at: None,
            last_used_at: None,
            rate_limit_rps: None,
            created_at: Utc::now(),
        };
        assert!(k.is_active());
    }

    #[test]
    fn revoked_key_is_not_active() {
        let mut k = ApiKey {
            id: "x".into(),
            name: "k".into(),
            key_hash: "h".into(),
            last4: "1234".into(),
            scopes: vec![],
            status: ApiKeyStatus::Active,
            user_id: None,
            workspace_id: None,
            expires_at: None,
            last_used_at: None,
            rate_limit_rps: None,
            created_at: Utc::now(),
        };
        k.status = ApiKeyStatus::Revoked;
        assert!(!k.is_active());
    }
}
