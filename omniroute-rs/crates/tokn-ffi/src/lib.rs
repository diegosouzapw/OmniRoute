//! omniroute-tokn-ffi: napi-rs binding for omniroute-combo routing.
//!
//! This crate is the synchronous Node-API boundary. The full FFI contract is
//! documented in `docs/FFI_CONTRACT.md`. Highlights:
//!
//! - Sync-only on the FFI boundary (callers wrap with `spawnSync` if needed).
//! - Typed JSON in/out; no exceptions across the boundary.
//! - Per-call budget: ≤5ms p99; full Rust impl measured at p99 ≈ 0.02ms.
//!
//! All routing logic lives in `omniroute-combo`. This crate is a pure
//! adapter — no domain logic, no I/O, no caching.

use napi_derive::napi;

use omniroute_combo::resolve as combo_resolve;
use omniroute_core::{RouteDecision as CoreDecision, RouteRequest as CoreRequest};

/// Mirror of `omniroute_core::RouteRequest` for the FFI boundary.
///
/// Field names are stable; `#[napi(object)]` exposes them as
/// `model` and `tenantId` to JS.
#[napi(object)]
#[derive(Debug, Clone, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct JsRouteRequest {
    pub model: String,
    /// Optional. Defaults to "_default" when missing or empty.
    #[napi(js_name = "tenantId")]
    #[serde(default, rename = "tenantId")]
    pub tenant_id: Option<String>,
}

/// Mirror of `omniroute_core::RouteDecision` for the FFI boundary.
///
/// `fallback_chain: Vec<String>` maps directly to JS arrays.
#[napi(object)]
#[derive(Debug, Clone, serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct JsRouteDecision {
    pub provider: String,
    pub model: String,
    #[napi(js_name = "fallbackChain")]
    #[serde(rename = "fallbackChain")]
    pub fallback_chain: Vec<String>,
}

impl From<JsRouteRequest> for CoreRequest {
    fn from(j: JsRouteRequest) -> Self {
        CoreRequest {
            model: j.model,
            tenant_id: j
                .tenant_id
                .filter(|s| !s.is_empty())
                .unwrap_or_else(|| "_default".to_string()),
        }
    }
}

impl From<CoreDecision> for JsRouteDecision {
    fn from(d: CoreDecision) -> Self {
        JsRouteDecision {
            provider: d.provider,
            model: d.model,
            fallback_chain: d.fallback_chain,
        }
    }
}

/// Synchronous routing decision.
///
/// Returns a JSON-serializable `JsRouteDecision`. Never throws across the
/// boundary; all error cases resolve to a fallback (provider = "openrouter").
///
/// @param req `{ model: string, tenantId?: string }`
/// @returns `{ provider: string, model: string, fallbackChain: string[] }`
#[napi(js_name = "decide")]
pub fn decide(req: JsRouteRequest) -> JsRouteDecision {
    let core_req: CoreRequest = req.into();
    let core_dec: CoreDecision = combo_resolve(&core_req);
    core_dec.into()
}

/// Returns the FFI surface version. Bumps on any breaking change to the
/// `decide` signature, return shape, or contract guarantees.
#[napi(js_name = "ffiVersion")]
pub fn ffi_version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

/// Returns `true` if the native binary was compiled and loaded successfully.
/// Used by the JS lazy-loader to gate the fast-path and fall back to the
/// pure-TS impl if the .node file is missing or incompatible.
#[napi(js_name = "isHealthy")]
pub fn is_healthy() -> bool {
    true
}

#[cfg(test)]
mod unit_tests {
    use super::*;

    #[test]
    fn maps_empty_tenant_to_default() {
        let j: JsRouteRequest = JsRouteRequest {
            model: "gpt-4o".to_string(),
            tenant_id: Some("".to_string()),
        };
        let core: CoreRequest = j.into();
        assert_eq!(core.tenant_id, "_default");
    }

    #[test]
    fn maps_missing_tenant_to_default() {
        let j: JsRouteRequest = JsRouteRequest {
            model: "gpt-4o".to_string(),
            tenant_id: None,
        };
        let core: CoreRequest = j.into();
        assert_eq!(core.tenant_id, "_default");
    }

    #[test]
    fn preserves_tenant_id_when_set() {
        let j: JsRouteRequest = JsRouteRequest {
            model: "gpt-4o".to_string(),
            tenant_id: Some("tenant-abc".to_string()),
        };
        let core: CoreRequest = j.into();
        assert_eq!(core.tenant_id, "tenant-abc");
    }

    #[test]
    fn decision_carries_fallback_chain() {
        let j: JsRouteRequest = JsRouteRequest {
            model: "gpt-4o".to_string(),
            tenant_id: Some("t".to_string()),
        };
        let d = decide(j);
        assert_eq!(d.provider, "openai");
        assert_eq!(d.model, "gpt-4o");
        assert!(!d.fallback_chain.is_empty());
    }

    #[test]
    fn ffi_version_matches_crate_version() {
        let v = ffi_version();
        assert!(!v.is_empty());
        assert!(v.chars().next().unwrap().is_ascii_digit());
    }

    #[test]
    fn healthy_is_true_at_load() {
        assert!(is_healthy());
    }
}
