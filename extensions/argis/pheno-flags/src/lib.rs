//! # pheno-flags — canonical feature-flag set
//!
//! Synchronous, in-memory boolean flag storage with optional
//! environment-variable population. Intentionally minimal: no FFI,
//! no async runtime, no network.
//!
//! The on-disk storage is a `HashMap<String, bool>` for O(1)
//! `is_enabled` lookups; [`FlagSet::snapshot`] returns a fresh
//! `BTreeMap<String, bool>` for sorted, observability-friendly
//! iteration.
//!
//! ## Quick start
//!
//! ```
//! use pheno_flags::FlagSet;
//!
//! let flags = FlagSet::new()
//!     .with("dark_mode", true)
//!     .with("beta_export", false);
//!
//! assert!(flags.is_enabled("dark_mode"));
//! assert!(!flags.is_enabled("beta_export"));
//! assert!(!flags.is_enabled("unknown_key"));
//! ```
//!
//! ## Environment-variable loading
//!
//! [`FlagSet::from_env`] scans the process environment for every
//! variable whose name starts with `<PREFIX>_` and parses the
//! remainder (the key) plus the value. Truthy values
//! (`"1"`, `"true"`, `"yes"`, case-insensitive) become `true`;
//! falsy values (`"0"`, `"false"`, `"no"`, case-insensitive)
//! become `false`. Any other value returns
//! [`FlagError::InvalidValue`] carrying the offending variable
//! name.
//!
//! ```no_run
//! use pheno_flags::FlagSet;
//!
//! // Env: `MYAPP_DARK_MODE=1`, `MYAPP_BETA=YES`.
//! let flags = FlagSet::from_env("MYAPP").unwrap();
//! assert!(flags.is_enabled("DARK_MODE"));
//! assert!(flags.is_enabled("BETA"));
//! assert!(!flags.is_enabled("OTHER_KEY"));
//! ```
//!
//! ## Snapshot
//!
//! [`FlagSet::snapshot`] returns a fresh `BTreeMap<String, bool>`,
//! which is naturally sorted by key. The shape is identical to
//! what would round-trip through a JSON dump for observability /
//! debug endpoints:
//!
//! ```
//! use pheno_flags::FlagSet;
//! use std::collections::BTreeMap;
//!
//! let flags = FlagSet::new()
//!     .with("zeta", true)
//!     .with("alpha", false);
//!
//! let snap: BTreeMap<String, bool> = flags.snapshot();
//! let keys: Vec<&String> = snap.keys().collect();
//! assert_eq!(keys, vec![&"alpha".to_string(), &"zeta".to_string()]);
//! ```

use std::collections::{BTreeMap, HashMap};

use thiserror::Error;

/// Errors raised by [`FlagSet::from_env`].
#[derive(Debug, Error, PartialEq, Eq)]
pub enum FlagError {
    /// The environment variable named `var_name` carried a value
    /// that is neither a recognized truthy string (`"1"`,
    /// `"true"`, `"yes"`, case-insensitive) nor a recognized
    /// falsy string (`"0"`, `"false"`, `"no"`, case-insensitive).
    #[error(
        "invalid feature-flag value for environment variable `{0}`: \
         expected one of 1/true/yes/0/false/no (case-insensitive)"
    )]
    InvalidValue(String),
}

/// A set of named boolean feature flags.
///
/// Internally backed by a `HashMap<String, bool>` for O(1)
/// `is_enabled` lookups. The public [`FlagSet::snapshot`] method
/// returns a fresh `BTreeMap<String, bool>` so the iteration
/// order is deterministic (sorted by key).
///
/// Cloning is cheap: the map is a small `String -> bool` table.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct FlagSet {
    flags: HashMap<String, bool>,
}

impl FlagSet {
    /// Create an empty [`FlagSet`]. Equivalent to
    /// [`FlagSet::default`].
    ///
    /// ```
    /// use pheno_flags::FlagSet;
    ///
    /// let flags = FlagSet::new();
    /// assert!(flags.snapshot().is_empty());
    /// ```
    pub fn new() -> Self {
        Self::default()
    }

    /// Builder: set `key` to `value` and return `self` for chaining.
    ///
    /// If `key` was already set, the previous value is overwritten
    /// (last write wins). Insertion order does not affect the
    /// eventual iteration order of [`FlagSet::snapshot`]; that is
    /// always sorted ascending by key.
    ///
    /// ```
    /// use pheno_flags::FlagSet;
    ///
    /// let flags = FlagSet::new()
    ///     .with("dark_mode", true)
    ///     .with("dark_mode", false); // last write wins
    /// assert!(!flags.is_enabled("dark_mode"));
    /// ```
    pub fn with(mut self, key: &str, value: bool) -> Self {
        self.flags.insert(key.to_string(), value);
        self
    }

    /// Populate the [`FlagSet`] from the process environment.
    ///
    /// Every environment variable whose name starts with
    /// `<PREFIX>_` is consumed: the suffix after the separator
    /// becomes the flag key, and the value is parsed as a
    /// boolean. Variables that do not start with `<PREFIX>_` are
    /// ignored.
    ///
    /// Truthy (case-insensitive): `1`, `true`, `yes`.
    /// Falsy (case-insensitive): `0`, `false`, `no`.
    ///
    /// Returns [`FlagError::InvalidValue`] on the first
    /// unparseable variable; partial state is **not** built (the
    /// function scans and validates before inserting).
    pub fn from_env(prefix: &str) -> Result<Self, FlagError> {
        // First pass: validate every matching variable. We do not
        // insert until all of them parse, so a partial build
        // never escapes the function on error. Owning the env
        // (key, value) pairs in a Vec keeps the borrow checker
        // happy on the `InvalidValue(env_key)` error path below.
        let mut parsed: Vec<(String, bool)> = Vec::new();
        let mut offending: Option<String> = None;
        for (env_key, env_value) in std::env::vars() {
            let Some(suffix) = env_key.strip_prefix(prefix) else {
                continue;
            };
            let key = match suffix.strip_prefix('_') {
                Some(k) => k.to_string(),
                None => continue,
            };
            if key.is_empty() {
                // `<PREFIX>_` with no key is a misconfigured env
                // var; treat it as an invalid value rather than
                // silently accept an empty key. Stash the
                // offending var name and break out — the loop
                // holds an immutable borrow on env_value here
                // that would otherwise fight the move of
                // `env_key` into the error variant below.
                offending = Some(env_key);
                break;
            }
            match parse_bool(&env_value) {
                Some(v) => parsed.push((key, v)),
                None => {
                    offending = Some(env_key);
                    break;
                }
            }
        }
        if let Some(var_name) = offending {
            return Err(FlagError::InvalidValue(var_name));
        }

        let mut flags = HashMap::with_capacity(parsed.len());
        for (k, v) in parsed {
            flags.insert(k, v);
        }
        Ok(Self { flags })
    }

    /// Return `true` if `key` was set to `true`.
    ///
    /// Unknown keys return `false` (this is the safe default for
    /// opt-in feature flags).
    pub fn is_enabled(&self, key: &str) -> bool {
        self.flags.get(key).copied().unwrap_or(false)
    }

    /// Return a copy of the underlying map, sorted by key.
    ///
    /// The map is a fresh `BTreeMap<String, bool>`, so it is safe
    /// to mutate, serialize, or diff independently of the
    /// `FlagSet`. Iteration order is ascending by key.
    pub fn snapshot(&self) -> BTreeMap<String, bool> {
        self.flags.iter().map(|(k, v)| (k.clone(), *v)).collect()
    }
}

/// Parse a single boolean value. Returns `None` for anything that
/// is not one of the six recognized strings (case-insensitive).
fn parse_bool(s: &str) -> Option<bool> {
    // The six canonical forms. Compared as lowercase to make
    // "True", "YES", "No" all behave like their canonical form.
    match s.to_ascii_lowercase().as_str() {
        "1" | "true" | "yes" => Some(true),
        "0" | "false" | "no" => Some(false),
        _ => None,
    }
}
