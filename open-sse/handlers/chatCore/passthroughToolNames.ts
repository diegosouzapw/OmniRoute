import { CLAUDE_OAUTH_TOOL_PREFIX } from "../../translator/request/openai-to-claude.ts";
import { restoreOpenAIToolNames } from "../../translator/helpers/toolCallHelper.ts";

type JsonRecord = Record<string, unknown>;

export function buildClaudePassthroughToolNameMap(
  body: Record<string, unknown> | null | undefined
) {
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
  transformedBody: unknown
) {
  const transformedRecord =
    transformedBody && typeof transformedBody === "object" && !Array.isArray(transformedBody)
      ? (transformedBody as JsonRecord)
      : null;
  const executorToolNameMap =
    transformedRecord?._toolNameMap instanceof Map
      ? (transformedRecord._toolNameMap as Map<string, string>)
      : null;

  if (!executorToolNameMap?.size) return baseToolNameMap;
  if (!baseToolNameMap?.size) return executorToolNameMap;

  const merged = new Map(baseToolNameMap);
  for (const [toolName, originalName] of executorToolNameMap.entries()) {
    merged.set(toolName, originalName);
  }
  return merged;
}

export function restoreNonStreamingToolNames(
  responseBody: JsonRecord,
  baseToolNameMap: Map<string, string> | null,
  transformedBody: unknown,
  restoreClaudeNames: boolean
): [JsonRecord, Map<string, string> | null] {
  const responseToolNameMap = mergeResponseToolNameMap(baseToolNameMap, transformedBody);
  const restoredBody = restoreClaudeNames
    ? restoreClaudePassthroughToolNames(responseBody, responseToolNameMap)
    : responseBody;
  restoreOpenAIToolNames(restoredBody, responseToolNameMap);
  return [restoredBody, responseToolNameMap];
}

export function normalizeOpenAIToolFinishReasons(responseBody: unknown): void {
  const response = responseBody as {
    choices?: Array<JsonRecord & { message?: { tool_calls?: unknown[] } }>;
  } | null;
  if (!response?.choices) return;

  for (const choice of response.choices) {
    if (choice.message?.tool_calls?.length > 0 && choice.finish_reason !== "tool_calls") {
      choice.finish_reason = "tool_calls";
    }
  }
}
