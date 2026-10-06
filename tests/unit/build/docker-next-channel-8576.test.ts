// tests/unit/build/docker-next-channel-8576.test.ts
// Regression coverage for #8576 — publish a floating :next Docker channel from
// the active release branch without ever moving :latest.

import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, "../../..");
const RESOLVE_VERSION = path.join(
  ROOT,
  "scripts/ci/resolve-docker-publish-version.sh",
);
const SHOULD_PROMOTE = path.join(ROOT, "scripts/ci/should-promote-latest.sh");
const WORKFLOW = readFileSync(
  path.join(ROOT, ".github/workflows/docker-publish.yml"),
  "utf8",
);

function resolveVersion(
  eventName: string,
  refType: string,
  refName: string,
  inputVersion = "",
  defaultBranch = "release/v3.8.50",
): string {
  return execFileSync(
    "bash",
    [
      RESOLVE_VERSION,
      eventName,
      refType,
      refName,
      inputVersion,
      defaultBranch,
    ],
    { encoding: "utf8" },
  ).trim();
}

function shouldPromote(version: string, tags: string[] = []): string {
  return execFileSync("bash", [SHOULD_PROMOTE, version], {
    input: tags.join("\n") + (tags.length ? "\n" : ""),
    encoding: "utf8",
  }).trim();
}

test("the current default release branch resolves to next", () => {
  assert.equal(
    resolveVersion(
      "push",
      "branch",
      "release/v3.8.50",
      "",
      "release/v3.8.50",
    ),
    "next",
  );
  assert.equal(
    resolveVersion(
      "push",
      "branch",
      "release/v4.0.0",
      "",
      "release/v4.0.0",
    ),
    "next",
  );
});

test("a stale release branch skips without overwriting next", () => {
  assert.equal(
    resolveVersion(
      "push",
      "branch",
      "release/v3.8.49",
      "",
      "release/v3.8.50",
    ),
    "skip",
  );
  assert.match(WORKFLOW, /\[ "\$VERSION" = "skip" \]/);
  assert.match(WORKFLOW, /echo "skip=true" >> "\$GITHUB_OUTPUT"/);
});

test("existing main, tag, dispatch, and release behavior is preserved", () => {
  assert.equal(resolveVersion("push", "branch", "main"), "main");
  assert.equal(resolveVersion("push", "tag", "v3.8.50"), "3.8.50");
  assert.equal(
    resolveVersion("workflow_dispatch", "branch", "main", "v3.8.50"),
    "3.8.50",
  );
  assert.equal(resolveVersion("release", "tag", "v3.8.50"), "3.8.50");
});

test("unsupported push branches fail closed", () => {
  assert.throws(
    () => resolveVersion("push", "branch", "feature/not-a-publish-source"),
    /Unsupported Docker publish branch/,
  );
});

test("next and other non-semver channels can never promote latest", () => {
  assert.equal(shouldPromote("next", ["v99.0.0"]), "false");
  assert.equal(shouldPromote("main", []), "false");
  assert.equal(shouldPromote("3.8.51-rc.1", ["v3.8.50"]), "false");
});

test("workflow triggers release branches and keeps next mutable", () => {
  assert.match(WORKFLOW, /- ["']?release\/v\*["']?/);
  assert.match(WORKFLOW, /DEFAULT_BRANCH:.*repository\.default_branch/);
  assert.match(
    WORKFLOW,
    /\[ "\$VERSION" != "main" \] && \[ "\$VERSION" != "next" \]/,
  );
});

test("next images retain the blocking vulnerability gate", () => {
  const gate = WORKFLOW.match(
    /- name: Trivy CRITICAL gate \(blocking\)[\s\S]*?exit-code: "1"/,
  );
  assert.ok(gate, "blocking Trivy gate must remain present");
  assert.match(gate[0], /version != 'main'/);
  assert.doesNotMatch(gate[0], /version != 'next'/);
});
