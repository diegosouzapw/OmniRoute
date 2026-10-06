---
title: "Error Message Sanitization"
version: 3.8.51
lastUpdated: 2026-09-02
---

# Error Message Sanitization

> **Source of truth:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, and the public builders in `open-sse/utils/error.ts`
> **Tests:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Last updated:** 2026-09-02 — v3.8.51
> **Audience:** Any engineer touching error responses (HTTP routes, SSE streams, executors, MCP handlers).
> **Status:** **MANDATORY** for every code path that returns an error message to a client.

## Why this exists

CodeQL rule `js/stack-trace-exposure` (CWE-209) flags any code path where an error message originating from a runtime exception reaches an HTTP / SSE response without being sanitized. Stack traces and absolute file paths in production responses give attackers:

- Internal directory layout (`/srv/app/src/lib/...`) → reconnaissance for further attacks.
- Library / framework versions inferred from stack frames → targeted exploit selection.
- Sensitive runtime values that may be string-interpolated into errors (DB queries, config values).

The `sanitizeErrorMessage` helper exported by `open-sse/utils/error.ts` strips these classes of
leakage:

1. Physical, serialized, and unambiguously inline JavaScript stack-frame tails.
2. Absolute POSIX, Windows, UNC, and `file://` filesystem paths, while preserving safe HTTPS URLs
   and explicitly marked API routes.
3. Credential assignments, common provider token formats, private-key PEM blocks, and base64 data
   URLs.

The sanitizer caps input length and fails closed when a thrown value rejects string coercion.
Recursive upstream JSON sanitization also drops unsafe credential/path keys, session aliases, and
prototype-control keys before a response is serialized.

## The mandatory pattern

### 1. Building an error response (HTTP / API routes)

Use `buildErrorBody()` — sanitization is built-in:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handler logic ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Or, for the convenience wrappers in the same module:

```ts
import {
  errorResponse, // one-shot Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } shape
  unavailableResponse, // adds Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

All of these apply the canonical public-error boundary. `errorResponse`, `writeStreamError`, and
`createErrorResult` route through `buildErrorBody`; the three specialized retry/circuit helpers
project and sanitize their public context directly. **You never need to call
`sanitizeErrorMessage` manually** when using these helpers.

### 2. Custom error envelopes (rare)

When you can't use the helpers above (e.g. the response shape is dictated by an upstream protocol like Connect-RPC), import `sanitizeErrorMessage` directly:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

This is the only sanctioned way to assemble a custom error body. See `open-sse/executors/cursor.ts::buildErrorResponse` for the reference implementation.

### 3. Logging vs. responding

Trusted internal exceptions may keep their full message and stack so operators can debug. Values
originating at provider, validation, browser-session, or credential-adjacent boundaries must be
sanitized before they enter console output, audit metadata, or persistent call logs. Pattern:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // trusted internal exception only
  return errorResponse(500, getErrorMessage(err)); // sanitized — sent to client
}
```

For provider-controlled failures, project the logged value too:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Forbidden patterns

❌ **Never** put raw exception output in a Response body:

```ts
// BAD: stack trace + file paths reach the client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Never** roll your own first-line splitter:

```ts
// BAD: forgets to strip absolute paths, may drift from the canonical helper
const safe = String(err).split("\n")[0];
```

❌ **Never** sanitize in the route and forget the SSE path. Anything that writes to a stream goes through `writeStreamError` (or its underlying `buildErrorBody`).

❌ **Never** intentionally include `process.cwd()`, `__filename`, `__dirname`, or env-derived paths
in error messages. The sanitizer covers absolute paths as defense in depth, but callers must not
construct topology-bearing messages in the first place.

## Coverage in CI

`tests/unit/error-message-sanitization.test.ts` enforces:

- Every route under `/api/model-combo-mappings/*` returns sanitized bodies on 4xx/5xx.
- `sanitizeErrorMessage` strips multi-line stack traces.
- `sanitizeErrorMessage` replaces POSIX and Windows absolute paths with `<path>`.
- `sanitizeErrorMessage` handles `null`/`undefined`/`Error` instance inputs safely.
- `buildErrorBody` never exposes stack traces in its `message` field.

When adding a new route or executor, copy the assertion pattern from this file. The coverage gate (`npm run test:coverage`) enforces ≥60% statements/lines/functions/branches — error paths must be covered.

## Related controls

- `js/stack-trace-exposure` CodeQL alerts in `.github/security` should always be **either** fixed via these helpers **or** dismissed with a comment citing this doc.
- The `pino` redaction config (`src/shared/utils/logRedaction.ts`) handles trusted structured logs
  separately. This document covers public response messages and provider-controlled values that
  cross persistent call/proxy-log boundaries.
- Upstream-header denylist (`src/shared/constants/upstreamHeaders.ts`) covers header leakage — keep both files aligned when adding a new exfiltration concern.

## Upstream details passthrough

`buildErrorBody` accepts an optional third argument `upstreamDetails` (raw
parsed body from the upstream provider). When provided, it is sanitized by
`sanitizeUpstreamDetails` before inclusion in the response as `upstream_details`.

An optional fourth argument `classification`
(`{ type?: string; code?: string; reason?: string }`) accepts an explicit public classification.
Every field is projected onto the bounded public-identifier vocabulary. Unsafe, credential-shaped,
control-character, or overlong values fall back to the status-derived type/code; an unsafe optional
reason is omitted. Three-digit HTTP status identifiers (`100` through `599`) remain valid for
provider contracts that expose the numeric upstream status as a machine-readable code. The same
bounded range is accepted in the locally generated HTTP-status placeholder form; arbitrary provider
numbers and names remain outside the vocabulary.

Pass every explicit classification in that fourth argument. Never overwrite
`body.error.code`, `body.error.type`, or `body.error.reason` after `buildErrorBody()` returns;
post-builder mutation bypasses the public projection.

Sanitization rules applied to `upstreamDetails`:

1. String leaves: run through `sanitizeErrorMessage` (strips stacks + absolute paths).
2. Unsafe path, credential, session-alias, and prototype-control keys are removed.
3. Depth cap: nesting beyond 4 levels is replaced with the string `"[truncated]"`.
4. Arrays are capped at 32 elements.

Only call sites with a parsed provider error body should pass `upstreamDetails`. Internal OmniRoute
errors (SSE parse failures, empty content, guardrail blocks) must not include it.

Do NOT pass raw `err.stack`, `err.message`, or any string from a runtime exception to
`upstreamDetails`. Those must still go through `errorResponse` / `buildErrorBody(code, msg)`
without an upstream body.

Selective upstream 4xx passthrough preserves the provider's safe JSON shape and wording required by
client auto-recovery, but it is not byte-for-byte passthrough: the recursive sanitizer always runs
before serialization. Cyclic, BigInt-bearing, or hostile `toJSON()` bodies fail closed and are not
eligible for passthrough. OCR and moderation apply the same rule; non-JSON, blank, or mislabeled
upstream bodies are converted to the canonical OmniRoute JSON error envelope.

## Known CodeQL limitation: custom sanitizers not recognized

The CodeQL query [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) uses a fixed allowlist of sanitizer patterns (e.g. inline `.split("\n")[0]`, `String#replace` with specific regex shapes, access to `.message` on `Error`). It does **not** recognize indirection through a custom helper like our `sanitizeErrorMessage()`.

This means callsites that demonstrably sanitize via this module — for example `open-sse/utils/error.ts::errorResponse` and `open-sse/executors/cursor.ts::buildErrorResponse` — may continue to raise the alert even though the code is functionally safe. Precedent dismissals: `#224`, `#231` (May 2026), both marked `false positive` with technical justification.

**How to handle a new occurrence:**

1. Confirm the callsite actually routes the message through `sanitizeErrorMessage` / `buildErrorBody` / one of the wrappers documented above (read the call chain end-to-end — don't trust a comment).
2. Confirm `tests/unit/error-message-sanitization.test.ts` exercises the path (or add coverage).
3. Dismiss the alert via `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` referencing this doc.
4. Do **not** "fix" by inlining `.split("\n")[0]` everywhere — the helper is the single source of truth; duplicating the pattern weakens the sanitizer (loses path scrubbing, length cap, type coercion) for the appearance of placating the scanner.

Adopting opt-in features like CodeQL's [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) is the long-term fix; it lives outside this doc.

## References

- [CWE-209: Information Exposure Through an Error Message](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Error Handling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit centralizing the helper: `1a39c31f` — _fix(security): mask public upstream creds + centralize error sanitization_
