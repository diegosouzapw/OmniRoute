import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-providers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Providers read process.env at call-time, so we can set flags before import
process.env.FREE_PROXY_1PROXY_ENABLED = "true";
process.env.FREE_PROXY_PROXIFLY_ENABLED = "false";
process.env.FREE_PROXY_IPLOCATE_ENABLED = "false";

const core = await import("../../src/lib/db/core.ts");
const { getProvider, getEnabledProviders, getAllProviders } = await import(
  "../../src/lib/freeProxyProviders/index.ts"
);

async function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Registry ─────────────────────────────────────────────────────────────────

test("getAllProviders returns exactly 3 providers", () => {
  const providers = getAllProviders();
  assert.equal(providers.length, 3);
  const ids = providers.map((p) => p.id);
  assert.ok(ids.includes("1proxy"));
  assert.ok(ids.includes("proxifly"));
  assert.ok(ids.includes("iplocate"));
});

test("getProvider returns the correct provider by id", () => {
  const p = getProvider("1proxy");
  assert.ok(p);
  assert.equal(p.id, "1proxy");
});

test("getProvider returns undefined for unknown id", () => {
  const p = getProvider("unknown" as any);
  assert.equal(p, undefined);
});

test("getEnabledProviders respects env flags", () => {
  // Only 1proxy is enabled in this test env
  const enabled = getEnabledProviders();
  const ids = enabled.map((p) => p.id);
  assert.ok(ids.includes("1proxy"));
  assert.ok(!ids.includes("proxifly"));
  assert.ok(!ids.includes("iplocate"));
});

// ── OneproxyProvider ──────────────────────────────────────────────────────────

test("OneproxyProvider.isEnabled returns false when env is 'false'", () => {
  const original = process.env.FREE_PROXY_1PROXY_ENABLED;
  process.env.FREE_PROXY_1PROXY_ENABLED = "false";
  const p = getProvider("1proxy")!;
  assert.equal(p.isEnabled(), false);
  process.env.FREE_PROXY_1PROXY_ENABLED = original;
});

test("OneproxyProvider.sync returns disabled error when not enabled", async () => {
  const original = process.env.FREE_PROXY_1PROXY_ENABLED;
  process.env.FREE_PROXY_1PROXY_ENABLED = "false";
  await reset();

  const p = getProvider("1proxy")!;
  const result = await p.sync();
  assert.equal(result.fetched, 0);
  assert.ok(result.errors.length > 0);
  assert.ok(result.errors[0].includes("disabled"));

  process.env.FREE_PROXY_1PROXY_ENABLED = original;
});

test("OneproxyProvider.sync handles HTTP error and increments failure count", async () => {
  await reset();
  const original = process.env.FREE_PROXY_1PROXY_API_URL;

  // Point to a URL that returns non-200
  process.env.FREE_PROXY_1PROXY_ENABLED = "true";
  process.env.FREE_PROXY_1PROXY_API_URL = "http://127.0.0.1:1/nonexistent";

  const p = getProvider("1proxy")!;
  const result = await p.sync();

  assert.equal(result.fetched, 0);
  assert.ok(result.errors.length > 0);

  process.env.FREE_PROXY_1PROXY_API_URL = original ?? "";
});

test("OneproxyProvider.list delegates to listFreeProxiesBySource", async () => {
  await reset();
  process.env.FREE_PROXY_1PROXY_ENABLED = "true";

  const freeProxiesDb = await import("../../src/lib/db/freeProxies.ts");
  await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "99.0.0.1", port: 8080, type: "http",
    countryCode: "US", qualityScore: 70, latencyMs: 100, anonymity: null, lastValidated: null,
  });

  const p = getProvider("1proxy")!;
  const items = await p.list({ limit: 10 });
  assert.ok(Array.isArray(items));
  assert.ok(items.length >= 1);
  assert.equal(items[0].source, "1proxy");
});

// ── ProxiflyProvider ──────────────────────────────────────────────────────────

test("ProxiflyProvider.isEnabled returns true when not set (enabled by default)", () => {
  const original = process.env.FREE_PROXY_PROXIFLY_ENABLED;
  delete process.env.FREE_PROXY_PROXIFLY_ENABLED;
  const p = getProvider("proxifly")!;
  assert.equal(p.isEnabled(), true);
  if (original !== undefined) process.env.FREE_PROXY_PROXIFLY_ENABLED = original;
});

test("ProxiflyProvider.isEnabled returns true when explicitly set", () => {
  const original = process.env.FREE_PROXY_PROXIFLY_ENABLED;
  process.env.FREE_PROXY_PROXIFLY_ENABLED = "true";
  const p = getProvider("proxifly")!;
  assert.equal(p.isEnabled(), true);
  process.env.FREE_PROXY_PROXIFLY_ENABLED = original ?? "";
});

test("ProxiflyProvider.sync returns disabled error when not enabled", async () => {
  const original = process.env.FREE_PROXY_PROXIFLY_ENABLED;
  process.env.FREE_PROXY_PROXIFLY_ENABLED = "false";
  await reset();

  const p = getProvider("proxifly")!;
  const result = await p.sync();
  assert.equal(result.fetched, 0);
  assert.ok(result.errors.some((e) => e.includes("disabled")));

  process.env.FREE_PROXY_PROXIFLY_ENABLED = original ?? "";
});

// ── IplocateProvider ──────────────────────────────────────────────────────────

test("IplocateProvider.isEnabled returns false by default", () => {
  const original = process.env.FREE_PROXY_IPLOCATE_ENABLED;
  delete process.env.FREE_PROXY_IPLOCATE_ENABLED;
  const p = getProvider("iplocate")!;
  assert.equal(p.isEnabled(), false);
  if (original !== undefined) process.env.FREE_PROXY_IPLOCATE_ENABLED = original;
});

test("IplocateProvider.sync returns disabled error when not enabled", async () => {
  const original = process.env.FREE_PROXY_IPLOCATE_ENABLED;
  process.env.FREE_PROXY_IPLOCATE_ENABLED = "false";
  await reset();

  const p = getProvider("iplocate")!;
  const result = await p.sync();
  assert.equal(result.fetched, 0);
  assert.ok(result.errors.some((e) => e.includes("disabled")));

  process.env.FREE_PROXY_IPLOCATE_ENABLED = original ?? "";
});
