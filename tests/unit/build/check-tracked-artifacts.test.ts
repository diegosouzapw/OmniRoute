// tests/unit/build/check-tracked-artifacts.test.ts
// TDD test for check-tracked-artifacts.mjs gate.
import test from "node:test";
import assert from "node:assert/strict";
import { checkTrackedArtifacts } from "../../../scripts/check/check-tracked-artifacts.mjs";

test("checkTrackedArtifacts: empty list passes", () => {
  const result = checkTrackedArtifacts([]);
  assert.deepEqual(result, []);
});

test("checkTrackedArtifacts: node_modules/ prefix is flagged", () => {
  const result = checkTrackedArtifacts(["node_modules/some-pkg/index.js"]);
  assert.equal(result.length, 1);
  assert.ok(result[0].includes("node_modules/some-pkg/index.js"));
});

test("checkTrackedArtifacts: .next/ prefix is flagged", () => {
  const result = checkTrackedArtifacts([".next/static/chunks/main.js"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: coverage/ prefix is flagged", () => {
  const result = checkTrackedArtifacts(["coverage/lcov.info"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: quality-metrics.json is flagged", () => {
  const result = checkTrackedArtifacts(["quality-metrics.json"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: config/quality/quality-metrics.json is flagged", () => {
  const result = checkTrackedArtifacts(["config/quality/quality-metrics.json"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: symlink mode (120000) is flagged", () => {
  const result = checkTrackedArtifacts([], ["node_modules"]);
  assert.equal(result.length, 1);
  assert.ok(result[0].includes("node_modules"));
});

test("checkTrackedArtifacts: normal source files pass", () => {
  const result = checkTrackedArtifacts([
    "src/app/page.tsx",
    "open-sse/handlers/chat.ts",
    "package.json",
    "tests/unit/some.test.ts",
  ]);
  assert.deepEqual(result, []);
});

test("checkTrackedArtifacts: multiple violations reported", () => {
  const result = checkTrackedArtifacts([
    "src/ok.ts",
    "node_modules/.bin/jscpd",
    ".next/server/app/page.js",
    "coverage/lcov.info",
  ]);
  assert.equal(result.length, 3);
});
