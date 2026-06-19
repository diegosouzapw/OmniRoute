/**
 * Tests for the quota-management A2A skill.
 *
 * Verifies the spec'd contract (check / consume / reset) against the
 * `tenant_quotas` ledger (migration 100):
 *   1. check happy path on a fresh tenant (unknown_tenant warning)
 *   2. check after a reset (allowed, used=0, limit=N)
 *   3. consume happy path (accepted, used/remaining updated)
 *   4. consume over limit (rejected.over_limit, suggestedWaitSec)
 *   5. consume on unknown tenant (rejected.unknown_tenant)
 *   6. reset on existing tenant (previous captured, used=0, resetAt bumped)
 *   7. reset on a fresh tenant (UPSERT creates the row)
 *   8. multiple resources are isolated (tokens vs cost_usd)
 *   9. monthly reset boundary (explicit resetAt override)
 *  10. concurrent-consume safety (single transaction; only the amount that
 *      fits under the cap is applied)
 *  11. input validation (missing tenantId, invalid action, invalid
 *      resource, missing amount for consume)
 */

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

// Mock @/lib/db/core BEFORE importing the skill. core.ts has a transitive
// import of `healthCheck.ts` which references a stale `@/lib/combos/steps`
// module that no longer exists in the tree (#6A.1 drift). The fix is
// tracked separately; for the purposes of this skill we only need a
// working in-memory SQLite handle. The mock provides a tiny schema
// containing just the `tenant_quotas` table (migration 100).
vi.mock("@/lib/db/core", async () => {
  const Database = (await import("better-sqlite3")).default;
  const SCHEMA = `
    CREATE TABLE IF NOT EXISTS tenant_quotas (
      tenant_id TEXT NOT NULL,
      resource TEXT NOT NULL,
      used REAL NOT NULL DEFAULT 0,
      "limit" REAL NOT NULL DEFAULT 0,
      reset_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (tenant_id, resource)
    );
    CREATE INDEX IF NOT EXISTS idx_tq_tenant ON tenant_quotas(tenant_id);
    CREATE INDEX IF NOT EXISTS idx_tq_reset ON tenant_quotas(reset_at);
  `;
  const db = new Database(":memory:");
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.exec(SCHEMA);
  return {
    getDbInstance: () => db,
    closeDbInstance: () => {
      try {
        db.close();
      } catch {
        /* ignore */
      }
    },
  };
});

import type { A2ATask } from "@/lib/a2a/taskManager";
import { executeQuotaManagement } from "@/lib/a2a/skills/quotaManagement";
import { getDbInstance, closeDbInstance } from "@/lib/db/core";

function makeTask(
  metadata: Record<string, unknown> | undefined,
  messages: A2ATask["messages"] = [],
): A2ATask {
  return {
    id: `task-${Math.random().toString(36).slice(2, 10)}`,
    skill: "quota-management",
    messages,
    metadata,
    state: "working",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function parseArtifact(result: Awaited<ReturnType<typeof executeQuotaManagement>>) {
  expect(result.artifacts).toHaveLength(1);
  expect(result.artifacts[0].type).toBe("text");
  return JSON.parse(result.artifacts[0].content);
}

/** Counter so concurrent test cases don't collide on a single tenant id. */
let testSeq = 0;
function uniqueTenant(prefix: string): string {
  testSeq += 1;
  return `${prefix}-${Date.now()}-${testSeq}`;
}

// Ensure the schema is initialised exactly once for this file. The DB
// singleton is process-scoped, so `getDbInstance()` will materialise the
// :memory: SQLite database, run every migration (including 100), and
// re-use the same connection across tests.
beforeAll(() => {
  getDbInstance();
});

afterAll(() => {
  closeDbInstance();
});

beforeEach(() => {
  // Truncate the table between tests so each case has a clean slate.
  getDbInstance().exec("DELETE FROM tenant_quotas");
});

describe("quotaManagement A2A skill", () => {
  // 1. check happy path on a fresh tenant.
  it("check on an unknown tenant returns the unknown_tenant warning", async () => {
    const result = await executeQuotaManagement(
      makeTask({
        tenantId: uniqueTenant("ck"),
        action: "check",
        resource: "tokens",
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.allowed).toBe(false);
    expect(payload.used).toBe(0);
    expect(payload.limit).toBe(0);
    expect(payload.remaining).toBe(0);
    expect(payload.warnings).toContain("unknown_tenant");
    expect(typeof payload.resetAt).toBe("string");
    expect(result.metadata?.success).toBe(true);
  });

  // 2. check after a reset (allowed, used=0, limit=N).
  it("check after a reset reflects the limit and zero usage", async () => {
    const tenantId = uniqueTenant("ck2");
    const reset = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "reset",
          resource: "requests",
          limit: 500,
        }),
      ),
    );
    expect(reset.reset.used).toBe(0);
    expect(reset.reset.limit).toBe(500);

    const check = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "check",
          resource: "requests",
        }),
      ),
    );
    expect(check.allowed).toBe(true);
    expect(check.used).toBe(0);
    expect(check.limit).toBe(500);
    expect(check.remaining).toBe(500);
    expect(check.warnings).toEqual([]);
  });

  // 3. consume happy path.
  it("consume below the cap is accepted and updates used/remaining", async () => {
    const tenantId = uniqueTenant("c1");
    await executeQuotaManagement(
      makeTask({ tenantId, action: "reset", resource: "tokens", limit: 10_000 }),
    );
    const payload = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "consume",
          resource: "tokens",
          amount: 2_500,
        }),
      ),
    );

    expect(payload.accepted).toBe(true);
    expect(payload.used).toBe(2_500);
    expect(payload.limit).toBe(10_000);
    expect(payload.remaining).toBe(7_500);
    expect(payload.rejected).toBeUndefined();
  });

  // 4. consume over limit.
  it("consume above the cap is rejected with over_limit and a suggested wait", async () => {
    const tenantId = uniqueTenant("c2");
    await executeQuotaManagement(
      makeTask({ tenantId, action: "reset", resource: "cost_usd", limit: 1.0 }),
    );
    const payload = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "consume",
          resource: "cost_usd",
          amount: 1.5,
        }),
      ),
    );

    expect(payload.accepted).toBe(false);
    expect(payload.rejected?.reason).toBe("over_limit");
    expect(payload.used).toBe(0);
    expect(payload.limit).toBe(1.0);
    expect(payload.remaining).toBe(1.0);
    // resetAt defaults to now + 30 days ⇒ suggestedWaitSec is positive
    // and at most 31 days.
    expect(typeof payload.rejected?.suggestedWaitSec).toBe("number");
    expect(payload.rejected?.suggestedWaitSec).toBeGreaterThan(0);
    expect(payload.rejected?.suggestedWaitSec).toBeLessThanOrEqual(31 * 24 * 60 * 60);
  });

  // 5. consume on an unknown tenant.
  it("consume on an unknown tenant is rejected with unknown_tenant", async () => {
    const tenantId = uniqueTenant("c3");
    const payload = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "consume",
          resource: "tokens",
          amount: 1,
        }),
      ),
    );

    expect(payload.accepted).toBe(false);
    expect(payload.rejected?.reason).toBe("unknown_tenant");
    expect(payload.used).toBe(0);
    expect(payload.limit).toBe(0);
  });

  // 6. reset on an existing tenant captures previous state.
  it("reset on an existing tenant captures the previous state and zeros used", async () => {
    const tenantId = uniqueTenant("r1");
    await executeQuotaManagement(
      makeTask({ tenantId, action: "reset", resource: "requests", limit: 100 }),
    );
    await executeQuotaManagement(
      makeTask({ tenantId, action: "consume", resource: "requests", amount: 60 }),
    );

    const reset = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "reset",
          resource: "requests",
          // omit resetAt → defaults to now + 30d
        }),
      ),
    );
    expect(reset.previous.used).toBe(60);
    expect(reset.previous.limit).toBe(100);
    expect(reset.reset.used).toBe(0);
    expect(reset.reset.limit).toBe(100);
    // ISO8601 + ~30 days from now.
    const resetAtMs = Date.parse(reset.reset.resetAt);
    expect(Number.isFinite(resetAtMs)).toBe(true);
    const deltaSec = (resetAtMs - Date.now()) / 1000;
    expect(deltaSec).toBeGreaterThan(29 * 24 * 3600);
    expect(deltaSec).toBeLessThan(31 * 24 * 3600);

    // And the follow-up check sees used=0, allowed=true.
    const check = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "check", resource: "requests" }),
      ),
    );
    expect(check.used).toBe(0);
    expect(check.allowed).toBe(true);
  });

  // 7. reset on a fresh tenant UPSERTs the row.
  it("reset on a fresh tenant creates the row via UPSERT", async () => {
    const tenantId = uniqueTenant("r2");
    const reset = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "reset",
          resource: "tokens",
          limit: 42_000,
        }),
      ),
    );

    expect(reset.previous.used).toBe(0);
    expect(reset.previous.limit).toBe(0);
    expect(reset.reset.used).toBe(0);
    expect(reset.reset.limit).toBe(42_000);

    // And the new row is consumable.
    const consume = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "consume",
          resource: "tokens",
          amount: 100,
        }),
      ),
    );
    expect(consume.accepted).toBe(true);
    expect(consume.used).toBe(100);
    expect(consume.limit).toBe(42_000);
  });

  // 8. multiple resources are isolated.
  it("tokens and cost_usd quotas are tracked independently", async () => {
    const tenantId = uniqueTenant("multi");
    await executeQuotaManagement(
      makeTask({ tenantId, action: "reset", resource: "tokens", limit: 1_000_000 }),
    );
    await executeQuotaManagement(
      makeTask({ tenantId, action: "reset", resource: "cost_usd", limit: 10 }),
    );

    const tk = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "consume", resource: "tokens", amount: 500_000 }),
      ),
    );
    const cu = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "consume", resource: "cost_usd", amount: 3.25 }),
      ),
    );

    expect(tk.accepted).toBe(true);
    expect(tk.used).toBe(500_000);
    expect(tk.limit).toBe(1_000_000);
    expect(cu.accepted).toBe(true);
    expect(cu.used).toBe(3.25);
    expect(cu.limit).toBe(10);

    // Saturate tokens, but cost_usd should still be allowed.
    const tkBlock = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "consume", resource: "tokens", amount: 600_000 }),
      ),
    );
    expect(tkBlock.accepted).toBe(false);
    expect(tkBlock.rejected?.reason).toBe("over_limit");

    const cuOk = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "consume", resource: "cost_usd", amount: 0.5 }),
      ),
    );
    expect(cuOk.accepted).toBe(true);
    expect(cuOk.used).toBe(3.75);
  });

  // 9. monthly reset boundary — explicit resetAt override.
  it("reset honours an explicit resetAt ISO8601 override", async () => {
    const tenantId = uniqueTenant("r3");
    const explicitResetAt = "2026-07-01T00:00:00.000Z";
    const reset = parseArtifact(
      await executeQuotaManagement(
        makeTask({
          tenantId,
          action: "reset",
          resource: "tokens",
          limit: 10_000,
          resetAt: explicitResetAt,
        }),
      ),
    );

    expect(reset.reset.resetAt).toBe(explicitResetAt);

    const check = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "check", resource: "tokens" }),
      ),
    );
    expect(check.resetAt).toBe(explicitResetAt);
  });

  // 10. concurrent-consume safety — sequential atomic UPDATEs. Each call
  //     runs a single SQL UPDATE with `used + ? <= limit` in the WHERE
  //     clause (the "single transaction check" the spec calls out). The
  //     four invocations must collectively never overshoot the cap: 4×10
  //     against limit=30 means three succeed and the fourth is rejected.
  it("atomic UPDATE with WHERE cap never lets sequential consumes overshoot the limit", async () => {
    const tenantId = uniqueTenant("conc");
    await executeQuotaManagement(
      makeTask({ tenantId, action: "reset", resource: "tokens", limit: 30 }),
    );

    const consume = async (amount: number) =>
      parseArtifact(
        await executeQuotaManagement(
          makeTask({
            tenantId,
            action: "consume",
            resource: "tokens",
            amount,
          }),
        ),
      );

    // 10 + 10 + 10 + 10 = 40, but cap is 30 ⇒ only 3 succeed.
    const outcomes = [] as Array<{ amount: number; accepted: boolean; used: number }>;
    for (const amt of [10, 10, 10, 10]) {
      const p = await consume(amt);
      outcomes.push({ amount: amt, accepted: p.accepted, used: p.used });
    }

    const accepted = outcomes.filter((o) => o.accepted);
    const rejected = outcomes.filter((o) => !o.accepted);
    expect(accepted).toHaveLength(3);
    expect(rejected).toHaveLength(1);
    // Last accepted used == cap (30), the rejected one reports the cap.
    expect(accepted[accepted.length - 1].used).toBe(30);
    expect(rejected[0].accepted).toBe(false);
    expect(rejected[0].used).toBe(30);
    // Rejection reason must be over_limit (the row exists, but the cap
    // would be exceeded).
    const rejectedCheck = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "consume", resource: "tokens", amount: 1 }),
      ),
    );
    expect(rejectedCheck.accepted).toBe(false);
    expect(rejectedCheck.rejected?.reason).toBe("over_limit");

    // Final state: row exists, used = cap, allowed = false, at_cap warning.
    const final = parseArtifact(
      await executeQuotaManagement(
        makeTask({ tenantId, action: "check", resource: "tokens" }),
      ),
    );
    expect(final.used).toBe(30);
    expect(final.limit).toBe(30);
    expect(final.allowed).toBe(false);
    expect(final.warnings).toContain("at_cap");
  });

  // 11. input validation.
  it("rejects missing tenantId with a structured missing_metadata error", async () => {
    const result = await executeQuotaManagement(makeTask({ action: "check", resource: "tokens" }));
    const payload = parseArtifact(result);
    expect(payload.error).toBe("missing_metadata");
    expect(payload.message).toMatch(/tenantId/);
    expect(result.metadata?.success).toBe(false);
  });

  it("rejects invalid action with a structured invalid_input error", async () => {
    const result = await executeQuotaManagement(
      makeTask({ tenantId: "t", action: "delete", resource: "tokens" }),
    );
    const payload = parseArtifact(result);
    expect(payload.error).toBe("invalid_input");
    expect(payload.message).toMatch(/action/);
  });

  it("rejects invalid resource with a structured invalid_input error", async () => {
    const result = await executeQuotaManagement(
      makeTask({ tenantId: "t", action: "check", resource: "latency" }),
    );
    const payload = parseArtifact(result);
    expect(payload.error).toBe("invalid_input");
    expect(payload.message).toMatch(/resource/);
  });

  it("rejects consume without a numeric amount with invalid_input", async () => {
    const result = await executeQuotaManagement(
      makeTask({ tenantId: "t", action: "consume", resource: "tokens" }),
    );
    const payload = parseArtifact(result);
    expect(payload.error).toBe("invalid_input");
    expect(payload.message).toMatch(/amount/);
  });
});
