// #11526: the fetch-start (headers-wait) phase had no ceiling comparable to a
// real client's patience for STREAMING requests — it inherited the flat,
// non-adaptive FETCH_TIMEOUT_MS (default 600_000ms / 10 minutes), five times
// longer than Codex's own ~120s hard client-abort window. When an upstream
// never returns a response at all (not even headers), OmniRoute kept the
// connection open with nothing but keepalives, guaranteeing the client gave
// up first with an opaque 499 instead of OmniRoute detecting the stall and
// failing fast/over within a client-realistic window.
//
// This mirrors the adaptive philosophy of streamReadinessPolicy.ts's
// resolveStreamReadinessTimeout (which already protects the BODY phase, after
// headers arrive) but inverted: instead of bumping a small base timeout up for
// heavy payloads, it caps an oversized base timeout down for the HEADERS
// phase of streaming requests specifically. Non-streaming requests are left
// on the existing flat default — providers that are legitimately slow to
// accept a connection (but not streaming SSE) are unaffected.

export type FetchStartTimeoutPolicyInput = {
  baseTimeoutMs: number;
  /** Only streaming requests are capped — non-streaming keeps the flat default. */
  stream?: boolean | null;
  capMs?: number;
};

export type FetchStartTimeoutPolicyResult = {
  timeoutMs: number;
  baseTimeoutMs: number;
  /** True when the base timeout was reduced by the streaming cap. */
  capped: boolean;
};

// Codex's documented hard client-abort window for a stalled turn (nothing but
// keepalives in flight) is ~120s. Keep the cap safely under that so OmniRoute's
// own headers-phase watchdog always fires before the client gives up on its own.
export const CODEX_CLIENT_ABORT_MS = 120_000;
export const DEFAULT_FETCH_START_TIMEOUT_CAP_MS = 110_000;

export function resolveFetchStartTimeout(
  input: FetchStartTimeoutPolicyInput
): FetchStartTimeoutPolicyResult {
  const baseTimeoutMs = Math.max(0, Math.floor(input.baseTimeoutMs || 0));
  if (baseTimeoutMs <= 0 || !input.stream) {
    return { timeoutMs: baseTimeoutMs, baseTimeoutMs, capped: false };
  }

  const capMs = Math.max(0, Math.floor(input.capMs ?? DEFAULT_FETCH_START_TIMEOUT_CAP_MS));
  if (capMs <= 0 || baseTimeoutMs <= capMs) {
    return { timeoutMs: baseTimeoutMs, baseTimeoutMs, capped: false };
  }

  return { timeoutMs: capMs, baseTimeoutMs, capped: true };
}
