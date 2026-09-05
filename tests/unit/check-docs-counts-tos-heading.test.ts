import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildChecks } from "../../scripts/check/check-docs-counts-sync.mjs";

describe("ToS caution heading count", () => {
  it("heading line 86 carries (16)", () => {
    const txt = readFileSync(join(process.cwd(), "docs/reference/FREE_TIERS.md"), "utf8");
    const line86 = txt.split("\n")[85];
    assert.match(line86, /\(\s*16\s*\)/);
    assert.match(line86, /Caution/);
  });
  it("buildChecks exposes a soft ToS entry on FREE_TIERS.md with requireClaim", () => {
    const checks = buildChecks() as any[];
    const tos = checks.find((c) => String(c.docKey ?? "").includes("ToS caution") || String(c.label ?? "").includes("ToS caution"));
    assert.ok(tos, "missing ToS caution entry");
    assert.equal(tos.strict, false);
    assert.ok((tos.files as string[]).includes("docs/reference/FREE_TIERS.md"));
    const doc = readFileSync("docs/reference/FREE_TIERS.md", "utf8");
    const v = tos.validate!(doc, "ToS caution (16):(16)");
    assert.equal(v.ok, true);
  });
  it("FREE_TIERS.md no longer uses legacy providers ToS-flagged phrasing", () => {
    const txt = readFileSync("docs/reference/FREE_TIERS.md", "utf8");
    assert.equal(/providers ToS-flagged/i.test(txt), false);
  });
});
