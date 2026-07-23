import { FETCH_TIMEOUT_MS } from "../../config/constants.ts";
import { getModelTimeoutMs } from "../../config/providerModels.ts";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getReasoningTokens,
} from "@/lib/usage/tokenAccounting";

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

/**
 * Resolves the upstream header-response timeout in precedence order:
 * model-level override (registry `RegistryModel.timeoutMs`) → provider-level
 * override (`executor.getTimeoutMs()`) → global `FETCH_TIMEOUT_MS` default.
 * `provider`/`model` are optional so existing single-argument call sites
 * keep resolving to the provider/global chain unchanged (#6354).
 */
export function getExecutorTimeoutMs(executor: unknown, provider?: string, model?: string): number {
  const modelOverride = resolveModelTimeoutOverride(provider, model);
  if (modelOverride !== undefined) return modelOverride;
  return resolveProviderTimeoutMs(executor);
}

export function normalizeExecutorResult(
  result:
    | Response
    | {
        response: Response;
        url?: string;
        headers?: Record<string, string>;
        transformedBody?: unknown;
      }
): { response: Response; url: string; headers: Record<string, string>; transformedBody: unknown } {
  if (result instanceof Response) {
    return { response: result, url: "", headers: {}, transformedBody: null };
  }
  return {
    response: result.response,
    url: result.url || "",
    headers: result.headers || {},
    transformedBody: result.transformedBody ?? null,
  };
}

export async function executeWithUpstreamStartTimeout<T>({
  executor,
  provider,
  model,
  signal,
  log,
  execute,
}: {
  executor: unknown;
  provider: string;
  model: string;
  signal: AbortSignal;
  log?: { warn?: (tag: string, message: string) => void } | null;
  execute: (signal: AbortSignal) => Promise<T>;
}): Promise<T> {
  const timeoutMs = getExecutorTimeoutMs(executor, provider, model);
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

  const abortPromise = new Promise<never>((_, reject) => {
    signal.addEventListener("abort", () => reject(createAbortError(signal)), { once: true });
  });

  try {
    return await Promise.race([execute(combinedController.signal), timeoutPromise, abortPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    if (abortListener) signal.removeEventListener("abort", abortListener);
    if (timeoutAbortListener) {
      timeoutController.signal.removeEventListener("abort", timeoutAbortListener);
    }
  }
}
