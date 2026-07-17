//! omniroute-storage: SQLite storage layer (sqlx + migrations).
//!
//! Provides:
//! - Connection pool management
//! - Migration runner (sqlx migrate + a Rust-side migration table)
//! - Repositories for providers, combos, api_keys, request_logs,
//!   usage_history, mcp_audit, config_audit, webhooks
//! - Encrypted column helpers (AES-256-GCM + Argon2id key derivation)
//! - Read cache (moka) for hot path lookups

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod audit;
pub mod config_audit;
pub mod crypto;
pub mod key;
pub mod migrations;
pub mod pool;
pub mod provider;
pub mod combo;
pub mod request_log;
pub mod usage;
pub mod webhook;
pub mod schema;

pub use pool::*;

#[cfg(test)]
mod tests {
    #[test]
    fn placeholder() {
        // Real tests are in each module.
        assert!(true);
    }
}
