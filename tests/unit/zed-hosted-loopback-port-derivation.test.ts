import test from "node:test";
import assert from "node:assert/strict";

/**
 * Regression coverage for #10517.
 *
 * Zed's native-app sign-in always redirects the browser to
 * `http://127.0.0.1:<native_app_port>/`, ignoring any path/redirect_uri we send.
 * `zed-hosted.ts::buildAuthUrl` reuses the dashboard's own loopback port as
 * native_app_port so that redirect lands back on OmniRoute instead of a dead
 * "site can't be reached" page.
 *
 * Before this fix, the port was re-derived from the browser-supplied
 * `redirectUri` string (`OAuthModal.tsx`'s `window.location.port ||
 * (protocol === "https:" ? "443" : "80")` fallback), which produced
 * `http://127.0.0.1:443/` when the dashboard was reached over HTTPS on its
 * default port (e.g. behind a local TLS-terminating reverse proxy) — a scheme
 * mismatch, since nothing serves plain HTTP on 443 and Zed's redirect is
 * always plain http regardless of how the browser reached the dashboard.
 *
 * The fix runs server-side (this code executes in the Next.js API route, not
 * the browser) and derives the port from the OmniRoute process's own
 * authoritative listening port (`getRuntimePorts()`, sourced from
 * OMNIROUTE_PORT/PORT/DASHBOARD_PORT) once the redirect URI's hostname is
 * confirmed loopback — no longer trusting the browser-observed scheme/port.
 */

const originalEnv = {
  OMNIROUTE_PORT: process.env.OMNIROUTE_PORT,
  PORT: process.env.PORT,
  DASHBOARD_PORT: process.env.DASHBOARD_PORT,
};

function resetPortEnv() {
  delete process.env.OMNIROUTE_PORT;
  delete process.env.PORT;
  delete process.env.DASHBOARD_PORT;
}

test.after(() => {
  resetPortEnv();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value !== undefined) process.env[key] = value;
  }
});

const { __test__ } = await import("../../src/lib/oauth/providers/zed-hosted.ts");
const { resolveDashboardLoopbackPort } = __test__;

test("resolveDashboardLoopbackPort: loopback hostname over HTTPS on the default port resolves via server config, not a guessed 443", () => {
  resetPortEnv();
  process.env.OMNIROUTE_PORT = "20128";

  // This is the exact shape OAuthModal.tsx's buggy fallback used to produce
  // for the true-localhost + default-port case (scheme hardcoded to "http"
  // regardless of the real protocol, port guessed from the protocol default).
  // Even with a scheme/port combination that does not reflect reality, the
  // hostname alone is enough — the real port comes from server config.
  const port = resolveDashboardLoopbackPort("http://localhost:443/callback");
  assert.equal(port, 20128, "must use the server's own configured port, never the guessed 443");
});

test("resolveDashboardLoopbackPort: respects OMNIROUTE_PORT override", () => {
  resetPortEnv();
  process.env.OMNIROUTE_PORT = "31415";

  assert.equal(resolveDashboardLoopbackPort("http://127.0.0.1:20128/callback"), 31415);
  assert.equal(resolveDashboardLoopbackPort("http://localhost/callback"), 31415);
});

test("resolveDashboardLoopbackPort: falls back to PORT then DASHBOARD_PORT precedence like getRuntimePorts", () => {
  resetPortEnv();
  process.env.PORT = "9000";
  assert.equal(resolveDashboardLoopbackPort("http://localhost:20128/callback"), 9000);

  resetPortEnv();
  process.env.DASHBOARD_PORT = "9500";
  assert.equal(resolveDashboardLoopbackPort("http://127.0.0.1:20128/callback"), 9500);
});

test("resolveDashboardLoopbackPort: IPv6 loopback literal resolves to the server port", () => {
  resetPortEnv();
  process.env.OMNIROUTE_PORT = "20128";
  assert.equal(resolveDashboardLoopbackPort("http://[::1]:20128/callback"), 20128);
});

test("resolveDashboardLoopbackPort: non-loopback (remote/LAN) redirect URIs return null", () => {
  resetPortEnv();
  process.env.OMNIROUTE_PORT = "20128";

  assert.equal(resolveDashboardLoopbackPort("https://omniroute.example.com/callback"), null);
  assert.equal(resolveDashboardLoopbackPort("http://192.168.1.50:20128/callback"), null);
});

test("resolveDashboardLoopbackPort: malformed/missing redirect URIs return null", () => {
  resetPortEnv();
  assert.equal(resolveDashboardLoopbackPort(undefined), null);
  assert.equal(resolveDashboardLoopbackPort("not a url"), null);
});

test("zedHosted.buildAuthUrl: reuses the server's configured port as native_app_port for a loopback redirect, regardless of the browser-observed scheme", async () => {
  resetPortEnv();
  process.env.OMNIROUTE_PORT = "20128";

  const { zedHosted } = await import("../../src/lib/oauth/providers/zed-hosted.ts");
  const { ZED_HOSTED_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");

  // Simulate the redirect URI OAuthModal.tsx sends when the dashboard is
  // reached over HTTPS on its implicit default port (window.location.port is
  // empty): hostname is loopback, but scheme/port do not reflect the real
  // OmniRoute listener.
  const built = zedHosted.buildAuthUrl(ZED_HOSTED_CONFIG, "http://localhost:443/callback");
  assert.equal(built.redirectUri, "http://127.0.0.1:20128/");

  const url = new URL(built.authUrl);
  assert.equal(url.searchParams.get("native_app_port"), "20128");
});

test("zedHosted.buildAuthUrl: remote/LAN redirect URIs keep the configured default native app port", async () => {
  resetPortEnv();
  process.env.OMNIROUTE_PORT = "20128";

  const { zedHosted } = await import("../../src/lib/oauth/providers/zed-hosted.ts");
  const { ZED_HOSTED_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");

  const built = zedHosted.buildAuthUrl(ZED_HOSTED_CONFIG, "https://omniroute.example.com/callback");
  assert.equal(built.redirectUri, `http://127.0.0.1:${ZED_HOSTED_CONFIG.defaultNativeAppPort}/`);
});
