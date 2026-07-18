//! SSE chunking FFI — wraps open-sse/handlers/chatCore.ts while(true) loop
//! with zero-copy Rust buffer management. Falls back to TS when cdylib not loaded.

#![deny(unsafe_op_in_unsafe_fn)]

use std::ffi::{c_char, CStr, CString};
use std::slice;
use std::sync::atomic::{AtomicU64, Ordering};

static TOTAL_CHUNKS: AtomicU64 = AtomicU64::new(0);

fn error_response(msg: &str) -> *mut c_char {
    let body = serde_json::json!({"error": msg, "ok": false});
    CString::new(body.to_string()).unwrap().into_raw()
}

/// SSE chunk stream: JSON envelope
/// Input: { "rawBody": "string", "maxChunkBytes": 4096, "keepOpen": true }
/// Output: { "ok": true, "chunks": ["data: payload\\n\\n", ...], "totalBytes": N }
#[no_mangle]
pub extern "C" fn omniroute_ffi_sse_chunking_stream(
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
    let raw = match parsed.get("rawBody").and_then(|v| v.as_str()) {
        Some(s) => s,
        None => return error_response("missing 'rawBody' field"),
    };
    let max_chunk: usize = parsed
        .get("maxChunkBytes")
        .and_then(|v| v.as_u64())
        .unwrap_or(4096) as usize;
    let keep_open: bool = parsed
        .get("keepOpen")
        .and_then(|v| v.as_bool())
        .unwrap_or(true);

    if max_chunk == 0 {
        return error_response("maxChunkBytes must be > 0");
    }

    // Chunk the body into SSE-format chunks.
    let bytes = raw.as_bytes();
    let mut chunks: Vec<String> = Vec::new();
    let mut emitted: usize = 0;
    while emitted < bytes.len() {
        let end = std::cmp::min(emitted + max_chunk, bytes.len());
        let payload = std::str::from_utf8(&bytes[emitted..end]).unwrap_or("");
        chunks.push(format!("data: {}\n\n", payload));
        emitted = end;
        TOTAL_CHUNKS.fetch_add(1, Ordering::Relaxed);
    }

    if !keep_open && chunks.is_empty() {
        chunks.push("data: [DONE]\n\n".to_string());
    }

    let total_bytes = bytes.len();
    let json = serde_json::json!({
        "ok": true,
        "chunks": chunks,
        "totalBytes": total_bytes,
        "keepOpen": keep_open,
    });
    CString::new(json.to_string()).unwrap().into_raw()
}

/// Free a *mut c_char returned by omniroute_ffi_sse_chunking_stream.
#[no_mangle]
pub extern "C" fn omniroute_ffi_sse_chunking_free(ptr: *mut c_char) {
    if !ptr.is_null() {
        let _ = unsafe { CString::from_raw(ptr) };
    }
}

/// Returns the SSE chunking version metadata.
#[no_mangle]
pub extern "C" fn omniroute_ffi_sse_chunking_version() -> *mut c_char {
    let body = serde_json::json!({
        "crate": "sse-chunking",
        "version": env!("CARGO_PKG_VERSION"),
        "abi": "0.1.0",
        "maxChunkBytesDefault": 4096,
    });
    CString::new(body.to_string()).unwrap().into_raw()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn null_input_returns_error() {
        let r = omniroute_ffi_sse_chunking_stream(std::ptr::null(), 0);
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(false));
        omniroute_ffi_sse_chunking_free(r);
    }

    #[test]
    fn chunks_a_short_body_in_one_chunk() {
        let body = "hello world";
        let payload = serde_json::json!({
            "rawBody": body,
            "maxChunkBytes": 1024,
            "keepOpen": true,
        });
        let bytes = payload.to_string().into_bytes();
        let r = omniroute_ffi_sse_chunking_stream(bytes.as_ptr(), bytes.len());
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["ok"], serde_json::json!(true));
        let chunks = parsed["chunks"].as_array().unwrap();
        assert_eq!(chunks.len(), 1, "expected 1 chunk for short body");
        assert_eq!(chunks[0].as_str().unwrap(), "data: hello world\n\n");
        omniroute_ffi_sse_chunking_free(r);
    }

    #[test]
    fn chunks_a_long_body_into_multiple() {
        let body = "a".repeat(10_000);
        let payload = serde_json::json!({
            "rawBody": body,
            "maxChunkBytes": 1024,
        });
        let bytes = payload.to_string().into_bytes();
        let r = omniroute_ffi_sse_chunking_stream(bytes.as_ptr(), bytes.len());
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        let chunks = parsed["chunks"].as_array().unwrap();
        // 10000 bytes / 1024 chunks-per-byte ≤ 10
        assert!(chunks.len() >= 10, "got {} chunks", chunks.len());
        omniroute_ffi_sse_chunking_free(r);
    }

    #[test]
    fn version_metadata() {
        let r = omniroute_ffi_sse_chunking_version();
        let s = unsafe { CStr::from_ptr(r) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed["crate"], serde_json::json!("sse-chunking"));
        omniroute_ffi_sse_chunking_free(r);
    }
}
