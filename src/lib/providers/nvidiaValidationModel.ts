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
 * The default must stay inside the current NVIDIA hosted-model catalog. Nemotron 3.5
 * Lightning is the smallest retained general chat model, which keeps the auth probe
 * lightweight. A connection may still override it via
 * `providerSpecificData.validationModelId`.
 */
export const NVIDIA_DEFAULT_VALIDATION_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";

export function resolveNvidiaValidationModel(providerSpecificData?: {
  validationModelId?: unknown;
}): string {
  const override = providerSpecificData?.validationModelId;
  if (typeof override === "string" && override.trim()) return override.trim();
  return NVIDIA_DEFAULT_VALIDATION_MODEL;
}
