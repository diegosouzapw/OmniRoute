import { test } from "node:test";
import assert from "node:assert/strict";

import { updateProviderConnectionSchema } from "../../src/shared/validation/schemas";

function parse(overrides: unknown) {
  return updateProviderConnectionSchema.safeParse({
    name: "test-provider",
    rateLimitOverrides: overrides,
  });
}

test("rateLimitOverrides: valid object with all fields", () => {
  const r = parse({ rpm: 100, tpm: 50000, tpd: 1000000, minTime: 100, maxConcurrent: 5 });
  assert.ok(r.success, String(r.error));
  assert.deepEqual(r.data.rateLimitOverrides, { rpm: 100, tpm: 50000, tpd: 1000000, minTime: 100, maxConcurrent: 5 });
});

test("rateLimitOverrides: partial fields", () => {
  const r = parse({ rpm: 60 });
  assert.ok(r.success, String(r.error));
  assert.deepEqual(r.data.rateLimitOverrides, { rpm: 60 });
});

test("rateLimitOverrides: null clears overrides", () => {
  const r = parse(null);
  assert.ok(r.success, String(r.error));
  assert.equal(r.data.rateLimitOverrides, null);
});

test("rateLimitOverrides: undefined is valid", () => {
  const r = updateProviderConnectionSchema.safeParse({ name: "test-provider" });
  assert.ok(r.success, String(r.error));
  assert.equal(r.data.rateLimitOverrides, undefined);
});

test("rateLimitOverrides: string coerced to number", () => {
  const r = parse({ rpm: "120" });
  assert.ok(r.success, String(r.error));
  assert.equal(r.data.rateLimitOverrides.rpm, 120);
});

test("rateLimitOverrides: rejects negative rpm", () => {
  assert.equal(parse({ rpm: -1 }).success, false);
});

test("rateLimitOverrides: rejects float rpm", () => {
  assert.equal(parse({ rpm: 1.5 }).success, false);
});

test("rateLimitOverrides: rejects rpm above max", () => {
  assert.equal(parse({ rpm: 1_000_001 }).success, false);
});

test("rateLimitOverrides: rejects tpm above max", () => {
  assert.equal(parse({ tpm: 100_000_001 }).success, false);
});

test("rateLimitOverrides: rejects non-object", () => {
  assert.equal(parse("bad").success, false);
  assert.equal(parse(42).success, false);
  assert.equal(parse([1]).success, false);
});

test("rateLimitOverrides: empty object is valid", () => {
  const r = parse({});
  assert.ok(r.success, String(r.error));
});

test("rateLimitOverrides: all zeros is valid", () => {
  const r = parse({ rpm: 0, tpm: 0, tpd: 0, minTime: 0, maxConcurrent: 0 });
  assert.ok(r.success, String(r.error));
});
