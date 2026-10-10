import { HTTP_STATUS } from "../../config/constants.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { isJsonObject } from "../../utils/kieTask.ts";
import { getConfiguredTimeout } from "@/shared/utils/fetchTimeout";
import { getUpstreamTimeoutConfig } from "@/shared/utils/runtimeTimeouts";
import { resolveConnectionTimeoutMs } from "../chatCore/upstreamTimeouts.ts";

type ImageFetchLog = {
  info?: (scope: string, message: string) => void;
  error?: (scope: string, message: string) => void;
  warn?: (scope: string, message: string) => void;
} | null;

type ImageFetchFailure = {
  success: false;
  status: number;
  error: unknown;
  data?: never;
};

type ImageFetchSuccess = {
  success: true;
  data: { created: unknown; data: unknown[] };
  status?: never;
  error?: never;
};

export type ImageFetchResult = ImageFetchFailure | ImageFetchSuccess;

function hasTimeoutEnvValue(env: Record<string, string | undefined>, name: string): boolean {
  const value = env[name];
  return value !== undefined && value.trim() !== "";
}

export function resolveImageGenerationTimeoutMs(
  providerSpecificData: unknown,
  env: Record<string, string | undefined> = process.env
): number {
  const connectionTimeoutMs = resolveConnectionTimeoutMs(providerSpecificData);
  if (connectionTimeoutMs !== undefined) return connectionTimeoutMs;

  const useLegacyDefault =
    !hasTimeoutEnvValue(env, "FETCH_TIMEOUT_MS") &&
    !hasTimeoutEnvValue(env, "REQUEST_TIMEOUT_MS") &&
    hasTimeoutEnvValue(env, "OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS");
  const timeoutEnv = useLegacyDefault
    ? { ...env, FETCH_TIMEOUT_MS: env.OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS }
    : env;
  return getUpstreamTimeoutConfig(timeoutEnv).fetchTimeoutMs;
}

function cancelledImageResult(provider: string, log: ImageFetchLog): ImageFetchFailure {
  log?.info?.("IMAGE", `${provider} image request cancelled by caller`);
  return {
    success: false,
    status: 499,
    error: "Image generation request cancelled",
  };
}

export async function fetchImageEndpoint(
  url: string,
  headers: Record<string, string>,
  body: BodyInit,
  provider: string,
  log: ImageFetchLog,
  options: { signal?: AbortSignal | null; timeoutMs?: number } = {}
): Promise<ImageFetchResult> {
  if (options.signal?.aborted) return cancelledImageResult(provider, log);

  const timeoutMs = options.timeoutMs ?? getConfiguredTimeout();
  const timeoutController = timeoutMs > 0 ? new AbortController() : null;
  let timedOut = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const abortFromCaller = () => timeoutController?.abort(options.signal?.reason);

  if (timeoutController) {
    options.signal?.addEventListener("abort", abortFromCaller, { once: true });
    timeoutId = globalThis.setTimeout(() => {
      timedOut = true;
      timeoutController.abort();
    }, timeoutMs);
    if (timeoutId && typeof timeoutId === "object" && "unref" in timeoutId) {
      timeoutId.unref?.();
    }
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
      ...(timeoutController
        ? { signal: timeoutController.signal }
        : options.signal
          ? { signal: options.signal }
          : {}),
    });

    if (options.signal?.aborted) return cancelledImageResult(provider, log);

    if (!response.ok) {
      const errorText = await response.text();
      if (options.signal?.aborted) return cancelledImageResult(provider, log);
      log?.error?.("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    if (options.signal?.aborted) return cancelledImageResult(provider, log);
    const items = Array.isArray(data?.data) ? data.data : [];
    const hasUsableImage = items.some(
      (item) =>
        isJsonObject(item) &&
        ((typeof item.b64_json === "string" && item.b64_json.length > 0) ||
          (typeof item.url === "string" && item.url.length > 0))
    );
    if (!hasUsableImage) {
      log?.warn?.(
        "IMAGE",
        `${provider} returned 200 without a usable image payload; treating as retryable 502`
      );
      return {
        success: false,
        status: HTTP_STATUS.BAD_GATEWAY,
        error: sanitizeErrorMessage(
          "Image provider returned a success status without an image payload"
        ),
      };
    }

    return {
      success: true,
      data: {
        created: data.created || Math.floor(Date.now() / 1000),
        data: items,
      },
    };
  } catch (error: unknown) {
    if (options.signal?.aborted) return cancelledImageResult(provider, log);
    const isAbortError =
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: unknown }).name === "AbortError";
    const message = timedOut
      ? `Image provider request timed out after ${timeoutMs}ms`
      : error instanceof Error
        ? error.message
        : String(error);
    log?.error?.("IMAGE", `${provider} fetch error: ${message}`);
    return {
      success: false,
      status: timedOut || isAbortError ? HTTP_STATUS.GATEWAY_TIMEOUT : HTTP_STATUS.BAD_GATEWAY,
      error: `Image provider error: ${sanitizeErrorMessage(message || error)}`,
    };
  } finally {
    if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    options.signal?.removeEventListener("abort", abortFromCaller);
  }
}
