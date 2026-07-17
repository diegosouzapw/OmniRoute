# OTel Span Schema — phenotype-router (decision layer)

**Task:** T4.1 / T4.2 / T4.3 — OTel bridge for the `phenotype-router` Go service.
**Date:** 2026-06-20 (v11 closure day; §8 ACCEPTED Option B per ADR-050 + ADR-051).
**Status:** SPEC (informative; pheno-observability collector is the consumer of choice).
**Owner:** worklog-schema circle + pheno-observability federation point.
**Target collector:** `pheno-observability` OTel collector (OTLP/HTTP, port `4318`).
**Schema URL:** `https://opentelemetry.io/schemas/1.26.0` (semconv v1.26.0).

---

## 1. Scope

This document defines the OpenTelemetry span contract emitted by the
`phenotype-router` decision layer (per ADR-050 + ADR-051). It covers:

1. The **Resource** attributes that identify the process.
2. The **span hierarchy** the router emits per decision cycle.
3. The **span attributes** attached to each span.
4. The **span events** added when a provider is skipped / fails, or when
   fallback is triggered.
5. Sampling guidance, error-status mapping, and an example trace.

The Go skeleton in `2026-06-20-pheno-tracing-go-client-skeleton.go` and its
companion test in `2026-06-20-pheno-tracing-go-client-skeleton_test.go`
are the reference implementation of this schema.

This schema is **internal to Phenotype** and is not a public OpenTelemetry
semantic convention. Names are prefixed with `router.` to make ownership
unambiguous and to avoid collision with the OTel registry.

---

## 2. Resource attributes

Set once at process start via `resource.Merge(resource.Default(), ...)`.

| Attribute        | Value                  | Source                  | Notes                                  |
| ---------------- | ---------------------- | ----------------------- | -------------------------------------- |
| `service.name`   | `phenotype-router`     | `semconv.ServiceName`   | Constant `ServiceName`.                |
| `service.version`| `v0.1.0`              | `semconv.ServiceVersion`| Constant `ServiceVersion`. Bump per release. |
| `telemetry.sdk.language` | `go`          | `semconv.TelemetrySDKLanguage` | Provided by `resource.Default()`. |
| `telemetry.sdk.name`    | `opentelemetry` | `semconv.TelemetrySDKName`     | Provided by `resource.Default()`. |
| `telemetry.sdk.version` | SDK build ver. | `semconv.TelemetrySDKVersion`  | Provided by `resource.Default()`. |

If the process is running under a container orchestrator (k8s, fly, render),
the resource detector SHOULD add `k8s.*`, `container.*`, and `process.*`
attributes. This skeleton does not wire detectors explicitly; rely on the
runtime for v0.1.0.

---

## 3. Span hierarchy

One **root span** per decision cycle, with optional **child spans** for
fallback, provider selection, and plugin application. Hierarchy:

```
router.decision                       (root; one per request)
├── router.provider_select            (the primary provider chosen)
│   ├── plugin.A.apply  (= router.plugin_apply)
│   ├── plugin.B.apply  (= router.plugin_apply)
│   └── plugin.N.apply  (= router.plugin_apply)
├── router.fallback                   (only when fallback is triggered)
│   ├── router.provider_select        (the fallback provider)
│   │   └── router.plugin_apply       (per-plugin on the fallback path)
│   ├── router.provider_select        (the tertiary provider, etc.)
│   └── router.plugin_apply
└── (events at any level: provider.skipped, provider.failed, fallback.triggered)
```

**Invariant:** every `router.decision` MUST end with at least one of:

- a successful `router.provider_select` child with status `Ok`, OR
- a `router.fallback` child whose own terminal child has status `Ok`, OR
- a span-level status of `Error` (no provider succeeded).

A `router.decision` with neither a successful provider nor an explicit
`Error` status is a **schema violation**.

---

## 4. Span definitions

### 4.1 `router.decision` (root)

- **Kind:** `Internal`.
- **Span name:** `router.decision`.
- **Required attributes:**
  - `router.intent` (string) — the parsed user intent (e.g. `"summarize"`,
    `"code_review"`, `"translate.fr->en"`). Always present, even if empty
    string for anonymous calls.
  - `router.selected_provider` (string) — the provider that ultimately
    served the request (after fallback). May equal the primary if no
    fallback occurred.
  - `router.fallback_chain` (string[]) — the ordered fallback chain
    selected at decision time (e.g. `["openai", "anthropic", "local_llama"]`).
    JSON-encoded as a single string per OTel attribute-array convention.
  - `router.plugin_chain` (string[]) — the plugins applied in order.
  - `router.decision_latency_ms` (int64) — wall-clock latency from intent
    receipt to selected provider response, in milliseconds. Always set
    before the span ends.
- **Status:** `Ok` on success, `Error` with a description if no provider
  succeeded.
- **Events:** zero or more of `provider.skipped`, `provider.failed`,
  `fallback.triggered` (see §6).

### 4.2 `router.fallback`

- **Kind:** `Internal`.
- **Span name:** `router.fallback`.
- **Required attributes:**
  - `router.intent` (string) — duplicated from parent for query convenience.
  - `router.fallback_chain` (string[]) — chain at the moment fallback fired.
- **Status:** `Ok` if any chain member succeeded, `Error` otherwise.
- **Events:** zero or more `provider.skipped` / `provider.failed` events
  describing why each fallback tier was considered and either skipped or
  failed before the next tier was attempted.

### 4.3 `router.provider_select`

- **Kind:** `Internal`.
- **Span name:** `router.provider_select`.
- **Required attributes:**
  - `router.selected_provider` (string) — the provider being evaluated
    (e.g. `"openai"`).
- **Optional attributes:**
  - `router.plugin_chain` (string[]) — plugins applied during this
    provider's execution (carried over from `router.decision`).
- **Status:** `Ok` if the provider returned a usable response, `Error`
  with a description if it failed or was skipped mid-flight.

### 4.4 `router.plugin_apply`

- **Kind:** `Internal`.
- **Span name:** `router.plugin_apply` (one per plugin invocation).
- **Required attributes:** none defined at the schema level; plugin
  authors MAY add their own attributes using the `plugin.<name>.*` prefix.
- **Status:** `Ok` if the plugin completed; `Error` if it threw.
- **Note:** a plugin failure MUST NOT mark the parent `router.provider_select`
  as `Error` unless the plugin is a hard requirement of the provider
  (recorded in the provider's contract, not in this schema).

---

## 5. Attribute definitions

All attributes live under the `router.` namespace.

| Attribute                     | Type     | Required on             | Semantics                                  |
| ----------------------------- | -------- | ----------------------- | ------------------------------------------ |
| `router.intent`               | string   | decision, fallback      | Parsed user intent.                        |
| `router.selected_provider`    | string   | decision, provider_select | The provider that owns this span.         |
| `router.fallback_chain`       | string[] | decision, fallback      | JSON-encoded ordered list of provider IDs. |
| `router.plugin_chain`        | string[] | decision, provider_select | JSON-encoded ordered list of plugin names. |
| `router.decision_latency_ms`  | int64    | decision                | Total decision latency in milliseconds.   |

**Encoding note:** `string[]` follows the OTel convention of encoding
arrays as a single JSON string. Example: `["openai","anthropic"]`. The
collector-side pipeline SHOULD normalize this back to a real array for
Grafana / Tempo consumption.

**Reserved future attributes (do not use yet):**

- `router.cost_usd` (float) — reserved for v0.2.0 cost telemetry.
- `router.model` (string) — reserved for per-provider model selection.
- `router.user_id_hash` (string) — reserved for tier-2 billing audit.

---

## 6. Event definitions

Events are short-lived annotations attached to a span.

### 6.1 `provider.skipped`

Emitted on `router.decision` or `router.fallback` when a provider was
considered but skipped without invocation.

**Attributes:**

| Attribute      | Type   | Required | Notes                                          |
| -------------- | ------ | -------- | ---------------------------------------------- |
| `provider`     | string | yes      | The provider that was skipped.                 |
| `reason`       | string | yes      | One of: `cost_exceeded`, `unavailable`, `policy_deny`, `tier_mismatch`, `rate_limited`. |
| `chain_index`  | int    | no       | Position in the fallback chain. 0 = primary.   |

### 6.2 `provider.failed`

Emitted on `router.decision` or `router.fallback` when a provider was
invoked and returned an error.

**Attributes:**

| Attribute      | Type   | Required | Notes                                          |
| -------------- | ------ | -------- | ---------------------------------------------- |
| `provider`     | string | yes      | The provider that failed.                      |
| `error.kind`   | string | yes      | Short error tag (e.g. `timeout`, `5xx`, `4xx`, `auth`). |
| `error.message`| string | no       | Truncated error message (max 256 chars).       |
| `chain_index`  | int    | no       | Position in the fallback chain.                |
| `http.status_code` | int | no      | HTTP status if applicable.                     |

### 6.3 `fallback.triggered`

Emitted exactly once on `router.decision` whenever the primary provider
did not succeed and the router proceeded to a fallback tier.

**Attributes:**

| Attribute        | Type     | Required | Notes                                          |
| ---------------- | -------- | -------- | ---------------------------------------------- |
| `from_provider`  | string   | yes      | The provider that triggered fallback.          |
| `to_provider`    | string   | yes      | The first provider tried in fallback.          |
| `chain`          | string[] | yes      | JSON-encoded remaining chain.                  |
| `trigger_reason` | string   | yes      | Echoes the `provider.failed.error.kind` or `provider.skipped.reason`. |

---

## 7. Sampling

**Default:** `ParentBased(TraceIdRatio(1.0))` for v0.1.0 (sample everything
in dev / staging). Production rollouts SHOULD switch to
`ParentBased(TraceIdRatio(0.10))` once traffic exceeds 100 req/s sustained.

The Go skeleton wires the default `sdktrace.NewTracerProvider` with
`AlwaysSample` for v0.1.0. Operators override via env-driven sampler config
in v0.2.0 (not in scope here).

---

## 8. Error status mapping

| Outcome                            | `router.decision` status | Span events                            |
| ---------------------------------- | ------------------------ | -------------------------------------- |
| Primary succeeds                   | `Ok`                     | none                                   |
| Primary skipped → fallback succeeds| `Ok`                     | `provider.skipped`, `fallback.triggered` |
| Primary failed → fallback succeeds | `Ok`                     | `provider.failed`, `fallback.triggered` |
| Primary fails, fallback fails      | `Error` (msg: "all providers exhausted") | `provider.failed` per tier |

---

## 9. Example trace (text)

```
trace_id=0xaaaa... span_count=4 duration=132ms

router.decision                       132ms  Ok
  router.intent="summarize"
  router.selected_provider="anthropic"
  router.fallback_chain=["openai","anthropic","local_llama"]
  router.plugin_chain=["auth","ratelimit","audit"]
  router.decision_latency_ms=132
  ├─ event provider.skipped {provider=openai, reason=rate_limited, chain_index=0}
  ├─ event fallback.triggered {from_provider=openai, to_provider=anthropic, chain=["anthropic","local_llama"], trigger_reason=rate_limited}
  ├─ router.provider_select  98ms  Ok
  │   router.selected_provider=anthropic
  │   router.plugin_chain=["auth","ratelimit","audit"]
  │   ├─ router.plugin_apply  1ms  Ok   (auth)
  │   ├─ router.plugin_apply  2ms  Ok   (ratelimit)
  │   └─ router.plugin_apply  3ms  Ok   (audit)
  └─ (no further children)
```

---

## 10. Versioning

- **v0.1.0** (this doc) — initial contract for the §8 router-architecture
  decision layer. No breaking changes accepted inside the v0.1.x series.
- **v0.2.0** (planned) — add `router.cost_usd`, `router.model`,
  `router.user_id_hash`. Bump `service.version` on the resource.
- **v1.0.0** (planned) — schema freeze. Any further addition requires
  a new ADR.

Changes follow ADR-015 v2.1 worklog cadence (L5-104.5). Each schema change
ships with a worklog entry keyed on the attribute / event / span name.

---

## 11. Reference implementation pointers

- Go skeleton: `2026-06-20-pheno-tracing-go-client-skeleton.go`
- Go test:    `2026-06-20-pheno-tracing-go-client-skeleton_test.go`
- Substrate:  `KooshaPari/pheno-observability` (collector; not modified by this task)
- ADR-050:    router-architecture Option B (Bifrost-as-library)
- ADR-051:    Phenotype-owned decision layer
- ADR-012:    `pheno-tracing` canonical across pheno-* repos
- ADR-013:    `pheno-mcp-router` substrate (parallel precedent)