import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MODE_PACKS } from "../../open-sse/services/autoCombo/modePacks.ts";

// N2 locks (moved from batch1 — batch1 modePacks.ts pins no quality, batch2 does).
// Locks, not TDD: green on existing behavior, break on silent regression.

test("every pack pins quality explicitly (no silent DEFAULT inheritance)", () => {
  for (const [name, pack] of Object.entries(MODE_PACKS)) {
    assert.ok(
      typeof (pack as { quality?: unknown }).quality === "number",
      `${name} must pin quality`
    );
  }
});

test("scoring fallback stays neutral (no DEFAULT inheritance)", () => {
  const src = readFileSync("open-sse/services/autoCombo/scoring.ts", "utf8");
  assert.match(src, /weights\.quality \?\? 0\)/);
  assert.match(src, /factors\.quality \?\? 0\.5\)/);
});
