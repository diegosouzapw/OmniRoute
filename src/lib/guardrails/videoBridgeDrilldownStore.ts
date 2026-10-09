/** One process-wide store shared across independently bundled producer/consumer routes. */
import { VideoDrilldownCache } from "./videoBridgeDrilldown";
import {
  VideoDrilldownLifecycle,
  isVideoBridgeDrilldownProductionEnabled,
} from "./videoBridgeDrilldownLifecycle";

const processState = globalThis as typeof globalThis & {
  __omnirouteVideoDrilldownLifecycleV1?: VideoDrilldownLifecycle;
};

export function getSharedVideoDrilldownLifecycle(): VideoDrilldownLifecycle {
  return (processState.__omnirouteVideoDrilldownLifecycleV1 ??= new VideoDrilldownLifecycle({
    cache: new VideoDrilldownCache({
      maxEntries: 64,
      maxEntriesPerPrincipal: 16,
      maxBytesPerPrincipal: 64 * 1024 * 1024,
      maxTotalBytes: 256 * 1024 * 1024,
      ttlMs: 10 * 60 * 1000,
    }),
    maxHandles: 64,
    maxHandlesPerPrincipal: 16,
    ttlMs: 10 * 60 * 1000,
  }));
}

export function isVideoDrilldownRequestEnabled(
  part: { drilldown?: boolean },
  settings: Record<string, unknown>,
  principalId: unknown
): principalId is string {
  const enabled =
    typeof settings.modalityBridgeVideoDrilldownEnabled === "boolean"
      ? settings.modalityBridgeVideoDrilldownEnabled
      : isVideoBridgeDrilldownProductionEnabled();
  return (
    enabled &&
    part.drilldown === true &&
    typeof principalId === "string" &&
    principalId.trim().length > 0
  );
}
