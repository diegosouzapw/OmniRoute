import test from "node:test";
import assert from "node:assert/strict";
import {
  joinBasePath,
  normalizeBasePath,
} from "../../scripts/build/normalizeBasePath.mjs";

test("normalizeBasePath returns empty for root and blank values", () => {
  assert.equal(normalizeBasePath(undefined), "");
  assert.equal(normalizeBasePath(""), "");
  assert.equal(normalizeBasePath("/"), "");
  assert.equal(normalizeBasePath("   "), "");
});

test("normalizeBasePath strips trailing slashes and rejects unsafe paths", () => {
  assert.equal(normalizeBasePath("/omniroute/"), "/omniroute");
  assert.equal(normalizeBasePath("omniroute"), "");
  assert.equal(normalizeBasePath("/../etc"), "");
  assert.equal(normalizeBasePath("/omni?x=1"), "");
});

test("joinBasePath prefixes application routes", () => {
  assert.equal(joinBasePath("", "/api/health"), "/api/health");
  assert.equal(joinBasePath("/omniroute", "/api/health"), "/omniroute/api/health");
  assert.equal(joinBasePath("/omniroute", "/"), "/omniroute/");
});
