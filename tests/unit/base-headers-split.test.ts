import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the base executor header-helper extraction.
// The pure upstream-header helpers live in base/headers.ts (no host state, no fetch).
// base.ts re-exports all 6 so the ~18 executors + tests that import them from "./base.ts"
// keep resolving unchanged.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "base.ts");
const LEAF = join(EXE, "base/headers.ts");

test("leaf hosts the header helpers and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of [
    "mergeUpstreamExtraHeaders",
    "setUserAgentHeader",
    "isOpenAICompatibleEndpoint",
    "stripStainlessHeadersForOpenAICompat",
  ]) {
    assert.match(src, new RegExp(`export function ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/base\.ts"/);
});

test("host re-exports all 6 header helpers for external importers", () => {
  const host = readFileSync(HOST, "utf8");
  for (const sym of [
    "mergeUpstreamExtraHeaders",
    "getCustomUserAgent",
    "setUserAgentHeader",
    "applyConfiguredUserAgent",
    "isOpenAICompatibleEndpoint",
    "stripStainlessHeadersForOpenAICompat",
  ]) {
    assert.match(host, new RegExp(`\\b${sym}\\b`));
  }
  assert.match(host, /from "\.\/base\/headers\.ts"/);
});

test("header helpers behave via base.ts (the public import path)", async () => {
  const mod = await import("../../open-sse/executors/base.ts");
  assert.equal(mod.isOpenAICompatibleEndpoint("openai-compatible-x", "https://x/y"), true);
  const headers: Record<string, string> = { "x-stainless-lang": "js", "User-Agent": "openai-node" };
  const stripped = mod.stripStainlessHeadersForOpenAICompat(
    headers,
    "openai-compatible-x",
    "https://x/v1/chat/completions"
  );
  assert.ok(stripped.includes("x-stainless-lang"));
  assert.equal(headers["x-stainless-lang"], undefined);
});
