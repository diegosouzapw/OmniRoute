type JsonRecord = Record<string, unknown>;

const COMBO_TEST_MAX_TOKENS = 2048;
const STREAMING_MODEL_TEST_MAX_TOKENS = 64;
const COMBO_TEST_OPERAND_MIN = 10000;
const COMBO_TEST_OPERAND_RANGE = 90000;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function joinNonEmpty(parts: string[]) {
  return parts.filter(Boolean).join("\n").trim();
}

function extractTextFromContent(content: unknown): string {
  if (typeof content === "string") return content.trim();

  if (!Array.isArray(content)) return "";

  return content
    .map((part) => {
      if (typeof part === "string") return part.trim();

      const block = asRecord(part);
      const blockType = typeof block.type === "string" ? block.type : "";
      const blockText = typeof block.text === "string" ? block.text.trim() : "";

      if (blockText && (blockType === "" || blockType === "text" || blockType === "output_text")) {
        return blockText;
      }

      return "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
}

function extractReasoningText(record: JsonRecord): string {
  const reasoningDetails = Array.isArray(record.reasoning_details) ? record.reasoning_details : [];
  const detailText = reasoningDetails
    .map((detail) => {
      const detailRecord = asRecord(detail);
      const detailType = typeof detailRecord.type === "string" ? detailRecord.type : "";
      const text =
        typeof detailRecord.text === "string"
          ? detailRecord.text.trim()
          : typeof detailRecord.content === "string"
            ? detailRecord.content.trim()
            : "";

      if (
        text &&
        (detailType === "" ||
          detailType === "reasoning" ||
          detailType === "reasoning.text" ||
          detailType === "thinking")
      ) {
        return text;
      }

      return "";
    })
    .filter(Boolean);

  return joinNonEmpty([
    typeof record.reasoning_content === "string" ? record.reasoning_content.trim() : "",
    typeof record.reasoning === "string" ? record.reasoning.trim() : "",
    typeof record.reasoning_text === "string" ? record.reasoning_text.trim() : "",
    joinNonEmpty(detailText),
  ]);
}

function getUsageReasoningTokens(body: JsonRecord): number {
  const usage = asRecord(body.usage);
  if (!usage) return 0;

  const completionDetails = asRecord(usage.completion_tokens_details);
  const topLevelReasoning =
    typeof usage.reasoning_tokens === "number" && Number.isFinite(usage.reasoning_tokens)
      ? usage.reasoning_tokens
      : 0;
  const detailedReasoning =
    typeof completionDetails.reasoning_tokens === "number" &&
    Number.isFinite(completionDetails.reasoning_tokens)
      ? completionDetails.reasoning_tokens
      : 0;

  return Math.max(topLevelReasoning, detailedReasoning);
}

function hasReasoningOnlyCompletion(body: JsonRecord): boolean {
  if (!Array.isArray(body.choices) || body.choices.length === 0) return false;
  if (getUsageReasoningTokens(body) <= 0) return false;

  return body.choices.some((choice) => {
    const choiceRecord = asRecord(choice);
    const message = asRecord(choiceRecord.message);
    const finishReason =
      typeof choiceRecord.finish_reason === "string" ? choiceRecord.finish_reason : "";

    if (!message || message.role !== "assistant") return false;
    if (!finishReason) return false;
    if (extractTextFromContent(message.content)) return false;
    if (extractReasoningText(message)) return false;
    return true;
  });
}

function getRandomFiveDigitNumber() {
  return COMBO_TEST_OPERAND_MIN + Math.floor(Math.random() * COMBO_TEST_OPERAND_RANGE);
}

function buildComboTestPrompt() {
  const left = getRandomFiveDigitNumber();
  const right = getRandomFiveDigitNumber();

  return `Calculate ${left}+${right}, and reply with the result only.`;
}

export function buildComboTestRequestBody(
  modelStr: string,
  isEmbedding: boolean = false,
  options: { stream?: boolean; maxTokens?: number } = {}
) {
  if (isEmbedding) {
    return {
      model: modelStr,
      input: "Hello World",
    };
  }

  return {
    model: modelStr,
    // Randomize the arithmetic prompt so upstream providers are less likely to
    // satisfy the smoke test with cached completions.
    messages: [{ role: "user", content: buildComboTestPrompt() }],
    // Give reasoning-heavy models enough headroom to finish the request and
    // still emit a visible answer without immediate truncation.
    max_tokens:
      options.maxTokens ??
      (options.stream ? STREAMING_MODEL_TEST_MAX_TOKENS : COMBO_TEST_MAX_TOKENS),
    stream: options.stream ?? false,
  };
}

export type ComboTestStreamResult = {
  text: string;
  error?: { message: string; statusCode?: number };
};

function extractStreamError(body: JsonRecord): ComboTestStreamResult["error"] {
  const error = asRecord(body.error);
  const message =
    typeof error.message === "string"
      ? error.message.trim()
      : typeof body.message === "string"
        ? body.message.trim()
        : "";
  if (!message) return undefined;

  const status = error.status ?? error.statusCode ?? error.code ?? body.status ?? body.statusCode;
  const statusCode =
    typeof status === "number"
      ? status
      : typeof status === "string" && /^\d+$/.test(status)
        ? Number(status)
        : undefined;
  return {
    message,
    ...(Number.isInteger(statusCode) ? { statusCode } : {}),
  };
}

function extractStreamPayload(payload: string): ComboTestStreamResult | undefined {
  try {
    const body = JSON.parse(payload);
    const error = extractStreamError(asRecord(body));
    if (error) return { text: "", error };

    const collected: string[] = [];
    const direct = extractComboTestResponseText(body);
    if (direct) collected.push(direct);
    for (const choice of Array.isArray(body?.choices) ? body.choices : []) {
      const delta = asRecord(choice?.delta);
      const content = extractTextFromContent(delta.content);
      const reasoning = extractReasoningText(delta);
      if (content) collected.push(content);
      else if (reasoning) collected.push(reasoning);
    }
    return { text: collected.join("") };
  } catch {
    // Ignore malformed/non-JSON SSE events; a later valid event can still
    // prove that the model is healthy.
    return undefined;
  }
}

export function extractComboTestStreamResult(streamBody: string): ComboTestStreamResult {
  const collected: string[] = [];
  let streamError: ComboTestStreamResult["error"];
  for (const line of streamBody.split(/\r?\n/)) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    const result = extractStreamPayload(payload);
    if (!result) continue;
    if (result.error) streamError = result.error;
    else if (result.text) collected.push(result.text);
  }
  return { text: collected.join("").trim(), ...(streamError ? { error: streamError } : {}) };
}

export function extractComboTestStreamText(streamBody: string): string {
  return extractComboTestStreamResult(streamBody).text;
}

export function extractComboTestResponseText(responseBody: unknown): string {
  const body = asRecord(responseBody);

  if (typeof body.output_text === "string" && body.output_text.trim()) {
    return body.output_text.trim();
  }

  if (Array.isArray(body.data) && body.data[0]?.embedding) {
    return "[Embedding generated successfully]";
  }

  if (Array.isArray(body.choices)) {
    for (const choice of body.choices) {
      const choiceRecord = asRecord(choice);
      const message = asRecord(choiceRecord.message);
      const messageText = extractTextFromContent(message.content);
      if (messageText) return messageText;

      const reasoningText = extractReasoningText(message);
      if (reasoningText) return reasoningText;

      if (typeof choiceRecord.text === "string" && choiceRecord.text.trim()) {
        return choiceRecord.text.trim();
      }
    }
  }

  if (Array.isArray(body.output)) {
    for (const item of body.output) {
      const itemRecord = asRecord(item);
      const contentText = extractTextFromContent(itemRecord.content);
      if (contentText) return contentText;

      const reasoningText = extractReasoningText(itemRecord);
      if (reasoningText) return reasoningText;
    }
  }

  const topLevelText = extractTextFromContent(body.content);
  if (topLevelText) return topLevelText;

  const topLevelReasoning = extractReasoningText(body);
  if (topLevelReasoning) return topLevelReasoning;

  if (hasReasoningOnlyCompletion(body)) {
    return "[reasoning-only completion]";
  }

  return "";
}
