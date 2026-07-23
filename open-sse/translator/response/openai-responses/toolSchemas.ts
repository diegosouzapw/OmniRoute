// Pure, stateless helper: build a Map<toolName, parametersSchema> from a request body's
// `tools[]` (Chat Completions `{type:"function",function:{name,parameters}}` shape or
// Responses API `{type:"function",name,parameters}` shape). Used to thread each tool's
// JSON Schema into response-side normalization (#6951 — stripEmptyOptionalToolArgs) so
// it can be schema-aware instead of allowlist-only. No stream state, no host import.

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

export function extractToolSchemaMap(body: unknown): Map<string, JsonRecord> | null {
  const record = asRecord(body);
  const tools = record?.tools;
  if (!Array.isArray(tools)) return null;

  const map = new Map<string, JsonRecord>();
  for (const tool of tools) {
    const item = asRecord(tool);
    if (!item) continue;
    const fn = asRecord(item.function);
    const name = (typeof fn?.name === "string" ? fn.name : typeof item.name === "string" ? item.name : "").trim();
    if (!name) continue;
    const schema = asRecord(fn?.parameters ?? item.parameters);
    if (schema) map.set(name, schema);
  }
  return map.size > 0 ? map : null;
}
