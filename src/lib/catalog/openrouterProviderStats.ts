/**
 * openrouterProviderStats.ts
 *
 * Enriches OmniRoute's provider directory with data scraped from OpenRouter's
 * *internal* frontend API (openrouter.ai/api/frontend/v1/*) — undocumented and
 * unversioned, unlike the public /api/v1/models consumed by openrouterCatalog.ts.
 * Three bulk endpoints, one request each, refreshed once/day — never per-model:
 *
 *   - all-providers      → provider directory (HQ, ToS/privacy, data policy, status page)
 *   - catalog/models      → model→provider endpoint mapping (for attribution)
 *   - rankings/models      → usage volume (tokens/requests) per model+variant
 *
 * catalog/models rows are joined against rankings/models by `permaslug+variant`
 * and the resulting usage is summed per `provider_slug` — that sum is the
 * popularity signal. All three responses can drift or disappear without notice
 * (nothing here is a documented contract), so every row is parsed defensively
 * with zod `.safeParse()` and skipped on failure rather than failing the batch,
 * and the whole refresh falls back to the last good cache on any fetch error
 * (same stale-if-error shape as openrouterCatalog.ts / arenaEloSync.ts).
 */

import fs from "fs";
import path from "path";
import { z } from "zod";

const ALL_PROVIDERS_URL = "https://openrouter.ai/api/frontend/v1/all-providers";
const CATALOG_MODELS_URL = "https://openrouter.ai/api/frontend/v1/catalog/models";
const RANKINGS_URL = "https://openrouter.ai/api/frontend/v1/rankings/models?view=week";
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const FETCH_TIMEOUT_MS = 15_000;

function getTTL(): number {
  const env = process.env.OPENROUTER_PROVIDER_STATS_TTL_MS;
  const parsed = env ? parseInt(env, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TTL_MS;
}

function getCacheFilePath(): string {
  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  const cacheDir = path.join(dataDir, "cache");
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
  return path.join(cacheDir, "openrouter-provider-stats.json");
}

// ─── Response shapes (defensive — undocumented API) ─────────────────────────

const DataPolicySchema = z
  .object({
    training: z.boolean().optional(),
    retainsPrompts: z.boolean().optional(),
    termsOfServiceURL: z.string().optional(),
    privacyPolicyURL: z.string().optional(),
  })
  .partial()
  .optional();

const ProviderDirectoryRowSchema = z.object({
  slug: z.string().min(1),
  displayName: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  headquarters: z.string().optional(),
  statusPageUrl: z.string().nullable().optional(),
  byokEnabled: z.boolean().optional(),
  dataPolicy: DataPolicySchema,
  icon: z.object({ url: z.string().optional() }).partial().optional(),
});

const CatalogEndpointRowSchema = z.object({
  permaslug: z.string().min(1),
  endpoint: z
    .object({
      variant: z.string().optional(),
      provider_slug: z.string().min(1),
    })
    .passthrough(),
});

const RankingRowSchema = z.object({
  model_permaslug: z.string().min(1),
  variant: z.string().optional(),
  total_prompt_tokens: z.number().nonnegative().optional(),
  total_completion_tokens: z.number().nonnegative().optional(),
  count: z.number().nonnegative().optional(),
});

type ProviderDirectoryRow = z.infer<typeof ProviderDirectoryRowSchema>;
type CatalogEndpointRow = z.infer<typeof CatalogEndpointRowSchema>;
type RankingRow = z.infer<typeof RankingRowSchema>;

export interface ProviderPopularityEntry {
  slug: string;
  displayName: string;
  headquarters?: string;
  statusPageUrl?: string | null;
  byokEnabled?: boolean;
  dataPolicy?: {
    training?: boolean;
    retainsPrompts?: boolean;
    termsOfServiceURL?: string;
    privacyPolicyURL?: string;
  };
  iconUrl?: string;
  modelCount: number;
  totalTokens: number;
  totalRequests: number;
  popularityRank: number;
}

interface CacheFile {
  fetchedAt: string;
  data: ProviderPopularityEntry[];
}

/** Parse an array response body with a zod row schema, skipping rows that fail validation. */
function parseRows<T extends z.ZodTypeAny>(raw: unknown, schema: T): z.infer<T>[] {
  if (!Array.isArray(raw)) return [];
  const out: z.infer<T>[] = [];
  for (const row of raw) {
    const result = schema.safeParse(row);
    if (result.success) out.push(result.data);
  }
  return out;
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "OmniRoute/2.0",
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`${url} returned ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Join catalog endpoint rows against ranking rows (by permaslug+variant), sum
 * usage per provider_slug, then merge in directory metadata and rank by
 * total token volume descending. Pure — no I/O — kept separate for testing.
 */
export function computeProviderPopularity(
  directoryRows: ProviderDirectoryRow[],
  catalogRows: CatalogEndpointRow[],
  rankingRows: RankingRow[]
): ProviderPopularityEntry[] {
  const usageByKey = new Map<string, { tokens: number; requests: number }>();
  for (const row of rankingRows) {
    const key = `${row.model_permaslug}::${row.variant ?? "standard"}`;
    const tokens = (row.total_prompt_tokens ?? 0) + (row.total_completion_tokens ?? 0);
    const existing = usageByKey.get(key);
    if (existing) {
      existing.tokens += tokens;
      existing.requests += row.count ?? 0;
    } else {
      usageByKey.set(key, { tokens, requests: row.count ?? 0 });
    }
  }

  const bySlug = new Map<
    string,
    { modelCount: number; totalTokens: number; totalRequests: number }
  >();
  for (const row of catalogRows) {
    const key = `${row.permaslug}::${row.endpoint.variant ?? "standard"}`;
    const usage = usageByKey.get(key);
    const slug = row.endpoint.provider_slug;
    const agg = bySlug.get(slug) ?? { modelCount: 0, totalTokens: 0, totalRequests: 0 };
    agg.modelCount += 1;
    if (usage) {
      agg.totalTokens += usage.tokens;
      agg.totalRequests += usage.requests;
    }
    bySlug.set(slug, agg);
  }

  const directoryBySlug = new Map(directoryRows.map((row) => [row.slug, row]));

  const entries: ProviderPopularityEntry[] = Array.from(bySlug.entries()).map(([slug, agg]) => {
    const directory = directoryBySlug.get(slug);
    return {
      slug,
      displayName: directory?.displayName || directory?.name || slug,
      headquarters: directory?.headquarters,
      statusPageUrl: directory?.statusPageUrl ?? undefined,
      byokEnabled: directory?.byokEnabled,
      dataPolicy: directory?.dataPolicy,
      iconUrl: directory?.icon?.url,
      modelCount: agg.modelCount,
      totalTokens: agg.totalTokens,
      totalRequests: agg.totalRequests,
      popularityRank: 0, // assigned below
    };
  });

  entries.sort((a, b) => b.totalTokens - a.totalTokens);
  entries.forEach((entry, index) => {
    entry.popularityRank = index + 1;
  });

  return entries;
}

async function fetchFromAPI(): Promise<ProviderPopularityEntry[]> {
  const [directoryRaw, catalogRaw, rankingRaw] = await Promise.all([
    fetchJson(ALL_PROVIDERS_URL),
    fetchJson(CATALOG_MODELS_URL),
    fetchJson(RANKINGS_URL),
  ]);

  const directoryRows = parseRows(
    (directoryRaw as { data?: unknown })?.data,
    ProviderDirectoryRowSchema
  );
  const catalogRows = parseRows((catalogRaw as { data?: unknown })?.data, CatalogEndpointRowSchema);
  const rankingRows = parseRows((rankingRaw as { data?: unknown })?.data, RankingRowSchema);

  return computeProviderPopularity(directoryRows, catalogRows, rankingRows);
}

function readCache(): CacheFile | null {
  const filePath = getCacheFilePath();
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as CacheFile;
  } catch {
    return null;
  }
}

function writeCache(data: ProviderPopularityEntry[]): void {
  const filePath = getCacheFilePath();
  const cache: CacheFile = { fetchedAt: new Date().toISOString(), data };
  try {
    fs.writeFileSync(filePath, JSON.stringify(cache, null, 2), "utf8");
  } catch (err) {
    console.warn("[OpenRouterProviderStats] Failed to write cache:", err);
  }
}

/** Get provider popularity/enrichment stats, honoring the on-disk TTL cache. */
export async function getOpenRouterProviderStats(): Promise<{
  data: ProviderPopularityEntry[];
  stale: boolean;
  cachedAt: string | null;
  fromCache: boolean;
}> {
  const ttl = getTTL();
  const cache = readCache();
  const now = Date.now();

  if (cache && cache.fetchedAt) {
    const age = now - new Date(cache.fetchedAt).getTime();
    if (age < ttl) {
      return { data: cache.data, stale: false, cachedAt: cache.fetchedAt, fromCache: true };
    }
  }

  try {
    const data = await fetchFromAPI();
    writeCache(data);
    return { data, stale: false, cachedAt: null, fromCache: false };
  } catch (err) {
    console.warn("[OpenRouterProviderStats] Fetch failed, using stale cache:", err);
    if (cache) {
      return { data: cache.data, stale: true, cachedAt: cache.fetchedAt, fromCache: true };
    }
    return { data: [], stale: true, cachedAt: null, fromCache: false };
  }
}

/** Force-refresh, ignoring TTL. Used by admin endpoints and manual refresh actions. */
export async function refreshOpenRouterProviderStats(): Promise<{
  data: ProviderPopularityEntry[];
  ok: boolean;
  error?: string;
}> {
  try {
    const data = await fetchFromAPI();
    writeCache(data);
    return { data, ok: true };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    return { data: [], ok: false, error };
  }
}

// ─── Periodic sync (mirrors arenaEloSync.ts's startPeriodicSync shape) ──────

let syncTimer: ReturnType<typeof setInterval> | null = null;

function getEffectiveOpenRouterProviderStatsEnabled(): boolean {
  return process.env.OPENROUTER_PROVIDER_STATS_ENABLED !== "false";
}

function startPeriodicSync(intervalMs?: number): void {
  if (syncTimer) return; // Already running

  const interval = intervalMs ?? getTTL();
  console.log(`[OpenRouterProviderStats] Starting periodic sync every ${interval / 1000}s`);

  refreshOpenRouterProviderStats()
    .then((result) => {
      if (result.ok) {
        console.log(
          `[OpenRouterProviderStats] Initial sync complete: ${result.data.length} providers`
        );
      } else {
        console.warn(`[OpenRouterProviderStats] Initial sync failed: ${result.error}`);
      }
    })
    .catch((err) => {
      console.warn(
        "[OpenRouterProviderStats] Initial sync error:",
        err instanceof Error ? err.message : err
      );
    });

  syncTimer = setInterval(() => {
    refreshOpenRouterProviderStats().catch((err) => {
      console.warn(
        "[OpenRouterProviderStats] Periodic sync error:",
        err instanceof Error ? err.message : err
      );
    });
  }, interval);
  syncTimer.unref();
}

/**
 * Boot entry point — called once from instrumentation-node.ts.
 * On by default; opt out via OPENROUTER_PROVIDER_STATS_ENABLED=false.
 */
export function initOpenRouterProviderStatsSync(): boolean {
  if (!getEffectiveOpenRouterProviderStatsEnabled()) {
    console.log("[OpenRouterProviderStats] Disabled via OPENROUTER_PROVIDER_STATS_ENABLED=false.");
    return false;
  }
  startPeriodicSync();
  return true;
}
