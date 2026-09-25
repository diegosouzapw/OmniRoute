/**
 * chatCore stream-readiness fallback (bounded second attempt through the same routing path).
 *
 * Extracted from handleChatCore's streaming entry: when the first upstream body
 * stalls before producing a usable event (`ensureStreamReadiness` returns
 * `ok: false`), the executor loop has already ended (headers arrived), so this
 * is the only place a bounded retry through the same routing path can be issued.
 *
 * Contract: exactly one extra attempt, same readiness budget, no account
 * penalty (the stall is an upstream issue, never a quota failure). Returns the
 * first failure unchanged when no retry is possible (flag off, client went away,
 * retry leg failed, or the second body stalls too — in that case the second
 * failure is returned so the freshest diagnostic surfaces).
 */
import { ensureStreamReadiness, type StreamReadinessResult } from "../../utils/streamReadiness.ts";
import { isStreamReadinessStallRetryEnabled } from "@/shared/utils/featureFlags.ts";
import { maybeConvertJsonBodyToSse } from "./jsonBodyToSse.ts";

type LoggerLike = {
  warn?: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
} | null;

export type ReadinessFallbackRequest = {
  failedReadiness: StreamReadinessResult;
  failedConnectionId: string | null;
  failedBody: Response;
  currentModel: string;
  streamReadinessPolicy: { timeoutMs: number; maxTimeoutMs: number };
  provider: string | null | undefined;
  model: string | null | undefined;
  log?: LoggerLike;
  reqLogger: { logTargetRequest: (...args: unknown[]) => void };
  providerUrl: unknown;
  providerHeaders: unknown;
  finalBody: unknown;
  translatedBody: unknown;
  executeProviderRequest: (
    model: string,
    allowDedup: boolean
  ) => Promise<{ response?: Response; transformedBody?: unknown }>;
  providerRequestCapture: { body: (body: unknown) => unknown };
};

export type ReadinessFallbackSuccess = Extract<StreamReadinessResult, { ok: true }> & {
  providerResponse: Response;
  finalBody: unknown;
};

export type ReadinessFallbackFailure = Extract<StreamReadinessResult, { ok: false }> & {
  providerResponse: Response;
  finalBody: unknown;
};

export type ReadinessFallbackOutcome = ReadinessFallbackSuccess | ReadinessFallbackFailure;

type RetryDispatch = { response?: Response; transformedBody?: unknown } | null;

type RetryLeg = {
  retryResult: RetryDispatch;
  retryResponse: Response | undefined;
  preparedOk: boolean;
  prepared: Response | null;
};

async function dispatchRetryLeg(
  args: Pick<
    ReadinessFallbackRequest,
    "currentModel" | "provider" | "model" | "log" | "executeProviderRequest"
  >
): Promise<RetryLeg> {
  const empty: RetryLeg = {
    retryResult: null,
    retryResponse: undefined,
    preparedOk: false,
    prepared: null,
  };
  let retryResult: RetryDispatch = null;
  try {
    retryResult = await args.executeProviderRequest(args.currentModel, false);
  } catch {
    return { ...empty, retryResult };
  }
  const retryResponse = retryResult?.response;
  if (!retryResponse) return { ...empty, retryResult };
  const prepared = await maybeConvertJsonBodyToSse(retryResponse, {
    log: args.log,
    provider: args.provider,
    model: args.model,
  });
  return { retryResult, retryResponse, preparedOk: prepared.ok, prepared };
}

async function checkRetriedBody(
  leg: RetryLeg,
  args: Pick<ReadinessFallbackRequest, "streamReadinessPolicy" | "provider" | "model" | "log">
): Promise<StreamReadinessResult | null> {
  if (!leg.preparedOk || !leg.prepared) return null;
  return ensureStreamReadiness(leg.prepared, {
    timeoutMs: args.streamReadinessPolicy.timeoutMs,
    maxTimeoutMs: args.streamReadinessPolicy.maxTimeoutMs,
    provider: args.provider,
    model: args.model,
    log: args.log,
  });
}

async function finishRetryLeg(
  leg: RetryLeg,
  ready: StreamReadinessResult | null,
  args: Pick<
    ReadinessFallbackRequest,
    | "failedReadiness"
    | "failedBody"
    | "finalBody"
    | "translatedBody"
    | "reqLogger"
    | "providerUrl"
    | "providerHeaders"
    | "providerRequestCapture"
  >
): Promise<ReadinessFallbackOutcome> {
  const fail = (
    readiness: StreamReadinessResult,
    response: Response,
    body: unknown
  ): ReadinessFallbackOutcome => ({ ...readiness, providerResponse: response, finalBody: body });
  const { retryResponse } = leg;

  if (!retryResponse?.ok || !retryResponse.body || !ready) {
    if (retryResponse) await retryResponse.body?.cancel().catch(() => {});
    return fail(args.failedReadiness, args.failedBody, args.finalBody);
  }
  if (ready.ok) {
    const nextBody = args.providerRequestCapture.body(
      (leg.retryResult?.transformedBody ?? args.translatedBody) as Record<string, unknown>
    );
    args.reqLogger.logTargetRequest(args.providerUrl, args.providerHeaders, nextBody);
    return { ...ready, providerResponse: ready.response, finalBody: nextBody };
  }
  await ready.response.body?.cancel().catch(() => {});
  return fail(ready, args.failedBody, args.finalBody);
}

export async function runReadinessFallback(
  args: ReadinessFallbackRequest
): Promise<ReadinessFallbackOutcome> {
  const fail = (
    readiness: StreamReadinessResult,
    response: Response,
    body: unknown
  ): ReadinessFallbackOutcome => ({ ...readiness, providerResponse: response, finalBody: body });

  if (args.failedReadiness.ok === true)
    return fail(args.failedReadiness, args.failedBody, args.finalBody);

  await args.failedBody.body?.cancel().catch(() => {});
  args.log?.warn?.(
    "STREAM",
    `readiness failed on connection ${args.failedConnectionId ?? "unknown"}, retrying once (${args.failedReadiness.code})`
  );
  const leg = await dispatchRetryLeg(args);
  const ready = await checkRetriedBody(leg, args);
  return finishRetryLeg(leg, ready, args);
}

export type ReadinessFallbackContext = {
  streamReadiness: StreamReadinessResult;
  clientAborted: boolean;
  failedConnectionId: string | null;
  failedBody: Response;
  currentModel: string;
  streamReadinessPolicy: { timeoutMs: number; maxTimeoutMs: number };
  provider: string | null | undefined;
  model: string | null | undefined;
  log?: LoggerLike;
  reqLogger: { logTargetRequest: (...args: unknown[]) => void };
  providerUrl: unknown;
  providerHeaders: unknown;
  finalBody: unknown;
  translatedBody: unknown;
  executeProviderRequest: (
    model: string,
    allowDedup: boolean
  ) => Promise<{ response?: Response; transformedBody?: unknown }>;
  providerRequestCapture: { body: (body: unknown) => unknown };
};

/**
 * Single call-site entry: no-op unless the flag is on, the first body stalled
 * and the client is still present. Returns the winning readiness, body, and
 * request payload.
 */
export async function maybeFallbackAfterReadiness(ctx: ReadinessFallbackContext): Promise<{
  readiness: StreamReadinessResult;
  providerResponse: Response;
  finalBody: unknown;
}> {
  if (!isStreamReadinessStallRetryEnabled()) {
    return {
      readiness: ctx.streamReadiness,
      providerResponse: ctx.failedBody,
      finalBody: ctx.finalBody,
    };
  }
  if (ctx.streamReadiness.ok === true || ctx.clientAborted) {
    return {
      readiness: ctx.streamReadiness,
      providerResponse: ctx.failedBody,
      finalBody: ctx.finalBody,
    };
  }
  const outcome = await runReadinessFallback({
    failedReadiness: ctx.streamReadiness,
    failedConnectionId: ctx.failedConnectionId,
    failedBody: ctx.failedBody,
    currentModel: ctx.currentModel,
    streamReadinessPolicy: ctx.streamReadinessPolicy,
    provider: ctx.provider,
    model: ctx.model,
    log: ctx.log,
    reqLogger: ctx.reqLogger,
    providerUrl: ctx.providerUrl,
    providerHeaders: ctx.providerHeaders,
    finalBody: ctx.finalBody,
    translatedBody: ctx.translatedBody,
    executeProviderRequest: ctx.executeProviderRequest,
    providerRequestCapture: ctx.providerRequestCapture,
  });
  return {
    readiness: outcome,
    providerResponse: outcome.providerResponse,
    finalBody: outcome.finalBody,
  };
}
