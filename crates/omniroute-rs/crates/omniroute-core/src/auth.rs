//! Auth types (user, session, claims).

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum AuthMethod {
    ApiKey,
    Session,
    Jwt,
    Oidc,
    Anonymous,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct Identity {
    /// Subject (user id, api key id, etc.).
    pub subject: String,
    /// Display name (optional).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    /// Auth method used.
    pub method: AuthMethod,
    /// Optional workspace id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub workspace_id: Option<String>,
    /// Scopes (e.g. "chat:write", "models:read").
    #[serde(default)]
    pub scopes: Vec<String>,
    /// Issued at.
    pub issued_at: DateTime<Utc>,
    /// Expires at (optional for API keys without expiry).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub expires_at: Option<DateTime<Utc>>,
    /// Request id (tracing).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub request_id: Option<String>,
}

impl Identity {
    /// Anonymous identity.
    pub fn anonymous() -> Self {
        Self {
            subject: "anonymous".into(),
            name: None,
            method: AuthMethod::Anonymous,
            workspace_id: None,
            scopes: vec![],
            issued_at: Utc::now(),
            expires_at: None,
            request_id: None,
        }
    }

    /// True if the identity has the given scope.
    pub fn has_scope(&self, scope: &str) -> bool {
        self.scopes.iter().any(|s| s == scope || s == "*")
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn has_scope_star() {
        let mut i = Identity::anonymous();
        i.scopes = vec!["*".into()];
        assert!(i.has_scope("chat:write"));
    }

    #[test]
    fn has_scope_specific() {
        let mut i = Identity::anonymous();
        i.scopes = vec!["chat:write".into()];
        assert!(i.has_scope("chat:write"));
        assert!(!i.has_scope("models:delete"));
    }
}
