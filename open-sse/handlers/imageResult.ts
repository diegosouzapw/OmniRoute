import { saveCallLog } from "@/lib/usageDb";
import { stringifyImageErrorForLog } from "./imageErrorLog.ts";

export function saveImageSuccessResult({
  provider,
  model,
  startTime,
  requestBody = null,
  responseBody = null,
  created = null,
  images,
  path = "/v1/images/generations",
}) {
  saveCallLog({
    method: "POST",
    path,
    status: 200,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    requestBody,
    responseBody,
  }).catch(() => {});

  return {
    success: true,
    data: {
      created: created || Math.floor(Date.now() / 1000),
      data: images,
    },
  };
}

export function saveImageErrorResult({
  provider,
  model,
  status,
  startTime,
  error,
  requestBody = null,
  path = "/v1/images/generations",
  // #8307: opt-in signal for executeImageWithCredentialFallback — set by a
  // provider handler when the failure is account/session-specific (expired
  // or blocked credentials) rather than a generic request/provider error, so
  // the retry loop tries the next eligible account even when the upstream
  // status isn't a plain 401. Defaults to unset (existing 401-only behavior
  // for every other provider is unchanged).
  retryable = undefined,
}: {
  provider: string;
  model: string;
  status: number;
  startTime: number;
  error: unknown;
  requestBody?: unknown;
  path?: string;
  retryable?: boolean;
}) {
  saveCallLog({
    method: "POST",
    path,
    status,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: stringifyImageErrorForLog(error).slice(0, 500),
    requestBody,
  }).catch(() => {});

  return {
    success: false,
    status,
    error,
    ...(retryable !== undefined ? { retryable } : {}),
  };
}
