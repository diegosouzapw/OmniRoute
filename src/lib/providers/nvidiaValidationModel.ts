/**
 * NVIDIA NIM key-validation probe model (#3116).
 *
 * Key validation does a tiny chat/completions probe and only cares whether auth passes
 * (401/403 ⇒ bad key; anything else ⇒ key OK). The probe model therefore must be one
 * that responds quickly for every account. The previous default was the first model in
 * the catalog (`z-ai/glm-5.1`), which requires the "Public API Endpoints" account
 * permission and has had DEGRADED windows — accounts lacking that permission see the
 * probe HANG until the validation timeout, which surfaces as a misleading "Upstream
 * Error" on an otherwise-valid key.
 *
 * `meta/llama-3.1-8b-instruct` is a long-lived, universally-available NIM model (no
 * special permission), so it is a far more reliable auth probe. A connection may still
 * override it via `providerSpecificData.validationModelId`.
 */
export const NVIDIA_DEFAULT_VALIDATION_MODEL = "meta/llama-3.1-8b-instruct";

export function resolveNvidiaValidationModel(providerSpecificData?: {
  validationModelId?: unknown;
}): string {
  const override = providerSpecificData?.validationModelId;
  if (typeof override === "string" && override.trim()) return override.trim();
  return NVIDIA_DEFAULT_VALIDATION_MODEL;
}
