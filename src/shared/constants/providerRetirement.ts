/**
 * Provider ids that must remain unavailable even when stale rows are restored
 * after migrations have already run. Keep canonical ids and legacy aliases
 * together so neither executor dispatch nor credential selection can fall back.
 */
export const RUNTIME_RETIRED_PROVIDER_IDS: ReadonlySet<string> = new Set([
  "felo-web",
  "felo",
  "gemini-cli",
  "qwen-web",
  "qw",
]);
export const RUNTIME_PROVIDER_RETIRED_ERROR_CODE = "PROVIDER_RETIRED";
export const RUNTIME_PROVIDER_RETIRED_MESSAGE = "Provider is retired and unavailable.";

type RuntimeProviderRetirementError = Error & {
  code: typeof RUNTIME_PROVIDER_RETIRED_ERROR_CODE;
  status: 410;
};

export function isRuntimeRetiredProviderId(providerId: unknown): providerId is string {
  return (
    typeof providerId === "string" &&
    RUNTIME_RETIRED_PROVIDER_IDS.has(providerId.trim().toLowerCase())
  );
}

export function assertRuntimeProviderAvailable(providerId: unknown): void {
  if (!isRuntimeRetiredProviderId(providerId)) return;

  const error = new Error(RUNTIME_PROVIDER_RETIRED_MESSAGE) as RuntimeProviderRetirementError;
  error.code = RUNTIME_PROVIDER_RETIRED_ERROR_CODE;
  error.status = 410;
  throw error;
}

export function assertRuntimeModelProviderAvailable(modelId: unknown): void {
  if (typeof modelId !== "string") return;
  const slashIndex = modelId.indexOf("/");
  if (slashIndex <= 0) return;
  assertRuntimeProviderAvailable(modelId.slice(0, slashIndex));
}

export function isRuntimeProviderRetirementError(
  error: unknown
): error is RuntimeProviderRetirementError {
  if (!(error instanceof Error)) return false;
  const typed = error as Error & { code?: unknown; status?: unknown };
  return typed.code === RUNTIME_PROVIDER_RETIRED_ERROR_CODE && typed.status === 410;
}
