//! Integration tests for the `pheno-flags` crate.
//!
//! These tests are compiled as a separate crate (`tests/flag_test`)
//! and link against the public `pheno_flags` API only — they do
//! not see private items, which guarantees every behavior under
//! test is reachable from a downstream consumer.

use std::collections::BTreeMap;
use std::sync::Mutex;

use pheno_flags::{FlagError, FlagSet};

/// Serializes all tests in this binary that mutate
/// `std::env`. Rust's process-global environment is a shared
/// resource; without this lock, `cargo test` would run the
/// env-mutating tests in parallel and they would race on the
/// `PHENO_FLAGS_TEST_*` variables.
///
/// A plain `static` `Mutex` of `()` is enough for our purposes;
/// `once_cell` / `lazy_static` are not used because the crate
/// itself is dependency-light (one dep: `thiserror`) and the
/// tests should not pull in more than the library does.
static ENV_LOCK: Mutex<()> = Mutex::new(());

#[test]
fn new_flagset_is_empty() {
    let flags = FlagSet::new();
    assert!(
        flags.snapshot().is_empty(),
        "FlagSet::new() must produce an empty snapshot"
    );
    assert!(
        !flags.is_enabled("anything"),
        "is_enabled on an empty FlagSet must return false (safe default)"
    );
}

#[test]
fn with_sets_value() {
    let flags = FlagSet::new().with("dark_mode", true);
    assert!(flags.is_enabled("dark_mode"));
    assert_eq!(
        flags.snapshot(),
        BTreeMap::from([("dark_mode".to_string(), true)]),
        "with() must insert the (key, value) pair into the underlying map"
    );
}

#[test]
fn is_enabled_returns_true_for_set_key() {
    let flags = FlagSet::new().with("alpha", true).with("beta", false);
    assert!(
        flags.is_enabled("alpha"),
        "a key explicitly set to true must report is_enabled == true"
    );
    assert!(
        !flags.is_enabled("beta"),
        "a key explicitly set to false must report is_enabled == false"
    );
}

#[test]
fn is_enabled_returns_false_for_unknown_key() {
    let flags = FlagSet::new().with("alpha", true);
    assert!(
        !flags.is_enabled("does_not_exist"),
        "unknown keys must default to false (not panic)"
    );
    // `beta` was never set, so it must also report false.
    assert!(!flags.is_enabled("beta"));
}

#[test]
fn from_env_parses_truthy_values() {
    let _guard = ENV_LOCK.lock().unwrap_or_else(|e| e.into_inner());
    for raw in ["1", "true", "TRUE", "yes", "YES", "Yes"] {
        std::env::set_var("PHENO_FLAGS_TEST_TRUTHY", raw);
        let flags =
            FlagSet::from_env("PHENO_FLAGS_TEST").expect("from_env must accept truthy values");
        assert!(
            flags.is_enabled("TRUTHY"),
            "expected `{raw}` to parse as true via from_env"
        );
        std::env::remove_var("PHENO_FLAGS_TEST_TRUTHY");
    }
}

#[test]
fn from_env_parses_falsy_values() {
    let _guard = ENV_LOCK.lock().unwrap_or_else(|e| e.into_inner());
    for raw in ["0", "false", "FALSE", "no", "NO", "No"] {
        std::env::set_var("PHENO_FLAGS_TEST_FALSY", raw);
        let flags =
            FlagSet::from_env("PHENO_FLAGS_TEST").expect("from_env must accept falsy values");
        assert!(
            !flags.is_enabled("FALSY"),
            "expected `{raw}` to parse as false via from_env"
        );
        std::env::remove_var("PHENO_FLAGS_TEST_FALSY");
    }
}

#[test]
fn from_env_rejects_invalid_value() {
    let _guard = ENV_LOCK.lock().unwrap_or_else(|e| e.into_inner());
    std::env::set_var("PHENO_FLAGS_TEST_BAD", "maybe");
    let result = FlagSet::from_env("PHENO_FLAGS_TEST");
    assert_eq!(
        result.err(),
        Some(FlagError::InvalidValue("PHENO_FLAGS_TEST_BAD".to_string())),
        "from_env must return FlagError::InvalidValue carrying the offending var name"
    );
    std::env::remove_var("PHENO_FLAGS_TEST_BAD");
}

#[test]
fn snapshot_returns_sorted_keys() {
    let flags = FlagSet::new()
        .with("zeta", true)
        .with("alpha", false)
        .with("mu", true);

    let snap = flags.snapshot();
    let keys: Vec<&str> = snap.keys().map(String::as_str).collect();
    assert_eq!(
        keys,
        vec!["alpha", "mu", "zeta"],
        "snapshot() must return a BTreeMap with keys sorted ascending"
    );
    // Also verify the values landed in the right place.
    assert!(!snap["alpha"]);
    assert!(snap["mu"]);
    assert!(snap["zeta"]);
}
