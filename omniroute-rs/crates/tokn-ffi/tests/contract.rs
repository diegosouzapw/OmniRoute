//! Contract tests for the tokn-ffi surface.
//!
//! These tests are duplicated on the JS side (see
//! `src/lib/tokn/__tests__/contract.test.ts`). Any drift between Rust and JS
//! test expectations is a breaking change to the FFI contract.

use omniroute_core::RouteRequest;
use omniroute_combo::resolve;

#[test]
fn gpt4o_primary_provider_is_openai() {
    let d = resolve(&RouteRequest {
        model: "gpt-4o".into(),
        tenant_id: "_default".into(),
    });
    assert_eq!(d.provider, "openai");
    assert_eq!(d.model, "gpt-4o");
    assert!(d.fallback_chain.contains(&"openrouter".to_string()));
}

#[test]
fn claude_35_sonnet_falls_back_through_anthropic() {
    let d = resolve(&RouteRequest {
        model: "claude-3-5-sonnet-latest".into(),
        tenant_id: "_default".into(),
    });
    assert_eq!(d.provider, "anthropic");
    assert!(d.fallback_chain.iter().any(|p| p == "openrouter"));
}

#[test]
fn gemini_flash_routes_to_google_first() {
    let d = resolve(&RouteRequest {
        model: "gemini-2.0-flash".into(),
        tenant_id: "_default".into(),
    });
    assert_eq!(d.provider, "google");
}

#[test]
fn unknown_model_defaults_to_openrouter() {
    let d = resolve(&RouteRequest {
        model: "totally-unknown-model-xyz".into(),
        tenant_id: "_default".into(),
    });
    assert_eq!(d.provider, "openrouter");
    assert!(d.fallback_chain.is_empty());
}

#[test]
fn tenant_id_does_not_affect_decision_first_slice() {
    let a = resolve(&RouteRequest {
        model: "gpt-4o".into(),
        tenant_id: "tenant-a".into(),
    });
    let b = resolve(&RouteRequest {
        model: "gpt-4o".into(),
        tenant_id: "tenant-b".into(),
    });
    assert_eq!(a.provider, b.provider);
    assert_eq!(a.fallback_chain, b.fallback_chain);
}
