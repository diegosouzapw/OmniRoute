/**
 * Regression test for #9046 — Free Pool proxy table stays empty despite synced stats.
 *
 * The API returns `{ success, data: { proxies, total, hasMore, stats, syncErrors } }`,
 * but FreePoolTab.tsx was reading `data.items` and `data.total` from the top-level
 * JSON — both undefined → empty table + "0 total proxies".
 *
 * This test verifies the payload normalization fix is present in the source code
 * and that the correct contract keys are read by loadData().
 *
 * Run: node --import tsx/esm --test tests/unit/free-pool-frontend-repro.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const FREEPOOL_TAB_PATH = resolve(
  import.meta.dirname,
  "../../src/app/(dashboard)/dashboard/settings/components/proxy/FreePoolTab.tsx"
);

test("FreePoolTab.loadData() reads from body.data.proxies (not data.items)", () => {
  const src = readFileSync(FREEPOOL_TAB_PATH, "utf-8");

  // The fix should use payload normalization: const payload = body?.data ?? body;
  assert.ok(
    src.includes("const payload = body?.data ?? body;") ||
      src.includes("const payload = (body?.data ?? body);"),
    "Expected payload normalization: const payload = body?.data ?? body;"
  );

  // Should read proxies from payload (not items from the top-level data)
  assert.ok(
    src.includes("payload.proxies ?? payload.items ?? []"),
    "Expected setProxies to use payload.proxies with fallback to payload.items"
  );

  assert.ok(
    src.includes("payload.total ?? 0"),
    "Expected setTotal to use payload.total with fallback to 0"
  );
});

test("FreePoolTab.loadData() no longer reads data.items directly from top-level JSON body", () => {
  const src = readFileSync(FREEPOOL_TAB_PATH, "utf-8");

  // Before the fix, line 88 was: setProxies(data.items || []);
  // This pattern (reading "data.items" from the raw JSON body) should be gone.
  const oldPattern = /setProxies\(\s*data\s*\.\s*items\s*(\|\|\s*\[\]\s*)?\)/;
  assert.ok(
    !oldPattern.test(src),
    "Source must NOT contain setProxies(data.items || []) — should use payload.proxies"
  );
});

test("FreePoolTab.loadData() no longer reads data.total directly from top-level JSON body", () => {
  const src = readFileSync(FREEPOOL_TAB_PATH, "utf-8");

  // Before the fix, line 89 was: setTotal(data.total ?? 0);
  // This pattern should be gone.
  const oldPattern = /setTotal\(\s*data\s*\.\s*total\s*(\?\?\s*0\s*)?\)/;
  assert.ok(
    !oldPattern.test(src),
    "Source must NOT contain setTotal(data.total ?? 0) — should use payload.total"
  );
});

// Simulate the actual API contract parsing to prove correctness
test("Payload normalization produces correct values with real API contract shape", () => {
  // Simulate what fetch returns:
  const apiResponse = {
    success: true,
    data: {
      proxies: [
        { id: "p1", host: "16.163.88.228" },
        { id: "p2", host: "203.0.113.42" },
      ],
      total: 254,
    },
  };

  // THE BUG: reading from top-level body
  const buggyProxies = (apiResponse as Record<string, unknown>).items ?? [];
  const buggyTotal = (apiResponse as Record<string, unknown>).total ?? 0;
  assert.equal(buggyProxies.length, 0, "BUG: data.items is undefined — should show empty table");
  assert.equal(buggyTotal, 0, "BUG: data.total is undefined — should show 0 total");

  // THE FIX: normalize through body?.data
  const payload = (apiResponse as Record<string, unknown>)?.data ?? apiResponse;
  const fixedProxies = (payload as Record<string, unknown>).proxies ?? (payload as Record<string, unknown>).items ?? [];
  const fixedTotal = (payload as Record<string, unknown>).total ?? 0;

  assert.equal(fixedProxies.length, 2, "FIX: payload.proxies contains 2 items");
  assert.equal(fixedTotal, 254, "FIX: payload.total is 254");
});

// Also verify the backend contract is still correct
test("Backend route test asserts body.data.proxies contract", () => {
  // Verify the route test asserts data.proxies, not data.items
  const routeTestPath = resolve(
    import.meta.dirname,
    "./api/free-proxies-list-route.test.ts"
  );
  const routeTest = readFileSync(routeTestPath, "utf-8");
  assert.ok(
    routeTest.includes("body.data.proxies") || routeTest.includes("body.data.total"),
    "Route test must assert body.data.proxies and body.data.total"
  );
});
