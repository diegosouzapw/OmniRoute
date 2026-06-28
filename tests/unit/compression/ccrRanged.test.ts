import test from "node:test";
import assert from "node:assert/strict";
import {
  storeBlock,
  handleCcrRetrieve,
  resetCcrStore,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";

test.beforeEach(() => resetCcrStore());

const block = ["a ok", "b ERROR", "c ok", "d ERROR"].join("\n");

test("sem mode → bloco inteiro (backward-compat)", () => {
  const h = storeBlock(block, "p1");
  assert.deepEqual(handleCcrRetrieve({ hash: h }, "p1"), { content: block });
});

test("modos ranged via handler", () => {
  const h = storeBlock(block, "p1");
  assert.deepEqual(handleCcrRetrieve({ hash: h, mode: "head", n: 1 }, "p1"), { content: "a ok" });
  assert.deepEqual(handleCcrRetrieve({ hash: h, mode: "grep", pattern: "ERROR" }, "p1"), {
    content: "b ERROR\nd ERROR",
  });
  const stats = handleCcrRetrieve({ hash: h, mode: "stats" }, "p1") as { content: string };
  assert.equal(JSON.parse(stats.content).lines, 4);
});

test("scoping preservado: principal errado → not found", () => {
  const h = storeBlock(block, "p1");
  const r = handleCcrRetrieve({ hash: h, mode: "head", n: 1 }, "p2");
  assert.ok("error" in r);
  assert.match((r as { error: string }).error, /not found/i);
});

test("grep ReDoS via handler → erro (não crash)", () => {
  const h = storeBlock(block, "p1");
  const r = handleCcrRetrieve({ hash: h, mode: "grep", pattern: "(a+)+$" }, "p1");
  assert.ok("error" in r);
});
