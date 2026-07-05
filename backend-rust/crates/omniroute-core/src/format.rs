//! Provider wire-format taxonomy.
//!
//! OmniRoute speaks many upstream protocols. We normalize to a canonical
//! `Format` enum so the rest of the pipeline can switch on it without
//! caring about the upstream's quirks.

use serde::{Deserialize, Serialize};
use std::fmt;
use std::str::FromStr;

/// The wire format the upstream provider speaks for chat / completion APIs.
#[derive(
    Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize,
)]
#[serde(rename_all = "lowercase")]
pub enum Format {
    /// OpenAI /v1/chat/completions shape (also used by 100+ compatible providers).
    Openai,
    /// Anthropic /v1/messages shape.
    Anthropic,
    /// Google Gemini generateContent shape.
    Gemini,
    /// Cohere /v1/chat shape.
    Cohere,
    /// AWS Bedrock Converse / InvokeModel shape.
    Bedrock,
    /// OpenAI /v1/responses shape (the newer Responses API).
    Responses,
    /// A provider that needs no real translation (pass-through; e.g. providers
    /// that already speak the OpenAI dialect verbatim).
    PassThrough,
}

impl Format {
    pub const ALL: &'static [Format] = &[
        Self::Openai,
        Self::Anthropic,
        Self::Gemini,
        Self::Cohere,
        Self::Bedrock,
        Self::Responses,
        Self::PassThrough,
    ];

    pub fn as_str(self) -> &'static str {
        match self {
            Self::Openai => "openai",
            Self::Anthropic => "anthropic",
            Self::Gemini => "gemini",
            Self::Cohere => "cohere",
            Self::Bedrock => "bedrock",
            Self::Responses => "responses",
            Self::PassThrough => "passthrough",
        }
    }
}

impl fmt::Display for Format {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_str())
    }
}

impl FromStr for Format {
    type Err = String;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_ascii_lowercase().as_str() {
            "openai" | "openai-chat" => Ok(Self::Openai),
            "anthropic" | "claude" => Ok(Self::Anthropic),
            "gemini" | "google" => Ok(Self::Gemini),
            "cohere" => Ok(Self::Cohere),
            "bedrock" | "aws" => Ok(Self::Bedrock),
            "responses" | "openai-responses" => Ok(Self::Responses),
            "passthrough" | "raw" => Ok(Self::PassThrough),
            other => Err(format!("unknown format: {other}")),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn round_trip() {
        for f in Format::ALL {
            let s = f.to_string();
            let parsed: Format = s.parse().unwrap();
            assert_eq!(parsed, *f);
        }
    }

    #[test]
    fn alias_openai() {
        assert_eq!("openai-chat".parse::<Format>().unwrap(), Format::Openai);
        assert_eq!("OpenAI".parse::<Format>().unwrap(), Format::Openai);
    }

    #[test]
    fn alias_anthropic() {
        assert_eq!("claude".parse::<Format>().unwrap(), Format::Anthropic);
    }

    #[test]
    fn unknown() {
        assert!("not-a-format".parse::<Format>().is_err());
    }
}
