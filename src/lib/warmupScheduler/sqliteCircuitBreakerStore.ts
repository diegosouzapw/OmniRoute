import type { CircuitBreakerStore, CircuitBreakerState } from "./circuitBreakerStore";
import {
  getConnectionRuntimeState,
  upsertWarmupState,
  upsertWarmupCircuit,
  clearWarmupCircuit,
  markForbidden,
} from "@/lib/db/connectionRuntimeState";
import { getWarmupBackoffUntil } from "./backoff";
import type { WarmupResult } from "./core";

export class SqliteCircuitBreakerStore implements CircuitBreakerStore {
  async get(connectionId: string): Promise<CircuitBreakerState | null> {
    const row = await getConnectionRuntimeState(connectionId);
    if (!row) return null;
    return {
      connectionId: row.connectionId,
      streak: row.warmupCircuitStreak,
      until: row.warmupCircuitUntil,
      lastFailAt: row.warmupLastFailAt,
      lastWarmupAt: row.lastWarmupAt,
      lastResult: row.lastWarmupResult,
    };
  }

  async recordResult(connectionId: string, result: WarmupResult): Promise<void> {
    if (result.success) {
      await clearWarmupCircuit(connectionId);
      await upsertWarmupState(connectionId, {
        lastWarmupAt: new Date().toISOString(),
        lastResult: "success",
        tokensUsed: result.tokensUsed,
      });
      return;
    }
    if (result.failureKind === "forbidden") {
      await markForbidden(connectionId, new Date().toISOString());
      return;
    }
    const state = await this.get(connectionId);
    const streak = (state?.streak ?? 0) + 1;
    const until =
      result.retryAfterSeconds && Number.isFinite(result.retryAfterSeconds)
        ? new Date(Date.now() + result.retryAfterSeconds * 1000).toISOString()
        : getWarmupBackoffUntil(streak);
    await upsertWarmupCircuit(connectionId, {
      streak,
      until,
      lastFailAt: new Date().toISOString(),
    });
  }

  async isInBackoff(connectionId: string): Promise<boolean> {
    const state = await this.get(connectionId);
    if (!state?.until) return false;
    return new Date(state.until).getTime() > Date.now();
  }
}
