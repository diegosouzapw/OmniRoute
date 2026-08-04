import { test } from "node:test";
import assert from "node:assert/strict";
import { ENGINE_CATALOG, engineMeta, ENGINE_IDS } from "@omniroute/open-sse/services/compression/engineCatalog.ts";
import { DEFAULT_COMPRESSION_CONFIG } from "@omniroute/open-sse/services/compression/types.ts";

test("catalog lists every engine with stackPriority", () => {
  for (const id of ["session-dedup","ccr","lite","rtk","headroom","caveman","aggressive","llmlingua","ultra"]) {
    assert.ok(engineMeta(id), `${id} present`);
    assert.equal(typeof engineMeta(id).stackPriority, "number");
  }
});
test("levels + single-mode flags are correct", () => {
  assert.deepEqual(engineMeta("rtk").levels, ["minimal","standard","aggressive"]);
  assert.deepEqual(engineMeta("caveman").levels, ["lite","full","ultra"]);
  assert.equal(engineMeta("headroom").levels, undefined);
  assert.equal(engineMeta("caveman").isSingleMode, true);
  assert.equal(engineMeta("headroom").isSingleMode, false);
});
test("ENGINE_IDS is ordered by stackPriority", () => {
  const ps = ENGINE_IDS.map((id) => engineMeta(id).stackPriority);
  assert.deepEqual(ps, [...ps].sort((a,b)=>a-b));
});
test("default config has an engines map + activeComboId", () => {
  assert.equal(typeof DEFAULT_COMPRESSION_CONFIG.engines, "object");
  assert.equal(DEFAULT_COMPRESSION_CONFIG.activeComboId, null);
  // default-off: every engine disabled by default (opt-in preserved)
  for (const id of ENGINE_IDS) assert.equal(DEFAULT_COMPRESSION_CONFIG.engines[id]?.enabled, false);
});
