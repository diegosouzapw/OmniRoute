import { mergeModelCompatOverride } from "@/lib/db/models";

/** Clearing the operator override must not expose an older manual compat value. */
export function clearLegacyVisionOverride(
  provider: string,
  modelId: string,
  updates: Record<string, unknown>
): void {
  if (updates.supportsVision !== null) return;
  mergeModelCompatOverride(provider, modelId, { supportsVision: null });
}
