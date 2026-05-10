import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  getRtkFilterLoadDiagnostics,
  getRtkFilterCatalog,
  loadRtkFilters,
  matchRtkFilter,
} from "../../../open-sse/services/compression/index.ts";

const originalCwd = process.cwd();
const originalDataDir = process.env.DATA_DIR;

function writeJson(filePath: string, value: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function customFilter(id: string, command: string) {
  return {
    id,
    label: id,
    category: "generic",
    priority: 100,
    match: { outputTypes: [], commands: [`^${command}\\b`], patterns: [id] },
    rules: { dropPatterns: ["^noise"], maxLines: 20, headLines: 10, tailLines: 10 },
    preserve: { errorPatterns: ["error"], summaryPatterns: [] },
    tests: [{ name: "sample", input: `noise\n${id}`, expected: id }],
  };
}

afterEach(() => {
  process.chdir(originalCwd);
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  delete process.env.OMNIROUTE_RTK_TRUST_PROJECT_FILTERS;
  loadRtkFilters({ refresh: true, customFiltersEnabled: false });
});

describe("RTK custom filter lookup and trust", () => {
  it("skips untrusted project filters and reports a diagnostic", () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-project-"));
    process.chdir(temp);
    writeJson(path.join(temp, ".rtk", "filters.json"), customFilter("project-filter", "customcmd"));

    const filters = loadRtkFilters({ refresh: true });
    const diagnostics = getRtkFilterLoadDiagnostics();

    assert.ok(!filters.some((filter) => filter.id === "project-filter"));
    assert.ok(diagnostics.some((entry) => entry.source === "project" && entry.level === "warning"));
  });

  it("loads trusted project filters before builtin filters", () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-project-"));
    const filterPath = path.join(temp, ".rtk", "filters.json");
    process.chdir(temp);
    writeJson(filterPath, customFilter("project-filter", "customcmd"));
    const hash = crypto
      .createHash("sha256")
      .update(fs.readFileSync(filterPath, "utf8"))
      .digest("hex");
    writeJson(path.join(temp, ".rtk", "trust.json"), { filtersSha256: hash });

    const filter = matchRtkFilter("project-filter", "customcmd");

    assert.equal(filter?.id, "project-filter");
  });

  it("loads global filters before builtin fallback filters", () => {
    const tempProject = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-project-"));
    const tempData = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-data-"));
    process.chdir(tempProject);
    process.env.DATA_DIR = tempData;
    writeJson(
      path.join(tempData, "rtk", "filters.json"),
      customFilter("global-filter", "globalcmd")
    );

    const filter = matchRtkFilter("global-filter", "globalcmd");

    assert.equal(filter?.id, "global-filter");
  });

  it("skips invalid custom filters and keeps the dashboard catalog lightweight", () => {
    const tempProject = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-project-"));
    const tempData = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-data-"));
    process.chdir(tempProject);
    process.env.DATA_DIR = tempData;
    fs.mkdirSync(path.join(tempData, "rtk"), { recursive: true });
    fs.writeFileSync(path.join(tempData, "rtk", "filters.json"), "{ invalid json");

    const filters = loadRtkFilters({ refresh: true });
    const diagnostics = getRtkFilterLoadDiagnostics();
    const catalog = getRtkFilterCatalog();

    assert.ok(filters.some((filter) => filter.id === "generic-output"));
    assert.ok(diagnostics.some((entry) => entry.source === "global" && entry.level === "warning"));
    assert.ok(catalog.every((entry) => !("stripPatterns" in entry)));
  });
});
