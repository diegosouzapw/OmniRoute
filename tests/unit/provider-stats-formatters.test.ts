import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  getComboMetrics,
  recordComboRequest,
  resetAllComboMetrics,
} from "../../open-sse/services/comboMetrics.ts";
import { formatComboSuccessRate } from "../../src/lib/usage/providerStatsFormatters.ts";

test.after(resetAllComboMetrics);

test("formatComboSuccessRate preserves the producer's 0-100 percentage scale", () => {
  resetAllComboMetrics();
  recordComboRequest("format-test", "openai/gpt-4o-mini", {
    success: true,
    latencyMs: 10,
  });

  const metrics = getComboMetrics("format-test");
  assert.ok(metrics);
  assert.equal(metrics.successRate, 100);
  assert.equal(formatComboSuccessRate(metrics.successRate), "100.0%");
  assert.equal(formatComboSuccessRate(50), "50.0%");
  assert.equal(formatComboSuccessRate(0), "0.0%");
});

test("Provider Stats renders combo metrics through the percentage-scale formatter", () => {
  const source = fs.readFileSync(
    path.resolve("src/app/(dashboard)/dashboard/provider-stats/page.tsx"),
    "utf8"
  );

  assert.match(source, /formatComboSuccessRate\(m\.successRate\)/);
  assert.doesNotMatch(source, /m\.successRate\s*\*\s*100/);
});
