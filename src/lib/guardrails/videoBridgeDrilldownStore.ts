/** One process-wide store shared across independently bundled producer/consumer routes. */
import { VideoDrilldownCache } from "./videoBridgeDrilldown";
import {
  VideoDrilldownLifecycle,
  isVideoBridgeDrilldownProductionEnabled,
  isVideoBridgeDrilldownRemoteAccessEnabled,
} from "./videoBridgeDrilldownLifecycle";

const processState = globalThis as typeof globalThis & {
  __omnirouteVideoDrilldownLifecycleV1?: VideoDrilldownLifecycle;
};

export function isVideoDrilldownRemoteEnabled(settings: Record<string, unknown>): boolean {
  return typeof settings.modalityBridgeVideoDrilldownRemoteEnabled === "boolean"
    ? settings.modalityBridgeVideoDrilldownRemoteEnabled
    : isVideoBridgeDrilldownRemoteAccessEnabled();
}

/** Aggregate-only management telemetry; reading it never creates a retention store. */
export function getVideoDrilldownSnapshot(settings: Record<string, unknown>) {
  const lifecycle = processState.__omnirouteVideoDrilldownLifecycleV1;
  lifecycle?.cleanup();
  const usage = lifecycle?.getUsage("management-summary");
  return {
    enabled: isVideoDrilldownRequestEnabled({ drilldown: true }, settings, "management-summary"),
    remoteEnabled: isVideoDrilldownRemoteEnabled(settings),
    retainedBytes: usage?.totalBytes ?? 0,
    retainedEntries: usage?.totalEntries ?? 0,
  };
}

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
