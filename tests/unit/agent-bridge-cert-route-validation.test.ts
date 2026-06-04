import test from "node:test";
import assert from "node:assert/strict";

// POST /api/tools/agent-bridge/cert previously read request.json() and accessed
// raw.sudoPassword without any schema validation (failing the t06 route
// validation gate). It now validates the body with CertTrustBodySchema via
// safeParse. These tests pin that schema's contract so the route keeps both its
// validation gate compliance and its lenient fallback behavior.

const { CertTrustBodySchema } = await import(
  "../../src/app/api/tools/agent-bridge/cert/route.ts"
);

test("accepts a body with a string sudoPassword", () => {
  const parsed = CertTrustBodySchema.safeParse({ sudoPassword: "hunter2" });
  assert.equal(parsed.success, true);
  assert.equal(parsed.success && parsed.data.sudoPassword, "hunter2");
});

test("accepts an empty body (sudoPassword is optional, falls back to cached)", () => {
  const parsed = CertTrustBodySchema.safeParse({});
  assert.equal(parsed.success, true);
  assert.equal(parsed.success && parsed.data.sudoPassword, undefined);
});

test("rejects a non-string sudoPassword instead of trusting raw input", () => {
  const parsed = CertTrustBodySchema.safeParse({ sudoPassword: 12345 });
  assert.equal(parsed.success, false);
});

test("ignores unrelated extra keys without throwing", () => {
  const parsed = CertTrustBodySchema.safeParse({ sudoPassword: "x", extra: true });
  assert.equal(parsed.success, true);
  assert.equal(parsed.success && parsed.data.sudoPassword, "x");
  // Zod strips unknown keys by default
  assert.equal(parsed.success && "extra" in parsed.data, false);
});
