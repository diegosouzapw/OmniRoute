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

/**
 * Host the Next server that answers `/v1` inference is bound to.
 *
 * Two entrypoints bind that server and they do NOT read the same variable:
 *
 * - `scripts/dev/run-next.mjs` (`npm run dev` / `npm start`) uses
 *   `process.env.HOST`, and publishes the resolved value as
 *   `OMNIROUTE_BOUND_HOST` for exactly this lookup.
 * - `scripts/dev/run-standalone.mjs` (the Docker entrypoint) delegates to
 *   Next's generated `server.js`, which uses Next's own `HOSTNAME`
 *   convention — `Dockerfile` sets `HOSTNAME=0.0.0.0`.
 *
 * `HOST` is deliberately NOT in this chain. The only path that honours it is
 * run-next.mjs, which has already folded it into `OMNIROUTE_BOUND_HOST`; on
 * the standalone path Next ignores `HOST` and binds `HOSTNAME`, so consulting
 * it there would name an interface the server is not on. A warning that
 * fingers the wrong interface is worse than none — an operator who sees one
 * false warning stops reading the next one.
 *
 * Both entrypoints default to every interface, so the fallback does too.
 */
export const MAIN_SERVER_DEFAULT_HOST = "0.0.0.0";

export function resolveMainServerHost(): string {
  return process.env.OMNIROUTE_BOUND_HOST || process.env.HOSTNAME || MAIN_SERVER_DEFAULT_HOST;
}

/**
 * Warn when the inference-serving Next server is reachable off-box without an
 * API key. Separate from the API bridge / live-WS call sites so the log names
 * the surface an operator actually probes — `/v1/models` answering 401 says
 * nothing about whether inference is protected (#13695).
 */
export function warnIfInferenceServerExposed(): void {
  warnIfNonLoopbackWithoutApiKey(
    "Dashboard/API server (serves /v1 inference)",
    resolveMainServerHost()
  );
}
