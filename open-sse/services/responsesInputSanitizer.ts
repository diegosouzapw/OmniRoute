type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function isResponsesMessageItem(record: JsonRecord): boolean {
  return record.type === "message" || (!record.type && typeof record.role === "string");
}

export function isInternalAssistantMessage(record: JsonRecord): boolean {
  if (!isResponsesMessageItem(record)) return false;
  if (record.role !== "assistant") return false;

  const phase = typeof record.phase === "string" ? record.phase.trim().toLowerCase() : "";
  if (!phase) return false;

  // OpenCode can send assistant-side commentary/analysis frames in Responses
  // shape. Those frames are local runtime state, not durable conversation turns.
  return phase !== "final";
}

export function sanitizeResponsesInputItems(items: readonly unknown[], clone = true): unknown[] {
  const sanitized: unknown[] = [];

  for (const item of items) {
    const record = toRecord(item);
    if (record && isInternalAssistantMessage(record)) {
      continue;
    }

    sanitized.push(clone ? structuredClone(item) : item);
  }

  return sanitized;
}
