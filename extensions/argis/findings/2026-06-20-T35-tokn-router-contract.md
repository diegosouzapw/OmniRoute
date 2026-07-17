# T35: Tokn Router Contract — Draft for Canonical Rust Routing Substrate

**Author:** forge-2 (research + draft contract, no code changes)
**Date:** 2026-06-20
**Repo:** `KooshaPari/Tokn`
**Working dir reference:** `/Users/kooshapari/CodeProjects/Phenotype/repos/Tokn/`
**v11 context:** v11 closure branch `chore/orch-v11-016-tier0-2026-06-20` @ `7184fbb`. §8 ACCEPTED Option B (Bifrost as library; Phenotype-owned decision layer) anchors Tokn's role as the **fleet-wide Rust token routing / selection substrate** for the non-LLM half of Phenotype.

---

## 1. What Tokn actually is (corrects a possible assumption)

Reading `Tokn/SPEC.md` (3,164 lines) + `Tokn/AGENTS.md` (19 lines) + `Tokn/ARCHITECTURE.md` (51 lines, 90% placeholder):

- **Tokn is a token management system.** SPEC.md §1: *"high-performance token management and modularization system designed for modern distributed architectures. It provides secure, scalable token lifecycle management with support for multiple token formats, storage backends, and extensible plugin architecture."*
- It is **not** an HTTP request router. `grep -iE "routing|router|route"` over `SPEC.md` returns **zero** hits.
- SPEC.md §4 (Token Lifecycle API, lines 298–500) defines a state machine: `Created → Active → {Expired, Revoked, Refreshed, Validated}`.
- SPEC.md §5 (Modular Architecture, lines ~200–295) defines four **traits** that plugins implement: `RateLimiter`, `TokenStore`, `Revocation`, `AuditLogger`. The plugin host runs these as WASM or native (dlopen) modules.
- SPEC.md Appendix G (Selection, lines 2981–3060) defines strategy-selection tables for: token formats (JWT vs PASETO), storage (stateless vs stateful vs hybrid), signature algorithms (EdDSA primary, ES256 fallback), key rotation (kid-based + gradual overlap), caching (Redis/Badger), rate-limiting algorithms (token bucket vs sliding window), and plugin isolation (WASM vs native vs gRPC vs in-process).

**Important correction to the task framing:** the user mentions "ADR-001" as the basis for Tokn's role. ADR-001 in the monorepo's `docs/adr/2026-06-14/` says:

> *ADR-001 | NetScript | **DELETE** (Rust→Go port abandoned; use `phenotype-go-sdk/pkg/lexer` instead)*

ADR-001 is about **NetScript** (a Rust→Go port that was abandoned in favor of the Go lexer) — **it does not name Tokn** as the routing substrate. The "Tokn as canonical routing substrate" framing is a **v11 §8 inference** (Option B puts the *decision layer* on the Phenotype side, and Tokn is the Rust candidate for the token-format/strategy decision portion of that layer) — it is consistent with ADR-001 only insofar as both ADRs point away from a custom Rust lexer (NetScript) in favor of using an existing substrate (Go lexer, or Tokn).

This draft contract treats Tokn as the **canonical Rust substrate for *token-format and token-strategy routing*** (i.e., "given this issuance/validation request, which format / algorithm / key / storage / plugin-chain should I use?") — not as a request router. This is the role the v11 §8 Option B leaves room for, and the only "routing" surface the existing SPEC.md actually supports (the Appendix G "Selection" tables are themselves a routing policy).

---

## 2. The gap in the existing Tokn contract

SPEC.md §3–§5 define the **plugin traits** (storage, rate-limit, revocation, audit) but **do not define a router** that decides:

- *which* plugin should handle a given token operation (now: every plugin of the same trait races; now: every plugin sees every request — wasteful and race-prone).
- *which* token format to issue (now: caller passes `format: TokenFormat` explicitly — `IssueTokenRequest.format` line 375).
- *which* signature algorithm + key to sign with (now: chosen implicitly by `sign_token(&claims, request.format)` line 433).
- *which* storage backend to read from (now: first-wins; no policy).
- *which* key-rotation strategy is active for this `kid` (now: implicit).

Without a `Router` trait, every "selection" in Appendix G is a static, hard-coded constant — there is no way for the gateway fleet to influence Tokn behavior at runtime, and no way for the Argis gateway's intelligentrouter plugin to coordinate with Tokn's signing-key choice.

This is the gap T35 closes.

---

## 3. Draft `TokenRouter` contract (Rust trait)

This is a **draft** — not yet written to `Tokn/src/`. The shape is intentionally minimal and is designed to be **WASM-safe** (no `async fn` in trait objects; uses the Tokio-channel pattern from `librustasync-wasm` that Tokn already requires per Appendix G.7) and to **compose** with the four existing traits, not replace them.

### 3.1 The trait

```rust
//! Draft — TokenRouter trait (T35).
//! Lives at: tokn/src/router/mod.rs (proposed).
//! Status:   DRAFT 2026-06-20, not yet merged.

use async_trait::async_trait;
use serde::{Deserialize, Serialize};

/// The decision a TokenRouter makes for a single token operation.
///
/// All fields are populated by the router. The TokenService then dispatches
/// to the matching plugin(s) using these fields as a key. Fields left as
/// `None` mean "use the default behavior the existing TokenService would have
/// chosen" — this preserves backwards compat with hard-coded Appendix G
/// selections while letting the router override individual axes.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RoutingDecision {
    /// Which storage backend to use (Postgres, Redis, Badger, ...).
    pub storage: Option<StorageTarget>,

    /// Which token format to issue (JWT, PASETO, JWE).
    pub format: Option<TokenFormat>,

    /// Which signature algorithm + key ID to sign with.
    pub signer: Option<SignerTarget>,

    /// Which rate-limit policy to apply (token bucket, sliding window, ...).
    pub rate_limit: Option<RateLimitTarget>,

    /// Which audit sink should receive the event (file, OTLP, ...).
    pub audit_sink: Option<AuditTarget>,

    /// Optional pointer to the plugin chain (if not the default chain).
    /// Multiple plugins on the same trait race; this can pin to one or
    /// order them.
    pub plugin_chain: Option<PluginChainRef>,

    /// Reason string for tracing/logging (human-readable).
    pub reason: String,
}

/// Decision context — what the router sees.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RoutingContext {
    /// The original IssueTokenRequest / ValidateTokenRequest / RevokeTokenRequest.
    pub operation: TokenOperation,

    /// The caller identity (subject, tenant, audience).
    pub caller: CallerIdentity,

    /// Optional hints from upstream (gateway, intelligent router, ...).
    /// For example: Argis's `intelligentrouter` plugin can stamp
    /// `hints.preferred_signer_kid` based on the LLM task type.
    pub hints: RoutingHints,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum TokenOperation {
    Issue(IssueTokenRequest),
    Validate(ValidateTokenRequest),
    Revoke(RevokeTokenRequest),
    Refresh(RefreshTokenRequest),
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct RoutingHints {
    /// Upstream may suggest a signer `kid` (e.g., from Argis routing).
    pub preferred_signer_kid: Option<String>,
    /// Upstream may pin storage (e.g., "Redis only — not Postgres" for hot path).
    pub preferred_storage: Option<StorageTarget>,
    /// Compliance tag (PCI, HIPAA, ...) may force a format/algorithm choice.
    pub compliance: Vec<String>,
}

/// The router trait — one impl per strategy (table-driven, CEL-based, ML-based).
#[async_trait]
pub trait TokenRouter: Send + Sync {
    /// Stable identifier for logging / config.
    fn name(&self) -> &str;

    /// Make a routing decision for a single token operation.
    /// MUST be pure (no side effects) — same input → same output.
    async fn decide(&self, ctx: &RoutingContext) -> Result<RoutingDecision, RouterError>;

    /// Optional: short-circuit override for a known pattern.
    /// `predicate` returns true if this router wants to handle the request.
    /// Multiple routers can match — the highest `priority` wins.
    fn priority(&self) -> u32 { 100 }

    fn matches(&self, ctx: &RoutingContext) -> bool { true }
}

#[derive(Debug, thiserror::Error)]
pub enum RouterError {
    #[error("no decision: {0}")]
    NoDecision(String),
    #[error("router misconfigured: {0}")]
    Misconfigured(String),
    #[error("router backend unavailable: {0}")]
    BackendUnavailable(String),
}
```

### 3.2 Composition rules (how `Router` interacts with existing traits)

| Existing trait       | How `Router` influences it                                                                                                                                       | Backwards compat                                                              |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `RateLimiter`        | `RoutingDecision.rate_limit = Some(RateLimitTarget::Named("burst-100ps"))` selects among multiple `RateLimiter` plugins via the registry.                          | Default: first registered plugin wins (current behavior). No break.           |
| `TokenStore`         | `RoutingDecision.storage = Some(StorageTarget::Redis)` selects the `TokenStore` plugin.                                                                          | Default: first registered plugin wins. No break.                                |
| `Revocation`         | Router cannot select the `Revocation` plugin (revocation is unconditional); router *can* set `routing_decision.reason` for audit.                                 | N/A.                                                                            |
| `AuditLogger`        | `RoutingDecision.audit_sink = Some(AuditTarget::OTLP)` selects which `AuditLogger` to write to. Multiple sinks may receive the event (fan-out).                   | Default: all registered sinks receive (current behavior). No break.            |
| Token format         | `RoutingDecision.format` overrides `IssueTokenRequest.format` (line 375 of SPEC.md) **only when caller passed the default** (currently `TokenFormat::Auto`).        | If caller passed an explicit `format`, the router is **advisory only** unless `RoutingHints.compliance` forces an override. |
| Signer / kid         | `RoutingDecision.signer = Some(SignerTarget{kid, algo})` selects the signing key + algorithm. Useful for compliance-driven algorithm selection (EdDSA → ES256).    | Default: existing `sign_token(&claims, request.format)` path. No break.        |
| Key rotation         | Router **cannot** rotate keys (that's a separate concern, owned by `KeyService`); router *can* choose which active `kid` to use based on token age / audience.     | N/A.                                                                            |

### 3.3 WASM-safety considerations

Per SPEC.md Appendix G.7, plugins default to WASM isolation. The `TokenRouter` trait **must** therefore be WASM-safe:
- No `async fn` returning `impl Trait` (use `async_trait::async_trait`).
- No direct DB / network access in the trait — the router receives all inputs as `Serialize`/`Deserialize` types and returns a decision; actual plugin dispatch happens host-side.
- No `tokio::spawn` from inside the router (Tokn already requires `WASM` primary isolation per G.7; spawn is bounded by the host's WASM runtime).
- `Send + Sync` bound only (not `Send + Sync + 'static` on async fns — handled by `async_trait`).

### 3.4 Configuration model (how the host wires a router in)

```rust
// tokn/src/config.rs (additions)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RouterConfig {
    /// Routers in priority order (highest first).
    /// If empty, no router is invoked → existing behavior (default selections).
    pub routers: Vec<RouterEntry>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RouterEntry {
    /// Type URL for the router plugin (e.g., "tokn::router::table::TableRouter").
    #[serde(rename = "type")]
    pub kind: String,

    /// Opaque config blob — passed to the router's `init`.
    pub config: serde_json::Value,

    /// Priority (higher = wins on conflict).
    pub priority: u32,
}
```

### 3.5 Built-in router implementations (proposed)

| Router kind             | Purpose                                                                                          | Use case                                          |
| :---------------------- | :----------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| `TableRouter`           | CEL or JSON-Logic expressions → decision table (think Apache CEL + Envoy route tables).           | Compliance-driven (PCI → ES256 + Postgres-only).  |
| `HintRouter`            | Pure pass-through: if `RoutingHints` has fields populated, mirror them into the decision.        | Argis gateway stamps hints; router honors them.   |
| `TenantRouter`          | Multi-tenant isolation: each tenant gets a fixed format/storage/signer from a config table.      | Enterprise tenants with contractual algo pinning. |
| `ComplianceRouter`      | Pattern-matches `compliance` tag list against a set of forced algorithms.                        | PCI, HIPAA, FedRAMP compliance.                   |
| `ChainRouter`           | Composition: invokes sub-routers in order; first non-None decision wins.                         | Compose `HintRouter` → `ComplianceRouter` → `TableRouter`. |

---

## 4. Cross-references and integration points

- **Argis gateway** (`KooshaPari/argis-extensions`): the `intelligentrouter` plugin can populate `RoutingHints.preferred_signer_kid` after the LLM-side routing decision is made (e.g., route to GPT-4 → use `kid=2026-q2-gpt4`); see findings/2026-06-20-T34-bifrost-bump-prep.md §4.
- **Phenotype registry** (`KooshaPari/phenotype-registry`): add a row for `KooshaPari/Tokn` once the Router contract lands; the registry row should declare the trait surface (`RateLimiter`, `TokenStore`, `Revocation`, `AuditLogger`, **+ `TokenRouter`**).
- **Worklog schema v2.1** (per ADR-025): every Tokn Router PR must carry `device:` field per the 11-column worklog schema; expected device is `heavy-runner` for trait work, `macbook` for spec/contract review.
- **71-pillar audit** (ADR-024): Tokn Router trait maps to **L4 (interface stability)**, **L7 (third-party integration drift)**, **L26 (trait coverage)**, **L46 (authz at decision points)**. Current Tokn score (not measured this turn — out of scope for T35 research) is the baseline.

---

## 5. Risks and open questions

| Open question                                                                                          | Owner        | Due (proposed)  |
| :------------------------------------------------------------------------------------------------------ | :----------- | :-------------- |
| Should `Router` be **mandatory** (every Tokn deploy must ship one) or **optional** (zero-config default = no router)? | T35 design session | before T35.1 implementation |
| How do we handle **router failure** (router returns `RouterError::NoDecision`) — fall back to defaults, or refuse the request? | T35 design session | before T35.1 implementation |
| Does the router see **all** token operations, or only `Issue` (validation may need to stay deterministic for perf)? | T35 design session | before T35.1 implementation |
| What's the **observability** contract — does the router emit trace spans (yes — needs OTLP integration with `pheno-tracing` per ADR-012)? | T35 design session | before T35.1 implementation |
| How does this interact with **federation mTLS + OIDC** (ADR-046)? The router could stamp `OIDC` hints from peer-token claims. | T35 + ADR-046 owner | post-ADR-046 land |

---

## 6. Concrete T35 execution steps (proposed — **do not execute from this research session**)

1. **T35.0 — Spec addition:** add §10 "Routing Layer" to `Tokn/SPEC.md` covering the trait, the `RoutingDecision` struct, composition rules, and the built-in router kinds. (Estimated: 2 hours on `device: macbook`.)
2. **T35.1 — Skeleton implementation:** add `tokn/src/router/{mod.rs, table.rs, hint.rs, chain.rs}` + tests (8-12 unit tests for `HintRouter` + `ChainRouter`; 4-6 integration tests with Postgres+Redis testcontainers). (Estimated: 1 day on `device: heavy-runner`.)
3. **T35.2 — Wire-in:** update `TokenService` (SPEC.md §4, lines 298–500) to invoke the router before each dispatch. Default-empty `RouterConfig` preserves current behavior. (Estimated: 4 hours on `device: heavy-runner`.)
4. **T35.3 — Registry + ADRs:** update `phenotype-registry` to declare the new trait surface; author `ADR-035-Tokn-Router` (next number in the v11 wave per ADR-035..040 pattern) recording the decision.
5. **T35.4 — Argis integration:** in `KooshaPari/argis-extensions`, have `intelligentrouter` populate `RoutingHints.preferred_signer_kid` based on the LLM-side routing decision. Verify end-to-end with a Postgres test fixture. (Estimated: 1 day on `device: heavy-runner`.)
6. **T35.5 — Audit re-score:** re-run the 71-pillar audit (ADR-024 / ADR-041 weekly cycle) on Tokn post-T35.1 land; verify L4, L7, L26, L46 go from 0/1 to 2/3.

**Estimated total wall-clock:** ~3 days across two devices, ~2 days MacBook-spec-and-ADR and ~1 day heavy-runner-implementation. Agrees with ADR-023 device-fit gate.

---

## 7. Cross-references

- `Tokn/SPEC.md` (3,164 lines) — §4 Token Lifecycle API; §5 Modular Architecture; Appendix G Selection tables.
- `Tokn/AGENTS.md` (19 lines) — `worktrees/<topic>/` branch discipline.
- `Tokn/ARCHITECTURE.md` (51 lines, mostly placeholder) — needs the T35 spec addition to land in §3 "Data Flow".
- ADR-001 (NetScript DELETE; recommends `phenotype-go-sdk/pkg/lexer` for Go-side lexing — **does not** name Tokn; the Tokn routing role is a v11 §8 Option B inference).
- v11 closure §8 ACCEPTED (Option B): Bifrost as library, **Phenotype-owned decision layer** — Tokn Router is the Rust half of that decision layer for the token/identity domain.
- ADR-024 (71-pillar audit framework): L4 / L7 / L26 / L46 are the relevant pillars.
- ADR-025 (worklog schema v2.1 with `device:` field).
- ADR-035B (event-bus substrate consolidation) — relates if TokenRouter decisions need to flow through the event bus.
- ADR-046 (federation mTLS + OIDC) — open question §5.
- Companion finding: `findings/2026-06-20-T34-bifrost-bump-prep.md` (this turn).

---

**End of T35 findings.**
