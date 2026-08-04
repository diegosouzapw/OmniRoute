/**
 * PromptQL executor — OpenAI chat-message content/text extraction helpers.
 *
 * Shared by the executor (last-user-text, thread fingerprinting) and by
 * threadSticky.ts (conversation fingerprints).
 */

export interface ChatMessage {
  role: string;
  content: unknown;
  /** OpenAI tool-call shape — content is often null when these are present. */
  tool_calls?: unknown;
  function_call?: unknown;
  name?: string;
}

export function extractMessageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (content == null) return "";
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (part && typeof part === "object") {
          const p = part as Record<string, unknown>;
          if (typeof p.text === "string") return p.text;
          if (typeof p.content === "string") return p.content;
          // OpenAI content-part tool_use / function call shapes
          if (typeof p.name === "string") {
            const args = p.arguments ?? p.input ?? p.args;
            return `${p.name}:${typeof args === "string" ? args : JSON.stringify(args ?? {})}`;
          }
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  if (content && typeof content === "object" && typeof (content as { text?: string }).text === "string") {
    return (content as { text: string }).text;
  }
  return "";
}

/** Serialize OpenAI tool_calls / function_call into stable fingerprint text. */
export function extractToolCallsText(message: ChatMessage | null | undefined): string {
  if (!message) return "";
  const parts: string[] = [];
  const tcs = message.tool_calls;
  if (Array.isArray(tcs)) {
    for (const tc of tcs) {
      if (!tc || typeof tc !== "object") continue;
      const rec = tc as Record<string, unknown>;
      const fn = rec.function;
      if (fn && typeof fn === "object") {
        const f = fn as Record<string, unknown>;
        const name = typeof f.name === "string" ? f.name : "";
        const args = typeof f.arguments === "string" ? f.arguments : JSON.stringify(f.arguments ?? {});
        if (name) parts.push(`tool_call:${name}:${args}`);
      } else if (typeof rec.name === "string") {
        parts.push(`tool_call:${rec.name}:${JSON.stringify(rec.arguments ?? rec.input ?? {})}`);
      }
    }
  }
  const fc = message.function_call;
  if (fc && typeof fc === "object") {
    const f = fc as Record<string, unknown>;
    const name = typeof f.name === "string" ? f.name : "";
    const args = typeof f.arguments === "string" ? f.arguments : JSON.stringify(f.arguments ?? {});
    if (name) parts.push(`function_call:${name}:${args}`);
  }
  return parts.join("\n");
}

/**
 * Full message text for fingerprints — includes tool_calls / function_call when
 * content is null (OpenAI agent clients often re-send assistants that way).
 */
export function extractMessageTextFromMessage(message: ChatMessage | null | undefined): string {
  if (!message) return "";
  const fromContent = extractMessageText(message.content);
  const fromTools = extractToolCallsText(message);
  if (fromContent && fromTools) return `${fromContent}\n${fromTools}`;
  return fromContent || fromTools;
}

/** User / human / tool / function — any role that ends an OpenAI "turn" for sticky. */
export function isUserLikeRole(role: string): boolean {
  const r = (role || "").toLowerCase();
  return r === "user" || r === "human" || r === "tool" || r === "function";
}
