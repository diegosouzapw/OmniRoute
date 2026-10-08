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

// --- never-allowed classes added after the _tasks tracked-symlink wipes (2026-08-08/10) ---

test("checkTrackedArtifacts: _tasks tracked as exact entry (blob/symlink) is flagged", () => {
  const result = checkTrackedArtifacts(["_tasks"]);
  assert.equal(result.length, 1);
  assert.ok(result[0].includes("_tasks"));
});

test("checkTrackedArtifacts: _tasks/ prefix is flagged", () => {
  const result = checkTrackedArtifacts(["_tasks/pipeline/prs/1-analyzed/plan.md"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: private root underscore dirs are flagged", () => {
  const result = checkTrackedArtifacts([
    "_references/_sistemas_cli/relatorio.md",
    "_mono_repo/_worktrees/x/file.ts",
    "_ideia/draft.md",
    "_cache/entry.json",
  ]);
  assert.equal(result.length, 4);
});

test("checkTrackedArtifacts: ANY future root underscore dir is flagged (generic rule)", () => {
  const result = checkTrackedArtifacts([
    "_nova-pasta-futura/qualquer/arquivo.md",
    "_scratch/notes.txt",
  ]);
  assert.equal(result.length, 2);
  assert.ok(result[0].includes("root underscore path"));
});

test("checkTrackedArtifacts: root underscore FILE is flagged; nested underscore paths pass", () => {
  const flagged = checkTrackedArtifacts(["_notas-soltas.md"]);
  assert.equal(flagged.length, 1);
  const nested = checkTrackedArtifacts([
    "src/lib/_internal/helper.ts",
    "open-sse/services/_shared/util.ts",
  ]);
  assert.deepEqual(nested, []);
});

test("checkTrackedArtifacts: .claude/worktrees/ prefix is flagged", () => {
  const result = checkTrackedArtifacts([".claude/worktrees/fix-123/src/app.ts"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: docs/superpowers/ prefix is flagged", () => {
  const result = checkTrackedArtifacts(["docs/superpowers/plans/2026-01-01-x.md"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: .eslintcache family is flagged", () => {
  const result = checkTrackedArtifacts([
    ".eslintcache",
    ".eslintcache-complexity",
    ".eslintcache-probe",
  ]);
  assert.equal(result.length, 3);
});

test("checkTrackedArtifacts: .fakebin-* shim dirs are flagged", () => {
  const result = checkTrackedArtifacts([".fakebin-9475/npm"]);
  assert.equal(result.length, 1);
});

test("checkTrackedArtifacts: build/log output dirs are flagged", () => {
  const result = checkTrackedArtifacts([
    "dist/server.js",
    ".build/next/chunk.js",
    ".artifacts/eslint-results.json",
    "logs/app.log",
  ]);
  assert.equal(result.length, 4);
});

test("checkTrackedArtifacts: new prefixes are root-anchored — nested legit paths pass", () => {
  const result = checkTrackedArtifacts([
    "src/lib/logs/logger.ts",
    "docs/architecture/ARCHITECTURE.md",
    "scripts/check/check-tracked-artifacts.mjs",
    "tests/unit/build/check-tracked-artifacts.test.ts",
    "bin/cli/locales/en.json",
  ]);
  assert.deepEqual(result, []);
});
