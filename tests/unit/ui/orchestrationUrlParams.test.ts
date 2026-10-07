/** Run: node --import tsx/esm --test tests/unit/ui/orchestrationUrlParams.test.ts */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseCsvSet,
  toggleCsv,
} from "../../../src/app/(dashboard)/dashboard/orchestration/model/urlParams.ts";

describe("parseCsvSet", () => {
  it("returns an empty set for null/empty input", () => {
    assert.deepEqual([...parseCsvSet(null)], []);
    assert.deepEqual([...parseCsvSet("")], []);
  });

  it("trims each token so ' a2a, conductor ' parses like 'a2a,conductor'", () => {
    assert.deepEqual([...parseCsvSet(" a2a, conductor ")].sort(), ["a2a", "conductor"]);
  });

  it("drops empty tokens produced by stray commas/whitespace", () => {
    assert.deepEqual([...parseCsvSet("a2a,,  ,conductor,")].sort(), ["a2a", "conductor"]);
  });

  it("drops values outside `valid` (after trimming, so a padded valid token survives)", () => {
    const valid = new Set(["running", "failed"]);
    assert.deepEqual([...parseCsvSet(" running , bogus ", valid)], ["running"]);
  });

  it("accepts any non-empty token when `valid` is omitted", () => {
    assert.deepEqual([...parseCsvSet("devin, jules", undefined)].sort(), ["devin", "jules"]);
  });

  it("does not mutate the `valid` set it is given", () => {
    const valid = new Set(["running"]);
    parseCsvSet("running,bogus", valid);
    assert.deepEqual([...valid], ["running"]);
  });
});

describe("toggleCsv", () => {
  it("adds a missing value and returns a sorted CSV", () => {
    assert.equal(toggleCsv(new Set(["running"]), "failed"), "failed,running");
  });

  it("removes a present value", () => {
    assert.equal(toggleCsv(new Set(["failed", "running"]), "failed"), "running");
  });

  it("returns null when the list becomes empty (so the param leaves the URL)", () => {
    assert.equal(toggleCsv(new Set(["running"]), "running"), null);
  });

  it("returns the single value when toggling into an empty set", () => {
    assert.equal(toggleCsv(new Set<string>(), "a2a"), "a2a");
  });

  it("does not mutate the input set", () => {
    const current = new Set(["running"]);
    toggleCsv(current, "failed");
    assert.deepEqual([...current], ["running"]);
  });
});
