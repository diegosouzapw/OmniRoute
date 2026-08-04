import { describe, it, expect } from "vitest";
import { previewToRunModel, type PreviewResponse } from "@/app/(dashboard)/dashboard/compression/studio/compressionFlowModel";
const sample: PreviewResponse = {
  original: "user: hello world foo bar", compressed: "user: hello world",
  originalTokens: 6, compressedTokens: 3, savingsPct: 50, mode: "stacked", durationMs: 5,
  engineBreakdown: [
    { engine: "rtk", originalTokens: 6, compressedTokens: 4, savingsPercent: 33, techniquesUsed: ["dedup"] },
    { engine: "caveman", originalTokens: 4, compressedTokens: 3, savingsPercent: 25, techniquesUsed: ["filler"] },
  ],
  diff: [{ type: "same", text: "hello world" }, { type: "removed", text: " foo bar" }],
  preservedBlocks: [], ruleRemovals: [],
};
describe("previewToRunModel", () => {
  it("maps engineBreakdown → steps and keeps the diff", () => {
    const model = previewToRunModel(sample, "rtk → caveman");
    expect(model.steps).toHaveLength(2);
    expect(model.steps[0].engine).toBe("rtk");
    expect(model.originalTokens).toBe(6);
    expect(model.compressedTokens).toBe(3);
    expect(model.savingsPercent).toBe(50);
    expect(model.diff).toEqual(sample.diff);
    expect(model.mode).toBe("stacked");
  });
});
