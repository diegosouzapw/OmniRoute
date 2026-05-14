---
title: "Guardrails"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Guardrails

> **Source of truth:** `src/lib/guardrails/`
> **Last updated:** 2026-05-13 — v3.8.0

Guardrails enforce safety, policy, and content transformations at the boundary
between OmniRoute and upstream providers. Each guardrail can inspect (and
optionally reject, transform, or annotate) request payloads (`preCall`) and
upstream responses (`postCall`).

The system is **fail-open**: if a guardrail throws while executing, the registry
records the error and continues with the next guardrail rather than failing the
request. Blocking is an explicit decision (`block: true`), never an accident.

## Built-in Guardrails

The registry auto-loads three guardrails in priority order on import
(see `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Name               | Stage(s)       | File                 |
| -------- | ------------------ | -------------- | -------------------- |
| `5`      | `vision-bridge`    | `preCall`      | `visionBridge.ts`    |
| `10`     | `pii-masker`       | `pre` + `post` | `piiMasker.ts`       |
| `20`     | `prompt-injection` | `preCall`      | `promptInjection.ts` |

Lower priority numbers run **first**.

### Vision Bridge (`visionBridge.ts`)

Intercepts image-bearing requests aimed at **non-vision models** and replaces
the image parts with text descriptions produced by a configurable vision model
before the upstream call. This lets text-only providers transparently handle
multimodal payloads.

Flow:

1. Skip if the target model already supports vision (unless it appears in the
   forced-bridge list `isVisionBridgeForcedModel`).
2. Extract image parts via `extractImageParts(messages)`. Skip if none.
3. Load runtime config from `getSettings()` (`visionBridgeEnabled`,
   `visionBridgeModel`, `visionBridgePrompt`, `visionBridgeTimeout`,
   `visionBridgeMaxImages`).
4. Cap images at `maxImages`, call the vision model **in parallel**
   (`Promise.allSettled`), and inject `[Image N]: <description>` text parts
   in their place — failed images become `[Image N]: (unavailable)`.
5. Return `modifiedPayload` + meta (`imagesProcessed`, `processingTimeMs`,
   `visionModel`).

Defaults live in `src/shared/constants/visionBridgeDefaults.ts`. The guardrail
exposes a `deps` constructor option so tests can inject fake `getSettings` and
`callVisionModel` implementations.

### PII Masker (`piiMasker.ts`)

Runs on **both** stages.

- **`preCall`** clones the payload, walks `system`, `messages`, and `input`
  arrays, and applies `processPII()` (from `@/shared/utils/inputSanitizer`) to
  string `content`/`text` fields. When `PII_REDACTION_ENABLED=true` **and**
  `INPUT_SANITIZER_MODE=redact`, detected PII is stripped/redacted in the
  outbound payload. Otherwise the call records detection counts without
  rewriting content.
- **`postCall`** deep-clones the response, runs `sanitizePIIResponse()` plus
  the Responses-API-shape masker (`maskResponsesOutput` — covers
  `output_text` and `output[].content[].text`). If any redaction occurs, the
  modified response replaces the original.

The guardrail never blocks; it only annotates (`meta.detections`,
`meta.redacted`) or rewrites.

### Prompt Injection (`promptInjection.ts`)

Detects adversarial structures in user-supplied content and enforces the
configured policy. Behavior is driven by environment variables and constructor
options:

| Setting         | Env var                                         | Default | Effect                                  |
| --------------- | ----------------------------------------------- | ------- | --------------------------------------- |
| Enabled         | `INPUT_SANITIZER_ENABLED`                       | `true`  | When `false`, guardrail short-circuits. |
| Mode            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE` | `warn`  | `block`, `warn`, or `log`.              |
| Block threshold | `blockThreshold` option                         | `high`  | Minimum severity required to block.     |

Detection sources:

1. `sanitizeRequest()` from `@/shared/utils/inputSanitizer` (shared detector
   set used elsewhere in the pipeline).
2. Built-in `DEFAULT_GUARD_PATTERNS` (currently `system_override_inline` and
   `markdown_system_block`, both `high` severity).
3. Optional `customPatterns` passed via constructor options (strings, regex,
   or `{ name, pattern, severity }` records).

When `mode === "block"` **and** at least one detection meets the severity
threshold, `preCall` returns `{ block: true, message: "Request rejected:
suspicious content detected" }`. In `warn`/`log` modes the guardrail logs but
allows the call. The shared helper `evaluatePromptInjection()` is also exported
for callers that need to evaluate prompts without going through the registry.

## Base Contract (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

A guardrail signals "no change" by returning either `void`, `{}`, or
`{ block: false }`. Returning a `modifiedPayload`/`modifiedResponse` replaces
the value flowing through the chain for downstream guardrails.

## Registry (`registry.ts`)

The singleton `guardrailRegistry` exposes:

- `register(guardrail)` — adds (or replaces by normalized name) a guardrail and
  re-sorts by ascending `priority`.
- `clear()` / `list()` — administrative helpers.
- `runPreCallHooks(payload, context)` — iterates active guardrails, threads the
  payload through `modifiedPayload`, and stops on the first `block: true`.
- `runPostCallHooks(response, context)` — same flow on the response side.
- `resetGuardrailsForTests({ registerDefaults })` — clears state and optionally
  re-registers the defaults for clean test isolation.

Both runners return `{ blocked, payload|response, results, guardrail?, message? }`
where `results` is an array of `GuardrailExecutionResult` records that include
per-guardrail `blocked`, `skipped`, `modified`, `error`, and `meta` fields,
useful for tracing.

### Disabling Guardrails Per-Request

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` aggregates a
de-duplicated list of guardrail names that should be skipped for the current
request. Sources (all optional, all merged):

- `apiKeyInfo.disabledGuardrails`
- Request body `disabledGuardrails` (top-level)
- Request body `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (or legacy
  `x-disabled-guardrails`)

Values may be arrays of strings or a comma-separated string; names are
normalized to lowercase kebab-case (`pii_masker` → `pii-masker`). The result
is passed through `context.disabledGuardrails` to the registry, which skips
matching guardrails (`skipped: true` in `results`).

## Execution Order

For each request flowing through `src/sse/handlers/chat.ts` and
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` builds the skip list from API key, body,
   and headers.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` runs guardrails in ascending
   priority order:
   - Disabled guardrails are recorded as `skipped`.
   - Each guardrail's `preCall` may rewrite the payload via `modifiedPayload`.
   - The first `block: true` short-circuits the chain and the handler returns
     a guardrail rejection response.
3. The (potentially rewritten) payload flows into combo routing and upstream
   dispatch.
4. After the response is assembled, `guardrailRegistry.runPostCallHooks(...)`
   runs the same chain on the response. `block: true` here drops the upstream
   response.

Guardrails that throw are recorded with `error: <message>` and logged via
`logger.warn`, but the chain continues — fail-open by design.

## Configuration

Environment variables read by the built-in guardrails:

| Variable                              | Used by                          | Effect                                                |
| ------------------------------------- | -------------------------------- | ----------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`               | Set `false` to disable detection entirely.            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`, `pii-masker` | Shared mode: `warn`, `block`, `log`, or `redact`.     |
| `INJECTION_GUARD_MODE`                | `prompt-injection`               | Legacy alias for `INPUT_SANITIZER_MODE`.              |
| `PII_REDACTION_ENABLED`               | `pii-masker`                     | When `true` + mode `redact`, request PII is stripped. |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)        | Controls response-side masker behavior.               |

The Vision Bridge reads runtime config from the DB-backed settings store
(`getSettings()`), not env vars: `visionBridgeEnabled`, `visionBridgeModel`,
`visionBridgePrompt`, `visionBridgeTimeout`, `visionBridgeMaxImages`. Defaults
live in `src/shared/constants/visionBridgeDefaults.ts`.

## Custom Guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Steps:

1. Create `src/lib/guardrails/myGuardrail.ts` extending `BaseGuardrail`.
2. Implement `preCall` and/or `postCall`.
3. Either register at import time (push from `registerDefaultGuardrails`) or
   call `guardrailRegistry.register(...)` at runtime — the registry replaces
   any prior guardrail with the same normalized name.
4. Add tests under `tests/unit/` (existing examples:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testing

Use `resetGuardrailsForTests()` between tests to start from a known state.
Pass `{ registerDefaults: false }` to start with an empty registry and
register only the guardrails under test. The Vision Bridge guardrail accepts
dependency injection (`deps.getSettings`, `deps.callVisionModel`) so tests can
exercise the full flow without DB or network access.

## See Also

- `src/lib/guardrails/` — implementation
- `src/shared/utils/inputSanitizer.ts` — shared detector that powers
  prompt-injection and PII masking
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge defaults and
  forced-bridge model list
- `docs/architecture/RESILIENCE_GUIDE.md` — orthogonal layer (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — full env var reference
