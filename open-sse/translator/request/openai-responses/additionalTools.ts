type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toolIdentity(value: unknown): string | null {
  const tool = toRecord(value);
  const nestedFunction = toRecord(tool.function);
  const name =
    typeof tool.name === "string" && tool.name.trim()
      ? tool.name.trim()
      : typeof nestedFunction.name === "string" && nestedFunction.name.trim()
        ? nestedFunction.name.trim()
        : "";
  return name ? `name:${name}` : null;
}

/**
 * Collect all Responses tool declarations before downgrading to Chat Completions.
 *
 * Most clients use the top-level `tools` array. Newer agent clients may instead add one or
 * more `{ type: "additional_tools", tools: [...] }` input items so tool availability can be
 * changed alongside the conversation transcript. Both forms describe tools available for
 * the current response and therefore share the same downstream conversion path.
 *
 * Explicit top-level declarations take precedence on named collisions. Unnamed hosted tools are
 * kept verbatim because their type can be repeated with distinct provider-specific configuration.
 * This keeps the established request contract stable and prevents duplicate function names from
 * reaching strict upstreams.
 */
export function collectResponsesTools(rootTools: unknown, inputItems: unknown[]): unknown[] {
  const sources: unknown[][] = [Array.isArray(rootTools) ? rootTools : []];

  for (const itemValue of inputItems) {
    const item = toRecord(itemValue);
    if (item.type === "additional_tools" && Array.isArray(item.tools)) {
      sources.push(item.tools);
    }
  }

  const merged: unknown[] = [];
  const seen = new Set<string>();
  for (const source of sources) {
    for (const tool of source) {
      const identity = toolIdentity(tool);
      if (identity && seen.has(identity)) continue;
      if (identity) seen.add(identity);
      merged.push(tool);
    }
  }
  return merged;
}
