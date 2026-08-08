/**
 * MemoryManager - Singleton orchestrator for memory backends
 * Handles registration, routing, fallback, and caching
 */
import { logger } from "../../../open-sse/utils/logger.ts";
import type {
  MemoryBackend,
  CreateMemoryInput,
  MemoryFilter,
  SearchConfig,
  HealthCheckResult,
} from "./backend";
import type { Memory } from "./types";
const log = logger("MEMORY_MANAGER");
type BackendRegistry = Map<string, MemoryBackend>;

class MemoryManager {
  private static instance: MemoryManager;
  private backends: BackendRegistry = new Map();
  private primaryBackendId: string = "sqlite";
  private fallbackBackendIds: string[] = [];
  private initialized = false;

  private constructor() {}

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  /** Register a backend implementation */
  register(backend: MemoryBackend): void {
    if (this.backends.has(backend.id)) {
      log.warn(`Backend "${backend.id}" already registered, overwriting`, { id: backend.id });
    }
    this.backends.set(backend.id, backend);
    log.info("Registered backend", { id: backend.id, displayName: backend.displayName });
  }

  /** Unregister a backend */
  unregister(backendId: string): void {
    const backend = this.backends.get(backendId);
    if (backend?.shutdown) {
      backend
        .shutdown()
        .catch((e) => log.error(`Shutdown error for ${backendId}`, { error: String(e) }));
    }
    this.backends.delete(backendId);
    log.info("Unregistered backend", { id: backendId });
  }

  /** Get a backend by ID */
  getBackend(backendId?: string): MemoryBackend | undefined {
    const id = backendId ?? this.primaryBackendId;
    return this.backends.get(id);
  }

  /** Get the primary backend (must exist) */
  getPrimaryBackend(): MemoryBackend {
    const backend = this.getBackend(this.primaryBackendId);
    if (!backend) {
      throw new Error(`[MemoryManager] Primary backend "${this.primaryBackendId}" not registered`);
    }
    return backend;
  }

  /** Get fallback backends in order */
  getFallbackBackends(): MemoryBackend[] {
    return this.fallbackBackendIds
      .map((id) => this.backends.get(id))
      .filter((b): b is MemoryBackend => b !== undefined);
  }

  /** Configure primary and fallback backends */
  configure(primary: string, fallbacks: string[] = []): void {
    if (!this.backends.has(primary)) {
      throw new Error(`[MemoryManager] Primary backend "${primary}" not registered`);
    }
    this.primaryBackendId = primary;
    this.fallbackBackendIds = fallbacks.filter((id) => this.backends.has(id));
    log.info("Configured backends", {
      primary,
      fallbacks: this.fallbackBackendIds,
    });
  }

  /** Initialize all registered backends */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    for (const [id, backend] of this.backends) {
      if (backend.initialize) {
        try {
          await backend.initialize();
          log.info("Initialized backend", { id });
        } catch (e) {
          log.error(`Failed to initialize backend ${id}`, { error: String(e) });
        }
      }
    }
    this.initialized = true;
  }

  /** Shutdown all backends */
  async shutdown(): Promise<void> {
    for (const [id, backend] of this.backends) {
      if (backend.shutdown) {
        try {
          await backend.shutdown();
        } catch (e) {
          log.error(`Shutdown error for ${id}`, { error: String(e) });
        }
      }
    }
    this.initialized = false;
  }

  // ─── Delegated CRUD with fallback ───

  async create(input: CreateMemoryInput): Promise<Memory> {
    const primary = this.getPrimaryBackend();
    return primary.create(input);
  }

  async get(id: string): Promise<Memory | null> {
    // Try primary first
    const primary = this.getPrimaryBackend();
    const result = await primary.get(id);
    if (result) return result;

    // Try fallbacks
    for (const backend of this.getFallbackBackends()) {
      const fallbackResult = await backend.get(id);
      if (fallbackResult) return fallbackResult;
    }
    return null;
  }

  async update(id: string, updates: Partial<Omit<Memory, "id" | "createdAt">>): Promise<boolean> {
    const primary = this.getPrimaryBackend();
    const updated = await primary.update(id, updates);

    // Also try to update in fallbacks (fire-and-forget, don't fail on fallback errors)
    for (const backend of this.getFallbackBackends()) {
      backend
        .update(id, updates)
        .catch((e) => log.warn(`Fallback update failed for ${backend.id}`, { error: String(e) }));
    }
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const primary = this.getPrimaryBackend();
    const deleted = await primary.delete(id);

    // Also delete from fallbacks
    for (const backend of this.getFallbackBackends()) {
      backend
        .delete(id)
        .catch((e) => log.warn(`Fallback delete failed for ${backend.id}`, { error: String(e) }));
    }
    return deleted;
  }

  async list(
    filter: MemoryFilter
  ): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }> {
    // Only primary handles list (fallbacks are for get/search redundancy)
    return this.getPrimaryBackend().list(filter);
  }

  // ─── Search with fallback ───

  async search(config: SearchConfig): Promise<Memory[]> {
    const primary = this.getPrimaryBackend();
    try {
      return await primary.search(config);
    } catch (primaryError) {
      log.warn("Primary search failed, trying fallbacks", { error: String(primaryError) });

      for (const backend of this.getFallbackBackends()) {
        try {
          return await backend.search(config);
        } catch (fallbackError) {
          log.warn(`Fallback ${backend.id} search failed`, { error: String(fallbackError) });
        }
      }
      return [];
    }
  }

  // ─── Health check across all backends ───

  async healthCheckAll(): Promise<Record<string, HealthCheckResult>> {
    const results: Record<string, HealthCheckResult> = {};
    for (const [id, backend] of this.backends) {
      results[id] = await backend.health();
    }
    return results;
  }

  /** Get all registered backend info */
  getRegisteredBackends(): { id: string; displayName: string; isPrimary: boolean }[] {
    return Array.from(this.backends.entries()).map(([id, backend]) => ({
      id,
      displayName: backend.displayName,
      isPrimary: id === this.primaryBackendId,
    }));
  }
}

export const memoryManager = MemoryManager.getInstance();
export default memoryManager;
