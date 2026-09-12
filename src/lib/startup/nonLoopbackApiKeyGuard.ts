// Boot-time guard for issue #12568: docker-compose can be told to bind the
// dashboard/API/live-WS ports to a non-loopback interface (APP_BIND_HOST,
// API_HOST, LIVE_WS_HOST) while REQUIRE_API_KEY still defaults to `false`.
// That combination puts the anonymous /v1 LLM proxy on the LAN/WAN with no
// key required. This never hard-fails the boot (a reverse proxy in front of
// OmniRoute may already be doing its own auth) — it only logs a loud warning
// so the operator notices the exposure instead of discovering it from traffic.

const LOOPBACK_HOSTS = new Set(["127.0.0.1", "::1", "localhost", "::ffff:127.0.0.1"]);

function isLoopbackHost(host: string): boolean {
  return LOOPBACK_HOSTS.has(host.trim().toLowerCase());
}

function isRequireApiKeyDisabled(): boolean {
  const raw = (process.env.REQUIRE_API_KEY || "").trim().toLowerCase();
  // Matches the feature-flag default: unset/empty falls back to "false".
  return raw !== "true" && raw !== "1" && raw !== "yes";
}

/**
 * Logs a warning when `host` resolves to a non-loopback interface while
 * REQUIRE_API_KEY is disabled. Never throws and never blocks startup.
 */
export function warnIfNonLoopbackWithoutApiKey(serverLabel: string, host: string): void {
  if (isLoopbackHost(host)) return;
  if (!isRequireApiKeyDisabled()) return;

  console.warn(
    `[startup] ${serverLabel} is bound to non-loopback host "${host}" while ` +
      "REQUIRE_API_KEY is disabled — this exposes the anonymous /v1 proxy to " +
      "every reachable network interface. Set REQUIRE_API_KEY=true, or bind " +
      "back to 127.0.0.1, unless a reverse proxy in front of this instance " +
      "already enforces its own authentication."
  );
}
