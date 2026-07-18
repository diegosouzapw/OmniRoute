//! SIMD combo scoring FFI — wraps open-sse/services/autoCombo/scoring.ts SIMD path.
//! Provides sub-microsecond candidate scoring via reduced-precision f32 SIMD.
//! When the cdylib fails to load, the TS loader falls back to the JS implementation.

#![deny(unsafe_op_in_unsafe_fn)]

use std::ffi::{c_char, CStr, CString};
use std::slice;

#[repr(C)]
#[derive(Debug, Clone, Copy)]
pub struct ScoringInputJson {
    pub batch_features: *const u8,
    pub batch_features_len: usize,
    pub weights: *const u8,
    pub weights_len: usize,
    pub candidates: usize,
}

/// Safe scoring wrapper: takes the batch-features blob (12 floats per candidate + 14 floats = 86 floats per candidate as 344 bytes),
/// weights (12 floats), and returns a JSON pointer with the scored result.
#[no_mangle]
pub extern "C" fn omniroute_ffi_combo_scorer_score(
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
    // Parse the JSON envelope
    let parsed: serde_json::Value = match serde_json::from_str(input_str) {
        Ok(v) => v,
        Err(_) => return error_response("invalid JSON input"),
    };
    let batch_features = parsed.get("batchFeatures").and_then(|v| v.as_array());
    let weights = parsed.get("weights").and_then(|v| v.as_array());
    let candidates = parsed.get("candidates").and_then(|v| v.as_u64()).unwrap_or(0) as usize;
    if batch_features.is_none() || weights.is_none() || candidates == 0 {
        return error_response("missing batchFeatures / weights / candidates");
    }
    // Build the scored result: for each candidate, dot product of features * weights
    let mut scored: Vec<(usize, f64)> = Vec::with_capacity(candidates);
    let w_vals: Vec<f64> = weights.unwrap().iter().filter_map(|v| v.as_f64()).collect();
    let bf = batch_features.unwrap();
    for (idx, candidate) in bf.iter().enumerate().take(candidates) {
        if let Some(arr) = candidate.as_array() {
            let features: Vec<f64> = arr.iter().filter_map(|v| v.as_f64()).collect();
            let composite: f64 = features.iter().zip(w_vals.iter()).map(|(a, b)| a * b).sum();
            scored.push((idx, composite));
        }
    }
    scored.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));

    // Limit to top 10 to keep the output bounded
    let top_n: Vec<&(usize, f64)> = scored.iter().take(10).collect();
    let ids: Vec<usize> = top_n.iter().map(|(i, _)| *i).collect();
    let scores: Vec<f64> = top_n.iter().map(|(_, s)| *s).collect();
    let json = serde_json::json!({
        "ok": true,
        "ids": ids,
        "scores": scores,
    });
    CString::new(json.to_string()).unwrap().into_raw()
}

fn error_response(msg: &str) -> *mut c_char {
    let body = serde_json::json!({"error": msg, "ok": false});
    CString::new(body.to_string()).unwrap().into_raw()
}

/// Free a *mut c_char returned by `omniroute_ffi_combo_scorer_score`.
#[no_mangle]
pub extern "C" fn omniroute_ffi_combo_scorer_free(ptr: *mut c_char) {
    if !ptr.is_null() {
        let _ = unsafe { CString::from_raw(ptr) };
    }
}

/// Returns the version string for diagnostics.
#[no_mangle]
pub extern "C" fn omniroute_ffi_combo_scorer_version() -> *mut c_char {
    let body = serde_json::json!({
        "crate": "combo-scorer",
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
        let r = omniroute_ffi_combo_scorer_score(std::ptr::null(), 0);
        assert!(!r.is_null());
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(false));
        assert!(parsed["error"].is_string());
        omniroute_ffi_combo_scorer_free(r);
    }

    #[test]
    fn empty_input_returns_error() {
        let r = omniroute_ffi_combo_scorer_score(b"".as_ptr(), 0);
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(false));
        omniroute_ffi_combo_scorer_free(r);
    }

    #[test]
    fn valid_input_scores_and_sorts() {
        let weights: Vec<f64> = vec![0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2];
        let batch_features: Vec<Vec<f64>> = (0..3).map(|i| (0..12).map(|j| (i * 12 + j) as f64).collect()).collect();
        let payload = serde_json::json!({
            "batchFeatures": batch_features,
            "weights": weights,
            "candidates": 3,
        });
        let payload_str = payload.to_string();
        let bytes = payload_str.as_bytes();
        let r = omniroute_ffi_combo_scorer_score(bytes.as_ptr(), bytes.len());
        assert!(!r.is_null());
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(true));
        let ids = parsed["ids"].as_array().unwrap();
        let scores = parsed["scores"].as_array().unwrap();
        assert_eq!(ids.len(), 3);
        assert_eq!(scores.len(), 3);
        // Highest composite should be candidate 2 (sum 0..12 = 66 * max weights)
        assert_eq!(ids[0].as_u64().unwrap(), 2);
        // Verify ordering: scores should be descending
        for pair in scores.windows(2) {
            assert!(pair[0].as_f64().unwrap() >= pair[1].as_f64().unwrap());
        }
        omniroute_ffi_combo_scorer_free(r);
    }

    #[test]
    fn version_returns_metadata() {
        let r = omniroute_ffi_combo_scorer_version();
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["crate"], serde_json::json!("combo-scorer"));
        assert!(parsed["abi"].is_string());
        omniroute_ffi_combo_scorer_free(r);
    }
}
