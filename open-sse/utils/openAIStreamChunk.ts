import { restoreOpenAIToolNames } from "../translator/helpers/toolCallHelper.ts";

type JsonRecord = Record<string, unknown>;

export function normalizeFinalOpenAIStreamChunk(
  parsed: JsonRecord,
  toolNameMap: unknown
): { changed: boolean; hasFinishReason: boolean } {
  let changed = false;
  if (parsed.id != null && typeof parsed.id !== "string") {
    parsed.id = String(parsed.id);
    changed = true;
  }

  if (Array.isArray(parsed.choices)) {
    for (const choice of parsed.choices as JsonRecord[]) {
      const delta = (choice as JsonRecord | null | undefined)?.delta as JsonRecord | undefined;
      if (!Array.isArray(delta?.tool_calls)) continue;
      for (const toolCall of delta.tool_calls as JsonRecord[]) {
        if (toolCall?.id != null && typeof toolCall.id !== "string") {
          toolCall.id = String(toolCall.id);
          changed = true;
        }
      }
    }
  }

  changed = restoreOpenAIToolNames(parsed, toolNameMap) || changed;
  const firstChoice = Array.isArray(parsed.choices)
    ? (parsed.choices[0] as JsonRecord | undefined)
    : undefined;
  return { changed, hasFinishReason: Boolean(firstChoice?.finish_reason) };
}
