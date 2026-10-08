import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  findTrackerCloses,
  closingKeywordInBody,
} from "../../scripts/quality/release-acceptance/closeOracle.mjs";

test("nightly still auto-closes the tracker via two steps (deliberate, #12085)", () => {
  const text = readFileSync(".github/workflows/nightly-release-green.yml", "utf8");
  assert.equal(findTrackerCloses(text).length, 2);
  const legacy = readFileSync(
    new URL("../fixtures/release-acceptance/legacy-close-steps.yml", import.meta.url),
    "utf8"
  );
  assert.equal(findTrackerCloses(legacy).length, 2);
});

test("Fixes #12732 is a closing keyword; Related to #12732 is not", () => {
  assert.equal(closingKeywordInBody("Fixes #12732.\n"), true);
  assert.equal(closingKeywordInBody("Related to #12732.\n"), false);
  assert.equal(closingKeywordInBody("Fixes #1. Closes #12732\n"), true);
});
