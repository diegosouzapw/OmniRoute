//! omniroute-cli: command-line interface (clap v4).
//!
//! Subcommands:
//! - `start`    — start the daemon
//! - `stop`     — stop the daemon
//! - `status`   — show daemon status
//! - `config`   — show / edit / validate config
//! - `db`       — database operations (migrate, vacuum, backup, restore)
//! - `doctor`   — diagnose the install
//! - `version`  — print version
//! - `serve`    — run the API server in the foreground
//! - `mcp`      — start the MCP server over stdio
//! - `reset-password` — recovery for broken encrypted credentials

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod cli;
pub mod config_cmd;
pub mod db_cmd;
pub mod doctor;
pub mod runtime;
pub mod serve;
pub mod status;
pub mod version;

pub use cli::{run, Cli, Command};
