// Unit tests for passthrough test-all helpers (Issue #3610).
//
// These helpers capture the three-bug fix:
//   1. `autoHideFailed` must be threaded into the request body so the server
//      persists the hide (was missing → server never hid models).
//   2. `shouldSwitchToVisibleFilter` must return true when ≥1 model was hidden
//      so the component switches to "visible" filter and the user sees the
//      models disappear (was missing → models stayed on-screen even after hide).
//
// Pure-function tests — no DOM, no component rendering.
import { describe, expect, it } from "vitest";
import {
  buildPassthroughTestBody,
  shouldSwitchToVisibleFilter,
} from "../providerPageHelpers";

// ---------------------------------------------------------------------------
// buildPassthroughTestBody
// ---------------------------------------------------------------------------
describe("buildPassthroughTestBody", () => {
  it("includes autoHideFailed=true when the flag is enabled", () => {
    const body = buildPassthroughTestBody({
      providerId: "opencode",
      connectionId: "conn-1",
      modelId: "gpt-4o",
      autoHideFailed: true,
    });

    expect(body.autoHideFailed).toBe(true);
    expect(body.modelIds).toEqual(["gpt-4o"]);
    expect(body.providerId).toBe("opencode");
    expect(body.connectionId).toBe("conn-1");
  });

  it("includes autoHideFailed=false when the flag is disabled", () => {
    const body = buildPassthroughTestBody({
      providerId: "opencode",
      connectionId: "conn-1",
      modelId: "gpt-4o",
      autoHideFailed: false,
    });

    expect(body.autoHideFailed).toBe(false);
  });

  it("wraps modelId in a single-element array", () => {
    const body = buildPassthroughTestBody({
      providerId: "p",
      connectionId: "c",
      modelId: "some-model",
      autoHideFailed: true,
    });

    expect(body.modelIds).toHaveLength(1);
    expect(body.modelIds[0]).toBe("some-model");
  });
});

// ---------------------------------------------------------------------------
// shouldSwitchToVisibleFilter
// ---------------------------------------------------------------------------
describe("shouldSwitchToVisibleFilter", () => {
  it("returns true when autoHideFailed is enabled and at least one model was hidden", () => {
    expect(shouldSwitchToVisibleFilter({ autoHideFailed: true, hiddenCount: 1 })).toBe(true);
    expect(shouldSwitchToVisibleFilter({ autoHideFailed: true, hiddenCount: 5 })).toBe(true);
  });

  it("returns false when autoHideFailed is enabled but no model was hidden", () => {
    expect(shouldSwitchToVisibleFilter({ autoHideFailed: true, hiddenCount: 0 })).toBe(false);
  });

  it("returns false when autoHideFailed is disabled even if models were hidden", () => {
    expect(shouldSwitchToVisibleFilter({ autoHideFailed: false, hiddenCount: 3 })).toBe(false);
  });

  it("returns false when both flag and count are falsy", () => {
    expect(shouldSwitchToVisibleFilter({ autoHideFailed: false, hiddenCount: 0 })).toBe(false);
  });
});
