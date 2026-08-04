import { HTTP_STATUS } from "../../config/constants.ts";

/**
 * Whether a failed single-model attempt is a *self-inflicted* upstream timeout — i.e.
 * OmniRoute's own deadline (fetch-start `TimeoutError`, body `BodyTimeoutError`, or the
 * combo-per-model timeout) fired while the upstream was still processing the request,
 * surfaced as a 504 tagged `errorType: "upstream_timeout"`.
 *
 * Such a timeout is NOT a provider rejection — the connection is healthy, we just gave
 * up waiting — so the caller must skip the connection cooldown for it. Cooling the
 * connection down on our own timeout penalises a healthy account and, when a provider
 * has a single connection, blocks every subsequent request behind a self-inflicted
 * cooldown. Antigravity keeps its own pre-response-timeout cooldown policy and is
 * therefore excluded here.
 */
export function isSelfInflictedUpstreamTimeout(
  status: number,
  errorType: string | undefined | null,
  provider: string
): boolean {
  return (
    status === HTTP_STATUS.GATEWAY_TIMEOUT &&
    errorType === "upstream_timeout" &&
    provider !== "antigravity"
  );
}
