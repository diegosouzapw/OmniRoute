type JsonRecord = Record<string, unknown>;

/**
 * Default models that support Anthropic Fast Mode (speed:"fast").
 *
 * Mirrors the binary-side gate observed in claude-code v2.1.145 (KT() check):
 * only the latest Opus tiers can request the priority service path.
 */
export const CLAUDE_FAST_MODE_DEFAULT_MODELS = [
  "claude-opus-4-8",
  "claude-opus-4-7",
  "claude-opus-4-6",
] as const;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const out: string[] = [];
  for (const item of value) {
    if (typeof item === "string" && item.trim().length > 0) out.push(item.trim());
  }
  return out;
}

/**
 * Returns true if the user has globally opted into Claude Fast Mode.
 *
 * Anthropic does not officially expose `speed:"fast"` via the public SDK; this
 * toggle is only meaningful when paired with a CPA-side opt-in spoof that
 * rewrites the entrypoint for SDK-shaped traffic. The flag is forwarded to CPA
 * via the `X-CPA-Force-Fast-Mode` outbound header.
 */
export function isClaudeFastModeEnabled(settings: unknown): boolean {
  const record = asRecord(settings);
  const claudeFastMode = record.claudeFastMode;
  if (typeof claudeFastMode === "boolean") return claudeFastMode;
  const claudeFastModeRecord = asRecord(claudeFastMode);
  return claudeFastModeRecord.enabled === true;
}

/**
 * Returns the configured supported-model list, defaulting to the conservative
 * Opus 4-8 / 4-7 / 4-6 set.
 */
export function getClaudeFastModeSupportedModels(settings: unknown): string[] {
  const record = asRecord(settings);
  const claudeFastMode = asRecord(record.claudeFastMode);
  const fromSettings = asStringArray(claudeFastMode.supportedModels);
  if (fromSettings && fromSettings.length > 0) return fromSettings;
  return [...CLAUDE_FAST_MODE_DEFAULT_MODELS];
}

/**
 * True when the toggle is on AND the model id prefix-matches a supported model.
 * Prefix matching tolerates dated suffixes (e.g. claude-opus-4-8-20260528).
 */
export function shouldRequestClaudeFastMode(
  settings: unknown,
  modelId: string | null | undefined
): boolean {
  if (!isClaudeFastModeEnabled(settings)) return false;
  if (typeof modelId !== "string" || modelId.length === 0) return false;
  const supported = getClaudeFastModeSupportedModels(settings);
  return supported.some((m) => modelId === m || modelId.startsWith(`${m}-`));
}

/**
 * Header used by CPA (claude-fastmode-spoof branch) to opt SDK-shaped traffic
 * into Fast Mode entrypoint rewriting.
 */
export const CPA_FORCE_FAST_MODE_HEADER = "X-CPA-Force-Fast-Mode";
