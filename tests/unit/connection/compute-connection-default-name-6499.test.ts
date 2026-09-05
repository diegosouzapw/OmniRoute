import { test } from "node:test";
import assert from "node:assert/strict";

import { computeConnectionDefaultName } from "@/app/(dashboard)/dashboard/providers/[id]/components/modals/computeConnectionDefaultName";

// #6499 — the backend upserts API-key connections by (provider, name), so a second
// connection defaulting to "main" silently overwrites the first. The default name
// must stay "main" for the first connection (backward compatible) and get a unique
// numeric suffix afterwards.

test("first connection defaults to 'main'", () => {
  assert.equal(computeConnectionDefaultName(0), "main");
});

test("undefined count is treated as zero → 'main'", () => {
  assert.equal(computeConnectionDefaultName(undefined), "main");
});

test("subsequent connections get a unique numeric suffix", () => {
  assert.equal(computeConnectionDefaultName(1), "main-2");
  assert.equal(computeConnectionDefaultName(2), "main-3");
  assert.equal(computeConnectionDefaultName(9), "main-10");
});

test("negative counts are clamped to 'main' (never a broken 'main-0')", () => {
  assert.equal(computeConnectionDefaultName(-1), "main");
});
