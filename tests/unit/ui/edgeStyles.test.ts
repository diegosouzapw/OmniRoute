import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { edgeStyle, FLOW_EDGE_COLORS } from "../../../src/shared/components/flow/edgeStyles.ts";

describe("flow edgeStyles (U0 — extracted from ProviderTopology)", () => {
  it("exposes the shared flow palette", () => {
    assert.equal(FLOW_EDGE_COLORS.active, "#22c55e");
    assert.equal(FLOW_EDGE_COLORS.error, "#ef4444");
    assert.equal(FLOW_EDGE_COLORS.last, "#f59e0b");
    assert.equal(FLOW_EDGE_COLORS.idle, "var(--color-border)");
  });

  it("styles an error edge", () => {
    assert.deepEqual(edgeStyle(false, false, true), {
      stroke: "#ef4444",
      strokeWidth: 2,
      opacity: 0.85,
    });
  });

  it("styles an active edge", () => {
    assert.deepEqual(edgeStyle(true, false, false), {
      stroke: "#22c55e",
      strokeWidth: 2.5,
      opacity: 1,
    });
  });

  it("styles a last-used edge", () => {
    assert.deepEqual(edgeStyle(false, true, false), {
      stroke: "#f59e0b",
      strokeWidth: 1.5,
      opacity: 0.6,
    });
  });

  it("styles an idle edge", () => {
    assert.deepEqual(edgeStyle(false, false, false), {
      stroke: "var(--color-border)",
      strokeWidth: 1,
      opacity: 0.2,
    });
  });

  it("applies precedence error > active > last", () => {
    assert.equal(edgeStyle(true, true, true).stroke, "#ef4444"); // error wins
    assert.equal(edgeStyle(true, true, false).stroke, "#22c55e"); // active beats last
  });
});
