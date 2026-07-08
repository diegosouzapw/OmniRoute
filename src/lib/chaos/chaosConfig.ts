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
import { getDbInstance } from "@/lib/db/core";

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
});

export type ChaosConfig = z.infer<typeof chaosConfigSchema>;

export const DEFAULT_CHAOS_CONFIG: ChaosConfig = {
  enabled: false,
  defaultMode: "parallel",
  providerOverrides: [],
  systemPrompt: undefined,
  timeoutMs: 120_000,
};

// ── Persistence ──────────────────────────────────────────────────────────────

const CONFIG_KEY = "chaos_mode_config";

let _configCache: ChaosConfig | null = null;

/**
 * Get the current Chaos Mode configuration.
 */
export function getChaosConfig(): ChaosConfig {
  if (_configCache) return _configCache;

  try {
    const db = getDbInstance() as {
      prepare: (sql: string) => {
        get: (...params: unknown[]) => { value: string } | undefined;
      };
    };

    const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(CONFIG_KEY);

    if (!row || !row.value) {
      _configCache = DEFAULT_CHAOS_CONFIG;
      return _configCache;
    }

    const parsed = JSON.parse(row.value);
    const result = chaosConfigSchema.safeParse(parsed);
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
export function setChaosConfig(config: ChaosConfig): ChaosConfig {
  const db = getDbInstance() as {
    prepare: (sql: string) => {
      run: (...params: unknown[]) => { changes?: number };
    };
  };

  const validated = chaosConfigSchema.parse(config);
  const json = JSON.stringify(validated);

  db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(CONFIG_KEY, json);

  // Invalidate cache
  _configCache = null;

  return validated;
}

/**
 * Reset chaos config to defaults.
 */
export function resetChaosConfig(): ChaosConfig {
  const db = getDbInstance() as {
    prepare: (sql: string) => {
      run: (...params: unknown[]) => { changes?: number };
    };
  };

  db.prepare("DELETE FROM settings WHERE key = ?").run(CONFIG_KEY);
  _configCache = null;
  return DEFAULT_CHAOS_CONFIG;
}
