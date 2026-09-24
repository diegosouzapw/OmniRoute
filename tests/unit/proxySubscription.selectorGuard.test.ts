import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const mod = await import("../../src/lib/proxySubscription/selectorGuard.ts");
const {
  isSelectorControlUrlAllowed,
  isSelectorControlUrlAllowedAtFetchTime,
  readSelectorAllowlist,
  readSelectorAllowlistEnv,
} = mod;

test("loopback http/https allowed by default", () => {
  assert.equal(isSelectorControlUrlAllowed("http://127.0.0.1:9090").allowed, true);
  assert.equal(isSelectorControlUrlAllowed("http://localhost:9090").allowed, true);
  assert.equal(isSelectorControlUrlAllowed("http://[::1]:9090").allowed, true);
});

test("non-http schemes rejected", () => {
  assert.equal(isSelectorControlUrlAllowed("socks5://127.0.0.1:1080").allowed, false);
  assert.equal(isSelectorControlUrlAllowed("file:///tmp/x").allowed, false);
});

test("LAN blocked without allow-list", () => {
  assert.equal(isSelectorControlUrlAllowed("http://192.168.1.1:9090").allowed, false);
  assert.equal(isSelectorControlUrlAllowed("http://10.0.0.1:9090").allowed, false);
});

test("LAN allowed when in allow-list", () => {
  const r = isSelectorControlUrlAllowed("http://192.168.1.1:9090", {
    allowlist: ["192.168.1.1"],
  });
  assert.equal(r.allowed, true);
});

test("metadata / link-local / unspecified blocked even when allow-listed", () => {
  for (const url of [
    "http://169.254.169.254/",
    "http://[fe80::1]/",
    "http://0.0.0.0:9090/",
    "http://[::]/",
    "http://[::ffff:169.254.169.254]/",
  ]) {
    const r = isSelectorControlUrlAllowed(url, { allowlist: ["*"] });
    assert.equal(r.allowed, false, url);
  }
});

test("unparseable rejected, never throws", () => {
  assert.equal(isSelectorControlUrlAllowed("not a url").allowed, false);
  assert.equal(isSelectorControlUrlAllowed("").allowed, false);
  assert.doesNotThrow(() => isSelectorControlUrlAllowed(null as never));
});

test("fetch-time check resolves hostnames and refuses blocked addresses", async () => {
  const r = await isSelectorControlUrlAllowedAtFetchTime("http://127.0.0.1:9090");
  assert.equal(r.allowed, true);
});

test("DB setting wins over env, env is the fallback, default empty", async () => {
  const prevEnv = process.env.SELECTOR_CONTROL_ALLOWLIST;
  try {
    // Default empty: no DB value, no env → LAN blocked.
    delete process.env.SELECTOR_CONTROL_ALLOWLIST;
    assert.deepEqual(readSelectorAllowlistEnv(), []);
    assert.deepEqual(readSelectorAllowlist(undefined), []);
    assert.deepEqual(readSelectorAllowlist(null), []);
    assert.equal(isSelectorControlUrlAllowed("http://192.168.1.1:9090").allowed, false);
    // Env fallback: no DB value + env set → env wins.
    process.env.SELECTOR_CONTROL_ALLOWLIST = "192.168.1.1";
    assert.deepEqual(readSelectorAllowlist(undefined), ["192.168.1.1"]);
    assert.equal(isSelectorControlUrlAllowed("http://192.168.1.1:9090").allowed, true);
    assert.equal(isSelectorControlUrlAllowed("http://10.0.0.1:9090").allowed, false);
    // DB wins: injected DB value overrides the env.
    assert.deepEqual(readSelectorAllowlist("10.0.0.1"), ["10.0.0.1"]);
    assert.equal(
      isSelectorControlUrlAllowed("http://10.0.0.1:9090", { allowlist: ["10.0.0.1"] }).allowed,
      true
    );
    assert.equal(
      isSelectorControlUrlAllowed("http://192.168.1.1:9090", { allowlist: ["10.0.0.1"] }).allowed,
      false
    );
    // Empty/blank DB value → env fallback again.
    assert.deepEqual(readSelectorAllowlist("   "), ["192.168.1.1"]);
  } finally {
    if (prevEnv === undefined) delete process.env.SELECTOR_CONTROL_ALLOWLIST;
    else process.env.SELECTOR_CONTROL_ALLOWLIST = prevEnv;
  }
});

test("async resolver reads the DB setting first, env as fallback", async () => {
  const { resolveSelectorAllowlist } = mod;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selector-allowlist-"));
  const prevDataDir = process.env.DATA_DIR;
  const prevEnv = process.env.SELECTOR_CONTROL_ALLOWLIST;
  process.env.DATA_DIR = dir;
  const core = await import("../../src/lib/db/core.ts");
  try {
    core.resetDbInstance();
    process.env.SELECTOR_CONTROL_ALLOWLIST = "192.168.1.1";
    // No DB row → env.
    assert.deepEqual(await resolveSelectorAllowlist(), ["192.168.1.1"]);
    // DB row → DB wins over env.
    core
      .getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("feature_flags", "SELECTOR_CONTROL_ALLOWLIST", "10.0.0.1");
    assert.deepEqual(await resolveSelectorAllowlist(), ["10.0.0.1"]);
    // Blank DB row → env fallback.
    core
      .getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("feature_flags", "SELECTOR_CONTROL_ALLOWLIST", "   ");
    assert.deepEqual(await resolveSelectorAllowlist(), ["192.168.1.1"]);
  } finally {
    if (prevEnv === undefined) delete process.env.SELECTOR_CONTROL_ALLOWLIST;
    else process.env.SELECTOR_CONTROL_ALLOWLIST = prevEnv;
    core.resetDbInstance();
    fs.rmSync(dir, { recursive: true, force: true });
    if (prevDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = prevDataDir;
  }
});
