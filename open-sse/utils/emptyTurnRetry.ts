import { translateResponse, initState } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import { STREAM_READINESS_MAX_TIMEOUT_MS } from "../config/constants.ts";
import { hasValidUsage } from "./usageTracking.ts";
import { hasUsefulStreamContent } from "./streamReadiness.ts";
import { parseSSELine, hasValuableContent } from "./streamHelpers.ts";
import { isEmptyTurnCore } from "./streamEmptyChoices.ts";
import { sanitizeStreamingChunk } from "../handlers/responseSanitizer.ts";
import { getAnyReasoningValue, getReadableReasoningValue } from "./reasoningFields.ts";

/** Max upstream bytes buffered for flush-empty-retry classification (flag-gated). */
export const FLUSH_EMPTY_RETRY_MAX_BYTES = 256_000;

/** Legit empty stops (same set as `LEGIT_EMPTY_OPENAI_FINISH` in errorClassifier): a
 * turn truncated at the token limit (`length`), a tool-call turn (`tool_calls`),
 * or a filtered turn (`content_filter`) is a valid completion, not an empty-turn
 * failure — never a retry trigger. */
const LEGIT_EMPTY_TURN_FINISH = new Set(["length", "tool_calls", "content_filter"]);

export type EmptyTurnSummary = {
  finishReason: string;
  contentText: string;
  reasoningText: string;
  forwardedValuableChunk: boolean;
  hasValidUsage: boolean;
  toolCallsPresent: boolean;
};

/**
 * Unified "turn with no usable content" classifier (one mechanism, two arms:
 * reasoning-only turn with stop + empty text + non-empty reasoning, and
 * zero-valuable-chunk turn via shared `isEmptyTurnCore`). Legit empty stops
 * (length/tool_calls/content_filter) and tool-call turns are never empty.
 */
export function isUselessEmptyTurn(summary: EmptyTurnSummary): boolean {
  if (LEGIT_EMPTY_TURN_FINISH.has(summary.finishReason)) return false;
  if (summary.toolCallsPresent) return false;
  if (summary.contentText.length > 0) return false;
  // Reasoning-only arm: non-empty reasoning with no content. The stop gate
  // applies to chat turns (finish=stop disambiguates from mid-stream deltas);
  // Responses translators never set a probe finish reason, so Responses
  // reasoning-only turns (reasoning deltas, no completed/output) take the
  // same arm without the stop requirement.
  if (
    summary.reasoningText.length > 0 &&
    (summary.finishReason === "stop" || summary.finishReason === "")
  )
    return true;
  return isEmptyTurnCore(summary.forwardedValuableChunk, summary.hasValidUsage);
}

/** A read that outlived the idle budget, kept distinct from a real chunk. */
const IDLE_READ = Symbol("idle-read");

/**
 * One read under an idle budget. The budget covers the gap between chunks, not
 * the whole turn, so a long generation that keeps producing is never cut short.
 * `idleMs <= 0` keeps the plain unbounded read. The in-flight read is passed
 * in (not re-issued): re-issuing after an expiry would orphan the first read,
 * which still owns the next chunk.
 */
async function readWithinIdleBudget(
  inFlight: Promise<ReadableStreamReadResult<Uint8Array>>,
  idleMs: number
): Promise<ReadableStreamReadResult<Uint8Array> | typeof IDLE_READ> {
  if (idleMs <= 0) return inFlight;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const expiry = new Promise<typeof IDLE_READ>((resolve) => {
    timer = setTimeout(() => resolve(IDLE_READ), idleMs);
  });
  try {
    return await Promise.race([inFlight, expiry]);
  } finally {
    clearTimeout(timer);
  }
}

async function drainBoundedChunks(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  maxBytes: number,
  idleMs: number,
  deadlineMs = 0
): Promise<{ chunks: Uint8Array[]; total: number; over: boolean; idle: boolean }> {
  const chunks: Uint8Array[] = [];
  let total = 0;
  let pending: Promise<ReadableStreamReadResult<Uint8Array>> | null = null;
  for (;;) {
    // A single in-flight read spans idle expiries: an expired budget never
    // orphans the read that still owns the next chunk.
    if (!pending) pending = reader.read();
    const read = await readWithinIdleBudget(pending, idleMs);
    if (read === IDLE_READ) {
      // An open reasoning item means the model is still working, not stalled:
      // keep draining under the absolute ceiling instead of judging a mute
      // turn now. The counter below deliberately over-matches (unpaired adds
      // stay "open"): biasing toward continuing is the safe direction.
      if (deadlineMs > 0 && Date.now() < deadlineMs && hasOpenReasoning(decodeSoFar(chunks, total)))
        continue;
      return { chunks, total, over: false, idle: true };
    }
    const { done, value } = read;
    pending = null;
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) return { chunks, total, over: true, idle: false };
    chunks.push(value);
  }
  return { chunks, total, over: false, idle: false };
}

/** Best-effort decode of chunks drained so far, for the open-reasoning check. */
function decodeSoFar(chunks: Uint8Array[], total: number): string {
  return concatChunks(chunks, total) ?? "";
}

function concatChunks(chunks: Uint8Array[], total: number): string | null {
  try {
    const out = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder().decode(out);
  } catch {
    return null;
  }
}

/**
 * True while a reasoning item is open in the raw buffered text: a
 * `response.output_item.added` carrying a reasoning/thinking item with no
 * matching close (`output_item.done`, `response.completed`/`failed`, or
 * stream end) yet. Substring scan only — never parses, so truncated JSON is
 * fine. A global counter (not per-item pairing): unpaired adds stay "open",
 * biasing toward continuing the read, which is the safe direction.
 */
export function hasOpenReasoning(text: string): boolean {
  if (!text) return false;
  let open = 0;
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const data = trimmed.slice(5);
    if (
      data.includes("response.output_item.added") &&
      /"type"\s*:\s*"(?:reasoning|thinking)"/.test(data)
    ) {
      open += 1;
    } else if (
      data.includes("response.output_item.done") ||
      data.includes("response.completed") ||
      data.includes("response.failed") ||
      data.trim() === "[DONE]"
    ) {
      if (open > 0) open -= 1;
    }
  }
  return open > 0;
}

export type BoundedReadOutcome =
  | { kind: "text"; text: string }
  // Over the byte cap, no body, or undecodable: not classifiable, pass it through.
  | { kind: "skipped" }
  // The body threw while being read (e.g. the upstream dropped the connection
  // after its headers): nothing usable was delivered.
  | { kind: "error" }
  // The body stopped producing without closing or erroring: buffering can never
  // end on its own. `text` is whatever had been buffered when the budget ran
  // out, so a stalled turn is judged on its content like any other.
  | { kind: "idle"; text: string };

/**
 * Bounded read of a `Response` body: streams chunks through a reader with a
 * byte counter and abandons past `maxBytes` (`skipped` = fall back to the
 * normal path). Never a full `text()` read: a large valid turn is abandoned
 * without ever being fully buffered. A body that throws while being read is
 * reported as `error`, distinct from `skipped`, so the caller can treat a
 * dropped stream like an empty turn. `idleMs` bounds the gap between chunks —
 * without it a stream that stops producing without closing buffers forever,
 * since this read owns no other deadline and runs before the client pipe (and
 * its idle watchdog) exists. The consumed clone is discarded by the caller; the
 * piped original is untouched.
 */
export async function readBoundedResponseOutcome(
  response: Response,
  maxBytes: number,
  idleMs = 0,
  opts?: { maxTotalMs?: number }
): Promise<BoundedReadOutcome> {
  const clone = response.clone();
  if (!clone.body) return { kind: "skipped" };
  const reader = clone.body.getReader();
  // Absolute ceiling for the continued read while reasoning stays open.
  // Internal default (never propagated from the per-request policy, so the
  // frozen caller needs no change); 0 keeps the historical behavior.
  // Wall-clock deadline: a backward NTP step can only stretch, never cut,
  // a reasoning wait — negligible over this span.
  const maxTotalMs = opts?.maxTotalMs ?? STREAM_READINESS_MAX_TIMEOUT_MS;
  const deadlineMs = maxTotalMs > 0 ? Date.now() + maxTotalMs : 0;
  try {
    const { chunks, total, over, idle } = await drainBoundedChunks(
      reader,
      maxBytes,
      idleMs,
      deadlineMs
    );
    if (idle) {
      // Never awaited: this branch exists because the stream stopped answering.
      void reader.cancel().catch(() => undefined);
      return { kind: "idle", text: concatChunks(chunks, total) ?? "" };
    }
    if (over) {
      try {
        await reader.cancel();
      } catch {
        // best-effort
      }
      return { kind: "skipped" };
    }
    const text = concatChunks(chunks, total);
    return text === null ? { kind: "skipped" } : { kind: "text", text };
  } catch {
    return { kind: "error" };
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // best-effort
    }
  }
}

// Discriminated by a string, not a boolean literal: a boolean discriminant does not
// narrow under every tsconfig in this repo (the API-route check is one of them).
export type BufferedTurnVerdict =
  { kind: "retry"; reason: string } | { kind: "pass"; why: string; idlePass?: true };

/** Max chars of the free-text verdict reason kept in the one-line verdict log. */
export const BUFFERED_VERDICT_LOG_REASON_MAX = 180;

export type BufferedVerdictLogLevel = "info" | "warn";

/**
 * Presentation-only verdict log line (no I/O, no mutation): one bounded line
 * per verdict with correlation identifiers. `warn` only for an anomalous
 * pass on a stalled turn (`idlePass`); everything else is `info`. Never
 * receives turn content — only the short verdict reason, truncated.
 */
export function formatBufferedVerdictLog(
  verdict: BufferedTurnVerdict,
  correlationId: string | null,
  traceId: string
): { level: BufferedVerdictLogLevel; line: string } {
  const idle = verdict.kind === "pass" && verdict.idlePass === true;
  const reason = verdict.kind === "pass" ? verdict.why : verdict.reason;
  // Collapse newlines first so the line guarantee is structural, not hostage
  // to future reason literals: the verdict log is always exactly one line.
  const flattened = reason.replace(/\s*\n\s*/g, " ");
  const clipped =
    flattened.length > BUFFERED_VERDICT_LOG_REASON_MAX
      ? `${flattened.slice(0, BUFFERED_VERDICT_LOG_REASON_MAX)}…`
      : flattened;
  const cid = correlationId && correlationId.length > 0 ? correlationId : "none";
  return {
    level: idle ? "warn" : "info",
    line: `verdict=${verdict.kind} idle=${idle ? "yes" : "no"} correlationId=${cid} trace=${traceId} ${clipped}`,
  };
}

/**
 * Decide from a bounded read whether the buffered turn deserves a retry: an
 * empty turn, or a stream that dropped before anything reached the client
 * (unless the client itself went away). Every other outcome passes through.
 */
export function judgeBufferedTurn(
  read: BoundedReadOutcome,
  targetFormat: string,
  clientFormat: string,
  clientAborted: boolean
): BufferedTurnVerdict {
  if (read.kind === "skipped") {
    return { kind: "pass", why: "not classified (over the buffer cap or unreadable)" };
  }
  if (read.kind === "idle") {
    if (clientAborted) {
      return { kind: "pass", why: "stream stalled after the client went away" };
    }
    // Same classifier as the content watchdog: a stalled turn the watchdog
    // would kill must never be passed through. The translated replay below
    // cannot decide this — its catch-all keeps every Responses item, so it
    // calls even a mute turn usable. Only raw useful content passes.
    if (!hasUsefulStreamContent(read.text)) {
      return { kind: "retry", reason: "stream stalled before any usable output" };
    }
    return { kind: "pass", why: "stalled turn already carries usable content", idlePass: true };
  }
  if (read.kind === "error") {
    return clientAborted
      ? { kind: "pass", why: "stream dropped after the client went away" }
      : { kind: "retry", reason: "stream dropped before any output" };
  }
  const summary = summarizeReplayedUpstreamTurn(read.text, targetFormat, clientFormat);
  if (!summary) return { kind: "pass", why: "turn could not be summarized" };
  return isUselessEmptyTurn(summary)
    ? { kind: "retry", reason: "empty turn" }
    : { kind: "pass", why: "turn has usable content" };
}

/** Text of a bounded read, or null when the body was skipped or failed. */
export async function readBoundedResponseText(
  response: Response,
  maxBytes: number,
  idleMs = 0
): Promise<string | null> {
  const outcome = await readBoundedResponseOutcome(response, maxBytes, idleMs);
  return outcome.kind === "text" ? outcome.text : null;
}

type ProbeAccum = {
  state: Record<string, unknown>;
  forwardedValuableChunk: boolean;
  finishReason: string;
  toolCallsPresent: boolean;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return !!value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function firstChoiceOf(rec: Record<string, unknown>): Record<string, unknown> | null {
  if (!Array.isArray(rec.choices)) return null;
  return asRecord(rec.choices[0]);
}

function choiceDelta(rec: Record<string, unknown>): Record<string, unknown> | null {
  const choice = firstChoiceOf(rec);
  if (!choice) return null;
  return asRecord(choice.delta);
}

function createProbeState(sourceFormat: string): Record<string, unknown> | null {
  try {
    return {
      ...(initState(sourceFormat) as Record<string, unknown>),
      accumulatedContent: "",
      accumulatedReasoning: "",
    };
  } catch {
    return null;
  }
}

function appendText(state: Record<string, unknown>, key: string, text: string): void {
  if (state[key] === undefined || !text) return;
  state[key] = String(state[key]) + text;
}

function accumulateRawChunk(parsed: Record<string, unknown>, probe: ProbeAccum): void {
  const rawDelta = choiceDelta(parsed);
  const content = rawDelta?.content;
  if (typeof content === "string" && content) {
    appendText(probe.state, "accumulatedContent", content);
  }
  const reasoning = getReadableReasoningValue(rawDelta ?? {});
  if (reasoning) appendText(probe.state, "accumulatedReasoning", reasoning);
}

function sanitizeForVerdict(item: unknown, sourceFormat: string): Record<string, unknown> | null {
  const rec = asRecord(item);
  if (!rec) return null;
  const isResponsesEvent =
    typeof rec?.event === "string" && (rec.event as string).startsWith("response.");
  if (sourceFormat === FORMATS.OPENAI && !isResponsesEvent) {
    return sanitizeStreamingChunk(rec) as Record<string, unknown>;
  }
  return rec;
}

function accumulateHubContent(rec: Record<string, unknown>, probe: ProbeAccum): string {
  const delta = choiceDelta(rec);
  const content = delta && typeof delta.content === "string" ? delta.content : "";
  if (content) appendText(probe.state, "accumulatedContent", content);
  return content;
}

function accumulateHubReasoning(rec: Record<string, unknown>, probe: ProbeAccum): string {
  const readable = getReadableReasoningValue(rec);
  const delta = choiceDelta(rec);
  const anyReasoning = readable || getAnyReasoningValue(delta ?? {});
  if (anyReasoning) appendText(probe.state, "accumulatedReasoning", anyReasoning);
  return readable;
}

function scanSiblingReasoning(translated: unknown[], item: unknown, probe: ProbeAccum): void {
  for (const sib of translated) {
    if (!sib || typeof sib !== "object" || Array.isArray(sib) || sib === item) continue;
    const sibDelta = choiceDelta(sib as Record<string, unknown>);
    const sibReasoning = getReadableReasoningValue(sibDelta ?? {});
    if (sibReasoning) appendText(probe.state, "accumulatedReasoning", sibReasoning);
    if (sibReasoning) probe.forwardedValuableChunk = true;
  }
}

function recordValuableItem(rec: Record<string, unknown>, probe: ProbeAccum): void {
  probe.forwardedValuableChunk = true;
  const choice = firstChoiceOf(rec);
  const finish = choice?.finish_reason;
  if (typeof finish === "string" && finish) probe.finishReason = finish;
  const delta = choice ? asRecord(choice.delta) : null;
  const toolCalls = delta?.tool_calls;
  if (Array.isArray(toolCalls) && toolCalls.length > 0) probe.toolCallsPresent = true;
}

function classifyTranslatedItem(
  item: unknown,
  translated: unknown[],
  sourceFormat: string,
  probe: ProbeAccum
): void {
  const rec = sanitizeForVerdict(item, sourceFormat);
  if (!rec) return;
  accumulateHubContent(rec, probe);
  const hubReasoning = accumulateHubReasoning(rec, probe);
  if (!hubReasoning && Array.isArray(translated)) {
    scanSiblingReasoning(translated, item, probe);
  }
  if (!hasValuableContent(rec, sourceFormat)) return;
  recordValuableItem(rec, probe);
}

function replayParseLine(
  line: string,
  targetFormat: string,
  sourceFormat: string,
  probe: ProbeAccum
): void {
  const trimmed = line.trim();
  if (!trimmed) return;
  const parsedLine = parseSSELine(trimmed);
  if (!parsedLine || (parsedLine as Record<string, unknown>).done) return;
  const parsed = parsedLine as Record<string, unknown>;
  accumulateRawChunk(parsed, probe);
  let translated: unknown;
  try {
    translated = translateResponse(
      targetFormat,
      sourceFormat,
      parsed as Record<string, unknown>,
      probe.state
    );
  } catch {
    return;
  }
  if (!Array.isArray(translated)) return;
  for (const item of translated) {
    classifyTranslatedItem(item, translated, sourceFormat, probe);
  }
}

function replayFlush(targetFormat: string, sourceFormat: string, probe: ProbeAccum): void {
  try {
    const flushed = translateResponse(targetFormat, sourceFormat, null, probe.state);
    if (!Array.isArray(flushed)) return;
    for (const item of flushed) {
      const rec = asRecord(item);
      if (rec && hasValuableContent(rec, sourceFormat)) {
        probe.forwardedValuableChunk = true;
      }
    }
  } catch {
    // Flush failure is conservative: keep what the chunks already told us
  }
}

function buildProbeSummary(probe: ProbeAccum): EmptyTurnSummary {
  return {
    finishReason:
      probe.finishReason ||
      (typeof probe.state.finishReason === "string" ? probe.state.finishReason : ""),
    contentText:
      typeof probe.state.accumulatedContent === "string" ? probe.state.accumulatedContent : "",
    reasoningText:
      typeof probe.state.accumulatedReasoning === "string" ? probe.state.accumulatedReasoning : "",
    forwardedValuableChunk: probe.forwardedValuableChunk,
    hasValidUsage: hasValidUsage(probe.state.usage as never),
    toolCallsPresent:
      probe.toolCallsPresent ||
      (probe.state.toolCalls instanceof Map && probe.state.toolCalls.size > 0),
  };
}

/**
 * Replay buffered upstream SSE bytes through a disposable translator and
 * summarize the turn for `isUselessEmptyTurn`. Same translator entries as the
 * live transform (`translateResponse` + `initState`), no client output.
 * Returns null when the body is not classifiable (conservative: no retry).
 */
export function summarizeReplayedUpstreamTurn(
  text: string,
  targetFormat: string,
  sourceFormat: string
): EmptyTurnSummary | null {
  const state = createProbeState(sourceFormat);
  if (!state) return null;
  const probe: ProbeAccum = {
    state,
    forwardedValuableChunk: false,
    finishReason: "",
    toolCallsPresent: false,
  };
  try {
    for (const line of text.split("\n")) {
      replayParseLine(line, targetFormat, sourceFormat, probe);
    }
    replayFlush(targetFormat, sourceFormat, probe);
  } catch {
    return null;
  }
  return buildProbeSummary(probe);
}
