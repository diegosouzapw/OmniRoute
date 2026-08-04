import { getAllSyncedAvailableModels } from "./db/models";
import { getResolvedModelCapabilities } from "./modelCapabilities";
import {
  getModelContextOverrideRecord,
  setModelContextOverride,
  removeModelContextOverride,
} from "./db/modelContextOverrides";

/**
 * Feature 5004 — self-correcting context-window reconciler.
 *
 * Compares each model's provider-declared window (captured by `/models` discovery in
 * `syncedAvailableModels`) against the override-free catalog and, when they diverge,
 * pins the discovered value as an `auto:discovery` override so the real window wins in
 * `getModelContextLimit`. It never touches `manual` overrides, and it self-heals by
 * removing a now-redundant auto override when the catalog has caught up.
 *
 * No new network fetch: it reconciles data the managed-model import already persisted,
 * so it does not duplicate `modelsDevSync` / `modelDiscovery`.
 */

export interface DiscoveredWindow {
  provider: string;
  modelId: string;
  window: number | null;
}

export interface ReconcileDeps {
  getCatalogWindow: (provider: string, modelId: string) => number | null;
  getExistingSource: (provider: string, modelId: string) => string | null;
  writeAuto: (provider: string, modelId: string, window: number) => void;
  removeOverride: (provider: string, modelId: string) => void;
}

export interface ReconcileResult {
  scanned: number;
  written: number;
  removed: number;
  skippedManual: number;
}

/**
 * Pure reconcile: given the discovered windows and a set of injectable deps, decide
 * which auto overrides to write/remove. Deterministic and side-effect-free except
 * through the injected `writeAuto`/`removeOverride`.
 */
export function reconcileContextWindows(
  discovered: DiscoveredWindow[],
  deps: ReconcileDeps
): ReconcileResult {
  const result: ReconcileResult = { scanned: 0, written: 0, removed: 0, skippedManual: 0 };
  for (const { provider, modelId, window } of discovered) {
    result.scanned++;
    if (!provider || !modelId) continue;
    if (typeof window !== "number" || !Number.isInteger(window) || window <= 0) continue;

    const existingSource = deps.getExistingSource(provider, modelId);
    if (existingSource === "manual") {
      result.skippedManual++;
      continue;
    }

    const catalog = deps.getCatalogWindow(provider, modelId);
    if (window !== catalog) {
      deps.writeAuto(provider, modelId, window);
      result.written++;
    } else if (existingSource) {
      // Discovered window now matches the catalog and a stale auto override exists → drop it.
      deps.removeOverride(provider, modelId);
      result.removed++;
    }
  }
  return result;
}

/** Flatten the per-provider discovery map into the reconcile input. */
function toDiscoveredWindows(
  byProvider: Record<string, Array<{ id: string; inputTokenLimit?: number }>>
): DiscoveredWindow[] {
  const out: DiscoveredWindow[] = [];
  for (const [provider, models] of Object.entries(byProvider)) {
    for (const m of models) {
      out.push({ provider, modelId: m.id, window: m.inputTokenLimit ?? null });
    }
  }
  return out;
}

/** Run the reconcile against the live DB (discovery → overrides). */
export async function runContextWindowReconcile(): Promise<ReconcileResult> {
  const byProvider = await getAllSyncedAvailableModels();
  const discovered = toDiscoveredWindows(byProvider);
  return reconcileContextWindows(discovered, {
    getCatalogWindow: (provider, modelId) =>
      getResolvedModelCapabilities({ provider, model: modelId }).contextWindow,
    getExistingSource: (provider, modelId) =>
      getModelContextOverrideRecord(provider, modelId)?.source ?? null,
    writeAuto: (provider, modelId, window) => {
      setModelContextOverride(provider, modelId, window, "auto:discovery");
    },
    removeOverride: (provider, modelId) => {
      removeModelContextOverride(provider, modelId);
    },
  });
}

// --- Periodic job (mirrors modelsDevSync.startPeriodicSync) ---

const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h
let reconcileTimer: ReturnType<typeof setInterval> | null = null;

function resolveIntervalMs(): number {
  const raw = process.env.CONTEXT_WINDOW_RECONCILE_INTERVAL;
  if (raw === undefined) return DEFAULT_INTERVAL_MS;
  const seconds = Number(raw);
  if (!Number.isFinite(seconds) || seconds <= 0) return 0; // 0/invalid → disabled
  return Math.floor(seconds * 1000);
}

/**
 * Start the periodic reconcile. Idempotent. Disabled when
 * `CONTEXT_WINDOW_RECONCILE_INTERVAL=0`. Best-effort: failures are swallowed (the
 * static catalog remains the source of truth).
 */
export function startContextWindowReconcile(intervalMs?: number): void {
  if (reconcileTimer) return;
  const interval = intervalMs ?? resolveIntervalMs();
  if (!interval || interval <= 0) return;

  const tick = () => {
    void runContextWindowReconcile().catch(() => {
      // Swallow — reconcile is advisory; the catalog still resolves windows.
    });
  };

  // Initial non-blocking pass, then on the interval.
  setTimeout(tick, 0);
  reconcileTimer = setInterval(tick, interval);
  reconcileTimer.unref?.();
}

export function stopContextWindowReconcile(): void {
  if (reconcileTimer) {
    clearInterval(reconcileTimer);
    reconcileTimer = null;
  }
}
