//! Bifrost bridge (F6 stub, blocked on maximhq/bifrost v1.0 GA — 2027 Q1)
//!
//! This crate ships a minimal C ABI surface that matches the contract we
//! expect the real `maximhq/bifrost/core` Go SDK to expose once v1.0 lands.
//! When that happens, only `bridge.go` (in the omniroute_rs workspace) needs
//! to be rewritten to call into the real SDK — the C ABI, Rust `extern "C"`
//! surface, and the TS loader all stay identical.

#![allow(unsafe_code)] // C ABI + cgo shim

use std::os::raw::{c_char, c_int};

/// Opaque handle to a Bifrost runtime instance.
pub struct BifrostHandle {
    pub providers: Vec<String>,
    pub healthy: bool,
}

impl BifrostHandle {
    pub fn new() -> Self {
        Self {
            providers: vec!["openai".into(), "anthropic".into(), "google".into()],
            healthy: true,
        }
    }
}

/// Initialise the Bifrost runtime. Returns a heap-allocated handle or NULL.
/// The real implementation will call into the maximhq/bifrost Go SDK via cgo;
/// the mock implementation returns a fresh BifrostHandle.
#[no_mangle]
pub extern "C" fn omniroute_ffi_bifrost_bridge_init() -> *mut BifrostHandle {
    Box::into_raw(Box::new(BifrostHandle::new()))
}

/// Free a Bifrost runtime handle previously returned by `init`.
#[no_mangle]
pub extern "C" fn omniroute_ffi_bifrost_bridge_free(ptr: *mut BifrostHandle) {
    if !ptr.is_null() {
        unsafe { drop(Box::from_raw(ptr)) }
    }
}

/// Run a chat completion. Input/output are JSON-envelope strings for ABI
/// compatibility with the future cgo shim.
/// Returns a heap-allocated JSON string the caller must free via
/// `omniroute_ffi_bifrost_bridge_free_str`.
#[no_mangle]
pub extern "C" fn omniroute_ffi_bifrost_bridge_chat(
    handle: *mut BifrostHandle,
    request_json: *const c_char,
    request_len: usize,
) -> *mut c_char {
    if handle.is_null() || request_json.is_null() {
        return std::ptr::null_mut();
    }
    let handle = unsafe { &*handle };
    if !handle.healthy {
        return error_response("bridge not healthy");
    }
    let body = unsafe { std::slice::from_raw_parts(request_json as *const u8, request_len) };
    let body_str = match std::str::from_utf8(body) {
        Ok(s) => s,
        Err(_) => return error_response("invalid utf-8 in request"),
    };
    let parsed: serde_json::Value = match serde_json::from_str(body_str) {
        Ok(v) => v,
        Err(e) => return error_response(&format!("invalid json: {e}")),
    };
    let provider = parsed
        .get("provider")
        .and_then(|v| v.as_str())
        .unwrap_or("openai");
    let prompt = parsed
        .get("prompt")
        .and_then(|v| v.as_str())
        .unwrap_or("");
    let response_json = serde_json::json!({
        "id": format!("chatcmpl-{}", std::process::id()),
        "provider": provider,
        "model": parsed.get("model").and_then(|v| v.as_str()).unwrap_or("gpt-4o-mini"),
        "choices": [{
            "index": 0,
            "message": {
                "role": "assistant",
                "content": format!("[mock {}] echo: {}", provider, prompt),
            },
            "finish_reason": "stop",
        }],
        "usage": {
            "prompt_tokens": prompt.split_whitespace().count() as i64,
            "completion_tokens": 12,
            "total_tokens": prompt.split_whitespace().count() as i64 + 12,
        },
        "mock": true,
    });
    let response_str = serde_json::to_string(&response_json).unwrap_or_else(|_| "{}".to_string());
    cstring_owned(response_str)
}

/// Health check. Returns 1 if healthy, 0 otherwise.
#[no_mangle]
pub extern "C" fn omniroute_ffi_bifrost_bridge_health(handle: *mut BifrostHandle) -> c_int {
    if handle.is_null() {
        return 0;
    }
    let h = unsafe { &*handle };
    if h.healthy { 1 } else { 0 }
}

/// Free a heap-allocated C string returned by `chat`.
#[no_mangle]
pub extern "C" fn omniroute_ffi_bifrost_bridge_free_str(ptr: *mut c_char) {
    if !ptr.is_null() {
        unsafe {
            let _ = CString::from_raw(ptr);
        }
    }
}

fn error_response(msg: &str) -> *mut c_char {
    let json = serde_json::json!({ "error": msg, "mock": true });
    cstring_owned(serde_json::to_string(&json).unwrap_or_else(|_| "{}".to_string()))
}

fn cstring_owned(s: String) -> *mut c_char {
    use std::ffi::CString;
    CString::new(s).map(|c| c.into_raw()).unwrap_or(std::ptr::null_mut())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::ffi::CString;

    #[test]
    fn init_returns_non_null_handle() {
        let h = omniroute_ffi_bifrost_bridge_init();
        assert!(!h.is_null());
        assert_eq!(omniroute_ffi_bifrost_bridge_health(h), 1);
        omniroute_ffi_bifrost_bridge_free(h);
    }

    #[test]
    fn chat_returns_valid_json() {
        let h = omniroute_ffi_bifrost_bridge_init();
        let req = CString::new(r#"{"provider":"openai","model":"gpt-4o-mini","prompt":"hello"}"#).unwrap();
        let ptr = omniroute_ffi_bifrost_bridge_chat(h, req.as_ptr(), req.as_bytes().len());
        assert!(!ptr.is_null());
        let s = unsafe { std::ffi::CStr::from_ptr(ptr) };
        let parsed: serde_json::Value = serde_json::from_str(s.to_str().unwrap()).unwrap();
        assert_eq!(parsed.get("provider").unwrap().as_str().unwrap(), "openai");
        assert_eq!(parsed.get("mock").unwrap().as_bool().unwrap(), true);
        omniroute_ffi_bifrost_bridge_free_str(ptr);
        omniroute_ffi_bifrost_bridge_free(h);
    }

    #[test]
    fn chat_with_null_handle_returns_null() {
        let req = CString::new("{}").unwrap();
        let ptr = omniroute_ffi_bifrost_bridge_chat(std::ptr::null_mut(), req.as_ptr(), req.as_bytes().len());
        assert!(ptr.is_null());
    }
}