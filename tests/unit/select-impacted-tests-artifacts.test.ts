// TIA: a changed non-source artifact (workflow, root config) selects the tests that pin it
// by path literal — additively. It must NEVER force __RUN_ALL__ (an unpinned artifact is
// not an "unmapped source"), and hub files keep their existing RUN_ALL semantics.

import test from "node:test";
import assert from "node:assert/strict";

import { selectImpacted } from "../../scripts/quality/select-impacted-tests.mjs";

const map = {
  sources: { "src/lib/a.ts": ["tests/unit/a.test.ts"] },
  artifacts: {
    ".github/workflows/sibling-fixture.yml": ["tests/unit/build/check-workflows.test.ts"],
  },
};

test("changed pinned artifact → its pinning test(s)", () => {
  assert.deepEqual(selectImpacted({ changed: [".github/workflows/sibling-fixture.yml"], map }), [
    "tests/unit/build/check-workflows.test.ts",
  ]);
});

test("changed unpinned artifact → nothing (never __RUN_ALL__)", () => {
  assert.deepEqual(selectImpacted({ changed: [".github/workflows/sibling-other.yml"], map }), []);
});

test("artifact + source changes merge additively", () => {
  assert.deepEqual(
    selectImpacted({ changed: [".github/workflows/sibling-fixture.yml", "src/lib/a.ts"], map }),
    ["tests/unit/a.test.ts", "tests/unit/build/check-workflows.test.ts"]
  );
});

test("hub artifacts keep RUN_ALL precedence over path-literal hits", () => {
  const hubMap = { ...map, artifacts: { "package.json": ["tests/unit/x.test.ts"] } };
  assert.deepEqual(selectImpacted({ changed: ["package.json"], map: hubMap }), ["__RUN_ALL__"]);
});

test("map without `artifacts` is tolerated", () => {
  assert.deepEqual(
    selectImpacted({ changed: [".github/workflows/sibling-fixture.yml"], map: { sources: {} } }),
    []
  );
});
