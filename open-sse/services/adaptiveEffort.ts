// Adaptive reasoning effort — the OmniRoute-side counterpart of Hermes'
// `effort: "auto"` (NousResearch/hermes-agent#109044). One implementation at
// the gateway covers every harness (Claude Code, Cursor, Codex, opencode,
// Hermes) because the full request body passes through here before any
// provider translation.
//
// Semantics:
// - Effort is resolved from deterministic request-shape signals only — no LLM
//   call, no judgment gate. Three bands (low / medium / high) gate a thinking
//   budget, not a model-routing decision.
// - STATELESS PER-TURN PIN: signals are computed ONLY from the last user
//   message and everything BEFORE it. Tool results after the last user
//   message are ignored, so every request of the same user turn — including
//   mid-tool-loop requests — resolves to the SAME level. This reproduces
//   Hermes' stateful per-turn pin deterministically, without stored state,
//   and never escalates mid-loop (which would change the reasoning config
//   between requests and cost a cold prompt-cache prefix write on
//   cache-sensitive upstreams).
//
// Priority (highest first), all off-by-default:
// 1. Explicit client reasoning field of any shape — always wins; no-op.
// 2. `X-OmniRoute-Effort: auto` request header (per-request opt-in; mirrors
//    the #6023/#6024/#6025 `X-OmniRoute-Mode`/`-Budget` controls pattern).
// 3. `ModelSpec.defaultReasoningEffort: "auto"` (per-model opt-in, #6879).
import { estimateMessageTokens } from "./specificityRules";

export const ADAPTIVE_EFFORT = "auto";

// Thresholds mirror the Hermes resolver (agent/reasoning_effort.py): three
// coarse deterministic bands. A near-miss costs a slightly over/under-thought
// answer, not a wrong route, so they stay coarse until call-log data says
// otherwise.
const TRIVIAL_USER_CHARS = 160;
const TRIVIAL_CTX_TOKENS = 4000;
const HEAVY_CTX_TOKENS = 60000;
const HEAVY_TOOL_RESULTS = 6;
const HEAVY_USER_CHARS = 4000;

type ChatMessageLike = { role?: unknown; content?: unknown };
type EffortLevel = "low" | "medium" | "high";

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function lastUserMessageIndex(messages: ChatMessageLike[]): number {
  let last = -1;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i]?.role === "user") last = i;
  }
  return last;
}

function messageTextChars(content: unknown): number {
  if (isString(content)) return content.length;
  if (Array.isArray(content)) {
    let sum = 0;
    for (const part of content) {
      const text = (part as { text?: unknown })?.text;
      if (isString(text)) sum += text.length;
    }
    return sum;
  }
  return 0;
}

function countRole(messages: ChatMessageLike[], role: string, from: number, to: number): number {
  let n = 0;
  for (let i = from; i < to; i++) {
    if (messages[i]?.role === role) n++;
  }
  return n;
}

function toolLoopDepthAfter(messages: ChatMessageLike[], boundary: number): number {
  let n = 0;
  for (let i = boundary + 1; i < messages.length; i++) {
    const msg = messages[i];
    if (msg?.role === "assistant" && (msg as { tool_calls?: unknown }).tool_calls) n++;
  }
  return n;
}

export function resolveAdaptiveEffort(messages: ChatMessageLike[] | undefined | null): EffortLevel {
  const msgs = Array.isArray(messages) ? messages : [];
  if (msgs.length === 0) return "medium"; // no signals at all → balanced band, never cheap-by-default
  const boundary = lastUserMessageIndex(msgs);
  const upToTurn = boundary >= 0 ? msgs.slice(0, boundary + 1) : msgs;
  const userChars = boundary >= 0 ? messageTextChars(msgs[boundary].content) : 0;
  const estCtxTokens = estimateMessageTokens(upToTurn as Array<{ content?: unknown }>);
  const toolResults = boundary >= 0 ? countRole(msgs, "tool", 0, boundary) : 0;
  const turnDepth = boundary >= 0 ? toolLoopDepthAfter(msgs, boundary) + 1 : 1;

  const trivial =
    userChars <= TRIVIAL_USER_CHARS &&
    estCtxTokens <= TRIVIAL_CTX_TOKENS &&
    toolResults === 0 &&
    turnDepth <= 1;
  if (trivial) return "low";
  const heavy =
    estCtxTokens >= HEAVY_CTX_TOKENS ||
    toolResults >= HEAVY_TOOL_RESULTS ||
    userChars >= HEAVY_USER_CHARS;
  if (heavy) return "high";
  return "medium";
}

export function isAdaptiveEffort(value: unknown): boolean {
  return isString(value) && value.trim().toLowerCase() === ADAPTIVE_EFFORT;
}

export function hasExplicitReasoningField(body: Record<string, unknown>): boolean {
  return (
    body.reasoning_effort !== undefined ||
    body.reasoning !== undefined ||
    body.thinking !== undefined
  );
}

export function applyAdaptiveEffort<T extends Record<string, unknown>>(
  body: T,
  opts: {
    messages?: ChatMessageLike[] | undefined | null;
    headerEffort?: unknown;
    modelDefaultEffort?: string | null;
  }
): T {
  if (!body || typeof body !== "object") return body;
  if (hasExplicitReasoningField(body)) return body;
  const headerAuto = isAdaptiveEffort(opts.headerEffort);
  const defaultAuto = opts.modelDefaultEffort != null && isAdaptiveEffort(opts.modelDefaultEffort);
  if (!headerAuto && !defaultAuto) return body;
  const level = resolveAdaptiveEffort(
    opts.messages ?? (body.messages as ChatMessageLike[] | undefined)
  );
  return { ...body, reasoning_effort: level };
}
