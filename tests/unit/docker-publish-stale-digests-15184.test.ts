// Regression for #15184 — docker-publish.yml's amd64 leg may run on the persistent
// self-hosted `omni-build` runner. The digest export wrote into a fixed /tmp/digests/*
// that was never cleaned, so digests from EARLIER runs ended up in the version index.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const workflow = readFileSync(
  fileURLToPath(new URL("../../.github/workflows/docker-publish.yml", import.meta.url)),
  "utf8"
);

function stepBlock(name: string): string {
  const start = workflow.indexOf(`- name: ${name}`);
  assert.notEqual(start, -1, `step "${name}" not found`);
  const next = workflow.indexOf("\n      - name:", start + 1);
  return workflow.slice(start, next === -1 ? undefined : next);
}

test("#15184: Export digests starts from an empty directory", () => {
  const exportStep = stepBlock("Export digests");
  assert.ok(
    /rm\s+-rf\s+\/tmp\/digests/.test(exportStep) || exportStep.includes("RUNNER_TEMP"),
    "Export digests must rm -rf /tmp/digests or use $RUNNER_TEMP before mkdir/touch"
  );
  assert.ok(exportStep.indexOf("rm -rf") < exportStep.indexOf("mkdir -p"));
});

test("#15184: merge job guards against stale digests before imagetools create", () => {
  const merge = workflow.slice(workflow.indexOf("\n  merge:"));
  const guardAt = merge.indexOf("Guard against stale digests");
  const createAt = merge.indexOf("Create Docker Hub version manifests");
  assert.ok(guardAt !== -1 && guardAt < createAt, "guard step must precede manifest creation");
  assert.match(stepBlock("Guard against stale digests"), /-gt 2/);
});
