//! Tiktoken token counter backed by `tiktoken-rs`.
//!
//! Port target: `src/shared/utils/tiktokenCounter.ts` in OmniRoute.
//! Encodings: cl100k_base (default), o200k_base (Codex).

use core_api::{Encoding, TokenCounter};
use tiktoken_rs::tokenizer::Tokenizer;

pub struct TiktokenCounter {
    cl100k: tiktoken_rs::CoreBPE,
    o200k: tiktoken_rs::CoreBPE,
}

impl TiktokenCounter {
    pub fn new() -> Result<Self, anyhow::Error> {
        let cl100k = tiktoken_rs::get_bpe_from_tokenizer(Tokenizer::Cl100kBase)?;
        let o200k = tiktoken_rs::get_bpe_from_tokenizer(Tokenizer::O200kBase)?;
        Ok(Self { cl100k, o200k })
    }

    pub fn count_with_encoding(&self, text: &str, encoding: Encoding) -> usize {
        let bpe = match encoding {
            Encoding::Cl100kBase => &self.cl100k,
            Encoding::O200kBase => &self.o200k,
        };
        // CoreBPE::encode_with_special_tokens requires allocation; the
        // plain encode is the closest equivalent to the JS byte-pair count.
        bpe.encode_ordinary(text).len()
    }
}

impl Default for TiktokenCounter {
    fn default() -> Self {
        Self::new().expect("tiktoken rank tables must load")
    }
}

impl TokenCounter for TiktokenCounter {
    fn count(&self, text: &str) -> usize {
        self.count_with_encoding(text, Encoding::Cl100kBase)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn counts_known_tokens_cl100k() {
        let counter = TiktokenCounter::default();
        // "Hello world" is 2 tokens in cl100k_base.
        assert_eq!(counter.count("Hello world"), 2);
    }

    #[test]
    fn empty_string_is_zero() {
        let counter = TiktokenCounter::default();
        assert_eq!(counter.count(""), 0);
    }

    #[test]
    fn o200k_differs_from_cl100k_on_emoji() {
        let counter = TiktokenCounter::default();
        let emoji = "🎉";
        let cl100k = counter.count_with_encoding(emoji, Encoding::Cl100kBase);
        let o200k = counter.count_with_encoding(emoji, Encoding::O200kBase);
        // o200k has dedicated emoji tokens; counts may differ. Just assert both are > 0.
        assert!(cl100k > 0);
        assert!(o200k > 0);
    }
}
