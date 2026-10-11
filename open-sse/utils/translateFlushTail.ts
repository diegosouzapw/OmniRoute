/**
 * Shared per-line drain for translate-mode flush.
 *
 * When a translated stream ends without a closing blank line, the multiline
 * normalizer still holds the final event in its pending tail
 * (`hasPending()` true, `buffer` already cleared at stream.ts flush time).
 * This module replays each held line through the same per-line pipeline as
 * the stream transform, before the existing partial-buffer block runs: a
 * partial tail line without any newline keeps its current buffered handling,
 * since exactly one of the two paths ever holds data (m1 invariant: the
 * normalizer clears `buffer` when it produces the tail).
 */
import { parseSSELine } from "./streamHelpers.ts";
import { extractUsage, sanitizeUsagePayloadForRequest } from "./usageTracking.ts";
import { normalizeArrayContentChunk } from "./arrayContentDelta.ts";
import { markToolFinish } from "../services/sessionManager.ts";

type JsonRecord = Record<string, unknown>;

export type TranslateFlushTailContext = {
  targetFormat: string;
  openaiFormat: string;
  openaiResponsesFormat: string;
  body: unknown;
  state: { usage?: unknown } & JsonRecord;
  sessionId: string | null;
  now: () => number;
  getLastToolCallChunkTime: () => number | null;
  setLastToolCallChunkTime: (value: number | null) => void;
  getToolFinishTime: () => number | null;
  setToolFinishTime: (value: number | null) => void;
  noteReasoning: (parsed: unknown, nowMs: number) => void;
  isDuplicateSequence: (value: unknown) => boolean;
  shouldDropCommentary: (parsed: JsonRecord) => boolean;
  pushProviderPayload: (payload: unknown) => void;
  emitFailureAndAbort: (controller: unknown, parsed: unknown) => boolean;
  translateAndEmit: (controller: unknown, parsed: unknown) => void;
};

function mergeUsage(state: { usage?: unknown }, extracted: unknown): void {
  if (!extracted) return;
  if (!state.usage) {
    state.usage = extracted;
    return;
  }
  const current = state.usage as Record<string, number>;
  const incoming = extracted as Record<string, number>;
  if (incoming.prompt_tokens > 0) current.prompt_tokens = incoming.prompt_tokens;
  if (incoming.completion_tokens > 0) current.completion_tokens = incoming.completion_tokens;
  if (incoming.total_tokens > 0) current.total_tokens = incoming.total_tokens;
  if (incoming.input_tokens > 0) current.input_tokens = incoming.input_tokens;
  if (incoming.output_tokens > 0) current.output_tokens = incoming.output_tokens;
  if (incoming.cache_read_input_tokens > 0)
    current.cache_read_input_tokens = incoming.cache_read_input_tokens;
  if (incoming.cache_creation_input_tokens > 0)
    current.cache_creation_input_tokens = incoming.cache_creation_input_tokens;
  if (incoming.cached_tokens > 0) current.cached_tokens = incoming.cached_tokens;
  if (incoming.reasoning_tokens > 0) current.reasoning_tokens = incoming.reasoning_tokens;
}

/**
 * Replay held tail lines through the translate pipeline.
 * Returns true when the caller must stop the flush immediately (failure abort).
 */
export function drainTranslateFlushTail(
  lines: string[],
  controller: unknown,
  context: TranslateFlushTailContext
): boolean {
  for (const line of lines) {
    if (drainOneTailLine(line, controller, context)) return true;
  }
  return false;
}

function drainOneTailLine(
  line: string,
  controller: unknown,
  context: TranslateFlushTailContext
): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  const parsed = parseSSELine(trimmed);
  if (!parsed) return false;
  if (context.emitFailureAndAbort(controller, parsed)) return true;
  if (isSkippedTailLine(parsed, context)) return false;
  context.pushProviderPayload(parsed);
  sanitizeUsagePayloadForRequest(parsed, context.body, context.targetFormat);
  trackTailToolTiming(parsed as JsonRecord, context);
  mergeUsage(context.state, extractUsage(parsed));
  context.translateAndEmit(controller, parsed);
  return false;
}

function isSkippedTailLine(parsed: unknown, context: TranslateFlushTailContext): boolean {
  const record = parsed as JsonRecord;
  if (context.targetFormat === context.openaiFormat) normalizeArrayContentChunk(parsed);
  if (
    context.targetFormat === context.openaiResponsesFormat &&
    context.isDuplicateSequence(record.sequence_number)
  ) {
    return true;
  }
  context.noteReasoning(parsed, context.now());
  if (context.shouldDropCommentary(record)) return true;
  return record.done === true;
}

function trackTailToolTiming(record: JsonRecord, context: TranslateFlushTailContext): void {
  const delta = record.choices as
    Array<{ delta?: { tool_calls?: unknown }; finish_reason?: unknown }> | undefined;
  if (delta?.[0]?.delta?.tool_calls) {
    context.setLastToolCallChunkTime(context.now());
  }
  if (delta?.[0]?.finish_reason === "tool_calls") {
    context.setToolFinishTime(context.now());
    try {
      markToolFinish(context.sessionId);
    } catch {} // best-effort bookkeeping write — a miss just skips latency correlation
  }
}
