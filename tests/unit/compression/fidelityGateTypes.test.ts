import test from "node:test";
import assert from "node:assert/strict";
import type { CompressionConfig, CompressionStats } from "../../../open-sse/services/compression/types.ts";
import type { FidelityGateConfig } from "../../../open-sse/services/compression/fidelityGate.ts";
test("CompressionConfig accepts a fidelityGate block and breakdown carries rejected fields", () => {
  const cfg: CompressionConfig = { fidelityGate: { enabled: true } as FidelityGateConfig };
  assert.equal(cfg.fidelityGate?.enabled, true);
  const entry: NonNullable<CompressionStats["engineBreakdown"]>[number] = {
    engine: "caveman", originalTokens: 10, compressedTokens: 10, savingsPercent: 0,
    techniquesUsed: [], rejected: true, rejectReason: "numeric: 14 ausente",
  };
  assert.equal(entry.rejected, true);
});
