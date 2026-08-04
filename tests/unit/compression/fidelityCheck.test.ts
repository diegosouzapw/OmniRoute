import test from "node:test";
import assert from "node:assert/strict";
import { judgeFidelityBatch } from "../../../open-sse/services/compression/eval/fidelityCheck.ts";
import type { ModelClient, ChatTurn } from "../../../open-sse/services/compression/eval/types.ts";
function fakeClient(verdictLine: string, usdPerCall: number): ModelClient {
  return {
    async complete(_m: string, _msgs: ChatTurn[]) {
      return { text: `reasoning...\nVERDICT: ${verdictLine}`, usdCost: usdPerCall };
    },
  };
}
test("returns one verdict per item under the cap", async () => {
  const client = fakeClient("SAME", 0.01);
  const items = [
    { id: "rtk", original: "hello world foo", compressed: "hello world" },
    { id: "caveman", original: "hello world foo", compressed: "hello" },
  ];
  const out = await judgeFidelityBatch(client, "judge-model", items, 1.0);
  assert.equal(out.results.length, 2);
  assert.equal(out.results[0].verdict, "same");
  assert.equal(out.capped, false);
  assert.ok(out.totalUsd > 0);
});
test("stops at the USD cap and marks the rest skippedCapped", async () => {
  const client = fakeClient("MATERIALLY_DIFFERS", 0.04);
  const items = [
    { id: "a", original: "x", compressed: "y" },
    { id: "b", original: "x", compressed: "y" },
    { id: "c", original: "x", compressed: "y" },
    { id: "d", original: "x", compressed: "y" },
  ];
  const out = await judgeFidelityBatch(client, "judge-model", items, 0.1); // 0.04*3=0.12>0.10
  assert.equal(out.capped, true);
  assert.equal(out.results.filter((r) => !r.skippedCapped).length, 3);
  assert.equal(out.results.filter((r) => r.skippedCapped).length, 1);
  assert.equal(out.results[0].verdict, "materially-differs");
});
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
test("verify route enforces auth before reading the body and sanitizes errors", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(
    join(here, "../../../src/app/api/compression/compare/verify/route.ts"),
    "utf8"
  );
  const authIdx = src.indexOf("requireManagementAuth(req)");
  const bodyIdx = src.indexOf("req.json()");
  assert.ok(authIdx > -1 && bodyIdx > -1 && authIdx < bodyIdx, "auth gate must precede body read");
  assert.match(src, /sanitizeErrorMessage/);
  assert.match(src, /judgeFidelityBatch/);
});
test("verify route uses the priced judge client so the USD cap is not inert", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const src = readFileSync(
    join(here, "../../../src/app/api/compression/compare/verify/route.ts"),
    "utf8"
  );
  // must build the cost-aware client (computes usdCost via pricing lookup)
  assert.match(src, /createPricedJudgeClient/);
  // must NOT use the bare cost-blind createExecutorModelClient (that reintroduces the inert cap)
  assert.ok(
    !/createExecutorModelClient\s*\(/.test(src),
    "route must not use the cost-blind createExecutorModelClient"
  );
});
