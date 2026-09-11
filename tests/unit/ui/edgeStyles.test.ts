import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { edgeStyle, FLOW_EDGE_COLORS } from "../../../src/shared/components/flow/edgeStyles.ts";

describe("flow edgeStyles (U0 — extracted from ProviderTopology)", () => {
  it("exposes the shared flow palette", () => {
    assert.equal(FLOW_EDGE_COLORS.active, "var(--orch-status-success)");
    assert.equal(FLOW_EDGE_COLORS.error, "var(--orch-status-error)");
    assert.equal(FLOW_EDGE_COLORS.last, "var(--orch-status-warning)");
    assert.equal(FLOW_EDGE_COLORS.idle, "var(--color-text-muted)");
  });

  it("styles an error edge", () => {
    assert.deepEqual(edgeStyle(false, false, true), {
      stroke: "var(--orch-status-error)",
      strokeWidth: 2,
      opacity: 0.85,
    });
  });

  it("styles an active edge", () => {
    assert.deepEqual(edgeStyle(true, false, false), {
      stroke: "var(--orch-status-success)",
      strokeWidth: 2.5,
      opacity: 1,
    });
  });

  it("styles a last-used edge", () => {
    assert.deepEqual(edgeStyle(false, true, false), {
      stroke: "var(--orch-status-warning)",
      strokeWidth: 1.5,
      opacity: 0.6,
    });
  });

  it("styles an idle edge", () => {
    assert.deepEqual(edgeStyle(false, false, false), {
      stroke: "var(--color-text-muted)",
      strokeWidth: 1,
      opacity: 0.3,
    });
  });

  it("styles a healthy (connected, no in-flight traffic) edge as static dim green", () => {
    assert.deepEqual(edgeStyle(false, false, false, true), {
      stroke: "var(--orch-status-success)",
      strokeWidth: 1.5,
      opacity: 0.4,
    });
  });

  it("defaults healthy to false so 3-arg callers stay idle", () => {
    assert.deepEqual(edgeStyle(false, false, false), {
      stroke: "var(--color-text-muted)",
      strokeWidth: 1,
      opacity: 0.3,
    });
  });

  it("applies precedence error > active > last > healthy", () => {
    assert.equal(edgeStyle(true, true, true).stroke, "var(--orch-status-error)"); // error wins
    assert.equal(edgeStyle(true, true, false).stroke, "var(--orch-status-success)"); // active beats last
    assert.equal(edgeStyle(false, false, true, true).stroke, "var(--orch-status-error)"); // error beats healthy
    assert.equal(edgeStyle(false, true, false, true).stroke, "var(--orch-status-warning)"); // last beats healthy
    // healthy green is dimmer/thinner than the active pulse green
    assert.equal(edgeStyle(false, false, false, true).opacity, 0.4);
    assert.equal(edgeStyle(true, false, false, true).opacity, 1); // active still wins
  });
});
