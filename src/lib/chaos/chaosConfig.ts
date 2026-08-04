/**
 * lib/chaos/chaosConfig.ts
 *
 * Chaos Mode configuration — persisted per-instance settings for:
 * - Which providers/models participate
 * - Default mode (parallel vs collaborative)
 * - System prompt overrides
 * - Max timeout per model call
 */

import { z } from "zod";
import { getSettings, updateSettings } from "@/lib/db/settings";

// ── Schema ───────────────────────────────────────────────────────────────────

export const chaosConfigSchema = z.object({
  enabled: z.boolean().default(false),
  defaultMode: z.enum(["parallel", "collaborative"]).default("parallel"),
  providerOverrides: z
    .array(
      z.object({
        providerId: z.string().min(1),
        modelId: z.string().optional(),
        enabled: z.boolean().default(true),
      })
    )
    .max(200)
    .default([]),
  systemPrompt: z.string().max(10_000).optional(),
  timeoutMs: z.number().int().min(5_000).max(600_000).default(120_000),
  maxTokens: z.number().int().min(256).max(128_000).default(4096),
});

export type ChaosConfig = z.infer<typeof chaosConfigSchema>;

export const DEFAULT_CHAOS_CONFIG: ChaosConfig = {
  enabled: false,
  defaultMode: "parallel",
  providerOverrides: [],
  systemPrompt: undefined,
  timeoutMs: 120_000,
  maxTokens: 4096,
};

// ── Persistence ──────────────────────────────────────────────────────────────
//
// Persisted via the shared settings store (src/lib/db/settings.ts::getSettings/
// updateSettings — the `key_value` table, namespace 'settings') rather than
// hand-rolled SQL against a nonexistent `settings` table (the original PR queried
// a table that was never created — every read silently fell back to defaults and
// every write/reset threw). Follows the repo convention of routing all settings
// reads/writes through src/lib/db/settings.ts (see CLAUDE.md → Database).

const CONFIG_KEY = "chaosModeConfig";

let _configCache: ChaosConfig | null = null;

/**
 * Get the current Chaos Mode configuration.
 */
export async function getChaosConfig(): Promise<ChaosConfig> {
  if (_configCache) return _configCache;

  try {
    const settings = await getSettings();
    const raw = settings[CONFIG_KEY];

    if (raw === undefined || raw === null) {
      _configCache = DEFAULT_CHAOS_CONFIG;
      return _configCache;
    }

    const result = chaosConfigSchema.safeParse(raw);
    if (result.success) {
      _configCache = result.data;
      return result.data;
    }

    // Fall back to default if stored config is invalid
    _configCache = DEFAULT_CHAOS_CONFIG;
    return _configCache;
  } catch {
    _configCache = DEFAULT_CHAOS_CONFIG;
    return _configCache;
  }
}

/**
 * Update the Chaos Mode configuration.
 */
export async function setChaosConfig(config: ChaosConfig): Promise<ChaosConfig> {
  const validated = chaosConfigSchema.parse(config);

  await updateSettings({ [CONFIG_KEY]: validated });

  // Invalidate cache
  _configCache = null;

  return validated;
}

/**
 * Reset chaos config to defaults.
 */
export async function resetChaosConfig(): Promise<ChaosConfig> {
  await updateSettings({ [CONFIG_KEY]: null });
  _configCache = null;
  return DEFAULT_CHAOS_CONFIG;
}

/**
 * Invalidate the in-memory config cache without touching persisted settings.
 * Needed whenever the underlying DB/settings store is reset out-of-band (e.g.
 * test teardown calling resetDbInstance()) — otherwise getChaosConfig() keeps
 * serving a stale in-memory value after the store it was read from is gone.
 */
export function invalidateChaosConfigCache(): void {
  _configCache = null;
}
