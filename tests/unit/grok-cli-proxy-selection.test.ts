// Regression test for: Grok Build (grok-cli) inference/refresh requests bypassed the
// operator's configured proxy entirely. The executor talks to Grok's upstream via raw
// Node `https.request()` (forced IPv4, to dodge Cloudflare blocking on the direct path)
// instead of the process-wide patched `fetch()` that every other executor uses — so a
// proxy pinned to the connection/provider/global scope was silently ignored, leaking the
// real egress IP and defeating account-isolation/anonymity setups. Mirrors the class of
// bug fixed upstream in decolua/9router#2343 ("fix(oauth): honor proxy selection during
// OAuth login"), adapted to OmniRoute's actual grok-cli architecture (import-token flow,
// no device-code polling) where the leak lives in `resolveGrokRequestDispatch()`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveGrokRequestDispatch } from "../../open-sse/executors/grok-cli.ts";

const TARGET_URL = "https://grok.x.ai/rest/app-chat/conversations/new";

test("resolveGrokRequestDispatch: no proxy configured -> direct IPv4 dispatch (unchanged behavior)", () => {
  const dispatch = resolveGrokRequestDispatch(TARGET_URL, () => ({
    source: "direct",
    proxyUrl: null,
  }));

  assert.equal(dispatch.family, 4);
  assert.equal(dispatch.agent, undefined);
});

test("resolveGrokRequestDispatch: HTTP proxy configured -> request is dispatched through a proxy agent, not direct", () => {
  const dispatch = resolveGrokRequestDispatch(TARGET_URL, () => ({
    source: "context",
    proxyUrl: "http://proxy.internal:8080",
  }));

  // The fix: an agent bound to the configured proxy must be present, and the
  // direct-IPv4 workaround must NOT be applied (it would race the proxy tunnel).
  assert.ok(dispatch.agent, "expected a proxy agent to be constructed");
  assert.notEqual(dispatch.family, 4);
});

test("resolveGrokRequestDispatch: HTTPS proxy configured -> request is dispatched through a proxy agent", () => {
  const dispatch = resolveGrokRequestDispatch(TARGET_URL, () => ({
    source: "context",
    proxyUrl: "https://user:pass@proxy.internal:8443",
  }));

  assert.ok(dispatch.agent, "expected a proxy agent to be constructed");
});

test("resolveGrokRequestDispatch: unsupported proxy protocol (socks5) fails closed instead of leaking direct", () => {
  assert.throws(
    () =>
      resolveGrokRequestDispatch(TARGET_URL, () => ({
        source: "context",
        proxyUrl: "socks5://proxy.internal:1080",
      })),
    /proxy/i
  );
});
