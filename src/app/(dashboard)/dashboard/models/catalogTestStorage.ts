export const CATALOG_TEST_RESULTS_KEY = "omniroute.catalogTestResults.v1";
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

export function classifyError(
  error?: string,
  statusCode?: number,
  flags?: { rateLimited?: boolean; isQuota?: boolean; isTimeout?: boolean }
): CatalogTestErrorClass | undefined {
  if (flags?.rateLimited || statusCode === 429 || /rate.?limit|429/i.test(error ?? "")) {
    return "rate-limited";
  }
  if (flags?.isQuota || /quota|insufficient balance|credit|billing|exhausted/i.test(error ?? "")) {
    return "quota";
  }
  if (
    flags?.isTimeout ||
    statusCode === 408 ||
    statusCode === 504 ||
    /timeout|timed out|abort/i.test(error ?? "")
  ) {
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

export function loadCatalogTestResults(): Record<string, CatalogTestResult> {
  if (typeof window === "undefined" || !window.localStorage) {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(CATALOG_TEST_RESULTS_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const sanitized: Record<string, CatalogTestResult> = {};
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        "status" in value &&
        typeof (value as { status: unknown }).status === "string"
      ) {
        sanitized[key] = value as CatalogTestResult;
      }
    }
    return sanitized;
  } catch {
    return {};
  }
}

export function saveCatalogTestResults(
  results: Record<string, CatalogTestResult>
): Record<string, CatalogTestResult> {
  const capped = capTestResults(results);
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(CATALOG_TEST_RESULTS_KEY, JSON.stringify(capped));
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
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.removeItem(CATALOG_TEST_RESULTS_KEY);
    } catch {
      // Ignore
    }
  }
}
