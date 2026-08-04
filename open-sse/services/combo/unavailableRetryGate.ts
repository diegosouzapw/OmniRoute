/**
 * #8486 Part B: gate for the "all targets failed" unavailable-response
 * retry-after decoration in combo.ts (handleComboChat / handleRoundRobinCombo).
 *
 * Root cause: the aggregation loop tracks `earliestRetryAfter` as the MINIMUM
 * retry-after parsed out of ANY target's own response body across the whole
 * failure loop, independent of which target ends up supplying the surfaced
 * `status`/`msg` pair. When a combo mixes a genuinely rate-limited target
 * (real retryAfter) with a config-class failure (e.g. Antigravity's 422
 * `missing_project_id`, which carries no retryAfter of its own), the final
 * unavailableResponse() stitches the rate-limited target's reset window onto
 * the unrelated target's message text.
 *
 * `unavailableResponse()` (open-sse/utils/error.ts) has no way to know
 * `status`/`msg` and `retryAfter` came from different targets, so the gate
 * has to live at the call site: only decorate the response with a
 * `(reset after ...)` suffix when the surfaced `status` is itself a
 * rate-limit-class code that plausibly owns a retry-after window. A
 * config-class status (422, 400, 401, 403, 404, ...) must never receive a
 * retry-after suffix that did not originate from its own response body.
 */

const RETRY_AFTER_ELIGIBLE_STATUSES = new Set([429, 503]);

/**
 * Whether the final aggregated combo-failure `status` is a rate-limit-class
 * code allowed to be decorated with a `(reset after ...)` retry-after
 * suffix. Config-class statuses (422 missing_project_id, 400, 401, 403, 404,
 * ...) are excluded — see module header for the field-mismatch this guards.
 */
export function isRetryAfterEligibleStatus(status: number | null | undefined): boolean {
  return typeof status === "number" && RETRY_AFTER_ELIGIBLE_STATUSES.has(status);
}
