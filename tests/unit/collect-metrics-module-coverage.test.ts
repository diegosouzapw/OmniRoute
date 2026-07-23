import { test } from "node:test";
import assert from "node:assert";
// @ts-expect-error — .mjs module has no type declarations
import { extractModuleCoverage, CRITICAL_MODULE_PATHS } from "../../scripts/quality/collect-metrics.mjs";

// ─── Task 7.9: extractModuleCoverage (pure function) ─────────────────────────
//
// We test with a synthetic coverage-summary.json that mirrors the shape produced
// by c8 — keys are absolute paths (or "total"), values have { lines: { pct } }.
// The repoRoot is passed in so we can construct matching absolute paths.

const FAKE_ROOT = "/repo";

/** Build a synthetic summary entry for a given relative path and pct. */
function entry(rel: string, pct: number) {
  return [`${FAKE_ROOT}/${rel}`, { lines: { pct } }];
}

test("7.9 extractModuleCoverage: returns empty object for empty summary", () => {
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    { total: { lines: { pct: 80 } } },
    { "coverage.chatCore.lines": ["open-sse/handlers/chatCore.ts"] },
    FAKE_ROOT
  );
  assert.deepEqual(result, {}, "no match → empty result (file absent from coverage)");
});

test("7.9 extractModuleCoverage: extracts a single matching module", () => {
  const summary = Object.fromEntries([
    entry("open-sse/handlers/chatCore.ts", 78.5),
  ]);
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    { "coverage.chatCore.lines": ["open-sse/handlers/chatCore.ts"] },
    FAKE_ROOT
  );
  assert.equal(result["coverage.chatCore.lines"], 78.5);
});

test("7.9 extractModuleCoverage: extracts multiple modules independently", () => {
  const summary = Object.fromEntries([
    entry("open-sse/handlers/chatCore.ts", 85),
    entry("open-sse/services/combo.ts", 62),
    entry("src/shared/utils/circuitBreaker.ts", 91),
  ]);
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    {
      "coverage.chatCore.lines": ["open-sse/handlers/chatCore.ts"],
      "coverage.combo.lines": ["open-sse/services/combo.ts"],
      "coverage.circuitBreaker.lines": ["src/shared/utils/circuitBreaker.ts"],
    },
    FAKE_ROOT
  );
  assert.equal(result["coverage.chatCore.lines"], 85);
  assert.equal(result["coverage.combo.lines"], 62);
  assert.equal(result["coverage.circuitBreaker.lines"], 91);
});

test("7.9 extractModuleCoverage: skips modules not present in coverage (no error)", () => {
  const summary = Object.fromEntries([
    entry("open-sse/handlers/chatCore.ts", 70),
    // combo.ts intentionally absent
  ]);
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    {
      "coverage.chatCore.lines": ["open-sse/handlers/chatCore.ts"],
      "coverage.combo.lines": ["open-sse/services/combo.ts"],
    },
    FAKE_ROOT
  );
  assert.equal(result["coverage.chatCore.lines"], 70);
  assert.ok(!("coverage.combo.lines" in result), "absent module should not appear in result");
});

test("7.9 extractModuleCoverage: ignores 'total' key", () => {
  const summary = {
    total: { lines: { pct: 99 } },
    [`${FAKE_ROOT}/open-sse/handlers/chatCore.ts`]: { lines: { pct: 55 } },
  };
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    {
      "coverage.chatCore.lines": ["open-sse/handlers/chatCore.ts"],
      "coverage.total.lines": ["total"], // should NOT match even if someone maps it
    },
    FAKE_ROOT
  );
  assert.equal(result["coverage.chatCore.lines"], 55);
  assert.ok(!("coverage.total.lines" in result), "'total' key must never be returned as a module");
});

test("7.9 extractModuleCoverage: uses first candidate in fallback list", () => {
  const summary = Object.fromEntries([
    entry("src/sse/services/auth.ts", 67),
    // alternative fallback path intentionally absent
  ]);
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    {
      // first candidate matches
      "coverage.auth.lines": ["src/sse/services/auth.ts", "open-sse/services/auth.ts"],
    },
    FAKE_ROOT
  );
  assert.equal(result["coverage.auth.lines"], 67);
});

test("7.9 extractModuleCoverage: uses second candidate when first is absent", () => {
  const summary = Object.fromEntries([
    // first candidate absent; second present
    entry("open-sse/services/auth.ts", 42),
  ]);
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    {
      "coverage.auth.lines": ["src/sse/services/auth.ts", "open-sse/services/auth.ts"],
    },
    FAKE_ROOT
  );
  assert.equal(result["coverage.auth.lines"], 42);
});

test("7.9 extractModuleCoverage: handles missing lines.pct gracefully (no entry emitted)", () => {
  const summary = {
    [`${FAKE_ROOT}/open-sse/handlers/chatCore.ts`]: { statements: { pct: 80 } }, // no lines key
  };
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    { "coverage.chatCore.lines": ["open-sse/handlers/chatCore.ts"] },
    FAKE_ROOT
  );
  assert.ok(!("coverage.chatCore.lines" in result), "entry without lines.pct should not appear");
});

test("7.9 extractModuleCoverage: handles pct=0 correctly (zero coverage is valid data)", () => {
  const summary = Object.fromEntries([entry("open-sse/utils/error.ts", 0)]);
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    { "coverage.error.lines": ["open-sse/utils/error.ts"] },
    FAKE_ROOT
  );
  assert.equal(result["coverage.error.lines"], 0);
});

test("7.9 extractModuleCoverage: handles pct=100 correctly (full coverage)", () => {
  const summary = Object.fromEntries([entry("open-sse/utils/publicCreds.ts", 100)]);
  const result = (extractModuleCoverage as (s: object, m: object, r: string) => Record<string, number>)(
    summary,
    { "coverage.publicCreds.lines": ["open-sse/utils/publicCreds.ts"] },
    FAKE_ROOT
  );
  assert.equal(result["coverage.publicCreds.lines"], 100);
});

test("7.9 CRITICAL_MODULE_PATHS: exports the 8 required module paths", () => {
  const required = [
    "coverage.chatCore.lines",
    "coverage.combo.lines",
    "coverage.accountFallback.lines",
    "coverage.auth.lines",
    "coverage.routeGuard.lines",
    "coverage.error.lines",
    "coverage.publicCreds.lines",
    "coverage.circuitBreaker.lines",
  ];
  const keys = Object.keys(
    CRITICAL_MODULE_PATHS as Record<string, string[]>
  );
  for (const key of required) {
    assert.ok(keys.includes(key), `CRITICAL_MODULE_PATHS must contain ${key}`);
  }
  assert.equal(keys.length, 8, "exactly 8 critical modules must be tracked");
});
