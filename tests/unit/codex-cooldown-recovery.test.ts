import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-recovery-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "test-only-secret";
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const recovery = await import("../../src/lib/db/providers/codexAccountRecovery.ts");
const pool = await import("../../open-sse/services/codexAccount/index.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
const until = new Date(Date.now() + 3600000).toISOString();
async function seed() {
  return db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: crypto.randomUUID(),
    providerSpecificData: {
      unrelated: 42,
      codexScopeRateLimitedUntil: { codex: until, spark: until },
      codexExhaustedWindowByScope: { codex: "5h", spark: "7d" },
    },
  });
}
test("fresh recovered usage unlocks Codex, hydrates tiles and preserves Spark and another account", async () => {
  const a = await seed(),
    b = await seed();
  await recovery.syncCodexQuotaObservation(
    a.id,
    { quotas: { session: { used: 0, total: 100 }, weekly: { used: 0, total: 100 } } },
    a.providerSpecificData
  );
  const after = await db.getProviderConnectionById(a.id);
  const projected = pool.projectCodexAccountPool(after);
  assert.equal(projected.children[0].unavailable, false);
  assert.equal(projected.children[0].quota.windows["5h"].usedPercentage, 0);
  assert.equal(projected.children[1].unavailable, true);
  assert.equal(after.providerSpecificData.unrelated, 42);
  assert.equal(
    pool.projectCodexAccountPool(await db.getProviderConnectionById(b.id)).children[0].unavailable,
    true
  );
});
test("partial or exhausted quota never unlocks a scope", async () => {
  for (const quotas of [
    { session: { used: 0, total: 100 } },
    { session: { used: 0, total: 100 }, weekly: { used: 100, total: 100 } },
  ]) {
    const a = await seed();
    await recovery.syncCodexQuotaObservation(a.id, { quotas }, a.providerSpecificData);
    assert.equal(
      pool.projectCodexAccountPool(await db.getProviderConnectionById(a.id)).children[0]
        .unavailable,
      true
    );
  }
});
test("newer cooldown written during fetch survives stale observation", async () => {
  const a = await seed();
  await db.updateCodexScopeCooldown(a.id, "codex", new Date(Date.now() + 7200000).toISOString());
  await recovery.syncCodexQuotaObservation(
    a.id,
    { quotas: { session: { used: 0, total: 100 }, weekly: { used: 0, total: 100 } } },
    a.providerSpecificData
  );
  assert.equal(
    pool.projectCodexAccountPool(await db.getProviderConnectionById(a.id)).children[0].unavailable,
    true
  );
});
test("manual release clears only selected account scope without changing credentials or active state", async () => {
  const a = await seed();
  await recovery.clearCodexAccountCooldown(a.id, "codex");
  const after = await db.getProviderConnectionById(a.id);
  assert.equal(pool.projectCodexAccountPool(after).children[0].unavailable, false);
  assert.equal(pool.projectCodexAccountPool(after).children[1].unavailable, true);
  assert.equal(after.isActive, a.isActive);
});

test("manual API requires management auth and validates account and body", async () => {
  const route = await import("../../src/app/api/providers/codex-cooldown/route.ts");
  const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
  const url = "http://localhost/api/providers/codex-cooldown";
  assert.equal(
    (
      await route.POST(
        new Request(url, { method: "POST", body: JSON.stringify({ connectionId: "missing" }) })
      )
    ).status,
    401
  );
  const a = await seed();
  for (const [body, status] of [
    [{ connectionId: a.id }, 200],
    [{ connectionId: "missing" }, 404],
    [{}, 400],
  ] as const) {
    const request = await makeManagementSessionRequest(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await route.POST(request);
    assert.equal(response.status, status);
    assert.equal((await response.text()).includes("at /"), false);
  }
});
