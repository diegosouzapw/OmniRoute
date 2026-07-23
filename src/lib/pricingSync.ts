/**
 * pricingSync.ts — External pricing sync engine.
 *
 * Fetches pricing data from external sources (LiteLLM) and stores it
 * in a separate namespace (`pricing_synced`) so user overrides are
 * never touched.
 *
 * Resolution order: user overrides > synced external > hardcoded defaults
 *
 * Opt-in via PRICING_SYNC_ENABLED=true (default: false).
 */

import { getDbInstance } from "./db/core";
import { invalidateDbCache } from "./db/readCache";
import { backupDbFile } from "./db/backup";

// ─── Types ───────────────────────────────────────────────

type PricingEntry = {
  input: number;
  output: number;
  cached?: number;
  cache_creation?: number;
  mode?: string;
  // Non-token pricing dimensions (absolute USD, NOT scaled ×1e6).
  input_cost_per_second?: number;
  output_cost_per_second?: number;
  input_cost_per_image?: number;
  output_cost_per_image?: number;
  input_cost_per_pixel?: number;
  output_cost_per_pixel?: number;
  input_cost_per_character?: number;
  output_cost_per_character?: number;
  input_cost_per_video_per_second?: number;
  output_cost_per_video_per_second?: number;
  search_unit_cost?: number;
  ocr_cost_per_page?: number;
};

type PricingModels = Record<string, PricingEntry>;
type PricingByProvider = Record<string, PricingModels>;

interface LiteLLMModelInfo {
  input_cost_per_token?: number;
  output_cost_per_token?: number;
  cache_read_input_token_cost?: number;
  cache_creation_input_token_cost?: number;
  litellm_provider?: string;
  mode?: string;
  // Non-token pricing dimensions (absolute USD, NOT scaled ×1e6).
  input_cost_per_second?: number;
  output_cost_per_second?: number;
  input_cost_per_image?: number;
  output_cost_per_image?: number;
  input_cost_per_pixel?: number;
  output_cost_per_pixel?: number;
  input_cost_per_character?: number;
  output_cost_per_character?: number;
  input_cost_per_video_per_second?: number;
  output_cost_per_video_per_second?: number;
  search_unit_cost?: number;
  ocr_cost_per_page?: number;
}

interface SyncStatus {
  enabled: boolean;
  lastSync: string | null;
  lastSyncModelCount: number;
  nextSync: string | null;
  intervalMs: number;
  sources: string[];
}

interface SyncResult {
  success: boolean;
  modelCount: number;
  providerCount: number;
  source: string;
  dryRun: boolean;
  data?: PricingByProvider;
  error?: string;
}

// ─── Configuration ───────────────────────────────────────

const SUPPORTED_SOURCES = ["litellm"] as const;
type SupportedSource = (typeof SUPPORTED_SOURCES)[number];

const parsedInterval = parseInt(process.env.PRICING_SYNC_INTERVAL || "86400", 10);
const SYNC_INTERVAL_MS =
  Number.isFinite(parsedInterval) && parsedInterval > 0 ? parsedInterval * 1000 : 86400 * 1000;
const SYNC_SOURCES = (process.env.PRICING_SYNC_SOURCES || "litellm")
  .split(",")
  .map((s) => s.trim())
  .filter((s): s is SupportedSource => SUPPORTED_SOURCES.includes(s as SupportedSource));

const LITELLM_PRICING_URL =
  "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json";

// ─── Provider mapping: LiteLLM provider → OmniRoute aliases ─────

const LITELLM_PROVIDER_MAP: Record<string, string[]> = {
  openai: ["openai", "cx"],
  anthropic: ["anthropic", "cc"],
  vertex_ai: ["gemini"],
  "vertex_ai-anthropic_models": ["anthropic"],
  google: ["gemini"],
  deepseek: ["if"],
  groq: ["groq"],
  together_ai: ["openrouter"],
  bedrock: ["kiro"],
  fireworks_ai: ["fireworks"],
  cerebras: ["cerebras"],
  nvidia_nim: ["nvidia"],
  siliconflow: ["siliconflow"],
  "vertex_ai-language_models": ["gemini"],
  "vertex_ai-mistral_models": ["mistral"],
  gemini: ["gemini"],
  bedrock_converse: ["kiro"],
  cloudflare: ["cloudflare-ai"],
  stability: ["stability-ai"],
};

// ─── Periodic sync state ─────────────────────────────────

let syncTimer: ReturnType<typeof setInterval> | null = null;
let lastSyncTime: string | null = null;
let lastSyncModelCount = 0;
let activeSyncIntervalMs = SYNC_INTERVAL_MS;

// ─── Core: Fetch + Transform ─────────────────────────────

/**
 * Fetch raw pricing data from LiteLLM GitHub.
 */
export async function fetchLiteLLMPricing(): Promise<Record<string, LiteLLMModelInfo>> {
  const response = await fetch(LITELLM_PRICING_URL, {
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    throw new Error(`LiteLLM fetch failed [${response.status}]: ${response.statusText}`);
  }
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, LiteLLMModelInfo>;
  } catch {
    throw new Error(`LiteLLM returned invalid JSON (${text.slice(0, 100)}...)`);
  }
}

/**
 * Transform LiteLLM raw data → OmniRoute PricingByProvider format.
 *
 * Conversion: cost_per_token × 1_000_000 → $/1M tokens (OmniRoute format).
 * Ingests both chat (token) AND non-token modes (image / audio / rerank /
 * video / embedding). Token pricing is scaled to $/1M; non-token fields
 * (per-image, per-second, per-character, search-unit, …) are carried through
 * verbatim as absolute USD.
 */
export function transformToOmniRoute(raw: Record<string, LiteLLMModelInfo>): PricingByProvider {
  const result: PricingByProvider = {};

  for (const [modelKey, info] of Object.entries(raw)) {
    const NON_TOKEN_FIELDS = [
      "input_cost_per_second",
      "output_cost_per_second",
      "input_cost_per_image",
      "output_cost_per_image",
      "input_cost_per_pixel",
      "output_cost_per_pixel",
      "input_cost_per_character",
      "output_cost_per_character",
      "input_cost_per_video_per_second",
      "output_cost_per_video_per_second",
      "search_unit_cost",
      "ocr_cost_per_page",
    ] as const;

    const hasToken = info.input_cost_per_token != null || info.output_cost_per_token != null;
    const hasNonToken = NON_TOKEN_FIELDS.some((f) => info[f] != null);
    if (!hasToken && !hasNonToken) continue;

    const inputCost = (info.input_cost_per_token || 0) * 1_000_000;
    const outputCost = (info.output_cost_per_token || 0) * 1_000_000;

    const entry: PricingEntry = {
      input: Math.round(inputCost * 1000) / 1000,
      output: Math.round(outputCost * 1000) / 1000,
    };
    if (info.mode) entry.mode = info.mode;

    if (info.cache_read_input_token_cost != null) {
      entry.cached = Math.round(info.cache_read_input_token_cost * 1_000_000 * 1000) / 1000;
    }
    if (info.cache_creation_input_token_cost != null) {
      entry.cache_creation =
        Math.round(info.cache_creation_input_token_cost * 1_000_000 * 1000) / 1000;
    }

    for (const f of NON_TOKEN_FIELDS) {
      const v = info[f];
      if (typeof v === "number" && Number.isFinite(v)) entry[f] = v;
    }

    // Extract model name (strip provider prefix from key)
    // LiteLLM keys look like: "openai/gpt-4o", "anthropic/claude-3-opus"
    const slashIdx = modelKey.indexOf("/");
    const modelName = slashIdx >= 0 ? modelKey.slice(slashIdx + 1) : modelKey;

    // Map to OmniRoute providers
    const litellmProvider = info.litellm_provider || "";
    const omniRouteProviders = LITELLM_PROVIDER_MAP[litellmProvider];

    if (omniRouteProviders) {
      for (const provider of omniRouteProviders) {
        if (!result[provider]) result[provider] = {};
        result[provider][modelName] = entry;
      }
    } else if (litellmProvider) {
      // Use litellm_provider as-is for unknown providers
      if (!result[litellmProvider]) result[litellmProvider] = {};
      result[litellmProvider][modelName] = entry;
    }
  }

  return result;
}

// ─── DB: Synced pricing namespace ────────────────────────

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/**
 * Read synced pricing from `pricing_synced` namespace.
 */
export function getSyncedPricing(): PricingByProvider {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing_synced'")
    .all();
  const synced: PricingByProvider = {};
  for (const row of rows) {
    const record = toRecord(row);
    const key = typeof record.key === "string" ? record.key : null;
    const rawValue = typeof record.value === "string" ? record.value : null;
    if (!key || rawValue === null) continue;
    try {
      synced[key] = JSON.parse(rawValue) as PricingModels;
    } catch {
      console.warn(`[PRICING_SYNC] Corrupted data for provider "${key}", skipping`);
    }
  }
  return synced;
}

/**
 * Save synced pricing to `pricing_synced` namespace (full replace).
 */
export function saveSyncedPricing(data: PricingByProvider): void {
  const db = getDbInstance();
  const del = db.prepare("DELETE FROM key_value WHERE namespace = 'pricing_synced'");
  const insert = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('pricing_synced', ?, ?)"
  );
  const tx = db.transaction(() => {
    del.run();
    for (const [provider, models] of Object.entries(data)) {
      insert.run(provider, JSON.stringify(models));
    }
  });
  tx();
  backupDbFile("pre-write");
  invalidateDbCache("pricing");
}

/**
 * Clear all synced pricing data.
 */
export function clearSyncedPricing(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'pricing_synced'").run();
  backupDbFile("pre-write");
  invalidateDbCache("pricing");
}

// ─── DB: Sync status namespace ───────────────────────────
//
// Persisted separately from `pricing_synced` because Next.js standalone
// builds load this module from independent webpack chunks (e.g. the
// instrumentation hook vs an API route handler) — each gets its OWN
// top-level module state. Module-level vars (`lastSyncTime`,
// `lastSyncModelCount`) are therefore invisible across those instances;
// persisting them to the DB lets any instance read the real status.

const SYNC_STATUS_NAMESPACE = "pricing_sync_status";
const SYNC_STATUS_KEY = "last_sync";

function readPersistedSyncStatus(): { lastSyncTime: string; lastSyncModelCount: number } | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(SYNC_STATUS_NAMESPACE, SYNC_STATUS_KEY);
  const record = toRecord(row);
  const rawValue = typeof record.value === "string" ? record.value : null;
  if (!rawValue) return null;
  try {
    const parsed = JSON.parse(rawValue) as { lastSyncTime?: string; lastSyncModelCount?: number };
    if (typeof parsed.lastSyncTime !== "string") return null;
    return {
      lastSyncTime: parsed.lastSyncTime,
      lastSyncModelCount:
        typeof parsed.lastSyncModelCount === "number" ? parsed.lastSyncModelCount : 0,
    };
  } catch {
    return null;
  }
}

function writePersistedSyncStatus(lastSync: string, modelCount: number): void {
  const db = getDbInstance();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?) " +
      "ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value"
  ).run(
    SYNC_STATUS_NAMESPACE,
    SYNC_STATUS_KEY,
    JSON.stringify({ lastSyncTime: lastSync, lastSyncModelCount: modelCount })
  );
}

// ─── Main sync function ─────────────────────────────────

/**
 * Fetch, transform, and save pricing from external sources.
 */
export async function syncPricingFromSources(opts?: {
  sources?: string[];
  dryRun?: boolean;
}): Promise<SyncResult> {
  const requestedSources = opts?.sources || SYNC_SOURCES;
  const dryRun = opts?.dryRun ?? false;

  // Validate sources
  const validSources = requestedSources.filter((s): s is SupportedSource =>
    SUPPORTED_SOURCES.includes(s as SupportedSource)
  );
  const invalidSources = requestedSources.filter(
    (s) => !SUPPORTED_SOURCES.includes(s as SupportedSource)
  );

  if (validSources.length === 0) {
    const supported = SUPPORTED_SOURCES.join(", ");
    return {
      success: false,
      modelCount: 0,
      providerCount: 0,
      source: requestedSources.join(","),
      dryRun,
      error: `No valid sources provided. Supported: ${supported}. Invalid: ${invalidSources.join(", ")}`,
    };
  }

  try {
    const aggregated: PricingByProvider = {};

    for (const source of validSources) {
      if (source === "litellm") {
        const raw = await fetchLiteLLMPricing();
        const transformed = transformToOmniRoute(raw);
        for (const [provider, models] of Object.entries(transformed)) {
          if (!aggregated[provider]) aggregated[provider] = {};
          Object.assign(aggregated[provider], models);
        }
      }
    }

    const modelCount = Object.values(aggregated).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );
    const providerCount = Object.keys(aggregated).length;

    if (!dryRun) {
      saveSyncedPricing(aggregated);
      lastSyncTime = new Date().toISOString();
      lastSyncModelCount = modelCount;
      writePersistedSyncStatus(lastSyncTime, modelCount);
    }

    return {
      success: true,
      modelCount,
      providerCount,
      source: validSources.join(","),
      dryRun,
      ...(invalidSources.length > 0
        ? { warnings: [`Unknown sources ignored: ${invalidSources.join(", ")}`] }
        : {}),
      ...(dryRun ? { data: aggregated } : {}),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("[PRICING_SYNC] Sync failed:", message);
    return {
      success: false,
      modelCount: 0,
      providerCount: 0,
      source: requestedSources.join(","),
      dryRun,
      error: message,
    };
  }
}

// ─── Periodic sync ───────────────────────────────────────

/**
 * Start periodic pricing sync (non-blocking).
 */
export function startPeriodicSync(intervalMs?: number): void {
  if (syncTimer) return; // Already running

  const interval = intervalMs ?? SYNC_INTERVAL_MS;
  activeSyncIntervalMs = interval;
  console.log(`[PRICING_SYNC] Starting periodic sync every ${interval / 1000}s`);

  // Initial sync (non-blocking)
  syncPricingFromSources()
    .then((result) => {
      if (result.success) {
        console.log(
          `[PRICING_SYNC] Initial sync complete: ${result.modelCount} models from ${result.providerCount} providers`
        );
      }
    })
    .catch((err) => {
      console.warn("[PRICING_SYNC] Initial sync error:", err instanceof Error ? err.message : err);
    });

  syncTimer = setInterval(() => {
    syncPricingFromSources()
      .then((result) => {
        if (result.success) {
          console.log(`[PRICING_SYNC] Periodic sync complete: ${result.modelCount} models`);
        }
      })
      .catch((err) => {
        console.warn(
          "[PRICING_SYNC] Periodic sync error:",
          err instanceof Error ? err.message : err
        );
      });
  }, interval);

  if (syncTimer && typeof syncTimer === "object" && "unref" in syncTimer) {
    (syncTimer as { unref?: () => void }).unref?.();
  }
}

/**
 * Stop periodic sync and cleanup timer.
 */
export function stopPeriodicSync(): void {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[PRICING_SYNC] Periodic sync stopped");
  }
}

/**
 * Get current sync status.
 */
export function getSyncStatus(): SyncStatus {
  const enabled = process.env.PRICING_SYNC_ENABLED === "true";
  // `lastSyncTime`/`lastSyncModelCount` are only reliably populated on the
  // module instance that performed the sync (see note above
  // writePersistedSyncStatus) — fall back to the persisted DB record so
  // status reads from a different module instance still see it.
  const persisted = lastSyncTime === null ? readPersistedSyncStatus() : null;
  const effectiveLastSync = lastSyncTime ?? persisted?.lastSyncTime ?? null;
  const effectiveModelCount =
    lastSyncTime !== null ? lastSyncModelCount : (persisted?.lastSyncModelCount ?? 0);
  return {
    enabled,
    lastSync: effectiveLastSync,
    lastSyncModelCount: effectiveModelCount,
    nextSync:
      enabled && effectiveLastSync
        ? new Date(new Date(effectiveLastSync).getTime() + activeSyncIntervalMs).toISOString()
        : null,
    intervalMs: activeSyncIntervalMs,
    sources: SYNC_SOURCES,
  };
}

// ─── Init (called from server-init.ts) ───────────────────

/**
 * Initialize pricing sync if enabled.
 */
export async function initPricingSync(): Promise<void> {
  if (process.env.PRICING_SYNC_ENABLED !== "true") {
    console.log("[PRICING_SYNC] Disabled (set PRICING_SYNC_ENABLED=true to enable)");
    return;
  }
  startPeriodicSync();
}
