/**
 * Pure helper for extracting simplified turns (user prompt, assistant reply, tool names)
 * from coding-agent requests and responses for session message logging.
 */

type JsonRecord = Record<string, unknown>;

export const MAX_TURN_TEXT_CHARS = 4_000;

function cleanTurnText(text: string): string {
  // Strip control characters except newline and tab
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

/**
 * Remove `<system-reminder>...</system-reminder>` blocks injected into prompts.
 */
function stripSystemReminders(text: string): string {
  return text.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/gi, "").trim();
}

/**
 * Extract user prompt text from Anthropic Messages or OpenAI Chat request body.
 */
export function extractUserTurnText(body: unknown): { text: string | null; truncated: boolean } {
  if (!body || typeof body !== "object") return { text: null, truncated: false };
  const b = body as JsonRecord;
  const messages = Array.isArray(b.messages) ? b.messages : [];
  if (messages.length === 0) return { text: null, truncated: false };

  // Find the last user message
  let lastUserContent: unknown = null;
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg && typeof msg === "object" && (msg as JsonRecord).role === "user") {
      lastUserContent = (msg as JsonRecord).content;
      break;
    }
  }

  if (!lastUserContent) return { text: null, truncated: false };

  let rawText = "";

  if (typeof lastUserContent === "string") {
    rawText = lastUserContent;
  } else if (Array.isArray(lastUserContent)) {
    // Array of content blocks: take text blocks only, skip tool_result, images, etc.
    const textParts: string[] = [];
    for (const block of lastUserContent) {
      if (block && typeof block === "object") {
        const blk = block as JsonRecord;
        if (blk.type === "tool_result") continue;
        if (blk.type === "text" && typeof blk.text === "string") {
          textParts.push(blk.text);
        } else if (blk.type === "input_text" && typeof blk.text === "string") {
          textParts.push(blk.text);
        } else if (!blk.type && typeof blk.text === "string") {
          textParts.push(blk.text);
        }
      }
    }
    rawText = textParts.join("\n\n");
  }

  const cleaned = cleanTurnText(stripSystemReminders(rawText));
  if (!cleaned) return { text: null, truncated: false };

  if (cleaned.length > MAX_TURN_TEXT_CHARS) {
    return { text: cleaned.slice(0, MAX_TURN_TEXT_CHARS), truncated: true };
  }

  return { text: cleaned, truncated: false };
}

/**
 * Extract assistant response text and tool call names from response body.
 */
export function extractAssistantTurnText(responseBody: unknown): {
  text: string | null;
  toolNames: string[];
  truncated: boolean;
} {
  if (!responseBody || typeof responseBody !== "object") {
    return { text: null, toolNames: [], truncated: false };
  }
  const r = responseBody as JsonRecord;
  const toolNames: string[] = [];
  const textParts: string[] = [];

  // Shape 1: Anthropic Messages (content: [{ type: "text", text: "..." }, { type: "tool_use", name: "..." }])
  if (Array.isArray(r.content)) {
    for (const block of r.content) {
      if (block && typeof block === "object") {
        const blk = block as JsonRecord;
        if (blk.type === "text" && typeof blk.text === "string") {
          textParts.push(blk.text);
        } else if (blk.type === "tool_use" && typeof blk.name === "string" && blk.name.trim()) {
          toolNames.push(blk.name.trim());
        }
      }
    }
  }

  // Shape 2: OpenAI Chat Completions (choices: [{ message: { content, tool_calls } }])
  if (Array.isArray(r.choices) && r.choices.length > 0) {
    const choice = r.choices[0];
    if (choice && typeof choice === "object") {
      const msg = (choice as JsonRecord).message as JsonRecord | undefined;
      if (msg) {
        if (typeof msg.content === "string") {
          textParts.push(msg.content);
        }
        if (Array.isArray(msg.tool_calls)) {
          for (const tc of msg.tool_calls) {
            if (tc && typeof tc === "object") {
              const fn = (tc as JsonRecord).function as JsonRecord | undefined;
              if (typeof fn?.name === "string" && fn.name.trim()) {
                toolNames.push(fn.name.trim());
              }
            }
          }
        }
      }
    }
  }

  const rawText = textParts.join("\n\n");
  const cleaned = cleanTurnText(rawText);
  const uniqueTools = [...new Set(toolNames)].slice(0, 20);

  if (!cleaned) {
    return { text: null, toolNames: uniqueTools, truncated: false };
  }

  if (cleaned.length > MAX_TURN_TEXT_CHARS) {
    return { text: cleaned.slice(0, MAX_TURN_TEXT_CHARS), toolNames: uniqueTools, truncated: true };
  }

  return { text: cleaned, toolNames: uniqueTools, truncated: false };
}

export interface ExtractedAgentSessionTurn {
  userText: string | null;
  assistantText: string | null;
  toolNames: string[];
  truncated: boolean;
}

export function extractAgentSessionTurn(
  requestBody: unknown,
  responseBody: unknown
): ExtractedAgentSessionTurn | null {
  const user = extractUserTurnText(requestBody);
  const assistant = extractAssistantTurnText(responseBody);

  const hasContent = Boolean(user.text || assistant.text || assistant.toolNames.length > 0);
  if (!hasContent) return null;

  return {
    userText: user.text,
    assistantText: assistant.text,
    toolNames: assistant.toolNames,
    truncated: user.truncated || assistant.truncated,
  };
}

import { hasAgentIdentity, type AgentContext } from "./agentContext.ts";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

export function resolveSessionTurn(
  requestBody: unknown,
  responseBody: unknown,
  agentContext: AgentContext | null | undefined,
  apiKeyInfo: { noLog?: boolean | string } | null | undefined
): ExtractedAgentSessionTurn | null {
  if (!hasAgentIdentity(agentContext)) return null;
  if (apiKeyInfo?.noLog === true || apiKeyInfo?.noLog === "true") return null;
  if (!isFeatureFlagEnabled("AGENT_SESSION_MESSAGES_ENABLED")) return null;
  try {
    return extractAgentSessionTurn(requestBody, responseBody);
  } catch {
    return null;
  }
}
