export const OPENROUTER_PRESET_MAX_LENGTH = 200;

export function isOpenRouterPresetValue(value: unknown): value is string {
  return typeof value === "string" && value.trim().length <= OPENROUTER_PRESET_MAX_LENGTH;
}

export function normalizeOpenRouterPreset(value: unknown): string | undefined {
  if (!isOpenRouterPresetValue(value)) return undefined;
  const normalized = value.trim();
  return normalized || undefined;
}
