import {
  EXECUTOR_CONTRACT_VIOLATION_CODE,
  FETCH_TIMEOUT_MS,
  HTTP_STATUS,
} from "../../config/constants.ts";
import { getModelTimeoutMs } from "../../config/providerModels.ts";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getReasoningTokens,
} from "@/lib/usage/tokenAccounting";
import { MAX_PROVIDER_SPECIFIC_TIMEOUT_MS } from "@/shared/validation/providerSpecificData";

export function createBodyTimeoutError(timeoutMs: number): Error {
  const err = new Error(`Response body read timeout after ${timeoutMs}ms`);
  err.name = "BodyTimeoutError";
  return err;
}

export function readStreamChunkWithTimeout(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  timeoutMs: number
): Promise<{ done: boolean; value?: Uint8Array }> {
  if (timeoutMs <= 0) return reader.read();

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(createBodyTimeoutError(timeoutMs)), timeoutMs);
    reader.read().then(
      (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    );
  });
}

export function createUpstreamStartTimeoutError(
  timeoutMs: number,
  provider: string,
  model: string
): Error {
  const err = new Error(
    `Upstream request did not return response headers after ${timeoutMs}ms (${provider}/${model})`
  );
  err.name = "TimeoutError";
  return err;
}

export function createAbortError(signal: AbortSignal): Error {
  const reason = signal.reason;
  if (reason instanceof Error) return reason;
  const err = new Error(typeof reason === "string" ? reason : "The operation was aborted");
  err.name = "AbortError";
  return err;
}

/** Billable token total — mirrors the columns persisted by saveRequestUsage so the
 *  live token-limit counter stays consistent with usage_history seed-on-miss. */
export function computeBillableTokens(usage: unknown): number {
  // Cache read/creation tokens are a BREAKDOWN already contained inside
  // getLoggedInputTokens (prompt_tokens / input_tokens). Adding them here would
  // double-count. Canonical billable total = input + output + reasoning, matching
  // the columns persisted by saveRequestUsage and seedWindowUsageFromHistory.
  return getLoggedInputTokens(usage) + getLoggedOutputTokens(usage) + getReasoningTokens(usage);
}

/** Resolves the model-level `timeoutMs` registry override, when both
 *  `provider` and `model` are known and the model registers one (#6354). */
function resolveModelTimeoutOverride(provider?: string, model?: string): number | undefined {
  if (!provider || !model) return undefined;
  const override = getModelTimeoutMs(provider, model);
  if (typeof override !== "number" || !Number.isFinite(override)) return undefined;
  return Math.max(0, Math.floor(override));
}

function resolveProviderTimeoutMs(executor: unknown): number {
  const getTimeoutMs = (executor as { getTimeoutMs?: () => unknown } | null)?.getTimeoutMs;
  if (typeof getTimeoutMs !== "function") return FETCH_TIMEOUT_MS;

  try {
    const timeoutMs = getTimeoutMs.call(executor);
    if (typeof timeoutMs !== "number" || !Number.isFinite(timeoutMs)) return FETCH_TIMEOUT_MS;
    return Math.max(0, Math.floor(timeoutMs));
  } catch {
    return FETCH_TIMEOUT_MS;
  }
}

/** Per-connection operator timeout tier: reads
 *  `providerSpecificData.timeoutMs`, bounded to 1..86_400_000 ms.
 *  Returns undefined when absent or invalid so the chain falls through. */
export function resolveConnectionTimeoutMs(psd: unknown): number | undefined {
  const timeoutMs = (psd as Record<string, unknown> | null | undefined)?.timeoutMs;
  if (typeof timeoutMs !== "number" || !Number.isFinite(timeoutMs)) return undefined;
  const floored = Math.floor(timeoutMs);
  if (floored < 1 || floored > MAX_PROVIDER_SPECIFIC_TIMEOUT_MS) return undefined;
  return floored;
}

/**
 * Resolves the upstream header-response timeout in precedence order:
 * connection-level override (`providerSpecificData.timeoutMs`) →
 * model-level override (registry `RegistryModel.timeoutMs`) → provider-level
 * override (`executor.getTimeoutMs()`) → global `FETCH_TIMEOUT_MS` default.
 * `provider`/`model` are optional so existing single-argument call sites
 * keep resolving to the provider/global chain unchanged (#6354).
 */
export function getExecutorTimeoutMs(
  executor: unknown,
  provider?: string,
  model?: string,
  connectionTimeoutMs?: number
): number {
  if (
    typeof connectionTimeoutMs === "number" &&
    Number.isFinite(connectionTimeoutMs) &&
    connectionTimeoutMs > 0
  ) {
    // Defensive backstop for direct callers: resolveConnectionTimeoutMs is the
    // gate (it rejects out-of-range values so the chain falls through); this
    // clamp only caps values a future caller could pass unvetted.
    return Math.min(Math.max(0, Math.floor(connectionTimeoutMs)), MAX_PROVIDER_SPECIFIC_TIMEOUT_MS);
  }
  const modelOverride = resolveModelTimeoutOverride(provider, model);
  if (modelOverride !== undefined) return modelOverride;
  return resolveProviderTimeoutMs(executor);
}

/**
 * Cross-realm Response detection (#10360).
 *
 * `instanceof Response` is a NOMINAL check against `globalThis.Response`, and
 * OmniRoute's default egress does not use the global one: `proxyFetch.ts`
 * dispatches through the npm `undici` package's `fetch`, whose `Response` is a
 * different class from the Node built-in. A bare `instanceof` therefore
 * rejected virtually every real upstream response as a "contract violation".
 *
 * Accept the built-in fast path first, then fall back to a structural probe:
 * the `Symbol.toStringTag` brand plus the members the pipeline actually reads
 * (`status`/`ok`/`headers.get`/`text`/`clone`). A plain `{ status, ok }` bag
 * still fails, so the guard keeps its value.
 */
export function isResponseLike(value: unknown): value is Response {
  if (value instanceof Response) return true;
  if (!value || typeof value !== "object") return false;
  const candidate = value as {
    status?: unknown;
    ok?: unknown;
    headers?: { get?: unknown } | null;
    text?: unknown;
    clone?: unknown;
  };
  return (
    Object.prototype.toString.call(value) === "[object Response]" &&
    typeof candidate.status === "number" &&
    typeof candidate.ok === "boolean" &&
    !!candidate.headers &&
    typeof candidate.headers.get === "function" &&
    typeof candidate.text === "function" &&
    typeof candidate.clone === "function"
  );
}

/**
 * Builds the terminal error thrown on a genuine contract violation (#10360).
 *
 * Carries `status = 500` and `code = EXECUTOR_CONTRACT_VIOLATION_CODE` so the
 * failure is classified as an INTERNAL, non-retryable defect instead of falling
 * through chatCore's `BAD_GATEWAY` default. A 502 made every layer treat our own
 * bug as a flaky provider: the connection was cooled down as "rate limited", the
 * provider breaker counted it, and the batch runner (which retries 429/502/504)
 * span for its full 24h window on an error that can never resolve itself.
 */
export function createExecutorContractError(): Error & { status: number; code: string } {
  const err = new TypeError("Executor result must contain a Response") as TypeError & {
    status: number;
    code: string;
  };
  err.name = "ExecutorContractError";
  err.status = HTTP_STATUS.SERVER_ERROR;
  err.code = EXECUTOR_CONTRACT_VIOLATION_CODE;
  return err;
}

export function normalizeExecutorResult(result: unknown): {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
  transport?: string;
} {
  if (isResponseLike(result)) {
    return { response: result, url: "", headers: {}, transformedBody: null };
  }
  if (
    !result ||
    typeof result !== "object" ||
    !("response" in result) ||
    !isResponseLike(result.response)
  ) {
    throw createExecutorContractError();
  }
  const normalized = result as {
    response: Response;
    url?: string;
    headers?: Record<string, string>;
    transformedBody?: unknown;
    transport?: string;
  };
  return {
    response: normalized.response,
    url: normalized.url || "",
    headers: normalized.headers || {},
    transformedBody: normalized.transformedBody ?? null,
    transport: normalized.transport,
  };
}

export async function executeWithUpstreamStartTimeout<T>({
  executor,
  provider,
  model,
  connectionTimeoutMs,
  signal,
  log,
  execute,
}: {
  executor: unknown;
  provider: string;
  model: string;
  connectionTimeoutMs?: number;
  signal: AbortSignal;
  log?: { warn?: (tag: string, message: string) => void } | null;
  execute: (signal: AbortSignal) => Promise<T>;
}): Promise<T> {
  const timeoutMs = getExecutorTimeoutMs(executor, provider, model, connectionTimeoutMs);
  if (timeoutMs <= 0) return execute(signal);
  if (signal.aborted) throw createAbortError(signal);

  const timeoutController = new AbortController();
  const combinedController = new AbortController();
  const timeoutError = createUpstreamStartTimeoutError(timeoutMs, provider, model);

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let abortListener: (() => void) | null = null;
  let timeoutAbortListener: (() => void) | null = null;

  const abortCombined = (source: AbortSignal) => {
    if (combinedController.signal.aborted) return;
    const reason = source.reason instanceof Error ? source.reason : createAbortError(source);
    combinedController.abort(reason);
  };

  abortListener = () => abortCombined(signal);
  timeoutAbortListener = () => abortCombined(timeoutController.signal);
  signal.addEventListener("abort", abortListener, { once: true });
  timeoutController.signal.addEventListener("abort", timeoutAbortListener, { once: true });

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      log?.warn?.("TIMEOUT", timeoutError.message);
      timeoutController.abort(timeoutError);
      reject(timeoutError);
    }, timeoutMs);
  });

  let abortPromiseListener: (() => void) | null = null;
  const abortPromise = new Promise<never>((_, reject) => {
    abortPromiseListener = () => reject(createAbortError(signal));
    signal.addEventListener("abort", abortPromiseListener, { once: true });
  });
  // Promise.race only subscribes to timeoutPromise/abortPromise once the array
  // literal below has been evaluated. If execute() throws synchronously the race
  // never runs, both promises are orphaned, and a later abort of the long-lived
  // client signal surfaces as an unhandledRejection. That was the 2026-08-31
  // production exit: a hedge sibling won after a client disconnect, the leaked
  // listener below rebuilt the string reason as an AbortError, and nothing was
  // awaiting the promise it rejected. Marking them handled keeps the race
  // semantics (it still observes the rejections) while closing that path.
  abortPromise.catch(() => {});
  timeoutPromise.catch(() => {});

  try {
    return await Promise.race([execute(combinedController.signal), timeoutPromise, abortPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    if (abortListener) signal.removeEventListener("abort", abortListener);
    // Never removed before this fix: one listener leaked onto the client signal
    // per call (chatCore.ts invokes this once per executor attempt, plus retries).
    if (abortPromiseListener) signal.removeEventListener("abort", abortPromiseListener);
    if (timeoutAbortListener) {
      timeoutController.signal.removeEventListener("abort", timeoutAbortListener);
    }
  }
}
