/**
 * Guards for the per-provider probe target resolution (#8411 follow-up to #10420).
 *
 * `resolveEligibleProviderUrl` is checked against real `providerRegistry` entries rather than
 * a mock: `groq` for the eligible case (plain `baseUrl`, `/chat/completions` → `/models`) and
 * `antigravity` for the ineligible case — it has an entry, but only `baseUrls[]` (a custom
 * `urlBuilder`), no singular `baseUrl` to read.
 *
 * `resolveProviderProbeTarget` is checked against a real database (`assignProxyToScope`),
 * mirroring `tests/unit/db-health-driver.test.ts`'s pattern of comparing against ground truth
 * rather than a mocked DB.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-probe-target-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "provider-probe-target-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const probeTarget = await import("../../src/lib/proxyHealth/providerProbeTarget.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seedProxy(name: string) {
  return proxiesDb.createProxy({
    name,
    type: "http",
    host: "127.0.0.1",
    port: 1, // never dialed by these tests — target resolution only
  });
}

// ─── isProbeSafeBaseUrl: the guard, tested directly, no registry involved ──

test("https without a query string is safe", () => {
  assert.equal(probeTarget.isProbeSafeBaseUrl("https://api.example.com/v1"), true);
});

test("plain http is rejected — no registry entry uses it, no reason to widen the surface", () => {
  assert.equal(probeTarget.isProbeSafeBaseUrl("http://api.example.com/v1"), false);
});

test("non-http(s) schemes are rejected", () => {
  for (const url of ["ws://api.example.com", "wss://api.example.com", "ftp://x", "devin://x"]) {
    assert.equal(probeTarget.isProbeSafeBaseUrl(url), false, url);
  }
});

test("a query string on the base is rejected", () => {
  assert.equal(probeTarget.isProbeSafeBaseUrl("https://api.example.com/v1?beta=true"), false);
});

test("empty or non-string input is rejected", () => {
  assert.equal(probeTarget.isProbeSafeBaseUrl(""), false);
});

// ─── resolveEligibleProviderUrl: pure, against real registry entries ──

test("groq resolves through its real registry baseUrl, /chat/completions swapped for /models", () => {
  assert.equal(
    probeTarget.resolveEligibleProviderUrl("groq"),
    "https://api.groq.com/openai/v1/models"
  );
});

test("antigravity is ineligible: its registry entry has baseUrls[], no singular baseUrl", () => {
  assert.equal(probeTarget.resolveEligibleProviderUrl("antigravity"), null);
});

test("a provider id with no registry entry at all is ineligible", () => {
  assert.equal(probeTarget.resolveEligibleProviderUrl("no-such-provider-8411"), null);
});

// ─── isProviderTargetEnabled: the kill switch ──────────────────────────

test("the switch defaults to enabled", () => {
  assert.equal(probeTarget.isProviderTargetEnabled({}), true);
});

test('only the literal string "false" disables it', () => {
  assert.equal(
    probeTarget.isProviderTargetEnabled({ PROXY_HEALTH_USE_PROVIDER_TARGET: "false" }),
    false
  );
  for (const raw of ["0", "no", "False", "", undefined]) {
    assert.equal(
      probeTarget.isProviderTargetEnabled({ PROXY_HEALTH_USE_PROVIDER_TARGET: raw }),
      true,
      `expected enabled for ${JSON.stringify(raw)}`
    );
  }
});

// ─── resolveProviderProbeTarget: wiring against a real database ───────

test("a proxy with no assignment resolves to null", async () => {
  const proxy = await seedProxy("Unassigned Proxy");
  assert.equal(await probeTarget.resolveProviderProbeTarget(proxy!.id), null);
});

test("a proxy assigned to an eligible provider resolves to its models URL", async () => {
  const proxy = await seedProxy("Groq-Assigned Proxy");
  await proxiesDb.assignProxyToScope("provider", "groq", proxy!.id);
  assert.equal(
    await probeTarget.resolveProviderProbeTarget(proxy!.id),
    "https://api.groq.com/openai/v1/models"
  );
});

test("a proxy assigned to an ineligible provider (antigravity) falls back to null", async () => {
  const proxy = await seedProxy("Antigravity-Assigned Proxy");
  await proxiesDb.assignProxyToScope("provider", "antigravity", proxy!.id);
  assert.equal(await probeTarget.resolveProviderProbeTarget(proxy!.id), null);
});

test("the switch off skips resolution even for an eligible assignment", async () => {
  const proxy = await seedProxy("Switch-Off Proxy");
  await proxiesDb.assignProxyToScope("provider", "groq", proxy!.id);
  assert.equal(
    await probeTarget.resolveProviderProbeTarget(proxy!.id, {
      PROXY_HEALTH_USE_PROVIDER_TARGET: "false",
    }),
    null
  );
});

test("a global-scope assignment (no provider) is ignored, not mistaken for eligible", async () => {
  const proxy = await seedProxy("Global-Assigned Proxy");
  await proxiesDb.assignProxyToScope("global", null, proxy!.id);
  assert.equal(await probeTarget.resolveProviderProbeTarget(proxy!.id), null);
});

test("multiple assignments: the first eligible provider wins, ineligible ones are skipped", async () => {
  const proxy = await seedProxy("Multi-Assigned Proxy");
  await proxiesDb.assignProxyToScope("provider", "antigravity", proxy!.id);
  await proxiesDb.assignProxyToScope("provider", "groq", proxy!.id);
  const target = await probeTarget.resolveProviderProbeTarget(proxy!.id);
  assert.equal(target, "https://api.groq.com/openai/v1/models");
});
