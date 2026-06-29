/**
 * TDD regression for #5239: an upstream HTTP 402 "Insufficient account balance"
 * must disable the depleted key on an API Key Round-Robin connection.
 *
 * Bug: `recordKeyHealthStatus()` only recorded a per-key failure for status 401.
 * Every other status (including 402) was ignored, so when multiple keys live on
 * ONE connection via `providerSpecificData.extraApiKeys`, a 402 on the selected
 * key never marked it invalid — the rotator kept returning the depleted key.
 *
 * Fix: a 402 branch marks the current key invalid immediately (terminal — the
 * balance won't recover mid-session), so `getValidApiKey()` skips it and the
 * rotator falls through to the remaining key. This test fails before the fix
 * (the 402'd key stays "active" and is still returned) and passes after.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-5239-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { recordKeyHealthStatus } = await import(
  "../../open-sse/handlers/chatCore/keyHealth.ts"
);
const { getValidApiKey, getAllKeyHealth, resetKeyStatus } = await import(
  "../../open-sse/services/apiKeyRotator.ts"
);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Two keys live on ONE connection as API Key Round-Robin (extraApiKeys[]).
// No primary key, so the rotator only chooses among the two extras — making the
// "skips invalid, returns the other" assertion deterministic.
const K1 = "sk-depleted-402";
const K2 = "sk-healthy-key";

function buildCreds(connId: string, selectedKeyId: string) {
  return {
    connectionId: connId,
    apiKey: selectedKeyId === "extra_0" ? K1 : K2,
    providerSpecificData: {
      extraApiKeys: [K1, K2],
      selectedKeyId,
      apiKeyHealth: {},
    },
  } as Record<string, unknown>;
}

test("#5239 402 marks the selected round-robin key invalid and the rotator skips it", () => {
  const connId = "conn-5239-402";
  // Selected key is extra_0 (K1) — the one upstream rejected with 402.
  recordKeyHealthStatus(402, buildCreds(connId, "extra_0"));

  // The 402'd key is now invalid in the in-memory rotator state.
  const allHealth = getAllKeyHealth();
  assert.equal(
    allHealth[`${connId}:extra_0`]?.status,
    "invalid",
    "402 must mark the selected key invalid in one shot"
  );

  // The rotator must skip the depleted extra_0 (K1) and return extra_1 (K2).
  for (let i = 0; i < 4; i++) {
    const next = getValidApiKey(connId, "", [K1, K2]);
    assert.ok(next, "a valid key should remain");
    assert.notEqual(next!.key, K1, "depleted 402 key must never be returned");
    assert.equal(next!.key, K2, "rotator should fall through to the healthy key");
  }

  resetKeyStatus(connId, "extra_0");
  resetKeyStatus(connId, "extra_1");
});

test("#5239 inverse: a 2xx keeps the key active (no false-positive disable)", () => {
  const connId = "conn-5239-2xx";
  recordKeyHealthStatus(200, buildCreds(connId, "extra_0"));

  const allHealth = getAllKeyHealth();
  const entry = allHealth[`${connId}:extra_0`];
  // active (or absent — never invalidated) on success.
  assert.notEqual(entry?.status, "invalid", "a 2xx must not disable the key");

  // Both keys remain selectable.
  const selected = new Set<string>();
  for (let i = 0; i < 6; i++) {
    const next = getValidApiKey(connId, "", [K1, K2]);
    if (next) selected.add(next.key);
  }
  assert.ok(selected.has(K1), "K1 must remain usable after a 2xx");
  assert.ok(selected.has(K2), "K2 must remain usable");

  resetKeyStatus(connId, "extra_0");
  resetKeyStatus(connId, "extra_1");
});
