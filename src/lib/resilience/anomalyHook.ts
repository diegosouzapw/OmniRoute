/**
 * resilience/anomalyHook.ts — Telemetry → self-healing pipeline glue.
 *
 * Engine code calls `recordHealthSample(providerId, metric, value)` once
 * per completed provider request. The hook:
 *   - Gates on the OMNIROUTE_SELF_HEALING_ENABLED feature flag
 *   - Forwards to SelfHealingManager.recordHealthSample
 *   - Swallows all exceptions so the calling request path never sees
 *     telemetry failures
 */

import { isFeatureFlagEnabled } from "../../shared/utils/featureFlags.ts";
import { resolveSelfHealingSettings } from "./selfHealingSettings";
import { SelfHealingManager } from "./selfHealingManager";
import { createAnomalyDetector } from "./anomalyDetector";

type Manager = SelfHealingManager;

let _manager: Manager | null = null;
let _providerManagerRegistry: Map<string, unknown> | null = null;

export function getSelfHealingManager(): Manager {
  if (!_manager) {
    _manager = new SelfHealingManager({
      settings: resolveSelfHealingSettings({}),
      detector: createAnomalyDetector(),
      probe: {
        degrade: async (providerId, cooloffSec, reason) => {
          const reg = getProviderManagerRegistry();
          const mgr = reg.get(providerId) as
            | { markDegraded?: (s: number, r: string) => Promise<void> | void }
            | undefined;
          if (mgr?.markDegraded) await mgr.markDegraded(cooloffSec, reason);
        },
        rotateProxy: async (providerId, rotateCount, reason) => {
          const reg = getProviderManagerRegistry();
          const mgr = reg.get(providerId) as
            | { rotateProxy?: (n: number, r: string) => Promise<void> | void }
            | undefined;
          if (mgr?.rotateProxy) await mgr.rotateProxy(rotateCount, reason);
        },
        dropCooldown: async (providerId, reason) => {
          const reg = getProviderManagerRegistry();
          const mgr = reg.get(providerId) as
            | { dropCooldown?: (r: string) => Promise<void> | void }
            | undefined;
          if (mgr?.dropCooldown) await mgr.dropCooldown(reason);
        },
      },
    });
  }
  return _manager;
}

function getProviderManagerRegistry(): Map<string, unknown> {
  if (!_providerManagerRegistry) {
    // Lazy import: avoid a hard cycle at module-load time. The registry
    // is supplied by the engine after providers are constructed.
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require("@/engine/providers") as { providerRegistry?: Map<string, unknown> };
      _providerManagerRegistry = mod.providerRegistry ?? new Map();
    } catch {
      _providerManagerRegistry = new Map();
    }
  }
  return _providerManagerRegistry;
}

/** Reset internal state (used by tests). */
export function __resetSelfHealingForTests(): void {
  _manager = null;
  _providerManagerRegistry = null;
}

/**
 * Public entrypoint used by the engine. Returns the playbook that was
 * dispatched (or null) for callers that want to log it.
 */
export async function recordHealthSample(
  providerId: string,
  metric: "latency" | "error_rate",
  value: number,
  timestampMs: number = Date.now(),
): Promise<unknown | null> {
  try {
    if (!isFeatureFlagEnabled("OMNIROUTE_SELF_HEALING_ENABLED")) return null;
    const mgr = getSelfHealingManager();
    return await mgr.recordHealthSample({
      providerId,
      metric,
      value,
      timestamp: Math.floor(timestampMs / 1000),
    });
  } catch (err) {
    // Telemetry must never break the calling request path.
    // eslint-disable-next-line no-console
    console.warn("[self-healing] recordHealthSample swallowed error:", err);
    return null;
  }
}
