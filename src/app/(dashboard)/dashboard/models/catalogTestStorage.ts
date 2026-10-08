export const CATALOG_TEST_RESULTS_STORAGE_NAME = "omniroute.catalogTestResults.v1";
export const MAX_TEST_RESULTS_CAP = 2000;

export type CatalogTestStatus = "ok" | "slow" | "error";
export type CatalogTestErrorClass = "rate-limited" | "quota" | "timeout" | "other";

export interface CatalogTestResult {
  id: string;
  targetType: "model" | "combo";
  providerId?: string;
  modelId?: string;
  comboName?: string;
  status: CatalogTestStatus;
  latencyMs?: number;
  testedAt: number;
  error?: string;
  errorClass?: CatalogTestErrorClass;
  statusCode?: number;
}

export function getModelTestKey(providerId: string, modelId: string): string {
  return `model:${providerId}:${modelId}`;
}

export function getComboTestKey(comboName: string): string {
  return `combo:${comboName}`;
}

type CatalogTestErrorFlags = { rateLimited?: boolean; isQuota?: boolean; isTimeout?: boolean };

function isRateLimitError(text: string, statusCode?: number, flags?: CatalogTestErrorFlags) {
  return Boolean(flags?.rateLimited) || statusCode === 429 || /rate.?limit|429/i.test(text);
}

function isQuotaError(text: string, flags?: CatalogTestErrorFlags) {
  return (
    Boolean(flags?.isQuota) || /quota|insufficient balance|credit|billing|exhausted/i.test(text)
  );
}

function isTimeoutError(text: string, statusCode?: number, flags?: CatalogTestErrorFlags) {
  return (
    Boolean(flags?.isTimeout) ||
    statusCode === 408 ||
    statusCode === 504 ||
    /timeout|timed out|abort/i.test(text)
  );
}

export function classifyError(
  error?: string,
  statusCode?: number,
  flags?: CatalogTestErrorFlags
): CatalogTestErrorClass | undefined {
  const text = error ?? "";
  if (isRateLimitError(text, statusCode, flags)) {
    return "rate-limited";
  }
  if (isQuotaError(text, flags)) {
    return "quota";
  }
  if (isTimeoutError(text, statusCode, flags)) {
    return "timeout";
  }
  if (error || statusCode) {
    return "other";
  }
  return undefined;
}

export function normalizeTestStatus(status: string, latencyMs?: number): CatalogTestStatus {
  if (status === "slow") return "slow";
  if (status === "ok") {
    if (typeof latencyMs === "number" && latencyMs >= 5000) {
      return "slow";
    }
    return "ok";
  }
  return "error";
}

export function capTestResults(
  results: Record<string, CatalogTestResult>,
  max = MAX_TEST_RESULTS_CAP
): Record<string, CatalogTestResult> {
  const entries = Object.entries(results);
  if (entries.length <= max) return results;

  // Keep newest entries first
  entries.sort(([, a], [, b]) => (b.testedAt || 0) - (a.testedAt || 0));
  const capped: Record<string, CatalogTestResult> = {};
  for (let index = 0; index < max; index++) {
    capped[entries[index][0]] = entries[index][1];
  }
  return capped;
}

function isPlainObject(value: unknown): value is object {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/** A stored entry survives only with a string status and a timestamp `Date` can represent. */
function isStoredTestResult(value: unknown): value is CatalogTestResult {
  return (
    isPlainObject(value) &&
    "status" in value &&
    typeof (value as { status: unknown }).status === "string" &&
    "testedAt" in value &&
    typeof value.testedAt === "number" &&
    Number.isFinite(value.testedAt) &&
    Math.abs(value.testedAt) <= 8.64e15
  );
}

function keepStoredTestResults(parsed: object): Record<string, CatalogTestResult> {
  const sanitized: Record<string, CatalogTestResult> = {};
  for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (isStoredTestResult(value)) {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export function loadCatalogTestResults(): Record<string, CatalogTestResult> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage?.getItem(CATALOG_TEST_RESULTS_STORAGE_NAME);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainObject(parsed)) {
      return {};
    }
    return keepStoredTestResults(parsed);
  } catch {
    return {};
  }
}

export function saveCatalogTestResults(
  results: Record<string, CatalogTestResult>
): Record<string, CatalogTestResult> {
  const capped = capTestResults(results);
  if (typeof window !== "undefined") {
    try {
      window.localStorage?.setItem(CATALOG_TEST_RESULTS_STORAGE_NAME, JSON.stringify(capped));
    } catch {
      // Ignore quota errors or storage restrictions
    }
  }
  return capped;
}

export function saveSingleTestResult(result: CatalogTestResult): Record<string, CatalogTestResult> {
  const current = loadCatalogTestResults();
  current[result.id] = result;
  return saveCatalogTestResults(current);
}

export function saveBatchTestResults(
  results: CatalogTestResult[]
): Record<string, CatalogTestResult> {
  const current = loadCatalogTestResults();
  for (const result of results) {
    current[result.id] = result;
  }
  return saveCatalogTestResults(current);
}

export function clearCatalogTestResults(): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage?.removeItem(CATALOG_TEST_RESULTS_STORAGE_NAME);
    } catch {
      // Ignore
    }
  }
}
