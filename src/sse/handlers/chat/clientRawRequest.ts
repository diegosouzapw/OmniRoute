/**
 * The clientRawRequest envelope — the observability snapshot of a chat request.
 *
 * Extracted from chat.ts (#7847). Both helpers are about the same object: one builds it, the
 * other merges a per-target abort signal into it before dispatch. Neither belongs in the
 * request handler proper, and chat.ts sits against a frozen file-size ratchet.
 *
 * chat.ts re-exports both, so the public surface and tests/unit/chat-build-client-raw-request
 * are unchanged.
 */
import { mergeAbortSignals } from "@omniroute/open-sse/executors/base.ts";
import { cloneBoundedForLog } from "@omniroute/open-sse/utils/requestLogger.ts";

export function buildClientRawRequest(request: Request, body: unknown) {
  const url = new URL(request.url);
  return {
    endpoint: url.pathname,
    // #7847: bounded, not a full deep clone. Every consumer of clientRawRequest.body is
    // observability — reqLogger.logClientRawRequest (which re-bounds it anyway, or drops it
    // entirely when the logger is disabled), trackPendingRequest's `clientRequest`, and
    // recordRejectedRequestUsage's `requestBody`. None feeds dispatch, translation or the
    // upstream call, so cloning the whole payload retained ~41x more than anything kept:
    // 3.19 MiB vs 0.08 MiB on the incident's 3.05 MiB / 729-message request.
    // Still a clone, not an alias — `body` is rewritten downstream (plugin onRequest hook,
    // compression), and this has to stay a snapshot of what the client actually sent.
    body: cloneBoundedForLog(body),
    headers: Object.fromEntries(request.headers.entries()),
    signal: request.signal ?? null,
  };
}

/**
 * #7360 follow-up: chatCore.ts's createStreamController (and, downstream,
 * withRateLimit/acquireAccountSemaphore) only ever watches
 * clientRawRequest.signal — the ORIGINAL client's request signal, which stays
 * open for as long as the overall combo keeps retrying elsewhere. A target
 * abandoned by comboTargetTimeoutMs (open-sse/services/combo/targetTimeoutRunner.ts)
 * never learns it was abandoned, and hangs forever (leaking a permanent
 * "pending" dashboard entry — trackPendingRequest(false) never runs; live
 * incident, log id 1784418258231-14961a). Merges the per-target
 * modelAbortSignal (when present) into clientRawRequest.signal so an
 * abandoned dispatch can actually observe its own abort and reach its
 * cleanup path — returns clientRawRequest unchanged when there's no
 * modelAbortSignal to merge in (the non-combo / non-timed-out common case).
 */
export function resolveDispatchClientRawRequest(
  clientRawRequest: { signal?: AbortSignal | null } | null | undefined,
  modelAbortSignal: AbortSignal | null | undefined
): typeof clientRawRequest {
  if (!modelAbortSignal) return clientRawRequest;
  return {
    ...clientRawRequest,
    signal: clientRawRequest?.signal
      ? mergeAbortSignals(clientRawRequest.signal, modelAbortSignal)
      : modelAbortSignal,
  };
}
