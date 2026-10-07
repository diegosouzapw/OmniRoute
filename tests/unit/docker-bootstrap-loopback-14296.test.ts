import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #14296 — SYMPTOM guard: Docker's default bridge networking (`-p PORT:PORT`)
// does NOT preserve the browser's 127.0.0.1 source address for the connection
// as seen *inside* the container — the peer the app's custom Node server
// actually observes is the docker0 bridge gateway address (typically
// 172.17.0.1 on Linux, or an equivalent private-range relay address under
// Docker Desktop for Mac's VM networking). This is well-documented Docker
// behavior (see e.g. https://pythonspeed.com/articles/docker-connection-refused/
// and https://github.com/qoomon/docker-host) and was the original repro that
// `/triage-fix-bugs` proved RED — but the fix it pointed at (treat the docker0
// gateway peer as loopback) was REJECTED by the owner (2026-09-21): with
// `-p 20128:20128`, that peer is indistinguishable from any other client of
// the published port, so calling it "loopback" would open the fresh-install
// bootstrap window (and the LOCAL_ONLY spawn-capable route tier, Hard Rules
// #15/#17) to the whole internet.
//
// This file now guards the OPPOSITE assertion: the docker0-gateway peer must
// NEVER classify as loopback, on `/dashboard` (unaffected by #14296's actual
// fix — proves the peer truly isn't loopback) or on the onboarding bootstrap
// writes (which #14296 fixes by way of a one-shot token — see
// tests/unit/docker-bootstrap-token-14296.test.ts — but which must still
// require SOMETHING when no token is presented). A regression here — this
// test going red because `isAuthRequired` started returning `false` for a
// gateway peer with no token — means someone reintroduced the rejected
// "gateway = loopback" fix.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-docker-loopback-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const apiAuth = await import("../../src/shared/utils/apiAuth.ts");
const { PEER_IP_HEADER, VIA_PROXY_HEADER } = await import("../../src/server/authz/headers.ts");

const TEST_PEER_STAMP_TOKEN = "docker-loopback-test-peer-stamp-token";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
}

/** Mirrors the real pipeline: the custom server stamps the real TCP peer it saw. */
function stampedPeerRequest(url: string, peerIp: string, init: RequestInit = {}): Request {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = TEST_PEER_STAMP_TOKEN;
  const headers = new Headers(init.headers);
  headers.set(PEER_IP_HEADER, `${TEST_PEER_STAMP_TOKEN}|${peerIp}`);
  headers.set(VIA_PROXY_HEADER, `${TEST_PEER_STAMP_TOKEN}|0`);
  return new Request(url, { ...init, headers });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
  delete process.env.API_KEY_SECRET;
  delete process.env.INITIAL_PASSWORD;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
});

test("#14296: the docker0/bridge-gateway peer must NEVER classify as loopback — it stays auth-required without a valid bootstrap token", async () => {
  await updateSettings({ requireLogin: true, password: "" });

  const dockerGatewayPeer = "172.17.0.1";

  const onDashboard = stampedPeerRequest("http://localhost/dashboard", dockerGatewayPeer);
  const onSettingsPatch = stampedPeerRequest("http://localhost/api/settings", dockerGatewayPeer, {
    method: "PATCH",
  });
  const onRequireLoginPost = stampedPeerRequest(
    "http://localhost/api/settings/require-login",
    dockerGatewayPeer,
    { method: "POST" }
  );

  const trueLoopback = stampedPeerRequest("http://localhost/dashboard", "127.0.0.1");
  assert.equal(
    await apiAuth.isAuthRequired(trueLoopback),
    false,
    "sanity: a real 127.0.0.1 peer must stay in the fresh-install bootstrap window"
  );

  assert.equal(
    await apiAuth.isAuthRequired(onDashboard),
    true,
    "a Docker port-forwarded peer (docker0 bridge gateway) must NEVER be treated as " +
      "loopback for /dashboard — that would open it to any client of the published port"
  );
  assert.equal(
    await apiAuth.isAuthRequired(onSettingsPatch),
    true,
    "the setupComplete PATCH must stay auth-required for a non-loopback peer with no " +
      "bootstrap token presented"
  );
  assert.equal(
    await apiAuth.isAuthRequired(onRequireLoginPost),
    true,
    "the require-login POST must stay auth-required for a non-loopback peer with no " +
      "bootstrap token presented (GHSA-7pq4-8pvv-rx7r)"
  );
});
