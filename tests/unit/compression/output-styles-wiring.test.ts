import { test } from "node:test";
import assert from "node:assert/strict";
import { buildOutputStyleTelemetry } from "../../../open-sse/services/compression/outputStyles/telemetry.ts";

test("builds a telemetry record from an applied result", () => {
  const rec = buildOutputStyleTelemetry({
    requestId: "req-1",
    model: "gpt-4o",
    provider: "openai",
    source: "active-profile",
    tokensBefore: 1000,
    tokensAfter: 1000,
    applied: true,
    appliedStyles: [{ id: "terse-prose", level: "full" }],
  });
  assert.equal(rec.requestId, "req-1");
  assert.equal(rec.ratio, 1);
  assert.deepEqual(rec.outputStyles, [{ id: "terse-prose", level: "full" }]);
  assert.equal(rec.outputStyleBypass, undefined);
});

test("records the bypass reason and omits styles when bypassed", () => {
  const rec = buildOutputStyleTelemetry({
    requestId: "req-2",
    model: "m",
    provider: "p",
    source: "default",
    tokensBefore: 500,
    tokensAfter: 500,
    applied: false,
    skippedReason: "security_warning",
  });
  assert.equal(rec.outputStyleBypass, "security_warning");
  assert.equal(rec.outputStyles, undefined);
});

test("does not treat a benign skip (disabled/no_styles) as a bypass", () => {
  const rec = buildOutputStyleTelemetry({
    requestId: "req-3",
    model: "m",
    provider: "p",
    source: "off",
    tokensBefore: 0,
    tokensAfter: 0,
    applied: false,
    skippedReason: "no_styles",
  });
  assert.equal(rec.outputStyleBypass, undefined);
});
