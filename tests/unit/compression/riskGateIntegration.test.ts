/**
 * TDD for risk-gate end-to-end: shields a secret through a REAL engine,
 * and is byte-identical to baseline when disabled.
 * Run: node --import tsx/esm --test tests/unit/compression/riskGateIntegration.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

// Isolate the preview-route call below from the operator's real ~/.omniroute DB:
// a fresh empty DATA_DIR with no INITIAL_PASSWORD means isAuthRequired() is false,
// so the management-auth gate lets the request through (matches previewRouteFidelity).
process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "preview-riskgate-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "test-secret-32-chars-min-aaaaaaaa";
delete process.env.INITIAL_PASSWORD;

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

describe("preview route — riskGate", () => {
  it("accepts riskGate and returns protected-span stats", async () => {
    // Dynamic import so the DATA_DIR env above is in effect before the route's DB-path
    // module resolves — guaranteeing the fresh temp DB (setupComplete=false), which means
    // the loopback request below needs no management auth. (Mirrors previewRouteFidelity.)
    const { POST: previewPOST } = await import(
      "../../../src/app/api/compression/preview/route.ts"
    );
    const req = new Request("http://localhost/api/compression/preview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: `${PEM}` }],
        engineId: "caveman",
        riskGate: { enabled: true },
      }),
    });
    const res = await previewPOST(req as never);
    const json = (await res.json()) as { riskGate?: { spansProtected: number }; compressed: string };
    assert.equal(json.riskGate?.spansProtected, 1);
    assert.ok(json.compressed.includes(PEM), "secret preserved in preview output");
  });
});
