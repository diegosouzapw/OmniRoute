// Operator-set CLI client-version overrides, shared by the Claude Code and Codex
// identity presets.
//
// Both upstreams gate newer models on the advertised CLI version ("The
// 'gpt-6-astra' model requires a newer version of Codex"; Anthropic does the same
// for new Opus/Sonnet tiers). The captured pins therefore rot as the operators'
// real CLIs move on. This store holds the dashboard-set override that sits on top
// of the env var and the pin.
//
// Keep this module dependency-free: it is imported by src/shared/constants/
// leaves that server executors, compatibility bridges and client-facing identity
// presets all share.

export const CLI_VERSION_KEYS = ["claude", "codex"] as const;
export type CliVersionKey = (typeof CLI_VERSION_KEYS)[number];
export type CliVersionOverrides = Partial<Record<CliVersionKey, string>>;

/**
 * Same shape the wire headers allow (mirrors SAFE_HEADER_TOKEN_PATTERN in
 * codexClient.ts / claudeCodeClient.ts): a leading alphanumerical character
 * followed by up to 31 of alphanumerical, dot, underscore or hyphen. Anything
 * else is rejected rather than silently coerced — a value here goes straight
 * onto the wire as a fingerprint, so garbage must never leak through.
 */
export const CLI_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;

export function normalizeCliVersion(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && CLI_VERSION_PATTERN.test(trimmed) ? trimmed : null;
}

export function isCliVersionKey(value: unknown): value is CliVersionKey {
  return typeof value === "string" && (CLI_VERSION_KEYS as readonly string[]).includes(value);
}

/** Where an advertised version came from — surfaced in the dashboard so an
 * operator can tell at a glance whether their override is actually in effect. */
export type CliVersionSource = "settings" | "env" | "default";

/**
 * One provider kind as the dashboard sees it: the operator override (null when
 * unset), the value actually advertised, which layer produced it, and the
 * captured pin the operator can reset to.
 */
export type CliVersionStatus = {
  key: CliVersionKey;
  version: string | null;
  effective: string;
  source: CliVersionSource;
  pinned: string;
};

// ---------------------------------------------------------------------------
// Mutable store
//
// A module-level map rather than a settings read on every call: these getters sit
// on the per-request hot path (every upstream header set), and a SQLite round
// trip per request is not acceptable. Hydrated at bootstrap and re-hydrated on
// every settings write (see hydrateCliVersionOverrides).
// ---------------------------------------------------------------------------

let overrides: CliVersionOverrides = {};

/** Current overrides. Only well-formed versions are ever present. */
export function getCliVersionOverrides(): CliVersionOverrides {
  return { ...overrides };
}

/** Override for one provider kind, or null when the operator has not set one. */
export function getCliVersionOverride(key: CliVersionKey): string | null {
  return overrides[key] ?? null;
}

/**
 * Pure: the well-formed subset of `input`. Malformed values are DROPPED rather
 * than coerced, and keys outside CLI_VERSION_KEYS are ignored, so a corrupt
 * settings row can never put a bogus fingerprint on the wire.
 */
export function normalizeCliVersionOverrides(input: unknown): CliVersionOverrides {
  const next: CliVersionOverrides = {};
  if (input && typeof input === "object" && !Array.isArray(input)) {
    for (const [rawKey, rawValue] of Object.entries(input as Record<string, unknown>)) {
      if (!isCliVersionKey(rawKey)) continue;
      const normalized = normalizeCliVersion(rawValue);
      if (normalized !== null) next[rawKey] = normalized;
    }
  }
  return next;
}

/**
 * Replace the whole override map. Returns the map that was actually applied.
 */
export function setCliVersionOverrides(input: unknown): CliVersionOverrides {
  overrides = normalizeCliVersionOverrides(input);
  return { ...overrides };
}

/**
 * Startup / settings-write hydration. Reads `settings.cliVersionOverrides` (a
 * plain record of provider kind -> version) and applies it. Idempotent and cheap
 * enough to call on every settings write, which is how dashboard edits,
 * `import-json` and any other settings path stay in sync without a reload.
 *
 * Returns true when at least one override is active afterwards, so the bootstrap
 * call site can log whether the identity is operator-pinned.
 */
export function hydrateCliVersionOverrides(settings: unknown): boolean {
  const record =
    settings && typeof settings === "object" ? (settings as Record<string, unknown>) : {};
  setCliVersionOverrides(record.cliVersionOverrides);
  return Object.keys(overrides).length > 0;
}


