import test from "node:test";
import assert from "node:assert/strict";
import {
  queryBlock,
  MAX_GREP_MATCHES,
} from "../../../open-sse/services/compression/engines/ccr/ccrQuery.ts";

const block = ["l1 ok", "l2 ERROR foo", "l3 ok", "l4 ERROR bar", "l5 ok"].join("\n");

test("full / ausente → texto inteiro (backward-compat)", () => {
  assert.deepEqual(queryBlock(block, {}), { content: block });
  assert.deepEqual(queryBlock(block, { mode: "full" }), { content: block });
});

test("head:n e tail:n", () => {
  assert.deepEqual(queryBlock(block, { mode: "head", n: 2 }), { content: "l1 ok\nl2 ERROR foo" });
  assert.deepEqual(queryBlock(block, { mode: "tail", n: 2 }), { content: "l4 ERROR bar\nl5 ok" });
  assert.deepEqual(queryBlock(block, { mode: "head", n: 99 }), { content: block });
});

test("lines:start-end 1-indexed inclusive, clamp", () => {
  assert.deepEqual(queryBlock(block, { mode: "lines", start: 2, end: 3 }), {
    content: "l2 ERROR foo\nl3 ok",
  });
  assert.deepEqual(queryBlock(block, { mode: "lines", start: 4, end: 99 }), {
    content: "l4 ERROR bar\nl5 ok",
  });
  assert.ok("error" in queryBlock(block, { mode: "lines", start: 3, end: 1 }));
});

test("grep casa linhas; unique deduplica", () => {
  const r = queryBlock(block, { mode: "grep", pattern: "ERROR" });
  assert.deepEqual(r, { content: "l2 ERROR foo\nl4 ERROR bar" });
  const dup = ["x ERR", "x ERR", "y ERR"].join("\n");
  const u = queryBlock(dup, { mode: "grep", pattern: "ERR", unique: true });
  assert.deepEqual(u, { content: "x ERR\ny ERR" });
});

test("grep ReDoS rejeitado por safe-regex", () => {
  const r = queryBlock(block, { mode: "grep", pattern: "(a+)+$" });
  assert.ok("error" in r);
  assert.match((r as { error: string }).error, /backtrack|unsafe|reject/i);
});

test("grep regex inválido → erro; pattern grande → erro", () => {
  assert.ok("error" in queryBlock(block, { mode: "grep", pattern: "[" }));
  assert.ok("error" in queryBlock(block, { mode: "grep", pattern: "a".repeat(600) }));
});

test("grep cap de matches", () => {
  const big = Array.from({ length: MAX_GREP_MATCHES + 50 }, (_, i) => `row ${i} HIT`).join("\n");
  const r = queryBlock(big, { mode: "grep", pattern: "HIT" }) as { content: string };
  const lines = r.content.split("\n").filter((l) => l.includes("HIT"));
  assert.ok(lines.length <= MAX_GREP_MATCHES);
  assert.match(r.content, /truncat/i);
});

test("stats → JSON lines/chars/bytes", () => {
  const r = queryBlock(block, { mode: "stats" }) as { content: string };
  const s = JSON.parse(r.content);
  assert.equal(s.lines, 5);
  assert.equal(s.chars, block.length);
  assert.equal(s.bytes, Buffer.byteLength(block, "utf8"));
});

test("queryBlock nunca lança (fail-safe)", () => {
  assert.doesNotThrow(() => queryBlock(block, { mode: "head", n: -5 }));
});
