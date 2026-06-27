// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { runPreviewBatch } from "@/hooks/usePreviewCompression";
beforeEach(() => vi.restoreAllMocks());
describe("runPreviewBatch fidelityGate", () => {
  it("includes fidelityGate:{enabled:true} in every preview payload when on", async () => {
    const payloads: any[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_u: string, init: any) => {
      payloads.push(JSON.parse(init.body));
      return { ok: true, json: async () => ({
        original: "o", compressed: "c", originalTokens: 5, compressedTokens: 5, savingsPct: 0,
        mode: "stacked", durationMs: 1, engineBreakdown: [], diff: [], preservedBlocks: [], ruleRemovals: [],
      }) } as any;
    }));
    await runPreviewBatch({
      messages: [{ role: "user", content: "x" }],
      laneEngines: ["rtk"], activeEngines: ["rtk"], fidelityGate: true,
    });
    expect(payloads.length).toBe(2); // 1 lane + 1 combined
    expect(payloads.every((p) => p.fidelityGate?.enabled === true)).toBe(true);
  });
});
