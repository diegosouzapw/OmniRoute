/**
 * Regression: the vision-category candidate filter must exclude registry
 * entries whose catalog OVERSTATES vision support (opencode-go/opencode-zen/
 * tokenrouter backends are text-only and are forced through the vision bridge
 * by isVisionBridgeForcedModel). Otherwise vision pools include models that
 * can never process images, breaking the vision bridge describe/reroute.
 */
import { describe, it, expect } from "vitest";
import { buildAutoCandidateFilter } from "../../../open-sse/services/autoCombo/suffixComposition";

describe("buildAutoCandidateFilter — vision category", () => {
  it("keeps genuinely vision-capable models", () => {
    const filter = buildAutoCandidateFilter("vision");
    expect(filter).not.toBeNull();
    // A real multimodal model (matches the shared vision-model list,
    // case-insensitively).
    expect(filter?.({ provider: "minimax", model: "minimax-m3" })).toBe(true);
  });

  it("rejects models whose catalog entry overstates vision", () => {
    const filter = buildAutoCandidateFilter("vision");
    // The backend is text-only: the bridge claims these models.
    expect(filter?.({ provider: "opencode-go", model: "deepseek-v4-flash" })).toBe(false);
    expect(filter?.({ provider: "opencode-go", model: "deepseek-v4-pro" })).toBe(false);
    expect(filter?.({ provider: "opencode-zen", model: "deepseek-v4-flash" })).toBe(false);
  });

  it("excludes bridge-forced vision models", () => {
    const filter = buildAutoCandidateFilter("vision");
    expect(filter).not.toBeNull();
    // Present in the forced set — the catalog claims vision but the backend
    // is text-only. Same verdict with and without the resolved vision flag:
    // the pre-resolved branch must agree with the on-demand one.
    const forced = [
      { provider: "opencode-go", model: "deepseek-v4-flash" },
      { provider: "opencode-go", model: "deepseek-v4-pro" },
      { provider: "opencode-zen", model: "deepseek-v4-flash" },
    ];
    for (const candidate of forced) {
      expect(filter?.(candidate)).toBe(false);
      expect(filter?.({ ...candidate, resolvedSupportsVision: true })).toBe(false);
      expect(filter?.({ ...candidate, resolvedSupportsVision: true })).toBe(filter?.(candidate));
    }
    expect(
      filter?.({ provider: "minimax", model: "minimax-m3", resolvedSupportsVision: true })
    ).toBe(true);
  });

  it("rejects models with no confirmed vision support", () => {
    const filter = buildAutoCandidateFilter("vision");
    // Unknown catalog entry → no confirmed vision → must be rejected.
    expect(filter?.({ provider: "acme", model: "acme-text" })).toBe(false);
  });

  it("non-vision categories are unaffected", () => {
    const filter = buildAutoCandidateFilter("coding");
    expect(filter).toBeNull();
  });
});
