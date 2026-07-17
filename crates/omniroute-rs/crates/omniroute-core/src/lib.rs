//! omniroute-core: zero-I/O domain types, traits, and errors.
//!
//! This crate is the foundation of the OmniRoute Rust rewrite. It contains
//! only pure data definitions, traits, and the error model. No I/O,
//! no async, no database, no network.
//!
//! The shape of the public API mirrors the OpenAI Chat Completions / Responses
//! surface so the Rust rewrite is wire-compatible with every existing client.

#![deny(unsafe_code)]
#![deny(rustdoc::broken_intra_doc_links)]
#![warn(missing_docs)]

pub mod auth;
pub mod chat;
pub mod combo;
pub mod compression;
pub mod embedding;
pub mod error;
pub mod image;
pub mod key;
pub mod mcp;
pub mod provider;
pub mod rerank;
pub mod request_log;
pub mod response;
pub mod routing;
pub mod stream;
pub mod usage;

pub use chat::*;
pub use combo::*;
pub use compression::*;
pub use embedding::*;
pub use error::*;
pub use image::*;
pub use key::*;
pub use mcp::*;
pub use provider::*;
pub use request_log::*;
pub use response::*;
pub use routing::*;
pub use stream::*;
pub use usage::*;

/// Crate version, derived from the workspace.
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

/// Crate name.
pub const CRATE_NAME: &str = env!("CARGO_PKG_NAME");

/// Default HTTP user agent.
pub const DEFAULT_USER_AGENT: &str = concat!("OmniRoute/", env!("CARGO_PKG_VERSION"));

/// Default request id header name.
pub const REQUEST_ID_HEADER: &str = "x-request-id";

/// Default traceparent header name.
pub const TRACEPARENT_HEADER: &str = "traceparent";
