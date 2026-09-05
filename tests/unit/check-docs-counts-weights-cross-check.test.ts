import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildChecks } from "../../scripts/check/check-docs-counts-sync.mjs";

describe("routing weights cross-check (soft)", () => {
  it("scoring.ts DEFAULT_WEIGHTS and intelligentRouting.ts DEFAULT_INTELLIGENT_WEIGHTS exist", () => {
    assert.match(readFileSync("open-sse/services/autoCombo/scoring.ts", "utf8"), /DEFAULT_WEIGHTS/);
    assert.match(readFileSync("src/lib/combos/intelligentRouting.ts", "utf8").split("\n")[51], /DEFAULT_INTELLIGENT_WEIGHTS/);
  });
  it("buildChecks exposes a soft INTELLIGENT keys vs DEFAULT entry", () => {
    const checks = buildChecks() as any[];
    const w = checks.find((c) => String(c.docKey ?? "").includes("INTELLIGENT vs DEFAULT") || String(c.label ?? "").includes("INTELLIGENT vs DEFAULT"));
    assert.ok(w, "INTELLIGENT vs DEFAULT entry missing");
    assert.equal(w.strict, false);
    assert.ok(Array.isArray(w.files) && w.files.length > 0);
  });
  it("combo-scoring-weights-schema-coverage:66 still exists and references DEFAULT_INTELLIGENT_WEIGHTS", () => {
    const txt = readFileSync("tests/unit/combo-scoring-weights-schema-coverage.test.ts", "utf8");
    assert.ok(txt.split("\n")[65], "line 66 is empty");
    assert.match(txt, /DEFAULT_INTELLIGENT_WEIGHTS/);
  });
  it("no MIN_USAGE gate exists (documented as not gated separately)", () => {
    const checks = buildChecks() as any[];
    const m = checks.find((c) => String(c.docKey ?? "").includes("MIN_USAGE") || String(c.label ?? "").includes("MIN_USAGE"));
    assert.equal(m, undefined);
  });
});
