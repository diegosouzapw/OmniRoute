import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { lastCommandSegment } from "../../../open-sse/services/compression/engines/rtk/splitCompositeCommand.ts";

describe("lastCommandSegment", () => {
  it("splits on && and returns the last segment", () => {
    assert.equal(lastCommandSegment("cd /x && git status"), "git status");
  });

  it("splits on || and returns the last segment", () => {
    assert.equal(lastCommandSegment("npm i || yarn"), "yarn");
  });

  it("splits on ; and returns the last segment", () => {
    assert.equal(lastCommandSegment("make; git status"), "git status");
  });

  it("does not split inside double quotes", () => {
    assert.equal(lastCommandSegment('cd "a && b" && git log'), "git log");
  });

  it("does not split inside single quotes", () => {
    assert.equal(lastCommandSegment("cd 'a && b' && git log"), "git log");
  });

  it("does not split inside backtick subshell", () => {
    assert.equal(lastCommandSegment("echo `git rev-parse` && git status"), "git status");
  });

  it("does not split inside $(...) subshell", () => {
    assert.equal(lastCommandSegment("echo $(git rev-parse) && git status"), "git status");
  });

  it("returns input unchanged when no top-level separator exists", () => {
    assert.equal(lastCommandSegment("git status"), "git status");
    assert.equal(lastCommandSegment("npm install"), "npm install");
  });

  it("returns input unchanged for empty string", () => {
    assert.equal(lastCommandSegment(""), "");
  });

  it("falls back to previous segment when last segment is empty", () => {
    // trailing separator — last segment is empty, should fall back
    assert.equal(lastCommandSegment("git status &&"), "git status");
  });

  it("trims whitespace from returned segment", () => {
    assert.equal(lastCommandSegment("cd /tmp   &&   git log"), "git log");
  });

  it("handles chained operators returning the very last non-empty segment", () => {
    assert.equal(lastCommandSegment("a && b && git diff"), "git diff");
  });

  it("returns fast on a pathological ReDoS-style string (< 50ms)", () => {
    const pathological = "a".repeat(10000) + " && " + "b".repeat(10000);
    const start = Date.now();
    lastCommandSegment(pathological);
    const elapsed = Date.now() - start;
    assert.ok(elapsed < 50, `took ${elapsed}ms, expected < 50ms`);
  });
});
