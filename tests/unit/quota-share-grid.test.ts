import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

test("pool list uses a responsive 2-column grid", () => {
  const p = join(fileURLToPath(import.meta.url), "..", "..", "..",
    "src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient.tsx");
  const src = readFileSync(p, "utf8");
  assert.ok(/grid-cols-1\s+lg:grid-cols-2/.test(src), "pool list must be a responsive 2-col grid");
});
