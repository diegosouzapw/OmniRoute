/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import { CHATGPT_WEB_PLATFORM_RESERVE_TOKENS } from "../../chatgpt-web-models";
import { estimateTokens } from "../../lib/token-estimate";
import {
  formatChatGptWebMultipartCommit,
  formatChatGptWebMultipartStage,
  type CompiledChatGptWebPrompt,
} from "./prompt";

// ChatGPT's product system prompt and the fixed Codex Native MCP schemas are not present in the
// visible composer text. Reserve them explicitly; over-counting fails safe by compacting earlier.
const CHATGPT_IMAGE_RESERVE_TOKENS = 4_096;
const CHATGPT_ORIGINAL_IMAGE_RESERVE_TOKENS = 8_192;

/**
 * The Free/Luna product accepted measured browser inputs at 25,400 and 28,547 estimated tokens,
 * but rejected the same shape at 32,283 before producing a response. This is a ChatGPT browser
 * transport boundary, not Luna's model context window, and applies to normal and checkpoint turns.
 */
export const CHATGPT_LUNA_BROWSER_INPUT_TOKEN_BUDGET = 28_000;

const TOKEN_ESTIMATE_TRANSACTION = `ctx_${"0".repeat(32)}`;

export function compiledChatGptWebMessages(compiled: CompiledChatGptWebPrompt): string[] {
  if (!compiled.multipart) return [compiled.text];
  return [
    ...compiled.multipart.parts
      .slice(0, -1)
      .map(
        (payload, index) =>
          formatChatGptWebMultipartStage(
            payload,
            TOKEN_ESTIMATE_TRANSACTION,
            index + 1,
            compiled.multipart!.parts.length
          ).text
      ),
    formatChatGptWebMultipartCommit(compiled.multipart, TOKEN_ESTIMATE_TRANSACTION),
  ];
}

export function compiledChatGptWebMaxMessageChars(compiled: CompiledChatGptWebPrompt): number {
  return Math.max(...compiledChatGptWebMessages(compiled).map((message) => message.length));
}

/** Tokens present in the one visible browser message, excluding hidden product/tool reserves. */
export function estimateCompiledChatGptWebMessageTokens(
  compiled: CompiledChatGptWebPrompt,
  modelId: string
): number {
  return Math.max(
    ...compiledChatGptWebMessages(compiled).map((message) => estimateTokens(message, modelId))
  );
}

export function estimateCompiledChatGptWebInputTokens(
  compiled: CompiledChatGptWebPrompt,
  modelId: string
): number {
  const imageTokens = compiled.images.reduce(
    (total, image) =>
      total +
      (image.detail === "original"
        ? CHATGPT_ORIGINAL_IMAGE_RESERVE_TOKENS
        : CHATGPT_IMAGE_RESERVE_TOKENS),
    0
  );
  const messageTokens = compiledChatGptWebMessages(compiled).reduce(
    (total, message) => total + estimateTokens(message, modelId),
    0
  );
  const acknowledgementTokens = compiled.multipart
    ? compiled.multipart.parts
        .slice(0, -1)
        .reduce(
          (total, payload, index) =>
            total +
            estimateTokens(
              formatChatGptWebMultipartStage(
                payload,
                TOKEN_ESTIMATE_TRANSACTION,
                index + 1,
                compiled.multipart!.parts.length
              ).acknowledgement,
              modelId
            ),
          0
        )
    : 0;
  return CHATGPT_WEB_PLATFORM_RESERVE_TOKENS + messageTokens + acknowledgementTokens + imageTokens;
}
