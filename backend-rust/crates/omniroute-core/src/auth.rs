//! API key, scope, and tier types.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::fmt;
use uuid::Uuid;

/// API key id (UUID; matches the TypeScript schema).
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct ApiKeyId(pub Uuid);

impl ApiKeyId {
    pub fn new() -> Self {
        Self(Uuid::new_v4())
    }
}

impl Default for ApiKeyId {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for ApiKeyId {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

/// Permission scope.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum KeyScope {
    /// Read-only operations (list models, get usage, etc.).
    Read,
    /// Standard chat / completions / embeddings.
    Chat,
    /// Image / audio / video generation.
    Media,
    /// MCP tool invocations.
    Mcp,
    /// A2A / agent task operations.
    Agent,
    /// Admin (CRUD on API keys, accounts, providers, etc.).
    Admin,
    /// No auth (public / passthrough).
    Public,
}

impl KeyScope {
    pub fn allows(self, other: KeyScope) -> bool {
        use KeyScope::*;
        match (self, other) {
            (Admin, _) => true,
            (Agent, Admin) => false,
            (Agent, Mcp) | (Agent, Chat) | (Agent, Media) | (Agent, Agent) | (Agent, Read) => true,
            (Mcp, Mcp) | (Mcp, Read) => true,
            (Media, Media) | (Media, Read) => true,
            (Chat, Chat) | (Chat, Read) => true,
            (Read, Read) => true,
            (Public, Public) => true,
            _ => false,
        }
    }
}

/// Per-key tier.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum KeyTier {
    /// Free tier.
    Free,
    /// Standard paid tier.
    Standard,
    /// Pro tier.
    Pro,
    /// Enterprise tier (no rate limit; custom quotas).
    Enterprise,
}

impl KeyTier {
    pub fn default_rpm(self) -> u32 {
        match self {
            Self::Free => 60,
            Self::Standard => 600,
            Self::Pro => 3000,
            Self::Enterprise => 60_000,
        }
    }
    pub fn default_tpm(self) -> u32 {
        match self {
            Self::Free => 60_000,
            Self::Standard => 1_000_000,
            Self::Pro => 10_000_000,
            Self::Enterprise => u32::MAX,
        }
    }
}

/// Health state of a key.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum KeyHealth {
    /// Healthy.
    Healthy,
    /// Soft-warned (recent 4xx but not enough to disable).
    Warned,
    /// Disabled (cooldown, exhausted, banned).
    Disabled,
    /// In a manual cooldown window.
    Cooldown,
}

impl KeyHealth {
    pub fn is_usable(self) -> bool {
        matches!(self, Self::Healthy | Self::Warned)
    }
}

/// An API key record.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ApiKey {
    pub id: ApiKeyId,
    pub name: String,
    /// SHA-256 of the API key (we never store the secret).
    pub key_hash: String,
    /// Last 4 chars (for display).
    pub key_preview: String,
    pub tier: KeyTier,
    pub scopes: Vec<KeyScope>,
    /// Optional owner (user id).
    pub owner_id: Option<Uuid>,
    /// Optional allowed-models allowlist.
    pub allowed_models: Option<Vec<String>>,
    /// Optional allowed-combos allowlist.
    pub allowed_combos: Option<Vec<String>>,
    /// Health state.
    pub health: KeyHealth,
    /// Cooldown until (if any).
    pub cooldown_until: Option<DateTime<Utc>>,
    /// Daily quota exhausted flag.
    pub daily_quota_exhausted: bool,
    /// Created at.
    pub created_at: DateTime<Utc>,
    /// Last used at.
    pub last_used_at: Option<DateTime<Utc>>,
    /// Revoked at (if any).
    pub revoked_at: Option<DateTime<Utc>>,
}

impl ApiKey {
    pub fn is_active(&self) -> bool {
        self.revoked_at.is_none() && self.health.is_usable()
    }
}
