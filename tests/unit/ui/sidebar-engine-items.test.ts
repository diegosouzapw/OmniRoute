import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  HIDEABLE_SIDEBAR_ITEM_IDS,
  COMPRESSION_CONTEXT_GROUP,
} from "../../../src/shared/constants/sidebarVisibility";

// Generic engines are configured inline in the Compression Hub (the ⚙ on each active
// layer), NOT as standalone sidebar pages. Their routes still exist for deep-link.
const INLINE_ENGINE_IDS = [
  "context-headroom",
  "context-session-dedup",
  "context-ccr",
  "context-llmlingua",
  "context-lite",
  "context-aggressive",
  "context-ultra",
] as const;

// What stays in the Compression menu: global settings, the two rich bespoke pages,
// the Hub, and the live Studio.
const EXPECTED_MENU_IDS = [
  "context-settings",
  "context-caveman",
  "context-rtk",
  "context-combos",
  "compression-studio",
];

describe("Compression menu is decluttered (generic engines moved into the Hub)", () => {
  const itemIds = COMPRESSION_CONTEXT_GROUP.items.map((item) => item.id);

  it("keeps exactly the bespoke pages + Hub + Studio", () => {
    assert.deepEqual(itemIds, EXPECTED_MENU_IDS);
  });

  for (const id of INLINE_ENGINE_IDS) {
    it(`does NOT list "${id}" as a standalone sidebar item`, () => {
      assert.ok(!itemIds.includes(id as (typeof itemIds)[number]), `"${id}" should be inline-only`);
    });
    it(`drops "${id}" from HIDEABLE_SIDEBAR_ITEM_IDS`, () => {
      assert.ok(
        !(HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes(id),
        `"${id}" should not be hideable (no longer a menu item)`
      );
    });
  }

  it("still exposes caveman + rtk bespoke pages and the combos Hub", () => {
    for (const id of ["context-caveman", "context-rtk", "context-combos"]) {
      assert.ok(itemIds.includes(id as (typeof itemIds)[number]), `expected "${id}" to remain`);
    }
  });
});
