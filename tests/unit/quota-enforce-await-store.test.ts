/**
 * Regression: getQuotaStore() is async (returns Promise<QuotaStore>). enforce.ts
 * called it WITHOUT await, so `store` was a Promise and `store.peek` / `store.consume`
 * threw "peek is not a function" → enforceQuotaShare failed open on EVERY request and
 * recordConsumption never recorded. The existing enforce unit tests inject a sync mock
 * store, so they passed while production was a no-op. This guard asserts every
 * getQuotaStore() call in enforce.ts is awaited.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

test("enforce.ts awaits every getQuotaStore() call (it is async)", () => {
  const p = join(
    fileURLToPath(import.meta.url),
    "..",
    "..",
    "..",
    "src/lib/quota/enforce.ts"
  );
  const src = readFileSync(p, "utf8");
  const totalCalls = (src.match(/getQuotaStore\(\)/g) || []).length;
  const awaitedCalls = (src.match(/await\s+getQuotaStore\(\)/g) || []).length;
  assert.ok(totalCalls > 0, "expected enforce.ts to call getQuotaStore()");
  assert.equal(
    awaitedCalls,
    totalCalls,
    `every getQuotaStore() must be awaited — found ${totalCalls} call(s), ${awaitedCalls} awaited`
  );
});
