// tests/unit/compression/ionizerSample.test.ts
import test from "node:test";
import assert from "node:assert/strict";
import {
  schemaUnion, isErrorRow, seededSample, ionize, applyIonizerPass,
} from "../../../open-sse/services/compression/engines/ionizer/sample.ts";
import { retrieveBlock, resetCcrStore } from "../../../open-sse/services/compression/engines/ccr/index.ts";

test("schemaUnion: union of all keys across rows, stable order", () => {
  const u = schemaUnion([{ a: 1 }, { b: 2 }, { a: 3, c: 4 }]);
  assert.deepEqual(u, ["a", "b", "c"]);
});

test("isErrorRow: error/exception key truthy or status 4xx/5xx → true; normal → false", () => {
  assert.equal(isErrorRow({ error: "boom" }), true);
  assert.equal(isErrorRow({ status: 500 }), true);
  assert.equal(isErrorRow({ statusCode: 404 }), true);
  assert.equal(isErrorRow({ ok: true, status: 200 }), false);
  assert.equal(isErrorRow({ name: "fine" }), false);
});

test("seededSample: deterministic, k>=n returns all, in-range", () => {
  const pool = [10, 11, 12, 13, 14, 15, 16, 17];
  const a = seededSample(pool, 3, 42);
  assert.deepEqual(a, seededSample(pool, 3, 42)); // deterministic
  assert.equal(a.length, 3);
  assert.ok(a.every((x) => pool.includes(x)));
  assert.deepEqual(seededSample(pool, 99, 42).slice().sort((x, y) => x - y), pool); // k>=n → all
});

test("ionize: keeps schema-cover + error rows + first/last K + seeded middle ≤ targetRows, original order", () => {
  const rows: Array<Record<string, unknown>> = [];
  for (let i = 0; i < 100; i++) rows.push({ i, v: `row-${i}` });
  rows[50] = { i: 50, v: "x", error: "boom" }; // an error row in the middle
  const res = ionize(rows, { targetRows: 20, firstK: 3, lastK: 3, seed: 7 });
  assert.ok(res.keptCount <= 20 + 2); // target + mandatory overflow tolerance
  assert.equal(res.totalCount, 100);
  assert.equal(res.kept[0].i, 0);
  assert.equal(res.kept[res.kept.length - 1].i, 99);
  assert.ok(res.kept.some((r) => r.error === "boom"));
  const idxs = res.kept.map((r) => r.i as number);
  assert.deepEqual(idxs, idxs.slice().sort((a, b) => a - b));
  const small = [{ a: 1 }, { a: 2 }];
  assert.equal(ionize(small, { targetRows: 20, firstK: 3, lastK: 3, seed: 1 }).keptCount, 2);
});

test("applyIonizerPass: big homogeneous array → inline sample + recoverable CCR marker; below threshold untouched", () => {
  resetCcrStore();
  const arr = Array.from({ length: 300 }, (_, i) => ({ i, v: `r${i}` }));
  const content = JSON.stringify(arr);
  const messages = [{ role: "user", content }];
  const out = applyIonizerPass(messages, { threshold: 200, targetRows: 50, principalId: "p1" });
  assert.equal(out.ionizedCount, 1);
  const newContent = out.messages[0].content as string;
  assert.match(newContent, /\[ionizer: kept \d+\/300 rows; full → CCR retrieve hash=[0-9a-f]{24} chars=\d+\]$/);
  const hash = newContent.match(/hash=([0-9a-f]{24})/)![1];
  assert.equal(retrieveBlock(hash, "p1"), content); // whole original array recoverable verbatim
  const small = [{ role: "user", content: JSON.stringify(Array.from({ length: 10 }, (_, i) => ({ i }))) }];
  assert.equal(applyIonizerPass(small, { threshold: 200, targetRows: 50, principalId: "p1" }).ionizedCount, 0);
});
