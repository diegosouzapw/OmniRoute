import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  loadRtkFilters,
  matchRtkFilter,
  runRtkFilterTests,
} from "../../open-sse/services/compression/index.ts";

const NEW_FILTERS = ["kubectl", "docker-build", "composer", "gh"] as const;

const MATCH_CASES: Array<[string, string, string]> = [
  [
    "kubectl",
    "NAME       READY   STATUS             RESTARTS   AGE\nweb-2c4    0/1     CrashLoopBackOff   5          12m",
    "kubectl get pods",
  ],
  [
    "docker-build",
    "Step 1/2 : FROM node:20\nSuccessfully built abc123",
    "docker build -t myapp .",
  ],
  [
    "composer",
    "Package operations: 5 installs, 0 updates, 0 removals\nGenerating optimized autoload files",
    "composer install",
  ],
  [
    "gh",
    "Creating pull request for feat/foo into main in owner/repo\nhttps://github.com/owner/repo/pull/123",
    "gh pr create",
  ],
];

describe("RTK new-filter catalog (kubectl, docker-build, composer, gh)", () => {
  it("loads all 4 new filters from disk", () => {
    const filters = loadRtkFilters({ refresh: true, customFiltersEnabled: false });
    const ids = new Set(filters.map((f) => f.id));
    for (const id of NEW_FILTERS) {
      assert.ok(ids.has(id), `expected filter "${id}" to be loaded`);
    }
  });

  it("matches each new filter from realistic command output", () => {
    for (const [expectedId, output, command] of MATCH_CASES) {
      const filter = matchRtkFilter(output, command, { customFiltersEnabled: false });
      assert.equal(filter?.id, expectedId, `wrong filter matched for "${command}"`);
    }
  });

  it("kubectl skips arbitrary-content commands (logs, exec, top)", () => {
    const logOutput =
      "2026-05-28T10:00:00 INFO request handled\n2026-05-28T10:00:01 INFO request handled";
    for (const cmd of ["kubectl logs api-pod", "kubectl exec api-pod -- npm test", "kubectl top nodes"]) {
      const filter = matchRtkFilter(logOutput, cmd, { customFiltersEnabled: false });
      assert.notEqual(
        filter?.id,
        "kubectl",
        `kubectl filter must not claim "${cmd}" (arbitrary content)`
      );
    }
  });

  it("kubectl skips structured -o json/yaml output to avoid corrupting it", () => {
    const jsonOutput = '{\n  "apiVersion": "v1",\n  "items": []\n}';
    for (const cmd of [
      "kubectl get pods -o json",
      "kubectl get pods -o yaml",
      "kubectl get pods --output=json",
      "kubectl get svc -o jsonpath='{.items[*].metadata.name}'",
    ]) {
      const filter = matchRtkFilter(jsonOutput, cmd, { customFiltersEnabled: false });
      assert.notEqual(
        filter?.id,
        "kubectl",
        `kubectl filter must not claim structured output: "${cmd}"`
      );
    }
  });

  it("gh skips `gh api` and --json invocations (structured output)", () => {
    const jsonOutput = '{\n  "number": 1,\n  "title": "feat: x"\n}';
    for (const cmd of [
      "gh api repos/owner/repo/pulls/1",
      "gh api graphql -f query=...",
      "gh pr list --json number,title",
      "gh issue list --json number,title,author",
    ]) {
      const filter = matchRtkFilter(jsonOutput, cmd, { customFiltersEnabled: false });
      assert.notEqual(
        filter?.id,
        "gh",
        `gh filter must not claim structured output: "${cmd}"`
      );
    }
  });

  it("docker-build matches both v2 (docker compose) and legacy (docker-compose) build", () => {
    const output = "Step 1/2 : FROM node:20\nSuccessfully built abc123";
    for (const cmd of ["docker build .", "docker compose build", "docker-compose build", "docker buildx build ."]) {
      const filter = matchRtkFilter(output, cmd, { customFiltersEnabled: false });
      assert.equal(filter?.id, "docker-build", `expected docker-build to match "${cmd}"`);
    }
  });

  it("inline tests for new filters all pass", () => {
    const result = runRtkFilterTests({ requireAll: false, customFiltersEnabled: false });
    const newFilterOutcomes = result.outcomes.filter((o) =>
      NEW_FILTERS.includes(o.filterId as (typeof NEW_FILTERS)[number])
    );
    assert.ok(newFilterOutcomes.length > 0, "expected inline tests from new filters to run");
    const failed = newFilterOutcomes.filter((o) => !o.passed);
    assert.deepEqual(
      failed,
      [],
      `inline tests failed: ${failed.map((f) => `${f.filterId}/${f.testName}`).join(", ")}`
    );
  });
});
