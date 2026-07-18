/**
 * Fingerprint-based target expansion for combo routing.
 *
 * Some providers (MiMoCode, MiCode, OpenCode) store multiple device
 * fingerprints inside a single connection's `providerSpecificData.fingerprints`.
 * Without expansion the combo system treats the connection as one account,
 * so only one fingerprint is used per request.  This module splits such
 * connections into one target per fingerprint so the combo round-robin
 * distributes requests across all of them.
 *
 * Expansion runs AFTER connection-based expansion and BEFORE the
 * `candidates` scoring pass in `combo.ts`.
 */

import type { ResolvedComboTarget } from "./types.ts";

/** Providers whose `providerSpecificData.fingerprints` array should be expanded. */
const FINGERPRINT_PROVIDERS: ReadonlySet<string> = new Set(["mimocode", "mcode", "opencode"]);

/** Separator the combo builder UI uses to encode an account pin (#6087). */
const FP_PIN_SEPARATOR = "|fp|";

/** Check whether a provider uses fingerprint-based multi-account. */
export function isFingerprintProvider(provider: string): boolean {
  return FINGERPRINT_PROVIDERS.has(provider);
}

/**
 * Split a combo builder "pinned account" connectionId (`${rowId}|fp|${fingerprint}`,
 * produced by `expandConnectionOptions` in `src/lib/combos/builderOptions.ts`) back
 * into the real DB connection row id and the pinned fingerprint (#6696).
 *
 * Returns `null` when `connectionId` does not carry the pin separator, so callers can
 * fall through to the unpinned resolution path unchanged.
 */
export function splitFingerprintPin(
  connectionId: string
): { realConnectionId: string; pinnedFingerprint: string } | null {
  const separatorIndex = connectionId.indexOf(FP_PIN_SEPARATOR);
  if (separatorIndex === -1) return null;

  const realConnectionId = connectionId.slice(0, separatorIndex);
  const pinnedFingerprint = connectionId.slice(separatorIndex + FP_PIN_SEPARATOR.length);
  if (!realConnectionId || !pinnedFingerprint) return null;

  return { realConnectionId, pinnedFingerprint };
}

/** Safely extract the fingerprints array from a connection record. */
export function getConnectionFingerprints(
  connection: Record<string, unknown> | undefined | null
): string[] {
  if (!connection || typeof connection !== "object") return [];
  const psd = connection["providerSpecificData"];
  if (!psd || typeof psd !== "object") return [];
  const fps = (psd as Record<string, unknown>)["fingerprints"];
  if (!Array.isArray(fps)) return [];
  return fps.filter((fp): fp is string => typeof fp === "string" && fp.trim().length > 0);
}

/** True when a connection carries more than one fingerprint. */
export function hasMultipleFingerprints(
  connection: Record<string, unknown> | undefined | null
): boolean {
  return getConnectionFingerprints(connection).length > 1;
}

/**
 * Build an execution key that encodes a specific fingerprint.
 * The first fingerprint keeps the original key so backward-compatible
 * metrics / affinity lookups still work.
 */
export function buildFingerprintExecutionKey(
  originalKey: string,
  fingerprint: string,
  isFirst: boolean
): string {
  if (isFirst) return originalKey;
  return `${originalKey}@fp:${fingerprint}`;
}

/**
 * Expand `expandedTargets` by splitting targets whose connection carries
 * multiple fingerprints into one target per fingerprint.
 *
 * Targets that don't have a connectionId, don't belong to a fingerprint
 * provider, or whose connection has ≤1 fingerprint are passed through
 * unchanged.
 *
 * @param targets       Targets already expanded by connection ID
 * @param connectionById  Map from connection ID → connection record
 * @param getProvider   Function to resolve a target's provider string
 * @returns New array with fingerprint targets expanded
 */
export function expandTargetsByFingerprints(
  targets: ResolvedComboTarget[],
  connectionById: Map<string, Record<string, unknown>>,
  getProvider: (target: ResolvedComboTarget) => string
): ResolvedComboTarget[] {
  const result: ResolvedComboTarget[] = [];

  for (const target of targets) {
    const provider = getProvider(target);
    const { connectionId } = target;

    if (!connectionId || !isFingerprintProvider(provider)) {
      result.push(target);
      continue;
    }

    // #6696: the combo builder UI pins a specific account by encoding it as
    // `${rowId}|fp|${fingerprint}`. That composite string never matches a real
    // DB row id in `connectionById`, so resolve it back to the real
    // connectionId + the pinned fingerprint here before any other lookup —
    // otherwise the pin is silently inert and credential resolution can never
    // find the connection at all.
    const pin = splitFingerprintPin(connectionId);
    if (pin) {
      result.push({
        ...target,
        connectionId: pin.realConnectionId,
        pinnedFingerprint: pin.pinnedFingerprint,
        executionKey: buildFingerprintExecutionKey(
          target.executionKey,
          pin.pinnedFingerprint,
          false
        ),
      });
      continue;
    }

    const connection = connectionById.get(connectionId);
    const fingerprints = getConnectionFingerprints(connection);

    if (fingerprints.length <= 1) {
      result.push(target);
      continue;
    }

    for (let i = 0; i < fingerprints.length; i++) {
      const isFirst = i === 0;
      result.push({
        ...target,
        executionKey: buildFingerprintExecutionKey(target.executionKey, fingerprints[i], isFirst),
      });
    }
  }

  return result;
}
