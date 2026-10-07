/**
 * Model lockout scope by status: a 5xx (transport failure, upstream server error,
 * or OmniRoute's own synthesized 502 from quality validation) locks the exact
 * provider/connection/model tuple, never the quota family — a single bad stream
 * on one codex model must not remove every `gpt-5*` model of the connection from
 * routing. Quota / entitlement statuses (429/403/402) keep the family scope.
 *
 * Harness mirrors tests/unit/model-lockout-max-cooldown.test.ts (temp DATA_DIR,
 * real handleComboChat with a mocked handleSingleModel).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ComboLogger } from "../../open-sse/services/combo/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-lockout-5xx-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-lockout-5xx-scope-secret"; // pragma: allowlist secret

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const {
  recordModelLockoutFailure,
  isModelLocked,
  getModelLockoutInfo,
  getAllModelLockouts,
  clearModelLock,
  decayModelFailureCount,
  clearAllModelLockouts,
} = await import("../../open-sse/services/accountFallback.ts");
const { resolveLockoutScope, parseModelLockKey } =
  await import("../../open-sse/services/accountFallback/exactModelLock.ts");

const CONN = "conn-codex-1";
const LUNA = "gpt-5.6-luna";
const SOL = "gpt-5.6-sol";
const TERRA = "gpt-5.6-terra";

test.beforeEach(() => clearAllModelLockouts());
test.after(() => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("resolveLockoutScope: quota statuses → family, everything else → exact, explicit wins", () => {
  for (const status of [429, 403, 402, 404]) {
    assert.equal(resolveLockoutScope(status), "quota_family", `status ${status}`);
  }
  for (const status of [500, 502, 503, 504, 520, 400]) {
    assert.equal(resolveLockoutScope(status), "exact", `status ${status}`);
  }
  assert.equal(resolveLockoutScope(502, "quota_family"), "quota_family");
  assert.equal(resolveLockoutScope(429, "exact"), "exact");
});

test("codex 502 on one model locks only that model — sibling gpt-5* models stay routable", () => {
  const lock = recordModelLockoutFailure(
    "codex",
    CONN,
    LUNA,
    "quality_failure",
    502,
    120_000,
    null,
    { maxCooldownMs: 1_800_000 }
  );
  assert.ok(lock.cooldownMs > 0);
  assert.equal(isModelLocked("codex", CONN, LUNA), true, "the failing model is locked");
  assert.equal(isModelLocked("codex", CONN, SOL), false, "sibling scope member stays routable");
  assert.equal(isModelLocked("codex", CONN, TERRA), false);
  assert.equal(isModelLocked("cx", CONN, SOL), false, "alias spelling agrees");
});

test("codex 429 on one model still locks the whole quota scope (unchanged)", () => {
  recordModelLockoutFailure("codex", CONN, LUNA, "rate_limit", 429, 120_000, null, {
    maxCooldownMs: 1_800_000,
  });
  assert.equal(isModelLocked("codex", CONN, LUNA), true);
  assert.equal(isModelLocked("codex", CONN, SOL), true, "429 is a scope-wide quota signal");
  assert.equal(isModelLocked("codex", CONN, TERRA), true);
});

test("explicit scope option overrides the status default", () => {
  recordModelLockoutFailure("codex", CONN, LUNA, "unknown", 502, 120_000, null, {
    maxCooldownMs: 1_800_000,
    scope: "quota_family",
  });
  assert.equal(isModelLocked("codex", CONN, SOL), true, "caller asked for the family");
});

test("exact 5xx lock keeps escalating per failure and decays on success", () => {
  const originalNow = Date.now;
  try {
    let fakeNow = Date.now();
    Date.now = () => fakeNow;
    const first = recordModelLockoutFailure("codex", CONN, LUNA, "unknown", 502, 1000, null, {
      maxCooldownMs: 60_000,
    });
    fakeNow += 1100;
    const second = recordModelLockoutFailure("codex", CONN, LUNA, "unknown", 502, 1000, null, {
      maxCooldownMs: 60_000,
    });
    assert.equal(first.failureCount, 1);
    assert.equal(second.failureCount, 2);
    assert.equal(second.cooldownMs, 2000, "exponential backoff applies to the exact key too");
    assert.equal(getModelLockoutInfo("codex", CONN, LUNA)?.failureCount, 2);

    const decayed = decayModelFailureCount("codex", CONN, LUNA);
    assert.deepEqual(decayed, { cleared: false, newFailureCount: 1 });
    const cleared = decayModelFailureCount("codex", CONN, LUNA);
    assert.deepEqual(cleared, { cleared: true, newFailureCount: 0 });
    assert.deepEqual(decayModelFailureCount("codex", CONN, LUNA), {
      cleared: false,
      newFailureCount: 0,
    });
  } finally {
    Date.now = originalNow;
  }
});

test("dashboard listing shows the bare model for an exact lock and can clear it by that name", () => {
  recordModelLockoutFailure("codex", CONN, LUNA, "unknown", 503, 120_000, null, {
    maxCooldownMs: 1_800_000,
  });
  const listed = getAllModelLockouts().filter((l) => l.connectionId === CONN);
  assert.equal(listed.length, 1);
  assert.equal(listed[0].provider, "codex");
  assert.equal(listed[0].model, LUNA, "no `exact:` marker leaks into the listing");
  assert.equal(clearModelLock("codex", CONN, listed[0].model), true);
  assert.equal(isModelLocked("codex", CONN, LUNA), false);
  assert.deepEqual(parseModelLockKey("codex:c1:exact:gpt-5.6-luna"), {
    provider: "codex",
    connectionId: "c1",
    model: "gpt-5.6-luna",
    scope: "exact",
  });
  assert.deepEqual(parseModelLockKey("codex:c1:codex"), {
    provider: "codex",
    connectionId: "c1",
    model: "codex",
    scope: "quota_family",
  });
});

test("handleComboChat: a 502 on one codex model leaves a sibling combo on the same scope dispatchable", async () => {
  const settings = {
    modelLockout: {
      enabled: true,
      errorCodes: [502],
      baseCooldownMs: 120_000,
      maxCooldownMs: 1_800_000,
      maxBackoffSteps: 10,
      useExponentialBackoff: true,
    },
  };
  const log = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
  const run = (model: string, status: number) =>
    handleComboChat({
      body: {},
      combo: {
        name: `scope-${model}`,
        strategy: "priority",
        models: [`codex/${model}`],
        config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
      },
      handleSingleModel: async () =>
        new Response(JSON.stringify(status === 200 ? { ok: true } : { error: { message: "x" } }), {
          status,
          headers: { "content-type": "application/json" },
        }),
      isModelAvailable: async () => true,
      log: log as unknown as ComboLogger,
      settings,
      allCombos: null,
    });

  const failed = await run(LUNA, 502);
  assert.notEqual(failed.status, 200);
  assert.equal(isModelLocked("codex", "", LUNA), true, "the failing model is locked");
  assert.equal(isModelLocked("codex", "", SOL), false, "sibling is not");

  const ok = await run(SOL, 200);
  assert.equal(ok.status, 200, "the sibling model still dispatches");
});
