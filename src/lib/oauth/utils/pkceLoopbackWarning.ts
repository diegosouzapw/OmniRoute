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
 */

const PKCE_LOOPBACK_REDIRECT_HINT: Record<string, string> = {
  codex: "http://localhost:1455/auth/callback",
  "xai-oauth": "http://127.0.0.1:56121/callback",
  "grok-cli": "http://127.0.0.1:56122/callback",
};

/**
 * Build the warning shown instead of silently opening the provider's authorize URL
 * when the dashboard is reached from a LAN IP (isLocalhost but not isTrueLocalhost)
 * for a PKCE_CALLBACK_SERVER_PROVIDERS provider.
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
