/**
 * Live AI Horde image-model detector.
 *
 * Horde workers appear and disappear. A static IMAGE_PROVIDERS list goes stale.
 * This module polls `GET /v2/status/models?type=image` and keeps only models
 * with at least one worker (`count > 0`). Names are the exact Horde strings
 * (do not slugify). On poll failure the last good snapshot is kept.
 */

import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { registerDynamicImageModelSource } from "../config/dynamicImageModelSources.ts";

export const AI_HORDE_API_BASE = "https://aihorde.net/api";
export const AI_HORDE_ANONYMOUS_KEY = "0000000000";
export const AI_HORDE_CLIENT_AGENT = "OmniRoute:3.8.49:https://github.com/diegosouzapw/OmniRoute";
export const AI_HORDE_CATALOG_POLL_MS = 30_000;
// The catalog endpoint is a fixed, trusted OmniRoute-controlled URL (not
// user-supplied), so it does not need SSRF host validation — but it still
// needs a hard bound so a hung upstream cannot block a request indefinitely.
export const AI_HORDE_CATALOG_FETCH_TIMEOUT_MS = 15_000;

export interface HordeImageCatalogModel {
  name: string;
  count: number;
  queued: number | null;
  eta: number | null;
  performance: number | null;
  jobs: number | null;
}

export interface HordeImageCatalogSnapshot {
  models: HordeImageCatalogModel[];
  updatedAt: number | null;
  lastError: string | null;
}

type HordeFetchInit = RequestInit & { timeoutMs?: number };
type HordeFetch = (input: string, init?: HordeFetchInit) => Promise<Response>;

// Bounded default transport: fixed trusted host (guard "none"), abort-aware
// timeout. Callers that inject a custom `fetchImpl` (tests, alternate
// transports) opt out of this bound deliberately.
const defaultHordeFetch: HordeFetch = (input, init) => {
  const { timeoutMs, ...rest } = init || {};
  return safeOutboundFetch(input, {
    guard: "none",
    timeoutMs: timeoutMs ?? AI_HORDE_CATALOG_FETCH_TIMEOUT_MS,
    ...rest,
  });
};

function asNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function asInt(value: unknown): number | null {
  const parsed = asNumber(value);
  return parsed === null ? null : Math.trunc(parsed);
}

/**
 * Keep image models that currently have at least one worker.
 * @throws {Error} when the payload is not a JSON array
 */
export function parseHordeImageModels(payload: unknown): HordeImageCatalogModel[] {
  if (!Array.isArray(payload)) {
    throw new Error("Horde model catalog must be a JSON array");
  }

  const models: HordeImageCatalogModel[] = [];
  for (const item of payload) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const name = row.name;
    if (typeof name !== "string" || !name.trim()) continue;
    const modelType = row.type ?? "image";
    if (modelType !== null && modelType !== "image") continue;
    const count = asInt(row.count ?? 0) ?? 0;
    if (count <= 0) continue;
    models.push({
      name,
      count,
      queued: asNumber(row.queued),
      eta: asInt(row.eta),
      performance: asNumber(row.performance),
      jobs: asNumber(row.jobs),
    });
  }
  models.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  return models;
}

export class HordeImageCatalog {
  pollMs: number;
  private models = new Map<string, HordeImageCatalogModel>();
  private updatedAt: number | null = null;
  private lastError: string | null = null;
  private inflight: Promise<void> | null = null;
  private fetchImpl: HordeFetch;

  constructor(options: { pollMs?: number; fetchImpl?: HordeFetch } = {}) {
    this.pollMs = Math.max(5_000, options.pollMs ?? AI_HORDE_CATALOG_POLL_MS);
    this.fetchImpl = options.fetchImpl ?? defaultHordeFetch;
  }

  get snapshot(): HordeImageCatalogSnapshot {
    return {
      models: this.listModels(),
      updatedAt: this.updatedAt,
      lastError: this.lastError,
    };
  }

  get stale(): boolean {
    return this.lastError !== null && this.updatedAt !== null;
  }

  listModels(): HordeImageCatalogModel[] {
    return [...this.models.values()].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
  }

  get(name: string): HordeImageCatalogModel | undefined {
    return this.models.get(name);
  }

  isServed(name: string): boolean {
    const model = this.models.get(name);
    return Boolean(model && model.count > 0);
  }

  hasSnapshot(): boolean {
    return this.updatedAt !== null;
  }

  replace(models: HordeImageCatalogModel[], error: string | null = null): void {
    this.models = new Map(models.map((model) => [model.name, model]));
    if (error === null) {
      this.updatedAt = Date.now();
      this.lastError = null;
    } else {
      this.lastError = error;
    }
  }

  /** Drop the snapshot so the next `ensureFresh` must hit Horde. */
  clear(): void {
    this.models = new Map();
    this.updatedAt = null;
    this.lastError = null;
  }

  setFetch(fetchImpl: HordeFetch): void {
    this.fetchImpl = fetchImpl;
  }

  async refresh(options: { timeoutMs?: number; signal?: AbortSignal } = {}): Promise<void> {
    if (this.inflight) return this.inflight;
    this.inflight = this.refreshOnce(options).finally(() => {
      this.inflight = null;
    });
    return this.inflight;
  }

  async ensureFresh(
    maxAgeMs = this.pollMs,
    options: { timeoutMs?: number; signal?: AbortSignal } = {}
  ): Promise<void> {
    if (this.updatedAt !== null && Date.now() - this.updatedAt < maxAgeMs && !this.lastError) {
      return;
    }
    await this.refresh(options);
  }

  private async refreshOnce(
    options: { timeoutMs?: number; signal?: AbortSignal } = {}
  ): Promise<void> {
    try {
      const url = `${AI_HORDE_API_BASE}/v2/status/models?type=image`;
      const response = await this.fetchImpl(url, {
        method: "GET",
        headers: { Accept: "application/json", "Client-Agent": AI_HORDE_CLIENT_AGENT },
        signal: options.signal,
        timeoutMs: options.timeoutMs,
      });
      if (!response.ok) {
        throw new Error(`Horde catalog HTTP ${response.status}`);
      }
      const models = parseHordeImageModels(await response.json());
      this.replace(models);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.lastError = message;
    }
  }
}

export const aiHordeImageCatalog = new HordeImageCatalog();

export function resetAiHordeImageCatalog(): void {
  aiHordeImageCatalog.clear();
}

export function getCachedAiHordeImageCatalogEntries(): Array<{
  id: string;
  name: string;
  provider: string;
  supportedSizes: string[];
  inputModalities: string[];
  description?: string;
}> {
  return aiHordeImageCatalog.listModels().map((model) => ({
    id: `aihorde/${model.name}`,
    name: `${model.name} (AI Horde)`,
    provider: "aihorde",
    supportedSizes: ["512x512", "768x768", "1024x1024", "1024x768", "768x1024"],
    inputModalities: ["text", "image"],
    description: `${model.count} worker${model.count === 1 ? "" : "s"} online`,
  }));
}

// Self-registration (#10692): the IMAGE_PROVIDERS entry for `aihorde` reads its models
// through `dynamicImageModelSources` instead of importing this server-only module, so the
// browser graph stays free of the SQLite driver. Importing this file — which every server
// path needing live models already does — restores the live list.
registerDynamicImageModelSource("aihorde", () =>
  getCachedAiHordeImageCatalogEntries().map((entry) => ({
    id: entry.id.startsWith("aihorde/") ? entry.id.slice("aihorde/".length) : entry.id,
    name: entry.name,
    inputModalities: entry.inputModalities,
  }))
);
