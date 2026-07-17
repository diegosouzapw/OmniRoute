//! Canonical [`AppError`] type for the `pheno-*` fleet. Consolidates the
//! 5 most-common error patterns observed across the L1/L2 fleet audit
//! (2026-06-10) into a single, dependency-light crate.
//!
//! ## The 5 variants
//!
//! | Variant | Meaning | Common wire code |
//! |---------|---------|------------------|
//! | [`AppError::Domain`] | Invariant / business-rule violation that doesn't fit a finer bucket. | `INTERNAL_ERROR` / `INVALID_ARGUMENT` |
//! | [`AppError::NotFound`] | Lookup of an entity by id returned no result. | `NOT_FOUND` |
//! | [`AppError::Conflict`] | Optimistic-concurrency / duplicate / state-machine conflict. | `ALREADY_EXISTS` / `CONFLICT` |
//! | [`AppError::Validation`] | Input failed schema or value-level validation. | `VALIDATION_ERROR` / `INVALID_ARGUMENT` |
//! | [`AppError::Storage`] | Persistence, file, network, or adapter I/O failure. | `INTERNAL_ERROR` |
//!
//! ## Design
//!
//! - Built on [`thiserror`] for `Display` + `Error` derives (no per-variant boilerplate).
//! - Drops into [`anyhow`] via the blanket
//!   `impl<T: Error + Send + Sync + 'static> From<T> for anyhow::Error`, so
//!   `.context()` / `.with_context()` from `anyhow::Context` work directly on
//!   `Result<_, AppError>`.
//! - Provides `From` impls for the most common boundary errors
//!   ([`std::io::Error`] => [`AppError::Storage`], [`anyhow::Error`] =>
//!   [`AppError::Domain`], `&str`/`String` => [`AppError::Domain`]).
//! - Deliberately does NOT add a blanket `From<E: Error>` impl, because
//!   that conflicts with the concrete [`std::io::Error`] impl under Rust's
//!   coherence rules. Callers with their own error types use
//!   `.map_err(|e| AppError::domain(e.to_string()))?` — explicit at the
//!   boundary, no surprise auto-conversion inside libraries.
//!
//! ## Consumers
//!
//! Consumed by L5 #81–85 across the pheno-* fleet. See
//! `V3_EXECUTION_LOG_2026_06_10.md` / "L3 #46" for the rollout notes.

/// The canonical fleet-wide error type.
///
/// This enum is intentionally closed (no `#[non_exhaustive]`) so that
/// `match` exhaustiveness checks are useful at consumer call sites. The
/// 5-variant set is the L3 DAG's design constraint; growing past 5 is a
/// breaking change and should be done via a new variant on a new type.
///
/// # Usage
///
/// ```
/// use pheno_errors::AppError;
///
/// fn lookup_user(id: &str) -> Result<String, AppError> {
///     if id.is_empty() {
///         return Err(AppError::validation("user id cannot be empty"));
///     }
///     // Simulate a lookup that succeeds for "42".
///     if id != "42" {
///         return Err(AppError::not_found("user", id));
///     }
///     Ok("Alice".into())
/// }
///
/// assert_eq!(lookup_user("42").unwrap(), "Alice");
/// assert!(lookup_user("99").unwrap_err().kind() == "not_found");
/// assert!(lookup_user("").unwrap_err().kind() == "validation");
/// ```
#[derive(Debug, thiserror::Error)]
pub enum AppError {
    /// Business-rule / invariant violation that doesn't fit a finer bucket.
    ///
    /// Use this for "the operation is conceptually invalid but the input
    /// shape is fine" — e.g., attempting to ship a frozen contract,
    /// transitioning a state machine to a forbidden state, or evaluating
    /// a policy that fails for a structural reason.
    #[error("domain error: {0}")]
    Domain(String),

    /// Lookup of an entity by id returned no result.
    ///
    /// Carries the entity name and the id so consumers don't have to
    /// re-parse the message string.
    #[error("not found: {entity} {id}")]
    NotFound { entity: String, id: String },

    /// Optimistic-concurrency, duplicate, or state-machine conflict.
    ///
    /// Distinct from [`AppError::Validation`] because the input itself is
    /// valid — the conflict is with existing state (e.g., a duplicate
    /// insert, a stale etag, a CAS failure).
    #[error("conflict: {0}")]
    Conflict(String),

    /// Input failed schema or value-level validation.
    ///
    /// Use this for "the input is malformed" — type errors, missing
    /// required fields, value out of range, regex mismatch.
    #[error("validation error: {0}")]
    Validation(String),

    /// Persistence, file, network, or adapter I/O failure.
    ///
    /// Use this for transport-layer failures — the request was well-formed
    /// but the storage adapter couldn't satisfy it.
    #[error("storage error: {0}")]
    Storage(String),
}

/// A `Result<T, AppError>` — the canonical return type for fallible
/// functions in the pheno-* fleet.
pub type AppResult<T> = Result<T, AppError>;

impl AppError {
    /// Short, lowercase, snake_case tag for logging and metrics.
    ///
    /// Stable across releases; do NOT use as the wire error code
    /// (use `phenotype-error-core::ErrorCode` for that).
    pub fn kind(&self) -> &'static str {
        match self {
            Self::Domain(_) => "domain",
            Self::NotFound { .. } => "not_found",
            Self::Conflict(_) => "conflict",
            Self::Validation(_) => "validation",
            Self::Storage(_) => "storage",
        }
    }

    // ── Convenience constructors ──────────────────────────────────

    /// Convenience constructor for [`AppError::Domain`].
    pub fn domain(msg: impl Into<String>) -> Self {
        Self::Domain(msg.into())
    }

    /// Convenience constructor for [`AppError::NotFound`].
    pub fn not_found(entity: impl Into<String>, id: impl Into<String>) -> Self {
        Self::NotFound {
            entity: entity.into(),
            id: id.into(),
        }
    }

    /// Convenience constructor for [`AppError::Conflict`].
    pub fn conflict(msg: impl Into<String>) -> Self {
        Self::Conflict(msg.into())
    }

    /// Convenience constructor for [`AppError::Validation`].
    pub fn validation(msg: impl Into<String>) -> Self {
        Self::Validation(msg.into())
    }

    /// Convenience constructor for [`AppError::Storage`].
    pub fn storage(msg: impl Into<String>) -> Self {
        Self::Storage(msg.into())
    }

    // ── Logging helpers ───────────────────────────────────────────

    /// Log this error at WARN with structured fields, then return it.
    ///
    /// Useful in fallible pipelines where the caller wants a recorded
    /// breadcrumb but still wants to propagate the error.
    pub fn log_warn(self) -> Self {
        tracing::warn!(
            error.kind = self.kind(),
            error.display = %self,
            "error"
        );
        self
    }

    /// Log this error at ERROR with structured fields, then return it.
    ///
    /// Useful in fallible pipelines where the caller wants a recorded
    /// breadcrumb but still wants to propagate the error.
    pub fn log_error(self) -> Self {
        tracing::error!(
            error.kind = self.kind(),
            error.display = %self,
            "error"
        );
        self
    }
}

// ── From impls ──────────────────────────────────────────────────

/// Map any `std::io::Error` to [`AppError::Storage`].
///
/// This is the most common boundary translation in the fleet — every
/// persistence adapter sees `io::Error`. Mapping it to the `Storage`
/// variant (not `Domain`) preserves the "the request was fine, the
/// adapter failed" semantics.
impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        Self::Storage(e.to_string())
    }
}

/// Map a `&'static str` literal to [`AppError::Domain`].
///
/// Ergonomic for `return Err("something went wrong".into())` in handlers.
impl From<&'static str> for AppError {
    fn from(msg: &'static str) -> Self {
        Self::Domain(msg.to_owned())
    }
}

/// Map an owned `String` to [`AppError::Domain`].
impl From<String> for AppError {
    fn from(msg: String) -> Self {
        Self::Domain(msg)
    }
}

/// Round-trip conversion from `anyhow::Error` back to [`AppError`].
///
/// `anyhow::Error` is a heterogeneous wrapper, so we collapse the whole
/// chain into a [`AppError::Domain`] with the rendered display. Callers
/// that need a more specific variant should downcast or `match` the source
/// before calling this.
///
/// Note: `anyhow::Error`'s `Display` impl renders only the outermost
/// context, not the cause chain. We walk the chain explicitly so the
/// result preserves the full causal trail (otherwise `?` propagation
/// would silently drop inner error context).
impl From<anyhow::Error> for AppError {
    fn from(e: anyhow::Error) -> Self {
        // Walk the cause chain explicitly.
        let mut msg = e.to_string();
        let mut source = e.source();
        while let Some(cause) = source {
            msg.push_str(": ");
            msg.push_str(&cause.to_string());
            source = cause.source();
        }
        Self::Domain(msg)
    }
}

// ── Tests ───────────────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn kind_returns_correct_tag() {
        assert_eq!(AppError::domain("x").kind(), "domain");
        assert_eq!(AppError::not_found("u", "1").kind(), "not_found");
        assert_eq!(AppError::conflict("x").kind(), "conflict");
        assert_eq!(AppError::validation("x").kind(), "validation");
        assert_eq!(AppError::storage("x").kind(), "storage");
    }

    #[test]
    fn display_formats_variants() {
        assert_eq!(
            AppError::domain("bad state").to_string(),
            "domain error: bad state"
        );
        assert_eq!(
            AppError::not_found("user", "42").to_string(),
            "not found: user 42"
        );
        assert_eq!(
            AppError::conflict("stale etag").to_string(),
            "conflict: stale etag"
        );
        assert_eq!(
            AppError::validation("missing field").to_string(),
            "validation error: missing field"
        );
        assert_eq!(
            AppError::storage("disk full").to_string(),
            "storage error: disk full"
        );
    }

    #[test]
    fn from_str_creates_domain() {
        let err: AppError = "something went wrong".into();
        assert!(matches!(err, AppError::Domain(_)));
        assert_eq!(err.to_string(), "domain error: something went wrong");
    }

    #[test]
    fn from_string_creates_domain() {
        let err: AppError = String::from("custom message").into();
        assert!(matches!(err, AppError::Domain(_)));
    }

    #[test]
    fn from_io_error_creates_storage() {
        let io_err = std::io::Error::new(std::io::ErrorKind::NotFound, "file missing");
        let err: AppError = io_err.into();
        assert!(matches!(err, AppError::Storage(_)));
    }

    #[test]
    fn from_anyhow_creates_domain() {
        let any_err = anyhow::Error::msg("something failed");
        let err: AppError = any_err.into();
        assert!(matches!(err, AppError::Domain(_)));
    }

    #[test]
    fn from_anyhow_preserves_cause_chain() {
        // Verify that the chain-walking logic in `From<anyhow::Error>`
        // preserves the full causal trail, not just the outermost context.
        let inner = anyhow::Error::msg("inner cause");
        let outer = inner.context("middle context");
        let root = outer.context("root context");
        let err: AppError = root.into();
        let display = err.to_string();
        assert!(display.contains("root context"), "should contain outermost");
        assert!(display.contains("middle context"), "should contain middle");
        assert!(display.contains("inner cause"), "should contain innermost");
    }

    #[test]
    fn log_warn_preserves_error() {
        let err = AppError::domain("ephemeral").log_warn();
        assert_eq!(err.kind(), "domain");
    }

    #[test]
    fn log_error_preserves_error() {
        let err = AppError::storage("ephemeral").log_error();
        assert_eq!(err.kind(), "storage");
    }

    #[test]
    fn appresult_alias_works() {
        fn fallible() -> AppResult<i32> {
            Ok(42)
        }
        assert_eq!(fallible().unwrap(), 42);
    }

    /// For any non-empty string, constructing a [`AppError::Domain`] and
    /// reading back `.kind()` must return `"domain"`.
    #[test]
    fn proptest_domain_kind() {
        use proptest::prelude::*;
        let mut runner = proptest::test_runner::TestRunner::default();
        runner
            .run(&any::<String>(), |msg| {
                // Skip empty strings – they are valid but add no signal.
                if msg.is_empty() {
                    return Ok(());
                }
                let err = AppError::domain(&msg);
                prop_assert_eq!(err.kind(), "domain");
                let display = err.to_string();
                prop_assert!(display.contains(&msg), "display {:?} should contain {:?}", display, msg);
                Ok(())
            })
            .unwrap();
    }

    /// For any non-empty entity and id strings, constructing a
    /// [`AppError::NotFound`] and reading back `.kind()` must return
    /// `"not_found"`.
    #[test]
    fn proptest_not_found_kind() {
        use proptest::prelude::*;
        let mut runner = proptest::test_runner::TestRunner::default();
        runner
            .run(&(any::<String>(), any::<String>()), |(entity, id)| {
                if entity.is_empty() || id.is_empty() {
                    return Ok(());
                }
                let err = AppError::not_found(&entity, &id);
                prop_assert_eq!(err.kind(), "not_found");
                let display = err.to_string();
                prop_assert!(display.contains(&entity));
                prop_assert!(display.contains(&id));
                Ok(())
            })
            .unwrap();
    }
}
