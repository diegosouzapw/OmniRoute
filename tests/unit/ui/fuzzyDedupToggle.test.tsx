// @vitest-environment jsdom
// tests/unit/ui/fuzzyDedupToggle.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { runPreviewBatch } from "@/hooks/usePreviewCompression";
beforeEach(() => vi.restoreAllMocks());
describe("runPreviewBatch fuzzyDedup", () => {
  it("includes fuzzyDedup:{enabled:true} in every preview payload when on", async () => {
    const payloads: any[] = [];
    vi.stubGlobal("fetch", vi.fn(async (_u: string, init: any) => {
      payloads.push(JSON.parse(init.body));
      return { ok: true, json: async () => ({
        original: "o", compressed: "c", originalTokens: 5, compressedTokens: 5, savingsPct: 0,
        mode: "stacked", durationMs: 1, engineBreakdown: [], diff: [], preservedBlocks: [], ruleRemovals: [],
      }) } as any;
    }));
    await runPreviewBatch({
      messages: [{ role: "user", content: "x" }], laneEngines: ["session-dedup"], activeEngines: ["session-dedup"], fuzzyDedup: true,
    });
    expect(payloads.length).toBe(2);
    expect(payloads.every((p) => p.fuzzyDedup?.enabled === true)).toBe(true);
  });
});
