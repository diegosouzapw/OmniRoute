import { test } from "node:test";
import assert from "node:assert";
import { findOrphanRegistryIds } from "../../scripts/check/check-provider-consistency.ts";

const known = new Set(["openai", "anthropic", "gemini"]);
const isKnown = (id: string) => known.has(id);

test("no orphans when every registry id is a known provider", () => {
  assert.deepEqual(findOrphanRegistryIds(["openai", "anthropic"], isKnown, {}), []);
});

test("flags a registry id that is not a canonical provider (hallucinated/half-registered)", () => {
  assert.deepEqual(findOrphanRegistryIds(["openai", "ghostprovider"], isKnown, {}), ["ghostprovider"]);
});

test("allowlisted ids are not flagged", () => {
  assert.deepEqual(
    findOrphanRegistryIds(["openai", "krutrim"], isKnown, { krutrim: "pré-existente" }),
    []
  );
});

test("flags multiple orphans, preserves order", () => {
  assert.deepEqual(findOrphanRegistryIds(["a", "openai", "b"], isKnown, {}), ["a", "b"]);
});
