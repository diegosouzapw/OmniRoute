/**
 * User-facing messages for upstream ChatGPT-web HTTP error statuses.
 *
 * Pure mapping with no side effects so it can be unit-tested in isolation — the
 * caller owns any state mutation (e.g. clearing the token cache on 401/403).
 * Unmapped statuses fall back to the generic `ChatGPT returned HTTP <status>`.
 */
const CGPT_WEB_HTTP_ERROR_MESSAGES: Record<number, string> = {
  401: "ChatGPT auth failed — session may have expired. Re-paste your __Secure-next-auth.session-token.",
  403: "ChatGPT auth failed — session may have expired. Re-paste your __Secure-next-auth.session-token.",
  404: "ChatGPT returned 404 — usually the model is no longer available on this account or the chat-requirements-token expired. Retry will start a fresh conversation.",
  413: "ChatGPT returned 413 — the request payload is too large for ChatGPT web's size limit (often hit by agentic clients like Cline/Kilo that send big system prompts and file context). Reduce the context: enable compression, trim the conversation/files, or use a smaller request.",
  429: "ChatGPT rate limited. Wait a moment and retry.",
};

export function describeChatGptWebHttpError(status: number): string {
  return CGPT_WEB_HTTP_ERROR_MESSAGES[status] ?? `ChatGPT returned HTTP ${status}`;
}
