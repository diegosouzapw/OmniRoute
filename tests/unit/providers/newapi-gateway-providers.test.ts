// Coverage for the two NewAPI-based gateways touched alongside the AlternateFormat.urlBuilder
// hook: tabitoken (new — Claude-first, 2 protocols) and hcnsec (already shipped as an
// OpenAI-only regional entry, now declaring the 3 further protocols it actually serves).
//
// hcnsec is the first registry entry to expose the **Gemini** protocol as an alternate, and the
// Gemini route embeds the model in the path (`{base}/{model}:generateContent`) instead of a
// constant suffix. `chatPath`/`urlSuffix` cannot express that, so AlternateFormat grew an
// optional `urlBuilder` and shared.ts grew `buildGeminiGenerateContentUrl` — the same builder the
// native `gemini` provider now uses. The identity assertion at the bottom of this file is what
// keeps those two consumers from drifting apart.
//
// hcnsec's pre-existing guarantees (openai format, bearer auth, no static model seed) keep their
// own guard in tests/unit/hcnsec-provider.test.ts; the shape test here re-asserts them only to
// prove the alternates were added *without* moving the defaults.
//
// Everything is asserted through the real DefaultExecutor (not a reimplementation of the
// precedence rules) because both providers exist in the static registry — the limitation the
// older Task 3/4 tests in alternate-formats.test.ts had to work around no longer applies.
import { test } from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../../open-sse/executors/default.ts";
import { getTargetFormat } from "../../../open-sse/services/provider.ts";
import { getRegistryEntry } from "../../../open-sse/config/providerRegistry.ts";
import { buildGeminiGenerateContentUrl } from "../../../open-sse/config/providers/shared.ts";
import { geminiProvider } from "../../../open-sse/config/providers/registry/gemini/index.ts";
import { getAlternateFormats } from "../../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";
import { AI_PROVIDERS, AGGREGATOR_PROVIDER_IDS } from "../../../src/shared/constants/providers.ts";
import { APIKEY_PROVIDERS_GATEWAYS } from "../../../src/shared/constants/providers/apikey/gateways.ts";
import { APIKEY_PROVIDERS_REGIONAL } from "../../../src/shared/constants/providers/apikey/regional.ts";
import { PROVIDER_ENDPOINTS } from "../../../src/shared/constants/config.ts";

const KEY = { apiKey: "sk-test" } as never;
const withFormat = (targetFormat: string) =>
  ({ apiKey: "sk-test", providerSpecificData: { targetFormat } }) as never;

// ── tabitoken ─────────────────────────────────────────────────────────────────

test("tabitoken registry entry is Claude-first with an OpenAI alternate", () => {
  const entry = getRegistryEntry("tabitoken");
  assert.equal(entry?.format, "claude");
  assert.equal(entry?.executor, "default");
  assert.equal(entry?.authType, "apikey");
  assert.equal(entry?.authHeader, "x-api-key");
  assert.equal(entry?.baseUrl, "https://tabitoken.com/v1/messages");
  assert.equal(entry?.modelsUrl, "https://tabitoken.com/v1/models");
  assert.equal(entry?.passthroughModels, true);
  // The generic claude-format path in default.ts::buildHeaders only defaults
  // anthropic-version for `anthropic-compatible-*` ids, so the entry carries it.
  assert.equal(entry?.headers?.["Anthropic-Version"], "2023-06-01");
  // Only the two protocols tabitoken's own /api/pricing reports per model
  // (supported_endpoint_types: ["anthropic","openai"]).
  assert.deepEqual(
    (entry?.alternateFormats || []).map((a) => a.format),
    ["openai"]
  );
});

test("tabitoken catalog matches the four Claude models its public pricing endpoint lists", () => {
  const entry = getRegistryEntry("tabitoken");
  assert.deepEqual(
    (entry?.models || []).map((m) => m.id),
    ["claude-opus-5", "claude-opus-5-thinking", "claude-opus-4-8", "claude-opus-4-8-thinking"]
  );
  for (const model of entry?.models || []) {
    assert.equal(typeof model.name, "string");
    assert.ok(model.name.length > 0, `${model.id} must carry a display name`);
  }
});

test("tabitoken defaults to /v1/messages + x-api-key and switches to Bearer on the OpenAI alternate", () => {
  const executor = new DefaultExecutor("tabitoken");

  assert.equal(getTargetFormat("tabitoken", null), "claude");
  assert.equal(
    executor.buildUrl("claude-opus-5", true, 0, KEY),
    "https://tabitoken.com/v1/messages"
  );
  const claudeHeaders = executor.buildHeaders(KEY, true) as Record<string, string>;
  assert.equal(claudeHeaders["x-api-key"], "sk-test");
  assert.equal(claudeHeaders["Authorization"], undefined);
  assert.equal(claudeHeaders["Anthropic-Version"], "2023-06-01");

  assert.equal(getTargetFormat("tabitoken", { targetFormat: "openai" }), "openai");
  const openaiCreds = withFormat("openai");
  assert.equal(
    executor.buildUrl("claude-opus-5", true, 0, openaiCreds),
    "https://tabitoken.com/v1/chat/completions"
  );
  const openaiHeaders = executor.buildHeaders(openaiCreds, true) as Record<string, string>;
  assert.equal(openaiHeaders["Authorization"], "Bearer sk-test");
  assert.equal(openaiHeaders["x-api-key"], undefined);
});

test("tabitoken ignores a targetFormat it does not declare", () => {
  const executor = new DefaultExecutor("tabitoken");
  // Unknown alternate → resolveAlternateFormat returns null → default format/route/auth.
  assert.equal(getTargetFormat("tabitoken", { targetFormat: "gemini" }), "claude");
  const creds = withFormat("gemini");
  assert.equal(
    executor.buildUrl("claude-opus-5", true, 0, creds),
    "https://tabitoken.com/v1/messages"
  );
  const headers = executor.buildHeaders(creds, true) as Record<string, string>;
  assert.equal(headers["x-api-key"], "sk-test");
  assert.equal(headers["x-goog-api-key"], undefined);
});

// ── hcnsec ────────────────────────────────────────────────────────────────────

test("hcnsec keeps its OpenAI-first defaults and adds the three further protocols it serves", () => {
  const entry = getRegistryEntry("hcnsec");
  // Unchanged by this extension — the guard that adding alternates moved no default.
  assert.equal(entry?.format, "openai");
  assert.equal(entry?.executor, "default");
  assert.equal(entry?.authHeader, "bearer");
  assert.equal(entry?.baseUrl, "https://api.hcnsec.cn/v1/chat/completions");
  assert.equal(entry?.modelsUrl, "https://api.hcnsec.cn/v1/models");
  assert.deepEqual(entry?.models, []);
  assert.equal(entry?.passthroughModels, true);
  // Added: the Responses route plus one alternate per further protocol.
  assert.equal(entry?.responsesBaseUrl, "https://api.hcnsec.cn/v1/responses");
  assert.deepEqual(
    (entry?.alternateFormats || []).map((a) => a.format),
    ["claude", "openai-responses", "gemini"]
  );
});

test("hcnsec routes each protocol to its own endpoint with the matching auth scheme", () => {
  const executor = new DefaultExecutor("hcnsec");

  assert.equal(getTargetFormat("hcnsec", null), "openai");
  assert.equal(
    executor.buildUrl("gpt-5", true, 0, KEY),
    "https://api.hcnsec.cn/v1/chat/completions"
  );
  assert.equal(
    (executor.buildHeaders(KEY, true) as Record<string, string>)["Authorization"],
    "Bearer sk-test"
  );

  const claudeCreds = withFormat("claude");
  assert.equal(getTargetFormat("hcnsec", { targetFormat: "claude" }), "claude");
  assert.equal(
    executor.buildUrl("claude-opus-5", true, 0, claudeCreds),
    "https://api.hcnsec.cn/v1/messages"
  );
  const claudeHeaders = executor.buildHeaders(claudeCreds, true) as Record<string, string>;
  assert.equal(claudeHeaders["x-api-key"], "sk-test");
  assert.equal(claudeHeaders["Authorization"], undefined);
  assert.equal(claudeHeaders["Anthropic-Version"], "2023-06-01");

  const responsesCreds = withFormat("openai-responses");
  assert.equal(getTargetFormat("hcnsec", { targetFormat: "openai-responses" }), "openai-responses");
  assert.equal(
    executor.buildUrl("gpt-5", true, 0, responsesCreds),
    "https://api.hcnsec.cn/v1/responses"
  );
  assert.equal(
    (executor.buildHeaders(responsesCreds, true) as Record<string, string>)["Authorization"],
    "Bearer sk-test"
  );
});

test("hcnsec's Gemini alternate builds the model-scoped generateContent route in both forms", () => {
  const executor = new DefaultExecutor("hcnsec");
  const creds = withFormat("gemini");

  assert.equal(getTargetFormat("hcnsec", { targetFormat: "gemini" }), "gemini");
  // Unary: the model lands in the path, which is exactly what chatPath/urlSuffix
  // (both constants) could not express before urlBuilder existed.
  assert.equal(
    executor.buildUrl("gemini-3.7-flash", false, 0, creds),
    "https://api.hcnsec.cn/v1beta/models/gemini-3.7-flash:generateContent"
  );
  // Streaming keeps the `?alt=sse` suffix the Gemini protocol requires.
  assert.equal(
    executor.buildUrl("gemini-3.7-flash", true, 0, creds),
    "https://api.hcnsec.cn/v1beta/models/gemini-3.7-flash:streamGenerateContent?alt=sse"
  );

  const headers = executor.buildHeaders(creds, true) as Record<string, string>;
  assert.equal(headers["x-goog-api-key"], "sk-test");
  assert.equal(headers["Authorization"], undefined);
  assert.equal(headers["x-api-key"], undefined);
});

test("hcnsec ignores a targetFormat it does not declare", () => {
  const executor = new DefaultExecutor("hcnsec");
  assert.equal(getTargetFormat("hcnsec", { targetFormat: "codex" }), "openai");
  const creds = withFormat("codex");
  assert.equal(
    executor.buildUrl("gpt-5", true, 0, creds),
    "https://api.hcnsec.cn/v1/chat/completions"
  );
  assert.equal(
    (executor.buildHeaders(creds, true) as Record<string, string>)["Authorization"],
    "Bearer sk-test"
  );
});

// ── shared Gemini URL builder ─────────────────────────────────────────────────

test("the Gemini route builder is shared with the native gemini provider, not duplicated", () => {
  // Identity, not equality: if someone re-inlines an arrow function on either side the
  // `?alt=sse` suffix is free to drift between the two consumers. This is the guard.
  assert.equal(geminiProvider.urlBuilder, buildGeminiGenerateContentUrl);

  const geminiAlternate = (getRegistryEntry("hcnsec")?.alternateFormats || []).find(
    (a) => a.format === "gemini"
  );
  assert.equal(geminiAlternate?.urlBuilder, buildGeminiGenerateContentUrl);

  assert.equal(
    buildGeminiGenerateContentUrl("https://example.com/v1beta/models", "m", false),
    "https://example.com/v1beta/models/m:generateContent"
  );
  assert.equal(
    buildGeminiGenerateContentUrl("https://example.com/v1beta/models", "m", true),
    "https://example.com/v1beta/models/m:streamGenerateContent?alt=sse"
  );
});

test("the native gemini provider still resolves its own generateContent route", () => {
  const executor = new DefaultExecutor("gemini");
  assert.equal(
    executor.buildUrl("gemini-3.7-flash", false, 0, KEY),
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent"
  );
  assert.equal(
    executor.buildUrl("gemini-3.7-flash", true, 0, KEY),
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:streamGenerateContent?alt=sse"
  );
});

// ── dashboard / catalog registration ──────────────────────────────────────────

test("both hosts surface in the dashboard alternate-protocol picker", () => {
  assert.deepEqual(
    getAlternateFormats("tabitoken").map((a) => a.format),
    ["openai"]
  );
  assert.deepEqual(
    getAlternateFormats("hcnsec").map((a) => a.format),
    ["claude", "openai-responses", "gemini"]
  );
  // Every alternate needs a label — it is the string the picker renders.
  for (const id of ["tabitoken", "hcnsec"]) {
    for (const alternate of getAlternateFormats(id)) {
      assert.ok(alternate.label, `${id}/${alternate.format} must declare a label`);
    }
  }
});

test("tabitoken is catalogued as an aggregator gateway with a display endpoint", () => {
  const provider = (AI_PROVIDERS as Record<string, Record<string, unknown>>).tabitoken;
  assert.ok(provider, "tabitoken must be present in AI_PROVIDERS");
  assert.equal(provider.id, "tabitoken");
  assert.equal(provider.alias, "tabitoken");
  assert.equal(provider.passthroughModels, true);
  assert.equal(typeof provider.name, "string");
  assert.equal(typeof provider.website, "string");
  assert.equal(typeof provider.apiHint, "string");
  assert.ok(AGGREGATOR_PROVIDER_IDS.has("tabitoken"), "tabitoken must be an aggregator");
  // The display endpoint must name the protocol the gateway defaults to.
  assert.equal(
    (PROVIDER_ENDPOINTS as Record<string, string>).tabitoken,
    "https://tabitoken.com/v1/messages"
  );
});

test("extending hcnsec's protocols leaves its existing catalog classification alone", () => {
  // hcnsec shipped before this change as an API-key **regional** provider (its own guard:
  // tests/unit/hcnsec-provider.test.ts). Declaring three more protocols on the registry entry
  // is an engine-level capability change — it must not silently reclassify the catalog entry
  // as a gateway/aggregator, which would move it in the dashboard and in the generated
  // provider reference. This test is the guard against that drift.
  const provider = (AI_PROVIDERS as Record<string, Record<string, unknown>>).hcnsec;
  assert.ok(provider, "hcnsec must remain present in AI_PROVIDERS");
  assert.equal(provider.id, "hcnsec");
  assert.equal(provider.alias, "hcnsec");
  assert.equal(provider.passthroughModels, true);
  assert.equal(provider.name, "Huancheng Public API");
  assert.equal(provider.website, "https://api.hcnsec.cn");
  assert.equal(typeof provider.authHint, "string");
  assert.equal(
    AGGREGATOR_PROVIDER_IDS.has("hcnsec"),
    false,
    "hcnsec stays a regional provider — the protocol extension must not reclassify it"
  );

  const regional = APIKEY_PROVIDERS_REGIONAL as Record<string, unknown>;
  assert.ok(regional.hcnsec, "hcnsec must stay in the regional family file");
  const gateways = APIKEY_PROVIDERS_GATEWAYS as Record<string, unknown>;
  assert.equal(
    gateways.hcnsec,
    undefined,
    "hcnsec must not be duplicated into gateways — the families are a strict partition"
  );
});
