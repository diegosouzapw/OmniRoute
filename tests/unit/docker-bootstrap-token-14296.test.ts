import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #14296 — owner-approved fix (option 2, 2026-09-21): a fresh install with no
// password/OIDC/INITIAL_PASSWORD/session, seen from a non-loopback peer (a
// Docker/NAT-forwarded local operator — see docker-bootstrap-loopback-14296
// for why that peer must never be reclassified as loopback), gets a one-shot
// bootstrap token printed to the process log. The two onboarding bootstrap
// write (`POST /api/settings/require-login`) accepts that token as an
// alternate proof of being the local operator, and it is invalidated the
// first time it is successfully consumed. The general `PATCH /api/settings`
// is deliberately NOT token-reachable (see the rework cases below).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-docker-token-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const apiAuth = await import("../../src/shared/utils/apiAuth.ts");
const { PEER_IP_HEADER, VIA_PROXY_HEADER, BOOTSTRAP_TOKEN_HEADER } =
  await import("../../src/server/authz/headers.ts");
const bootstrapToken = await import("../../src/lib/auth/bootstrapToken.ts");

const TEST_PEER_STAMP_TOKEN = "docker-token-test-peer-stamp-token";
const DOCKER_GATEWAY_PEER = "172.17.0.1";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  bootstrapToken.__resetBootstrapTokenForTest();
}

/** Mirrors the real pipeline: the custom server stamps the real TCP peer it saw. */
function stampedPeerRequest(
  url: string,
  peerIp: string,
  init: RequestInit = {},
  tokenHeader?: string
): Request {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = TEST_PEER_STAMP_TOKEN;
  const headers = new Headers(init.headers);
  headers.set(PEER_IP_HEADER, `${TEST_PEER_STAMP_TOKEN}|${peerIp}`);
  headers.set(VIA_PROXY_HEADER, `${TEST_PEER_STAMP_TOKEN}|0`);
  if (tokenHeader !== undefined) headers.set(BOOTSTRAP_TOKEN_HEADER, tokenHeader);
  return new Request(url, { ...init, headers });
}

function requireLoginPostRequest(peerIp: string, tokenHeader?: string): Request {
  return stampedPeerRequest(
    "http://localhost/api/settings/require-login",
    peerIp,
    { method: "POST" },
    tokenHeader
  );
}

function settingsPatchRequest(peerIp: string, tokenHeader?: string): Request {
  return stampedPeerRequest(
    "http://localhost/api/settings",
    peerIp,
    { method: "PATCH" },
    tokenHeader
  );
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
  bootstrapToken.__resetBootstrapTokenForTest();
});

test("#14296: a non-loopback caller with NO token is still auth-required (and a token gets minted for the log)", async () => {
  await updateSettings({ requireLogin: true, password: "" });

  assert.equal(await apiAuth.isAuthRequired(requireLoginPostRequest(DOCKER_GATEWAY_PEER)), true);

  // isAuthRequired() lazily mints the token the first time a non-loopback
  // caller hits the gate without one, so the operator watching the log has
  // something to paste back in.
  assert.equal(bootstrapToken.peekBootstrapToken(null), false);
  assert.equal(bootstrapToken.peekBootstrapToken("definitely-wrong"), false);
});

test("#14296: the CORRECT one-shot token lets a non-loopback caller through the require-login POST", async () => {
  await updateSettings({ requireLogin: true, password: "" });

  // Mint deterministically for the test instead of relying on the lazy mint's
  // exact call site.
  const token = bootstrapToken.getOrCreateBootstrapToken({ log: () => {} });

  assert.equal(
    await apiAuth.isAuthRequired(requireLoginPostRequest(DOCKER_GATEWAY_PEER, token)),
    false,
    "a valid bootstrap token must satisfy the require-login POST gate for a non-loopback peer"
  );
});

// Rework (merge-batch 2026-09-23): the token is scoped to the require-login
// POST only. The general settings PATCH accepts ANY settings key, and the
// wizard never needs a bootstrap exemption for it: the skip-password path
// writes requireLogin=false first (after which auth is off install-wide by
// design, #574), and the password path logs in and carries a session.
test("#14296 rework: the bootstrap token does NOT open the general settings PATCH", async () => {
  await updateSettings({ requireLogin: true, password: "" });
  const token = bootstrapToken.getOrCreateBootstrapToken({ log: () => {} });

  assert.equal(
    await apiAuth.isAuthRequired(settingsPatchRequest(DOCKER_GATEWAY_PEER, token)),
    true,
    "a bootstrap token must not authorize arbitrary settings writes from a non-loopback peer"
  );
});

test("#14296 rework: a keyless loopback install that already completed onboarding keeps the settings PATCH auth-required", async () => {
  await updateSettings({ requireLogin: true, password: "", setupComplete: true });

  assert.equal(
    await apiAuth.isAuthRequired(settingsPatchRequest("127.0.0.1")),
    true,
    "the bootstrap-write exemption must not widen the post-onboarding settings PATCH for loopback"
  );
});

test("#14296 rework: the wizard's skip-password flow still completes — token on require-login, then the PATCH is open", async () => {
  await updateSettings({ requireLogin: true, password: "" });
  const token = bootstrapToken.getOrCreateBootstrapToken({ log: () => {} });

  assert.equal(
    await apiAuth.isAuthRequired(requireLoginPostRequest(DOCKER_GATEWAY_PEER, token)),
    false
  );
  // What POST /api/settings/require-login { requireLogin: false } persists,
  // followed by the route consuming the one-shot token.
  await updateSettings({ requireLogin: false });
  assert.equal(bootstrapToken.consumeBootstrapToken(token), true);

  assert.equal(
    await apiAuth.isAuthRequired(settingsPatchRequest(DOCKER_GATEWAY_PEER)),
    false,
    "after requireLogin=false the setupComplete PATCH needs no token"
  );
});

test("#14296: a WRONG token is rejected — still auth-required, not consumed", async () => {
  await updateSettings({ requireLogin: true, password: "" });
  const token = bootstrapToken.getOrCreateBootstrapToken({ log: () => {} });

  assert.equal(
    await apiAuth.isAuthRequired(requireLoginPostRequest(DOCKER_GATEWAY_PEER, "wrong-token")),
    true
  );
  // The real token is still valid — a wrong guess must not burn it.
  assert.equal(bootstrapToken.peekBootstrapToken(token), true);
});

test("#14296: the token is ONE-SHOT — consuming it invalidates it for a second write", () => {
  const token = bootstrapToken.getOrCreateBootstrapToken({ log: () => {} });

  assert.equal(bootstrapToken.consumeBootstrapToken(token), true, "first consume succeeds");
  assert.equal(
    bootstrapToken.consumeBootstrapToken(token),
    false,
    "the same token must not be consumable twice"
  );
  assert.equal(bootstrapToken.peekBootstrapToken(token), false, "peek reflects the invalidation");
});

test("#14296: a true loopback peer never needs the token", async () => {
  await updateSettings({ requireLogin: true, password: "" });

  assert.equal(
    await apiAuth.isAuthRequired(requireLoginPostRequest("127.0.0.1")),
    false,
    "loopback stays exempt regardless of any token"
  );
});
