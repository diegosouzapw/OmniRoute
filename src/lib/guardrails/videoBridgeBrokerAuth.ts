import { randomUUID, timingSafeEqual } from "node:crypto";

import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";

export const VIDEO_BRIDGE_BROKER_PATH = "/api/modality-bridge/video/extract";
export const VIDEO_BRIDGE_DRILLDOWN_PATH = "/api/modality-bridge/video/drilldown";
export const VIDEO_BRIDGE_BROKER_AUTH_HEADER = "x-omniroute-video-bridge-broker";
export const VIDEO_BRIDGE_DRILLDOWN_PRINCIPAL_HEADER = "x-omniroute-video-bridge-principal";

const globalState = globalThis as typeof globalThis & {
  __omnirouteVideoBridgeBrokerToken?: string;
};

function brokerToken(): string {
  if (!globalState.__omnirouteVideoBridgeBrokerToken) {
    globalState.__omnirouteVideoBridgeBrokerToken = randomUUID();
  }
  return globalState.__omnirouteVideoBridgeBrokerToken;
}

export function buildVideoBridgeBrokerHeaders(): Record<string, string> {
  return { [VIDEO_BRIDGE_BROKER_AUTH_HEADER]: brokerToken() };
}

/**
 * The same process-local secret used to authenticate requests INTO the broker (#11659).
 * The broker route stamps this into its JSON response body so a client-side adapter can
 * prove the payload actually came from this trusted loopback process — never from a
 * caller-declared label — before it is allowed to construct "embedded" provenance.
 */
export function currentVideoBridgeBrokerFingerprint(): string {
  return brokerToken();
}

export function verifyVideoBridgeBrokerFingerprint(candidate: unknown): boolean {
  if (typeof candidate !== "string" || candidate.length === 0) return false;
  const expected = brokerToken();
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(candidate, "utf8"), Buffer.from(expected, "utf8"));
}

function normalizeVideoBridgePrincipalId(value: string | null): string | null {
  if (!value || value.length > 256) return null;
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 0x21 || code > 0x7e) return null;
  }
  return value;
}

export function buildVideoBridgeDrilldownHeaders(principalId: string): Record<string, string> {
  const normalized = normalizeVideoBridgePrincipalId(principalId);
  if (!normalized) throw new Error("Video Bridge drill-down principal is invalid");
  return {
    ...buildVideoBridgeBrokerHeaders(),
    [VIDEO_BRIDGE_DRILLDOWN_PRINCIPAL_HEADER]: normalized,
  };
}

export function isVideoBridgeBrokerTokenRequest(request: Request, path: string): boolean {
  if (path !== VIDEO_BRIDGE_BROKER_PATH && path !== VIDEO_BRIDGE_DRILLDOWN_PATH) return false;
  const expected = brokerToken();
  const provided = request.headers.get(VIDEO_BRIDGE_BROKER_AUTH_HEADER)?.trim() ?? "";
  if (!provided || provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(provided, "utf8"), Buffer.from(expected, "utf8"));
}

export function isVideoBridgeBrokerInternalRequest(request: Request, path: string): boolean {
  return (
    request.headers.get(AUTHZ_HEADER_PEER_LOCALITY) === "loopback" &&
    isVideoBridgeBrokerTokenRequest(request, path)
  );
}

export function resolveVideoBridgeDrilldownPrincipal(request: Request): string | null {
  if (!isVideoBridgeBrokerInternalRequest(request, VIDEO_BRIDGE_DRILLDOWN_PATH)) return null;
  return normalizeVideoBridgePrincipalId(
    request.headers.get(VIDEO_BRIDGE_DRILLDOWN_PRINCIPAL_HEADER)
  );
}
