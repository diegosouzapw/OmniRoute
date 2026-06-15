import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Import the sidebar constants we need to verify
import {
  HIDEABLE_SIDEBAR_ITEM_IDS,
  COMPRESSION_CONTEXT_GROUP,
} from "../../../src/shared/constants/sidebarVisibility";

const ENGINE_IDS = [
  "context-headroom",
  "context-session-dedup",
  "context-ccr",
  "context-llmlingua",
] as const;

describe("HIDEABLE_SIDEBAR_ITEM_IDS includes all 4 engine items", () => {
  for (const id of ENGINE_IDS) {
    it(`includes "${id}"`, () => {
      assert.ok(
        (HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes(id),
        `Expected HIDEABLE_SIDEBAR_ITEM_IDS to include "${id}"`
      );
    });
  }
});

describe("COMPRESSION_CONTEXT_GROUP contains all 4 engine items", () => {
  const itemIds = COMPRESSION_CONTEXT_GROUP.items.map((item) => item.id);
  const itemMap = new Map(COMPRESSION_CONTEXT_GROUP.items.map((item) => [item.id, item]));

  for (const id of ENGINE_IDS) {
    it(`contains item with id "${id}"`, () => {
      assert.ok(itemIds.includes(id as (typeof itemIds)[number]), `Missing item "${id}"`);
    });
  }

  it('headroom has href "/dashboard/context/headroom" and labelFallback "Headroom"', () => {
    const item = itemMap.get("context-headroom");
    assert.ok(item, "context-headroom item not found");
    assert.equal(item.href, "/dashboard/context/headroom");
    assert.equal(item.labelFallback, "Headroom");
  });

  it('session-dedup has href "/dashboard/context/session-dedup" and labelFallback "Session Dedup"', () => {
    const item = itemMap.get("context-session-dedup");
    assert.ok(item, "context-session-dedup item not found");
    assert.equal(item.href, "/dashboard/context/session-dedup");
    assert.equal(item.labelFallback, "Session Dedup");
  });

  it('ccr has href "/dashboard/context/ccr" and labelFallback "CCR"', () => {
    const item = itemMap.get("context-ccr");
    assert.ok(item, "context-ccr item not found");
    assert.equal(item.href, "/dashboard/context/ccr");
    assert.equal(item.labelFallback, "CCR");
  });

  it('llmlingua has href "/dashboard/context/llmlingua" and labelFallback "LLMLingua"', () => {
    const item = itemMap.get("context-llmlingua");
    assert.ok(item, "context-llmlingua item not found");
    assert.equal(item.href, "/dashboard/context/llmlingua");
    assert.equal(item.labelFallback, "LLMLingua");
  });

  it("4 engine items appear after context-rtk and before context-combos", () => {
    const ids = itemIds as string[];
    const rtkIdx = ids.indexOf("context-rtk");
    const combosIdx = ids.indexOf("context-combos");
    assert.ok(rtkIdx !== -1, "context-rtk not found");
    assert.ok(combosIdx !== -1, "context-combos not found");

    for (const id of ENGINE_IDS) {
      const idx = ids.indexOf(id);
      assert.ok(idx > rtkIdx, `${id} should appear after context-rtk`);
      assert.ok(idx < combosIdx, `${id} should appear before context-combos`);
    }
  });
});
