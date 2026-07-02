/**
 * chatCore Claude upstream-message transforms (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore. `extractSystemMessagesToBody` lifts system/developer role messages
 * into the top-level `system` parameter (Anthropic rejects those roles inside messages[]).
 * `normalizeClaudeUpstreamMessages` prepares a native Claude Messages payload: lifts system roles,
 * drops empty text blocks, inlines unsupported file/document parts as text, collapses tool_result
 * blocks to text (unless preserved), drops unsupported parts, and moves stray tool_result blocks out
 * of assistant messages (#2815). Both mutate the payload in place; behaviour is byte-identical to the
 * previous inline closures (normalize captured only `log`).
 */

import type { ClaudeContentBlock, ClaudeMessage } from "./claudeMessageTypes.ts";
import { extractSystemRoleMessages } from "./claudeSystemRole.ts";
import { splitMisplacedToolResults } from "../../translator/helpers/claudeHelper.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;

export function extractSystemMessagesToBody(payload: Record<string, unknown>) {
  if (!Array.isArray(payload.messages)) return;
  const messages = payload.messages as ClaudeMessage[];
  const systemMessages = messages.filter((m) => {
    const role = String(m.role || "").toLowerCase();
    return role === "system" || role === "developer";
  });
  if (systemMessages.length === 0) return;
  const extraBlocks: ClaudeContentBlock[] = [];
  for (const sm of systemMessages) {
    if (typeof sm.content === "string" && sm.content.length > 0) {
      extraBlocks.push({ type: "text", text: sm.content });
    } else if (Array.isArray(sm.content)) {
      for (const block of sm.content as ClaudeContentBlock[]) {
        if (block?.type === "text" && typeof block.text === "string" && block.text.length > 0) {
          extraBlocks.push(block);
        }
      }
    }
  }
  if (extraBlocks.length > 0) {
    const existingSystem = payload.system;
    if (typeof existingSystem === "string" && existingSystem.length > 0) {
      payload.system = [{ type: "text", text: existingSystem }, ...extraBlocks];
    } else if (Array.isArray(existingSystem)) {
      payload.system = [...(existingSystem as ClaudeContentBlock[]), ...extraBlocks];
    } else {
      payload.system = extraBlocks;
    }
  }
  payload.messages = messages.filter((m) => {
    const role = String(m.role || "").toLowerCase();
    return role !== "system" && role !== "developer";
  });
}

export function normalizeClaudeUpstreamMessages(
  payload: Record<string, unknown>,
  options?: { preserveToolResultBlocks?: boolean },
  log?: LoggerLike
) {
  const preserveToolResultBlocks = options?.preserveToolResultBlocks === true;
  if (!Array.isArray(payload.messages)) return;
  let messages = payload.messages as ClaudeMessage[];

  // Extract system/developer role messages into top-level system parameter.
  extractSystemRoleMessages(payload);
  messages = payload.messages as ClaudeMessage[];

  // Anthropic rejects empty text blocks in native Messages payloads.
  for (const msg of messages) {
    if (Array.isArray(msg.content)) {
      msg.content = msg.content.filter(
        (block: ClaudeContentBlock) =>
          block.type !== "text" || (typeof block.text === "string" && block.text.length > 0)
      );
    }
  }

  // Normalize unsupported content types without reintroducing the Claude -> OpenAI round-trip.
  for (const msg of messages) {
    if (msg.role !== "user" || !Array.isArray(msg.content)) continue;
    msg.content = (msg.content as ClaudeContentBlock[]).flatMap((block: ClaudeContentBlock) => {
      if (
        block.type === "text" ||
        block.type === "image_url" ||
        block.type === "image" ||
        block.type === "file_url" ||
        block.type === "file" ||
        block.type === "document"
      ) {
        const fileData = (block.file_url ?? block.file ?? block.document) as
          | Record<string, unknown>
          | undefined;
        if (
          (block.type === "file" || block.type === "document") &&
          !fileData?.url &&
          !fileData?.data
        ) {
          const fileContent =
            (block.file as ClaudeContentBlock)?.content ??
            (block.file as ClaudeContentBlock)?.text ??
            block.content ??
            block.text;
          const fileName =
            (block.file as Record<string, unknown>)?.name ?? block.name ?? "attachment";
          if (typeof fileContent === "string" && fileContent.length > 0) {
            return [{ type: "text", text: `[${fileName}]\n${fileContent}` }];
          }
        }
        return [block];
      }

      if (block.type === "tool_result") {
        if (preserveToolResultBlocks) {
          return [block];
        }
        const toolId = block.tool_use_id ?? block.id ?? "unknown";
        const resultContent = block.content ?? block.text ?? block.output ?? "";
        const resultText =
          typeof resultContent === "string"
            ? resultContent
            : Array.isArray(resultContent)
              ? resultContent
                  .filter((c: Record<string, unknown>) => c.type === "text")
                  .map((c: Record<string, unknown>) => c.text)
                  .join("\n")
              : JSON.stringify(resultContent);
        if (resultText.length > 0) {
          return [{ type: "text", text: `[Tool Result: ${toolId}]\n${resultText}` }];
        }
        return [];
      }

      log?.debug?.("CONTENT", `Dropped unsupported content part type="${block.type}"`);
      return [];
    });
  }

  // #2815: move stray tool_result blocks out of assistant messages.
  payload.messages = splitMisplacedToolResults(
    payload.messages as ClaudeMessage[]
  ) as unknown as Record<string, unknown>[];
}
