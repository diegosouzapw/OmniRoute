// #8828 RTL layout ratchet — countViolations unit contract.
// Moved from tests/unit/scripts/ (a path no runner collects: the node:test
// globs stop at an explicit subdir list and vitest.config.ts never included
// it, so the file NEVER ran) and converted from vitest to node:test, the
// runner that collects tests/unit/*.test.ts.
import { test } from "node:test";
import assert from "node:assert/strict";

import { countViolations } from "../../../scripts/check/check-rtl-ratchet.mjs";

test("counts physical directional utilities", () => {
  assert.equal(countViolations('<span className="mr-2" />'), 1);
  assert.equal(countViolations('<td className="pr-3 text-left" />'), 2);
  assert.equal(countViolations('<div className="border-l-2 rounded-r-md" />'), 2);
});

test("ignores logical utilities, which already mirror", () => {
  assert.equal(countViolations('<span className="me-2 ps-3 text-start" />'), 0);
  assert.equal(countViolations('<div className="border-s-2 rounded-e-md" />'), 0);
});

test("ignores a class already scoped to an rtl: variant", () => {
  assert.equal(countViolations('<div className="rtl:mr-0" />'), 0);
  // Only the unscoped half of a pair counts.
  assert.equal(countViolations('<div className="rtl:mr-0 mr-2" />'), 1);
});

test("ignores left/right paired on one element, which spans both edges", () => {
  assert.equal(countViolations('<div className="absolute left-0 right-0 top-0" />'), 0);
  // A lone edge offset is still directional.
  assert.equal(countViolations('<div className="absolute left-0 top-0" />'), 1);
});

test("does not match unrelated identifiers containing the prefixes", () => {
  assert.equal(countViolations('<div className="control-panel highlight-2" />'), 0);
  assert.equal(countViolations("const marginLeft = 2;"), 0);
});
