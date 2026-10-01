/**
 * responsesReasoningObservation.ts — pure helpers for encrypted-reasoning
 * observability (call-log `reasoning_source='encrypted'` + duration + flag).
 *
 * The Responses→chat consumer never sees `output_item.added` (only
 * `done`/`completed`), so the stream loops observe the RAW `parsed` events
 * and pair added→done by `output_index` (fallback `item.id`). The sink side
 * (`saveCallLog`) scans terminal `output[]` snapshots, covering non-streaming
 * and batch-completed-without-added payloads.
 *
 * NEVER persist `encrypted_content`/`signature`/`data` — presence flag,
 * wall-clock delta and effort VALUES only.
 */

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function isNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}

/**
 * True when a Responses `reasoning` item carries only opaque (encrypted)
 * state. Mirrors `hasOpaqueReasoningState` in
 * `open-sse/services/reasoningInputPolicy.ts` without importing the policy
 * module (keeps this leaf dependency-free for the stream hot path).
 */
export function isEncryptedReasoningItem(item: unknown): boolean {
  const record = asRecord(item);
  if (!record || record.type !== "reasoning") return false;
  return (
    isNonEmptyString(record.encrypted_content) ||
    record.signature !== undefined ||
    record.format !== undefined
  );
}

/** Extract the client-requested effort value verbatim (or null when absent). */
export function extractRequestedEffort(body: unknown): string | null {
  const record = asRecord(body);
  if (!record) return null;
  const direct = record.reasoning_effort;
  if (typeof direct === "string" && direct.trim().length > 0) return direct;
  const nested = asRecord(record.reasoning)?.effort;
  if (typeof nested === "string" && nested.trim().length > 0) return nested;
  return null;
}

/** Extract the effort actually sent upstream (post-strip body), or null. */
export function extractUpstreamEffort(bodyToSend: unknown): string | null {
  return extractRequestedEffort(bodyToSend);
}

/** Pair an added/done wall-clock delta; null when negative or absurd (>24h). */
export function pairDurationMs(addedAtMs: number, doneAtMs: number): number | null {
  const delta = doneAtMs - addedAtMs;
  if (!Number.isFinite(delta) || delta < 0 || delta > 86_400_000) return null;
  return Math.round(delta);
}

/**
 * Create a stream-local encrypted-reasoning observer. Holds the added→done
 * pairing state plus the accumulated flag/duration; the stream file only
 * keeps one line per call site.
 */
export type ReasoningStreamTracker = Map<string, { addedAt: number; opaqueSeen: boolean }>;

export function createReasoningStreamObserver() {
  const tracker: ReasoningStreamTracker = new Map();
  let encryptedSeen = false;
  let durationMs: number | null = null;
  return {
    note(parsed: unknown, nowMs: number): void {
      const outcome = observeResponsesReasoningEvent(tracker, parsed, nowMs);
      if (outcome.sawOpaque) encryptedSeen = true;
      if (outcome.durationMs !== null) {
        durationMs =
          durationMs === null
            ? outcome.durationMs
            : durationMs + outcome.durationMs > 86_400_000
              ? durationMs
              : durationMs + outcome.durationMs;
      }
    },
    take(): { encryptedSeen: boolean; durationMs: number | null } | null {
      if (!encryptedSeen && durationMs === null) return null;
      return { encryptedSeen, durationMs };
    },
  };
}

export type ReasoningStreamObserver = ReturnType<typeof createReasoningStreamObserver>;

export function reasoningEventKey(outputIndex: unknown, itemId: unknown): string | null {
  if (typeof outputIndex === "number" && Number.isInteger(outputIndex) && outputIndex >= 0) {
    return `idx:${outputIndex}`;
  }
  if (typeof itemId === "string" && itemId.length > 0) return `id:${itemId}`;
  return null;
}

function eventTypeOf(record: JsonRecord): "added" | "done" | null {
  if (record.type === "response.output_item.added") return "added";
  if (record.type === "response.output_item.done") return "done";
  return null;
}

function reasoningItemOf(record: JsonRecord): JsonRecord | null {
  const item = asRecord(record.item);
  if (!item || item.type !== "reasoning") return null;
  return item;
}

function hasReadableSummaryText(item: JsonRecord): boolean {
  const summary = Array.isArray(item.summary) ? item.summary : [];
  return summary.some((part) => {
    const text = asRecord(part)?.text;
    return typeof text === "string" && text.length > 0;
  });
}

function noteAdded(
  tracker: ReasoningStreamTracker,
  key: string,
  opaque: boolean,
  nowMs: number
): { durationMs: number | null; sawOpaque: boolean } {
  const prev = tracker.get(key);
  tracker.set(key, {
    addedAt: prev?.addedAt ?? nowMs,
    opaqueSeen: (prev?.opaqueSeen ?? false) || opaque,
  });
  return { durationMs: null, sawOpaque: opaque };
}

function noteDone(
  tracker: ReasoningStreamTracker,
  key: string,
  opaque: boolean,
  fallbackOpaque: boolean,
  nowMs: number
): { durationMs: number | null; sawOpaque: boolean } {
  const prev = tracker.get(key);
  tracker.delete(key);
  if (prev) {
    return {
      durationMs: pairDurationMs(prev.addedAt, nowMs),
      sawOpaque: opaque || prev.opaqueSeen,
    };
  }
  return { durationMs: null, sawOpaque: fallbackOpaque };
}

/**
 * Pure observer for one raw Responses SSE event. Mutates only the passed
 * tracker (stream-local). Returns a completed duration when a terminal
 * `done` pairs with a tracked `added`; sets `sawOpaque` whenever an opaque
 * reasoning item is seen (added or terminal — covers done-without-added).
 * Terminal-only fallback: a `type:"reasoning"` done/completed item with NO
 * readable summary counts as encrypted (a live `added` with `summary: []`
 * is normal mid-item, so non-terminal events never use the fallback).
 */
export function observeResponsesReasoningEvent(
  tracker: ReasoningStreamTracker,
  event: unknown,
  nowMs: number
): { durationMs: number | null; sawOpaque: boolean } {
  const idle = { durationMs: null as number | null, sawOpaque: false };
  const record = asRecord(event);
  if (!record) return idle;
  const kind = eventTypeOf(record);
  if (!kind) return idle;
  const item = reasoningItemOf(record);
  if (!item) return idle;
  const key = reasoningEventKey(record.output_index, item.id);
  if (!key) return idle;

  const opaque = isEncryptedReasoningItem(item);
  if (kind === "added") return noteAdded(tracker, key, opaque, nowMs);

  // Terminal: opaque OR no readable summary at all.
  return noteDone(tracker, key, opaque, opaque || !hasReadableSummaryText(item), nowMs);
}

/**
 * Sink-side scan of a terminal Responses `output[]` snapshot (or any body
 * carrying one). Returns true when an opaque reasoning item is present.
 * Covers non-streaming and batch-completed-without-added payloads.
 */
export function snapshotHasOpaqueReasoning(body: unknown): boolean {
  const record = asRecord(body);
  if (!record) return false;
  const outputs: unknown[] = [];
  if (Array.isArray(record.output)) outputs.push(...record.output);
  const nested = asRecord(record.response);
  if (nested && Array.isArray(nested.output)) outputs.push(...nested.output);
  return outputs.some(isEncryptedReasoningItem);
}
