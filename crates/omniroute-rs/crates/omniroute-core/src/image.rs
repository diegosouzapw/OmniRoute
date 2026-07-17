//! OpenAI-compatible image generation types.

use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema, Default)]
#[serde(rename_all = "lowercase")]
pub enum ImageSize {
    /// 256x256.
    #[default]
    Size256,
    /// 512x512.
    Size512,
    /// 1024x1024.
    Size1024,
    /// 1792x1024.
    Size1792x1024,
    /// 1024x1792.
    Size1024x1792,
}

impl ImageSize {
    /// Wire-shaped string.
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Size256 => "256x256",
            Self::Size512 => "512x512",
            Self::Size1024 => "1024x1024",
            Self::Size1792x1024 => "1792x1024",
            Self::Size1024x1792 => "1024x1792",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema, Default)]
#[serde(rename_all = "lowercase")]
pub enum ImageResponseFormat {
    #[default]
    Url,
    B64Json,
}

/// OpenAI-compatible image generation request.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
pub struct ImageRequest {
    /// Model id (e.g. "dall-e-3", "gpt-image-1").
    pub model: String,
    /// Prompt.
    pub prompt: String,
    /// Number of images.
    #[serde(default = "default_n")]
    pub n: u32,
    /// Image size.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub size: Option<ImageSize>,
    /// Response format.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub response_format: Option<ImageResponseFormat>,
    /// User id.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub user: Option<String>,
    /// Quality.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub quality: Option<String>,
    /// Style.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub style: Option<String>,
    /// Optional background ("transparent" for gpt-image-1).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub background: Option<String>,
    /// Optional moderation level.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub moderation: Option<String>,
    /// Optional output compression.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub output_compression: Option<u32>,
    /// Optional output format (png, jpeg, webp).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub output_format: Option<String>,
}

fn default_n() -> u32 { 1 }

/// OpenAI-compatible image response.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct ImageResponse {
    /// Unix epoch seconds.
    pub created: i64,
    /// Data (list of image objects).
    pub data: Vec<ImageData>,
    /// Usage.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub usage: Option<ImageUsage>,
}

/// A single generated image.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(tag = "object", rename_all = "snake_case")]
pub enum ImageData {
    /// Image as URL.
    ImageUrl {
        /// URL.
        url: String,
        /// Revised prompt (if the model revised it).
        #[serde(default, skip_serializing_if = "Option::is_none")]
        revised_prompt: Option<String>,
    },
    /// Image as base64.
    ImageB64 {
        /// Base64-encoded image bytes.
        b64_json: String,
        /// Revised prompt (if the model revised it).
        #[serde(default, skip_serializing_if = "Option::is_none")]
        revised_prompt: Option<String>,
    },
}

/// Image generation usage.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
pub struct ImageUsage {
    /// Prompt tokens.
    #[serde(default)]
    pub prompt_tokens: u32,
    /// Completion tokens.
    #[serde(default)]
    pub completion_tokens: u32,
    /// Total tokens.
    #[serde(default)]
    pub total_tokens: u32,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn size_str() {
        assert_eq!(ImageSize::Size1024.as_str(), "1024x1024");
        assert_eq!(ImageSize::Size1792x1024.as_str(), "1792x1024");
    }

    #[test]
    fn request_default_n_is_1() {
        let r = ImageRequest::default();
        let v = serde_json::to_value(&r).unwrap();
        assert_eq!(v["n"], 1);
    }
}
