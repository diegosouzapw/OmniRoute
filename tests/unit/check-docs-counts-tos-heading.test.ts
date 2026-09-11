import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildChecks } from "../../scripts/check/check-docs-counts-sync.mjs";

type Check = {
  label?: string;
  docKey?: string;
  actual?: unknown;
  strict?: boolean;
  files?: string[];
  validate?: (content: string, claim?: string) => { ok: boolean; detail: string };
};

/** Escape a value that is interpolated into a RegExp source. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

describe("ToS caution heading count", () => {
  it("the Caution heading carries the count the gate checks", () => {
    const txt = readFileSync(join(process.cwd(), "docs/reference/FREE_TIERS.md"), "utf8");
    const heading = txt.split("\n").find((line) => /^#+ .*Caution/.test(line));
    assert.ok(heading, "FREE_TIERS.md must keep its Caution heading");
    const tos = (buildChecks() as Check[]).find((c) =>
      String(c.docKey ?? "").includes("ToS caution")
    );
    // The backslashes must survive the TEMPLATE LITERAL to reach the regex.
    // Written as `\(\s*…` they did not: JS resolves `\(` to "(" and `\s` to the
    // LETTER "s" before RegExp ever sees them, so the pattern compiled to
    // `(s*16s*)` — a capture group around optional "s" characters. That matched
    // any heading merely containing the number, with no literal parentheses
    // required at all, so this guard passed on headings it was written to reject
    // (CodeQL js/useless-regexp-character-escape #994-#997).
    const count = escapeRegExp(String(tos?.actual));
    assert.match(heading, new RegExp(`\\(\\s*${count}\\s*\\)`));
  });

  it("the heading guard actually requires the parentheses", () => {
    // Pins the defect above: the pattern this test builds must REJECT a heading
    // that carries the count without parentheses. Before the fix it accepted it.
    const pattern = new RegExp(`\\(\\s*${escapeRegExp("16")}\\s*\\)`);
    assert.equal(pattern.test("### Caution — clauses worth checking 16"), false);
    assert.equal(pattern.test("### Caution — clauses worth checking (16)"), true);
    assert.equal(pattern.test("### Caution — clauses worth checking ( 16 )"), true);
  });
  it("buildChecks exposes a soft ToS entry on FREE_TIERS.md with requireClaim", () => {
    const checks = buildChecks() as Check[];
    const tos = checks.find(
      (c) =>
        String(c.docKey ?? "").includes("ToS caution") ||
        String(c.label ?? "").includes("ToS caution")
    );
    assert.ok(tos, "missing ToS caution entry");
    assert.equal(tos.strict, false);
    assert.ok((tos.files ?? []).includes("docs/reference/FREE_TIERS.md"));
    const doc = readFileSync("docs/reference/FREE_TIERS.md", "utf8");
    const v = tos.validate!(doc, "ToS caution (16):(16)");
    assert.equal(v.ok, true);
  });
  it("FREE_TIERS.md no longer uses legacy providers ToS-flagged phrasing", () => {
    const txt = readFileSync("docs/reference/FREE_TIERS.md", "utf8");
    assert.equal(/providers ToS-flagged/i.test(txt), false);
  });
});
