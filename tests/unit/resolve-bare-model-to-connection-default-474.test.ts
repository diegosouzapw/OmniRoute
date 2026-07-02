import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveBareModelToConnectionDefault } from "@omniroute/open-sse/services/model.ts";

// #474 — When a bare model name (no "/") reaches the upstream call and the
// selected connection declares a defaultModel, the bare name must resolve to
// that real model ID. A "/"-qualified model name is an explicit provider/model
// choice and must always be left untouched.

test("bare model name resolves to the connection defaultModel", () => {
  // "auto" came from an alias; the connection's defaultModel is the concrete ID.
  const effective = resolveBareModelToConnectionDefault("auto", "auto", "gpt-4o-mini");
  assert.equal(effective, "gpt-4o-mini");
});

test('"/"-qualified model name is left untouched even when a defaultModel exists', () => {
  const effective = resolveBareModelToConnectionDefault(
    "openai/gpt-4o",
    "gpt-4o",
    "gpt-4o-mini"
  );
  assert.equal(effective, "gpt-4o");
});

test("bare model name without a connection defaultModel falls back to the resolved model", () => {
  assert.equal(resolveBareModelToConnectionDefault("auto", "auto", null), "auto");
  assert.equal(resolveBareModelToConnectionDefault("auto", "auto", undefined), "auto");
  assert.equal(resolveBareModelToConnectionDefault("auto", "auto", ""), "auto");
});

test("empty defaultModel string does not override the resolved model", () => {
  assert.equal(resolveBareModelToConnectionDefault("auto", "resolved-auto", ""), "resolved-auto");
});

test("null/undefined requested model strings are treated as non-bare (no override)", () => {
  assert.equal(resolveBareModelToConnectionDefault(null, "resolved", "default"), "resolved");
  assert.equal(resolveBareModelToConnectionDefault(undefined, "resolved", "default"), "resolved");
});

test("null resolved model with no defaultModel returns null", () => {
  assert.equal(resolveBareModelToConnectionDefault("auto", null, null), null);
});
