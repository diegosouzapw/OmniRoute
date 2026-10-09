import { createHmac, randomBytes } from "node:crypto";
import * as log from "../utils/logger";

// Diagnostic correlation is process-local. A private ephemeral key prevents
// caller-supplied IDs from becoming a public dictionary of their logged hashes.
const DIAGNOSTIC_REFERENCE_KEY = randomBytes(32);

const RESTRICTION_LABELS = {
  api_key_allowlist: "the API key's connection allowlist",
  api_key_quota: "the API key's quota scope",
  combo_pin: "the combo connection pin / allowlist",
  routing_allowlist: "the routing connection allowlist",
} as const;
export type ConnectionRestrictionSource = keyof typeof RESTRICTION_LABELS;

function hasConnectionIds(value: unknown): boolean {
  return Array.isArray(value) && value.some((id) => typeof id === "string" && id.trim().length > 0);
}

/** Metadata only: selection still enforces its existing allowlist intersection. */
export function getConnectionRestrictionSources(input: {
  keyAllowlist?: unknown;
  keyQuotas?: unknown;
  routingAllowlist?: unknown;
  isCombo?: boolean;
}): ConnectionRestrictionSource[] {
  const sources: ConnectionRestrictionSource[] = [];
  if (hasConnectionIds(input.keyAllowlist)) sources.push("api_key_allowlist");
  if (Array.isArray(input.keyQuotas) && input.keyQuotas.length > 0) sources.push("api_key_quota");
  if (hasConnectionIds(input.routingAllowlist)) {
    sources.push(input.isCombo ? "combo_pin" : "routing_allowlist");
  }
  return sources;
}

function knownSources(sources: readonly ConnectionRestrictionSource[] = []) {
  return (Object.keys(RESTRICTION_LABELS) as ConnectionRestrictionSource[]).filter((source) =>
    sources.includes(source)
  );
}

export function describeConnectionRestriction(sources?: readonly ConnectionRestrictionSource[]) {
  const labels = knownSources(sources).map((source) => RESTRICTION_LABELS[source]);
  return labels.length > 0
    ? labels.join(" and ")
    : "connection routing policy (source unspecified)";
}

/** Bound the sample and pseudonymize IDs; never print raw caller-supplied IDs. */
export function connectionRestrictionDiagnostics(
  allowedConnections: readonly string[] | string | null,
  sources?: readonly ConnectionRestrictionSource[]
) {
  // Legacy internal callers can pass a single ID. Normalize metadata only; selection is unchanged.
  const ids = typeof allowedConnections === "string" ? [allowedConnections] : allowedConnections;
  return {
    connectionRestrictionSources: knownSources(sources),
    allowedConnectionsCount: ids?.length ?? null,
    allowedConnectionRefs:
      ids
        ?.slice(0, 6)
        .map((id) =>
          id === "noauth"
            ? id
            : `hmac-sha256:${createHmac("sha256", DIAGNOSTIC_REFERENCE_KEY).update(id).digest("hex").slice(0, 12)}`
        ) ?? null,
  };
}

function logSyntheticNoAuthRefusal(
  provider: string,
  reason: "allowlist" | "excluded" | "paused" | "disabled",
  allowedConnections: readonly string[] | null,
  sources?: readonly ConnectionRestrictionSource[]
): null {
  log.info("AUTH", "Synthetic no-auth fallback unavailable", {
    provider,
    reason,
    ...connectionRestrictionDiagnostics(allowedConnections, sources),
  });
  return null;
}

export function createNoAuthRefusalLogger(
  provider: string,
  allowedConnections: readonly string[] | null,
  sources?: readonly ConnectionRestrictionSource[]
) {
  return (reason: "allowlist" | "excluded" | "paused" | "disabled") =>
    logSyntheticNoAuthRefusal(provider, reason, allowedConnections, sources);
}

/** Preserve the legacy flag while carrying the actual restriction source. */
export function buildConnectionRestrictionFailure(
  provider: string,
  blockedCount: number,
  allowedConnections: readonly string[] | null,
  connectionRestrictionSources: readonly ConnectionRestrictionSource[] = []
) {
  log.warn(
    "AUTH",
    `${provider} | ${blockedCount} connection(s) hidden by ${describeConnectionRestriction(connectionRestrictionSources)}`,
    connectionRestrictionDiagnostics(allowedConnections, connectionRestrictionSources)
  );
  return { blockedByKeyPolicy: true, blockedCount, connectionRestrictionSources };
}

export function formatConnectionPrefixesForLog(ids: Iterable<string>, max = 6): string {
  const prefixes = Array.from(ids)
    .filter((id) => typeof id === "string" && id.length > 0)
    .slice(0, max)
    .map((id) => `${id.slice(0, 8)}...`);
  return prefixes.length > 0 ? prefixes.join(",") : "none";
}

export function logCredentialPoolState(
  provider: string,
  state: {
    active: number;
    raw: number;
    forcedConnectionId: string | null;
    excludedConnectionIds: Set<string>;
    allowedConnections: readonly string[] | null;
    sources?: readonly ConnectionRestrictionSource[];
  }
) {
  const blockedForced = state.forcedConnectionId ? state.raw - state.active : 0;
  const blockedAllowed =
    state.allowedConnections && state.allowedConnections.length > 0
      ? Math.max(0, state.raw - state.active - blockedForced)
      : 0;
  const forcedId = state.forcedConnectionId ? `${state.forcedConnectionId.slice(0, 8)}...` : "none";
  log.debug(
    "AUTH",
    `${provider} | active=${state.active}, excluded=${state.excludedConnectionIds.size} (${formatConnectionPrefixesForLog(state.excludedConnectionIds)}), forcedId=${forcedId}, blocked_forced=${blockedForced}, blocked_allowed=${blockedAllowed}`,
    connectionRestrictionDiagnostics(state.allowedConnections, state.sources)
  );
}
