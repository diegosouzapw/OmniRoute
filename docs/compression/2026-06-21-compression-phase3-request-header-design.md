---
title: "Compression Config Panel — Phase 3: Per-Request Header"
version: 3.8.33
lastUpdated: 2026-06-21
---

# Compression Config Panel — Phase 3: Per-Request Header

**Status:** approved direction (2026-06-21), pending spec review
**Base branch:** `release/v3.8.33` (Phase 1 #4432, Phase 2 #4521 merged)
**Goal:** Let a client override the resolved compression plan for a single request via the
`x-omniroute-compression` HTTP header, taking precedence over every operator-configured
layer (routing override, active profile, auto-trigger, Default). The compression resolver
is already header-aware in shape; Phase 3 adds the header parsing, threads the value to the
top of the resolver, and surfaces the resolved plan back to the client via a response header.

Phase 1 (#4432) built the `engines` map, `deriveDefaultPlan`, `resolveCompressionPlan`
(header/active-combo-aware in signature), and persisted `activeComboId`. Phase 2 (#4521)
wired the active-profile selector and lifted active-combo resolution into `resolveBasePlan`.
Phase 3 is the final piece of the original three-phase plan.

---

## 1. Background — current state

The resolver is **partially** header-aware but the header never reaches the top of the
decision. From the code map:

- **`open-sse/services/compression/resolveCompressionPlan.ts`** already accepts
  `ResolveCtx.header` and interprets `off` / `default` / `engine:<id>` / `<combo>` via a
  private `headerToPlan` helper. **But** no caller ever passes `header` today, so the branch
  is dormant.
- **`open-sse/services/compression/strategySelector.ts`** is the real entry point
  (`selectCompressionStrategy`, `selectCompressionPlan`, `getEffectiveMode`, `applyCompression`).
  Its `resolveBasePlan` only calls `resolveCompressionPlan` in **two** of five precedence
  paths (routing-combo override and the `enginesExplicit` derived-default). The
  **active-profile** and **auto-trigger** paths short-circuit and `return` *before* those
  calls. So merely threading `header` into the existing `resolveCompressionPlan` calls would
  **not** give the header top precedence — it would be silently ignored whenever an active
  profile is set (the common case after Phase 2). The header must be evaluated at the **top**
  of `resolveBasePlan`.
- **`open-sse/handlers/chatCore/headers.ts`** already has the parsing precedent:
  `isNoMemoryRequested` (`x-omniroute-no-memory`, PR #4290) + the case-insensitive
  `getHeaderValueCaseInsensitive` reader.
- **`src/lib/db/compressionCombos.ts`**: a combo's `id` is a `uuidv4()` (except the seeded
  `default-caveman`), and its `name` is `TEXT NOT NULL` with **no UNIQUE constraint**
  (migration 042). So a header value that names a combo is far more usable as the **name**
  than the opaque UUID `id`.
- **`open-sse/handlers/chatCore.ts`** builds the response headers (`X-OmniRoute-Model`,
  `X-OmniRoute-Cache`, …) via `buildStreamingResponseHeaders` + `attachOmniRouteMetaHeaders`
  on the main response path. There is currently **no** response header reporting the applied
  compression plan.

---

## 2. The header contract

`x-omniroute-compression: <value>` — mirrors the `x-omniroute-no-memory` / `no-cache`
convention. Parsed alongside the other omniroute request headers. Keyword values and the
`engine:` prefix are case-insensitive. Values:

| Value | Meaning |
|---|---|
| `off` | No compression for this request. |
| `default` | The **panel-derived Default** plan, deterministically — ignores active profile, routing override, **and** auto-trigger. |
| `engine:<id>` | A single engine, when that engine is enabled in config (e.g. `engine:rtk`). |
| `<combo>` | A named combo. Matched **by name (case-insensitive) first, then by exact id**. |

**Decision A — combo matched by name:** because the stored `id` is a UUID, the ergonomic
header value is the combo's **name** (e.g. `my-fast-combo`). Names are not unique in the DB,
so the contract is documented as **first-match-wins**; clients wanting determinism can pass
the exact `id`.

**Decision B — an explicit header value is authoritative:** any valid value
(`off` / `default` / `engine:<id>` / `<combo>`) **bypasses auto-trigger**. For example,
`default` on a very large prompt keeps the panel Default rather than auto-escalating. The
mental model is "the header decides, full stop."

**Invalid / unknown value → ignored.** Resolution falls through to the normal operator
precedence; the request is **never** rejected. A debug log line under the `COMPRESSION`
channel records the unrecognized value for observability.

---

## 3. Architecture

### 3.1 Resolution model (per request, most-specific wins)

```
x-omniroute-compression header        (per-request)   <- NEW top of precedence
  -> routing-combo override (comboOverrides[comboId])  (per-route)
    -> active profile (activeComboId)                  (global, Phase 2)
      -> auto-trigger (large prompt -> autoTriggerMode)
        -> Default = derived from panel engines map
          -> off (master disabled, or zero engines on)
```

The header is evaluated at the **top** of `resolveBasePlan`. A valid value returns its plan
immediately; an unknown value falls through to the existing precedence unchanged.

### 3.2 The resolver `source`

`resolveBasePlan` (and the public `selectCompressionPlan`) return the existing
`DerivedPlan` (`{ mode, stackedPipeline }`) extended with an **optional** `source` field —
which precedence layer decided the plan:

`request-header` | `routing-override` | `active-profile` | `auto-trigger` | `default` | `off`

`mode` answers *what* compression runs; `source` answers *who* decided. The field is
optional so Phase 1/2 callers and snapshots are unaffected. chatCore reads `plan.source`
(+ `plan.mode`) to build the response header.

### 3.3 Header parsing helper

A new pure function in `open-sse/handlers/chatCore/headers.ts`, mirroring
`isNoMemoryRequested`:

```ts
export function resolveCompressionHeader(
  headers: Record<string, unknown> | Headers | null | undefined
): string | null {
  const value = (getHeaderValueCaseInsensitive(headers, "x-omniroute-compression") || "").trim();
  return value || null;
}
```

It returns the raw trimmed value (or `null`); the resolver owns interpretation and casing
rules (so the single source of truth for "what a value means" stays in the resolver, with
the parser only reading the wire).

### 3.4 Threading

chatCore reads the header from `clientRawRequest?.headers`, then passes it as a new
`header?: string | null` argument (default `undefined`) through
`selectCompressionStrategy` / `selectCompressionPlan` / `getEffectiveMode` ->
`resolveBasePlan`, exactly the pattern Phase 2 used for `combos`. Phase 1/2 call sites that
omit the argument are byte-for-byte unchanged.

For the `<combo>` form, chatCore builds the named-combo map keyed by **both** combo `id` and
lowercased `name` (`{ [c.id]: c.pipeline, [c.name.toLowerCase()]: c.pipeline }`). The
active-profile lookup keys on `config.activeComboId` (always a UUID/slug `id`), so the added
name keys are inert for it — one map serves both paths. The resolver matches `<combo>`
**name-first** (per Decision A): it looks up the value lowercased (hitting a `name` key, or an
already-lowercase `id`), then falls back to the value as-is (an exact `id`) —
`combos[value.toLowerCase()] ?? combos[value]`. All combo `id`s are lowercase
(`uuidv4()` hex or the `default-caveman` slug), so an exact id still resolves on the first
lookup.

### 3.5 Where the header logic lives

The existing `headerToPlan` interpretation (`off` / `default` / `engine:<id>` / `<combo>`)
is reused. `resolveBasePlan` evaluates the header **before** the routing-override branch.
`default` routes to `deriveDefaultPlanFromConfig` (which already handles both
`enginesExplicit` and legacy `defaultMode`), so `default` means "the Default profile" for
every install type. The resolver remains **pure** — no `src/lib/db` import (enforced by the
existing cycle/source guard).

---

## 4. Observability

A new `compression` key in `OMNIROUTE_RESPONSE_HEADERS`
(`src/shared/constants/headers.ts`) -> response header:

```
X-OmniRoute-Compression: <mode>; source=<source>
```

Examples: `aggressive; source=request-header`, `off; source=request-header`,
`stacked; source=active-profile`, `lite; source=auto-trigger`, `off; source=off`.

chatCore captures `{ mode, source }` from the compression resolution (computed early,
~line 1530) into an outer-scope variable and injects the header when building
`responseHeaders` (~line 4697), so it appears on both streaming and non-streaming
responses. The header is informational only and never affects routing.

---

## 5. Error handling & safety

- **Header absent / blank** -> `null`; behaviour is byte-identical to Phase 2.
- **Unknown value** -> silent fall-through to normal resolution + a `COMPRESSION` debug log;
  never a 4xx. The response header reflects the layer that actually won (e.g.
  `source=auto-trigger`), not `request-header`.
- **`engine:<id>` naming a disabled / unknown engine** -> fall-through (same rule as the
  current `headerToPlan`: returns `null`).
- **Gating:** the header is honored **unconditionally**, like `x-omniroute-no-memory`.
  Rationale: it only affects the compression of the **client's own request**. The worst case
  is a client opting *itself out* of compression (`off`), which increases only that client's
  own upstream token count — there is no cross-tenant, security, or cost-shifting concern.

---

## 6. Components (units & responsibilities)

| Unit | Responsibility | Depends on |
|---|---|---|
| `resolveCompressionHeader` (`chatCore/headers.ts`) | Read the raw header value off the wire. | `getHeaderValueCaseInsensitive` |
| `resolveBasePlan` + `headerToPlan` (`strategySelector.ts` / `resolveCompressionPlan.ts`) | Interpret the value, evaluate header-first precedence, return `{ mode, stackedPipeline, source }`. | config, combos map (pure) |
| `DerivedPlan.source` (`deriveDefaultPlan.ts` type) | Carry which layer decided. | — |
| `OMNIROUTE_RESPONSE_HEADERS.compression` (`shared/constants/headers.ts`) | Name the response header. | — |
| chatCore wiring (`chatCore.ts`) | Parse, thread `header`, build id+name combo map, capture `{mode,source}`, emit response header. | all of the above |

---

## 7. Testing

- **Parser unit** (`headers.ts`): each value form, absent, blank, mixed casing, value with
  surrounding whitespace -> correct raw/`null`.
- **Resolver unit** (`strategySelector` / `resolveCompressionPlan`): each form resolves the
  expected plan and `source`; header beats an active profile and a routing override;
  unknown value falls through to normal resolution; a valid value bypasses auto-trigger on a
  large prompt; `default` returns the derived Default for both `enginesExplicit` and legacy
  installs; `<combo>` matches by name and by id.
- **Integration / fetch-capture**: per-request precedence end-to-end (same config, header
  present vs absent yields different applied plans) and the `X-OmniRoute-Compression`
  response header value.
- **Source guard**: the resolver still has no `src/lib/db` import.

---

## 8. Scope

**In scope:** header parsing, top-of-precedence wiring, `source` on `DerivedPlan`, the
response header, docs (`API_REFERENCE` / `COMPRESSION_GUIDE`), tests.

**Out of scope (YAGNI):** bare mode names in the header (`lite`/`aggressive`/…); panel UI for
the header; honoring the header on non-chat paths (`combo.ts` proactive-fallback, the
preview route). The header is a chat-request feature.
