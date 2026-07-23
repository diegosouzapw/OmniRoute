import { test } from "node:test";
import assert from "node:assert/strict";
import { parseProviderImportFile } from "../../src/app/(dashboard)/dashboard/providers/components/parseProviderImportFile.ts";

// #6836 — Import providers from CSV/JSON file: parser unit tests.

test("parseProviderImportFile (csv) parses a heterogeneous provider list", () => {
  const csv = [
    "provider,name,apiKey,baseUrl,priority",
    "openai,Prod OpenAI,sk-openai-1,,1",
    "anthropic,Prod Anthropic,sk-anthropic-1,,2",
    "openai-compatible-foo,Custom Endpoint,sk-custom-1,https://foo.example.com,",
  ].join("\n");

  const result = parseProviderImportFile(csv, "csv");

  assert.equal(result.errors.length, 0);
  assert.equal(result.entries.length, 3);
  assert.deepEqual(result.entries[0], {
    provider: "openai",
    name: "Prod OpenAI",
    apiKey: "sk-openai-1",
    priority: 1,
  });
  assert.deepEqual(result.entries[2], {
    provider: "openai-compatible-foo",
    name: "Custom Endpoint",
    apiKey: "sk-custom-1",
    baseUrl: "https://foo.example.com",
  });
});

test("parseProviderImportFile (csv) skips comments and blank lines, counts them as skipped", () => {
  const csv = ["# a comment", "", "openai,Prod,sk-1,,"].join("\n");
  const result = parseProviderImportFile(csv, "csv");
  assert.equal(result.entries.length, 1);
  assert.equal(result.skipped, 2);
});

test("parseProviderImportFile (csv) works without a header row", () => {
  const csv = "anthropic,My Key,sk-abc";
  const result = parseProviderImportFile(csv, "csv");
  assert.equal(result.entries.length, 1);
  assert.equal(result.entries[0].provider, "anthropic");
});

test("parseProviderImportFile (csv) rejects a row missing required fields", () => {
  const csv = [
    "provider,name,apiKey",
    ",Missing Provider,sk-1",
    "openai,,sk-2",
    "openai,Missing Key,",
  ].join("\n");
  const result = parseProviderImportFile(csv, "csv");
  assert.equal(result.entries.length, 0);
  assert.equal(result.errors.length, 3);
  assert.equal(result.errors[0].reason, "importErrorMissingProvider");
  assert.equal(result.errors[1].reason, "importErrorMissingName");
  assert.equal(result.errors[2].reason, "importErrorMissingApiKey");
});

test("parseProviderImportFile (csv) rejects a malformed row with too few columns", () => {
  const csv = "provider,name,apiKey\nopenai,OnlyName";
  const result = parseProviderImportFile(csv, "csv");
  assert.equal(result.entries.length, 0);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].reason, "importErrorMalformedRow");
});

test("parseProviderImportFile (csv) rejects an out-of-range priority", () => {
  const csv = "openai,Prod,sk-1,,999";
  const result = parseProviderImportFile(csv, "csv");
  assert.equal(result.entries.length, 0);
  assert.equal(result.errors[0].reason, "importErrorInvalidPriority");
});

test("parseProviderImportFile (json) parses a heterogeneous provider list", () => {
  const json = JSON.stringify([
    { provider: "openai", name: "Prod OpenAI", apiKey: "sk-openai-1" },
    {
      provider: "anthropic-compatible-bar",
      name: "Custom Anthropic",
      apiKey: "sk-bar-1",
      baseUrl: "https://bar.example.com",
      priority: 5,
    },
  ]);

  const result = parseProviderImportFile(json, "json");
  assert.equal(result.errors.length, 0);
  assert.equal(result.entries.length, 2);
  assert.equal(result.entries[1].priority, 5);
  assert.equal(result.entries[1].baseUrl, "https://bar.example.com");
});

test("parseProviderImportFile (json) rejects malformed JSON", () => {
  const result = parseProviderImportFile("{not valid json", "json");
  assert.equal(result.entries.length, 0);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].reason, "importErrorMalformedRow");
});

test("parseProviderImportFile (json) rejects a non-array top-level value", () => {
  const result = parseProviderImportFile(JSON.stringify({ provider: "openai" }), "json");
  assert.equal(result.entries.length, 0);
  assert.equal(result.errors[0].reason, "importErrorNotArray");
});

test("parseProviderImportFile (json) reports per-row errors and keeps parsing the rest", () => {
  const json = JSON.stringify([
    { provider: "openai", name: "Prod", apiKey: "sk-1" },
    { provider: "", name: "Bad Row", apiKey: "sk-2" },
    { provider: "anthropic", name: "Prod2", apiKey: "sk-3" },
  ]);
  const result = parseProviderImportFile(json, "json");
  assert.equal(result.entries.length, 2);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].line, 2);
  assert.equal(result.errors[0].reason, "importErrorMissingProvider");
});
