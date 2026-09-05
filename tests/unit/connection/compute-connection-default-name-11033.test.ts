import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computeConnectionDefaultName } from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/computeConnectionDefaultName.ts";

describe("computeConnectionDefaultName array deduping (#11033)", () => {
  it("dedupes against existing connection object arrays without overwriting connection 1", () => {
    const existing = [
      { name: "main" },
      { name: "main-2" },
      { name: "main-3" },
      { name: "main-4" },
    ];
    assert.equal(computeConnectionDefaultName(existing), "main-5");
  });

  it("handles missing intermediate indices cleanly", () => {
    const existing = ["main", "main-3", "main-4"];
    assert.equal(computeConnectionDefaultName(existing), "main-2");
  });

  it("returns 'main' if main does not exist in existing connections", () => {
    const existing = ["main-2", "main-3"];
    assert.equal(computeConnectionDefaultName(existing), "main");
  });
});
