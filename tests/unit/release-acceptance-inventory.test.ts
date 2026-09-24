import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { COLLECTORS } from "../../scripts/check/check-test-discovery.mjs";
import {
  knownUnexecuted,
  inventoryErrors,
} from "../../scripts/quality/release-acceptance/inventory.mjs";

const RELEASE_SUITES = ["test:unit:ci", "test:vitest", "test:integration"];
const baseline = JSON.parse(
  readFileSync(new URL("../../config/quality/test-discovery-baseline.json", import.meta.url), "utf8")
);

test("tsx files under tests/unit are known_unexecuted for release scope, not inventory errors", () => {
  const ku = knownUnexecuted(RELEASE_SUITES, COLLECTORS, baseline);
  const tsx = ku.collectors.find((c) => c.glob === "tests/unit/**/*.test.tsx");
  assert.ok(tsx, "tsx collector must be listed as known_unexecuted");
  assert.equal(typeof tsx.count, "number");
  assert.ok(tsx.count > 0);
});

test("omitting a collector without listing it is an inventory error", () => {
  const collectors = COLLECTORS.filter((c) => c.glob !== "tests/unit/**/*.test.tsx");
  const discoveredFiles = ["tests/unit/AutoComboCatalog.test.tsx"];
  const errors = inventoryErrors(RELEASE_SUITES, collectors, baseline, discoveredFiles);
  assert.ok(errors.some((e) => e.code === "collector_omitted"));
});

test("combo-matrix glob is in release integration scope, not known_unexecuted", () => {
  const ku = knownUnexecuted(RELEASE_SUITES, COLLECTORS, baseline);
  assert.equal(
    ku.collectors.some((c) => c.glob === "tests/integration/combo-matrix/*.test.ts"),
    false
  );
  const combo = COLLECTORS.find(
    (c) => c.glob === "tests/integration/combo-matrix/*.test.ts"
  );
  assert.ok(combo);
});
