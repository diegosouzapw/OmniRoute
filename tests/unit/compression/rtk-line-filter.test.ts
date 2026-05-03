import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { loadRtkFilters, matchRtkFilter } from "../../../open-sse/services/compression/index.ts";
import { applyLineFilter } from "../../../open-sse/services/compression/engines/rtk/lineFilter.ts";

const FIXTURES = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "rtk");

function fixture(name: string): string {
  return readFileSync(path.join(FIXTURES, name), "utf8");
}

describe("RTK line filters", () => {
  it("loads and validates builtin filters", () => {
    const filters = loadRtkFilters({ refresh: true });

    assert.ok(filters.length >= 10);
    assert.ok(filters.some((filter) => filter.id === "json-output"));
  });

  it("matches filters by detected type", () => {
    assert.equal(matchRtkFilter(fixture("git-status-sample.txt"), "git status")?.id, "git-status");
    assert.equal(matchRtkFilter(fixture("vitest-output-sample.txt"), "vitest")?.id, "test-vitest");
    assert.equal(matchRtkFilter("plain text")?.id, "generic-output");
  });

  it("applies strip and keep patterns", () => {
    const filter = loadRtkFilters().find((item) => item.id === "git-status");
    assert.ok(filter);

    const result = applyLineFilter(fixture("git-status-sample.txt"), filter);
    assert.ok(result.appliedRules.includes("git-status:keep"));
    assert.ok(result.text.includes("On branch"));
    assert.ok(!result.text.includes("nothing added"));
  });
});
