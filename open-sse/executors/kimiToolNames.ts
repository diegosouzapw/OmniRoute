type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

// ponytail: Kimi K3 (Moonshot) enforces a stricter tool-message contract than most
// OpenAI-compatible APIs: every role:"tool" message must carry a `name` field matching
// the function that issued the tool_call_id. When requests arrive through combo routing
// or format translation, the `name` field is frequently stripped, causing a 400.
// This builds a tool_call_id -> function.name lookup from assistant tool_calls and
// backfills missing names. Shared by KimiExecutor and DefaultExecutor (for BYOK providers).
// Upgrade path: if Moonshot relaxes this requirement, this function becomes a no-op.
export function ensureToolMessageNames(record: JsonRecord): JsonRecord {
  if (!Array.isArray(record.messages)) return record;

  const callIdToName = new Map<string, string>();
  for (const msg of record.messages) {
    const m = asRecord(msg);
    if (!m || m.role !== "assistant" || !Array.isArray(m.tool_calls)) continue;
    for (const tc of m.tool_calls as { id?: string; function?: { name?: string } }[]) {
      if (tc?.id && typeof tc.function?.name === "string") {
        callIdToName.set(String(tc.id), tc.function.name);
      }
    }
  }

  if (callIdToName.size === 0) return record;

  let modified = false;
  const messages = record.messages.map((msg: unknown) => {
    const m = asRecord(msg);
    if (!m || m.role !== "tool" || typeof m.name === "string") return msg;
    const callId = String(m.tool_call_id ?? "");
    const resolvedName = callIdToName.get(callId);
    if (!resolvedName) return msg;
    modified = true;
    return { ...m, name: resolvedName };
  });

  return modified ? { ...record, messages } : record;
}
