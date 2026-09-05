import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildChecks } from "../../scripts/check/check-docs-counts-sync.mjs";

describe("quality neutral prose", () => {
  it("AUTO-COMBO.md prose carries quality neutral 0.5", () => {
    const doc = readFileSync("docs/routing/AUTO-COMBO.md", "utf8");
    assert.match(doc, /quality.*neutral.*0\.5/i);
    assert.match(doc, /quality.*0\.5/);
  });

  it("buildChecks exposes a soft entry for quality neutral prose", () => {
    const checks = buildChecks() as any[];
    const entry = checks.find(
      (c) =>
        String(c.docKey ?? "").includes("quality neutral") ||
        String(c.label ?? "").toLowerCase().includes("quality neutral")
    );
    assert.ok(entry, "quality neutral entry missing from buildChecks");
    assert.equal(entry.strict, false, "quality neutral entry must be soft");
    assert.ok(
      (entry.files as string[]).includes("docs/routing/AUTO-COMBO.md"),
      "must gate docs/routing/AUTO-COMBO.md"
    );
    const doc = readFileSync("docs/routing/AUTO-COMBO.md", "utf8");
    const res = entry.validate!(doc);
    assert.equal(res.ok, true, `expected soft gate to pass on current doc: ${res.detail}`);
    const silent = "no mention of quality at all";
    const r2 = entry.validate!(silent);
    assert.equal(r2.ok, false, "reworded-away prose must fail");
  });
});
