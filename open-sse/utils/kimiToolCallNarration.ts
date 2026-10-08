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
 * Follow-up (2026-09-15, PR #12723): two gaps found in production.
 *
 *   1. The recovery only ran when NO structured tool call was emitted. Kimi
 *      frequently emits a real structured call AND narrates it in visible
 *      text in the same turn; the narration then leaked verbatim (and was
 *      re-sent in history, seeding further mimicry — including on other
 *      cursor models such as composer-2.5-fast that regurgitate flattened
 *      history).
 *   2. The models also mimic the *result* serialization — both
 *      flattenMessages' `Tool result (<id>): …` line and the translator's
 *      `<tool_result><tool_name>…</tool_call_id><result>…</tool_result>`
 *      XML block — hallucinating a `User:` message that the client renders
 *      as visible conversation content.
 *
 * This module therefore provides three layers:
 *
 *   - recoverKimiToolCallNarration(): synthesize a structured tool call from
 *     narration text (unchanged behavior, existing callers/tests).
 *   - createNarrationStreamScrubber(): an incremental holdback state machine
 *     used on the live text-delta path so dialect text NEVER reaches the
 *     client SSE stream in the first place (a finalize-time scrub cannot
 *     retract already-streamed deltas). Captures valid narrated calls via
 *     callback so the executor can still emit them as structured calls.
 *   - scrubKimiNarrationText(): batch scrub (feed+finish over the state
 *     machine) used as a safety net at finalization and to clean poisoned
 *     assistant history in flattenMessages.
 *
 * All gating is by CONTENT SHAPE, never by model name: the dialects are
 * machine-generated gateway formats that never legitimately appear inside
 * assistant visible output.
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
type JsonScanState = { depth: number; inStr: boolean; esc: boolean };

// One character of the balanced-JSON walk. Returns true when the outermost
// object just closed (caller records the end index).
function stepJsonScan(state: JsonScanState, c: string | undefined): boolean {
  if (state.esc) {
    state.esc = false;
    return false;
  }
  if (c === "\\") {
    state.esc = true;
    return false;
  }
  if (c === '"') {
    state.inStr = !state.inStr;
    return false;
  }
  if (state.inStr) return false;
  if (c === "{") state.depth++;
  else if (c === "}") return --state.depth === 0;
  return false;
}

function scanJsonObjectEnd(text: string, start: number): number {
  if (text[start] !== "{") return -1;
  const state: JsonScanState = { depth: 0, inStr: false, esc: false };
  for (let i = start; i < text.length; i++) {
    if (stepJsonScan(state, text[i])) return i + 1;
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

// ─── Streaming narration scrubber ───────────────────────────────────────────
//
// Incremental holdback state machine. Text that could be the start of a
// history-dialect trigger is buffered instead of emitted; once a trigger
// completes, the whole dialect construct (narration line + JSON arguments +
// delimiter tail, a `Tool result (…):` line, or a `<tool_result>…</tool_result>`
// block) is dropped. Valid narrated JSON arguments are surfaced through the
// onToolCall callback so the executor can still emit a structured call.
//
// States:
//   scan      — copying text through, holding back partial-trigger suffixes
//   narrHead  — saw "Assistant called tool", waiting for " with arguments: "
//               on the same line (false alarm flushes the line as prose)
//   narrJson  — inside the narrated JSON arguments (balanced-brace scan)
//   delims    — consuming the <|close|>/<|sep|> closing-grammar chain
//   xml       — inside a <tool_result> … </tool_result> block
//   lineDrop  — consuming a "Tool result (…): …" line to its newline (dropped)
//   userWait  — saw "User:", holding to see whether "<tool_result>" follows

const TRIGGERS = ["Assistant called tool", "Tool result (", "<tool_result>", "User:"] as const;
const MAX_TRIGGER_LEN = 20; // length of "Assistant called tool"
const NARRATION_MARKER = " with arguments: ";
const XML_OPEN = "<tool_result>";
const XML_CLOSE = "</tool_result>";
const DELIM_TOKEN_RE = /^\s*<\|(?:close|sep)\|>/;
// Proper prefix of a delimiter token: "", "<", "<|", "<|c", … "<|close", "<|s" … "<|sep".
const DELIM_PARTIAL_RE = /^<\|?(?:(?:c|cl|clo|clos|close|s|se|sep)\|?)?$/;
// A grammar keyword is only part of the chain when another delimiter follows it.
const DELIM_KEYWORD_RE = /^(?:argument|call|tools|name)(?=\s*<\|)/;
// Complete keyword + complete delimiter token at buf head (char-by-char mode:
// the pair arrives incrementally, so token-anchored matching alone never
// consumes it and the machine stalls waiting for a lookahead that already
// arrived).
const DELIM_KEYWORD_TOKEN_RE = /^(?:argument|call|tools|name)\s*<\|(?:close|sep)\|>/;
// Proper prefix of a grammar keyword (char-by-char streaming holdback), or a
// complete keyword still waiting for its lookahead delimiter, or a keyword
// followed by a partial delimiter token ("argument<", "call<|s").
const DELIM_KEYWORD_PARTIAL_RE =
  /^(?:(?:a|ar|arg|argu|argum|argume|argumen|argument|c|ca|cal|call|t|to|too|tool|tools|n|na|nam|name)\s*)?(?:<\|?(?:(?:c|cl|clo|clos|close|s|se|sep)\|?)?)?$/;

export type NarrationStreamScrubber = {
  /** Feed one raw text delta; returns the safe-to-emit portion (may be ""). */
  feed(delta: string): string;
  /** End of stream: returns residual clean text (truncated dialect is dropped). */
  finish(): string;
};

type ScrubState = "scan" | "narrHead" | "narrJson" | "delims" | "xml" | "lineDrop" | "userWait";

type ScrubCtx = {
  state: ScrubState;
  buf: string;
  out: string;
  // narrJson bookkeeping
  jsonScanned: number;
  json: JsonScanState;
  narrName: string;
  narrId: string;
  onToolCall?: (tc: RecoveredToolCall) => void;
};

function flush(c: ScrubCtx, text: string): void {
  if (text) c.out += text;
}

// Largest prefix length of b that cannot still extend into a trigger
// (i.e. no suffix starting inside the prefix is a proper prefix of a trigger).
function safeLen(b: string): number {
  for (let i = Math.max(0, b.length - MAX_TRIGGER_LEN); i < b.length; i++) {
    const sfx = b.slice(i);
    for (const t of TRIGGERS) {
      if (t.startsWith(sfx) && sfx.length < t.length) return i;
    }
  }
  return b.length;
}

function scanStep(c: ScrubCtx): void {
  let best = -1;
  let bestTrig = "";
  for (const t of TRIGGERS) {
    const i = c.buf.indexOf(t);
    if (i !== -1 && (best === -1 || i < best)) {
      best = i;
      bestTrig = t;
    }
  }
  if (best === -1) {
    const n = safeLen(c.buf);
    flush(c, c.buf.slice(0, n));
    c.buf = c.buf.slice(n);
    return; // stay in scan, buf holds the partial suffix
  }
  flush(c, c.buf.slice(0, best));
  c.buf = c.buf.slice(best);
  enterState(c, bestTrig);
}

function enterState(c: ScrubCtx, trig: string): void {
  // Every branch must invoke its step function: enterState is also reached
  // recursively (delims → scan → enterState on a batch feed), and without
  // the step call the machine settles mid-construct and drops the rest.
  if (trig === "Assistant called tool") {
    c.state = "narrHead";
    narrHeadStep(c);
  } else if (trig === "Tool result (") {
    c.state = "lineDrop";
    lineDropStep(c);
  } else if (trig === "<tool_result>") {
    c.buf = c.buf.slice(trig.length);
    c.state = "xml";
    xmlStep(c);
  } else {
    // "User:" — wait for a possible "<tool_result>" continuation.
    c.state = "userWait";
    userStep(c);
  }
}

function xmlStep(c: ScrubCtx): void {
  const end = c.buf.indexOf(XML_CLOSE);
  if (end !== -1) {
    let rest = c.buf.slice(end + XML_CLOSE.length);
    if (rest.startsWith("\n")) rest = rest.slice(1);
    c.buf = rest;
    c.state = "scan";
    scanStep(c);
  }
  // else: keep buffering until the closing tag (or EOF → finish drops it).
}

function userCompatible(c: ScrubCtx, post: string): boolean {
  // True while post can still extend into `\s*<tool_result>`, or already
  // starts with the full opener (then the block is confirmed: drop the
  // "User:" prefix along with it and enter the xml state).
  const ws = post.length - post.trimStart().length;
  const rest = post.slice(ws);
  if (rest.startsWith(XML_OPEN)) {
    // Confirmed "User: <tool_result>" — drop both, consume into xml state.
    c.buf = rest.slice(XML_OPEN.length);
    c.state = "xml";
    xmlStep(c);
    return true;
  }
  return rest === "" || XML_OPEN.startsWith(rest);
}

function userStep(c: ScrubCtx): void {
  // buf starts with "User:".
  const post = c.buf.slice("User:".length);
  if (userCompatible(c, post)) return; // still ambiguous, keep holding
  // Not the XML block: "User:" is plain prose here. Emit it verbatim and
  // rescan the remainder (it may itself contain later triggers).
  flush(c, "User:");
  c.buf = post;
  c.state = "scan";
  scanStep(c);
}

function narrHeadStep(c: ScrubCtx): void {
  const nl = c.buf.indexOf("\n");
  const marker = c.buf.indexOf(NARRATION_MARKER);
  if (marker !== -1 && (nl === -1 || marker < nl)) {
    const head = c.buf.slice(0, marker + NARRATION_MARKER.length);
    const m = NARRATION_RE.exec(head);
    c.narrName = m ? m[1] : "";
    c.narrId = m && m[2] && m[2] !== "(unknown)" && m[2] !== "unknown" ? m[2] : "";
    c.buf = c.buf.slice(marker + NARRATION_MARKER.length);
    c.jsonScanned = 0;
    c.json = { depth: 0, inStr: false, esc: false };
    c.state = "narrJson";
    narrJsonStep(c);
    return;
  }
  if (nl !== -1) {
    // Line ended without the marker → prose that happens to start with the
    // trigger. Emit the whole line (no trigger contains "\n", so the line
    // cannot end mid-trigger) and rescan the remainder.
    flush(c, c.buf.slice(0, nl + 1));
    c.buf = c.buf.slice(nl + 1);
    c.state = "scan";
    scanStep(c);
  }
  // else: still on the head line, keep holding.
}

function emitNarratedToolCall(c: ScrubCtx, argsJson: string): void {
  if (!c.narrName || !c.onToolCall) return;
  try {
    JSON.parse(argsJson);
  } catch {
    return; // malformed arguments — drop rather than emit garbage
  }
  c.onToolCall({
    id: c.narrId || genId(),
    type: "function",
    function: { name: c.narrName, arguments: argsJson },
  });
}

function narrJsonStep(c: ScrubCtx): void {
  for (let i = c.jsonScanned; i < c.buf.length; i++) {
    c.jsonScanned = i + 1;
    if (stepJsonScan(c.json, c.buf[i])) {
      emitNarratedToolCall(c, c.buf.slice(0, i + 1));
      c.buf = c.buf.slice(i + 1);
      c.state = "delims";
      delimsStep(c);
      return;
    }
  }
  // JSON not closed yet — keep buffering.
}

function delimPartial(buf: string): boolean {
  // After a complete chain element, the remaining head may be whitespace or
  // a partial next token ("<", "<|c", "<|s") or a partial/complete grammar
  // keyword still waiting on its lookahead delimiter.
  const trimmed = buf.trimStart();
  if (trimmed === "") return true;
  if (DELIM_PARTIAL_RE.test(trimmed)) return true;
  if (DELIM_KEYWORD_RE.test(trimmed)) return true;
  if (DELIM_KEYWORD_PARTIAL_RE.test(trimmed)) return true;
  return false;
}

function delimsStep(c: ScrubCtx): void {
  for (;;) {
    const m = DELIM_TOKEN_RE.exec(c.buf);
    if (m) {
      c.buf = c.buf.slice(m[0].length);
      const kw = DELIM_KEYWORD_RE.exec(c.buf);
      if (kw) c.buf = c.buf.slice(kw[0].length);
      continue;
    }
    // Keyword-first split (incremental arrival): consume the pair whole.
    const kwTok = DELIM_KEYWORD_TOKEN_RE.exec(c.buf);
    if (kwTok) {
      c.buf = c.buf.slice(kwTok[0].length);
      continue;
    }
    if (delimPartial(c.buf)) return; // wait for more text
    // Chain over — the remainder is ordinary text.
    c.buf = c.buf.replace(/^\s+/u, "");
    c.state = "scan";
    scanStep(c);
    return;
  }
}

function lineDropStep(c: ScrubCtx): void {
  const nl = c.buf.indexOf("\n");
  if (nl !== -1) {
    c.buf = c.buf.slice(nl + 1);
    c.state = "scan";
    scanStep(c);
  }
  // else: keep buffering the dropped line.
}

const STEP_BY_STATE: Record<ScrubState, (c: ScrubCtx) => void> = {
  scan: scanStep,
  narrHead: narrHeadStep,
  narrJson: narrJsonStep,
  delims: delimsStep,
  xml: xmlStep,
  lineDrop: lineDropStep,
  userWait: userStep,
};

/** Drive the machine until it settles in a buffering state. */
function driveScrub(c: ScrubCtx): void {
  for (let guard = 0; guard < 50; guard++) {
    const before = c.state;
    STEP_BY_STATE[before](c);
    if (c.state === before) return; // settled: waiting for more input
  }
}

/** EOF residue: only `scan`/`userWait`/`narrHead` hold real prose. */
function finishResidue(c: ScrubCtx): void {
  if (c.state === "scan" || c.state === "narrHead") {
    flush(c, c.buf); // partial trigger/head at EOF can never complete → prose
    return;
  }
  if (c.state === "userWait") {
    const rest = c.buf.slice("User:".length).trimStart();
    // "User:" followed by a truncated XML opener: keep "User:" as prose
    // (it was real text), drop the partial tag.
    flush(c, XML_OPEN.startsWith(rest) && rest !== "" ? "User:" : c.buf);
  }
  // narrJson/delims/xml/lineDrop: truncated dialect — drop.
}

export function createNarrationStreamScrubber(
  onToolCall?: (tc: RecoveredToolCall) => void
): NarrationStreamScrubber {
  const c: ScrubCtx = {
    state: "scan",
    buf: "",
    out: "",
    jsonScanned: 0,
    json: { depth: 0, inStr: false, esc: false },
    narrName: "",
    narrId: "",
    onToolCall,
  };
  return {
    feed(delta: string): string {
      if (!delta) return "";
      c.buf += delta;
      c.out = "";
      driveScrub(c);
      return c.out;
    },
    finish(): string {
      c.out = "";
      finishResidue(c);
      c.buf = "";
      c.state = "scan";
      return c.out;
    },
  };
}

/**
 * Batch scrub: remove every history-dialect construct from `text`.
 * Returns the cleaned content and whether anything changed.
 */
export function scrubKimiNarrationText(text: string): { content: string; changed: boolean } {
  if (!text) return { content: text, changed: false };
  const s = createNarrationStreamScrubber();
  const content = s.feed(text) + s.finish();
  return { content, changed: content !== text };
}

// ─── Executor integration ────────────────────────────────────────────────────

export interface KimiRecoveryCtx {
  totalText: string;
  toolCalls: Array<{ id: string; name: string; argumentsJson: string }>;
  emittedToolCallIndex?: number;
}

/**
 * One-line-per-site executor hook: flush the narration scrubber's held-back
 * prose, then run finalize-time recovery + scrub (applyKimiToolCallRecovery).
 * Kept here so open-sse/executors/cursor.ts — a file-size-frozen file — does
 * not grow per integration site (base growth consumed the old headroom).
 */
export function finalizeKimiTurn(
  ctx: KimiRecoveryCtx & { narrationScrubber?: { finish(): string | null } },
  emit?: (chunk: { content?: string; tool_calls?: unknown[] }) => void
): boolean {
  const flush = ctx.narrationScrubber?.finish() ?? null;
  if (flush) {
    ctx.totalText += flush;
    emit?.({ content: flush });
  }
  return applyKimiToolCallRecovery(ctx, (c) => emit?.(c));
}

/**
 * Finalize-time recovery + scrub.
 *
 * 1. When no structured tool call was produced, try to synthesize one from a
 *    narrated call (original PR #12723 behavior).
 * 2. ALWAYS scrub any residual dialect text (narration echo alongside a real
 *    structured call, `Tool result (…):` lines, `User: <tool_result>` blocks,
 *    orphan delimiter chains). Previously the whole function was skipped when
 *    a structured call existed — that gating hole is what let the leak
 *    compound in history.
 */
export function applyKimiToolCallRecovery(
  ctx: KimiRecoveryCtx,
  emit?: (chunk: { tool_calls: unknown[] }) => void
): boolean {
  if (!ctx.totalText) return false;
  let recovered = false;
  if (ctx.toolCalls.length === 0) {
    const r = recoverKimiToolCallNarration(ctx.totalText);
    if (r && r.toolCalls.length > 0) {
      ctx.totalText = r.content;
      for (const tc of r.toolCalls) recordRecoveredCall(ctx, tc, emit);
      recovered = true;
    }
  }
  const scrubbed = scrubKimiNarrationText(ctx.totalText);
  if (scrubbed.changed) ctx.totalText = scrubbed.content;
  return recovered;
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
