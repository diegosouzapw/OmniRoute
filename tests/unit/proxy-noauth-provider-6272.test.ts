import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-6272-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("#6272: resolveProxyForConnection('noauth', ...) honors a provider-level proxy assigned to 'mimocode'", async () => {
  core.getDbInstance();
  const proxy = { type: "http", host: "127.0.0.1", port: 8888 };

  // Reporter's second symptom: "same thing happen when i set the proxy directly
  // in the provider menu" -> assign a provider-scoped proxy to the mimocode
  // provider id, the way Settings -> Providers -> mimocode would persist it.
  await settingsDb.setProxyForLevel("provider", "mimocode", proxy);

  const resolved = await settingsDb.resolveProxyForConnection("noauth", undefined);

  assert.equal(
    resolved?.proxy?.host,
    "127.0.0.1",
    `expected the mimocode provider-level proxy to be honored, got level=${resolved?.level} proxy=${JSON.stringify(resolved?.proxy)}`
  );
  assert.equal(resolved?.level, "provider");
  assert.equal(resolved?.levelId, "mimocode");
});

test("control: resolveProxyForConnection('noauth', ...) still honors the GLOBAL proxy when no no-auth provider proxy is set", async () => {
  core.getDbInstance();
  await settingsDb.deleteProxyForLevel("provider", "mimocode");
  const proxy = { type: "http", host: "10.0.0.1", port: 9999 };
  await settingsDb.setProxyForLevel("global", null, proxy);

  const resolved = await settingsDb.resolveProxyForConnection("noauth", undefined);
  assert.equal(resolved?.proxy?.host, "10.0.0.1");
  assert.equal(resolved?.level, "global");
});
