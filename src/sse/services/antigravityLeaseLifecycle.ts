import { randomUUID } from "crypto";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

import { isAntigravityAccountLeaseEnabled } from "@/shared/utils/featureFlags";
import { releaseAntigravityLease } from "./antigravityRoutingState";
import type { AntigravityLeaseUnavailable } from "./antigravityLeaseSelection";

/**
 * Lifecycle glue for the Antigravity account lease (re-land of @Ardem2025's
 * #10011). The lease is acquired during credential selection; these helpers own
 * the two ways it ends: a pre-dispatch failure, or the terminal event of the
 * SSE body it was reserved for.
 */

/**
 * `.catch()` handler that frees a selector-owned lease when a pre-dispatch step throws
 * and rethrows untouched, so the awaited call keeps its original shape.
 */
export function releasingRethrow(leaseId: string | null | undefined) {
  return (error: unknown): never => {
    releaseAntigravityLease(leaseId);
    throw error;
  };
}

export { releaseAntigravityLease as release };

/**
 * Transfer the lease to the terminal lifecycle of an SSE body: it is released
 * exactly once, on EOF, cancel, reader error, or client abort. Without a lease
 * id (feature flag off) or a body, the response is returned untouched.
 */
export function holdAntigravityLeaseThroughResponse(
  response: Response,
  leaseId: string | null | undefined,
  signal: AbortSignal | null | undefined
): Response {
  if (!leaseId || !response.body) {
    releaseAntigravityLease(leaseId);
    return response;
  }
  const reader = response.body.getReader();
  let released = false;
  let abortListener: (() => void) | null = null;
  const releaseOnce = () => {
    if (released) return;
    released = true;
    if (abortListener && signal) signal.removeEventListener("abort", abortListener);
    releaseAntigravityLease(leaseId);
  };
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          releaseOnce();
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        releaseOnce();
        controller.error(error);
      }
    },
    async cancel(reason) {
      try {
        await reader.cancel(reason);
      } finally {
        releaseOnce();
      }
    },
  });
  abortListener = () => {
    void reader
      .cancel(signal?.reason)
      .catch(() => {})
      .finally(releaseOnce);
  };
  if (signal?.aborted) abortListener();
  else signal?.addEventListener("abort", abortListener, { once: true });
  return new Response(stream, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/** Only a streaming body has a lifecycle worth holding the lease through. */
export function isStreamingAntigravityResponse(response: unknown): response is Response {
  return (
    response instanceof Response &&
    /(?:^|[,;\s])text\/event-stream(?:$|[;,\s])/i.test(response.headers.get("content-type") || "")
  );
}

/**
 * Every eligible Antigravity account is already leased for this model. Local lease
 * saturation is neither provider quota/cooldown nor breaker failure, so it gets its own
 * structured 503 instead of being reported as an upstream error.
 */
export function buildAntigravityPoolBusyResponse(retryHintAtMs: number): Response {
  const retryAfter = Math.max(1, Math.ceil((retryHintAtMs - Date.now()) / 1000));
  return new Response(
    JSON.stringify(
      buildErrorBody(
        503,
        "All eligible Antigravity accounts are currently handling a request for this model",
        undefined,
        { type: "server_error", code: "antigravity_pool_busy" }
      )
    ),
    {
      status: 503,
      headers: { "Content-Type": "application/json", "Retry-After": String(retryAfter) },
    }
  );
}

/** Per-request lease state: whether the flag is on, and which accounts came back busy. */
export type AntigravityLeaseRequestState = {
  on: boolean;
  requestId: string;
  attempted: Set<string>;
  earliestRetryHintAtMs: number | null;
};

/**
 * Resolve the opt-in flag once per request. Off ⇒ every helper below is inert, and the
 * provider check short-circuits before the flag store is read at all.
 */
export function startAntigravityLeaseRequest(
  provider: string,
  correlationId: string | null | undefined
): AntigravityLeaseRequestState {
  const on = provider === "antigravity" && isAntigravityAccountLeaseEnabled();
  return {
    on,
    requestId: on ? (correlationId ?? randomUUID()) : "",
    attempted: new Set<string>(),
    earliestRetryHintAtMs: null,
  };
}

/** Record a busy verdict and return the account id the caller must now exclude. */
export function trackAntigravityLeaseBusy(
  state: AntigravityLeaseRequestState,
  busy: AntigravityLeaseUnavailable
): string {
  const hint = busy.retryHintAtMs;
  if (
    Number.isFinite(hint) &&
    (state.earliestRetryHintAtMs === null || hint < state.earliestRetryHintAtMs)
  ) {
    state.earliestRetryHintAtMs = hint;
  }
  state.attempted.add(busy.selectedConnectionId);
  return busy.selectedConnectionId;
}
