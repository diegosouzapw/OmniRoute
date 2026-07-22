/**
 * POST /api/tools/agent-bridge/repair validates its body with RepairBodySchema
 * via safeParse (route validation gate t06) and rejects privileged repair when
 * no sudo password is supplied or cached (#7836). These tests pin that schema
 * contract. (Gap 7.)
 */
import test from "node:test";
import assert from "node:assert/strict";

const { RepairBodySchema } = await import(
  "../../src/app/api/tools/agent-bridge/repair/route.ts"
);

test("accepts a body with a string sudoPassword", () => {
  const parsed = RepairBodySchema.safeParse({ sudoPassword: "hunter2" });
  assert.equal(parsed.success, true);
  assert.equal(parsed.success && parsed.data.sudoPassword, "hunter2");
});

test("accepts an empty body (sudoPassword optional, falls back to cached)", () => {
  const parsed = RepairBodySchema.safeParse({});
  assert.equal(parsed.success, true);
  assert.equal(parsed.success && parsed.data.sudoPassword, undefined);
});

test("rejects a non-string sudoPassword instead of trusting raw input", () => {
  const parsed = RepairBodySchema.safeParse({ sudoPassword: 12345 });
  assert.equal(parsed.success, false);
});
