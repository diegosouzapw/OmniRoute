/**
 * #12398 — decides whether a Claude-format stream must be aborted with an
 * upstream error at flush time because the client got no usable content.
 *
 * Covers two shapes:
 *  - "partial lifecycle": message_start (and optionally message_delta /
 *    message_stop) arrived but no content block ever did — this was already
 *    correctly handled before #12398 and is preserved here unchanged.
 *  - "truly empty": the upstream connection closed having sent literally
 *    zero bytes (HTTP 200, not even a message_start). The lifecycle flags
 *    above can never catch this shape since none of them are ever set — the
 *    caller must additionally know whether ANY upstream chunk ever arrived.
 *
 * Callers must additionally require a Claude-format client (this function
 * does not take that flag — both call sites in stream.ts only ever reach
 * here already scoped to a Claude-format response).
 */
type ClaudeEmptyLifecycleLike = {
  hasError: boolean;
  hasContentBlock: boolean;
  hasMessageStart: boolean;
  hasMessageDelta: boolean;
  hasMessageStop: boolean;
};

export function shouldAbortEmptyClaudeStream(
  lifecycle: ClaudeEmptyLifecycleLike,
  sawAnyUpstreamPayload: boolean
): boolean {
  if (lifecycle.hasError || lifecycle.hasContentBlock) return false;
  const hasPartialLifecycle =
    lifecycle.hasMessageStart || lifecycle.hasMessageDelta || lifecycle.hasMessageStop;
  return hasPartialLifecycle || !sawAnyUpstreamPayload;
}
