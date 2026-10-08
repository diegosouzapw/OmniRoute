/**
 * Zero-import leaf. `src/lib/db/proxyLogs.ts` and `src/lib/proxyLogger.ts` need this helper;
 * importing it from `upstreamStatusCapture.ts` pulled providerRequestLogging → usage →
 * usage/migrations (top-level await) into every DB module that imports proxyLogs, which
 * deadlocks the esbuild MCP bundle (tests/unit/build/mcp-bundle-startup.test.ts).
 */

/**
 * Non-negative integer durations only: clock skew or malformed values stay
 * null so partially migrated databases never corrupt a row.
 */
export function sanitizeTimingMs(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}
