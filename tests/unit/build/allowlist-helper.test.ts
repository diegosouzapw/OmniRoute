import test from "node:test";
import assert from "node:assert/strict";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import { reportStaleEntries, assertNoStale } from "../../../scripts/check/lib/allowlist.mjs";

test("reportStaleEntries: entrada da allowlist não mais violada => stale", () => {
  const stale = reportStaleEntries(["/api/dead", "/api/live"], ["/api/live"], "fetch-targets");
  assert.deepEqual(stale, ["/api/dead"]);
});

test("reportStaleEntries: todas as entradas ainda violadas => vazio", () => {
  assert.deepEqual(reportStaleEntries(["a", "b"], ["a", "b"], "x"), []);
});

test("reportStaleEntries: Set como liveViolations funciona igual a array", () => {
  const live = new Set(["/api/live"]);
  const stale = reportStaleEntries(["/api/dead", "/api/live"], live, "fetch-targets");
  assert.deepEqual(stale, ["/api/dead"]);
});

test("reportStaleEntries: allowlist vazia => sempre vazio", () => {
  assert.deepEqual(reportStaleEntries([], ["/api/anything"], "x"), []);
});

test("assertNoStale: seta process.exitCode=1 quando há entradas stale", () => {
  const original = process.exitCode;
  process.exitCode = 0;
  const stale = assertNoStale(["/api/dead", "/api/live"], ["/api/live"], "fetch-targets");
  assert.equal(process.exitCode, 1);
  assert.deepEqual(stale, ["/api/dead"]);
  process.exitCode = original;
});

test("assertNoStale: NÃO seta process.exitCode quando não há stale", () => {
  const original = process.exitCode;
  process.exitCode = 0;
  const stale = assertNoStale(["a", "b"], ["a", "b"], "x");
  assert.equal(process.exitCode, 0);
  assert.deepEqual(stale, []);
  process.exitCode = original;
});
