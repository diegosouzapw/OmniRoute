import test from "node:test";
import assert from "node:assert/strict";

const { filterConfiguredProviderEntries } = await import(
  "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts"
);

const ENTRIES = [
  {
    providerId: "openai",
    provider: { id: "openai", name: "OpenAI" },
    stats: { total: 1 },
    displayAuthType: "apikey" as const,
    toggleAuthType: "apikey" as const,
  },
  {
    providerId: "claude",
    provider: { id: "claude", name: "Claude" },
    stats: { total: 0 },
    displayAuthType: "oauth" as const,
    toggleAuthType: "oauth" as const,
  },
];

const CONNECTIONS = [
  {
    provider: "openai",
    name: "Grade-S-Node",
    providerSpecificData: { baseUrl: "http://145.10.20.30:8080" },
  },
];

function ids(query: string, connections = CONNECTIONS) {
  return filterConfiguredProviderEntries(
    ENTRIES,
    false,
    query,
    false,
    "",
    null,
    undefined,
    connections
  ).map((e) => e.providerId);
}

test("#12108 top-level search matches connection name (imported Grade-S-Node)", () => {
  assert.deepEqual(ids("Grade-S-Node"), ["openai"]);
});

test("#12108 top-level search matches connection baseUrl host", () => {
  assert.deepEqual(ids("145.10.20.30"), ["openai"]);
});

test("#12108 top-level search still matches static provider name", () => {
  assert.deepEqual(ids("claude"), ["claude"]);
});

test("#12108 top-level search without connections does not invent a name match", () => {
  assert.deepEqual(ids("Grade-S-Node", []), []);
  const withoutArg = filterConfiguredProviderEntries(ENTRIES, false, "Grade-S-Node").map(
    (e) => e.providerId
  );
  assert.deepEqual(withoutArg, []);
});

test("#12108 empty search still returns every entry", () => {
  assert.deepEqual(new Set(ids("")), new Set(["openai", "claude"]));
});

test("#12108 a connection on openai does not surface claude", () => {
  assert.equal(ids("Grade-S-Node").includes("claude"), false);
});

test("#12108 dashboard card search does not match connection email/tag/id", () => {
  const withAccountFields = [
    {
      provider: "openai",
      name: "Grade-S-Node",
      id: "conn-grade",
      email: "ops@grade.example",
      providerSpecificData: { tag: "prod-east", baseUrl: "http://145.10.20.30:8080" },
    },
  ];
  assert.deepEqual(ids("ops@grade.example", withAccountFields), []);
  assert.deepEqual(ids("prod-east", withAccountFields), []);
  assert.deepEqual(ids("conn-grade", withAccountFields), []);
  assert.deepEqual(ids("Grade-S-Node", withAccountFields), ["openai"]);
});

test("#12108 connection haystack uses matchesAnyToken (token OR, same as provider.name)", () => {
  assert.deepEqual(ids("Grade Node"), ["openai"]);
});
