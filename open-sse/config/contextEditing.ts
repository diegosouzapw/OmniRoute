/**
 * Anthropic Context Editing — delegated, server-side compression for Claude.
 *
 * Unlike OmniRoute's local compression engines (which rewrite the request body
 * before it leaves the proxy), Context Editing asks the *provider* to clear
 * stale tool-use/tool-result blocks from the running context window. We only
 * attach a body param (`context_management.edits[]`); Claude does the clearing
 * against its own tokenizer. The beta is advertised via the `anthropic-beta:
 * context-management-2025-06-27` header, which OmniRoute already emits on Claude
 * requests (see `anthropicHeaders.ts`).
 *
 * This is a Claude-only capability by nature — other providers would reject the
 * param. Callers MUST gate invocation to the genuine Claude provider; this
 * module does not inspect the provider itself.
 *
 * Strategy ids and shapes are pinned from live Anthropic docs
 * (platform.claude.com/docs/en/build-with-claude/context-editing).
 */

/** Dated strategy id that clears old tool-use / tool-result pairs. */
export const CLEAR_TOOL_USES_STRATEGY = "clear_tool_uses_20250919";

/** Dated strategy id that clears old extended-thinking turns. */
export const CLEAR_THINKING_STRATEGY = "clear_thinking_20251015";

/** Default token threshold that triggers clearing (Anthropic default is 100k). */
export const CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS = 100000;

/** Recent tool-use/result pairs kept untouched when clearing. */
export const CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES = 3;

type ContextEditingEdit = { type?: unknown; [key: string]: unknown };

/**
 * Mutate an Anthropic Messages request body in place to delegate context
 * clearing to the provider. Adds the `clear_tool_uses_20250919` strategy to
 * `context_management.edits[]`, composing with any `clear_thinking_20251015`
 * edit already present — Anthropic requires `clear_thinking` to be listed first,
 * so thinking edits are stable-sorted to the front.
 *
 * Idempotent: if a `clear_tool_uses` edit already exists (added by a previous
 * call or supplied by the client), the body is left as-is. No-op when disabled
 * or when `body` is not a plain object.
 *
 * @param body  The outbound Anthropic-format request body (mutated in place).
 * @param opts.enabled  Whether Context Editing is on for this request.
 */
export function applyContextEditingToBody(
  body: Record<string, unknown> | null | undefined,
  opts: { enabled: boolean }
): void {
  if (!opts.enabled || !body || typeof body !== "object") return;

  const existing =
    body.context_management && typeof body.context_management === "object"
      ? (body.context_management as Record<string, unknown>)
      : {};

  const edits: ContextEditingEdit[] = Array.isArray(existing.edits)
    ? [...(existing.edits as ContextEditingEdit[])]
    : [];

  const hasToolUseEdit = edits.some((edit) => edit && edit.type === CLEAR_TOOL_USES_STRATEGY);

  if (!hasToolUseEdit) {
    edits.push({
      type: CLEAR_TOOL_USES_STRATEGY,
      trigger: { type: "input_tokens", value: CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS },
      keep: { type: "tool_uses", value: CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES },
    });
    // Anthropic requires clear_thinking edits to precede clear_tool_uses. Array
    // sort is stable in modern Node, so same-key edits keep their relative order.
    edits.sort((a, b) => {
      const aRank = a && a.type === CLEAR_THINKING_STRATEGY ? 0 : 1;
      const bRank = b && b.type === CLEAR_THINKING_STRATEGY ? 0 : 1;
      return aRank - bRank;
    });
  }

  existing.edits = edits;
  body.context_management = existing;
}

/**
 * Telemetry receipt for one Claude response that ran server-side context editing.
 * `clearedInputTokens` is how many input tokens the provider pruned from its own
 * context window — i.e. the tokens "saved" on subsequent turns by the delegated
 * clearing (the value we surface in compression analytics under
 * `engine: "context-editing"`).
 */
export interface ContextEditingTelemetry {
  /** Number of applied edit entries the provider reported. */
  editCount: number;
  /** Total input tokens cleared across all applied edits. */
  clearedInputTokens: number;
  /** Total tool-use/result pairs cleared across all applied edits. */
  clearedToolUses: number;
}

/** Coerce a finite, non-negative integer; returns 0 for junk. */
function toClearedInt(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value));
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.max(0, Math.floor(parsed));
  }
  return 0;
}

/** Read a nested property by key path without throwing on missing intermediates. */
function getNested(obj: unknown, keys: string[]): unknown {
  let cur: unknown = obj;
  for (const key of keys) {
    if (!cur || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

/**
 * Extract the context-editing telemetry receipt from a Claude (Anthropic Messages)
 * response body. Returns `null` when context editing did not run (no applied edits,
 * or nothing was actually cleared).
 *
 * Defensive over the response shape: Anthropic surfaces `applied_edits` under
 * `context_management` (top-level), and some response variants nest it under
 * `usage`. We probe both rather than pin a single location, so the telemetry keeps
 * working if the provider moves the field. Per-edit cleared counts are read from
 * `cleared_input_tokens` / `cleared_tool_uses` (snake_case) with a camelCase
 * fallback.
 */
export function extractContextEditingTelemetry(
  responseBody: unknown
): ContextEditingTelemetry | null {
  if (!responseBody || typeof responseBody !== "object") return null;

  const candidates: unknown[] = [
    getNested(responseBody, ["context_management", "applied_edits"]),
    getNested(responseBody, ["usage", "context_management", "applied_edits"]),
    getNested(responseBody, ["usage", "applied_edits"]),
  ];
  const edits = candidates.find((c) => Array.isArray(c)) as unknown[] | undefined;
  if (!Array.isArray(edits) || edits.length === 0) return null;

  let clearedInputTokens = 0;
  let clearedToolUses = 0;
  for (const entry of edits) {
    if (!entry || typeof entry !== "object") continue;
    const edit = entry as Record<string, unknown>;
    clearedInputTokens += toClearedInt(edit.cleared_input_tokens ?? edit.clearedInputTokens);
    clearedToolUses += toClearedInt(edit.cleared_tool_uses ?? edit.clearedToolUses);
  }

  if (clearedInputTokens <= 0 && clearedToolUses <= 0) return null;
  return { editCount: edits.length, clearedInputTokens, clearedToolUses };
}
