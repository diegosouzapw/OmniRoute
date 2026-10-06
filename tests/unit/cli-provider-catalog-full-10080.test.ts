import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #10080 — `loadAvailableProviders()` always returned the 6-entry
// COMMON_PROVIDERS fallback, so `omniroute keys add <provider>` rejected ~290 of
// the ~296 catalog providers with "Unknown provider". Two independent causes:
//   1. the parser required `typescript`, a devDependency absent from published
//      installs, and swallowed the failure;
//   2. it read constants/providers.ts, which after the god-file decomposition
//      holds only re-exports plus an empty `FREE_PROVIDERS = {}`.

const ROOT_DIR = path.resolve(".");
const { extractProviderBlocks, loadAvailableProviders, COMMON_PROVIDERS } =
  await import("../../bin/cli/provider-catalog.mjs");

test("extractProviderBlocks handles the shapes the real catalog files use", () => {
  const source = `
    // A comment with a stray { brace } that must not confuse the walk.
    export const NOAUTH_PROVIDERS = {
      opencode: {
        id: "opencode",
        alias: "oc",
        name: "OpenCode Free",
        noAuth: true,
        hasFree: true,
        /* block comment with } */
        notice: {
          text: "Nested object — its keys must not surface as providers.",
        },
      },
      "duckduckgo-web": {
        id: "duckduckgo-web",
        name: "DuckDuckGo AI Chat",
        hasFree: true,
      },
      legacy: {
        id: "legacy",
        name: "Legacy" + " Provider",
        website: "https://example.com/a{b}c",
        deprecated: true,
        passthroughModels: true,
      },
    };
  `;

  const providers = extractProviderBlocks(source);

  assert.deepEqual(
    providers.map((p) => p.id),
    ["opencode", "duckduckgo-web", "legacy"],
    "quoted keys must parse, nested object keys must not leak"
  );
  assert.equal(providers[0].alias, "oc");
  assert.equal(providers[0].hasFree, true);
  assert.equal(providers[0].category, "noauth");
  // A quoted key with no explicit alias/website yields nulls, not undefined.
  assert.equal(providers[1].alias, null);
  assert.equal(providers[1].website, null);
  // Concatenated strings keep the first literal; braces inside strings survive.
  assert.equal(providers[2].name, "Legacy");
  assert.equal(providers[2].website, "https://example.com/a{b}c");
  assert.equal(providers[2].deprecated, true);
  assert.equal(providers[2].passthroughModels, true);
});

test("category comes from the prefix before _PROVIDERS, including suffixed exports", () => {
  const mk = (name: string) => `export const ${name} = { a: { id: "a", name: "A" } };`;

  assert.equal(extractProviderBlocks(mk("NOAUTH_PROVIDERS"))[0].category, "noauth");
  assert.equal(extractProviderBlocks(mk("WEB_COOKIE_PROVIDERS"))[0].category, "web-cookie");
  assert.equal(extractProviderBlocks(mk("APIKEY_PROVIDERS"))[0].category, "api-key");
  // The decomposition introduced suffixed family exports; these are still api-key.
  assert.equal(extractProviderBlocks(mk("APIKEY_PROVIDERS_GATEWAYS"))[0].category, "api-key");
  assert.equal(extractProviderBlocks(mk("APIKEY_PROVIDERS_REGIONAL"))[0].category, "api-key");
});

test("an unbalanced literal terminates and keeps what was parsed", () => {
  // Regression for an infinite loop: a missing `},` (see #10093) left the outer
  // scan resetting its regex lastIndex to 0 forever.
  const broken = `
    export const APIKEY_PROVIDERS_GATEWAYS = {
      good: { id: "good", name: "Good" },
      broken: {
        id: "broken",
        name: "Broken",
      other: {
        id: "other",
        name: "Other",
      },
  `;

  const providers = extractProviderBlocks(broken);
  assert.ok(providers.length >= 1, "entries before the damage are still recovered");
  assert.equal(providers[0].id, "good");
});

test("loadAvailableProviders reads the decomposed catalog, not the 6-entry fallback", () => {
  const providers = loadAvailableProviders({ rootDir: ROOT_DIR });

  assert.ok(
    providers.length > COMMON_PROVIDERS.length,
    `expected the real catalog, got the ${providers.length}-entry fallback`
  );
  // Lower bound rather than an exact count so adding providers does not break this.
  assert.ok(providers.length > 200, `expected 200+ providers, got ${providers.length}`);

  const byId = new Map(providers.map((p) => [p.id, p]));
  for (const id of ["cerebras", "groq", "gemini", "siliconflow", "opencode", "kiro"]) {
    assert.ok(byId.has(id), `${id} missing from the catalog`);
  }
  assert.equal(byId.get("opencode")?.category, "noauth");
  assert.equal(byId.get("kiro")?.category, "oauth");
  assert.equal(byId.get("cerebras")?.category, "api-key");
  assert.ok(providers.filter((p) => p.hasFree).length > 50, "free-tier flags should survive");

  // ids are unique — the apikey barrel spreads family files that this walk also
  // visits directly, so duplicates must be collapsed.
  assert.equal(new Set(providers.map((p) => p.id)).size, providers.length);
});

test("falls back to COMMON_PROVIDERS when no catalog is present", () => {
  const emptyRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-root-"));
  try {
    const providers = loadAvailableProviders({ rootDir: emptyRoot });
    assert.equal(providers.length, COMMON_PROVIDERS.length);
    assert.equal(providers[0].id, "openai");
  } finally {
    fs.rmSync(emptyRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("an explicit catalogPath still overrides the directory walk", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-"));
  try {
    const file = path.join(dir, "custom.ts");
    fs.writeFileSync(
      file,
      `export const APIKEY_PROVIDERS = { only: { id: "only", name: "Only" } };`
    );

    const providers = loadAvailableProviders({ rootDir: ROOT_DIR, catalogPath: file });
    assert.deepEqual(
      providers.map((p) => p.id),
      ["only"]
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
