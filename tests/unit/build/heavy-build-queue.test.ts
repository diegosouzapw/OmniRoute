import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

const workflow = parse(
  readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
);

test("unrelated candidate builds cannot replace each other's pending concurrency slot", () => {
  assert.equal(
    workflow.jobs.build.concurrency.group,
    "heavy-build-${{ github.ref == 'refs/heads/main' && 'main' || github.ref }}"
  );
  assert.equal(workflow.jobs.build.concurrency["cancel-in-progress"], false);
});

test("superseded runs cancel only within the same workflow/ref", () => {
  assert.equal(workflow.concurrency.group, "${{ github.workflow }}-${{ github.ref }}");
  assert.equal(workflow.concurrency["cancel-in-progress"], true);
});

test("runner isolation still blocks fork code from the self-hosted build slot", () => {
  assert.match(
    workflow.jobs.build["runs-on"],
    /github\.event\.pull_request\.head\.repo\.full_name == github\.repository/
  );
  assert.match(workflow.jobs.build["runs-on"], /\["self-hosted","omni-build"\]/);
  assert.match(workflow.jobs.build["runs-on"], /\|\| 'ubuntu-latest'/);
});
