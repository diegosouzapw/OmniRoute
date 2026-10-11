import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "copilot-rejection-cache-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/app/api/v1/models/catalogCache.ts");
const rejections = await import("../../open-sse/services/copilotModelRejections.ts");
const locks = await import("../../open-sse/services/accountFallback.ts");
const originalHelper = await import("../../src/sse/services/copilotModelNotSupportedLock.ts");
const request = () => new Request("http://localhost/v1/models");
const headers = { corsHeaders: {}, diagnosticHeaders: {} };
const payload = (body: string) => ({ body, status: 200, headers: {}, cacheTTL: 60_000 });
const body = { error: { code: "model_not_supported" } };
const learn = () =>
  rejections.learnCopilotModelRejection(400, "github", "account-A", "claude-sonnet-5", body);

function deferred() {
  let release!: (value: ReturnType<typeof payload>) => void;
  const promise = new Promise<ReturnType<typeof payload>>((resolve) => {
    release = resolve;
  });
  return { promise, release };
}

test.beforeEach(() => {
  locks.clearAllModelLockouts();
  cache.__resetCatalogBuilderRunsForTest();
});
test.after(() => {
  locks.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const change of ["learn", "clear", "expire"] as const) {
  test(`${change} isolates an in-flight catalog and prevents stale cache repopulation`, async (t) => {
    const now = Date.now();
    if (change !== "learn") assert.equal(learn(), true);
    const old = deferred();
    const oldRequest = cache.resolveCachedCatalogResponse(request(), headers, () => old.promise);
    await Promise.resolve();
    if (change === "learn") assert.equal(learn(), true);
    if (change === "clear") locks.clearModelLock("github", "account-A", "claude-sonnet-5");
    if (change === "expire")
      t.mock.method(
        Date,
        "now",
        () => now + rejections.COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS + 1_000
      );
    let freshCalls = 0;
    const freshRequest = cache.resolveCachedCatalogResponse(request(), headers, async () => {
      freshCalls += 1;
      return payload("CURRENT");
    });
    await Promise.resolve();
    const startedFresh = freshCalls;
    old.release(payload("OLD"));
    assert.equal(await (await oldRequest).text(), "OLD");
    assert.equal(await (await freshRequest).text(), "CURRENT");
    assert.equal(startedFresh, 1, "new state must not join the old build");
    const cached = await cache.resolveCachedCatalogResponse(request(), headers, async () => {
      assert.fail("stale completion must not overwrite the current cached payload");
    });
    assert.equal(await cached.text(), "CURRENT");
  });
}

test("a stable rejection snapshot keeps same-generation requests coalesced and cached", async (t) => {
  assert.equal(learn(), true);
  const now = Date.now();
  const pending = deferred();
  let calls = 0;
  const builder = () => {
    calls += 1;
    return pending.promise;
  };
  const first = cache.resolveCachedCatalogResponse(request(), headers, builder);
  t.mock.method(Date, "now", () => now + 1_000);
  const second = cache.resolveCachedCatalogResponse(request(), headers, builder);
  pending.release(payload("SHARED"));
  assert.equal(await (await first).text(), "SHARED");
  assert.equal(await (await second).text(), "SHARED");
  assert.equal(calls, 1);
  assert.equal(
    await (await cache.resolveCachedCatalogResponse(request(), headers, builder)).text(),
    "SHARED"
  );
  assert.equal(calls, 1);
});

test("only structured 400 rejections from Copilot providers are learned", () => {
  for (const provider of ["github", "ghe-copilot"]) {
    assert.equal(
      rejections.learnCopilotModelRejection(400, provider, "A", "claude", JSON.stringify(body)),
      true
    );
    assert.equal(rejections.areCopilotConnectionsRejected(provider, "claude", [{ id: "A" }]), true);
    assert.equal(
      rejections.areCopilotConnectionsRejected(provider, "claude", [{ id: "B" }]),
      false
    );
    assert.equal(rejections.areCopilotConnectionsRejected(provider, "gpt", [{ id: "A" }]), false);
  }
  for (const [status, provider, value] of [
    [429, "github", body],
    [503, "github", body],
    [400, "openai", body],
    [400, "github", { error: { code: "model_not_found" } }],
    [400, "github", { error: { code: "model_capacity" } }],
    [400, "github", { error: { message: "model_not_supported" } }],
    [400, "github", "model_not_supported"],
    [400, "github", null],
  ] as const) {
    assert.equal(
      rejections.learnCopilotModelRejection(status, provider, "control", "claude", value),
      false
    );
    assert.equal(locks.isModelLocked(provider, "control", "claude"), false);
  }
});

test("the merged text-helper API still locks and clears the exact Copilot model", () => {
  assert.equal(originalHelper.COPILOT_MODEL_NOT_SUPPORTED_LOCK_MS, 6 * 60 * 60 * 1_000);
  assert.equal(
    originalHelper.lockCopilotModelNotSupported("github", "A", "claude", "model_not_supported"),
    true
  );
  assert.equal(locks.isModelLocked("github", "A", "claude"), true);
  assert.equal(locks.isModelLocked("github", "A", "other"), false);
  assert.equal(locks.isModelLocked("ghe-copilot", "A", "claude"), false);
  assert.equal(locks.clearModelLock("github", "A", "claude"), true);
  assert.equal(rejections.getCopilotModelRejections().length, 0);
});

test("a later short transient failure preserves the learned deadline and rejection reason", () => {
  assert.equal(learn(), true);
  const before = rejections.getCopilotModelRejections();
  locks.recordModelLockoutFailure(
    "github",
    "account-A",
    "claude-sonnet-5",
    "rate_limit",
    429,
    60_000,
    null,
    { exactCooldownMs: 60_000 }
  );
  assert.deepEqual(
    rejections.getCopilotModelRejections().map(({ remainingMs: _remaining, ...entry }) => entry),
    before.map(({ remainingMs: _remaining, ...entry }) => entry)
  );
  assert.equal(
    rejections.areCopilotConnectionsRejected("github", "claude-sonnet-5", [{ id: "account-A" }]),
    true
  );
});
