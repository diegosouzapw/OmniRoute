type Message = { role?: unknown; content?: unknown; [key: string]: unknown };

/** Placeholder text prepended to an image-only user turn bound for Poe. */
export const POE_IMAGE_ONLY_TEXT_PLACEHOLDER = "[Image(s) attached]";

function isImagePart(part: unknown): boolean {
  if (!part || typeof part !== "object") return false;
  const type = (part as { type?: unknown }).type;
  return type === "image_url" || type === "input_image" || type === "image";
}

function isTextPart(part: unknown): boolean {
  return Boolean(part) && typeof part === "object" && (part as { type?: unknown }).type === "text";
}

/**
 * Poe's OpenAI-compatible API (api.poe.com/v1/chat/completions) rejects a `user`
 * message whose `content` array holds only image parts with a generic
 * `400 invalid request error`. The same image is accepted as soon as the message
 * also carries a text part.
 *
 * This shape is produced routinely:
 *  - Claude-format clients (Claude Code `Read` on a PNG/JPG) send an image-only
 *    `tool_result`; `claudeToOpenAIRequest` lifts the image into a follow-up
 *    `{ role: "user", content: [image_url] }` because OpenAI `tool` messages cannot
 *    carry images.
 *  - OpenAI-format clients can send the same image-only user turn directly
 *    (same-format passthrough, where no format translator runs).
 *
 * For provider `poe` only, prepend a short text part to every image-only user
 * message. All other providers are untouched, and the input array is returned by
 * reference when nothing needs changing (prompt-cache prefix stability).
 */
export function ensurePoeUserTurnHasText(
  messages: Message[],
  provider: string | null | undefined
): Message[] {
  if (String(provider ?? "") !== "poe") return messages;
  if (!Array.isArray(messages) || messages.length === 0) return messages;

  let changed = false;
  const next = messages.map((msg) => {
    if (!msg || msg.role !== "user" || !Array.isArray(msg.content)) return msg;
    const parts = msg.content as unknown[];
    if (parts.length === 0 || parts.some(isTextPart) || !parts.some(isImagePart)) return msg;
    changed = true;
    return {
      ...msg,
      content: [{ type: "text", text: POE_IMAGE_ONLY_TEXT_PLACEHOLDER }, ...parts],
    };
  });
  return changed ? next : messages;
}
