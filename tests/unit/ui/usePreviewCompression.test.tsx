import { describe, it, expect, vi, beforeEach } from "vitest";
import { runPreviewBatch } from "@/hooks/usePreviewCompression";
beforeEach(() => vi.restoreAllMocks());
describe("runPreviewBatch", () => {
  it("calls /preview once per engine (engineId) + once combined (pipeline) and maps results", async () => {
    const calls: any[] = [];
    const fetchMock = vi.fn(async (_url: string, init: any) => {
      const body = JSON.parse(init.body); calls.push(body);
      const label = body.engineId ?? `combo:${(body.pipeline ?? []).join("+")}`;
      return { ok: true, json: async () => ({
        original: "o", compressed: "c", originalTokens: 10, compressedTokens: 5, savingsPct: 50, mode: "stacked", durationMs: 1,
        engineBreakdown: [{ engine: label, originalTokens: 10, compressedTokens: 5, savingsPercent: 50, techniquesUsed: [] }],
        diff: [], preservedBlocks: [], ruleRemovals: [], validation: { valid: true, errors: [], warnings: [], fallbackApplied: false },
      }) } as any;
    });
    vi.stubGlobal("fetch", fetchMock);
    const out = await runPreviewBatch({ messages: [{ role: "user", content: "hi" }], laneEngines: ["rtk", "caveman"], activeEngines: ["rtk", "caveman"] });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(calls.filter((c) => c.engineId).length).toBe(2);
    expect(calls.filter((c) => c.pipeline).length).toBe(1);
    expect(out.lanes.map((l) => l.engine)).toEqual(["rtk", "caveman"]);
    expect(out.combined?.savingsPercent).toBe(50);
  });
  it("fails open: a lane whose fetch rejects yields an errored lane, not a throw", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network"); }));
    const out = await runPreviewBatch({ messages: [{ role: "user", content: "hi" }], laneEngines: ["rtk"], activeEngines: [] });
    expect(out.lanes[0].error).toBeTruthy();
    expect(out.combined).toBeNull();
  });
  it("combined call is fail-open: throwing fetch with active engines yields combined:null", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("network"); }));
    const out = await runPreviewBatch({ messages: [{ role: "user", content: "hi" }], laneEngines: ["rtk"], activeEngines: ["rtk"] });
    expect(out.lanes[0].error).toBeTruthy();
    expect(out.combined).toBeNull();
  });
});
