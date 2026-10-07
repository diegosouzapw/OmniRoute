import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildChecks } from "../../scripts/check/check-docs-counts-sync.mjs";

type Check = {
  label?: string;
  docKey?: string;
  actual?: unknown;
  strict?: boolean;
  files?: string[];
  validate?: (content: string, claim?: string) => { ok: boolean; detail: string };
};

describe("free provider rankings sort key + catalog date", () => {
  it("freeProviderRankings.ts declares sortBy elo|reliability and MIN_USAGE_REQUESTS=5", () => {
    const txt = readFileSync("src/lib/freeProviderRankings.ts", "utf8");
    assert.match(txt, /MIN_USAGE_REQUESTS\s*=\s*5/);
    assert.match(txt, /sortBy\?\s*:\s*"elo"\s*\|\s*"reliability"/);
  });
  it("free-provider-rankings route carries z.enum elo/reliability", () => {
    const txt = readFileSync("src/app/api/free-provider-rankings/route.ts", "utf8");
    assert.match(txt, /z\.enum\(\["elo",\s*"reliability"\]\)/);
  });
  it("freeModelCatalog.data.ts carries FREE_CATALOG_CURATED_AT literal", () => {
    const txt = readFileSync("open-sse/config/freeModelCatalog.data.ts", "utf8");
    assert.match(txt, /export const FREE_CATALOG_CURATED_AT\s*=\s*"\d{4}-\d{2}-\d{2}"/);
  });
  it("buildChecks exposes rankings sortBy strict + FREE_CATALOG_CURATED_AT soft", () => {
    const checks = buildChecks() as Check[];
    const rankings = checks.find(
      (c) =>
        String(c.docKey ?? "").includes("rankings sortBy") ||
        String(c.label ?? "").includes("rankings sortBy")
    );
    const curatedAt = checks.find(
      (c) =>
        String(c.docKey ?? "").includes("FREE_CATALOG_CURATED_AT") ||
        String(c.label ?? "").includes("FREE_CATALOG_CURATED_AT")
    );
    assert.ok(rankings, "rankings sortBy entry missing");
    assert.equal(rankings.strict, true, "rankings sortBy must be strict");
    assert.ok(curatedAt, "FREE_CATALOG_CURATED_AT entry missing");
    assert.equal(curatedAt.strict, false, "catalog date must be soft");
  });
  it("summary route references FREE_CATALOG_CURATED_AT with slice(0, 10)", () => {
    const txt = readFileSync("src/app/api/free-tier/summary/route.ts", "utf8");
    assert.match(txt, /FREE_CATALOG_CURATED_AT/);
    assert.match(txt, /slice\(0,\s*10\)/);
  });
  it("rankings sortBy gate fails closed on ELO-only comparator", () => {
    const checks = buildChecks() as Check[];
    const rankings = checks.find((c) => String(c.docKey ?? "").includes("rankings sortBy"));
    // ELO-only code with "reliability" only in a comment: a validator that merely looks for
    // the literal would pass, so this must fail.
    const content = 'sortBy?: "elo"; // reliability removed, ELO-only regression';
    const v = rankings!.validate!(content);
    assert.equal(v.ok, false, "gate must fail on ELO-only content");
  });
  it("rankings sortBy gate passes on live reliability code (both files)", () => {
    const checks = buildChecks() as Check[];
    const rankings = checks.find((c) => String(c.docKey ?? "").includes("rankings sortBy"));
    for (const f of [
      "src/lib/freeProviderRankings.ts",
      "src/app/api/free-provider-rankings/route.ts",
    ]) {
      const v = rankings!.validate!(readFileSync(f, "utf8"));
      assert.equal(v.ok, true, `gate must pass on live ${f}`);
    }
  });
});
