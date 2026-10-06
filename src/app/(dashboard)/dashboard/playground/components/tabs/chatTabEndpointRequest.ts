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
export function lastUserContent(
  chatMessages: Array<{ role: string; content: string }>
): string {
  for (let i = chatMessages.length - 1; i >= 0; i--) {
    if (chatMessages[i].role === "user") return chatMessages[i].content;
  }
  return "";
}
