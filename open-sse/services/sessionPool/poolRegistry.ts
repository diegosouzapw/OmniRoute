/**
 * Pool Registry — Global registry for active session pools.
 *
 * Provides a rendezvous point between executors (which create pools)
 * and MCP tools / API handlers (which query pool state).
 *
 * Usage (executor side):
 *   PoolRegistry.register("pollinations", myPool);
 *
 * Usage (MCP tool / API side):
 *   const stats = PoolRegistry.getStats("pollinations");
 *   const all   = PoolRegistry.getAllStats();
 */

import type { SessionPool } from "./sessionPool.ts";
import type { PoolStats, PoolSessionDetail } from "./types.ts";

type PoolEntry = {
  pool: SessionPool;
  createdAt: number;
};

class PoolRegistryImpl {
  private pools = new Map<string, PoolEntry>();

  /** Register a pool for a provider. Overwrites any previous pool. */
  register(provider: string, pool: SessionPool): void {
    this.pools.set(provider, { pool, createdAt: Date.now() });
  }

  /** Unregister a pool */
  unregister(provider: string): boolean {
    return this.pools.delete(provider);
  }

  /** Get a pool by provider name */
  getPool(provider: string): SessionPool | undefined {
    return this.pools.get(provider)?.pool;
  }

  /** List all registered provider names */
  listProviders(): string[] {
    return Array.from(this.pools.keys());
  }

  /** Get stats for a specific provider's pool */
  getStats(provider: string): (PoolStats & { createdAt: number }) | null {
    const entry = this.pools.get(provider);
    if (!entry) return null;
    return { ...entry.pool.getStats(), createdAt: entry.createdAt };
  }

  /** Get stats for all registered pools */
  getAllStats(): Array<PoolStats & { createdAt: number }> {
    const result: Array<PoolStats & { createdAt: number }> = [];
    for (const [, entry] of this.pools) {
      result.push({ ...entry.pool.getStats(), createdAt: entry.createdAt });
    }
    return result;
  }

  /** Get per-session details for a specific provider */
  getSessionDetails(provider: string): PoolSessionDetail[] | null {
    const entry = this.pools.get(provider);
    if (!entry) return null;
    return entry.pool.getSessionDetails();
  }

  /** Reset (shutdown + recreate) a pool */
  resetPool(provider: string): boolean {
    const entry = this.pools.get(provider);
    if (!entry) return false;
    entry.pool.shutdown();
    this.pools.delete(provider);
    return true;
  }

  /** Warm up a pool to a target session count */
  async warmPool(provider: string, count: number): Promise<boolean> {
    const entry = this.pools.get(provider);
    if (!entry) return false;
    await entry.pool.warmUp(count);
    return true;
  }

  /** Count of registered pools */
  get size(): number {
    return this.pools.size;
  }
}

/** Singleton global pool registry */
export const PoolRegistry = new PoolRegistryImpl();
