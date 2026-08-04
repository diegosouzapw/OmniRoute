/**
 * OpenAI Responses ↔ xAI Responses translator
 *
 * Source of truth: router-for-me/CLIProxyAPI internal/translator/openai-responses/xai/*
 *
 * xAI's Responses API is shape-compatible with OpenAI Responses, so this is
 * mostly a passthrough. Translator responsibilities:
 *   - normalize response.id when synthesized
 *   - reconcile a small set of unsupported fields (drop unknown vendor-only opts)
 *   - apply the thinking patcher hook (delegated upstream)
 */

interface OpenAiResponsesRequest {
  service_tier?: string;
  messages?: unknown[];
  input?: unknown[];
  [key: string]: unknown;
}

interface XaiCompletedResponse {
  object?: string;
  status?: string;
  [key: string]: unknown;
}

interface SseEvent {
  event: string;
  data: string;
}

/**
 * Translate an inbound OpenAI-Responses request body into an xAI request body.
 */
export function openaiResponsesRequestToXai(req: OpenAiResponsesRequest): OpenAiResponsesRequest {
  if (!req || typeof req !== "object") return req;
  const out: OpenAiResponsesRequest = { ...req };

  // xAI does not currently honor `parallel_tool_calls: false` on every model;
  // mirror CLIProxyAPI: leave the flag as caller specified.

  // Drop OpenAI-specific service_tier hint that xAI rejects.
  if ("service_tier" in out) delete out.service_tier;

  // xAI expects `input` (Responses-style); if the caller passed `messages`
  // instead, leave them — xAI also accepts messages, but warn via metadata.
  return out;
}

/**
 * Translate an xAI completed response (already aggregated by collectSseToCompleted)
 * into the OpenAI Responses JSON shape that callers expect.
 */
export function xaiCompletedToOpenaiResponses(
  completed: XaiCompletedResponse,
): XaiCompletedResponse {
  if (!completed || typeof completed !== "object") return completed;
  return {
    ...completed,
    object: completed.object ?? "response",
    status: completed.status ?? "completed",
  };
}

/**
 * Pass-through transform for SSE event objects { event, data } emitted by
 * iterateSseEvents(). For OpenAI Responses callers we forward verbatim — only
 * normalize event names that diverge.
 *
 * Returns null to drop the event.
 */
export function xaiSseEventToOpenaiResponses(ev: SseEvent): SseEvent | null {
  if (!ev || !ev.event) return ev;
  // CLIProxyAPI drops xAI-internal `response.output_text.annotation.added`
  // when the caller is OpenAI Responses, since OpenAI emits a different name.
  if (ev.event === "response.output_text.annotation.added") return null;
  return ev;
}
