// src/app/(dashboard)/dashboard/playground/components/tabs/chatTabEndpointRequest.ts
//
// #10592 — ChatTab.tsx hardcoded every "Send" click to POST /api/v1/chat/completions,
// ignoring configState.endpoint entirely. Selecting a search-only provider (exa-search,
// tavily-search, serper-search) in the Endpoint selector still sent a chat.completions
// request, which has no notion of search-provider credentials and 404s.
//
// This module gives ChatTab a small, testable seam for routing non-chat endpoints
// (currently "search" and "web.fetch") to their real path with a query-shaped body,
// instead of the chat.completions messages/SSE shape.

import { endpointToPath, type PlaygroundEndpoint } from "@/lib/playground/codeExport";

/** Chat-shaped endpoints keep the existing messages[] + SSE-delta request/response flow. */
export function isChatCompletionsEndpoint(endpoint: PlaygroundEndpoint | undefined): boolean {
  return !endpoint || endpoint === "chat.completions";
}

/** ChatGPT Web Codex models require the native Responses wire protocol. */
export function isNativeCodexPlaygroundModel(model: string | undefined): boolean {
  return /^(?:cgpt-codex|chatgpt-web-codex)\//.test(model ?? "");
}

interface NativeCodexPlaygroundMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Build the smallest native Codex request accepted by the browser-session provider.
 * The current user item is bound to the generated turn id; earlier messages remain
 * replayable conversation history without pretending to belong to this turn.
 */
export function buildNativeCodexPlaygroundRequest({
  model,
  messages,
  threadId,
  turnId,
  maxOutputTokens,
}: {
  model: string;
  messages: NativeCodexPlaygroundMessage[];
  threadId: string;
  turnId: string;
  maxOutputTokens?: number;
}): Record<string, unknown> {
  const system = messages
    .filter((message) => message.role === "system")
    .map((message) => message.content)
    .filter(Boolean)
    .join("\n\n");
  const conversational = messages.filter((message) => message.role !== "system");
  let latestUser = -1;
  for (let index = conversational.length - 1; index >= 0; index -= 1) {
    if (conversational[index]?.role === "user") {
      latestUser = index;
      break;
    }
  }

  const input = conversational.map((message, index) => ({
    type: "message",
    role: message.role,
    content: [
      {
        type: message.role === "assistant" ? "output_text" : "input_text",
        text: message.content,
      },
    ],
    ...(index === latestUser
      ? { internal_chat_message_metadata_passthrough: { turn_id: turnId } }
      : {}),
  }));
  const turnMetadata = JSON.stringify({ thread_id: threadId, turn_id: turnId });

  return {
    model,
    input,
    stream: true,
    store: false,
    ...(system ? { instructions: system } : {}),
    ...(maxOutputTokens && maxOutputTokens > 0 ? { max_output_tokens: maxOutputTokens } : {}),
    client_metadata: { "x-codex-turn-metadata": turnMetadata },
  };
}

/** Resolves the fetch path (mounted under `/api`) for the selected Playground endpoint. */
export function resolveChatTabRequestPath(endpoint: PlaygroundEndpoint | undefined): string {
  return `/api${endpointToPath(endpoint ?? "chat.completions")}`;
}

/**
 * Builds the request body for a non-chat endpoint from the user's free-text query.
 * "search" and "web.fetch" both take a single string field instead of a messages array.
 */
export function buildNonChatRequestBody(
  endpoint: PlaygroundEndpoint | undefined,
  query: string,
  model: string
): Record<string, unknown> {
  if (endpoint === "web.fetch") {
    return { url: query };
  }
  const body: Record<string, unknown> = { query };
  if (model) body.model = model;
  return body;
}

/** Renders a non-chat endpoint's raw response text as a chat-bubble-friendly string. */
export function formatNonChatResponse(rawText: string): string {
  try {
    const parsed = JSON.parse(rawText) as unknown;
    return "```json\n" + JSON.stringify(parsed, null, 2) + "\n```";
  } catch {
    return rawText;
  }
}

/** Finds the most recent user-authored message content to use as a non-chat query. */
export function lastUserContent(chatMessages: Array<{ role: string; content: string }>): string {
  for (let i = chatMessages.length - 1; i >= 0; i--) {
    if (chatMessages[i].role === "user") return chatMessages[i].content;
  }
  return "";
}
