import { stringifyIdValue } from "./utils.ts";
import { JsonRecord } from "./types.ts";

export function normalizeResponsesOutputItemIds(item: unknown): unknown {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return item;
  }

  const record = item as JsonRecord;
  let changed = false;
  const normalized = { ...record };

  const id = stringifyIdValue(record.id);
  if (id !== null && record.id !== id) {
    normalized.id = id;
    changed = true;
  }

  const callId = stringifyIdValue(record.call_id);
  if (callId !== null && record.call_id !== callId) {
    normalized.call_id = callId;
    changed = true;
  }

  return changed ? normalized : item;
}

export function normalizeResponsesSseIds(payload: JsonRecord): boolean {
  let changed = false;

  for (const key of ["response_id", "item_id", "call_id"] as const) {
    const value = stringifyIdValue(payload[key]);
    if (value !== null && payload[key] !== value) {
      payload[key] = value;
      changed = true;
    }
  }

  if (payload.item && typeof payload.item === "object" && !Array.isArray(payload.item)) {
    const normalizedItem = normalizeResponsesOutputItemIds(payload.item);
    if (normalizedItem !== payload.item) {
      payload.item = normalizedItem;
      changed = true;
    }
  }

  if (payload.response && typeof payload.response === "object" && !Array.isArray(payload.response)) {
    const response = payload.response as JsonRecord;
    let responseChanged = false;
    const normalizedResponse = { ...response };

    const responseId = stringifyIdValue(response.id);
    if (responseId !== null && response.id !== responseId) {
      normalizedResponse.id = responseId;
      responseChanged = true;
    }

    if (Array.isArray(response.output)) {
      const normalizedOutput = response.output.map(normalizeResponsesOutputItemIds);
      if (normalizedOutput.some((item, index) => item !== response.output[index])) {
        normalizedResponse.output = normalizedOutput;
        responseChanged = true;
      }
    }

    if (responseChanged) {
      payload.response = normalizedResponse;
      changed = true;
    }
  }

  return changed;
}

export const PENDING_REQUEST_CLEARED_MARKER = "__omniroutePendingRequestCleared";

export function markPendingRequestCleared(error: Error): Error {
  (error as Error & Record<string, unknown>)[PENDING_REQUEST_CLEARED_MARKER] = true;
  return error;
}

export function buildResponsesOutputItemKey(item: unknown): string | null {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return null;
  }

  const record = item as JsonRecord;
  const type = typeof record.type === "string" ? record.type : "";
  const id = stringifyIdValue(record.id) ?? "";
  const callId = stringifyIdValue(record.call_id) ?? "";
  const outputIndex = typeof record.output_index === "number" ? record.output_index : "";
  const name = typeof record.name === "string" ? record.name : "";

  if (!type && !id && !callId) {
    return null;
  }

  return `${type}:${id}:${callId}:${outputIndex}:${name}`;
}

export function pushUniqueResponsesOutputItems(target: unknown[], items: readonly unknown[]) {
  const seen = new Set<string>();

  for (const existingItem of target) {
    const key = buildResponsesOutputItemKey(existingItem);
    if (key) {
      seen.add(key);
    }
  }

  for (const item of items) {
    const key = buildResponsesOutputItemKey(item);
    if (key && seen.has(key)) {
      continue;
    }

    target.push(item);
    if (key) {
      seen.add(key);
    }
  }
}

/**
 * Lifecycle event types in OpenAI Responses API streams whose `response`
 * payload is a snapshot of the request (echoes back `instructions` + `tools`).
 */
export const RESPONSES_LIFECYCLE_EVENT_TYPES = new Set([
  "response.created",
  "response.in_progress",
  "response.completed",
]);

/**
 * Backfill `parsed.response.output` on a `response.completed` event from the
 * snapshots accumulated as the stream progressed (`response.output_item.done`).
 *
 * Why: when the upstream request runs with `store: false`, OpenAI's Responses
 * API leaves `response.output` empty in the final `response.completed`
 * snapshot — clients that rebuild assistant messages from that snapshot
 * (notably the GitHub Copilot CLI 1.0.36) end up with `choices: []` and never
 * trigger tool execution. Codex CLI and others that consume per-item events
 * are unaffected; backfilling the array makes both styles work.
 *
 * Returns true when `parsed.response.output` was empty and got replaced, so
 * the caller can re-serialize.
 */
export function backfillResponsesCompletedOutput(
  parsed: unknown,
  collectedItems: readonly unknown[]
): boolean {
  if (!collectedItems.length) return false;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
  const obj = parsed as Record<string, unknown>;
  if (obj.type !== "response.completed") return false;
  const resp = obj.response;
  if (!resp || typeof resp !== "object" || Array.isArray(resp)) return false;
  const r = resp as Record<string, unknown>;
  const existing = r.output;
  if (Array.isArray(existing) && existing.length > 0) return false;
  r.output = collectedItems.slice();
  return true;
}

/**
 * Strip the request echo (`instructions`, `tools`) from `parsed.response`
 * on Responses API lifecycle events.
 *
 * Why: those fields can balloon the SSE message past 100 KB when the request
 * carries large tool definitions / instructions. Some clients (notably the
 * GitHub Copilot CLI) cannot process oversized SSE events and stop rendering
 * mid-stream. The fields are pure echo of the original request — clients
 * already hold the original locally — so removing them is observably safe.
 *
 * Returns true when the payload was modified and must be re-serialized.
 */
export function stripResponsesLifecycleEcho(parsed: unknown): boolean {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
  const obj = parsed as Record<string, unknown>;
  if (typeof obj.type !== "string" || !RESPONSES_LIFECYCLE_EVENT_TYPES.has(obj.type)) {
    return false;
  }
  const resp = obj.response;
  if (!resp || typeof resp !== "object" || Array.isArray(resp)) return false;
  const r = resp as Record<string, unknown>;
  let changed = false;
  if ("instructions" in r) {
    delete r.instructions;
    changed = true;
  }
  if ("tools" in r) {
    delete r.tools;
    changed = true;
  }
  return changed;
}