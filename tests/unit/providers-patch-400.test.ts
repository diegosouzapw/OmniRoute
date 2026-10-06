import { test } from "node:test";
import assert from "node:assert/strict";
import { updateProviderConnectionSchema } from "@/shared/validation/schemas/provider";

test("PATCH rateLimitOverrides {rpm:\"60\"} coerces to a valid number", () => {
  const r = updateProviderConnectionSchema.safeParse({ rateLimitOverrides: { rpm: "60" } });
  assert.equal(r.success, true);
});

test("unknown key in rateLimitOverrides is rejected (no silent drop)", () => {
  const r = updateProviderConnectionSchema.safeParse({ rateLimitOverrides: { rpm: 10, foo: 1 } });
  assert.equal(r.success, false);
  const flaggedFoo = r.error!.issues.some(
    (i) => i.path.includes("foo") || (i as { keys?: string[] }).keys?.includes("foo") || i.message.includes("foo")
  );
  assert.ok(
    flaggedFoo,
    `expected an issue flagging "foo", got: ${JSON.stringify(r.error!.issues)}`
  );
});

test("quotaWindowThresholds key longer than 64 chars is rejected", () => {
  const r = updateProviderConnectionSchema.safeParse({
    quotaWindowThresholds: { ["a".repeat(65)]: 50 },
  });
  assert.equal(r.success, false);
});

test("empty string rate limit value is rejected (coerce \"\"→0 trap)", () => {
  const r = updateProviderConnectionSchema.safeParse({ rateLimitOverrides: { rpm: "" } });
  assert.equal(r.success, false);
});

test("non-numeric rate limit value is rejected", () => {
  const r = updateProviderConnectionSchema.safeParse({ rateLimitOverrides: { rpm: "60abc" } });
  assert.equal(r.success, false);
});

test("quotaWindowThresholds value outside 0-100 is rejected", () => {
  const r = updateProviderConnectionSchema.safeParse({ quotaWindowThresholds: { win: 101 } });
  assert.equal(r.success, false);
});
