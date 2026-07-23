import { test } from "node:test";
import assert from "node:assert";
import { findOrphanRegistryIds, KNOWN_REGISTRY_ONLY } from "../../scripts/check/check-provider-consistency.ts";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";

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

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: allowlist entry no longer needed causes gate to flag it", () => {
  // Simulate an allowlist with an entry that no longer has a live violation.
  const liveOrphans: string[] = []; // violation was corrected
  const stale = (reportStaleEntries as (a: string[], l: string[], g: string) => string[])(
    ["now-registered-provider"],
    liveOrphans,
    "provider-consistency"
  );
  assert.deepEqual(stale, ["now-registered-provider"]);
});

test("stale-enforcement: live repo has zero stale entries in KNOWN_REGISTRY_ONLY", () => {
  // KNOWN_REGISTRY_ONLY is empty today; this test anchors that invariant and will
  // catch any entry added without a corresponding live orphan.
  assert.deepEqual(Object.keys(KNOWN_REGISTRY_ONLY as Record<string, string>), []);
});
