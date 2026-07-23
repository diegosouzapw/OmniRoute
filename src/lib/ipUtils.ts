import { isIP } from "node:net";

/**
 * T07: Extract the real client IP from X-Forwarded-For header.
 * Skips invalid entries like "unknown" or empty strings.
 * Falls back to remoteAddress if no valid IP found.
 * Ref: sub2api PR #1135
 *
 * @param xForwardedFor - Value of the X-Forwarded-For header (may be CSV)
 * @param remoteAddress - Fallback from the raw socket (req.socket.remoteAddress)
 * @returns The first valid IP address found, or "unknown"
 */
export function extractClientIp(
  xForwardedFor: string | null | undefined,
  remoteAddress: string | undefined
): string {
  if (xForwardedFor) {
    const entries = xForwardedFor.split(",");
    for (const entry of entries) {
      const trimmed = entry.trim();
      if (trimmed && isIP(trimmed) !== 0) {
        return trimmed; // First valid IP wins
      }
    }
  }
  return remoteAddress?.trim() ?? "unknown";
}

/**
 * Strip an IPv4-mapped IPv6 prefix ("::ffff:127.0.0.1" -> "127.0.0.1") so the
 * loopback check below catches both representations Node may report.
 */
function normalizePeer(addr: string | undefined): string {
  const trimmed = (addr ?? "").trim();
  if (!trimmed) return "";
  return trimmed.startsWith("::ffff:") ? trimmed.slice("::ffff:".length) : trimmed;
}

/**
 * Whether the TCP peer is a loopback address (i.e. the request reached us via
 * a local reverse proxy such as nginx). Only then is it safe to trust the
 * forwarding headers — from a direct public socket those headers are
 * attacker-controlled and must be ignored, otherwise per-IP brute-force
 * buckets (login lockout, etc.) become spoofable / shareable.
 *
 * Ported from decolua/9router#1893.
 */
function isLoopbackPeer(addr: string | undefined): boolean {
  const ip = normalizePeer(addr);
  if (!ip) return false;
  if (ip === "::1") return true;
  return ip.startsWith("127.");
}

/**
 * Extract client IP from a Request or NextRequest object.
 *
 * Behind a local reverse proxy (TCP peer is loopback) we trust the standard
 * forwarding headers in priority order: CF-Connecting-IP > X-Forwarded-For >
 * X-Real-IP. Directly from a public socket those headers are spoofable, so we
 * key by the unspoofable TCP peer address instead. When no peer is known
 * (edge runtime / fetch path with no socket) we fall back to the headers so
 * we don't regress to "unknown" for every request in that path.
 */
export function getClientIpFromRequest(req: {
  headers?: Headers | { get?: (n: string) => string | null };
  socket?: { remoteAddress?: string };
  ip?: string;
}): string {
  // Helper to get header value from either Headers object or plain object
  const getHeader = (name: string): string | null => {
    if (!req.headers) return null;
    if (typeof (req.headers as Headers).get === "function") {
      return (req.headers as Headers).get(name);
    }
    return null;
  };

  const remoteAddress = req.ip ?? req.socket?.remoteAddress;
  const hasPeer = Boolean(normalizePeer(remoteAddress));
  const trustForwardingHeaders = !hasPeer || isLoopbackPeer(remoteAddress);

  if (trustForwardingHeaders) {
    const cfIp = getHeader("cf-connecting-ip");
    if (cfIp && isIP(cfIp.trim()) !== 0) return cfIp.trim();

    const xff = getHeader("x-forwarded-for");
    const realIp = getHeader("x-real-ip");
    return extractClientIp(xff ?? realIp, remoteAddress);
  }

  // Direct public peer — forwarding headers are attacker-controlled, ignore.
  return normalizePeer(remoteAddress);
}
