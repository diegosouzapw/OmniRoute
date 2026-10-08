/**
 * Trim oversized `enum` arrays in tool schemas before dispatch to OpenCode.
 *
 * OpenCode's upstream rejects a request with HTTP 400 when a single enum
 * property carries more than 250 values or the combined enum string length
 * exceeds 15000 characters. Generic SDK clients (e.g. VSCode-shaped caller
 * tools with 300+ allowed values) hit this on otherwise valid requests, so
 * the executor caps every offending enum to at most 200 values / 12000
 * combined characters and notes the truncation on the property description.
 * The walker is schema-shape agnostic: it trims OpenAI `parameters`,
 * Claude `input_schema` and Responses tool schemas alike.
 */
export const OPENCODE_ENUM_TRIGGER_VALUES = 250;
export const OPENCODE_ENUM_TRIGGER_CHARS = 15000;
export const OPENCODE_ENUM_MAX_VALUES = 200;
export const OPENCODE_ENUM_MAX_CHARS = 12000;

function enumValueLength(value: unknown): number {
  if (typeof value === "string") return value.length;
  try {
    return JSON.stringify(value ?? null)?.length ?? 4;
  } catch {
    return String(value).length;
  }
}

function combinedEnumLength(values: unknown[]): number {
  let total = 0;
  for (const value of values) total += enumValueLength(value);
  return total;
}

function trimNode(node: unknown, seen: Set<unknown>): number {
  if (!node || typeof node !== "object" || seen.has(node)) return 0;
  seen.add(node);
  if (Array.isArray(node)) {
    let count = 0;
    for (const item of node) count += trimNode(item, seen);
    return count;
  }
  const record = node as Record<string, unknown>;
  let count = 0;
  const values = record.enum;
  if (
    Array.isArray(values) &&
    (values.length > OPENCODE_ENUM_TRIGGER_VALUES ||
      combinedEnumLength(values) > OPENCODE_ENUM_TRIGGER_CHARS)
  ) {
    let kept = values.slice(0, OPENCODE_ENUM_MAX_VALUES);
    while (kept.length > 1 && combinedEnumLength(kept) > OPENCODE_ENUM_MAX_CHARS) {
      kept = kept.slice(0, -1);
    }
    const omitted = values.length - kept.length;
    record.enum = kept;
    const note = `(+${omitted} more values allowed; list truncated for provider limits)`;
    record.description =
      typeof record.description === "string" && record.description.length > 0
        ? `${record.description} ${note}`
        : note;
    count += 1;
  }
  for (const key of Object.keys(record)) {
    if (key === "enum") continue;
    count += trimNode(record[key], seen);
  }
  return count;
}

/**
 * Cap every oversized `enum` found under `tools` in place.
 * @returns the number of trimmed enum properties.
 */
export function trimOversizedToolEnums(tools: unknown): number {
  if (!Array.isArray(tools)) return 0;
  const seen = new Set<unknown>();
  let trimmed = 0;
  for (const tool of tools) trimmed += trimNode(tool, seen);
  return trimmed;
}
