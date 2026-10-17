/**
 * sharedSync.ts — Abstract base class for intelligence syncs.
 *
 * Provides shared helpers for timestamp management, backoff/fresh checks,
 * and a common SyncResult interface. Must not edit existing sync files or baseSync.ts.
 */
import { BaseSync, BaseSyncConfig } from "../baseSync";
import { readKvTimestamp, writeKvTimestamp, clearKvTimestamp } from "@/lib/db/kv";

export interface IntelligenceSyncResult {
  success: boolean;
  modelCount: number;
  source: string;
  error?: string;
}

export abstract class IntelligenceSync<
  TResponse = unknown,
  TEntry = unknown
> extends BaseSync {
  protected readonly logTag: string;

  constructor(source: string, namespace: string, backoffMs: number) {
    const config: BaseSyncConfig = {
      source,
      namespace,
      backoffMs,
    };
    super(config);
    this.logTag = `[${source.toUpperCase()}_SYNC]`;
  }

  /**
   * Fetch data from the external source.
   */
  abstract fetch(): Promise<TResponse>;

  /**
   * Transform fetched response into normalized entries.
   */
  abstract transform(response: TResponse): TEntry[];

  /**
   * Determine if this sync is enabled.
   */
  abstract getEnabled(): boolean | Promise<boolean>;

  /**
   * Read timestamp for the given key from KV.
   * Fail-closed semantics: returns null on errors.
   */
  protected async readTimestamp(key: string): Promise<number | null> {
    return readKvTimestamp(this.config.namespace, key);
  }

  /**
   * Write timestamp for the given key to KV.
   * Fail-closed semantics: logs warning on errors but does not throw.
   */
  protected async writeTimestamp(key: string, ts: number): Promise<void> {
    return writeKvTimestamp(this.config.namespace, key, ts);
  }

  /**
   * Clear timestamp for the given key from KV.
   * Fail-closed semantics: swallows errors.
   */
  protected async clearTimestamp(key: string): Promise<void> {
    return clearKvTimestamp(this.config.namespace, key);
  }

  /**
   * Check if backoff period has passed since last failure.
   * Returns true if we are ready to retry.
   */
  protected async isBackoffExpired(lastFailedAt: number | null, now: number = Date.now()): Promise<boolean> {
    if (lastFailedAt === null) {
      return true;
    }
    const backoffMs = this.getFailureBackoffMs();
    return now >= lastFailedAt + backoffMs;
  }

  /**
   * Check if the data is considered fresh based on last sync time.
   * Uses a conservative default freshness window if not overridden.
   */
  protected async isFresh(lastSyncAt: number | null, freshnessMs: number = 24 * 60 * 60 * 1000): Promise<boolean> {
    if (lastSyncAt === null) {
      return false;
    }
    return Date.now() < lastSyncAt + freshnessMs;
  }

  /**
   * Get the log tag for this sync.
   */
  protected getLogTag(): string {
    return this.logTag;
  }
}