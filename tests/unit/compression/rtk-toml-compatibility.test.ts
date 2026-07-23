import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { applyLineFilter } from "../../../open-sse/services/compression/engines/rtk/lineFilter.ts";
import {
  getRtkFilterCatalog,
  getRtkFilterLoadDiagnostics,
  loadRtkFilters,
  matchRtkFilter,
} from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";
import {
  installGlobalRtkTomlV1,
  parseRtkTomlV1,
  RtkTomlCompatibilityError,
} from "../../../open-sse/services/compression/engines/rtk/tomlCompatibility.ts";

const originalCwd = process.cwd();
const originalDataDir = process.env.DATA_DIR;

const SAMPLE = `schema_version = 1

[filters.my-tool]
description = "Compact my-tool output"
match_command = "^my-tool\\\\s+build"
strip_ansi = true
strip_lines_matching = ["^noise", "^\\\\s*$"]
replace = [{ pattern = "duration: ([0-9]+)ms", replacement = "t=$1ms" }]
match_output = [{ pattern = "all good", message = "my-tool: ok", unless = "error" }]
truncate_lines_at = 12
head_lines = 2
tail_lines = 1
max_lines = 4
on_empty = "my-tool: empty"

[[tests.my-tool]]
name = "filters and truncates"
input = "noise banner\\nfirst line\\nsecond line\\nthird line\\nfourth line\\n"
expected = "first line\\nsecond line\\n... (1 lines omitted)\\nfourth line"

[[tests.my-tool]]
name = "short circuits success"
input = "all good"
expected = "my-tool: ok"
`;

afterEach(() => {
  process.chdir(originalCwd);
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  loadRtkFilters({ refresh: true, customFiltersEnabled: false });
});

describe("RTK TOML schema v1 compatibility", () => {
  it("reports a safe location for invalid TOML syntax", () => {
    assert.throws(
      () => parseRtkTomlV1("not = [valid"),
      (error: unknown) =>
        error instanceof RtkTomlCompatibilityError &&
        error.publicMessage === "invalid TOML syntax (line 1, column 8)"
    );
  });

  it("parses the official declarative fields and passes inline tests", () => {
    const result = parseRtkTomlV1(SAMPLE);

    assert.equal(result.schemaVersion, 1);
    assert.equal(result.filters.length, 1);
    assert.equal(result.outcomes.length, 2);
    assert.ok(result.outcomes.every((outcome) => outcome.passed));
    assert.equal(result.passed, true);
    assert.deepEqual(result.filtersWithoutTests, []);
    assert.equal(result.filters[0].sourceFormat, "rtk-toml-v1");
  });

  it("matches imported TOML before a detected builtin command type", () => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-project-"));
    process.chdir(project);
    const rtkDir = path.join(project, ".rtk");
    const filterPath = path.join(rtkDir, "filters.toml");
    fs.mkdirSync(rtkDir, { recursive: true });
    fs.writeFileSync(
      filterPath,
      `schema_version = 1
[filters.git-status-custom]
match_command = "^git\\\\s+status"
strip_lines_matching = ["^noise"]
`
    );
    fs.writeFileSync(
      path.join(rtkDir, "trust.json"),
      JSON.stringify({
        filtersTomlSha256: crypto
          .createHash("sha256")
          .update(fs.readFileSync(filterPath))
          .digest("hex"),
      })
    );

    const filter = matchRtkFilter("noise\n M file.ts", "git status", { refresh: true });

    assert.equal(filter?.id, "git-status-custom");
    assert.equal(filter?.source, "project");
  });

  it("requires a separate trust hash for project TOML files", () => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-project-"));
    process.chdir(project);
    const rtkDir = path.join(project, ".rtk");
    fs.mkdirSync(rtkDir, { recursive: true });
    fs.writeFileSync(path.join(rtkDir, "filters.toml"), SAMPLE);
    fs.writeFileSync(
      path.join(rtkDir, "trust.json"),
      JSON.stringify({ filtersSha256: "wrong-key" })
    );

    const filters = loadRtkFilters({ refresh: true });
    const diagnostics = getRtkFilterLoadDiagnostics();

    assert.ok(!filters.some((filter) => filter.id === "my-tool"));
    assert.ok(
      diagnostics.some(
        (entry) => entry.format === "rtk-toml-v1" && entry.message.includes("untrusted")
      )
    );
  });

  it("loads global TOML and exposes its source format in the catalog", () => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-project-"));
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-data-"));
    process.chdir(project);
    process.env.DATA_DIR = dataDir;
    fs.mkdirSync(path.join(dataDir, "rtk"), { recursive: true });
    fs.writeFileSync(path.join(dataDir, "rtk", "filters.toml"), SAMPLE);

    loadRtkFilters({ refresh: true });
    const entry = getRtkFilterCatalog().find((filter) => filter.id === "my-tool");

    assert.equal(entry?.source, "global");
    assert.equal(entry?.sourceFormat, "rtk-toml-v1");
  });

  it("prioritizes project TOML over a higher-priority global JSON match", () => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-project-"));
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-data-"));
    process.chdir(project);
    process.env.DATA_DIR = dataDir;

    const projectDir = path.join(project, ".rtk");
    fs.mkdirSync(projectDir, { recursive: true });
    const projectPath = path.join(projectDir, "filters.toml");
    fs.writeFileSync(
      projectPath,
      `schema_version = 1
[filters.project-match]
match_command = "^scope-tool"
`
    );
    fs.writeFileSync(
      path.join(projectDir, "trust.json"),
      JSON.stringify({
        filtersTomlSha256: crypto
          .createHash("sha256")
          .update(fs.readFileSync(projectPath))
          .digest("hex"),
      })
    );

    fs.mkdirSync(path.join(dataDir, "rtk"), { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, "rtk", "filters.json"),
      JSON.stringify({
        id: "global-match",
        label: "Global match",
        description: "",
        category: "generic",
        priority: 100,
        match: { commands: ["^scope-tool"], patterns: [], outputTypes: [] },
      })
    );

    const filter = matchRtkFilter("output", "scope-tool", { refresh: true });
    assert.equal(filter?.id, "project-match");
  });

  it("keeps project JSON ahead of a matching global TOML filter", () => {
    const project = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-project-"));
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-data-"));
    process.chdir(project);
    process.env.DATA_DIR = dataDir;

    const projectDir = path.join(project, ".rtk");
    fs.mkdirSync(projectDir, { recursive: true });
    const projectPath = path.join(projectDir, "filters.json");
    fs.writeFileSync(
      projectPath,
      JSON.stringify({
        id: "project-json-match",
        label: "Project JSON match",
        description: "",
        category: "generic",
        match: { commands: ["^scope-tool"], patterns: [], outputTypes: [] },
        rules: {},
        preserve: { errorPatterns: [], summaryPatterns: [] },
        tests: [],
      })
    );
    fs.writeFileSync(
      path.join(projectDir, "trust.json"),
      JSON.stringify({
        filtersSha256: crypto
          .createHash("sha256")
          .update(fs.readFileSync(projectPath))
          .digest("hex"),
      })
    );

    fs.mkdirSync(path.join(dataDir, "rtk"), { recursive: true });
    fs.writeFileSync(
      path.join(dataDir, "rtk", "filters.toml"),
      `schema_version = 1
[filters.global-toml-match]
match_command = "^scope-tool"
`
    );

    const filter = matchRtkFilter("output", "scope-tool", { refresh: true });
    assert.equal(filter?.id, "project-json-match");
  });

  it("installs atomically, protects the file and refuses an implicit overwrite", () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-data-"));
    process.env.DATA_DIR = dataDir;

    const installed = installGlobalRtkTomlV1(SAMPLE);
    const target = path.join(dataDir, "rtk", "filters.toml");

    assert.equal(installed.installedPath, "rtk/filters.toml");
    assert.equal(fs.readFileSync(target, "utf8"), SAMPLE);
    assert.equal(fs.statSync(target).mode & 0o777, 0o600);
    assert.throws(
      () => installGlobalRtkTomlV1(SAMPLE),
      (error: unknown) =>
        error instanceof RtkTomlCompatibilityError && error.publicMessage.includes("already exists")
    );
  });

  it("rejects unknown fields, unsafe regexes and failing inline tests", () => {
    assert.throws(() =>
      parseRtkTomlV1(`schema_version = 1
[filters.bad]
match_command = "^bad"
run = "rm -rf /"
`)
    );
    assert.throws(() =>
      parseRtkTomlV1(`schema_version = 1
[filters.bad]
match_command = "(a+)+$"
`)
    );
    const failed = parseRtkTomlV1(`schema_version = 1
[filters.bad]
match_command = "^bad"
strip_lines_matching = ["^noise"]
[[tests.bad]]
name = "wrong"
input = "noise\\nkept"
expected = "different"
`);
    assert.equal(failed.passed, false);
    assert.throws(() =>
      installGlobalRtkTomlV1(`schema_version = 1
[filters.bad]
match_command = "^bad"
strip_lines_matching = ["^noise"]
[[tests.bad]]
name = "wrong"
input = "noise\\nkept"
expected = "different"
`)
    );
  });

  it("keeps filter_stderr as a documented proxy no-op", () => {
    const result = parseRtkTomlV1(`schema_version = 1
[filters.stderr-tool]
match_command = "^stderr-tool"
filter_stderr = true
`);

    assert.equal(result.filters[0].filterStderr, false);
    assert.ok(result.warnings.some((warning) => warning.includes("filter_stderr")));
    assert.equal(applyLineFilter("stderr: error", result.filters[0]).text, "stderr: error");
  });

  it("rejects non-schema fields in inline tests", () => {
    assert.throws(() =>
      parseRtkTomlV1(`schema_version = 1
[filters.bad]
match_command = "^bad"
[[tests.bad]]
name = "extra field"
input = "input"
expected = "input"
command = "bad"
`)
    );
  });
});
