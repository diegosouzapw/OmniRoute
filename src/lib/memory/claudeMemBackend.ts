/**
 * ClaudeMemBackend - MemoryBackend adapter for a local claude-mem worker
 * (https://github.com/thedotmack/claude-mem).
 *
 * claude-mem captures Claude Code / Codex / Cursor sessions into "observations" and serves
 * them from a worker bound to loopback. Registering this backend lets OmniRoute's memory
 * REST API and A2A memory search read (and write) that same store.
 *
 * The worker only listens on loopback, which the GenericMemoryBackend SSRF guard rejects by
 * design. Instead of loosening that guard, this adapter never accepts a host: it always
 * targets 127.0.0.1 and only the port is configurable.
 *
 * Worker API used (claude-mem v13):
 *   POST   /api/memory/save                  → { success, id }
 *   GET    /api/observation/:id              → observation row (404 when missing)
 *   DELETE /api/observation/:id
 *   GET    /api/observations?offset&limit&project → { items, hasMore, offset, limit }
 *   GET    /api/search?query&format=json&type=observations&project&limit → { observations }
 *   GET    /api/health                       → { status: "ok" | "degraded" }
 */

import { z } from "zod";
import { logger } from "../../../open-sse/utils/logger.ts";
import type {
  MemoryBackend,
  CreateMemoryInput,
  MemoryFilter,
  SearchConfig,
  HealthCheckResult,
  Memory,
} from "./backend";
import { MemoryType } from "./types";

const log = logger("CLAUDE_MEM_BACKEND");

export const CLAUDE_MEM_BACKEND_ID = "claude-mem";
const WORKER_HOST = "127.0.0.1";
const ID_PREFIX = "claude-mem:";
const DEFAULT_LIST_LIMIT = 50;

export const ClaudeMemBackendConfigSchema = z
  .object({
    /** claude-mem worker port (CLAUDE_MEM_WORKER_PORT; default is 37700 + uid % 100). */
    port: z.number().int().min(1024).max(65535),
    /**
     * claude-mem project to read/write. When unset, each OmniRoute API key maps to its own
     * project (the apiKeyId). Set it to a Claude Code project name to share that memory.
     */
    project: z.string().trim().min(1).max(200).optional(),
    timeoutMs: z.number().int().min(100).max(30_000).default(5_000),
  })
  .strict();

export type ClaudeMemBackendConfig = z.infer<typeof ClaudeMemBackendConfigSchema>;

/** Observation row as returned by the claude-mem worker (only the fields we read). */
interface ClaudeMemObservation {
  id: number;
  memory_session_id?: string | null;
  project?: string | null;
  type?: string | null;
  title?: string | null;
  subtitle?: string | null;
  narrative?: string | null;
  text?: string | null;
  facts?: string | string[] | null;
  concepts?: string | string[] | null;
  metadata?: string | Record<string, unknown> | null;
  created_at?: string | null;
  created_at_epoch?: number | null;
}

/** OmniRoute fields stashed in claude-mem's free-form metadata so they round-trip. */
interface OmniRouteMeta {
  apiKeyId?: string;
  sessionId?: string;
  type?: string;
  key?: string;
  metadata?: Record<string, unknown>;
}

const OBSERVATION_TYPE_MAP: Record<string, MemoryType> = {
  discovery: MemoryType.FACTUAL,
  decision: MemoryType.PROCEDURAL,
  bugfix: MemoryType.EPISODIC,
  feature: MemoryType.EPISODIC,
  refactor: MemoryType.EPISODIC,
  change: MemoryType.EPISODIC,
};

const MEMORY_TYPES = new Set<string>(Object.values(MemoryType));

function parseJsonField<T>(value: unknown): T | null {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function toStringArray(value: unknown): string[] {
  const parsed = parseJsonField<unknown>(value);
  return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
}

function toDate(row: ClaudeMemObservation): Date {
  const epoch = row.created_at_epoch;
  if (typeof epoch === "number" && Number.isFinite(epoch)) {
    // claude-mem stores milliseconds; tolerate second-resolution rows.
    return new Date(epoch < 1e12 ? epoch * 1000 : epoch);
  }
  const parsed = row.created_at ? new Date(row.created_at) : null;
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date(0);
}

/** Parse "claude-mem:123" → 123. Returns null for ids owned by other backends. */
export function parseClaudeMemId(id: string): number | null {
  if (typeof id !== "string" || !id.startsWith(ID_PREFIX)) return null;
  const raw = id.slice(ID_PREFIX.length);
  if (!/^\d{1,15}$/.test(raw)) return null;
  return Number(raw);
}

export function toClaudeMemId(observationId: number): string {
  return `${ID_PREFIX}${observationId}`;
}

function resolveMemoryType(omni: OmniRouteMeta, row: ClaudeMemObservation): MemoryType {
  if (typeof omni.type === "string" && MEMORY_TYPES.has(omni.type)) return omni.type as MemoryType;
  return OBSERVATION_TYPE_MAP[row.type ?? ""] ?? MemoryType.EPISODIC;
}

function observationMetadata(
  omni: OmniRouteMeta,
  row: ClaudeMemObservation,
  project: string
): Record<string, unknown> {
  return {
    ...(omni.metadata ?? {}),
    source: CLAUDE_MEM_BACKEND_ID,
    project,
    observationType: row.type ?? null,
    subtitle: row.subtitle ?? null,
    facts: toStringArray(row.facts),
    concepts: toStringArray(row.concepts),
  };
}

export function observationToMemory(row: ClaudeMemObservation): Memory {
  const rawMeta = parseJsonField<Record<string, unknown>>(row.metadata) ?? {};
  const omni = (rawMeta.omniroute ?? {}) as OmniRouteMeta;
  const createdAt = toDate(row);
  const project = row.project ?? "";

  return {
    id: toClaudeMemId(row.id),
    apiKeyId: omni.apiKeyId ?? project,
    sessionId: omni.sessionId ?? row.memory_session_id ?? "",
    type: resolveMemoryType(omni, row),
    key: omni.key ?? row.title ?? toClaudeMemId(row.id),
    content: row.narrative || row.text || row.title || "",
    metadata: observationMetadata(omni, row, project),
    createdAt,
    updatedAt: createdAt,
    expiresAt: null,
    accessCount: 0,
    lastAccessedAt: null,
  };
}

/** Rough token estimate (chars / 4), matching the heuristic used elsewhere in memory. */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export class ClaudeMemBackend implements MemoryBackend {
  readonly id = CLAUDE_MEM_BACKEND_ID;
  readonly displayName = "claude-mem (local worker)";

  private readonly config: ClaudeMemBackendConfig;
  private readonly baseUrl: string;

  constructor(config: ClaudeMemBackendConfig) {
    this.config = ClaudeMemBackendConfigSchema.parse(config);
    this.baseUrl = `http://${WORKER_HOST}:${this.config.port}`;
  }

  private projectFor(apiKeyId?: string): string | undefined {
    return this.config.project ?? (apiKeyId || undefined);
  }

  private async request(
    method: "GET" | "POST" | "DELETE",
    path: string,
    params?: Record<string, string | number | undefined>,
    body?: unknown
  ): Promise<Response> {
    const url = new URL(path, this.baseUrl);
    for (const [k, v] of Object.entries(params ?? {})) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
    try {
      return await fetch(url, {
        method,
        headers: body === undefined ? undefined : { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(this.config.timeoutMs),
      });
    } catch (error) {
      log.warn("claude-mem.request.failed", { method, path, error: String(error) });
      throw new Error(`claude-mem worker unreachable (${method} ${path})`);
    }
  }

  private async requestJson<T>(
    method: "GET" | "POST" | "DELETE",
    path: string,
    params?: Record<string, string | number | undefined>,
    body?: unknown
  ): Promise<T> {
    const res = await this.request(method, path, params, body);
    if (!res.ok) {
      throw new Error(`claude-mem worker returned HTTP ${res.status} (${method} ${path})`);
    }
    return (await res.json()) as T;
  }

  async initialize(): Promise<void> {
    const health = await this.health();
    if (!health.ok) {
      // Not fatal: the worker is often started lazily by the first Claude Code session.
      log.warn("claude-mem.backend.unhealthy", { port: this.config.port, error: health.error });
    }
  }

  async create(input: CreateMemoryInput): Promise<Memory> {
    const omniroute: OmniRouteMeta = {
      apiKeyId: input.apiKeyId,
      sessionId: input.sessionId,
      type: input.type,
      key: input.key,
      metadata: input.metadata ?? {},
    };
    const result = await this.requestJson<{ success?: boolean; id?: number }>(
      "POST",
      "/api/memory/save",
      undefined,
      {
        text: input.content,
        title: input.key,
        project: this.projectFor(input.apiKeyId),
        metadata: { omniroute },
      }
    );
    if (!result.success || typeof result.id !== "number") {
      throw new Error("claude-mem worker did not return an observation id");
    }

    const now = new Date();
    return {
      id: toClaudeMemId(result.id),
      apiKeyId: input.apiKeyId,
      sessionId: input.sessionId,
      type: input.type,
      key: input.key,
      content: input.content,
      metadata: {
        ...(input.metadata ?? {}),
        source: CLAUDE_MEM_BACKEND_ID,
        project: this.projectFor(input.apiKeyId) ?? null,
      },
      createdAt: now,
      updatedAt: now,
      // claude-mem has no TTL; expiry is not enforced by this backend.
      expiresAt: null,
      accessCount: 0,
      lastAccessedAt: null,
    };
  }

  async get(id: string): Promise<Memory | null> {
    const observationId = parseClaudeMemId(id);
    if (observationId === null) return null;
    const res = await this.request("GET", `/api/observation/${observationId}`);
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`claude-mem worker returned HTTP ${res.status} (GET /api/observation)`);
    }
    return observationToMemory((await res.json()) as ClaudeMemObservation);
  }

  /** claude-mem observations are immutable; updates are not supported. */
  async update(id: string): Promise<boolean> {
    log.warn("claude-mem.update.unsupported", { id });
    return false;
  }

  async delete(id: string): Promise<boolean> {
    const observationId = parseClaudeMemId(id);
    if (observationId === null) return false;
    const res = await this.request("DELETE", `/api/observation/${observationId}`);
    if (res.status === 404) return false;
    if (!res.ok) {
      throw new Error(`claude-mem worker returned HTTP ${res.status} (DELETE /api/observation)`);
    }
    return true;
  }

  async list(
    filter: MemoryFilter
  ): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }> {
    const offset = Math.max(0, filter.offset ?? 0);
    const limit = Math.min(Math.max(1, filter.limit ?? DEFAULT_LIST_LIMIT), 200);
    let data: Memory[];
    let hasMore = false;

    if (filter.query) {
      data = await this.search({
        query: filter.query,
        apiKeyId: filter.apiKeyId ?? "",
        limit,
      });
    } else {
      const page = await this.requestJson<{ items?: ClaudeMemObservation[]; hasMore?: boolean }>(
        "GET",
        "/api/observations",
        { offset, limit, project: this.projectFor(filter.apiKeyId) }
      );
      data = (page.items ?? []).map(observationToMemory);
      hasMore = page.hasMore === true;
    }

    if (filter.type) data = data.filter((m) => m.type === filter.type);
    if (filter.sessionId) data = data.filter((m) => m.sessionId === filter.sessionId);

    const byType: Record<string, number> = {};
    for (const m of data) byType[m.type] = (byType[m.type] ?? 0) + 1;

    // The worker paginates without a total count; report what is known, plus one when another
    // page exists so offset/limit paginators keep going.
    return { data, total: offset + data.length + (hasMore ? 1 : 0), byType };
  }

  async search(config: SearchConfig): Promise<Memory[]> {
    const limit = Math.min(Math.max(1, config.limit ?? 10), 100);
    const result = await this.requestJson<{ observations?: ClaudeMemObservation[] }>(
      "GET",
      "/api/search",
      {
        query: config.query,
        format: "json",
        type: "observations",
        limit,
        project: this.projectFor(config.apiKeyId),
      }
    );
    const memories = (result.observations ?? []).map(observationToMemory);
    if (!config.maxTokens || config.maxTokens <= 0) return memories;

    const budgeted: Memory[] = [];
    let used = 0;
    for (const memory of memories) {
      const cost = estimateTokens(memory.content);
      if (used + cost > config.maxTokens) break;
      budgeted.push(memory);
      used += cost;
    }
    return budgeted;
  }

  async health(): Promise<HealthCheckResult> {
    const start = Date.now();
    try {
      const res = await this.request("GET", "/api/health");
      const latencyMs = Date.now() - start;
      if (!res.ok) return { ok: false, latencyMs, error: `HTTP ${res.status}` };
      const body = (await res.json().catch(() => ({}))) as { status?: string };
      return body.status === "ok"
        ? { ok: true, latencyMs }
        : { ok: false, latencyMs, error: `status ${body.status ?? "unknown"}` };
    } catch {
      return { ok: false, latencyMs: Date.now() - start, error: "worker unreachable" };
    }
  }
}

/**
 * Register the claude-mem backend when `backendConfigs["claude-mem"]` is present in memory
 * settings. Invalid config is logged and skipped so a typo never blocks the SQLite primary.
 */
export function createClaudeMemBackendFromSettings(
  backendConfigs: Record<string, Record<string, unknown>> | undefined
): ClaudeMemBackend | null {
  const raw = backendConfigs?.[CLAUDE_MEM_BACKEND_ID];
  if (!raw) return null;
  const parsed = ClaudeMemBackendConfigSchema.safeParse(raw);
  if (!parsed.success) {
    log.warn("claude-mem.backend.invalid_config", {
      issues: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
    });
    return null;
  }
  return new ClaudeMemBackend(parsed.data);
}
