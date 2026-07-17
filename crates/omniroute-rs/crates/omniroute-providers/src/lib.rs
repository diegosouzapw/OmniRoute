//! omniroute-providers: provider adapters and format translation.
//!
//! Built-in providers:
//! - OpenAI Chat Completions
//! - OpenAI Responses API
//! - Anthropic Messages
//! - Google Gemini
//! - Mistral
//! - Groq (OpenAI-compat)
//! - Ollama (OpenAI-compat)
//! - Custom OpenAI-compatible base URL
//!
//! Format translation is schema-driven: each provider implements the
//! `Provider` trait from `omniroute-core` and is responsible for translating
//! the canonical request/response into the provider's wire format.

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod anthropic;
pub mod executor;
pub mod format;
pub mod gemini;
pub mod ollama;
pub mod openai;
pub mod openai_responses;
pub mod registry;
pub mod mistral;
pub mod groq;
pub mod custom_openai;

pub use executor::Executor;
pub use registry::ProviderRegistryExt;

#[cfg(test)]
mod tests {
    #[test]
    fn placeholder() { assert!(true); }
}
