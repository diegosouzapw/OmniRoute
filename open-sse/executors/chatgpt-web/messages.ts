import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "../base.ts";
import { OMNIROUTE_VERSION } from "@/shared/constants/version.ts";
import { getProxyForAccount } from "../../utils/proxyFallback.ts";
import { HttpsProxyAgent } from "https-proxy-agent";
import crypto from "node:crypto";
import { createHash } from "node:crypto";
import { saveCallLog } from "@/lib/usage/callLogArtifacts.ts";
import { streamWithTimeout } from "../../utils/stream.ts";
import { ANTIGRAVITY_CONFIG } from "../../config/errorConfig.ts";
import {
  storeChatGptImage,
  getChatGptImageConversationContext,
  __resetChatGptImageCacheForTesting,
  type ChatGptImageConversationContext,
} from "../../services/chatgptImageCache.ts";

// ─── OpenAI → ChatGPT message translation ───────────────────────────────────

export interface ParsedMessages {
  systemMsg: string;
  history: Array<{ role: string; content: string }>;
  currentMsg: string;
  latestImageContext: ChatGptImageConversationContext | null;
}

/**
 * Strip embedded `data:image/...` URIs out of message content so prior
 * generated images don't get fed back into chatgpt.com on the next turn.
 *
 * Why: when image generation succeeds we emit `![image](data:image/png;base64,...)`
 * — frequently 2–4 MB. Chat clients (Open WebUI, OpenAI-style apps) replay
 * the full conversation history on the next request, so without this strip
 * we'd send megabytes of base64 back upstream. chatgpt.com responds with an
 * empty body when that happens (verified: 502 "ChatGPT returned empty
 * response body" on the very next turn after an image gen succeeds), and
 * even if it didn't, a single inlined image is well past the model's context
 * limit. Replacing with a short placeholder keeps semantic continuity
 * without the bytes.
 */
export const DATA_URI_IMAGE_RE = /!\[([^\]]*)\]\(data:image\/[^)]+\)/g;

export const CACHED_IMAGE_URL_RE = /\/v1\/chatgpt-web\/image\/([a-f0-9]{16,64})(?=[)\s"'<>]|$)/gi;

export function stripInlinedImages(content: string): string {
  return content.replace(DATA_URI_IMAGE_RE, (_, alt) =>
    alt ? `[${alt}: generated image]` : "[generated image]"
  );
}

export function findCachedImageContext(content: string): ChatGptImageConversationContext | null {
  let latest: ChatGptImageConversationContext | null = null;
  // String.prototype.matchAll consumes a fresh iterator and ignores the
  // regex's lastIndex, so no manual reset is required.
  for (const match of content.matchAll(CACHED_IMAGE_URL_RE)) {
    const id = match[1];
    const context = getChatGptImageConversationContext(id);
    if (context) latest = context;
  }
  return latest;
}

export function parseOpenAIMessages(messages: Array<Record<string, unknown>>): ParsedMessages {
  let systemMsg = "";
  const history: Array<{ role: string; content: string }> = [];
  let latestImageContext: ChatGptImageConversationContext | null = null;

  for (const msg of messages) {
    let role = String(msg.role || "user");
    if (role === "developer") role = "system";

    let content = "";
    if (typeof msg.content === "string") {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      content = (msg.content as Array<Record<string, unknown>>)
        .filter((c) => c.type === "text")
        .map((c) => String(c.text || ""))
        .join(" ");
    }
    content = stripInlinedImages(content);
    const imageContext = findCachedImageContext(content);
    if (imageContext) latestImageContext = imageContext;
    if (!content.trim()) continue;

    if (role === "system") {
      systemMsg += (systemMsg ? "\n" : "") + content;
    } else if (role === "user" || role === "assistant") {
      history.push({ role, content });
    }
  }

  let currentMsg = "";
  if (history.length > 0 && history[history.length - 1].role === "user") {
    currentMsg = history.pop()!.content;
  }

  return { systemMsg, history, currentMsg, latestImageContext };
}

export interface ChatGptMessage {
  id: string;
  author: { role: string };
  content: { content_type: "text"; parts: string[] };
}

/**
 * Cheap heuristic: does the last user turn look like an image-generation
 * request? Used to decide whether to disable Temporary Chat mode.
 *
 * Why a heuristic instead of always disabling Temporary Chat: when
 * `history_and_training_disabled: false`, every conversation gets saved to
 * the user's chatgpt.com history. For text-only chats that's noise — a
 * dozen "OmniRoute" entries clutter the sidebar and can interact with
 * ChatGPT's memory. We pay that cost only when the user actually wants an
 * image, since Temporary Chat refuses image_gen with the message
 * "I cannot generate images in this chat".
 *
 * False positives (text chat misclassified as image) → unnecessary history
 * entry. False negatives (image request misclassified as text) → ChatGPT
 * refuses image_gen and the user retries. Tuning leans toward false
 * positives (we'd rather pollute history than refuse image generation).
 */
export const IMAGE_GEN_REGEXES: RegExp[] = [
  // verb + (anything within 40 chars) + image-noun
  /\b(?:generate|create|make|draw|paint|render|produce|design|sketch|illustrate|show me)\b[\s\S]{0,40}\b(?:image|picture|photo|photograph|drawing|illustration|sketch|painting|portrait|logo|icon|art|artwork|wallpaper|render|graphic)\b/i,
  // image-noun + "of" — "image of a kitten", "picture of mountains"
  /\b(?:image|picture|photo|photograph|illustration|drawing|painting|render)\s+of\b/i,
  // direct verb + a/an article — "draw a kitten", "paint an apple"
  /\b(?:draw|paint|sketch|render|illustrate)\s+(?:me\s+)?(?:a|an|some|the)\s+\w+/i,
  // explicit slash command users sometimes type — "/imagine ..."
  /^\s*\/(?:image|imagine|img|draw|paint)\b/im,
];

/**
 * Markers Open WebUI uses for its background tool prompts (follow-up
 * suggestions, title generation, tag categorization). These prompts embed
 * the prior conversation in `<chat_history>` blocks and frequently quote
 * the user's earlier "generate an image of..." request — which would
 * trip the image-gen regex below. Skip them so we don't unnecessarily
 * disable Temporary Chat and trigger image_gen on background tasks.
 *
 * Catching just one of these markers is enough; tool prompts always
 * include several together.
 */
export const OPENWEBUI_TOOL_PROMPT_MARKERS = [
  /<chat_history>/i,
  /^### Task:/im,
  /\bJSON format:\s*\{/i,
  /\bfollow_?ups\b.*\barray of strings\b/i,
];

export const OPENWEBUI_IMAGE_CONTEXT_MARKERS = [
  /<context>\s*The requested image has been (?:created|edited and created) by the system successfully/i,
  /<context>\s*The requested image has been edited and created and is now being shown to the user/i,
  /<context>\s*Image generation was attempted but failed/i,
];

export function hasOpenWebUIImageContext(parsed: ParsedMessages): boolean {
  return OPENWEBUI_IMAGE_CONTEXT_MARKERS.some((re) => re.test(parsed.systemMsg));
}

export function looksLikeImageGenRequest(parsed: ParsedMessages): boolean {
  // Inspect only the latest user turn — historical turns are irrelevant
  // (and could trigger false positives if the user mentioned an image
  // generated previously).
  const text = parsed.currentMsg.trim();
  if (!text) return false;
  if (OPENWEBUI_TOOL_PROMPT_MARKERS.some((re) => re.test(text))) return false;
  if (hasOpenWebUIImageContext(parsed)) return false;
  return IMAGE_GEN_REGEXES.some((re) => re.test(text));
}

export const IMAGE_EDIT_REGEXES: RegExp[] = [
  /\b(?:edit|adjust|modify|change|update|alter|revise|retouch|fix)\b[\s\S]{0,120}\b(?:it|image|picture|photo|lighting|background|style|color|colour|composition|scene|time of day)\b/i,
  /\b(?:make|turn|set|switch)\s+(?:it|the\s+(?:image|picture|photo|scene))\b[\s\S]{0,120}\b/i,
  /\b(?:add|remove|replace)\b[\s\S]{0,120}\b(?:it|image|picture|photo|background|sky|person|object|text|logo)\b/i,
  /\b(?:brighter|darker|night|daytime|time of day|sunset|sunrise|morning|evening|lighting|relight|background|style)\b/i,
  /^\s*(?:now|then|also)\b[\s\S]{0,120}\b(?:make|turn|change|adjust|add|remove|replace|edit)\b/i,
];

export function looksLikeImageEditRequest(parsed: ParsedMessages): boolean {
  if (!parsed.latestImageContext) return false;
  const text = parsed.currentMsg.trim();
  if (!text) return false;
  if (OPENWEBUI_TOOL_PROMPT_MARKERS.some((re) => re.test(text))) return false;
  if (hasOpenWebUIImageContext(parsed)) return false;
  return IMAGE_EDIT_REGEXES.some((re) => re.test(text));
}

export function buildConversationBody(
  parsed: ParsedMessages,
  modelSlug: string,
  parentMessageId: string,
  // When true, send as a regular (non-temporary) chat so the image_gen tool
  // is available. When false (default), use Temporary Chat to keep chats
  // out of the user's chatgpt.com history.
  forImageGen: boolean,
  continuation: ChatGptImageConversationContext | null = null
): Record<string, unknown> {
  // Critical: do NOT send prior turns as separate `assistant` and `user`
  // messages in the `messages` array. ChatGPT's web API ("action: next")
  // treats those as in-progress turns and the model will literally CONTINUE
  // a prior assistant response in the new generation — observed as
  // `[1] -> [12] -> [1123]` across three turns.
  //
  // Instead, fold all prior history into the system message and send only
  // the current user message as a single new turn. The model then sees a
  // single prompt with full context and responds fresh.
  const systemParts: string[] = [];
  if (parsed.systemMsg.trim()) {
    systemParts.push(parsed.systemMsg.trim());
  }
  if (!continuation && parsed.history.length > 0) {
    const formatted = parsed.history
      .map((h) => `${h.role === "assistant" ? "Assistant" : "User"}: ${h.content}`)
      .join("\n\n");
    systemParts.push(
      `Prior conversation (for context — answer only the new user message below):\n\n${formatted}`
    );
  }

  const messages: ChatGptMessage[] = [];
  if (systemParts.length > 0) {
    messages.push({
      id: randomUUID(),
      author: { role: "system" },
      content: { content_type: "text", parts: [systemParts.join("\n\n")] },
    });
  }

  const currentUserContent = hasOpenWebUIImageContext(parsed)
    ? "Briefly acknowledge the image result described in the system context. Do not generate, edit, or request another image."
    : parsed.currentMsg || "";

  messages.push({
    id: randomUUID(),
    author: { role: "user" },
    content: { content_type: "text", parts: [currentUserContent] },
  });

  return {
    action: "next",
    messages,
    model: modelSlug,
    // Text-only API-style requests start fresh because clients replay full
    // history. Generated-image edits are the exception: ChatGPT needs the
    // original conversation node to adjust the actual image, not just a
    // markdown URL echoed back in a synthetic history block.
    conversation_id: continuation?.conversationId ?? null,
    parent_message_id: continuation?.parentMessageId ?? parentMessageId,
    timezone_offset_min: -new Date().getTimezoneOffset(),
    // Temporary Chat is the default. Disable it ONLY when the user is asking
    // for an image — that lets ChatGPT use its image_gen tool, at the cost of
    // saving the chat to the user's history. For text-only requests we keep
    // Temporary Chat on so the user's history stays clean.
    history_and_training_disabled: !(forImageGen || continuation),
    suggestions: [],
    websocket_request_id: randomUUID(),
  };
}
