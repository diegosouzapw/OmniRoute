const DEFAULT_MAX_PEER_HOPS = 4;
const MAX_TRACE_HEADER_LENGTH = 2048;
const INSTANCE_ID_PATTERN = /^[A-Za-z0-9._:-]{1,64}$/;

export const OMNIROUTE_PEER_TRACE_HEADER = "X-OmniRoute-Peer-Trace";

type HeaderSource = Headers | Record<string, unknown> | null | undefined;
type PeerEnvironment = {
  OMNIROUTE_INSTANCE_ID?: string;
  OMNIROUTE_PEER_URLS?: string;
  OMNIROUTE_PEER_MAX_HOPS?: string;
};

export type PeerRequestRejection = {
  code: "peer_loop_detected" | "peer_hop_limit_exceeded";
  message: string;
};

function readHeader(headers: HeaderSource, name: string): string | null {
  if (!headers) return null;
  if (headers instanceof Headers) return headers.get(name);

  const expected = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === expected && typeof value === "string") return value;
  }
  return null;
}

function getInstanceId(env: PeerEnvironment): string | null {
  const value = env.OMNIROUTE_INSTANCE_ID?.trim() ?? "";
  return INSTANCE_ID_PATTERN.test(value) ? value : null;
}

function getMaxPeerHops(env: PeerEnvironment): number {
  const parsed = Number.parseInt(env.OMNIROUTE_PEER_MAX_HOPS ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 32 ? parsed : DEFAULT_MAX_PEER_HOPS;
}

export function parsePeerTrace(value: string | null | undefined): string[] {
  if (!value || value.length > MAX_TRACE_HEADER_LENGTH) return [];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter((part) => INSTANCE_ID_PATTERN.test(part));
}

function normalizePeerUrl(value: string): URL | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

export function isConfiguredOmniRoutePeer(
  targetUrl: string,
  env: PeerEnvironment = process.env
): boolean {
  const target = normalizePeerUrl(targetUrl);
  if (!target) return false;

  return (env.OMNIROUTE_PEER_URLS ?? "")
    .split(",")
    .map(normalizePeerUrl)
    .some((peer) => {
      if (!peer || peer.origin !== target.origin) return false;
      const peerPath = peer.pathname.replace(/\/$/, "");
      const targetPath = target.pathname.replace(/\/$/, "");
      return targetPath === peerPath || targetPath.startsWith(`${peerPath}/`);
    });
}

/** Reject a request that has already visited this instance or exhausted its peer-hop budget. */
export function inspectPeerRequest(
  headers: HeaderSource,
  env: PeerEnvironment = process.env
): PeerRequestRejection | null {
  const instanceId = getInstanceId(env);
  if (!instanceId) return null;

  const trace = parsePeerTrace(readHeader(headers, OMNIROUTE_PEER_TRACE_HEADER));
  if (trace.includes(instanceId)) {
    return {
      code: "peer_loop_detected",
      message: "OmniRoute peer routing loop detected",
    };
  }
  if (trace.length >= getMaxPeerHops(env)) {
    return {
      code: "peer_hop_limit_exceeded",
      message: "OmniRoute peer routing hop limit exceeded",
    };
  }
  return null;
}

/** Convenience for HTTP handlers: inspect + log + build the 508 response in one call. */
export function rejectPeerRequest<T>(
  headers: HeaderSource,
  warn: (tag: string, msg: string) => void,
  respond: (status: number, msg: string) => T
): T | null {
  const rejection = inspectPeerRequest(headers);
  if (!rejection) return null;
  warn("PEER_ROUTING", rejection.message);
  return respond(508, rejection.message);
}

/**
 * Append this instance to the peer trace for an explicitly allowlisted OmniRoute URL.
 * Returns true when the header was applied. Other upstream providers are untouched.
 */
export function applyPeerTraceHeader(
  outgoingHeaders: Record<string, string>,
  clientHeaders: HeaderSource,
  targetUrl: string,
  env: PeerEnvironment = process.env
): boolean {
  const instanceId = getInstanceId(env);
  if (!instanceId || !isConfiguredOmniRoutePeer(targetUrl, env)) return false;

  const trace = parsePeerTrace(readHeader(clientHeaders, OMNIROUTE_PEER_TRACE_HEADER));
  if (!trace.includes(instanceId)) trace.push(instanceId);
  const traceHeaderLower = OMNIROUTE_PEER_TRACE_HEADER.toLowerCase();
  for (const key of Object.keys(outgoingHeaders)) {
    if (key.toLowerCase() === traceHeaderLower) delete outgoingHeaders[key];
  }
  outgoingHeaders[OMNIROUTE_PEER_TRACE_HEADER] = trace.join(",");
  return true;
}
