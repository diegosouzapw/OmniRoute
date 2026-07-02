type JsonRecord = Record<string, unknown>;

export function isQwenThinkingActive(body: JsonRecord): boolean {
  const thinking = body.thinking;

  if (thinking === true || body.enable_thinking === true) {
    return true;
  }

  return (
    typeof thinking === "object" &&
    thinking !== null &&
    !Array.isArray(thinking) &&
    (thinking as JsonRecord).type === "enabled"
  );
}

export function isQwenThinkingToolChoiceIncompatible(toolChoice: unknown): boolean {
  return toolChoice === "required" || (typeof toolChoice === "object" && toolChoice !== null);
}

export function sanitizeQwenThinkingToolChoice(
  body: JsonRecord,
  providerLabel = "Qwen"
): JsonRecord {
  if (!isQwenThinkingActive(body)) {
    return body;
  }

  const toolChoice = body.tool_choice;
  if (!isQwenThinkingToolChoiceIncompatible(toolChoice)) {
    return body;
  }

  const toolChoiceLabel = typeof toolChoice === "string" ? toolChoice : "object";
  console.warn(
    `[${providerLabel}] Neutralizing incompatible tool_choice ${toolChoiceLabel} to "auto" (thinking mode active)`
  );

  return {
    ...body,
    tool_choice: "auto",
  };
}
