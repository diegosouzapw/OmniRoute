import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

test("pool list uses a responsive multi-column grid", () => {
  const p = join(fileURLToPath(import.meta.url), "..", "..", "..",
    "src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient.tsx");
  const src = readFileSync(p, "utf8");
  // Pool cards render in a responsive grid that scales 1 → 2 → 3 columns
  // (feat 3c8e84d70: "3-col cards"). Keep this aligned with the component.
  assert.ok(
    /grid-cols-1\s+md:grid-cols-2\s+xl:grid-cols-3/.test(src),
    "pool list must be a responsive multi-column grid (grid-cols-1 md:grid-cols-2 xl:grid-cols-3)"
  );
});
