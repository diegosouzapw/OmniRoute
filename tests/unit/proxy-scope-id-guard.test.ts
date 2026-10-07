import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  inlineProxyAssignmentSchema,
  proxyAssignmentSchema,
  proxyPoolMemberSchema,
  proxyPoolEgressObservationQuerySchema,
  proxyRotationStrategySchema,
  requireScopeIdForNonGlobal,
  SCOPE_ID_REQUIRED_NON_GLOBAL_SCOPE,
  SCOPE_ID_REQUIRED_SCOPED,
} from "@/shared/validation/schemas/proxy.js";
import { isScopeIdMissing } from "@/lib/db/proxies/mappers.js";

const SCOPED_MSG = "scopeId is required for provider/account/combo/key scope";
const NON_GLOBAL_MSG = "scopeId is required for non-global scope";

function scopeIdIssues(result: { success: boolean; error?: { issues: Array<{ path: unknown[]; message: string }> } }): Array<{ path: unknown[]; message: string }> {
  if (result.success || !result.error) return [];
  return result.error.issues;
}

describe("scopeId required outside global — zod schemas (5 sites)", () => {
  const cases = [
    { name: "inline", schema: inlineProxyAssignmentSchema, msg: NON_GLOBAL_MSG },
    { name: "assignment", schema: proxyAssignmentSchema, msg: SCOPED_MSG },
    { name: "poolMember", schema: proxyPoolMemberSchema, msg: SCOPED_MSG },
    { name: "egressQuery", schema: proxyPoolEgressObservationQuerySchema, msg: SCOPED_MSG },
    { name: "rotation", schema: proxyRotationStrategySchema, msg: SCOPED_MSG },
  ] as const;
  for (const { name, schema, msg } of cases) {
    it(`${name}: global without scopeId passes`, () => {
      const base: Record<string, unknown> =
        name === "rotation" ? { scope: "global", strategy: "round-robin" } : { scope: "global" };
      if (name === "poolMember") base["proxyId"] = "p1";
      const r = (schema as { safeParse(u: unknown): { success: boolean } }).safeParse(base);
      assert.equal(r.success, true, `${name} global must pass`);
    });
    it(`${name}: non-global without scopeId fails with frozen message`, () => {
      const base: Record<string, unknown> =
        name === "rotation" ? { scope: "provider", strategy: "round-robin" } : { scope: "provider" };
      if (name === "poolMember") base["proxyId"] = "p1";
      const r = schema.safeParse(base) as { success: boolean; error?: { issues: Array<{ path: unknown[]; message: string }> } };
      assert.equal(r.success, false, `${name} provider without scopeId must fail`);
      const issues = scopeIdIssues(r);
      assert.ok(
        issues.some((i) => i.message === msg),
        `${name} message must stay ${JSON.stringify(msg)}, got ${JSON.stringify(issues)}`
      );
    });
    it(`${name}: whitespace scopeId fails`, () => {
      const base: Record<string, unknown> =
        name === "rotation"
          ? { scope: "provider", scopeId: "  ", strategy: "round-robin" }
          : { scope: "provider", scopeId: "   " };
      if (name === "poolMember") base["proxyId"] = "p1";
      const r = schema.safeParse(base) as { success: boolean };
      assert.equal(r.success, false, `${name} whitespace scopeId must fail`);
    });
    it(`${name}: bogus scope is rejected, never read as global`, () => {
      const base: Record<string, unknown> =
        name === "rotation" ? { scope: "bogus", strategy: "round-robin" } : { scope: "bogus" };
      if (name === "poolMember") base["proxyId"] = "p1";
      const r = schema.safeParse(base) as { success: boolean };
      assert.equal(r.success, false, `${name} bogus scope must be rejected`);
    });
  }

  it("factory preserves the exact frozen messages", () => {
    assert.equal(SCOPE_ID_REQUIRED_NON_GLOBAL_SCOPE, NON_GLOBAL_MSG);
    assert.equal(SCOPE_ID_REQUIRED_SCOPED, SCOPED_MSG);
    assert.equal(typeof requireScopeIdForNonGlobal, "function");
  });
});

describe("isScopeIdMissing — raw scope guard (pool GET + DB call-sites)", () => {
  it("global passes with no scopeId", () => {
    assert.equal(isScopeIdMissing("global", null), false);
    assert.equal(isScopeIdMissing("global", undefined), false);
  });
  it("non-global without scopeId is missing", () => {
    assert.equal(isScopeIdMissing("provider", null), true);
    assert.equal(isScopeIdMissing("provider", undefined), true);
    assert.equal(isScopeIdMissing("account", "   "), true);
  });
  it("bogus scope without scopeId is missing (never read as global)", () => {
    assert.equal(isScopeIdMissing("bogus", null), true);
    assert.equal(isScopeIdMissing("bogus", undefined), true);
  });
  it("non-global with scopeId passes", () => {
    assert.equal(isScopeIdMissing("provider", "p1"), false);
  });
});

describe("pool GET guard — ?scope=bogus without scopeId stays 400", () => {
  it("bogus scope with no scopeId hits the same message as provider", async () => {
    const { GET } = await import("@/app/api/settings/proxies/pool/route.js");
    const res = (await GET(
      new Request("http://localhost/api/settings/proxies/pool?scope=bogus")
    )) as Response;
    assert.equal(res.status, 400);
    const body = (await res.json()) as { error?: { message?: string } };
    assert.equal(body.error?.message, SCOPED_MSG);
  });
});

describe("DB throw sites (3) — public functions keep the frozen message", () => {
  const DB_MSG = "scopeId is required for non-global proxy assignments";

  it("assignProxyToScope(provider, whitespace) throws", async () => {
    const { assignProxyToScope } = await import("@/lib/db/proxies.js");
    await assert.rejects(() => assignProxyToScope("provider", "   ", "p1"), { message: DB_MSG });
  });
  it("addProxyToScopePool(provider, null) throws", async () => {
    const { addProxyToScopePool } = await import("@/lib/db/proxies.js");
    await assert.rejects(() => addProxyToScopePool("provider", null, "p1"), { message: DB_MSG });
  });
  it("addProxiesToScopePool(account, null) throws", async () => {
    const { addProxiesToScopePool } = await import("@/lib/db/proxies.js");
    await assert.rejects(() => addProxiesToScopePool("account", null, ["p1"]), { message: DB_MSG });
  });
});
