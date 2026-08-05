//! N-API binding crate (integration phase).
//!
//! This crate is intentionally empty until the N-API phase. It will expose
//! `count_tokens` / `compress` over napi-rs using the core-api traits, so the
//! algorithms in `tokenizer` and the future `compression` crates stay free of
//! any Node bindings.

pub use core_api;
