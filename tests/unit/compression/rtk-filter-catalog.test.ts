import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  loadRtkFilters,
  matchRtkFilter,
  runRtkFilterTests,
} from "../../../open-sse/services/compression/index.ts";

const FILTER_DIR = path.join(
  process.cwd(),
  "open-sse",
  "services",
  "compression",
  "engines",
  "rtk",
  "filters"
);

const PLANNED_FILTERS = [
  "rubocop",
  "aws",
  "gcloud",
  "ssh",
  "rsync",
  "curl",
  "wget",
  "ps",
  "df",
  "du",
];

const MATCH_CASES: Array<[string, string, string]> = [
  [
    "rubocop",
    "app/models/user.rb:12:3: C: Style/IfUnlessModifier: Favor modifier if usage.",
    "rubocop",
  ],
  ["aws", "An error occurred (AccessDenied) when calling the PutObject operation", "aws s3 cp"],
  ["gcloud", "ERROR: (gcloud.run.deploy) PERMISSION_DENIED", "gcloud run deploy"],
  ["ssh", "Permission denied (publickey).", "ssh app"],
  [
    "rsync",
    "sending incremental file list\nrsync error: some files could not be transferred",
    "rsync -av",
  ],
  ["curl", "HTTP/1.1 500 Internal Server Error\ncurl: (22) failed", "curl -i"],
  ["wget", "ERROR 404: Not Found.", "wget https://example.test/missing"],
  ["ps", "USER       PID %CPU COMMAND\nnode      1234  5.0 node server.js", "ps aux"],
  ["df", "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1 50G 45G 5G 90% /", "df -h"],
  ["du", "120M node_modules\n4.0K package.json", "du -sh *"],
];

describe("RTK planned filter catalog coverage", () => {
  it("ships the cloud/system filters named in the RTK parity plan", () => {
    const filters = loadRtkFilters({ refresh: true, customFiltersEnabled: false });
    const ids = new Set(filters.map((filter) => filter.id));

    for (const id of PLANNED_FILTERS) {
      assert.ok(ids.has(id), `missing planned filter ${id}`);
      const raw = JSON.parse(fs.readFileSync(path.join(FILTER_DIR, `${id}.json`), "utf8"));
      assert.ok(raw.match?.outputTypes, `${id} should define match.outputTypes`);
      assert.ok(raw.match?.commands, `${id} should define match.commands`);
      assert.ok(raw.match?.patterns, `${id} should define match.patterns`);
      assert.ok(raw.rules, `${id} should define rules`);
      assert.ok(raw.preserve, `${id} should define preserve`);
      assert.ok(Array.isArray(raw.tests) && raw.tests.length > 0, `${id} should define tests`);
    }
  });

  it("matches planned filters by command or content before generic fallback", () => {
    for (const [expectedId, output, command] of MATCH_CASES) {
      const filter = matchRtkFilter(output, command, { customFiltersEnabled: false });
      assert.equal(filter?.id, expectedId);
    }
  });

  it("does not select planned filters for unrelated secret-like prose", () => {
    const filter = matchRtkFilter("api_key=sk-test-secret-token-without-command", null, {
      customFiltersEnabled: false,
    });

    assert.ok(!filter || !PLANNED_FILTERS.includes(filter.id));
  });

  it("keeps builtin inline-test gate green after catalog expansion", () => {
    const result = runRtkFilterTests({ requireAll: true, customFiltersEnabled: false });

    assert.equal(result.passed, true);
    assert.deepEqual(result.filtersWithoutTests, []);
  });
});
