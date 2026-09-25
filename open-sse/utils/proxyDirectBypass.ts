/**
 * Hosts that `resolveProxyForRequest()` always sends direct, never through a context or
 * environment proxy. Split out of `proxyFetch.ts` (frozen file size) so the list can grow
 * without growing that module.
 *
 *  - loopback, RFC1918, link-local, CGNAT, IPv6 ULA/link-local, and the `.local` / `.lan` /
 *    `.internal` suffixes — the former `isLocalAddress()` from `proxyFetch.ts`, same verdicts.
 *  - operator-listed provider-node hosts (`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, #14635) —
 *    typically a Docker/Compose service name. A sibling container on OmniRoute's own Docker
 *    network cannot be reached through an egress proxy.
 */
import { isConfiguredLocalNodeHostname } from "@/shared/network/localNodeHosts";

const LOCAL_HOSTNAMES = new Set(["localhost", "0.0.0.0", "127.0.0.1", "::1"]);
const LOCAL_SUFFIXES = [".local", ".lan", ".internal"];
// RFC1918 + loopback + link-local (169.254, incl. cloud metadata 169.254.169.254).
// 127/8 covers all loopback, not just 127.0.0.1.
const LOCAL_IPV4_PREFIXES = ["192.168.", "10.", "127.", "169.254."];

function isLocalName(host: string): boolean {
  return LOCAL_HOSTNAMES.has(host) || LOCAL_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

function isPrivateRangeLiteral(host: string): boolean {
  if (LOCAL_IPV4_PREFIXES.some((prefix) => host.startsWith(prefix))) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return true;
  // CGNAT (100.64/10)
  if (/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(host)) return true;
  // IPv6 ULA (fc00::/7 → fc/fd prefix) and link-local (fe80::/10)
  return /^f[cd][0-9a-f]*:/i.test(host) || host.startsWith("fe80:");
}

// Same verdicts as the former `isLocalAddress()` in proxyFetch.ts, split into two
// predicates to stay under the complexity cap.
function isLocalAddress(hostname: string): boolean {
  const host = hostname
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replace(/^::ffff:/i, "");
  return isLocalName(host) || isPrivateRangeLiteral(host);
}

/** `hostname` as it appears in a parsed URL (any case, IPv6 in brackets). */
export function isDirectBypassHost(hostname: string): boolean {
  return isLocalAddress(hostname.toLowerCase()) || isConfiguredLocalNodeHostname(hostname);
}
