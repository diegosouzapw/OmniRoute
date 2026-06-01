type JsonRecord = Record<string, unknown>;
const INTERNAL_ASSISTANT_PHASES = new Set(["commentary"]);
const SERVER_ITEM_ID_PREFIX_BY_TYPE: Record<string, string> = {
  function_call: "fc_",
  message: "msg_",
  reasoning: "rs_",
};
const SERVER_ITEM_ID_PATTERN = /^(fc|msg|rs|resp)_/;

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

// OpenAI Responses API enforces two constraints on name fields in input items:
//   1. Max 128 characters
//   2. Must match ^[a-zA-Z0-9_-]+$
// Sanitize after cloning so upstream never sees an invalid name.
function sanitizeFunctionName(name: string): string {
  // Replace any character not in [a-zA-Z0-9_-] with underscore, then truncate.
  return name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128);
}

function sanitizeInputItemId(record: JsonRecord): JsonRecord {
  if (typeof record.id !== "string") return record;

  const type = typeof record.type === "string" ? record.type : "";
  const expectedPrefix = SERVER_ITEM_ID_PREFIX_BY_TYPE[type];
  const hasExpectedPrefix = expectedPrefix
    ? record.id.startsWith(expectedPrefix)
    : SERVER_ITEM_ID_PATTERN.test(record.id);

  if (hasExpectedPrefix) return record;

  const next = { ...record };
  delete next.id;
  return next;
}

function sanitizeInputItem(item: unknown): unknown {
  const record = toRecord(item);
  if (!record) return item;

  let next = sanitizeInputItemId(record);
  if (
    (next.type === "function_call" || next.type === "function_call_output") &&
    typeof next.name === "string" &&
    !/^[a-zA-Z0-9_-]{1,128}$/.test(next.name)
  ) {
    next = { ...next, name: sanitizeFunctionName(next.name) };
  }
  return next;
}

export function sanitizeResponsesInputItems(items: readonly unknown[], clone = true): unknown[] {
  const sanitized: unknown[] = [];

  for (const item of items) {
    const record = toRecord(item);
    if (record && isInternalAssistantMessage(record)) {
      continue;
    }

    const cloned = clone ? structuredClone(item) : item;
    sanitized.push(sanitizeInputItem(cloned));
  }

  return sanitized;
}
