type JsonRecord = Record<string, unknown>;
const INTERNAL_ASSISTANT_PHASES = new Set(["commentary"]);

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

  // Drop only known internal runtime frames. Visible assistant turns such as
  // `final` and `final_answer` must survive replay for Codex/OpenCode follow-ups.
  return INTERNAL_ASSISTANT_PHASES.has(phase);
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
