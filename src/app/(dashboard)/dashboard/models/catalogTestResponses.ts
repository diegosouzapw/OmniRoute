import {
  classifyError,
  getComboTestKey,
  getModelTestKey,
  normalizeTestStatus,
  type CatalogTestErrorClass,
  type CatalogTestResult,
} from "./catalogTestStorage";
import type { ModelTestBatch } from "./catalogBulkUtils";

/** Status of the HTTP exchange; a `Response` satisfies it. */
export interface HttpOutcome {
  ok: boolean;
  status: number;
}

/** `POST /api/models/test` body. */
export interface SingleModelTestResponse {
  status?: unknown;
  latencyMs?: unknown;
  error?: unknown;
  statusCode?: unknown;
  rateLimited?: unknown;
}

/** `POST /api/models/test-all` body; `results` omits models the server never tested. */
export interface BatchModelTestResponse {
  results?: unknown;
  stoppedEarly?: unknown;
  stopReason?: unknown;
  error?: unknown;
}

/** `POST /api/combos/test` body. */
export interface ComboTestResponse {
  resolvedBy?: unknown;
  results?: unknown;
  error?: unknown;
}

export type RequestTarget =
  | { targetType: "model"; providerId: string; modelId: string }
  | { targetType: "combo"; comboName: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/** The routes return sanitized error text either as a string or as `{ message }`. */
export function extractErrorText(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() ? value : undefined;
  if (isRecord(value) && typeof value.message === "string" && value.message.trim()) {
    return value.message;
  }
  return undefined;
}

function failureClass(
  error: string | undefined,
  statusCode?: number,
  flags?: { rateLimited?: boolean; isQuota?: boolean; isTimeout?: boolean }
): CatalogTestErrorClass {
  return classifyError(error, statusCode, flags) ?? "other";
}

/** Parse a JSON body; anything that is not a JSON object becomes `{}`. */
export async function readJsonBody<T extends object>(res: {
  json: () => Promise<unknown>;
}): Promise<T> {
  try {
    const data = await res.json();
    return (isRecord(data) ? data : {}) as T;
  } catch {
    return {} as T;
  }
}

export function mapSingleModelResponse(
  providerId: string,
  modelId: string,
  http: HttpOutcome,
  body: SingleModelTestResponse,
  testedAt: number
): CatalogTestResult {
  const latencyMs = asNumber(body.latencyMs);
  const statusCode = asNumber(body.statusCode) ?? http.status;
  const status = normalizeTestStatus(
    typeof body.status === "string" ? body.status : http.ok ? "ok" : "error",
    latencyMs
  );
  const error = status === "error" ? extractErrorText(body.error) : undefined;
  return {
    id: getModelTestKey(providerId, modelId),
    targetType: "model",
    providerId,
    modelId,
    status,
    latencyMs,
    testedAt,
    error,
    errorClass:
      status === "error"
        ? failureClass(error, statusCode, { rateLimited: body.rateLimited === true })
        : undefined,
    statusCode,
  };
}

/**
 * A failed request marks every model of the batch as failed. A successful one only yields
 * results for the models the server reported: when it stops early (e.g. consecutive rate
 * limits) the rest were never tested and must stay untested rather than look broken.
 */
export function mapBatchResponse(
  batch: ModelTestBatch,
  http: HttpOutcome,
  body: BatchModelTestResponse,
  testedAt: number
): CatalogTestResult[] {
  const base = (modelId: string) => ({
    id: getModelTestKey(batch.providerId, modelId),
    targetType: "model" as const,
    providerId: batch.providerId,
    modelId,
    testedAt,
  });

  if (!http.ok) {
    const error = extractErrorText(body.error);
    const errorClass = failureClass(error, http.status);
    return batch.modelIds.map((modelId) => ({
      ...base(modelId),
      status: "error" as const,
      error,
      errorClass,
      statusCode: http.status,
    }));
  }

  const results = isRecord(body.results) ? body.results : {};
  return batch.modelIds.flatMap((modelId): CatalogTestResult[] => {
    const entry = results[modelId];
    if (!isRecord(entry)) return [];
    const latencyMs = asNumber(entry.latencyMs);
    const statusCode = asNumber(entry.statusCode);
    const isTimeout = entry.isTimeout === true || entry.status === "slow";
    const status = isTimeout
      ? "error"
      : normalizeTestStatus(typeof entry.status === "string" ? entry.status : "error", latencyMs);
    const error = status === "error" ? extractErrorText(entry.error) : undefined;
    return [
      {
        ...base(modelId),
        status,
        latencyMs,
        error,
        errorClass:
          status === "error"
            ? failureClass(error, statusCode, {
                rateLimited: entry.rateLimited === true,
                isQuota: entry.isQuota === true,
                isTimeout,
              })
            : undefined,
        statusCode,
      },
    ];
  });
}

export function mapComboResponse(
  comboName: string,
  http: HttpOutcome,
  body: ComboTestResponse,
  testedAt: number
): CatalogTestResult {
  const results = Array.isArray(body.results) ? body.results.filter(isRecord) : [];
  const okResult = results.find((result) => result.status === "ok");
  const resolved = http.ok && (Boolean(body.resolvedBy) || okResult !== undefined);
  const latencyMs = asNumber(okResult?.latencyMs) ?? asNumber(results[0]?.latencyMs);
  const statusCode =
    asNumber(okResult?.statusCode) ?? asNumber(results[0]?.statusCode) ?? http.status;
  const status = resolved ? normalizeTestStatus("ok", latencyMs) : "error";
  // No English fallback here: the badge renders a translated message when `error` is absent.
  const error =
    status === "error"
      ? (results.map((result) => extractErrorText(result.error)).find(Boolean) ??
        extractErrorText(body.error))
      : undefined;

  return {
    id: getComboTestKey(comboName),
    targetType: "combo",
    comboName,
    status,
    latencyMs,
    testedAt,
    error,
    errorClass: status === "error" ? failureClass(error, statusCode) : undefined,
    statusCode,
  };
}

/** The request itself failed (network error) before the API could answer. */
export function mapRequestFailure(
  target: RequestTarget,
  failure: unknown,
  testedAt: number
): CatalogTestResult {
  const error =
    failure instanceof Error ? failure.message : typeof failure === "string" ? failure : undefined;
  const common = { status: "error" as const, testedAt, error, errorClass: failureClass(error) };
  if (target.targetType === "combo") {
    return {
      id: getComboTestKey(target.comboName),
      targetType: "combo",
      comboName: target.comboName,
      ...common,
    };
  }
  return {
    id: getModelTestKey(target.providerId, target.modelId),
    targetType: "model",
    providerId: target.providerId,
    modelId: target.modelId,
    ...common,
  };
}
