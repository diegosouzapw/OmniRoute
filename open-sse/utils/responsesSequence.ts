/**
 * @file responsesSequence.ts
 * @description Shared `sequence_number` convention for Responses API frames that are
 * synthesized OUTSIDE the real per-stream event emitter (open-sse/translator/response/
 * openai-responses/eventEmitter.ts, whose `state.seq` starts at 0 so the first real event
 * is numbered 1).
 *
 * These synthesized sites (startup/mid-stream keepalive, early-stream and translated-error
 * failure frames, Codex WebSocket failure frames) have no access to that live counter —
 * threading a shared counter across four independent modules would risk colliding with a
 * real event's own sequence_number (#14330 risk notes). Per the Responses event schema, a
 * strict decoder only requires the field to be a monotonic-looking number starting at 1 (it
 * never validates it against a prior stream), so every synthesized site uses this same
 * seed: 1, never the previous default of 0, which collided with the real first event.
 */
export const SYNTHETIC_RESPONSES_SEQUENCE_NUMBER = 1;

/** Wraps a `response.failed` payload's `response` object with the synthetic seed. */
export function buildSyntheticResponsesFailedEvent(
  response: Record<string, unknown>
): Record<string, unknown> {
  return {
    type: "response.failed",
    sequence_number: SYNTHETIC_RESPONSES_SEQUENCE_NUMBER,
    response,
  };
}

/**
 * Synthetic `response.id` for the keepalive `response.in_progress` frame (#15202).
 *
 * The value is constant on purpose: the frame is emitted once as the very first
 * stream byte, before the upstream has produced a real response id. Being a
 * string (never `null`) matters because strict Responses decoders validate
 * `response.id` as `string | undefined` and abort the stream on the first frame.
 */
export const SYNTHETIC_RESPONSES_KEEPALIVE_ID = "resp_keepalive_omniroute";

/**
 * Build a fresh string id for a synthesized `response.failed` frame (#15202).
 *
 * The `resp_error_*` prefix mirrors the precedent in streamErrorFormat.ts. A
 * fresh id per frame keeps two failures in the same request from colliding.
 */
export function buildSyntheticResponsesFailureId(): string {
  const unique =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `resp_error_${unique}`;
}
