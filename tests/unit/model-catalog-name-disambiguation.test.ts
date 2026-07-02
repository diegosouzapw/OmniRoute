import test from "node:test";
import assert from "node:assert/strict";

// Pure function — importable without DB setup.
const { disambiguateCatalogModelNames } = await import("../../src/lib/modelMetadataRegistry.ts");

type CatalogEntry = { id: string; name?: string; owned_by?: string; [key: string]: unknown };

test("leaves names untouched when each name appears under only one provider", () => {
  const models: CatalogEntry[] = [
    { id: "gh/gpt-5.5", name: "GPT-5.5", owned_by: "github" },
    { id: "cc/claude-sonnet-4-6", name: "Claude Sonnet 4.6", owned_by: "claude" },
    { id: "ds-web/deepseek-r2", name: "DeepSeek R2", owned_by: "deepseek-web" },
  ];
  const result = disambiguateCatalogModelNames(models);
  assert.equal(result[0].name, "GPT-5.5", "unique name should be unchanged");
  assert.equal(result[1].name, "Claude Sonnet 4.6", "unique name should be unchanged");
  assert.equal(result[2].name, "DeepSeek R2", "unique name should be unchanged");
});

test("qualifies names shared across multiple providers with their prefix", () => {
  const models: CatalogEntry[] = [
    { id: "gh/gpt-5.5", name: "GPT-5.5", owned_by: "github" },
    { id: "cx/gpt-5.5", name: "GPT-5.5", owned_by: "codex" },
    { id: "opencode-zen/gpt-5.5", name: "GPT-5.5", owned_by: "opencode-zen" },
    { id: "cc/claude-sonnet-4-6", name: "Claude Sonnet 4.6", owned_by: "claude" },
  ];
  const result = disambiguateCatalogModelNames(models);
  assert.equal(result[0].name, "gh/GPT-5.5", "ambiguous name should gain gh/ prefix");
  assert.equal(result[1].name, "cx/GPT-5.5", "ambiguous name should gain cx/ prefix");
  assert.equal(
    result[2].name,
    "opencode-zen/GPT-5.5",
    "ambiguous name should gain opencode-zen/ prefix"
  );
  assert.equal(result[3].name, "Claude Sonnet 4.6", "unique name should remain unqualified");
});

test("skips entries with no name field", () => {
  const models: CatalogEntry[] = [
    { id: "gh/gpt-5.5", owned_by: "github" },
    { id: "cx/gpt-5.5", owned_by: "codex" },
  ];
  const result = disambiguateCatalogModelNames(models);
  assert.equal(result[0].name, undefined, "nameless entry should stay nameless");
  assert.equal(result[1].name, undefined, "nameless entry should stay nameless");
});

test("skips entries with no provider prefix in id", () => {
  const models: CatalogEntry[] = [
    { id: "gpt-5.5", name: "GPT-5.5" },
    { id: "gpt-5.5-mini", name: "GPT-5.5" },
  ];
  const result = disambiguateCatalogModelNames(models);
  // No prefix extractable → counts as same prefix bucket, treated as same source
  // Both names should remain because disambiguation needs 2+ distinct prefixes.
  assert.equal(result[0].name, "GPT-5.5");
  assert.equal(result[1].name, "GPT-5.5");
});

test("does not mutate the original model objects", () => {
  const original: CatalogEntry = { id: "gh/gpt-5.5", name: "GPT-5.5", owned_by: "github" };
  const dup: CatalogEntry = { id: "cx/gpt-5.5", name: "GPT-5.5", owned_by: "codex" };
  const models = [original, dup];
  disambiguateCatalogModelNames(models);
  assert.equal(original.name, "GPT-5.5", "original object must not be mutated");
  assert.equal(dup.name, "GPT-5.5", "original object must not be mutated");
});

test("handles models with no name-conflicts among combo/unprefixed entries gracefully", () => {
  const models: CatalogEntry[] = [
    { id: "auto/best", owned_by: "combo" },
    { id: "my-combo", owned_by: "combo" },
    { id: "gh/gpt-4o", name: "GPT-4o", owned_by: "github" },
    { id: "cx/gpt-4o", name: "GPT-4o", owned_by: "codex" },
  ];
  const result = disambiguateCatalogModelNames(models);
  assert.equal(result[2].name, "gh/GPT-4o");
  assert.equal(result[3].name, "cx/GPT-4o");
});
