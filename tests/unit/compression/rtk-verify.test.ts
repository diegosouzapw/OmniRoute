import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadRtkFilters, runRtkFilterTests } from "../../../open-sse/services/compression/index.ts";

const RTK_FIXTURES = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "rtk");
const PARITY_FILTER_IDS = [
  "git-branch",
  "make",
  "terraform-plan",
  "tofu-plan",
  "docker-logs",
  "systemctl-status",
  "biome",
  "prettier",
  "turbo",
  "nx",
  "playwright",
  "ruff",
  "mypy",
  "pip",
  "uv-sync",
  "poetry-install",
  "test-go",
  "golangci-lint",
  "test-cargo",
  "bundle-install",
  "rubocop",
  "aws",
  "gcloud",
  "ssh",
  "rsync",
  "curl",
  "wget",
  "shell-grep",
  "shell-find",
  "ps",
  "df",
  "du",
  "build-webpack",
  "build-vite",
  "npm-audit",
  "error-stacktrace",
];

describe("RTK verify and benchmark gate", () => {
  it("requires inline tests for every builtin filter", () => {
    const filters = loadRtkFilters({ refresh: true, customFiltersEnabled: false });
    const result = runRtkFilterTests({ requireAll: true, customFiltersEnabled: false });

    assert.ok(filters.length >= 35);
    assert.equal(result.filtersWithoutTests.length, 0);
    assert.equal(result.passed, true);
    assert.ok(result.outcomes.length >= filters.length);
  });

  it("reports benchmark savings by category without shell, network, or DB", () => {
    const result = runRtkFilterTests({ requireAll: true, customFiltersEnabled: false });

    assert.ok(result.benchmark.length >= 5);
    assert.ok(result.benchmark.some((row) => row.category === "test" && row.tests > 0));
    assert.ok(result.benchmark.some((row) => row.category === "build" && row.filters > 0));
    for (const row of result.benchmark) {
      assert.ok(Number.isFinite(row.averageSavingsPercent));
    }
  });

  it("ships fixture samples for the parity filter expansion", () => {
    for (const id of PARITY_FILTER_IDS) {
      const fixturePath = path.join(RTK_FIXTURES, `${id}-sample.txt`);
      assert.ok(fs.existsSync(fixturePath), `missing fixture for ${id}`);
      assert.ok(fs.readFileSync(fixturePath, "utf8").trim().length > 0);
    }
  });
});
