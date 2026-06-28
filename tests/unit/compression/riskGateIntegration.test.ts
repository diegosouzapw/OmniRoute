/**
 * TDD for risk-gate end-to-end: shields a secret through a REAL engine,
 * and is byte-identical to baseline when disabled.
 * Run: node --import tsx/esm --test tests/unit/compression/riskGateIntegration.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerBuiltinCompressionEngines } from "../../../open-sse/services/compression/engines/index.ts";

registerBuiltinCompressionEngines();

const PEM = "-----BEGIN PRIVATE KEY-----\nMIIBVQ0123456789abcdefBODY\n-----END PRIVATE KEY-----";
const longProse = ("The quick brown fox jumps over the lazy dog. ".repeat(20)).trim();

function body() {
  return { messages: [{ role: "user", content: `${longProse}\n${PEM}\n${longProse}` }] };
}

describe("risk-gate integration", () => {
  it("keeps the PEM byte-identical while compressing surrounding prose (real caveman)", () => {
    const res = applyStackedCompression(body(), [{ engine: "caveman", intensity: "full" }], {
      riskGate: { enabled: true },
    });
    const out = (res.body.messages as Array<{ content: string }>)[0].content;
    assert.ok(out.includes(PEM), "secret survived verbatim");
    assert.ok(!out.includes("OMNI_CAVEMAN"), "no placeholder leaked into output");
    assert.equal(res.stats?.riskGate?.spansProtected, 1);
    assert.equal(res.stats?.riskGate?.categories.private_key, 1);
  });

  it("is byte-identical to the no-gate baseline when disabled", () => {
    const withoutOpt = applyStackedCompression(body(), [{ engine: "caveman", intensity: "full" }]);
    const disabled = applyStackedCompression(body(), [{ engine: "caveman", intensity: "full" }], {
      riskGate: { enabled: false },
    });
    assert.equal(
      (disabled.body.messages as Array<{ content: string }>)[0].content,
      (withoutOpt.body.messages as Array<{ content: string }>)[0].content
    );
    assert.equal(disabled.stats?.riskGate, undefined);
  });
});
