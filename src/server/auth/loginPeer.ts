/**
 * Where a login attempt comes from, judged from the socket peer the authz pipeline stamps
 * on the request. X-Forwarded-For, X-Real-IP and CF-Connecting-IP are chosen by the caller,
 * so they may end up in the audit log but never decide a lockout key or a locality gate.
 */
import { classifyIpScope, type IpScope } from "@/lib/ipUtils";
import { AUTHZ_HEADER_TRUSTED_PEER_IP } from "@/server/authz/headers";
import { classifyHostLocality } from "@/server/authz/routeGuard";
import { getRequestPeerLocality } from "@/shared/utils/apiAuth";

const UNKNOWN_PEER_KEY = "__unknown_peer__";

/**
 * Key for the failed-attempt lockout: the stamped socket peer. When this process stamps
 * peers but the request carries none, every such request shares one key instead of
 * falling back to a forwarded address that can be rotated for a fresh attempt budget.
 * Without a stamping server (direct handler calls) the forwarded address is all there is.
 */
export function getLoginLockoutKey(request: Request, forwardedIp: string | null): string | null {
  if (!process.env.OMNIROUTE_PEER_STAMP_TOKEN) return forwardedIp;
  return request.headers.get(AUTHZ_HEADER_TRUSTED_PEER_IP) || UNKNOWN_PEER_KEY;
}

/** Origin tag for audit rows, from the stamped peer rather than a forwarded address. */
export function getLoginSourceScope(request: Request, forwardedIp: string | null): IpScope {
  if (!process.env.OMNIROUTE_PEER_STAMP_TOKEN) return classifyIpScope(forwardedIp);
  const locality = getRequestPeerLocality(request);
  return locality === "loopback" ? "loopback" : locality === "lan" ? "private" : "public";
}

/**
 * True for the operator sitting at the host: a loopback socket peer with no proxy hop,
 * addressed by a loopback name. A proxy on the same host that adds no forwarding headers
 * looks like a loopback peer, but it normally passes the public Host through. The Host
 * header is caller-controlled, so it can only narrow this check, never widen it.
 */
export function isHostOperatorRequest(request: Request): boolean {
  if (getRequestPeerLocality(request) !== "loopback") return false;
  let host = request.headers.get("host");
  if (!host) {
    try {
      host = new URL(request.url).host;
    } catch {
      return false;
    }
  }
  return classifyHostLocality(host) === "loopback";
}
