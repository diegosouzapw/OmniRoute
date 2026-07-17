//! omniroute-bifrost: client to the upstream Go tier-1 (Bifrost).
//!
//! ADR-031 commits OmniRoute to a 2-tier architecture where Tier-1 is
//! the Go-based Bifrost gateway. This crate provides the Rust client used
//! to talk to Bifrost's HTTP API when the local Rust gateway needs to
//! delegate provider dispatch, virtual keys, budget management, or
//! semantic cache.
//!
//! When Bifrost is not configured, the local Rust gateway handles
//! everything via `omniroute-providers` directly.

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod client;
pub mod config;

pub use client::BifrostClient;
pub use config::BifrostConfig;

#[cfg(test)]
mod tests {
    #[test]
    fn placeholder() { assert!(true); }
}
