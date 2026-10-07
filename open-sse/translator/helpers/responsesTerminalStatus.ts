/**
 * A truncated (finish_reason "length") or filtered ("content_filter") generation
 * must surface as status:"incomplete" + incomplete_details — the real OpenAI
 * Responses API contract, already honored by the ChatGPT-web bridge in
 * vendor/codex-chatgpt-web/bridge.ts — and not silently as "completed", which
 * gives a caller no signal that the output was cut off mid-generation rather
 * than the model actually finishing. An upstream error is a harder failure and
 * still wins: with `hasUpstreamError` emit the failure terminal.
 *
 * Mutates `response` in place and returns the terminal SSE event type to emit.
 */
export function finalizeResponsesTerminalStatus(
  response: Record<string, unknown>,
  finishReason: unknown,
  hasUpstreamError = false
): "response.completed" | "response.incomplete" | "response.failed" {
  if (hasUpstreamError) return "response.failed";
  const reason =
    finishReason === "length"
      ? "max_output_tokens"
      : finishReason === "content_filter"
        ? "content_filter"
        : undefined;
  if (!reason) return "response.completed";
  response.status = "incomplete";
  response.incomplete_details = { reason };
  return "response.incomplete";
}
