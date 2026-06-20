---
title: "Delegated Context Editing (Anthropic)"
version: 3.8.31
lastUpdated: 2026-06-20
---

# Delegated Context Editing (Anthropic)

Delegated **Context Editing** is a Claude-only context-management feature. Unlike OmniRoute's local
compression engines (Caveman, RTK, LLMLingua, stacked pipelines) — which rewrite the request body
*before* it leaves the proxy — Context Editing asks the **provider** to clear stale
tool-use / tool-result blocks from its own running context window. OmniRoute only attaches a body
parameter (`context_management.edits[]`); Claude does the actual clearing against its own tokenizer.

This is a delegated capability by nature: other providers reject the parameter, so OmniRoute scopes
it strictly to Claude and Claude-Code-compatible relays.

Source of truth: `open-sse/config/contextEditing.ts` (strategy ids, body injection, telemetry
extraction), `open-sse/executors/base.ts` (injection gate + 400-fallback), and
`open-sse/services/compression/types.ts` (config shape + default).

## What `clear_tool_uses` does

OmniRoute injects a single edit into the outbound Anthropic Messages body:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — the dated Anthropic strategy id (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — once the request's input tokens exceed this threshold, Claude begins
  clearing old tool-use/result pairs (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic's default).
- `keep.value: 3` — the N most recent tool-use/result pairs are kept untouched
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

The beta is advertised via the `anthropic-beta: context-management-2025-06-27` header, which
OmniRoute already emits on Claude requests.

Injection is performed by `applyContextEditingToBody()` and is **idempotent**: if a `clear_tool_uses`
edit already exists on the body (added by a previous call or supplied by the client), the body is
left as-is. If a `clear_thinking_20251015` edit is also present, OmniRoute stable-sorts the
`clear_thinking` edit to the front, because Anthropic requires `clear_thinking` to precede
`clear_tool_uses` in the `edits[]` array.

## The per-combo enable toggle

Context Editing is **off by default** and opt-in. The toggle is a single boolean carried in the
compression config:

- Setting key: `contextEditing.enabled` (camelCase — **not** `context_editing` / `context-editing`).
- Type: `ContextEditingConfig { enabled: boolean }` in
  `open-sse/services/compression/types.ts`.
- Default: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod schema: `contextEditingConfigSchema` in `src/shared/validation/compressionConfigSchemas.ts`.
- Storage: persisted with the rest of the compression settings (normalized in
  `src/lib/db/compression.ts`).

In the dashboard the toggle lives in the compression hub
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) and writes
`{ contextEditing: { enabled: … } }` back through `saveSettings()`. Because it rides on the
compression-settings object, it composes with the per-combo compression profile rather than being a
fully independent surface — the config carries only the on/off flag; all thresholds (`trigger`,
`keep`) are the constants documented above.

## Claude-only gating

Injection only happens for genuine Claude or Claude-Code-compatible relays. The gate in
`open-sse/executors/base.ts` is:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — real Anthropic key/OAuth.
- `isClaudeCodeCompatible(this.provider)` — relays whose provider id starts with the
  `anthropic-compatible-cc-` prefix (they advertise Claude Code compatibility, so they are the relays
  most likely to accept the beta). See `open-sse/services/provider.ts`.

Deliberately **excluded**:

- `claude-web` — a browser relay with a `create_conversation_params` request shape that never sees
  `context_management`.
- Generic `anthropic-compatible-*` relays (without the `-cc-` prefix) — third-party endpoints with
  uncertain beta support.

Non-Claude providers never receive the `context_management` parameter even when the toggle is on.

## The 400-fallback / relay coverage

A Claude-compatible relay may advertise the beta but still reject the `context_management` parameter
with an HTTP 400. To degrade gracefully instead of failing the request, the executor strips the
parameter and retries the same URL **once**:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response.clone().text().catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

Behavior:

1. Fires only on a `400` while context editing is enabled and the body actually carries
   `context_management`.
2. The 400 body is read via a `clone()` so the original response stays intact for the non-matching
   path.
3. The error text must match `/context[_-]management|context editing/i` — an unrelated 400 (e.g.
   `max_tokens must be >= 1`) does **not** trigger the fallback; the original error propagates.
4. On a match it sets `contextEditingDisabled = true` (which suppresses re-injection if a fresh
   `transformedBody` is later built for a retry/fallback URL), deletes `context_management`,
   re-signs the body for Claude / Claude-Code-compatible relays (`signRequestBody`), and retries the
   same URL once.

Genuine Claude carries the beta in `ANTHROPIC_BETA_BASE` and does not hit this fallback path.

## `applied_edits` telemetry

After a Claude response, OmniRoute records how much context the provider actually cleared. This is
**not** streamed — it is extracted from the non-streaming response body, best-effort, and never
affects the response (telemetry failures are swallowed).

- Extraction: `extractContextEditingTelemetry(responseBody)` in `open-sse/config/contextEditing.ts`.
  It probes `applied_edits` in three locations (defensive over the response shape):
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- Per-edit fields read from each entry: `cleared_input_tokens` and `cleared_tool_uses`
  (snake_case, Anthropic-native), with `clearedInputTokens` / `clearedToolUses` camelCase fallbacks.
- Returns `null` when no `applied_edits` array is found or nothing was actually cleared.

The receipt shape is `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
Recording happens in `open-sse/handlers/chatCore.ts` (gated to `provider === "claude"`) via
`recordContextEditingTelemetry()` (`src/lib/db/compressionAnalytics.ts`), which writes a compression
analytics row tagged:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = the cleared input-token count
- `request_id` suffixed with `::context-editing`

So delegated clearing shows up in compression analytics alongside the local engines, under the
`context-editing` engine label, and is distinguishable from RTK/Caveman/LLMLingua savings.

## Relationship to the local compression engines

| Aspect            | Local engines (Caveman / RTK / LLMLingua / stacked) | Delegated Context Editing                  |
| ----------------- | --------------------------------------------------- | ------------------------------------------ |
| Where it runs     | In OmniRoute, before the request leaves the proxy   | In the provider (Claude), server-side      |
| What it edits     | Prompt / context / tool-result text                 | Old tool-use / tool-result blocks          |
| Provider scope    | All providers                                       | `claude` + `anthropic-compatible-cc-*` only |
| Toggle            | Compression mode settings                           | `contextEditing.enabled`                   |
| Failure mode      | Fail-open (original text)                           | 400-fallback: strip param, retry once      |
| Savings telemetry | `engine: <engine id>`                               | `engine: "context-editing"`                |

The two are complementary: local engines compress the bytes OmniRoute sends; Context Editing lets
Claude prune the running context across turns. They can be enabled together.

## See Also

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — engine registry and the local compression
  engines
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — command/tool-output compression
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP description compression and
  tool-cardinality reduction
- Source: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
