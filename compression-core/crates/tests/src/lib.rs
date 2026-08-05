//! Golden tests: run the Rust implementations against fixtures and compare
//! byte-for-byte with the JS-produced `expected/` files.
//!
//! The `verify-golden.ts` script regenerates fixtures from the OmniRoute JS
//! implementation. Until this crate passes 100% of golden fixtures, the JS
//! implementation must NOT be replaced in production.

use core_api::{Encoding, TokenCounter};
use std::path::Path;
use tokenizer::TiktokenCounter;

const FIXTURES_DIR: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/../../fixtures");

fn fixture_path(relative: &str) -> String {
    Path::new(FIXTURES_DIR).join(relative).to_string_lossy().into_owned()
}

#[test]
fn tokenizer_golden_cl100k() {
    let counter = TiktokenCounter::default();
    let dir = fixture_path("tokenizer");
    let entries = std::fs::read_dir(&dir).expect("fixtures/tokenizer must exist");
    let mut checked = 0;
    for entry in entries {
        let path = entry.unwrap().path();
        if path.extension().map(|e| e == "json").unwrap_or(false) {
            let input: serde_json::Value =
                serde_json::from_str(&std::fs::read_to_string(&path).unwrap()).unwrap();
            let text = input["text"].as_str().unwrap();
            let expected = input["cl100k_tokens"].as_u64().unwrap() as usize;
            assert_eq!(
                counter.count(text),
                expected,
                "cl100k mismatch on {}",
                path.display()
            );
            checked += 1;
        }
    }
    assert!(checked > 0, "no tokenizer fixtures found");
}

#[test]
fn tokenizer_golden_o200k() {
    let counter = TiktokenCounter::default();
    let dir = fixture_path("tokenizer");
    let entries = std::fs::read_dir(&dir).expect("fixtures/tokenizer must exist");
    let mut checked = 0;
    for entry in entries {
        let path = entry.unwrap().path();
        if path.extension().map(|e| e == "json").unwrap_or(false) {
            let input: serde_json::Value =
                serde_json::from_str(&std::fs::read_to_string(&path).unwrap()).unwrap();
            let text = input["text"].as_str().unwrap();
            let expected = input["o200k_tokens"].as_u64().unwrap() as usize;
            assert_eq!(
                counter.count_with_encoding(text, Encoding::O200kBase),
                expected,
                "o200k mismatch on {}",
                path.display()
            );
            checked += 1;
        }
    }
    assert!(checked > 0, "no tokenizer fixtures found");
}
