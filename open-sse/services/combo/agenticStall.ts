/**
 * Agentic-stall failover guard.
 *
 * Live defect: some upstream providers (reproduced across more than one
 * model and provider family)
 * answer a MID-AGENTIC-TURN request — tools present, conversation tail a tool
 * result — with `finish: stop` + a summary/narration as content and ZERO tool
 * calls. Agent harnesses read stop+no-tool-call as turn-over;
 * the user re-prompts "continue"; the model summarizes again — an infinite
 * loop with zero progress. Every quality gate passes the response because it
 * is a syntactically valid, non-empty completion.
 *
 * Classification (ALL required, conservative — a false positive costs one
 * retry, a false negative costs the loop):
 *  1. The request had `tools` AND the conversation tail is a tool result
 *     (OpenAI: last message role "tool"; Anthropic: last user message carries
 *     a tool_result block) — i.e. a tool call was expected next.
 *  2. The response finished with stop ("stop" / "end_turn") and contains NO
 *     tool calls.
 *  3. The text content matches the stall shape: a summary/narration block
 *     (`<summary>…`, `# Summary`, `Summary: …`) or short structureless prose
 *     that reports progress or a no-op instead of answering ("Silent retry
 *     succeeded"). A literal the request itself requested is exempt — see below.
 *
 * Three terminal-protocol shapes are EXEMPT because their response is turn-over
 * by design, not the summarization defect this guard exists to catch:
 *  - a genuine blocked-state report ("Blocked: #12345 still OPEN"),
 *  - an intentional-silence token ("[SILENT]" / "NO_REPLY") — see
 *    `isIntentionalSilenceNarration`, and
 *  - a literal the REQUEST ITSELF quoted as the required terminal reply
 *    ("just say 'Nothing to save.' and stop") — see
 *    `isInstructedTerminalEcho`.
 *
 * The guard is provider-agnostic: it keys on request/response SHAPE, never on
 * model id (same lesson as the kimiToolCallNarration recovery — a model-id
 * gate silently skips every future imitator).
 *
 * The classifier reads the response via clone() ONLY — never disturbs the
 * body the client pipeline still needs (same contract as
 * applyComboStepResponseGuards). It must NEVER throw or break the request
 * path: every failure mode returns null (not a stall).
 *
 * Kill switch: OMNIROUTE_AGENTIC_STALL_FAILOVER=0 disables classification
 * (default: enabled).
 */

export const AGENTIC_STALL_SIGNATURE = "agentic_stall_no_toolcall";

/** Cap on bytes read from a cloned body while classifying — a pathological
 *  multi-MB stream must not stall the combo loop on inspection. */
const MAX_STALL_INSPECT_BYTES = 1024 * 1024;

export function isAgenticStallFailoverEnabled(): boolean {
  return process.env.OMNIROUTE_AGENTIC_STALL_FAILOVER !== "0";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Condition 1: tools were offered AND the conversation tail is a tool result,
 * so the next model action was expected to be a tool call (or a substantive
 * answer informed by one) — not a bare summary.
 */
export function requestExpectsToolCall(body: unknown): boolean {
  if (!isRecord(body)) return false;
  const tools = body.tools;
  if (!Array.isArray(tools) || tools.length === 0) return false;
  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || messages.length === 0) return false;
  const last = messages[messages.length - 1];
  if (!isRecord(last)) return false;
  // OpenAI chat shape: tool results arrive as role:"tool" messages.
  if (last.role === "tool") return true;
  // Anthropic shape: tool results are tool_result blocks inside a user message.
  if (last.role === "user" && Array.isArray(last.content)) {
    return last.content.some((blk) => isRecord(blk) && blk.type === "tool_result");
  }
  return false;
}

/** Summary/narration openers observed in the wild ("<summary>…" context-
 *  compaction blocks, markdown "Summary" headings, "Summary: …" prose). */
const SUMMARY_PREFIX =
  /^\s*(?:<summary[\s>]|#{1,6}\s+(?:conversation\s+|context\s+)?summary\b|summary\s*[:—–-])/i;

/** Structure that marks a substantive answer (code, lists, tables, headings).
 *  Its presence keeps the short-prose heuristic from firing. */
const STRUCTURE_MARKERS = /```|^\s*(?:[-*•+]|\d+[.)])\s|^\s*#{1,6}\s|\|\s*-{2,}/m;

/** Max length for the "short structureless narration" branch. Kept small:
 *  longer prose is a legitimate final answer unless it opens as a summary.
 *  Lane-instructed terminal literals ("Nothing to save.") are handled earlier by
 *  `isInstructedTerminalEcho`, so this branch is now genuinely about drift. */
const SHORT_NARRATION_MAX_CHARS = 240;

/** Terminal blocked-state openers: the model did its tool work and is reporting
 *  a genuine blocker as its final answer ("Blocked: #12345 still OPEN...",
 *  "Cannot proceed — CI red"). This is turn-over BY DESIGN, not a stall;
 *  failing over re-runs the same blocked task on the next member and each
 *  member re-verifies and re-reports. Exempt before the short-prose branch. */
const BLOCKED_STATE_OPENER =
  /^\s*(?:still\s+|attempt\s+\d+[^\w\s]*(?:\s+blocked)?[.:]?\s+|blocked\s+again[.:]?\s+|blocked[.:,\s]|cannot\s+proceed[\s:—–-]|unable\s+to\s+(?:proceed|continue|complete)[\s:—–-]|no\s+(?:path|way)\s+forward[\s:—–-])/i;

/** Intentional-silence control tokens emitted by autonomous agent harnesses
 *  (cron/webhook lanes, bot mode) to suppress delivery when there is nothing
 *  to report. Mirrors the common harness marker set so the gateway and the
 *  harness cannot drift on what counts as silence. Lower-cased; matching is
 *  case-folded. */
const SILENCE_MARKERS = new Set([
  "[silent]",
  "silent",
  "no_reply",
  "no reply",
  "[静默]",
  "静默",
  "[沉默]",
  "沉默",
]);

/** Bracketed marker OPENING the response — the autonomous lane's own prefix
 *  rule, where "[SILENT] No changes detected this tick." still suppresses
 *  delivery. Bracketed only: bare "Silent retry succeeded" must stay
 *  classifiable as narration. */
const SILENCE_MARKER_OPENER = /^\s*\[(?:silent|静默|沉默)\]/i;

/** Drop stray edge punctuation (".NO_REPLY", "*SILENT*") while keeping brackets
 *  structural, so a malformed "[SILENT" cannot become a marker. */
function stripEdgeSilencePunctuation(text: string): string {
  const keep = /[\p{L}[\]]/u;
  let start = 0;
  let end = text.length;
  while (start < end && !keep.test(text[start])) start++;
  while (end > start && !keep.test(text[end - 1])) end--;
  return text.slice(start, end);
}

function isSilenceMarker(text: string): boolean {
  const collapsed = text.trim().replace(/\s+/g, " ");
  if (!collapsed) return false;
  return (
    SILENCE_MARKERS.has(collapsed.toLowerCase()) ||
    SILENCE_MARKERS.has(stripEdgeSilencePunctuation(collapsed).toLowerCase())
  );
}

/** True when the response IS an intentional-silence token — a harness
 *  delivery-suppression control token, i.e. turn-over BY DESIGN.
 *
 *  Live defect: a recurring cron job's tool result reported a clean sweep with
 *  zero items needing action; every combo member then answered exactly
 *  `[SILENT]` — the run's documented "nothing to report" reply. The guard read
 *  stop+no-tool-call+short narration as a stall, failed over through every
 *  member, and the client got HTTP 502 on a healthy, deterministic turn (it
 *  reproduces on every run with nothing to report). Same exemption class as
 *  BLOCKED_STATE_OPENER: a deliberate terminal token, not summarization drift.
 *
 *  Exempt exactly what the harness itself treats as silence (whole response, or
 *  its own first/last line, or a bracketed opener) — no wider. */
export function isIntentionalSilenceNarration(text: string): boolean {
  const t = (text || "").trim();
  if (!t) return false;
  if (SILENCE_MARKER_OPENER.test(t)) return true;
  const lines = t
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (lines.length === 0) return false;
  return (
    isSilenceMarker(t) || isSilenceMarker(lines[0]) || isSilenceMarker(lines[lines.length - 1])
  );
}

/** Max length of a response that can count as an instructed terminal echo. The
 *  lane briefs that produce these are one-line control replies; anything longer
 *  is prose, and prose drift is the defect this guard exists to catch. */
const INSTRUCTED_TERMINAL_MAX_CHARS = 120;

/** Literal text a request quoted as a required reply, e.g. a
 *  background-review lane brief: "just say 'Nothing to save.' and stop."
 *
 *  Quotes must be single/double/backtick and contain no sentence punctuation of
 *  its own, so prose quotes in a brief ("say 'unable to proceed'") cannot turn a
 *  whole paragraph into an exempt literal. Returns lower-cased candidates. */
function quotedTerminalLiterals(body: unknown): Set<string> {
  const found = new Set<string>();
  if (!isRecord(body)) return found;
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const push = (raw: string) => {
    const lit = raw.trim().replace(/\s+/g, " ");
    if (!lit || lit.length > INSTRUCTED_TERMINAL_MAX_CHARS) return;
    found.add(lit.toLowerCase());
  };
  for (const msg of messages) {
    if (!isRecord(msg)) continue;
    const contents = Array.isArray(msg.content) ? msg.content : [msg.content];
    for (const part of contents) {
      let text = "";
      if (typeof part === "string") text = part;
      else if (isRecord(part)) {
        if (typeof part.text === "string") text = part.text;
        else if (typeof part.content === "string") text = part.content;
      }
      if (!text) continue;
      // Quoted literals: '...' | "..." | `...`. The 120 cap mirrors
      // INSTRUCTED_TERMINAL_MAX_CHARS — longer quotes are never echoed whole.
      for (const m of text.matchAll(/['"`]([^'"`\n]{1,120})['"`]/g)) push(m[1]);
    }
  }
  return found;
}

/** True when the response is EXACTLY a literal the request itself told the model
 *  to reply with. This is a lane-instructed terminal token — turn-over by design,
 *  like the silence markers but without a fixed global vocabulary, so new lanes
 *  ("Nothing to save.", "[No output requested]") are covered without a code
 *  change per lane.
 *
 *  Live defect: a background-review lane briefs the model "If nothing is worth
 *  saving, just say 'Nothing to save.' and stop." Every combo member answered
 *  exactly that; the guard read stop + no-tool-call + short prose as a stall
 *  and failed the turn over through the whole combo.
 *
 *  Deliberately narrow — requires a verbatim, case-insensitive, whole-response
 *  match against a literal present in the request, under a length cap. A model
 *  drifting into a summary cannot satisfy it: summarization text is not quoted
 *  in the brief. If the brief contains no literal, this returns false and the
 *  normal short-prose/gated path is unchanged. */
export function isInstructedTerminalEcho(body: unknown, text: string): boolean {
  const t = (text || "").trim().replace(/\s+/g, " ");
  if (!t || t.length > INSTRUCTED_TERMINAL_MAX_CHARS) return false;
  const literals = quotedTerminalLiterals(body);
  if (literals.size === 0) return false;
  return literals.has(t.toLowerCase());
}

export function contentLooksLikeStallNarration(text: string): boolean {
  const t = (text || "").trim();
  if (!t) return false;
  if (SUMMARY_PREFIX.test(t)) return true;
  if (BLOCKED_STATE_OPENER.test(t)) return false; // terminal answer, not a stall
  if (isIntentionalSilenceNarration(t)) return false; // delivery-suppression token, not a stall
  if (t.length <= SHORT_NARRATION_MAX_CHARS && !STRUCTURE_MARKERS.test(t) && !t.includes("\n\n")) {
    return true;
  }
  return false;
}

type StallSignal = {
  finishReason: string | null;
  hasToolCalls: boolean;
  text: string;
};

function extractFromOpenAiJson(parsed: unknown): StallSignal | null {
  if (!isRecord(parsed) || !Array.isArray(parsed.choices)) return null;
  const choice = parsed.choices[0];
  if (!isRecord(choice)) return null;
  const message = isRecord(choice.message) ? choice.message : null;
  const toolCalls = message && Array.isArray(message.tool_calls) ? message.tool_calls : [];
  let text = "";
  if (message) {
    if (typeof message.content === "string") text = message.content;
    else if (Array.isArray(message.content)) {
      text = message.content
        .map((part) => (isRecord(part) && typeof part.text === "string" ? part.text : ""))
        .join("");
    }
  }
  return {
    finishReason: typeof choice.finish_reason === "string" ? choice.finish_reason : null,
    hasToolCalls: toolCalls.length > 0,
    text,
  };
}

function extractFromAnthropicJson(parsed: unknown): StallSignal | null {
  if (!isRecord(parsed) || !Array.isArray(parsed.content)) return null;
  if (parsed.type !== "message" && typeof parsed.stop_reason !== "string") return null;
  let text = "";
  let hasToolCalls = false;
  for (const blk of parsed.content) {
    if (!isRecord(blk)) continue;
    if (blk.type === "tool_use") hasToolCalls = true;
    if (blk.type === "text" && typeof blk.text === "string") text += blk.text;
  }
  return {
    finishReason: typeof parsed.stop_reason === "string" ? parsed.stop_reason : null,
    hasToolCalls,
    text,
  };
}

/** Assemble the terminal assistant message from a buffered SSE payload,
 *  handling both OpenAI chat chunks and Anthropic message events. Returns
 *  null when nothing recognizable was seen (cannot classify). */
function extractFromSse(payload: string): StallSignal | null {
  let finishReason: string | null = null;
  let hasToolCalls = false;
  let text = "";
  let recognized = false;
  for (const rawLine of payload.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line.startsWith("data:")) continue;
    const data = line.slice(5).trim();
    if (!data || data === "[DONE]") continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(data);
    } catch {
      continue;
    }
    if (!isRecord(parsed)) continue;
    // OpenAI chat chunks.
    if (Array.isArray(parsed.choices)) {
      const choice = parsed.choices[0];
      if (isRecord(choice)) {
        recognized = true;
        const delta = isRecord(choice.delta) ? choice.delta : null;
        if (delta) {
          if (typeof delta.content === "string") text += delta.content;
          if (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) {
            hasToolCalls = true;
          }
        }
        if (typeof choice.finish_reason === "string" && choice.finish_reason) {
          finishReason = choice.finish_reason;
        }
      }
      continue;
    }
    // Anthropic message events.
    const type = typeof parsed.type === "string" ? parsed.type : "";
    if (type === "content_block_start") {
      recognized = true;
      const block = isRecord(parsed.content_block) ? parsed.content_block : null;
      if (block && block.type === "tool_use") hasToolCalls = true;
    } else if (type === "content_block_delta") {
      recognized = true;
      const delta = isRecord(parsed.delta) ? parsed.delta : null;
      if (delta && delta.type === "text_delta" && typeof delta.text === "string") {
        text += delta.text;
      }
    } else if (type === "message_delta") {
      recognized = true;
      const delta = isRecord(parsed.delta) ? parsed.delta : null;
      if (delta && typeof delta.stop_reason === "string" && delta.stop_reason) {
        finishReason = delta.stop_reason;
      }
    } else if (type === "message_start" || type === "message_stop") {
      recognized = true;
    }
  }
  if (!recognized) return null;
  return { finishReason, hasToolCalls, text };
}

async function readClonedBodyText(clone: Response): Promise<string | null> {
  try {
    if (!clone.body) return null;
    const reader = clone.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    let bytes = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        bytes += value.byteLength;
        if (bytes > MAX_STALL_INSPECT_BYTES) {
          await reader.cancel().catch(() => {});
          return null; // too large to safely classify — treat as not-a-stall
        }
        text += decoder.decode(value, { stream: true });
      }
    }
    text += decoder.decode();
    return text;
  } catch {
    return null;
  }
}

export type AgenticStallVerdict = {
  signature: typeof AGENTIC_STALL_SIGNATURE;
  detail: string;
};

/**
 * Classify a successful (HTTP 200, quality-valid) combo-member response as an
 * agentic stall. Returns the verdict (with a log/audit-safe detail string —
 * no credentials, no full bodies) or null when the response is fine or cannot
 * be classified. Never throws.
 */
export async function classifyAgenticStallResponse(args: {
  body: unknown;
  response: Response;
}): Promise<AgenticStallVerdict | null> {
  try {
    if (!isAgenticStallFailoverEnabled()) return null;
    const { body, response } = args;
    if (!requestExpectsToolCall(body)) return null;
    if (!response || typeof response.clone !== "function") return null;
    let clone: Response;
    try {
      clone = response.clone();
    } catch {
      return null;
    }
    const ct = clone.headers?.get?.("content-type") || "";
    let signal: StallSignal | null = null;
    if (ct.includes("text/event-stream")) {
      const text = await readClonedBodyText(clone);
      if (text == null) return null;
      signal = extractFromSse(text);
    } else if (ct.includes("application/json")) {
      let parsed: unknown;
      try {
        parsed = await clone.json();
      } catch {
        return null;
      }
      signal = extractFromOpenAiJson(parsed) ?? extractFromAnthropicJson(parsed);
    } else {
      return null;
    }
    if (!signal) return null;
    const finish = (signal.finishReason || "").toLowerCase();
    if (finish !== "stop" && finish !== "end_turn") return null;
    if (signal.hasToolCalls) return null;
    if (isInstructedTerminalEcho(body, signal.text)) return null;
    if (!contentLooksLikeStallNarration(signal.text)) return null;
    const head = signal.text.trim().slice(0, 120).replace(/\s+/g, " ");
    return {
      signature: AGENTIC_STALL_SIGNATURE,
      detail: `finish=${signal.finishReason}, no tool_calls on tool-result tail, narration="${head}"`,
    };
  } catch {
    return null;
  }
}
