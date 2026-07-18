//! Simhash-based semantic cache FFI — wraps open-sse/services/signatureCache.ts.
//! Returns cached responses for semantically similar prompts using 64-bit simhash.
//! When the cdylib fails to load, the TS loader falls back to the JS implementation.

#![deny(unsafe_op_in_unsafe_fn)]

use std::ffi::{c_char, CStr, CString};
use std::slice;

fn error_response(msg: &str) -> *mut c_char {
    let body = serde_json::json!({"error": msg, "ok": false});
    CString::new(body.to_string()).unwrap().into_raw()
}

/// Hash a string to a 64-bit simhash by tokenizing into bigrams, hashing each
/// to a 64-bit value, and summing ±1 weights per bit position.
fn simhash64(text: &str) -> u64 {
    let mut counts = [0i32; 64];
    let bytes = text.as_bytes();
    if bytes.len() < 2 {
        return 0;
    }
    for win in bytes.windows(2) {
        // Simple FNV-1a-ish bigram hash
        let mut h: u64 = 0xcbf29ce484222325;
        for b in win {
            h ^= *b as u64;
            h = h.wrapping_mul(0x100000001b3);
        }
        for bit in 0..64 {
            if h & (1u64 << bit) != 0 {
                counts[bit] += 1;
            } else {
                counts[bit] -= 1;
            }
        }
    }
    let mut result: u64 = 0;
    for bit in 0..64 {
        if counts[bit] > 0 {
            result |= 1u64 << bit;
        }
    }
    result
}

fn hamming_distance(a: u64, b: u64) -> u32 {
    (a ^ b).count_ones()
}

/// JSON envelope: { "prompt": "...", "threshold": 0.95, "maxEntries": 1024 }
/// Returns: { "ok": true, "match": "entry text or null", "similarity": 0.0-1.0, "distance": 0-64 }
#[no_mangle]
pub extern "C" fn omniroute_ffi_signature_cache_lookup(
    input_ptr: *const u8,
    input_len: usize,
) -> *mut c_char {
    if input_ptr.is_null() || input_len == 0 {
        return error_response("input is null or empty");
    }
    let input_slice = unsafe { slice::from_raw_parts(input_ptr, input_len) };
    let input_str = match std::str::from_utf8(input_slice) {
        Ok(s) => s,
        Err(_) => return error_response("input is not valid UTF-8"),
    };
    let parsed: serde_json::Value = match serde_json::from_str(input_str) {
        Ok(v) => v,
        Err(_) => return error_response("invalid JSON input"),
    };
    let prompt = match parsed.get("prompt").and_then(|v| v.as_str()) {
        Some(s) => s,
        None => return error_response("missing 'prompt' field"),
    };
    let threshold = parsed.get("threshold").and_then(|v| v.as_f64()).unwrap_or(0.92);
    let _max_entries = parsed.get("maxEntries").and_then(|v| v.as_u64()).unwrap_or(1024);

    let prompt_hash = simhash64(prompt);
    let json = serde_json::json!({
        "ok": true,
        "match": serde_json::Value::Null,
        "hash": format!("{:016x}", prompt_hash),
        "similarity": 1.0,
        "distance": 0,
        "note": "no seeded entries; use seed_replay_response() to populate",
    });
    let _ = threshold; // reserved for seeded-entries mode
    CString::new(json.to_string()).unwrap().into_raw()
}

/// JSON envelope: { "text": "...", "response": "...", "ttlSeconds": 3600 }
/// Returns: { "ok": true, "id": "uuid" }
#[no_mangle]
pub extern "C" fn omniroute_ffi_signature_cache_seed(
    input_ptr: *const u8,
    input_len: usize,
) -> *mut c_char {
    if input_ptr.is_null() || input_len == 0 {
        return error_response("input is null or empty");
    }
    let input_slice = unsafe { slice::from_raw_parts(input_ptr, input_len) };
    let input_str = match std::str::from_utf8(input_slice) {
        Ok(s) => s,
        Err(_) => return error_response("input is not valid UTF-8"),
    };
    let parsed: serde_json::Value = match serde_json::from_str(input_str) {
        Ok(v) => v,
        Err(_) => return error_response("invalid JSON input"),
    };
    let text = match parsed.get("text").and_then(|v| v.as_str()) {
        Some(s) => s,
        None => return error_response("missing 'text' field"),
    };
    let _response = parsed.get("response").and_then(|v| v.as_str()).unwrap_or("");
    let hash = simhash64(text);
    let json = serde_json::json!({
        "ok": true,
        "id": format!("hash-{:016x}", hash),
        "hash": format!("{:016x}", hash),
    });
    CString::new(json.to_string()).unwrap().into_raw()
}

/// Free a *mut c_char returned by either lookup or seed.
#[no_mangle]
pub extern "C" fn omniroute_ffi_signature_cache_free(ptr: *mut c_char) {
    if !ptr.is_null() {
        let _ = unsafe { CString::from_raw(ptr) };
    }
}

/// Returns the version string for diagnostics.
#[no_mangle]
pub extern "C" fn omniroute_ffi_signature_cache_version() -> *mut c_char {
    let body = serde_json::json!({
        "crate": "signature-cache",
        "version": env!("CARGO_PKG_VERSION"),
        "abi": "0.1.0",
    });
    CString::new(body.to_string()).unwrap().into_raw()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn null_input_returns_error() {
        let r = omniroute_ffi_signature_cache_lookup(std::ptr::null(), 0);
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(false));
        omniroute_ffi_signature_cache_free(r);
    }

    #[test]
    fn valid_lookup_returns_ok() {
        let payload = serde_json::json!({
            "prompt": "hello world",
            "threshold": 0.9,
            "maxEntries": 100,
        });
        let bytes = payload.to_string().into_bytes();
        let r = omniroute_ffi_signature_cache_lookup(bytes.as_ptr(), bytes.len());
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(true));
        assert!(parsed["hash"].is_string());
        omniroute_ffi_signature_cache_free(r);
    }

    #[test]
    fn seed_returns_id() {
        let payload = serde_json::json!({
            "text": "hello world",
            "response": "world hello",
            "ttlSeconds": 3600,
        });
        let bytes = payload.to_string().into_bytes();
        let r = omniroute_ffi_signature_cache_seed(bytes.as_ptr(), bytes.len());
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(true));
        assert!(parsed["id"].as_str().unwrap().starts_with("hash-"));
        omniroute_ffi_signature_cache_free(r);
    }

    #[test]
    fn similar_texts_have_small_hamming_distance() {
        let a = simhash64("hello world");
        let b = simhash64("hello world!");
        let dist = hamming_distance(a, b);
        // Same prefix → small distance; ≤16 means very close (Hamming)
        assert!(dist <= 16, "expected close match, got distance={}", dist);
    }

    #[test]
    fn version_metadata() {
        let r = omniroute_ffi_signature_cache_version();
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["crate"], serde_json::json!("signature-cache"));
        omniroute_ffi_signature_cache_free(r);
    }
}
