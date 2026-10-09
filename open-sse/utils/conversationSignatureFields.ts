/** Fields outside role/content that change the meaning of a tool conversation. */
const TOOL_FIELDS = [
  "tool_calls",
  "function_call",
  "tool_call_id",
  "call_id",
  "name",
  "arguments",
  "output",
] as const;

export function conversationSignatureFields(item: unknown): Record<string, unknown> {
  if (!item || typeof item !== "object" || Array.isArray(item)) return {};
  const record = item as Record<string, unknown>;
  const fields: Record<string, unknown> = {};
  for (const key of TOOL_FIELDS) {
    if (record[key] !== undefined) fields[key] = record[key];
  }
  // Responses message items and plain Chat messages keep their existing keys.
  if (typeof record.type === "string" && record.type !== "message") {
    fields.type = record.type;
  }
  return fields;
}
