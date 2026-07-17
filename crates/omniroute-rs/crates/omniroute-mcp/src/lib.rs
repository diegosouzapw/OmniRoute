//! omniroute-mcp: Model Context Protocol server.
//!
//! Supports:
//! - stdio transport
//! - Streamable HTTP transport (MCP 2025-03-26 spec)
//!
//! Built-in tools (29 in the TS implementation, ported incrementally):
//! - workspace, entity, relationship, query, workflow, memory,
//!   skill, policy, guardrail, etc.

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod jsonrpc;
pub mod server;
pub mod stdio;
pub mod streamable_http;
pub mod tools;

pub use server::McpServer;

#[cfg(test)]
mod tests {
    #[test]
    fn placeholder() { assert!(true); }
}
