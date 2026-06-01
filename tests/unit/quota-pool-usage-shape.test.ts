/**
 * Regression: the pool-usage page crashed ("tela de erro") for any pool that has
 * allocations. Root cause — the GET /api/quota/pools/[id]/usage endpoint wraps the
 * snapshot as `{ usage: snapshot }`, but usePoolUsage stored the WHOLE response,
 * leaving `usage.dimensions` undefined. StackedAllocationBar then dereferenced
 * `usage.dimensions[dimensionIndex]` → `undefined[0]` → crash.
 *
 * These structural assertions pin the contract (endpoint wraps) + the fix
 * (hook unwraps, bar guards) so the crash cannot silently return.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..", "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const HOOK = "src/app/(dashboard)/dashboard/costs/quota-share/hooks/usePoolUsage.ts";
const BAR = "src/app/(dashboard)/dashboard/costs/quota-share/components/StackedAllocationBar.tsx";

test("usage endpoint wraps the snapshot as { usage: snapshot }", () => {
  const src = read("src/app/api/quota/pools/[id]/usage/route.ts");
  assert.ok(
    /NextResponse\.json\(\s*\{\s*usage:/.test(src),
    "endpoint must return { usage: snapshot }"
  );
});

test("usePoolUsage unwraps data.usage (not the whole response)", () => {
  const src = read(HOOK);
  assert.ok(src.includes("data?.usage"), "hook must unwrap data.usage");
  assert.ok(
    !/setUsage\(\s*data\s*\)/.test(src),
    "hook must NOT store the raw wrapper as usage"
  );
});

test("StackedAllocationBar guards usage.dimensions + dim.perKey", () => {
  const src = read(BAR);
  assert.ok(
    src.includes("usage.dimensions?.[") || src.includes("usage.dimensions ?? []"),
    "must optional-chain usage.dimensions access"
  );
  assert.ok(src.includes("dim.perKey ?? []"), "must guard dim.perKey iteration");
});
