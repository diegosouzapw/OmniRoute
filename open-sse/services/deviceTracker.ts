/**
 * Per-API-Key Device Tracker
 *
 * Tracks unique client "devices" (IP + User-Agent fingerprint) that have used
 * a given API key, so operators can see how many distinct connections are
 * active behind a key — independent of `maxSessions` (which caps concurrent
 * sticky-routing sessions, not device identity; see `sessionManager.ts`).
 *
 * In-memory only, module-scoped Map (same pattern as `sessionManager.ts` —
 * no `global.*` singleton). Records never store the raw IP: it is masked
 * before being written, so even a memory dump or the `/api/keys/[id]/devices`
 * endpoint can't leak a full client IP.
 *
 * Ported from upstream 9router#931 (thanks @mugnimaestra) — original stored
 * a global singleton keyed by the raw API key string; this port keys by
 * `apiKeyInfo.id` (OmniRoute never threads the raw key value down to
 * `chatCore`) and follows the module-Map + `unref()` cleanup-timer pattern
 * used across `open-sse/services/`.
 */

import { createHash } from "node:crypto";

const DEFAULT_TTL_MS = 30 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 60 * 1000;
const DEFAULT_MAX_DEVICES_PER_API_KEY = 1000;
const DEFAULT_MAX_TOTAL_DEVICES = 10000;
const MAX_STORED_USER_AGENT_LENGTH = 256;

const TTL_ENV_NAME = "DEVICE_TRACKER_TTL_MS";
const MAX_PER_KEY_ENV_NAME = "DEVICE_TRACKER_MAX_DEVICES_PER_KEY";
const MAX_TOTAL_ENV_NAME = "DEVICE_TRACKER_MAX_TOTAL_DEVICES";

interface DeviceRecord {
  fingerprint: string;
  /** Already masked — never the raw client IP. */
  ip: string;
  /** Truncated to MAX_STORED_USER_AGENT_LENGTH. */
  userAgent: string;
  lastSeen: number;
}

export interface DeviceDetail {
  /** Truncated fingerprint (first 12 hex chars) — never the full hash. */
  fingerprint: string;
  ip: string;
  userAgent: string;
  lastSeen: number;
}

function parseTtlMs(): number {
  const rawValue = process.env[TTL_ENV_NAME];
  if (!rawValue) return DEFAULT_TTL_MS;
  const parsedValue = Number(rawValue);
  if (!Number.isFinite(parsedValue) || parsedValue <= 0) return DEFAULT_TTL_MS;
  return parsedValue;
}

function parsePositiveIntegerEnv(envName: string, defaultValue: number): number {
  const rawValue = process.env[envName];
  if (!rawValue) return defaultValue;
  const parsedValue = Number(rawValue);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) return defaultValue;
  return parsedValue;
}

let ttlMs = parseTtlMs();
let maxDevicesPerApiKey = parsePositiveIntegerEnv(
  MAX_PER_KEY_ENV_NAME,
  DEFAULT_MAX_DEVICES_PER_API_KEY
);
let maxTotalDevices = parsePositiveIntegerEnv(MAX_TOTAL_ENV_NAME, DEFAULT_MAX_TOTAL_DEVICES);

// Module-scoped in-memory store — mirrors the `sessionManager.ts` pattern.
// key: apiKeyId → Map<fingerprint, DeviceRecord>
const devicesByApiKey = new Map<string, Map<string, DeviceRecord>>();

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Mask an IP address so the stored/reported value never reveals the full
 * client address. IPv4 keeps the first two octets; IPv6 keeps the first
 * three groups.
 */
export function maskIp(ip: string | null | undefined): string {
  if (!ip || ip === "unknown") return "unknown";

  const ipv4Parts = ip.split(".");
  if (ipv4Parts.length === 4 && ipv4Parts.every((part) => /^\d{1,3}$/.test(part))) {
    return `${ipv4Parts[0]}.${ipv4Parts[1]}.x.x`;
  }

  if (ip.includes(":")) {
    const visibleGroups = ip.split(":").filter(Boolean).slice(0, 3).join(":");
    return visibleGroups ? `${visibleGroups}:...` : "unknown";
  }

  return "masked";
}

function truncateUserAgent(userAgent: string): string {
  if (userAgent.length <= MAX_STORED_USER_AGENT_LENGTH) return userAgent;
  return `${userAgent.slice(0, MAX_STORED_USER_AGENT_LENGTH)}...`;
}

function createFingerprint(ip: string, userAgent: string): string {
  return createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
}

function getTotalDeviceCount(): number {
  let count = 0;
  for (const devices of devicesByApiKey.values()) count += devices.size;
  return count;
}

function deleteDevice(apiKeyId: string, fingerprint: string): boolean {
  const devices = devicesByApiKey.get(apiKeyId);
  if (!devices) return false;
  const deleted = devices.delete(fingerprint);
  if (devices.size === 0) devicesByApiKey.delete(apiKeyId);
  return deleted;
}

function findOldestDevice(
  apiKeyId: string | null
): { apiKeyId: string; fingerprint: string; lastSeen: number } | null {
  let oldest: { apiKeyId: string; fingerprint: string; lastSeen: number } | null = null;
  const entries = apiKeyId ? [[apiKeyId, devicesByApiKey.get(apiKeyId)] as const] : devicesByApiKey.entries();

  for (const [entryApiKeyId, devices] of entries) {
    if (!devices) continue;
    for (const [fingerprint, record] of devices.entries()) {
      if (!oldest || record.lastSeen < oldest.lastSeen) {
        oldest = { apiKeyId: entryApiKeyId, fingerprint, lastSeen: record.lastSeen };
      }
    }
  }

  return oldest;
}

function evictOldestDevice(apiKeyId: string | null = null): boolean {
  const oldest = findOldestDevice(apiKeyId);
  if (!oldest) return false;
  return deleteDevice(oldest.apiKeyId, oldest.fingerprint);
}

function enforceDeviceLimits(apiKeyId: string, devices: Map<string, DeviceRecord>): void {
  while (devices.size >= maxDevicesPerApiKey) {
    if (!evictOldestDevice(apiKeyId)) break;
  }
  while (getTotalDeviceCount() >= maxTotalDevices) {
    if (!evictOldestDevice()) break;
  }
}

/**
 * Remove expired device records. Exported for tests; the cleanup timer
 * calls this on an interval in production.
 */
export function expireDevices(now: number = Date.now()): number {
  let expiredCount = 0;

  for (const [apiKeyId, devices] of devicesByApiKey.entries()) {
    for (const [fingerprint, record] of devices.entries()) {
      if (now - record.lastSeen > ttlMs) {
        devices.delete(fingerprint);
        expiredCount += 1;
      }
    }
    if (devices.size === 0) devicesByApiKey.delete(apiKeyId);
  }

  return expiredCount;
}

function ensureCleanupTimer(): void {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    expireDevices();
  }, CLEANUP_INTERVAL_MS);
  cleanupTimer.unref?.();
}

ensureCleanupTimer();

/**
 * Extract the client IP from a header source. Mirrors the priority order
 * already used across `open-sse/` (`cf-connecting-ip` → `x-real-ip` →
 * `x-forwarded-for`, first hop only). Returns "unknown" when absent.
 */
export function extractIpFromHeaders(
  headers: Record<string, unknown> | Headers | null | undefined
): string {
  if (!headers) return "unknown";

  const getHeader = (name: string): string | null => {
    if (headers instanceof Headers) return headers.get(name);
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLowerCase() === name && typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
    return null;
  };

  const edgeIp =
    getHeader("cf-connecting-ip") || getHeader("x-real-ip") || getHeader("fastly-client-ip");
  if (edgeIp) return edgeIp;

  const forwardedFor = getHeader("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return "unknown";
}

/**
 * Track a device (IP + User-Agent fingerprint) for an API key. Idempotent —
 * calling it again for the same key + fingerprint just refreshes `lastSeen`.
 * No-ops (returns null) when `apiKeyId` is missing, so callers can call it
 * unconditionally after resolving `apiKeyInfo`.
 */
export function trackDevice(
  apiKeyId: string | null | undefined,
  ip: string | null | undefined,
  userAgent: string | null | undefined
): string | null {
  if (!apiKeyId || typeof apiKeyId !== "string") return null;

  const now = Date.now();
  expireDevices(now);

  const resolvedIp = ip && ip.trim() ? ip.trim() : "unknown";
  const resolvedUserAgent = userAgent && userAgent.trim() ? userAgent.trim() : "unknown";
  const fingerprint = createFingerprint(resolvedIp, resolvedUserAgent);

  let devices = devicesByApiKey.get(apiKeyId);
  if (!devices) {
    devices = new Map();
    devicesByApiKey.set(apiKeyId, devices);
  }

  const existingRecord = devices.get(fingerprint);
  if (existingRecord) {
    existingRecord.lastSeen = now;
  } else {
    enforceDeviceLimits(apiKeyId, devices);
    if (!devicesByApiKey.has(apiKeyId)) devicesByApiKey.set(apiKeyId, devices);
    devices.set(fingerprint, {
      fingerprint,
      ip: maskIp(resolvedIp),
      userAgent: truncateUserAgent(resolvedUserAgent),
      lastSeen: now,
    });
  }

  return fingerprint;
}

/** Number of distinct devices currently tracked for an API key. */
export function getDeviceCount(apiKeyId: string | null | undefined): number {
  expireDevices();
  if (!apiKeyId || typeof apiKeyId !== "string") return 0;
  return devicesByApiKey.get(apiKeyId)?.size || 0;
}

/** Device detail rows for an API key — masked IP, truncated fingerprint. */
export function getDeviceDetails(apiKeyId: string | null | undefined): DeviceDetail[] {
  expireDevices();
  if (!apiKeyId || typeof apiKeyId !== "string") return [];

  const devices = devicesByApiKey.get(apiKeyId);
  if (!devices) return [];

  return Array.from(devices.values()).map((record) => ({
    fingerprint: record.fingerprint.slice(0, 12),
    ip: record.ip,
    userAgent: record.userAgent,
    lastSeen: record.lastSeen,
  }));
}

/** Device counts for every tracked API key. */
export function getAllDeviceCounts(): Record<string, number> {
  expireDevices();
  const counts: Record<string, number> = {};
  for (const [apiKeyId, devices] of devicesByApiKey.entries()) {
    counts[apiKeyId] = devices.size;
  }
  return counts;
}

/**
 * Test-only reset — mirrors `sessionManager.ts::clearSessions()`. Also lets
 * tests override the TTL/limit env vars deterministically.
 */
export function clearDeviceTracker(): void {
  devicesByApiKey.clear();
  ttlMs = parseTtlMs();
  maxDevicesPerApiKey = parsePositiveIntegerEnv(
    MAX_PER_KEY_ENV_NAME,
    DEFAULT_MAX_DEVICES_PER_API_KEY
  );
  maxTotalDevices = parsePositiveIntegerEnv(MAX_TOTAL_ENV_NAME, DEFAULT_MAX_TOTAL_DEVICES);
}
