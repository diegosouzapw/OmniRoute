import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-3332-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { FEATURE_FLAG_DEFINITIONS } = await import(
  "../../src/shared/constants/featureFlagDefinitions.ts"
);
const { isFeatureFlagEnabled } = await import("../../src/shared/utils/featureFlags.ts");
const { selectWorkingProxyFallback } = await import("../../open-sse/utils/proxyFallback.ts");

// #3332: a single proxy in the registry was silently applied to ALL connections
// via the auto-selection fallback. The fix makes auto-selection opt-in behind
// PROXY_AUTO_SELECT_ENABLED, default OFF — so no registry proxy becomes a global
// default unless the operator explicitly turns it on.

test("PROXY_AUTO_SELECT_ENABLED exists and defaults to off (opt-in) (#3332)", () => {
  const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "PROXY_AUTO_SELECT_ENABLED");
  assert.ok(def, "PROXY_AUTO_SELECT_ENABLED flag must be defined");
  assert.equal(def.defaultValue, "false", "auto-selection must be opt-in (default off)");
  delete process.env.PROXY_AUTO_SELECT_ENABLED;
  assert.equal(isFeatureFlagEnabled("PROXY_AUTO_SELECT_ENABLED"), false);
});

test("selectWorkingProxyFallback short-circuits to null when the flag is off, even with a candidate", async () => {
  delete process.env.PROXY_AUTO_SELECT_ENABLED;
  const prevAllProxy = process.env.ALL_PROXY;
  // A candidate exists (env proxy) — yet auto-selection must NOT run while off.
  process.env.ALL_PROXY = "http://127.0.0.1:1";
  try {
    const result = await selectWorkingProxyFallback("conn-1");
    assert.equal(result, null, "no auto-selected proxy while the flag is off");
  } finally {
    if (prevAllProxy === undefined) delete process.env.ALL_PROXY;
    else process.env.ALL_PROXY = prevAllProxy;
  }
});

test.after(() => {
  try {
    core.resetDbInstance?.();
  } catch {
    /* ignore */
  }
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});
