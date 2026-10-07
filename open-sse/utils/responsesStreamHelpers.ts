type JsonRecord = Record<string, unknown>;

export function stringifyIdValue(value: unknown): string | null {
  return value === null || value === undefined ? null : String(value);
}

function normalizeResponsesOutputItemIds(item: unknown): unknown {
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

  if (
    payload.response &&
    typeof payload.response === "object" &&
    !Array.isArray(payload.response)
  ) {
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

function buildResponsesOutputItemKey(item: unknown): string | null {
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

// Module-level Set reused across calls to avoid allocation per event
const _seenResponsesKeys = new Set<string>();

export function pushUniqueResponsesOutputItems(target: unknown[], items: readonly unknown[]) {
  // Clear the reused Set instead of allocating new one
  _seenResponsesKeys.clear();

  for (const existingItem of target) {
    const key = buildResponsesOutputItemKey(existingItem);
    if (key) {
      _seenResponsesKeys.add(key);
    }
  }

  for (const item of items) {
    const key = buildResponsesOutputItemKey(item);
    if (key && _seenResponsesKeys.has(key)) {
      continue;
    }

    target.push(item);
    if (key) {
      _seenResponsesKeys.add(key);
    }
  }
}

/**
 * #10156 — strip items matched by `isCommentaryItem` (the same predicate used
 * to drop live commentary-phase SSE frames, #6199) from a `response.completed`
 * output array before it is forwarded or buffered for backfill. Upstreams may
 * echo an already-dropped commentary item back inside a non-empty terminal
 * `output` array; without this, the live stream and the terminal snapshot
 * silently disagree about what the client actually saw.
 */
export function filterResponsesCommentaryFromItems(
  items: readonly unknown[],
  isCommentaryItem: (item: unknown) => boolean
): { items: unknown[]; changed: boolean } {
  let changed = false;
  const filtered = items.filter((item) => {
    if (isCommentaryItem(item)) {
      changed = true;
      return false;
    }
    return true;
  });
  return { items: filtered, changed };
}

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
 * Keep the terminal Responses payload compatible with strict clients such as Codex.
 * Upstreams may expose only input/output counts (or omit usage entirely), while the
 * client deserializer requires all three canonical token fields.
 */
export function normalizeResponsesCompletedUsage(parsed: unknown): boolean {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
  const obj = parsed as JsonRecord;
  if (obj.type !== "response.completed") return false;
  if (!obj.response || typeof obj.response !== "object" || Array.isArray(obj.response)) {
    return false;
  }

  const response = obj.response as JsonRecord;
  const current =
    response.usage && typeof response.usage === "object" && !Array.isArray(response.usage)
      ? (response.usage as JsonRecord)
      : {};
  const finiteNumber = (value: unknown): number | null => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  };
  const inputTokens =
    finiteNumber(current.input_tokens) ?? finiteNumber(current.prompt_tokens) ?? 0;
  const outputTokens =
    finiteNumber(current.output_tokens) ?? finiteNumber(current.completion_tokens) ?? 0;
  const totalTokens = finiteNumber(current.total_tokens) ?? inputTokens + outputTokens;

  const normalized: JsonRecord = {
    ...current,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
  };
  normalized.total_tokens = totalTokens;
  const changed =
    !response.usage ||
    current.input_tokens !== inputTokens ||
    current.output_tokens !== outputTokens ||
    current.total_tokens !== totalTokens;
  response.usage = normalized;
  return changed;
}

const RESPONSES_LIFECYCLE_EVENT_TYPES = new Set([
  "response.created",
  "response.in_progress",
  "response.completed",
]);

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
  // Preserve tools on the terminal snapshot: response.completed is what
  // Codex CLI rebuilds its tool list from (#8990). Same special-case as
  // backfillResponsesCompletedOutput. Still stripped on created/in_progress.
  if (obj.type !== "response.completed" && "tools" in r) {
    delete r.tools;
    changed = true;
  }
  return changed;
}
