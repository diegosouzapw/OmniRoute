import { test } from "node:test";
import assert from "node:assert/strict";

import {
  PoolCreateSchema,
  PoolUpdateSchema,
  PlanUpsertSchema,
  QuotaStoreSettingsSchema,
  QuotaPreviewQuerySchema,
  AuditLogQuerySchema,
} from "../../src/shared/schemas/quota";

test("PoolCreateSchema accepts valid input", () => {
  assert.ok(
    PoolCreateSchema.safeParse({ connectionId: "c", name: "Team Pool", allocations: [] }).success
  );
});

test("PoolCreateSchema defaults allocations to []", () => {
  const r = PoolCreateSchema.safeParse({ connectionId: "c", name: "Pool" });
  assert.ok(r.success);
  assert.deepEqual(r.data?.allocations, []);
  assert.equal(r.data?.connectionId, "c");
});

test("PoolCreateSchema rejects empty name", () => {
  assert.equal(PoolCreateSchema.safeParse({ connectionId: "c", name: "" }).success, false);
});

test("PoolCreateSchema rejects empty connectionId", () => {
  assert.equal(PoolCreateSchema.safeParse({ connectionId: "", name: "x" }).success, false);
});

test("PoolCreateSchema rejects name > 120 chars", () => {
  assert.equal(
    PoolCreateSchema.safeParse({ connectionId: "c", name: "x".repeat(121) }).success,
    false
  );
});

test("PoolUpdateSchema accepts partial (only name)", () => {
  const r = PoolUpdateSchema.safeParse({ name: "New" });
  assert.ok(r.success);
  assert.equal(r.data?.name, "New");
});

test("PoolUpdateSchema accepts empty object (no-op)", () => {
  assert.ok(PoolUpdateSchema.safeParse({}).success);
});

test("PoolUpdateSchema rejects empty name when provided", () => {
  assert.equal(PoolUpdateSchema.safeParse({ name: "" }).success, false);
});

test("PlanUpsertSchema accepts valid dimensions array", () => {
  assert.ok(
    PlanUpsertSchema.safeParse({ dimensions: [{ unit: "percent", window: "5h", limit: 100 }] })
      .success
  );
});

test("PlanUpsertSchema rejects empty dimensions array", () => {
  assert.equal(PlanUpsertSchema.safeParse({ dimensions: [] }).success, false);
});

test("PlanUpsertSchema accepts multiple dimensions", () => {
  const r = PlanUpsertSchema.safeParse({
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: 100 },
    ],
  });
  assert.ok(r.success);
  assert.equal(r.data?.dimensions.length, 2);
});

test("QuotaStoreSettingsSchema accepts sqlite driver", () => {
  assert.ok(QuotaStoreSettingsSchema.safeParse({ driver: "sqlite" }).success);
});

test("QuotaStoreSettingsSchema accepts redis driver with valid URL", () => {
  assert.ok(
    QuotaStoreSettingsSchema.safeParse({
      driver: "redis",
      redisUrl: "redis://localhost:6379",
    }).success
  );
});

test("QuotaStoreSettingsSchema rejects malformed redisUrl", () => {
  assert.equal(
    QuotaStoreSettingsSchema.safeParse({ driver: "redis", redisUrl: "not-a-url" }).success,
    false
  );
});

test("QuotaStoreSettingsSchema accepts null redisUrl", () => {
  assert.ok(QuotaStoreSettingsSchema.safeParse({ driver: "sqlite", redisUrl: null }).success);
});

test("QuotaStoreSettingsSchema rejects unknown driver", () => {
  assert.equal(QuotaStoreSettingsSchema.safeParse({ driver: "mysql" }).success, false);
});

test("QuotaPreviewQuerySchema coerces string estimatedTokens to number", () => {
  const r = QuotaPreviewQuerySchema.safeParse({
    apiKeyId: "k",
    poolId: "p",
    estimatedTokens: "1500",
  });
  assert.ok(r.success);
  assert.equal(r.data?.estimatedTokens, 1500);
});

test("QuotaPreviewQuerySchema rejects negative estimatedTokens", () => {
  assert.equal(
    QuotaPreviewQuerySchema.safeParse({
      apiKeyId: "k",
      poolId: "p",
      estimatedTokens: "-1",
    }).success,
    false
  );
});

test("QuotaPreviewQuerySchema rejects empty apiKeyId", () => {
  assert.equal(QuotaPreviewQuerySchema.safeParse({ apiKeyId: "", poolId: "p" }).success, false);
});

test("QuotaPreviewQuerySchema rejects empty poolId", () => {
  assert.equal(QuotaPreviewQuerySchema.safeParse({ apiKeyId: "k", poolId: "" }).success, false);
});

test("AuditLogQuerySchema defaults level to 'all'", () => {
  const r = AuditLogQuerySchema.safeParse({});
  assert.ok(r.success);
  assert.equal(r.data?.level, "all");
});

test("AuditLogQuerySchema accepts level=high", () => {
  const r = AuditLogQuerySchema.safeParse({ level: "high" });
  assert.ok(r.success);
  assert.equal(r.data?.level, "high");
});

test("AuditLogQuerySchema rejects unknown level", () => {
  assert.equal(AuditLogQuerySchema.safeParse({ level: "medium" }).success, false);
});

test("AuditLogQuerySchema defaults limit to 50", () => {
  const r = AuditLogQuerySchema.safeParse({});
  assert.ok(r.success);
  assert.equal(r.data?.limit, 50);
});

test("AuditLogQuerySchema coerces string limit to number", () => {
  const r = AuditLogQuerySchema.safeParse({ limit: "100" });
  assert.ok(r.success);
  assert.equal(r.data?.limit, 100);
});

test("AuditLogQuerySchema rejects limit=0", () => {
  assert.equal(AuditLogQuerySchema.safeParse({ limit: "0" }).success, false);
});

test("AuditLogQuerySchema rejects limit > 500", () => {
  assert.equal(AuditLogQuerySchema.safeParse({ limit: "501" }).success, false);
});
