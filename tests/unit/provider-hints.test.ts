import { test } from "node:test";
import assert from "node:assert/strict";
import {
  defaultUseUpstream429BreakerHints,
  resolveUseUpstream429BreakerHints,
} from "../../src/shared/utils/providerHints.ts";

test("defaultUseUpstream429BreakerHints: direct cloud providers default true", () => {
  for (const id of ["openai", "anthropic", "groq", "cerebras", "mistral", "google"]) {
    assert.equal(defaultUseUpstream429BreakerHints(id), true, `expected true for ${id}`);
  }
});

test("defaultUseUpstream429BreakerHints: cliproxyapi defaults false", () => {
  assert.equal(defaultUseUpstream429BreakerHints("cliproxyapi"), false);
});

test("defaultUseUpstream429BreakerHints: self-hosted chat providers default false", () => {
  for (const id of [
    "lm-studio",
    "vllm",
    "lemonade",
    "llamafile",
    "triton",
    "xinference",
    "oobabooga",
  ]) {
    assert.equal(defaultUseUpstream429BreakerHints(id), false, `expected false for ${id}`);
  }
});

test("defaultUseUpstream429BreakerHints: claude-code-* prefix defaults false", () => {
  for (const id of [
    "anthropic-compatible-cc-direct",
    "anthropic-compatible-cc-bedrock",
    "anthropic-compatible-cc-vertex",
  ]) {
    assert.equal(defaultUseUpstream429BreakerHints(id), false, `expected false for ${id}`);
  }
});

test("resolveUseUpstream429BreakerHints: user override wins (both directions)", () => {
  // Cloud provider with user override OFF → false
  assert.equal(resolveUseUpstream429BreakerHints("openai", false), false);
  // Cloud provider with user override ON → true (no-op vs default)
  assert.equal(resolveUseUpstream429BreakerHints("openai", true), true);
  // Proxy provider with user override ON → true (user explicitly trusted it)
  assert.equal(resolveUseUpstream429BreakerHints("cliproxyapi", true), true);
  // Proxy provider with user override OFF → false (no-op vs default)
  assert.equal(resolveUseUpstream429BreakerHints("cliproxyapi", false), false);
});

test("resolveUseUpstream429BreakerHints: undefined falls back to per-provider default", () => {
  // Critical: this is the v3 regression-test for the v1 default-vs-gate bug.
  assert.equal(resolveUseUpstream429BreakerHints("openai", undefined), true);
  assert.equal(resolveUseUpstream429BreakerHints("cliproxyapi", undefined), false);
  assert.equal(resolveUseUpstream429BreakerHints("lm-studio", undefined), false);
});
