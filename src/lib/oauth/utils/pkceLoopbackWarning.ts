/**
 * #8046: PKCE_CALLBACK_SERVER_PROVIDERS (codex/xai-oauth/grok-cli) register a FIXED
 * loopback redirect_uri (e.g. http://localhost:1455/auth/callback for codex) with the
 * upstream OAuth app. That redirect only resolves on the machine actually running the
 * browser, not on whatever host serves the OmniRoute dashboard.
 *
 * OAuthModal's `isTrueLocalhost` check (hostname === "localhost" || "127.0.0.1") only
 * covers one such case. A dashboard reached via a LAN IP (192.168.*, 10.*, 172.16-31.*)
 * is `isLocalhost: true, isTrueLocalhost: false` — the callback-server branch was falling
 * straight through to the standard authorize flow and window.open()ing an authUrl whose
 * embedded redirect_uri can never resolve, with zero warning (reported as a silent
 * Auth0 `invalid_state` failure with no server-side log line).
 *
 * Extracted out of OAuthModal.tsx (frozen file-size baseline) so the guard has an
 * isolated, unit-testable home. Mirrors the messaging pattern of the sibling
 * remote-origin hint added for #7523 (`remoteOAuthHint.ts::buildRemoteOAuthHint`).
 *
 * Follow-up: the guard stops the doomed flow correctly, but explaining it as one long
 * sentence in the generic red error step left the operator to work out *which* ports to
 * forward. `buildPkceLoopbackMismatchHint()` returns the same diagnosis as structured
 * data — including a copy-pasteable `ssh -L` command with the detected host and both
 * ports already filled in — so the modal can render an organized panel instead.
 */

const PKCE_LOOPBACK_REDIRECT_HINT: Record<string, string> = {
  codex: "http://localhost:1455/auth/callback",
  "xai-oauth": "http://127.0.0.1:56121/callback",
  "grok-cli": "http://127.0.0.1:56122/callback",
};

/** Ports the upstream OAuth apps hardcode; kept in sync with OAuthModal's redirectUri branch. */
const PKCE_LOOPBACK_CALLBACK_PORT: Record<string, number> = {
  codex: 1455,
  "xai-oauth": 56121,
  "grok-cli": 56122,
};

export type PkceLoopbackLocation = {
  /** `window.location.hostname` — the LAN IP the dashboard was reached at. */
  hostname: string;
  /** `window.location.port` — empty string on the protocol's default port. */
  port: string;
  /** `window.location.protocol` — used only to resolve an empty port. */
  protocol?: string;
};

export type PkceLoopbackMismatchHint = {
  provider: string;
  /** The fixed redirect_uri registered with the provider's OAuth app. */
  redirectUri: string;
  /** Port inside that redirect_uri; null for providers we have no mapping for. */
  callbackPort: number | null;
  /** Port the dashboard is currently served on, with the default-port case resolved. */
  dashboardPort: string;
  /** The LAN host the operator typed — pre-filled into the tunnel command. */
  dashboardHost: string;
  /** Ready-to-copy SSH local-forward; only `<user>` is left for the operator. */
  tunnelCommand: string;
  /** Where to browse once the tunnel is up. */
  localDashboardUrl: string;
};

function resolveDashboardPort(location: PkceLoopbackLocation): string {
  if (location.port) return location.port;
  return location.protocol === "https:" ? "443" : "80";
}

/**
 * Structured form of the LAN-IP loopback mismatch, for the dedicated modal panel.
 *
 * Both ports have to be forwarded, and forwarding only one still fails:
 * - the dashboard port, so the origin becomes true-localhost and the callback-server
 *   branch runs at all (a LAN origin never reaches it);
 * - the provider's fixed callback port, because the PKCE callback server listens on the
 *   OmniRoute *server's* loopback while the provider redirects the *browser's* loopback.
 */
export function buildPkceLoopbackMismatchHint(
  provider: string,
  location: PkceLoopbackLocation
): PkceLoopbackMismatchHint {
  const dashboardPort = resolveDashboardPort(location);
  const callbackPort = PKCE_LOOPBACK_CALLBACK_PORT[provider] ?? null;

  const forwards = [dashboardPort];
  if (callbackPort != null && String(callbackPort) !== dashboardPort) {
    forwards.push(String(callbackPort));
  }

  return {
    provider,
    redirectUri: PKCE_LOOPBACK_REDIRECT_HINT[provider] ?? "a fixed localhost callback URL",
    callbackPort,
    dashboardPort,
    dashboardHost: location.hostname,
    tunnelCommand: `ssh ${forwards
      .map((p) => `-L ${p}:127.0.0.1:${p}`)
      .join(" ")} <user>@${location.hostname}`,
    localDashboardUrl: `http://localhost:${dashboardPort}`,
  };
}

/**
 * Flat one-line form of the same diagnosis, kept for non-UI callers (logs, and any
 * consumer that only has room for a single string). The modal renders the structured
 * hint above instead.
 */
export function buildPkceLoopbackMismatchWarning(provider: string): string {
  const redirect = PKCE_LOOPBACK_REDIRECT_HINT[provider] ?? "a fixed localhost callback URL";
  return (
    `OmniRoute is being accessed from a LAN IP, not true localhost. ${provider}'s OAuth app ` +
    `is registered with a fixed loopback redirect (${redirect}) that only resolves on the ` +
    "machine running this browser tab, not on the OmniRoute server — the login will silently " +
    "fail on the provider's side. Open the OmniRoute dashboard from true localhost instead " +
    "(SSH port-forward: ssh -L <port>:127.0.0.1:<port> <user>@<omniroute-host>, then browse to " +
    "http://localhost:<port>), or use the token-import flow for this provider if available."
  );
}
