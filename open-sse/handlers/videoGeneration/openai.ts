import {
  fetchWithTimeout,
  FetchTimeoutError,
  getConfiguredTimeout,
} from "@/shared/utils/fetchTimeout";
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";

interface LogLike {
  info?: (tag: string, msg: string, meta?: unknown) => void;
  error?: (tag: string, msg: string) => void;
}

interface CredentialsLike {
  providerSpecificData?: { baseUrl?: unknown } | null;
  baseUrl?: unknown;
  apiKey?: unknown;
  accessToken?: unknown;
}

/**
 * Resolve the video generation endpoint URL from credentials and fallback.
 * Handles baseUrl from providerSpecificData or top-level credentials.
 */
function resolveVideoEndpoint(credentials: unknown, fallback: string): string {
  const creds = credentials as CredentialsLike | null | undefined;
  const psdBaseUrl =
    creds?.providerSpecificData?.baseUrl != null &&
    typeof creds.providerSpecificData.baseUrl === "string" &&
    creds.providerSpecificData.baseUrl.trim()
      ? creds.providerSpecificData.baseUrl.trim()
      : null;
  const topLevelBaseUrl =
    creds?.baseUrl != null && typeof creds.baseUrl === "string" && creds.baseUrl.trim()
      ? creds.baseUrl.trim()
      : null;
  const nodeBaseUrl = psdBaseUrl || topLevelBaseUrl;
  // Узел своего адреса может не иметь — у встроенных провайдеров его и не
  // бывает. Тогда работает `fallback`: это готовый endpoint из реестра, а не
  // корень, поэтому путь к нему не дописывается (у nanogpt адрес оканчивается
  // на /video/generations — в единственном числе).
  if (!nodeBaseUrl) return fallback;
  let n = nodeBaseUrl;
  while (n.endsWith("/")) n = n.slice(0, -1);
  if (n.endsWith("/videos/generations")) return n;
  return `${n}/videos/generations`;
}

/**
 * Fetch the video generation endpoint with timeout and error handling.
 */
async function fetchVideoEndpoint(
  url: string,
  { headers, body, log }: { headers: Record<string, string>; body: string; log?: LogLike }
) {
  try {
    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers,
      body,
      timeoutMs: getConfiguredTimeout(),
    });
    if (!response.ok) {
      const errorText = await response.text();
      log?.error?.("VIDEO", `Upstream ${response.status} for ${url}: ${errorText}`);
      return { success: false, status: response.status, error: errorText };
    }
    const data = await response.json();
    return {
      success: true,
      data: { created: data.created || Math.floor(Date.now() / 1000), data: data.data || [] },
    };
  } catch (err) {
    const message = err?.message;
    const isTimeout = err instanceof FetchTimeoutError || err?.name === "AbortError";
    log?.error?.(
      "VIDEO",
      `${isTimeout ? "Timeout" : "Request error"} for ${url}: ${sanitizeErrorMessage(message || err)}`
    );
    return {
      success: false,
      status: isTimeout ? 504 : 502,
      error: `Video provider error: ${sanitizeErrorMessage(message || err)}`,
    };
  }
}

/**
 * Handle OpenAI-compatible video generation.
 * This handler is dispatched for custom providers with format "openai-video".
 */
export async function handleOpenAIVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string; authHeader: string };
  body: unknown;
  credentials: unknown;
  log?: LogLike;
}) {
  const startTime = Date.now();
  const creds = credentials as CredentialsLike | null | undefined;
  const apiToken = creds?.apiKey || creds?.accessToken;
  const endpoint = resolveVideoEndpoint(credentials, providerConfig.baseUrl);
  const headers = {
    "Content-Type": "application/json",
    ...(providerConfig.authHeader === "x-api-key"
      ? { "x-api-key": String(apiToken) }
      : { Authorization: `Bearer ${apiToken}` }),
  };
  const bodyObj = body as Record<string, unknown>;
  const upstreamBody = {
    model,
    prompt: (bodyObj.prompt ?? "") as string,
    ...(typeof bodyObj.duration === "number" && { duration: bodyObj.duration }),
  };
  const logRequestBody = {
    model: bodyObj.model,
    prompt:
      typeof bodyObj.prompt === "string"
        ? bodyObj.prompt.slice(0, 200)
        : String(bodyObj.prompt ?? ""),
    duration: bodyObj.duration,
  };
  log?.info?.("VIDEO", `OpenAI-compatible video generation: ${provider}/${model} -> ${endpoint}`, {
    body: logRequestBody,
  });

  const fetchResult = await fetchVideoEndpoint(endpoint, {
    headers,
    body: JSON.stringify(upstreamBody),
    log,
  });

  if (!fetchResult.success) {
    return { success: false, status: fetchResult.status, error: fetchResult.error };
  }

  // Save call log for billing/tracking
  await saveCallLog({
    provider,
    model: String(bodyObj.model),
    endpoint: "video",
    status: fetchResult.status,
    durationMs: Date.now() - startTime,
    tokensIn: 0,
    tokensOut: 0,
    requestId: null,
  });

  return {
    success: true,
    data: fetchResult.data,
  };
}
