/**
 * opencodeHeadersWait.ts — opt-in bound on waiting for upstream response
 * headers on streamed Responses calls in the opencode executor.
 *
 * A streamed Responses reply opens with `response.created` before any
 * generation, so when headers take longer than this window while another
 * account is still available, the request stops waiting and moves on instead
 * of holding the full headers window on a queued request. Chat Completions
 * calls (which may buffer the whole answer behind the gateway) and
 * non-streamed calls are never bounded: the policy resolves to 0 and the
 * dispatch runs untouched.
 *
 * Activation is the window value alone (default 0 = off). The window only
 * ever shortens the effective fetch-start ceiling, never extends it.
 */

import { resolveFetchStartTimeout } from "../utils/fetchStartTimeoutPolicy.ts";
import {
  getOpencodeResponsesHeadersWaitMaxRotations,
  getOpencodeResponsesHeadersWaitMs,
} from "@/shared/utils/runtimeTimeouts";

export const HEADERS_WAIT_TIMEOUT_NAME = "OpencodeHeadersWaitTimeout";
export const HEADERS_WAIT_TIMEOUT_CODE = "OPENCODE_HEADERS_WAIT_TIMEOUT";

export type HeadersWaitPolicy = {
  /** Effective per-attempt bound, or 0 when the mechanism is off. */
  windowMs: number;
  maxRotations: number;
};

/** Minimal account shape for the per-attempt eligibility check (identity only). */
export type ScopedAccountLike = { fingerprint: string };

/** Minimal dispatch result: the race only forwards it, never inspects it. */
export type DispatchResult = { response: Response } & Record<string, unknown>;

export type HeadersWaitWindowInput = {
  stream: boolean | undefined;
  requestFormat: string | null;
  windowMs: number;
  capTimeoutMs: number;
};

/**
 * Per-request policy, computed once before the account loop. Returns 0 unless
 * the call is a streamed Responses call with a positive window below the
 * effective fetch-start ceiling.
 */
export function resolveHeadersWaitWindowMs(input: HeadersWaitWindowInput): number {
  if (!input.stream || input.requestFormat !== "openai-responses") return 0;
  if (!(input.windowMs > 0)) return 0;
  if (input.windowMs >= input.capTimeoutMs) return 0;
  return input.windowMs;
}

/** Request state for one executeOnce call: policy computed once, rotations spent. */
export function headersWaitState(
  input: { stream?: boolean },
  requestFormat: string | null,
  baseTimeoutMs: number,
  fetchStartCapMs: number | undefined,
  env: Record<string, string | undefined> = process.env
): HeadersWaitRequestState {
  const windowMs = getOpencodeResponsesHeadersWaitMs(env);
  const maxRotations = getOpencodeResponsesHeadersWaitMaxRotations(env);
  if (!input.stream || requestFormat !== "openai-responses" || windowMs <= 0) {
    return { policy: { windowMs: 0, maxRotations }, spent: { attempts: 0 } };
  }
  const cap = resolveFetchStartTimeout({
    baseTimeoutMs,
    stream: input.stream,
    capMs: fetchStartCapMs,
  }).timeoutMs;
  const policy = {
    windowMs: resolveHeadersWaitWindowMs({
      stream: input.stream,
      requestFormat,
      windowMs,
      capTimeoutMs: cap,
    }),
    maxRotations,
  };
  return { policy, spent: { attempts: 0 } };
}

export type HeadersWaitRequestState = {
  policy: HeadersWaitPolicy;
  /** Rotations spent, shared by reference with the settle call (same shape as the stall counter). */
  spent: { attempts: number };
};

/** Per-attempt wait: the policy window only while budget and another account remain. */
export function headersWaitWaitMs<T>(
  state: HeadersWaitRequestState,
  account: T,
  accounts: T[],
  isCandidate: (a: T) => boolean
): number {
  if (state.policy.windowMs <= 0 || state.spent.attempts >= state.policy.maxRotations) return 0;
  const another = accounts.some((a) => a !== account && isCandidate(a));
  return another ? state.policy.windowMs : 0;
}

/**
 * One rotation-loop attempt under the headers-wait bound: resolve the
 * per-attempt wait from the request state and race the dispatch against it.
 * Returns the race outcome; the caller owns rotate/return/throw.
 */
export async function headersWaitDispatch(
  state: HeadersWaitRequestState,
  account: ScopedAccountLike,
  accounts: ScopedAccountLike[],
  isCandidate: (a: ScopedAccountLike) => boolean,
  dispatch: (signal: AbortSignal | null | undefined) => Promise<DispatchResult>,
  signal?: AbortSignal | null
): Promise<{ outcome: HeadersWaitOutcome<DispatchResult>; waitMs: number }> {
  const waitMs = headersWaitWaitMs(state, account, accounts, isCandidate);
  if (!(waitMs > 0)) {
    return {
      outcome: await raceDispatchWithHeadersWait(() => dispatch(signal), 0, signal),
      waitMs,
    };
  }
  if (signal?.aborted) return { outcome: { kind: "aborted", reason: signal.reason }, waitMs };
  const attempt = new AbortController();
  const onClientAbort = () => attempt.abort(signal?.reason);
  signal?.addEventListener("abort", onClientAbort, { once: true });
  try {
    const outcome = await raceDispatchWithHeadersWait(
      () => dispatch(attempt.signal),
      waitMs,
      signal
    );
    if (outcome.kind === "expired") attempt.abort(headersWaitExpiryError(waitMs));
    return { outcome, waitMs };
  } finally {
    signal?.removeEventListener("abort", onClientAbort);
  }
}

export type HeadersWaitOutcome<T> =
  { kind: "ok"; result: T } | { kind: "expired" } | { kind: "aborted"; reason: unknown };

/**
 * Race one dispatch against the headers-wait window. `waitMs <= 0` runs the
 * dispatch untouched (no timer). Otherwise the dispatch races a window timer:
 * expiry yields `expired` (never throws), a client abort yields `aborted`,
 * anything else `ok` — dispatch rejections propagate untouched.
 */
export async function raceDispatchWithHeadersWait<T>(
  dispatch: () => Promise<T>,
  waitMs: number,
  signal?: AbortSignal | null
): Promise<HeadersWaitOutcome<T>> {
  if (!(waitMs > 0)) {
    return { kind: "ok", result: await dispatch() };
  }
  if (signal?.aborted) {
    return { kind: "aborted", reason: signal.reason };
  }
  let timer: ReturnType<typeof setTimeout> | null = null;
  try {
    return await new Promise<HeadersWaitOutcome<T>>((resolve, reject) => {
      const cleanup = () => {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        signal?.removeEventListener("abort", onAbort);
      };
      const onAbort = () => {
        cleanup();
        resolve({ kind: "aborted", reason: signal?.reason });
      };
      signal?.addEventListener("abort", onAbort, { once: true });
      if (signal?.aborted) {
        onAbort();
        return;
      }
      timer = setTimeout(() => {
        cleanup();
        if (signal?.aborted) resolve({ kind: "aborted", reason: signal.reason });
        else resolve({ kind: "expired" });
      }, waitMs);
      void dispatch().then(
        (result) => {
          cleanup();
          resolve({ kind: "ok", result });
        },
        (reason) => {
          cleanup();
          if (signal?.aborted) resolve({ kind: "aborted", reason });
          else reject(reason);
        }
      );
    });
  } finally {
    if (timer !== null) clearTimeout(timer);
  }
}

/** Build the expiry error (distinct from TimeoutError — never logged as a fetch-start TIMEOUT). */
export function headersWaitExpiryError(waitMs: number): Error {
  const err = new Error(`No response headers within ${waitMs}ms, rotating to next account`);
  err.name = HEADERS_WAIT_TIMEOUT_NAME;
  (err as { code?: string }).code = HEADERS_WAIT_TIMEOUT_CODE;
  return err;
}
