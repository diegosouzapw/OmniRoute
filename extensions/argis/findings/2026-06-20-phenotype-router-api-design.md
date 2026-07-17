# phenotype-router API Design (Option B per ADR-050)

**Date:** 2026-06-20
**Status:** DESIGN — implements §8 ACCEPTED router architecture (Option B)
**Supersedes:** none
**Refs:** ADR-050 (Router rebuild Option B), ADR-051 (Bifrost as library), ADR-052 (Plugin SDK spec)

---

## Executive summary

`phenotype-router` is the **Phenotype-owned decision layer** for LLM routing. Per ADR-050 §8 ACCEPTED, Bifrost is demoted to a **transport-only library** (not a wrapper) and the routing/fallback/retry logic moves to a standalone Go service. This document defines:

1. The Go API surface
2. The configuration schema
3. The plugin interface (compatible with ADR-052)
4. The decision flow algorithm
5. The OTel trace schema (companion to `findings/2026-06-20-otel-span-schema.md`)

---

## 1. API Surface (Go types)

```go
// Package router is the Phenotype-owned LLM decision layer (ADR-050).
package router

import (
    "context"
    "time"
)

// Router is the entry point. Construct via NewRouter(cfg).
type Router struct {
    cfg          Config
    providers    map[string]Provider
    selectors    []Selector
    plugins      []Plugin
    fallback     FallbackStrategy
    tracer       Tracer
    auditLog     AuditLog
}

// Route is a per-intent routing plan.
type Route struct {
    Primary     ProviderRef            // first-choice provider
    Fallbacks   []ProviderRef          // ordered fallback chain
    Plugins     []string               // plugin names applied in order
    Timeout     time.Duration          // per-decision deadline
    Audit       AuditMeta              // for the trace + audit log
}

// ProviderRef is a reference to a configured provider (OpenAI, Anthropic, llama, etc.).
type ProviderRef struct {
    Name    string                    // "openai", "anthropic", "llama-cpp"
    Model   string                    // "gpt-4o", "claude-3-5-sonnet"
    Region  string                    // optional, for region-pinned routing
    Weight  float32                   // 0.0-1.0 for weighted selection
}

// ProviderSelector picks which provider(s) to consider.
type ProviderSelector interface {
    Select(ctx context.Context, intent Intent) ([]ProviderRef, error)
    Name() string
}

// FallbackStrategy decides what to do when the primary fails.
type FallbackStrategy interface {
    Next(ctx context.Context, intent Intent, lastErr error) (ProviderRef, bool, error)
    Name() string
}

// Plugin is a side-effect application (cache check, safety filter, PII strip).
// See ADR-052 for the full SDK spec.
type Plugin interface {
    Name() string
    Apply(ctx context.Context, intent *Intent) (*Intent, error)
    // Returns modified intent (or same if no change) and any error.
}

// Decision is the final routed answer + metadata.
type Decision struct {
    Route      Route
    Provider   ProviderRef
    Response   []byte                  // raw response bytes (caller parses)
    Latency    time.Duration
    SpanID     string                  // OTel span ID for correlation
    AuditID    string                  // audit-log row ID
}

// Intent is what the caller wants to route.
type Intent struct {
    Model      string                  // requested model
    Messages   []Message               // chat history
    Tools      []ToolDef               // tool/function definitions
    Metadata   map[string]string       // caller-supplied tags (tenant, feature)
}
```

---

## 2. Configuration Schema (YAML)

```yaml
# phenotype-router.yaml
version: v1

router:
  default_timeout_ms: 5000
  max_fallback_depth: 3
  audit:
    enabled: true
    sink: "pheno-audit"               # federated service per ADR-023
  tracing:
    otlp_endpoint: "localhost:4318"    # pheno-tracing collector (companion finding)
    service_name: "phenotype-router"
    service_version: "v0.1.0"

providers:
  openai:
    kind: openai-compat
    api_key_env: OPENAI_API_KEY
    base_url: https://api.openai.com/v1
    models: [gpt-4o, gpt-4o-mini]
  anthropic:
    kind: anthropic
    api_key_env: ANTHROPIC_API_KEY
    models: [claude-3-5-sonnet-latest]
  llama-cpp:
    kind: llama-cpp
    base_url: http://localhost:8080
    models: [llama-3.1-70b]

selectors:
  - name: cost-aware
    kind: cost-tier
    tiers:
      - cheap: [gpt-4o-mini, claude-haiku]
      - mid:   [gpt-4o, claude-3-5-sonnet]
      - premium: [gpt-4-turbo, claude-3-opus]
  - name: region-pinned
    kind: region
    default_region: us-west-2

fallback:
  kind: chain
  on_status: [429, 500, 502, 503, 504]
  on_error_class: [timeout, rate_limit]
  max_depth: 3

plugins:
  - name: contentsafety
    kind: external
    endpoint: http://contentsafety:8080/scan
  - name: cache
    kind: in-memory
    ttl_seconds: 60
  - name: smartfallback
    kind: plugin-sdk                     # ADR-052 plugin
    config:
      cooldown_seconds: 30
```

---

## 3. Plugin Interface (ADR-052 compatible)

```go
// Apply transforms the intent before provider dispatch.
// Returns the (possibly modified) intent. Returning the same intent pointer
// means no change. Plugins run in declared order; any plugin may short-circuit
// by returning a non-nil error.
type Plugin interface {
    Name() string
    Apply(ctx context.Context, intent *Intent) (*Intent, error)
}

// Built-in plugins (ship with phenotype-router):
//   - cache:           in-memory + Redis LRU cache
//   - contentsafety:   pre-routing PII / toxicity strip
//   - smartfallback:   per-provider cooldown + jitter
//   - budget:          monthly-cost cap enforcement
//   - audit:           always-on trace + log emission
//
// External plugins (loaded via ADR-052 SDK):
//   - custom tenant policies
//   - experiment A/B routing
//   - multi-armed bandit exploration
```

---

## 4. Decision Flow (5-step pseudocode)

```
function Decide(ctx, intent):
    # Step 1: Resolve selectors → candidate provider set
    candidates = []
    for selector in selectors:
        c, err = selector.Select(ctx, intent)
        if err: log.warn; continue
        candidates.append(c)
    candidates = dedupe(candidates)
    if len(candidates) == 0:
        return error("no_providers_match")

    # Step 2: Apply plugins (transform intent)
    span = tracer.start("router.decision")
    for plugin in plugins:
        intent, err = plugin.Apply(ctx, intent)
        if err:
            span.event("plugin.failed", plugin.Name())
            return error("plugin_rejected", plugin.Name())

    # Step 3: Pick primary (highest weight among candidates)
    primary = pick_weighted(candidates)
    span.set_attr("router.selected_provider", primary.Name+"/"+primary.Model)

    # Step 4: Fallback loop
    depth = 0
    while depth < max_fallback_depth:
        decision, err = dispatch(ctx, primary, intent)
        if err == nil:
            decision.Route = Route{Primary: primary, ...}
            span.set_attr("router.decision_latency_ms", latency)
            span.end()
            auditLog.write(decision.AuditID, primary, depth)
            return decision
        # failure → ask fallback strategy for next
        next, ok, ferr = fallback.Next(ctx, intent, err)
        if ferr or not ok:
            span.event("fallback.exhausted")
            return error("all_providers_failed")
        span.event("fallback.triggered", primary.Name, next.Name)
        primary = next
        depth++

    return error("fallback_depth_exceeded")
```

---

## 5. OTel Trace Schema

See companion doc: `findings/2026-06-20-otel-span-schema.md`.

Spans emitted by `phenotype-router`:

| Span name | Attributes | Events |
|-----------|------------|--------|
| `router.decision` | `router.intent`, `router.selected_provider`, `router.decision_latency_ms` | `provider.failed`, `fallback.triggered` |
| `router.fallback` | `router.fallback_chain`, `router.fallback_depth` | `provider.failed` |
| `router.provider_select` | `router.selector`, `router.candidates_count` | — |
| `router.plugin_apply` | `router.plugin`, `router.plugin_latency_ms` | `plugin.failed` |

OTLP/HTTP client: `findings/2026-06-20-pheno-tracing-go-client-skeleton.go`

---

## 6. Interop with Bifrost (transport layer)

Per ADR-051, Bifrost is pinned as a **library**, not wrapped. `phenotype-router` uses Bifrost's client only for:

- HTTP/SSE transport to provider APIs (Bifrost's `provider.Execute(ctx, req)`)
- Provider capability discovery (Bifrost's `provider.Capabilities(model)`)

`phenotype-router` does **not** use Bifrost's routing, fallback, or plugin subsystems — those are replaced by the types in §1.

---

## 7. Versioning & compatibility

- `phenotype-router` v0.1.0: initial release (post-v11 §8 ACCEPTED)
- Plugin SDK contract: locked at ADR-052 v1 (semver)
- Config schema: locked at v1 (changes via schema migration doc)

---

## 8. Out of scope (deferred)

- Multi-region active/active routing (v0.2.0)
- Stream cancellation propagation (v0.2.0, depends on Bifrost v1.5.21 stream-compat)
- Cost reconciliation (v0.3.0, depends on pheno-cost-card adoption)
- Per-tenant quota (v0.3.0, depends on pheno-mcp-router tiers)

---

**End of design doc — total ~150 lines.**
