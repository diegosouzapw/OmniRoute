/**
 * kimiToolCallNarration.ts — recover structured tool calls from Kimi models
 * that mimic the executor's own history-narration format instead of emitting
 * a native Cursor tool call.
 *
 * Root cause
 * ----------
 * Cursor's agent API accepts ONE user message per Run, so `flattenMessages`
 * (cursorAgentProtobuf.ts) serializes prior `assistant.tool_calls` into plain
 * text for the model to read as context:
 *
 *     Assistant called tool <name> (<id>) with arguments: <json>
 *
 * Kimi-k3 / kimi-k3-high imitate that narration when they decide to call a
 * tool. Instead of a structured tool call the model emits the narration as
 * visible text, appends the complete JSON arguments, then closes with its
 * native generation-grammar delimiters:
 *
 *     <|close|>argument<|sep|><|close|>call<|sep|><|close|>tools<|sep|>
 *
 * Cursor's protobuf backend passes the whole thing through verbatim as text
 * with `finish_reason: "stop"`. The client then renders the raw narration
 * plus delimiters instead of a tool card, and — because the bad turn is
 * re-sent in history — the leak compounds on every subsequent turn.
 *
 * This module detects that narration + delimiter tail and converts it into a
 * structured OpenAI `tool_calls` entry so the leak never reaches the client.
 */

export interface RecoveredToolCall {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
}

export interface NarrationRecoveryResult {
  /** Visible content with the narration line and delimiter tail removed. */
  content: string;
  toolCalls: RecoveredToolCall[];
}

// The narration line that flattenMessages emits for prior assistant tool
// calls. Kimi reproduces it verbatim when it wants to call a tool. The id is
// wrapped in parens and may itself contain parens (the "(unknown)" placeholder
// is emitted as "((unknown))"), so the id group tolerates one nested level.
const NARRATION_RE =
  /Assistant called tool ([\w.\-:]+) \(((?:[^()]|\([^()]*\))*)\) with arguments: /;

// A single fragment of the Kimi closing grammar: a delimiter token
// (<|close|> / <|sep|>) or one of the grammar keywords that sit between
// delimiter tokens (argument / call / tools / name).
const TAIL_FRAGMENT = "<\\|(?:close|sep)\\|>|argument|call|tools|name";

// Matches the whole closing-grammar chain wherever it appears (used when the
// delimiters sit mid-string, before residual trailing prose).
const DELIM_CHAIN_RE = new RegExp("(?:\\s*(?:" + TAIL_FRAGMENT + "))+", "gu");

// Balanced-JSON scan: starting at `start`, return the end index (exclusive) of
// the first complete {...} object, honoring strings and escapes. -1 if the
// object never closes (truncated).
// Advance the string/escape state for one char. Returns the new state; the
// caller only tracks brace depth for chars that are outside a string.
function nextScanState(
  c: string,
  st: { inStr: boolean; esc: boolean }
): { inStr: boolean; esc: boolean; skip: boolean } {
  if (st.esc) return { inStr: st.inStr, esc: false, skip: true };
  if (c === "\\") return { inStr: st.inStr, esc: st.inStr, skip: true };
  if (c === '"') return { inStr: !st.inStr, esc: false, skip: true };
  return { inStr: st.inStr, esc: false, skip: st.inStr };
}

function scanJsonObjectEnd(text: string, start: number): number {
  if (text[start] !== "{") return -1;
  let depth = 0;
  let st: { inStr: boolean; esc: boolean; skip?: boolean } = { inStr: false, esc: false };
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    st = nextScanState(c, st);
    if (st.skip || st.esc) continue;
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

/**
 * Attempt to recover tool calls from Kimi narration text.
 * Returns null when the text does not match the narration shape (caller leaves
 * the response untouched).
 */
export function recoverKimiToolCallNarration(text: string): NarrationRecoveryResult | null {
  if (!text) return null;
  const m = NARRATION_RE.exec(text);
  if (!m) return null;

  const jsonStart = m.index + m[0].length;
  const jsonEnd = scanJsonObjectEnd(text, jsonStart);
  if (jsonEnd < 0) return null; // truncated arguments — nothing reliable to emit

  const argsJson = text.slice(jsonStart, jsonEnd);
  try {
    JSON.parse(argsJson);
  } catch {
    return null;
  }

  // Everything after the JSON: remove the delimiter-grammar chain wherever it
  // appears (the model may append trailing prose after the delimiters).
  const rawTail = text.slice(jsonEnd);
  const tail = rawTail.replace(DELIM_CHAIN_RE, " ").replace(/\s+/gu, " ").trim();

  // Visible content = prose before the narration line, plus any residual
  // non-delimiter tail text.
  const before = text.slice(0, m.index).replace(/[\s\n]+$/u, "");
  const content = tail ? (before ? before + "\n" + tail : tail) : before;

  const name = m[1];
  const rawId = m[2];
  const id = rawId && rawId !== "(unknown)" && rawId !== "unknown" ? rawId : genId();

  return {
    content,
    toolCalls: [{ id, type: "function", function: { name, arguments: argsJson } }],
  };
}

function genId(): string {
  return "call_" + Math.random().toString(36).slice(2, 14);
}

/**
 * Minimal shape of the cursor executor's stream/finalization context that the
 * recovery needs to read and mutate. Kept structurally typed so the helper can
 * live here without importing the executor (avoids a module cycle).
 */
export interface KimiRecoveryCtx {
  totalText: string;
  toolCalls: { id: string; name: string; argumentsJson: string }[];
  emittedToolCallIndex?: number;
}

/**
 * Recover a Kimi narration-emitted tool call directly into a cursor executor
 * context. No-op unless nothing structured was produced yet. When `emit` is
 * provided (streaming path) each recovered call is also emitted as a chunk.
 * Returns true when a recovery was applied.
 */
export function applyKimiToolCallRecovery(
  ctx: KimiRecoveryCtx,
  emit?: (chunk: { tool_calls: unknown[] }) => void
): boolean {
  if (ctx.toolCalls.length !== 0 || !ctx.totalText) return false;
  const recovered = recoverKimiToolCallNarration(ctx.totalText);
  if (!recovered || recovered.toolCalls.length === 0) return false;
  ctx.totalText = recovered.content;
  for (const tc of recovered.toolCalls) recordRecoveredCall(ctx, tc, emit);
  return true;
}

/** Push one recovered call into ctx (and emit it when streaming). */
function recordRecoveredCall(
  ctx: KimiRecoveryCtx,
  tc: RecoveredToolCall,
  emit?: (chunk: { tool_calls: unknown[] }) => void
): void {
  const index = ctx.emittedToolCallIndex ?? 0;
  if (ctx.emittedToolCallIndex !== undefined) ctx.emittedToolCallIndex++;
  ctx.toolCalls.push({ id: tc.id, name: tc.function.name, argumentsJson: tc.function.arguments });
  emit?.({
    tool_calls: [
      {
        index,
        id: tc.id,
        type: "function",
        function: { name: tc.function.name, arguments: tc.function.arguments },
      },
    ],
  });
}
