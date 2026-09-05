import assert from "node:assert/strict";
import { test } from "node:test";
import { freeaiapikeyProvider } from "../../../open-sse/config/providers/registry/freeaiapikey/index.ts";

/**
 * FreeAIAPIKey retired its apex-host API and moved it to a dedicated `api.` host.
 *
 * Live probe (2026-08-13), each paired with a control call so a network fault
 * cannot be mistaken for an upstream verdict:
 *
 *   GET https://freeaiapikey.com/v1/models               → 410
 *   GET https://freeaiapikey.com/v1/chat/completions     → 410
 *   GET https://api.freeaiapikey.com/v1/models           → 200
 *   GET https://api.freeaiapikey.com/v1/chat/completions → 405   (POST-only endpoint)
 *   GET https://api.openai.com/v1/models                 → 401   (control: reachable)
 *   GET https://<nonexistent-domain>/v1/models           → 000   (control: unreachable)
 *
 * The 410 body names its own replacement, so the target host is upstream's own
 * instruction rather than an inference:
 *
 *   {"error":{"message":"This API endpoint has moved. Please update your base_url
 *    to https://api.freeaiapikey.com/v1 — the old endpoint on freeaiapikey.com no
 *    longer works.","type":"endpoint_moved","code":"endpoint_moved"}}
 *
 * Provider entry added in #2708.
 */
const LIVE_API_BASE = "https://api.freeaiapikey.com/v1";

/**
 * Every model id returned by GET https://api.freeaiapikey.com/v1/models on 2026-08-13.
 * The response carries only id/object/created/owned_by — upstream publishes no context
 * window, so models catalogued from it declare no contextLength and inherit the entry's
 * defaultContextLength rather than an invented number.
 */
const LIVE_MODEL_IDS = [
  "openai/gpt-4o",
  "openai/gpt-5.4",
  "openai/gpt-5.5",
  "openai/gpt-5.6-sol",
  "anthropic/claude-opus-4.6",
  "anthropic/claude-opus-4.7",
  "anthropic/claude-opus-4.8",
  "anthropic/claude-sonnet-4.6",
  "anthropic/claude-sonnet-5",
  "anthropic/claude-opus-5",
];

test("freeaiapikey targets the live api. host (upstream 410 endpoint_moved)", () => {
  assert.equal(
    freeaiapikeyProvider.baseUrl,
    `${LIVE_API_BASE}/chat/completions`,
    "baseUrl must point at the host named in upstream's 410 endpoint_moved body"
  );
  assert.equal(
    freeaiapikeyProvider.modelsUrl,
    `${LIVE_API_BASE}/models`,
    "modelsUrl must point at the host named in upstream's 410 endpoint_moved body"
  );
});

test("freeaiapikey keeps no endpoint on the retired freeaiapikey.com apex host", () => {
  for (const [field, url] of [
    ["baseUrl", freeaiapikeyProvider.baseUrl],
    ["modelsUrl", freeaiapikeyProvider.modelsUrl],
  ] as const) {
    assert.ok(url, `${field} must be set`);
    assert.doesNotMatch(
      url,
      /^https:\/\/freeaiapikey\.com\//,
      `${field} still targets the apex host, which answers 410 endpoint_moved`
    );
  }
});

test("freeaiapikey catalogs exactly the models upstream serves", () => {
  const declared = freeaiapikeyProvider.models.map((model) => model.id);
  assert.deepEqual(
    [...declared].sort(),
    [...LIVE_MODEL_IDS].sort(),
    "registry catalog must match the ids returned by the live /v1/models"
  );
});

test("freeaiapikey declares no duplicate model ids", () => {
  const declared = freeaiapikeyProvider.models.map((model) => model.id);
  assert.equal(new Set(declared).size, declared.length, "model ids must be unique");
});

test("freeaiapikey gives every catalogued model a display name", () => {
  for (const model of freeaiapikeyProvider.models) {
    assert.equal(typeof model.name, "string", `${model.id} must declare a name`);
    assert.ok(model.name.length > 0, `${model.id} must declare a non-empty name`);
  }
});

test("freeaiapikey keeps a provider-wide default for unpublished context windows", () => {
  // Upstream reports no context windows, so the models added from its catalog carry
  // no contextLength of their own; this default is what they fall back to.
  assert.equal(
    typeof freeaiapikeyProvider.defaultContextLength,
    "number",
    "entry must keep a defaultContextLength for models with no upstream-published window"
  );
});
