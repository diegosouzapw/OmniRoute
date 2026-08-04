import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the default executor URL-normalizer extraction.
// The pure per-provider chat-URL normalizers live in default/urlNormalizers.ts
// (string transforms only). Host imports them back into buildUrl/transformRequest.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "default.ts");
const LEAF = join(EXE, "default/urlNormalizers.ts");

test("leaf hosts the normalizers and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of [
    "normalizeOpenAIChatUrl",
    "normalizeSapChatUrl",
    "getOpenRouterConnectionPreset",
  ]) {
    assert.match(src, new RegExp(`export function ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/default\.ts"/);
});

test("host imports the normalizers back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/default\/urlNormalizers\.ts"/);
});

test("normalizeOpenAIChatUrl appends chat/completions for a bare base URL", async () => {
  const { normalizeOpenAIChatUrl } =
    await import("../../open-sse/executors/default/urlNormalizers.ts");
  assert.match(normalizeOpenAIChatUrl("https://api.example.com"), /\/v1\/chat\/completions$/);
});
