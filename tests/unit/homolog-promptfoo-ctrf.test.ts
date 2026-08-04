import { test } from "node:test";
import assert from "node:assert/strict";
import { promptfooToCtrf } from "../../scripts/homolog/lib/promptfooToCtrf.mjs";

test("mapeia resultados do promptfoo para tests CTRF", () => {
  const ctrf = promptfooToCtrf({
    results: {
      results: [
        { provider: { label: "openai" }, success: true, latencyMs: 812 },
        { provider: { label: "grok" }, success: false, latencyMs: 30000, error: "timeout" },
      ],
    },
  });
  assert.equal(ctrf.results.summary.tests, 2);
  assert.equal(ctrf.results.summary.passed, 1);
  assert.equal(ctrf.results.tests[1].status, "failed");
  assert.equal(ctrf.results.tests[1].name, "provider-smoke: grok");
});
