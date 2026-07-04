/**
 * MuxServiceTab unit test — verifies module shape only (no DOM renderer wired
 * into the node:test runner for this suite; mirrors CliproxyServiceTab.tsx's
 * module-shape test).
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("MuxServiceTab — module shape", () => {
  it("exports MuxServiceTab function", async () => {
    const mod = await import(
      "../../../../../src/app/(dashboard)/dashboard/providers/services/tabs/MuxServiceTab.tsx"
    );
    assert.equal(typeof mod.MuxServiceTab, "function");
  });
});
