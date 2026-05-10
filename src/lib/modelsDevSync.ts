/**
 * modelsDevSync.ts — Fetch model specs, pricing, and capabilities from models.dev
 *
 * models.dev (https://github.com/anomalyco/models.dev) is an open-source database
 * of AI model specifications maintained by the SST/OpenCode team (MIT license).
 *
 * API: https://models.dev/api.json
 * - 109 providers, 4,146+ models
 * - Data: pricing, capabilities, limits, modalities, metadata
 *
 * Resolution order (highest → lowest):
 *   1. User overrides (`pricing` namespace)
 *   2. models.dev sync (`models_dev_pricing` namespace)
 *   3. LiteLLM sync (`pricing_synced` namespace)
 *   4. Hardcoded defaults (`pricing.ts`)
 *
 * Opt-in via MODELS_DEV_SYNC_ENABLED=true (default: false).
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
  reasoning?: number;
};

type PricingModels = Record<string, PricingEntry>;
type PricingByProvider = Record<string, PricingModels>;

export interface ModelCapabilityEntry {
  tool_call: boolean | null;
  reasoning: boolean | null;
  attachment: boolean | null;
  structured_output: boolean | null;
  temperature: boolean | null;
  modalities_input: string; // JSON array
  modalities_output: string; // JSON array
  knowledge_cutoff: string | null;
  release_date: string | null;
  last_updated: string | null;
  status: string | null;
  family: string | null;
  open_weights: boolean | null;
  limit_context: number | null;
  limit_input: number | null;
  limit_output: number | null;
  interleaved_field: string | null;
}

export type CapabilitiesByProvider = Record<string, Record<string, ModelCapabilityEntry>>;

interface SyncStatus {
  enabled: boolean;
  lastSync: string | null;
  lastSyncModelCount: number;
  lastSyncCapabilityCount: number;
  nextSync: string | null;
  intervalMs: number;
}

interface SyncResult {
  success: boolean;
  modelCount: number;
  providerCount: number;
  capabilityCount: number;
  dryRun: boolean;
  data?: { pricing: PricingByProvider; capabilities: CapabilitiesByProvider };
  error?: string;
}

// ─── models.dev API types (raw) ──────────────────────────

interface ModelsDevCost {
  input?: number;
  output?: number;
  reasoning?: number;
  cache_read?: number;
  cache_write?: number;
  input_audio?: number;
  output_audio?: number;
}

interface ModelsDevLimit {
  context?: number;
  input?: number;
  output?: number;
}

interface ModelsDevModalities {
  input?: string[];
  output?: string[];
}

interface ModelsDevInterleaved {
  field?: string;
}

interface ModelsDevModel {
  id: string;
  name: string;
  family?: string;
  attachment?: boolean;
  reasoning?: boolean;
  tool_call?: boolean;
  structured_output?: boolean;
  temperature?: boolean;
  knowledge?: string;
  release_date?: string;
  last_updated?: string;
  open_weights?: boolean;
  status?: string;
  cost?: ModelsDevCost;
  limit?: ModelsDevLimit;
  modalities?: ModelsDevModalities;
  interleaved?: ModelsDevInterleaved | boolean;
}

interface ModelsDevProvider {
  id: string;
  name?: string;
  env?: string[];
  npm?: string;
  api?: string;
  doc?: string;
  models: Record<string, ModelsDevModel>;
}

type ModelsDevData = Record<string, ModelsDevProvider>;

// ─── Configuration ───────────────────────────────────────

const MODELS_DEV_API_URL = "https://models.dev/api.json";

const parsedInterval = parseInt(process.env.MODELS_DEV_SYNC_INTERVAL || "86400", 10);
const SYNC_INTERVAL_MS =
  Number.isFinite(parsedInterval) && parsedInterval > 0 ? parsedInterval * 1000 : 86400 * 1000;

// ─── Provider mapping: models.dev provider ID → OmniRoute provider IDs/aliases ──
//
// models.dev uses canonical provider IDs (e.g. "openai", "anthropic", "google").
// OmniRoute uses both full IDs and short aliases (e.g. "cc" for claude, "cx" for codex).
// We map each models.dev provider to ALL OmniRoute identifiers that should receive
// its pricing/capability data.

const MODELS_DEV_PROVIDER_MAP: Record<string, string[]> = {
  // Major providers
  openai: ["openai", "cx"], // cx = Codex (uses OpenAI models)
  anthropic: ["anthropic", "cc"], // cc = Claude Code
  google: ["gemini", "gemini-cli"],
  "google-vertex": ["gemini", "vertex"],
  "google-vertex-anthropic": ["anthropic", "cc", "vertex"],
  vertex_ai: ["gemini", "vertex"],
  deepseek: ["deepseek", "if"], // if = Qoder (routes through DeepSeek)
  groq: ["groq"],
  xai: ["xai"],
  mistral: ["mistral"],
  togetherai: ["together", "openrouter"],
  together_ai: ["together", "openrouter"],
  "fireworks-ai": ["fireworks"],
  fireworks: ["fireworks"],
  cerebras: ["cerebras"],
  cohere: ["cohere"],
  nvidia: ["nvidia"],
  nebius: ["nebius"],
  siliconflow: ["siliconflow"],
  hyperbolic: ["hyperbolic"],
  huggingface: ["hf", "huggingface"],
  openrouter: ["openrouter"],
  perplexity: ["pplx", "perplexity"],
  // OAuth / special providers
  bedrock: ["kiro", "kr"], // kr = Kiro (AWS Bedrock)
  "github-copilot": ["github", "gh"],
  "github-models": ["github", "gh"],
  kilo: ["kilocode", "kc", "kilo-gateway"],
  kilocode: ["kilocode", "kc", "kilo-gateway"],
  "kimi-for-coding": ["kimi-coding", "kmc", "kimi-coding-apikey", "kmca"],
  opencode: ["opencode-zen"],
  "opencode-go": ["opencode-go"],
  // Additional providers that may overlap with OmniRoute
  alibaba: ["ali", "alibaba", "bcp", "alicode", "alicode-intl"],
  "alibaba-cn": ["ali", "alibaba", "bcp"],
  "alibaba-coding-plan": ["alicode", "alicode-intl"],
  "alibaba-coding-plan-cn": ["alicode"],
  zai: ["zai", "glm"], // GLM models via Z.AI
  "zai-coding-plan": ["zai", "glm"],
  moonshotai: ["moonshot", "kimi"],
  "moonshotai-cn": ["moonshot", "kimi"],
  moonshot: ["moonshot", "kimi", "kimi-coding", "kmc", "kmca"],
  minimax: ["minimax", "minimax-cn"],
  "minimax-cn": ["minimax-cn"],
  longcat: ["lc", "longcat"],
  pollinations: ["pol", "pollinations"],
  puter: ["pu", "puter"],
  cloudflare: ["cf"],
  scaleway: ["scw"],
  ollama: ["ollamacloud", "ollama-cloud"],
  blackbox: ["bb", "blackbox"],
  cline: ["cl", "cline"],
  cursor: ["cu", "cursor"],
  github: ["gh", "github"],
  // Fallback: if no mapping exists, use the models.dev ID as-is
};

/**
 * Map a models.dev provider ID to OmniRoute provider IDs.
 * Returns array of provider identifiers (may include aliases).
 */
export function mapProviderId(modelsDevProviderId: string): string[] {
  return MODELS_DEV_PROVIDER_MAP[modelsDevProviderId] || [modelsDevProviderId];
}

// ─── Periodic sync state ─────────────────────────────────

let syncTimer: ReturnType<typeof setInterval> | null = null;
let activeSyncAbortController: AbortController | null = null;
let activeSyncPromise: Promise<SyncResult> | null = null;
let activePeriodicSyncToken: { stopped: boolean } | null = null;
let lastSyncTime: string | null = null;
let lastSyncModelCount = 0;
let lastSyncCapabilityCount = 0;
let activeSyncIntervalMs = SYNC_INTERVAL_MS;
let cachedData: ModelsDevData | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
let cachedCapabilities: CapabilitiesByProvider | null = null;
let cachedCapabilitiesLoadedAll = false;
const MODELS_DEV_ABORT_ERROR = "AbortError";

function createAbortError(): Error {
  const error = new Error("models.dev sync aborted");
  error.name = MODELS_DEV_ABORT_ERROR;
  return error;
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === MODELS_DEV_ABORT_ERROR;
}

function createAbortedSyncResult(dryRun: boolean): SyncResult {
  return {
    success: false,
    modelCount: 0,
    providerCount: 0,
    capabilityCount: 0,
    dryRun,
    error: "aborted",
  };
}

async function sleepWithAbort(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    throw createAbortError();
  }

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timeout);
      reject(createAbortError());
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

// ─── Core: Fetch ─────────────────────────────────────────

/**
 * Fetch raw data from models.dev API.
 * Uses in-memory cache with 24h TTL to avoid repeated fetches.
 */
export async function fetchModelsDev(signal?: AbortSignal): Promise<ModelsDevData> {
  // Return cached data if still fresh
  if (cachedData && Date.now() - cacheTime < CACHE_TTL_MS) {
    return cachedData;
  }

  const response = await fetch(MODELS_DEV_API_URL, {
    signal: signal ?? AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    throw new Error(`models.dev fetch failed [${response.status}]: ${response.statusText}`);
  }
  const text = await response.text();
  try {
    const data = JSON.parse(text) as ModelsDevData;
    cachedData = data;
    cacheTime = Date.now();
    return data;
  } catch {
    throw new Error(`models.dev returned invalid JSON (${text.slice(0, 100)}...)`);
  }
}

// ─── Transform: Pricing ──────────────────────────────────

/**
 * Transform models.dev raw data → OmniRoute PricingByProvider format.
 *
 * models.dev costs are already in $/1M tokens (same as OmniRoute format).
 * Maps: cache_read → cached, cache_write → cache_creation.
 */
export function transformModelsDevToPricing(raw: ModelsDevData): PricingByProvider {
  const result: PricingByProvider = {};

  for (const [providerId, providerData] of Object.entries(raw)) {
    const omniRouteProviders = mapProviderId(providerId);

    for (const [modelId, model] of Object.entries(providerData.models || {})) {
      if (!model.cost) continue;

      // Must have at least input pricing
      if (model.cost.input == null) continue;

      const entry: PricingEntry = {
        input: model.cost.input,
        output: model.cost.output ?? 0,
      };

      if (model.cost.cache_read != null) {
        entry.cached = model.cost.cache_read;
      }
      if (model.cost.cache_write != null) {
        entry.cache_creation = model.cost.cache_write;
      }
      if (model.cost.reasoning != null) {
        entry.reasoning = model.cost.reasoning;
      }

      // Write to ALL mapped OmniRoute providers
      for (const omniProvider of omniRouteProviders) {
        if (!result[omniProvider]) result[omniProvider] = {};
        result[omniProvider][modelId] = entry;
      }
    }
  }

  return result;
}

// ─── Transform: Capabilities ─────────────────────────────

/**
 * Transform models.dev raw data → CapabilitiesByProvider format.
 */
export function transformModelsDevToCapabilities(raw: ModelsDevData): CapabilitiesByProvider {
  const result: CapabilitiesByProvider = {};

  for (const [providerId, providerData] of Object.entries(raw)) {
    const omniRouteProviders = mapProviderId(providerId);

    for (const [modelId, model] of Object.entries(providerData.models || {})) {
      const cap: ModelCapabilityEntry = {
        tool_call: model.tool_call ?? null,
        reasoning: model.reasoning ?? null,
        attachment: model.attachment ?? null,
        structured_output: model.structured_output ?? null,
        temperature: model.temperature ?? null,
        modalities_input: JSON.stringify(model.modalities?.input ?? []),
        modalities_output: JSON.stringify(model.modalities?.output ?? []),
        knowledge_cutoff: model.knowledge ?? null,
        release_date: model.release_date ?? null,
        last_updated: model.last_updated ?? null,
        status: model.status ?? null,
        family: model.family ?? null,
        open_weights: model.open_weights ?? null,
        limit_context: model.limit?.context ?? null,
        limit_input: model.limit?.input ?? null,
        limit_output: model.limit?.output ?? null,
        interleaved_field:
          typeof model.interleaved === "object" && model.interleaved?.field
            ? model.interleaved.field
            : model.interleaved === true
              ? "reasoning_content"
              : null,
      };

      for (const omniProvider of omniRouteProviders) {
        if (!result[omniProvider]) result[omniProvider] = {};
        result[omniProvider][modelId] = cap;
      }
    }
  }

  return result;
}

// ─── DB: models.dev pricing namespace ────────────────────

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function mapCapabilityRecord(record: Record<string, unknown>): ModelCapabilityEntry {
  return {
    tool_call: record.tool_call === 1 ? true : record.tool_call === 0 ? false : null,
    reasoning: record.reasoning === 1 ? true : record.reasoning === 0 ? false : null,
    attachment: record.attachment === 1 ? true : record.attachment === 0 ? false : null,
    structured_output:
      record.structured_output === 1 ? true : record.structured_output === 0 ? false : null,
    temperature: record.temperature === 1 ? true : record.temperature === 0 ? false : null,
    modalities_input: typeof record.modalities_input === "string" ? record.modalities_input : "[]",
    modalities_output:
      typeof record.modalities_output === "string" ? record.modalities_output : "[]",
    knowledge_cutoff: typeof record.knowledge_cutoff === "string" ? record.knowledge_cutoff : null,
    release_date: typeof record.release_date === "string" ? record.release_date : null,
    last_updated: typeof record.last_updated === "string" ? record.last_updated : null,
    status: typeof record.status === "string" ? record.status : null,
    family: typeof record.family === "string" ? record.family : null,
    open_weights: record.open_weights === 1 ? true : record.open_weights === 0 ? false : null,
    limit_context: typeof record.limit_context === "number" ? record.limit_context : null,
    limit_input: typeof record.limit_input === "number" ? record.limit_input : null,
    limit_output: typeof record.limit_output === "number" ? record.limit_output : null,
    interleaved_field:
      typeof record.interleaved_field === "string" ? record.interleaved_field : null,
  };
}

/**
 * Read synced pricing from `models_dev_pricing` namespace.
 */
export function getModelsDevPricing(): PricingByProvider {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'models_dev_pricing'")
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
      console.warn(`[MODELS_DEV] Corrupted pricing data for provider "${key}", skipping`);
    }
  }
  return synced;
}

/**
 * Save synced pricing to `models_dev_pricing` namespace (full replace).
 */
export function saveModelsDevPricing(data: PricingByProvider): void {
  const db = getDbInstance();
  const del = db.prepare("DELETE FROM key_value WHERE namespace = 'models_dev_pricing'");
  const insert = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('models_dev_pricing', ?, ?)"
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
 * Clear all models.dev synced pricing data.
 */
export function clearModelsDevPricing(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'models_dev_pricing'").run();
  backupDbFile("pre-write");
  invalidateDbCache("pricing");
}

// ─── DB: model_capabilities table ────────────────────────

/**
 * Ensure the model_capabilities table exists.
 * Call this before any capability operations.
 */
export function ensureCapabilitiesTable(): void {
  const db = getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS model_capabilities (
      provider TEXT NOT NULL,
      model_id TEXT NOT NULL,
      tool_call BOOLEAN,
      reasoning BOOLEAN,
      attachment BOOLEAN,
      structured_output BOOLEAN,
      temperature BOOLEAN,
      modalities_input TEXT,
      modalities_output TEXT,
      knowledge_cutoff TEXT,
      release_date TEXT,
      last_updated TEXT,
      status TEXT,
      family TEXT,
      open_weights BOOLEAN,
      limit_context INTEGER,
      limit_input INTEGER,
      limit_output INTEGER,
      interleaved_field TEXT,
      last_synced TEXT,
      PRIMARY KEY (provider, model_id)
    )
  `);
}

/**
 * Read synced capabilities from `model_capabilities` table.
 */
export function getSyncedCapabilities(provider?: string, modelId?: string): CapabilitiesByProvider {
  if (cachedCapabilitiesLoadedAll) {
    if (!provider) {
      return cachedCapabilities || {};
    }

    if (!modelId) {
      return cachedCapabilities?.[provider] ? { [provider]: cachedCapabilities[provider] } : {};
    }

    const providerCaps = cachedCapabilities?.[provider];
    return providerCaps?.[modelId] ? { [provider]: { [modelId]: providerCaps[modelId] } } : {};
  }

  const db = getDbInstance();
  ensureCapabilitiesTable();

  let query = "SELECT * FROM model_capabilities";
  const params: (string | number)[] = [];

  if (provider) {
    query += " WHERE provider = ?";
    params.push(provider);
    if (modelId) {
      query += " AND model_id = ?";
      params.push(modelId);
    }
  }

  const rows = db.prepare(query).all(...params);
  const result: CapabilitiesByProvider = {};

  for (const row of rows) {
    const record = toRecord(row);
    const prov = typeof record.provider === "string" ? record.provider : null;
    const mid = typeof record.model_id === "string" ? record.model_id : null;
    if (!prov || !mid) continue;

    if (!result[prov]) result[prov] = {};
    result[prov][mid] = mapCapabilityRecord(record);
  }

  if (!provider && !modelId) {
    cachedCapabilities = result;
    cachedCapabilitiesLoadedAll = true;
  }

  return result;
}

export function getSyncedCapability(
  provider: string,
  modelId: string
): ModelCapabilityEntry | null {
  if (!provider || !modelId) return null;

  if (cachedCapabilitiesLoadedAll) {
    return cachedCapabilities?.[provider]?.[modelId] ?? null;
  }

  const db = getDbInstance();
  ensureCapabilitiesTable();
  const row = db
    .prepare("SELECT * FROM model_capabilities WHERE provider = ? AND model_id = ? LIMIT 1")
    .get(provider, modelId);
  if (!row) return null;
  return mapCapabilityRecord(toRecord(row));
}

/**
 * Save synced capabilities to `model_capabilities` table (full replace).
 */
export function saveModelsDevCapabilities(data: CapabilitiesByProvider): void {
  const db = getDbInstance();
  ensureCapabilitiesTable();

  const del = db.prepare("DELETE FROM model_capabilities");
  const insert = db.prepare(`
    INSERT INTO model_capabilities (
      provider, model_id, tool_call, reasoning, attachment, structured_output,
      temperature, modalities_input, modalities_output, knowledge_cutoff,
      release_date, last_updated, status, family, open_weights,
      limit_context, limit_input, limit_output, interleaved_field, last_synced
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  const tx = db.transaction(() => {
    del.run();
    for (const [provider, models] of Object.entries(data)) {
      for (const [modelId, cap] of Object.entries(models)) {
        insert.run(
          provider,
          modelId,
          cap.tool_call === null ? null : cap.tool_call ? 1 : 0,
          cap.reasoning === null ? null : cap.reasoning ? 1 : 0,
          cap.attachment === null ? null : cap.attachment ? 1 : 0,
          cap.structured_output === null ? null : cap.structured_output ? 1 : 0,
          cap.temperature === null ? null : cap.temperature ? 1 : 0,
          cap.modalities_input,
          cap.modalities_output,
          cap.knowledge_cutoff,
          cap.release_date,
          cap.last_updated,
          cap.status,
          cap.family,
          cap.open_weights === null ? null : cap.open_weights ? 1 : 0,
          cap.limit_context,
          cap.limit_input,
          cap.limit_output,
          cap.interleaved_field,
          now
        );
      }
    }
  });
  tx();
  backupDbFile("pre-write");
  cachedCapabilities = data;
  cachedCapabilitiesLoadedAll = true;
}

/**
 * Clear all synced capability data.
 */
export function clearModelsDevCapabilities(): void {
  const db = getDbInstance();
  ensureCapabilitiesTable();
  db.prepare("DELETE FROM model_capabilities").run();
  backupDbFile("pre-write");
  cachedCapabilities = {};
  cachedCapabilitiesLoadedAll = true;
}

// ─── Main sync function ──────────────────────────────────

/**
 * Fetch, transform, and save pricing + capabilities from models.dev.
 */
export async function syncModelsDev(opts?: {
  dryRun?: boolean;
  syncCapabilities?: boolean;
  maxRetries?: number;
  signal?: AbortSignal;
}): Promise<SyncResult> {
  const dryRun = opts?.dryRun ?? false;
  const syncCapabilities = opts?.syncCapabilities ?? true;
  const maxRetries = opts?.maxRetries ?? 3;
  const signal = opts?.signal;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (signal?.aborted) {
      return createAbortedSyncResult(dryRun);
    }

    try {
      const raw = await fetchModelsDev(signal);
      const pricing = transformModelsDevToPricing(raw);
      const capabilities = syncCapabilities ? transformModelsDevToCapabilities(raw) : {};

      const modelCount = Object.values(pricing).reduce(
        (sum, models) => sum + Object.keys(models).length,
        0
      );
      const providerCount = Object.keys(pricing).length;
      const capabilityCount = syncCapabilities
        ? Object.values(capabilities).reduce((sum, models) => sum + Object.keys(models).length, 0)
        : 0;

      if (signal?.aborted) {
        return createAbortedSyncResult(dryRun);
      }

      if (!dryRun) {
        saveModelsDevPricing(pricing);
        if (syncCapabilities) {
          ensureCapabilitiesTable();
          saveModelsDevCapabilities(capabilities);
        }
        lastSyncTime = new Date().toISOString();
        lastSyncModelCount = modelCount;
        lastSyncCapabilityCount = capabilityCount;
      }

      return {
        success: true,
        modelCount,
        providerCount,
        capabilityCount,
        dryRun,
        ...(dryRun ? { data: { pricing, capabilities } } : {}),
      };
    } catch (err) {
      if (signal?.aborted || isAbortError(err)) {
        return createAbortedSyncResult(dryRun);
      }

      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt < maxRetries) {
        const delayMs = Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.warn(
          `[MODELS_DEV] Sync attempt ${attempt + 1} failed, retrying in ${delayMs}ms:`,
          lastError.message
        );
        try {
          await sleepWithAbort(delayMs, signal);
        } catch (sleepError) {
          if (signal?.aborted || isAbortError(sleepError)) {
            return createAbortedSyncResult(dryRun);
          }
          throw sleepError;
        }
      }
    }
  }

  const message = lastError?.message || "Unknown error";
  console.warn(`[MODELS_DEV] Sync failed after ${maxRetries + 1} attempts:`, message);
  return {
    success: false,
    modelCount: 0,
    providerCount: 0,
    capabilityCount: 0,
    dryRun,
    error: message,
  };
}

// ─── Periodic sync ───────────────────────────────────────

/**
 * Start periodic models.dev sync (non-blocking).
 */
export function startPeriodicSync(intervalMs?: number): void {
  if (syncTimer) return; // Already running

  const interval = intervalMs ?? SYNC_INTERVAL_MS;
  activeSyncIntervalMs = interval;
  const syncToken = { stopped: false };
  activePeriodicSyncToken = syncToken;
  console.log(`[MODELS_DEV] Starting periodic sync every ${interval / 1000}s`);

  const launchSync = () => {
    if (syncToken.stopped) {
      return Promise.resolve(createAbortedSyncResult(false));
    }

    if (activeSyncPromise) return activeSyncPromise;

    const controller = new AbortController();
    activeSyncAbortController = controller;
    const promise = syncModelsDev({ signal: controller.signal }).finally(() => {
      if (activeSyncAbortController === controller) {
        activeSyncAbortController = null;
      }
      if (activeSyncPromise === promise) {
        activeSyncPromise = null;
      }
    });
    activeSyncPromise = promise;
    return promise;
  };

  // Initial sync (non-blocking)
  launchSync()
    .then((result) => {
      if (result.success) {
        console.log(
          `[MODELS_DEV] Initial sync complete: ${result.modelCount} pricing entries, ${result.capabilityCount} capabilities from ${result.providerCount} providers`
        );
      }
    })
    .catch((err) => {
      console.warn("[MODELS_DEV] Initial sync error:", err instanceof Error ? err.message : err);
    });

  syncTimer = setInterval(() => {
    launchSync()
      .then((result) => {
        if (result.success) {
          console.log(`[MODELS_DEV] Periodic sync complete: ${result.modelCount} pricing entries`);
        }
      })
      .catch((err) => {
        console.warn("[MODELS_DEV] Periodic sync error:", err instanceof Error ? err.message : err);
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
  if (activePeriodicSyncToken) {
    activePeriodicSyncToken.stopped = true;
    activePeriodicSyncToken = null;
  }

  if (activeSyncAbortController) {
    activeSyncAbortController.abort();
    activeSyncAbortController = null;
  }

  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
    console.log("[MODELS_DEV] Periodic sync stopped");
  }
}

/**
 * Get current sync status.
 */
export function getSyncStatus(): SyncStatus {
  // If the sync timer is active, it's enabled.
  const enabled = syncTimer !== null;
  return {
    enabled,
    lastSync: lastSyncTime,
    lastSyncModelCount,
    lastSyncCapabilityCount,
    nextSync:
      syncTimer && lastSyncTime
        ? new Date(new Date(lastSyncTime).getTime() + activeSyncIntervalMs).toISOString()
        : null,
    intervalMs: activeSyncIntervalMs,
  };
}

// ─── Init (called from server-init.ts) ───────────────────

/**
 * Initialize models.dev sync if enabled.
 */
export async function initModelsDevSync(): Promise<void> {
  const { getSettings } = await import("./localDb");
  const settings = await getSettings();

  if (settings.modelsDevSyncEnabled !== true) {
    console.log("[MODELS_DEV] Disabled (enable via Settings > AI)");
    return;
  }

  const interval = settings.modelsDevSyncInterval as number | undefined;
  startPeriodicSync(interval);
}

/**
 * Get context window limit for a specific model from synced capabilities.
 * Returns null if not available.
 */
export function getModelContextLimit(provider: string, modelId: string): number | null {
  const caps = getSyncedCapabilities(provider, modelId);
  return caps[provider]?.[modelId]?.limit_context ?? null;
}
