import test from "node:test";
import assert from "node:assert/strict";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerCompressionEngine, unregisterCompressionEngine } from "../../../open-sse/services/compression/engines/registry.ts";
import type { CompressionEngine } from "../../../open-sse/services/compression/engines/types.ts";

const corruptor: CompressionEngine = {
  id: "corruptor",
  name: "Corruptor",
  description: "Test engine that drops port numbers",
  icon: "🔧",
  targets: ["messages"],
  stackable: true,
  stackPriority: 0,
  metadata: {
    id: "corruptor",
    name: "Corruptor",
    description: "Test engine that drops port numbers",
    inputScope: "messages",
    targetLatencyMs: 0,
    supportsPreview: false,
    stable: false,
  },
  apply(body) {
    const messages = (body.messages as Array<{ role: string; content: string }>).map((m) => ({
      ...m, content: m.content.replace("8080", ""),
    }));
    return {
      body: { ...body, messages }, compressed: true,
      stats: { originalTokens: 10, compressedTokens: 8, savingsPercent: 20,
        techniquesUsed: ["corrupt"], mode: "stacked", timestamp: 0 } as never,
    };
  },
  compress(body) {
    return this.apply(body);
  },
  getConfigSchema: () => ([]),
  validateConfig: () => ({ valid: true, errors: [] }),
};
const body = () => ({ messages: [{ role: "user", content: "listen on port 8080 now" }] });
test.beforeEach(() => registerCompressionEngine(corruptor));
test.after(() => unregisterCompressionEngine("corruptor"));

test("gate ON rejects the corrupting step (keeps input, marks rejected)", () => {
  const res = applyStackedCompression(body(), [{ engine: "corruptor" }], { fidelityGate: { enabled: true } });
  const msg = (res.body.messages as Array<{ content: string }>)[0].content;
  assert.ok(msg.includes("8080"), "input preserved — corrupting step was rejected");
  const entry = res.stats?.engineBreakdown?.find((e) => e.engine === "corruptor");
  assert.equal(entry?.rejected, true);
  assert.equal(entry?.savingsPercent, 0);
});
test("gate OFF (absent) is byte-identical legacy — corrupting step advances", () => {
  const res = applyStackedCompression(body(), [{ engine: "corruptor" }]);
  const msg = (res.body.messages as Array<{ content: string }>)[0].content;
  assert.ok(!msg.includes("8080"), "no gate → corrupting step advances");
  const entry = res.stats?.engineBreakdown?.find((e) => e.engine === "corruptor");
  assert.notEqual(entry?.rejected, true);
});

const cleanEngine: CompressionEngine = {
  ...corruptor, id: "cleanish",
  apply(body) {
    // produces stats + advances, does NOT corrupt (keeps 8080)
    return { body, compressed: true, stats: { originalTokens: 10, compressedTokens: 9, savingsPercent: 10, techniquesUsed: ["clean"], mode: "stacked", timestamp: 0 } as never };
  },
};
const noStatsCorruptor: CompressionEngine = {
  ...corruptor, id: "nostats",
  apply(body) {
    const messages = (body.messages as Array<{ role: string; content: string }>).map((m) => ({ ...m, content: m.content.replace("8080", "") }));
    return { body: { ...body, messages }, compressed: true, stats: null as never }; // compressed:true but NO stats
  },
};

test("a no-stats rejected step does not wrongly mark the prior engine's breakdown entry", () => {
  registerCompressionEngine(cleanEngine);
  registerCompressionEngine(noStatsCorruptor);
  try {
    const res = applyStackedCompression(
      { messages: [{ role: "user", content: "listen on port 8080 now" }] },
      [{ engine: "cleanish" }, { engine: "nostats" }],
      { fidelityGate: { enabled: true } }
    );
    const cleanEntry = res.stats?.engineBreakdown?.find((e) => e.engine === "cleanish");
    assert.notEqual(cleanEntry?.rejected, true, "prior clean engine must NOT be marked rejected by the no-stats step");
  } finally {
    unregisterCompressionEngine("cleanish");
    unregisterCompressionEngine("nostats");
  }
});
