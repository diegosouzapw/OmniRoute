/**
 * IP Filter Middleware — Phase 6
 *
 * IP-based access control with blacklist, whitelist, priority modes, and temporary bans.
 */

// In-memory IP lists
let _config = {
  enabled: false,
  mode: "blacklist", // "blacklist" | "whitelist" | "whitelist-priority"
  blacklist: new Set(),
  whitelist: new Set(),
  tempBans: new Map(), // IP → { until: timestamp, reason: string }
};

/**
 * Configure the IP filter
 */
export function configureIPFilter(config) {
  if (config.enabled !== undefined) _config.enabled = config.enabled;
  if (config.mode) _config.mode = config.mode;
  if (config.blacklist) _config.blacklist = new Set(config.blacklist);
  if (config.whitelist) _config.whitelist = new Set(config.whitelist);
}

/**
 * Get current IP filter config (for API)
 */
export function getIPFilterConfig() {
  return {
    enabled: _config.enabled,
    mode: _config.mode,
    blacklist: Array.from(_config.blacklist),
    whitelist: Array.from(_config.whitelist),
    tempBans: Array.from(_config.tempBans.entries()).map(([ip, info]) => ({
      ip,
      until: new Date(info.until).toISOString(),
      reason: info.reason,
      remainingMs: Math.max(0, info.until - Date.now()),
    })),
  };
}

/**
 * Check if an IP is allowed
 * @param {string} ip
 * @returns {{ allowed: boolean, reason?: string }}
 */
export function checkIP(ip) {
  if (!_config.enabled) return { allowed: true };
  if (!ip) return { allowed: true };

  const normalizedIP = normalizeIP(ip);

  // Check temp bans first (highest priority)
  const ban = _config.tempBans.get(normalizedIP);
  if (ban) {
    if (Date.now() < ban.until) {
      return { allowed: false, reason: `Temporarily banned: ${ban.reason}` };
    }
    _config.tempBans.delete(normalizedIP); // Expired
  }

  switch (_config.mode) {
    case "whitelist":
      // Only whitelisted IPs allowed
      if (!matchesAny(normalizedIP, _config.whitelist)) {
        return { allowed: false, reason: "IP not in whitelist" };
      }
      return { allowed: true };

    case "whitelist-priority":
      // Whitelist overrides blacklist
      if (matchesAny(normalizedIP, _config.whitelist)) {
        return { allowed: true };
      }
      if (matchesAny(normalizedIP, _config.blacklist)) {
        return { allowed: false, reason: "IP blacklisted" };
      }
      return { allowed: true };

    case "blacklist":
    default:
      // Blacklisted IPs blocked
      if (matchesAny(normalizedIP, _config.blacklist)) {
        return { allowed: false, reason: "IP blacklisted" };
      }
      return { allowed: true };
  }
}

/**
 * Temporarily ban an IP
 */
export function tempBanIP(ip, durationMs, reason = "Automated ban") {
  const normalizedIP = normalizeIP(ip);
  _config.tempBans.set(normalizedIP, {
    until: Date.now() + durationMs,
    reason,
  });
}

/**
 * Remove a temporary ban
 */
export function removeTempBan(ip) {
  _config.tempBans.delete(normalizeIP(ip));
}

/**
 * Add IP to blacklist
 */
export function addToBlacklist(ip) {
  _config.blacklist.add(normalizeIP(ip));
}

/**
 * Remove IP from blacklist
 */
export function removeFromBlacklist(ip) {
  _config.blacklist.delete(normalizeIP(ip));
}

/**
 * Add IP to whitelist
 */
export function addToWhitelist(ip) {
  _config.whitelist.add(normalizeIP(ip));
}

/**
 * Remove IP from whitelist
 */
export function removeFromWhitelist(ip) {
  _config.whitelist.delete(normalizeIP(ip));
}

/**
 * Express/Next.js middleware factory
 */
export function createIPFilterMiddleware() {
  return (req, res, next) => {
    const ip = extractClientIP(req);
    const { allowed, reason } = checkIP(ip);
    if (!allowed) {
      const statusCode = 403;
      if (res.status) {
        // Express
        return res.status(statusCode).json({ error: reason || "Access denied" });
      }
      // Raw response
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: reason || "Access denied" }));
    }
    if (next) next();
  };
}

/**
 * For Next.js App Router — check IP from request object
 */
export function checkRequestIP(request) {
  const ip =
    request.headers?.get?.("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers?.get?.("x-real-ip") ||
    request.headers?.get?.("cf-connecting-ip") ||
    request.ip ||
    "unknown";
  return checkIP(ip);
}

// ─── Internal Helpers ───────────────────────────────────────────────────────

function normalizeIP(ip) {
  if (!ip) return "";
  // Remove IPv6 prefix from IPv4-mapped addresses
  return ip.replace(/^::ffff:/, "").trim();
}

function matchesAny(ip, ipSet) {
  // Direct match
  if (ipSet.has(ip)) return true;

  // CIDR match
  for (const entry of ipSet) {
    if (entry.includes("/") && matchesCIDR(ip, entry)) return true;
    // Wildcard match (e.g., "192.168.*.*")
    if (entry.includes("*") && matchesWildcard(ip, entry)) return true;
  }
  return false;
}

function matchesCIDR(ip, cidr) {
  try {
    const [range, bits] = cidr.split("/");
    const mask = parseInt(bits, 10);
    if (isNaN(mask) || mask < 0 || mask > 32) return false;
    const ipNum = ipToNum(ip);
    const rangeNum = ipToNum(range);
    if (ipNum === null || rangeNum === null) return false;
    const maskBits = (-1 << (32 - mask)) >>> 0;
    return (ipNum & maskBits) === (rangeNum & maskBits);
  } catch {
    return false;
  }
}

function ipToNum(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let num = 0;
  for (const p of parts) {
    const n = parseInt(p, 10);
    if (isNaN(n) || n < 0 || n > 255) return null;
    num = (num << 8) | n;
  }
  return num >>> 0;
}

function matchesWildcard(ip, pattern) {
  const ipParts = ip.split(".");
  const patParts = pattern.split(".");
  if (ipParts.length !== 4 || patParts.length !== 4) return false;
  return ipParts.every((part, i) => patParts[i] === "*" || part === patParts[i]);
}

function extractClientIP(req) {
  return (
    req.headers?.["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers?.["x-real-ip"] ||
    req.headers?.["cf-connecting-ip"] ||
    req.socket?.remoteAddress ||
    req.ip ||
    "unknown"
  );
}

/**
 * Reset config (for testing)
 */
export function resetIPFilter() {
  _config = {
    enabled: false,
    mode: "blacklist",
    blacklist: new Set(),
    whitelist: new Set(),
    tempBans: new Map(),
  };
}
