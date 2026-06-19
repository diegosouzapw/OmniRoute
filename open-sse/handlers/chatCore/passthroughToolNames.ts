import { CLAUDE_OAUTH_TOOL_PREFIX } from "../../translator/request/openai-to-claude.ts";

export function buildClaudePassthroughToolNameMap(body: Record<string, unknown> | null | undefined) {
  if (!body || !Array.isArray(body.tools)) return null;

  const toolNameMap = new Map<string, string>();
  for (const tool of body.tools) {
    const toolRecord = tool as Record<string, unknown>;
    const toolData =
      toolRecord?.type === "function" &&
      toolRecord.function &&
      typeof toolRecord.function === "object"
        ? (toolRecord.function as Record<string, unknown>)
        : toolRecord;
    const originalName = typeof toolData?.name === "string" ? toolData.name.trim() : "";
    if (!originalName) continue;
    toolNameMap.set(`${CLAUDE_OAUTH_TOOL_PREFIX}${originalName}`, originalName);
  }

  return toolNameMap.size > 0 ? toolNameMap : null;
}

export function restoreClaudePassthroughToolNames(
  responseBody: Record<string, unknown>,
  toolNameMap: Map<string, string> | null
) {
  if (!toolNameMap || !Array.isArray(responseBody?.content)) return responseBody;

  let changed = false;
  const content = responseBody.content.map((block: Record<string, unknown>) => {
    if (block?.type !== "tool_use" || typeof block?.name !== "string") return block;
    const restoredName = toolNameMap.get(block.name) ?? block.name;
    if (restoredName === block.name) return block;
    changed = true;
    return {
      ...block,
      name: restoredName,
    };
  });

  if (!changed) return responseBody;
  return {
    ...responseBody,
    content,
  };
}

export function mergeResponseToolNameMap(
  baseToolNameMap: Map<string, string> | null,
  transformedBody: Record<string, unknown> | null | undefined
) {
  const executorToolNameMap =
    transformedBody && transformedBody._toolNameMap instanceof Map
      ? (transformedBody._toolNameMap as Map<string, string>)
      : null;

  if (!executorToolNameMap?.size) return baseToolNameMap;
  if (!baseToolNameMap?.size) return executorToolNameMap;

  const merged = new Map(baseToolNameMap);
  for (const [toolName, originalName] of executorToolNameMap.entries()) {
    merged.set(toolName, originalName);
  }
  return merged;
}
