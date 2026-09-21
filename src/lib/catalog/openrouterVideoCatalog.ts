/**
 * OpenRouter's dedicated, authoritative video-model catalog.
 *
 * This endpoint exposes video-specific capabilities that are not guaranteed to
 * appear in the general `/models` response. Keep a disk-backed TTL cache and
 * stale-if-error behavior so `/v1/models` remains available during an upstream
 * catalog outage.
 */

import fs from "fs";
import path from "path";
import { fetchWithTimeout } from "@/shared/utils/fetchTimeout";

export const OPENROUTER_VIDEO_MODELS_URL = "https://openrouter.ai/api/v1/videos/models";
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 15_000;

export interface OpenRouterVideoCatalogEntry {
  id: string;
  canonical_slug?: string;
  name?: string;
  description?: string;
  created?: number;
  supported_resolutions?: string[];
  supported_aspect_ratios?: string[];
  supported_sizes?: string[] | null;
  supported_durations?: number[];
  supported_frame_images?: string[];
  generate_audio?: boolean;
  allowed_passthrough_parameters?: string[];
  pricing_skus?: Record<string, string | number>;
}

interface CacheFile {
  fetchedAt: string;
  data: OpenRouterVideoCatalogEntry[];
}

function ttlMs(): number {
  const parsed = Number(process.env.OPENROUTER_VIDEO_CATALOG_TTL_MS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TTL_MS;
}

function cachePath(): string {
  const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
  const cacheDir = path.join(dataDir, "cache");
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  return path.join(cacheDir, "openrouter-video-catalog.json");
}

function readCache(): CacheFile | null {
  try {
    const file = cachePath();
    if (!fs.existsSync(file)) return null;
    const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as CacheFile;
    return Array.isArray(parsed?.data) && typeof parsed?.fetchedAt === "string" ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(data: OpenRouterVideoCatalogEntry[]): void {
  try {
    fs.writeFileSync(
      cachePath(),
      JSON.stringify({ fetchedAt: new Date().toISOString(), data } satisfies CacheFile, null, 2),
      "utf8"
    );
  } catch (error) {
    console.warn("[OpenRouterVideoCatalog] Failed to write cache:", error);
  }
}

export function parseOpenRouterVideoCatalog(payload: unknown): OpenRouterVideoCatalogEntry[] {
  const data =
    payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : [];
  const seen = new Set<string>();
  const models: OpenRouterVideoCatalogEntry[] = [];
  for (const raw of data) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const row = raw as Record<string, unknown>;
    if (typeof row.id !== "string" || !row.id.trim()) continue;
    const id = row.id.trim();
    if (seen.has(id)) continue;
    seen.add(id);
    models.push({ ...(row as unknown as OpenRouterVideoCatalogEntry), id });
  }
  return models;
}

async function fetchFresh(): Promise<OpenRouterVideoCatalogEntry[]> {
  const response = await fetchWithTimeout(OPENROUTER_VIDEO_MODELS_URL, {
    method: "GET",
    headers: { Accept: "application/json", "User-Agent": "OmniRoute/3" },
    timeoutMs: FETCH_TIMEOUT_MS,
  });
  if (!response.ok) {
    throw new Error(`OpenRouter video catalog HTTP ${response.status}`);
  }
  return parseOpenRouterVideoCatalog(await response.json());
}

export async function getOpenRouterVideoCatalog(): Promise<{
  data: OpenRouterVideoCatalogEntry[];
  stale: boolean;
  cachedAt: string | null;
  fromCache: boolean;
}> {
  const cached = readCache();
  if (cached && Date.now() - new Date(cached.fetchedAt).getTime() < ttlMs()) {
    return { data: cached.data, stale: false, cachedAt: cached.fetchedAt, fromCache: true };
  }

  try {
    const data = await fetchFresh();
    writeCache(data);
    return { data, stale: false, cachedAt: null, fromCache: false };
  } catch (error) {
    console.warn("[OpenRouterVideoCatalog] Fetch failed, using stale cache:", error);
    return cached
      ? { data: cached.data, stale: true, cachedAt: cached.fetchedAt, fromCache: true }
      : { data: [], stale: true, cachedAt: null, fromCache: false };
  }
}
