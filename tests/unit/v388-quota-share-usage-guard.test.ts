import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Regression guard: quota-share crashed with "Cannot read properties of undefined
// (reading 'length')" because PoolCard/aggregate read usage.dimensions without a
// guard when the usage snapshot came back without a dimensions array.
const root = join(import.meta.dirname, "../..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

test("quota-share PoolCard guards usage.dimensions", () => {
  const pc = read("src/app/(dashboard)/dashboard/costs/quota-share/components/PoolCard.tsx");
  assert.ok(pc.includes("usage?.dimensions ?? []"), "computeStatus normalizes dimensions to []");
  assert.ok(pc.includes("!!usage?.dimensions?.length"), "hasDimensions guards dimensions");
  assert.equal(/[^?.]usage\.dimensions\.length/.test(pc), false, "no unguarded usage.dimensions.length");
});

test("quota-share aggregate hook guards dimensions/perKey", () => {
  const agg = read("src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePoolsUsageAggregate.ts");
  assert.ok(agg.includes("usage.dimensions ?? []"), "iterates dimensions with ?? []");
  assert.ok(agg.includes("dim.perKey ?? []"), "iterates perKey with ?? []");
});
