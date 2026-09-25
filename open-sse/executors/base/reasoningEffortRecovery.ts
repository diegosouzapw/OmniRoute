// #14629 — the reactive reasoning_effort 400/422 clamp-and-retry chain,
// extracted from BaseExecutor.execute() (base.ts) into a standalone, callable
// helper so executors that override execute() without calling super.execute()
// (the majority of open-sse/executors/*.ts) can still reach it. Behavior is
// unchanged from the inline block it replaces in BaseExecutor: parse the
// upstream-advertised accepted reasoning_effort values from a 4xx body,
// record them process-wide via recordLearnedReasoningEffort (so FUTURE
// requests clamp proactively via sanitizeReasoningEffortForProvider →
// getLearnedReasoningEffort), clamp the live request body by re-running the
// sanitizer, and retry the SAME url once.
import { HTTP_STATUS } from "../../config/constants.ts";
import {
  parseReasoningEffortEnum,
  recordLearnedReasoningEffort,
} from "../../services/learnedReasoningEffortCaps.ts";
import { sanitizeReasoningEffortForProvider } from "./reasoningEffort.ts";

type ReasoningRecoveryLog = {
  info?: (tag: string, message: string) => void;
} | null;

export interface ReasoningEffortRecoveryParams {
  /** The just-received upstream response for the request about to be checked. */
  response: Response;
  /** The URL the request was sent to (used for the retry and for logging). */
  url: string;
  provider: string;
  model: string | undefined;
  /** The request body that was sent (and, on clamp, the body to retry with). */
  body: unknown;
  /** Base fetch options; `body` is overwritten with the clamped, serialized body. */
  fetchOptions: RequestInit;
  /** Performs the retry fetch — pass the same wrapped fetch the caller used. */
  fetchFn: (url: string, options: RequestInit) => Promise<Response>;
  /** Optional: serialize the clamped body before retrying (defaults to JSON.stringify). */
  serializeBody?: (body: unknown) => string | Promise<string>;
  log?: ReasoningRecoveryLog;
}

export interface ReasoningEffortRecoveryResult {
  /** The response to use going forward — the retry's response when a retry happened. */
  response: Response;
  /** The (possibly clamped) body — pass this along so callers keep it in sync. */
  body: unknown;
  /** True when a retry was actually issued. */
  retried: boolean;
  /**
   * True as soon as the error body named a recognized reasoning_effort enum,
   * even when no retry followed (e.g. the clamp was a no-op). Callers that
   * gate a single attempt per response chain (matching BaseExecutor's
   * `reasoningEffortClamped` flag) should stop trying once this is true.
   */
  attempted: boolean;
}

/**
 * Detect an upstream 400/422 naming a rejected reasoning_effort enum, clamp
 * the body to the nearest accepted value, and retry the same URL once.
 * Returns the original response/body unchanged (retried: false) when the
 * response isn't a recoverable reasoning_effort rejection.
 */
export async function applyReasoningEffortRecovery(
  params: ReasoningEffortRecoveryParams
): Promise<ReasoningEffortRecoveryResult> {
  const { response, url, provider, model, fetchOptions, fetchFn, log } = params;
  let body = params.body;

  const notRecoverable = { response, body, retried: false as const, attempted: false as const };

  if (
    response.status !== HTTP_STATUS.BAD_REQUEST &&
    response.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY
  ) {
    return notRecoverable;
  }
  if (!body || typeof body !== "object") {
    return notRecoverable;
  }

  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  const acceptedValues = parseReasoningEffortEnum(errText);
  if (!acceptedValues) {
    return notRecoverable;
  }

  const learned = recordLearnedReasoningEffort(provider, model as string, acceptedValues);
  if (!learned || learned.size === 0) {
    return { response, body, retried: false, attempted: true };
  }

  const beforeRetry = JSON.stringify(body);
  const clampedBody = sanitizeReasoningEffortForProvider(body, provider, model, log ?? undefined);
  const afterRetry = JSON.stringify(clampedBody);
  if (beforeRetry === afterRetry) {
    log?.info?.(
      "REASONING_SANITIZE",
      `Upstream ${response.status} rejected reasoning_effort on ${url} — learned ${[...learned].join(",")} but clamp was no-op for ${provider}/${model}, not retrying`
    );
    return { response, body: clampedBody, retried: false, attempted: true };
  }

  const serialize = params.serializeBody ?? ((b: unknown) => JSON.stringify(b));
  const retryBody = await serialize(clampedBody);
  log?.info?.(
    "REASONING_SANITIZE",
    `Upstream ${response.status} rejected reasoning_effort on ${url} — clamped to ${[...learned].join(",")} and retrying (learned for ${provider}/${model})`
  );
  const retriedResponse = await fetchFn(url, { ...fetchOptions, body: retryBody });
  return { response: retriedResponse, body: clampedBody, retried: true, attempted: true };
}
