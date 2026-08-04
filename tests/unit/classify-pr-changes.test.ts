/**
 * tests/unit/classify-pr-changes.test.ts
 *
 * Locks the *existence reason* of each change flag used by ci.yml path filters:
 * - code  → heavy static + unit/vitest (code regression surface)
 * - docs  → docs-sync / prose only
 * - i18n  → translation validation; pure messages must NOT force full unit
 * - workflow → always code (CI is part of the safety net)
 * - unknown → code (fail-safe over-run)
 */
import test from "node:test";
import assert from "node:assert/strict";

import { classifyPaths } from "../../scripts/quality/classify-pr-changes.mjs";

test("pure docs PR → docs only (no code unit/lint bag)", () => {
  const c = classifyPaths(["docs/architecture/QUALITY_GATES.md", "README.md"]);
  assert.deepEqual(c, { code: false, docs: true, i18n: false, workflow: false, testsOnly: false });
});

test("openapi under docs/ → docs (contract gates live in docs-sync, not unit)", () => {
  const c = classifyPaths(["docs/openapi.yaml"]);
  assert.equal(c.docs, true);
  assert.equal(c.code, false);
});

test("pure message catalog → i18n only (not full unit suite)", () => {
  const c = classifyPaths(["src/i18n/messages/en.json", "src/i18n/messages/ko.json"]);
  assert.deepEqual(c, { code: false, docs: false, i18n: true, workflow: false, testsOnly: false });
});

test("i18n tooling/scripts → i18n + code (tooling can break runtime paths)", () => {
  const c = classifyPaths(["scripts/i18n/check-ui-keys-coverage.mjs"]);
  assert.equal(c.i18n, true);
  assert.equal(c.code, true);
});

test("src/i18n loader TS (non-messages) → i18n + code", () => {
  const c = classifyPaths(["src/i18n/request.ts"]);
  assert.equal(c.i18n, true);
  assert.equal(c.code, true);
});

test("workflow change → workflow + code (gates protect the gates)", () => {
  const c = classifyPaths([".github/workflows/ci.yml"]);
  assert.equal(c.workflow, true);
  assert.equal(c.code, true);
});

test("production source → code", () => {
  const c = classifyPaths(["open-sse/handlers/chatCore.ts", "src/lib/db/core.ts"]);
  assert.deepEqual(c, { code: true, docs: false, i18n: false, workflow: false, testsOnly: false });
});

test("mixed docs + code → both flags (jobs union their filters)", () => {
  const c = classifyPaths(["docs/README.md", "src/lib/db/core.ts"]);
  assert.equal(c.docs, true);
  assert.equal(c.code, true);
});

test("unknown path → code fail-safe (never skip heavy gates by accident)", () => {
  const c = classifyPaths(["weird/unclassified.bin"]);
  assert.equal(c.code, true);
});

test("empty change list → all false (nothing to validate)", () => {
  const c = classifyPaths([]);
  assert.deepEqual(c, { code: false, docs: false, i18n: false, workflow: false, testsOnly: false });
});

// WS3.1 (v3.8.49 quality plan) — testsOnly powers the hotfix/test-only fast lane:
// a diff touching ONLY tests/ (and no tests/e2e/ spec) does not change the served
// app, so the 9-shard E2E matrix adds wall-time without coverage. e2e specs are
// excluded from the shortcut — changing an e2e spec REQUIRES running e2e.

test("testsOnly: pure unit-test diff → true (still code)", () => {
  const c = classifyPaths(["tests/unit/foo.test.ts", "tests/integration/bar.test.ts"]);
  assert.equal(c.testsOnly, true);
  assert.equal(c.code, true);
});

test("testsOnly: any non-test file flips it false", () => {
  const c = classifyPaths(["tests/unit/foo.test.ts", "src/lib/db/core.ts"]);
  assert.equal(c.testsOnly, false);
});

test("testsOnly: touching an e2e spec is NOT tests-only (e2e must run)", () => {
  const c = classifyPaths(["tests/e2e/login.spec.ts"]);
  assert.equal(c.testsOnly, false);
});

test("testsOnly: empty change list → false (fail-safe)", () => {
  const c = classifyPaths([]);
  assert.equal(c.testsOnly, false);
});
