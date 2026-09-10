import { test } from "node:test";
import assert from "node:assert";
import { AI_PROVIDERS } from "@/shared/constants/providers.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import {
  findOrphanRegistryIds,
  findCatalogOnlyLlmProviders,
  KNOWN_REGISTRY_ONLY,
  KNOWN_CATALOG_ONLY,
} from "../../scripts/check/check-provider-consistency.ts";
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

// --- reverse walk (providers.ts → REGISTRY, #10513) ---

test("no reverse orphans when every llm provider has a REGISTRY entry", () => {
  const canonical = {
    openai: { serviceKinds: ["llm"] },
    deepgram: { serviceKinds: [] }, // media-only, no registry needed
  };
  assert.deepEqual(findCatalogOnlyLlmProviders(canonical, ["openai"], {}), []);
});

test("flags an llm-kind canonical provider without REGISTRY entry (half-removed)", () => {
  const canonical = {
    deadprovider: { serviceKinds: ["llm"] },
    openai: { serviceKinds: ["llm"] },
  };
  assert.deepEqual(findCatalogOnlyLlmProviders(canonical, ["openai"], {}), ["deadprovider"]);
});

test("non-llm providers without REGISTRY are not flagged (search/audio/local/media)", () => {
  const canonical = {
    "perplexity-search": { serviceKinds: ["webSearch"] },
    deepgram: { serviceKinds: [] },
  };
  assert.deepEqual(findCatalogOnlyLlmProviders(canonical, [], {}), []);
});

test("allowlisted catalog-only providers are not flagged", () => {
  const canonical = {
    "azure-openai": { serviceKinds: ["llm"] },
  };
  assert.deepEqual(
    findCatalogOnlyLlmProviders(canonical, [], { "azure-openai": "connection baseUrl" }),
    []
  );
});

test("KNOWN_CATALOG_ONLY covers every live llm provider without REGISTRY entry", () => {
  // Live-repo invariant: the allowlist + REGISTRY must together cover every
  // llm-kind canonical provider. A NEW llm provider added to the catalog without
  // a REGISTRY entry (or an allowlist entry) fails here — the exact gap
  // pacocartones identified for provider:remove --dry-run verifiability.
  const leftover = findCatalogOnlyLlmProviders(
    AI_PROVIDERS as Record<string, { serviceKinds?: string[] }>,
    Object.keys(REGISTRY as Record<string, unknown>),
    KNOWN_CATALOG_ONLY
  );
  assert.deepEqual(leftover, []);
});
