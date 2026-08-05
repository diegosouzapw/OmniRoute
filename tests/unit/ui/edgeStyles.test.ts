import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { edgeStyle, FLOW_EDGE_COLORS } from "../../../src/shared/components/flow/edgeStyles.ts";

/**
 * Shared flow edge palette + the calm-at-rest stroke contract.
 *
 * HISTORY — the at-rest opacities used to be much heavier (`last` 0.6, `idle` 0.3, and a
 * `healthy` base layer at 0.4) so that a configured-and-healthy connection stayed visibly
 * green between requests. That is deliberately retuned here: only a live call (`active`) or
 * a real `error` is allowed to stand out, and everything at rest collapses to a faint
 * hairline. With many providers the old values kept every connector prominent long after
 * traffic stopped, so "what is routing right now" had to compete with a wall of green.
 *
 * The colour language is unchanged (green = active, red = error, amber = last-used,
 * muted = idle) — only the weight of the resting states moved. The tests below pin the
 * exact values AND the relationships that make the design work, so a future retune cannot
 * quietly bring back a loud rest state.
 */

describe("flow edgeStyles (U0 — extracted from ProviderTopology)", () => {
  it("exposes the shared flow palette", () => {
    assert.equal(FLOW_EDGE_COLORS.active, "#22c55e");
    assert.equal(FLOW_EDGE_COLORS.error, "#ef4444");
    assert.equal(FLOW_EDGE_COLORS.last, "#f59e0b");
    assert.equal(FLOW_EDGE_COLORS.idle, "var(--color-text-muted)");
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

  it("styles a last-used edge as a fading amber hairline", () => {
    assert.deepEqual(edgeStyle(false, true, false), {
      stroke: "#f59e0b",
      strokeWidth: 1.25,
      opacity: 0.3,
    });
  });

  it("styles an idle edge as a barely-there muted hairline", () => {
    assert.deepEqual(edgeStyle(false, false, false), {
      stroke: "var(--color-text-muted)",
      strokeWidth: 1,
      opacity: 0.12,
    });
  });

  it("keeps a healthy-but-quiet edge faint rather than a green rest layer", () => {
    // The param survives for callers that still distinguish "configured and healthy" from
    // "unknown", but it must NOT reintroduce a prominent green at rest.
    assert.deepEqual(edgeStyle(false, false, false, true), {
      stroke: "#22c55e",
      strokeWidth: 1.25,
      opacity: 0.22,
    });
  });

  it("defaults healthy to false so 3-arg callers stay idle", () => {
    assert.deepEqual(edgeStyle(false, false, false), edgeStyle(false, false, false, false));
  });

  it("applies precedence error > active > last > healthy", () => {
    assert.equal(edgeStyle(true, true, true).stroke, "#ef4444"); // error wins
    assert.equal(edgeStyle(true, true, false).stroke, "#22c55e"); // active beats last
    assert.equal(edgeStyle(false, false, true, true).stroke, "#ef4444"); // error beats healthy
    assert.equal(edgeStyle(false, true, false, true).stroke, "#f59e0b"); // last beats healthy
    assert.equal(edgeStyle(true, false, false, true).opacity, 1); // active still wins
  });

  it("keeps every resting state quieter than live traffic", () => {
    // This is the actual calm-at-rest invariant: whatever the tuned numbers are, a live
    // call and a real error must dominate, and nothing at rest may approach them.
    const live = [edgeStyle(true, false, false), edgeStyle(false, false, true)];
    const resting = [
      edgeStyle(false, true, false), // last-used afterglow
      edgeStyle(false, false, false, true), // healthy, no traffic
      edgeStyle(false, false, false), // idle
    ];
    const quietestLive = Math.min(...live.map((s) => s.opacity));
    for (const style of resting) {
      assert.ok(
        style.opacity < quietestLive / 2,
        `a resting edge (opacity ${style.opacity}) must stay well below live traffic (${quietestLive})`
      );
      assert.ok(
        style.strokeWidth < Math.min(...live.map((s) => s.strokeWidth)),
        "a resting edge must also be thinner than any live edge"
      );
    }
  });
});
