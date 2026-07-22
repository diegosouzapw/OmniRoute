type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toolName(value: unknown): string {
  const tool = toRecord(value);
  const nestedFunction = toRecord(tool.function);
  return typeof tool.name === "string" && tool.name.trim()
    ? tool.name.trim()
    : typeof nestedFunction.name === "string" && nestedFunction.name.trim()
      ? nestedFunction.name.trim()
      : "";
}

function toolIdentity(value: unknown): string | null {
  const tool = toRecord(value);
  const name = toolName(value);
  if (!name) return null;

  // Namespace names are only containers. The Chat conversion flattens their nested
  // tools, so they do not collide with a top-level function of the same name.
  return tool.type === "namespace" ? `namespace:${name}` : `name:${name}`;
}

function mergeNamespaceTools(first: unknown, second: unknown): unknown[] {
  const merged: unknown[] = [];
  const seenNames = new Set<string>();

  for (const source of [first, second]) {
    if (!Array.isArray(source)) continue;
    for (const tool of source) {
      const name = toolName(tool);
      if (name && seenNames.has(name)) continue;
      if (name) seenNames.add(name);
      merged.push(tool);
    }
  }

  return merged;
}

/**
 * Collect all Responses tool declarations before downgrading to Chat Completions.
 *
 * Most clients use the top-level `tools` array. Newer agent clients may instead add one or
 * more `{ type: "additional_tools", tools: [...] }` input items so tool availability can be
 * changed alongside the conversation transcript. Both forms describe tools available for
 * the current response and therefore share the same downstream conversion path.
 *
 * Explicit top-level declarations take precedence on named collisions. Same-named namespaces are
 * merged before deduplication because the Chat conversion flattens their members. Unnamed hosted
 * tools are kept verbatim because their type can be repeated with distinct provider-specific
 * configuration. This keeps the established request contract stable and prevents duplicate
 * function names from reaching strict upstreams.
 */
export function collectResponsesTools(rootTools: unknown, inputItems: unknown[]): unknown[] {
  const rootToolList = Array.isArray(rootTools) ? rootTools : [];
  const sources: unknown[][] = [rootToolList];

  for (const itemValue of inputItems) {
    const item = toRecord(itemValue);
    if (item.type === "additional_tools" && Array.isArray(item.tools)) {
      sources.push(item.tools);
    }
  }
  const explicitNames = new Set(
    sources
      .flat()
      .map((tool) => {
        const record = toRecord(tool);
        return record.type === "namespace" ? "" : toolName(tool);
      })
      .filter(Boolean)
  );

  const merged: unknown[] = [];
  const seen = new Set<string>();
  const namespaceIndexes = new Map<string, number>();
  for (const source of sources) {
    for (const tool of source) {
      const toolRecord = toRecord(tool);
      if (toolRecord.type === "namespace") {
        const namespaceName = toolName(tool);
        const existingIndex = namespaceName ? namespaceIndexes.get(namespaceName) : undefined;
        const namespaceTools = Array.isArray(toolRecord.tools)
          ? toolRecord.tools.filter((member) => !explicitNames.has(toolName(member)))
          : toolRecord.tools;
        if (existingIndex !== undefined) {
          const existing = toRecord(merged[existingIndex]);
          merged[existingIndex] = {
            ...toolRecord,
            ...existing,
            tools: mergeNamespaceTools(existing.tools, namespaceTools),
          };
          continue;
        }
        if (namespaceName) namespaceIndexes.set(namespaceName, merged.length);
        merged.push({ ...toolRecord, tools: namespaceTools });
        continue;
      }

      const identity = toolIdentity(tool);
      if (identity && seen.has(identity)) continue;
      if (identity) seen.add(identity);
      merged.push(tool);
    }
  }

  return merged;
}

/** Return the custom/freeform tool names after applying the same precedence rules as conversion. */
export function collectResponsesCustomToolNames(
  rootTools: unknown,
  inputItems: unknown[]
): Set<string> {
  const names = new Set<string>();
  const visit = (tools: unknown[]) => {
    for (const toolValue of tools) {
      const tool = toRecord(toolValue);
      const name = toolName(toolValue);
      if (tool.type === "custom" && name) names.add(name);
      if (tool.type === "namespace" && Array.isArray(tool.tools)) visit(tool.tools);
    }
  };
  visit(collectResponsesTools(rootTools, inputItems));
  return names;
}

export function collectCustomToolNamesForSourceFormat(
  sourceFormat: string,
  responsesFormat: string,
  rootTools: unknown,
  inputItems: unknown[]
): Set<string> {
  return sourceFormat === responsesFormat
    ? collectResponsesCustomToolNames(rootTools, inputItems)
    : new Set<string>();
}
