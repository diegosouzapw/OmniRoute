import test from "node:test";
import assert from "node:assert/strict";

import {
  SIDEBAR_ICON_ACCENTS,
  getSidebarIconAccent,
} from "../../src/shared/constants/sidebarVisibility.ts";

/**
 * PR #3812 — colored sidebar menu icons.
 *
 * getSidebarIconAccent(id) returns the curated accent for known menu items and a
 * deterministic generated accent for everything else, so every item gets a
 * stable color across renders/sessions.
 */

test("#3812 returns the curated accent for a mapped sidebar item", () => {
  assert.equal(getSidebarIconAccent("home"), SIDEBAR_ICON_ACCENTS.home);
  assert.equal(getSidebarIconAccent("settings-general"), SIDEBAR_ICON_ACCENTS["settings-general"]);
});

test("#3812 falls back to a valid hex accent for an unmapped id", () => {
  const accent = getSidebarIconAccent("some-unknown-item-xyz");
  assert.match(accent, /^#[0-9A-F]{6}$/, `expected a #RRGGBB hex, got ${accent}`);
});

test("#3812 the fallback accent is deterministic (same id → same color)", () => {
  const a = getSidebarIconAccent("deterministic-check-id");
  const b = getSidebarIconAccent("deterministic-check-id");
  assert.equal(a, b, "the generated accent must be stable for the same id");
});

test("#3812 different unmapped ids generally produce different accents", () => {
  const first = getSidebarIconAccent("alpha-item-id");
  const second = getSidebarIconAccent("beta-item-id");
  assert.notEqual(first, second, "distinct ids should hash to distinct accents here");
});
