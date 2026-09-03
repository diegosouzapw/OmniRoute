import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveImageBaseUrl } from "@omniroute/open-sse/handlers/imageGeneration.ts";

const GEMINI_FALLBACK =
  "https://generativelanguage.googleapis.com/v1beta/openai/images/generations";

test("#3205: custom node baseUrl from providerSpecificData is used (not Gemini fallback)", () => {
  const credentials = { providerSpecificData: { baseUrl: "https://example.com/v1" } };
  const resolved = resolveImageBaseUrl(credentials, GEMINI_FALLBACK);

  assert.ok(
    resolved.startsWith("https://example.com/"),
    `expected resolved URL to point to example.com, got: ${resolved}`
  );
  // The exact-equality assertion below already guarantees the Gemini fallback
  // was not used (a substring `.includes` check trips CodeQL
  // js/incomplete-url-substring-sanitization and is redundant here).
  assert.equal(resolved, "https://example.com/v1/images/generations");
});

test("#3205: providerSpecificData.baseUrl wins over top-level credentials.baseUrl", () => {
  const credentials = {
    baseUrl: "https://toplevel.example/v1",
    providerSpecificData: { baseUrl: "https://psd.example/v1" },
  };
  const resolved = resolveImageBaseUrl(credentials, GEMINI_FALLBACK);
  assert.equal(resolved, "https://psd.example/v1/images/generations");
});

test("#3205: trailing slash on node baseUrl is normalized (no double slash)", () => {
  const credentials = { providerSpecificData: { baseUrl: "https://example.com/v1/" } };
  const resolved = resolveImageBaseUrl(credentials, GEMINI_FALLBACK);
  assert.equal(resolved, "https://example.com/v1/images/generations");
});

test("#3205: an already-complete images URL is not double-appended", () => {
  const credentials = {
    providerSpecificData: { baseUrl: "https://example.com/v1/images/generations" },
  };
  const resolved = resolveImageBaseUrl(credentials, GEMINI_FALLBACK);
  assert.equal(resolved, "https://example.com/v1/images/generations");
});

test("#3205: top-level credentials.baseUrl is honored when no providerSpecificData", () => {
  const credentials = { baseUrl: "https://legacy.example/v1" };
  const resolved = resolveImageBaseUrl(credentials, GEMINI_FALLBACK);
  assert.equal(resolved, "https://legacy.example/v1/images/generations");
});

test("#3205: falls back to provided default when no node baseUrl present", () => {
  const resolved = resolveImageBaseUrl({}, GEMINI_FALLBACK);
  assert.equal(resolved, GEMINI_FALLBACK);
  const resolvedNull = resolveImageBaseUrl(null, GEMINI_FALLBACK);
  assert.equal(resolvedNull, GEMINI_FALLBACK);
});
