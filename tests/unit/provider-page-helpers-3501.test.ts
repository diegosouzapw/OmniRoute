// Phase 2 unit tests for Issue #3501: the pure helpers extracted from the
// provider-detail god-component into providerPageHelpers.ts. Beyond asserting
// behaviour, exercising EVERY exported function guards against a missing
// transitive import in the extracted module (the Phase 0 smoke test caught one
// such gap — isSelfHostedChatProvider — at mount time; this locks it down).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  providerText,
  providerCountText,
  readBooleanToggle,
  getLocalProviderMetadata,
  isBaseUrlConfigurableProvider,
  getProviderBaseUrlDefault,
  getProviderBaseUrlHint,
  getProviderBaseUrlPlaceholder,
  isGlmProvider,
  parseRoutingTagsInput,
  parseExcludedModelsInput,
  formatRoutingTagsInput,
  formatExcludedModelsInput,
  // Phase 2b additions
  getWebSessionCredentialLabel,
  getWebSessionCredentialHint,
  getWebSessionCredentialCheckLabel,
  getAddCredentialModalTitle,
  upstreamHeadersRecordsEqual,
  UPSTREAM_HEADERS_UI_MAX,
  headerRowsToRecord,
  effectiveUpstreamHeadersForProtocol,
  anyUpstreamHeadersBadge,
  getProtoSlice,
  CODEX_REASONING_STRENGTH_OPTIONS,
  CODEX_ACCOUNT_SERVICE_TIER_VALUES,
  CODEX_GLOBAL_SERVICE_MODE_VALUES,
  getCodexServiceTierLabel,
  normalizeCodexLimitPolicy,
  getCodexRequestDefaults,
  getClaudeCodeCompatibleRequestDefaults,
  compatProtocolLabelKey,
  extractCommandCodeCredentialInput,
  normalizeAndValidateHttpBaseUrl,
  SILICONFLOW_ENDPOINTS,
  type HeaderDraftRow,
  type CompatModelRow,
  type CompatModelMap,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

const tStub = Object.assign((key: string) => key, { has: (_k: string) => false });

test("providerText falls back when key missing and interpolates values", () => {
  assert.equal(providerText(tStub, "missing.key", "Hello {name}", { name: "X" }), "Hello X");
  const tHas = Object.assign((key: string) => `T:${key}`, { has: (_k: string) => true });
  assert.equal(providerText(tHas, "present.key", "fallback"), "T:present.key");
});

test("providerCountText picks singular/plural by count", () => {
  assert.equal(providerCountText(tStub, "k", 1, "{count} item", "{count} items"), "1 item");
  assert.equal(providerCountText(tStub, "k", 3, "{count} item", "{count} items"), "3 items");
});

test("readBooleanToggle coerces booleans/numbers/strings with fallback", () => {
  assert.equal(readBooleanToggle(true, false), true);
  assert.equal(readBooleanToggle(1, false), true);
  assert.equal(readBooleanToggle("false", true), false);
  assert.equal(readBooleanToggle(undefined, true), true);
});

test("base-url helpers run without throwing (transitive imports present)", () => {
  // The key regression guard: isBaseUrlConfigurableProvider internally calls
  // isSelfHostedChatProvider — a transitive import that must be wired up.
  assert.doesNotThrow(() => isBaseUrlConfigurableProvider("openai"));
  assert.equal(typeof isBaseUrlConfigurableProvider("openai"), "boolean");
  assert.doesNotThrow(() => getLocalProviderMetadata("openai"));
  assert.doesNotThrow(() => getProviderBaseUrlDefault("openai"));
  assert.doesNotThrow(() => getProviderBaseUrlHint("openai", null));
  assert.doesNotThrow(() => getProviderBaseUrlPlaceholder("openai"));
  assert.equal(typeof isGlmProvider("glm"), "boolean");
  assert.doesNotThrow(() => isBaseUrlConfigurableProvider(null));
});

test("routing-tags / excluded-models parse + format round-trip", () => {
  assert.deepEqual(parseRoutingTagsInput("a, b ,c"), ["a", "b", "c"]);
  assert.equal(parseRoutingTagsInput("   "), undefined);
  assert.deepEqual(parseExcludedModelsInput("m1, m2"), ["m1", "m2"]);
  assert.equal(formatRoutingTagsInput(["x", "y"]), "x, y");
  assert.equal(formatExcludedModelsInput(["a", "b"]), "a, b");
  assert.equal(formatRoutingTagsInput(undefined), "");
});

// ---------------------------------------------------------------------------
// Phase 2b — runtime guards for the newly-moved helpers
// ---------------------------------------------------------------------------

const tokenReq = { kind: "token" as const, credentialName: "myToken" };
const cookieReq = { kind: "cookie" as const, credentialName: "SESS" };
const noneReq = { kind: "none" as const, credentialName: "" };

test("getWebSessionCredentialLabel (Phase 2b — transitive import guard)", () => {
  assert.ok(getWebSessionCredentialLabel(tStub, tokenReq, false).length > 0);
  assert.ok(getWebSessionCredentialLabel(tStub, cookieReq, true).length > 0);
  assert.ok(getWebSessionCredentialLabel(tStub, noneReq, false).length > 0);
});

test("getWebSessionCredentialHint returns undefined for none-kind, string otherwise", () => {
  assert.equal(getWebSessionCredentialHint(tStub, noneReq, "Acme", false), undefined);
  assert.equal(typeof getWebSessionCredentialHint(tStub, tokenReq, "Acme", false), "string");
  assert.equal(typeof getWebSessionCredentialHint(tStub, cookieReq, "Acme", true), "string");
});

test("getWebSessionCredentialCheckLabel returns a non-empty string", () => {
  assert.ok(getWebSessionCredentialCheckLabel(tStub, tokenReq).length > 0);
  assert.ok(getWebSessionCredentialCheckLabel(tStub, cookieReq).length > 0);
});

test("getAddCredentialModalTitle handles null/none/token/cookie requirements", () => {
  assert.ok(getAddCredentialModalTitle(tStub, "Acme", null).length > 0);
  assert.ok(getAddCredentialModalTitle(tStub, "Acme", noneReq).length > 0);
  assert.ok(getAddCredentialModalTitle(tStub, "Acme", tokenReq).length > 0);
  assert.ok(getAddCredentialModalTitle(tStub, "Acme", cookieReq).length > 0);
});

test("upstreamHeadersRecordsEqual is order-insensitive and correct", () => {
  assert.ok(upstreamHeadersRecordsEqual({ a: "1", b: "2" }, { b: "2", a: "1" }));
  assert.ok(!upstreamHeadersRecordsEqual({ a: "1" }, { a: "2" }));
  assert.ok(!upstreamHeadersRecordsEqual({ a: "1" }, { a: "1", b: "2" }));
  assert.equal(UPSTREAM_HEADERS_UI_MAX, 16);
});

test("headerRowsToRecord filters blank name rows and builds record", () => {
  const rows: HeaderDraftRow[] = [
    { id: "1", name: "X-Foo", value: "bar" },
    { id: "2", name: "  ", value: "ignored" },
    { id: "3", name: "X-Baz", value: "qux" },
  ];
  assert.deepEqual(headerRowsToRecord(rows), { "X-Foo": "bar", "X-Baz": "qux" });
});

test("effectiveUpstreamHeadersForProtocol merges base and protocol-specific headers", () => {
  const row: CompatModelRow = {
    id: "m1",
    upstreamHeaders: { "X-Base": "base" },
    compatByProtocol: { openai: { upstreamHeaders: { "X-Proto": "proto" } } },
  };
  const customMap: CompatModelMap = new Map([["m1", row]]);
  const overrideMap: CompatModelMap = new Map();
  const result = effectiveUpstreamHeadersForProtocol("m1", "openai", customMap, overrideMap);
  assert.equal(result["X-Base"], "base");
  assert.equal(result["X-Proto"], "proto");
});

test("anyUpstreamHeadersBadge detects non-empty upstream headers", () => {
  const row: CompatModelRow = { id: "m1", upstreamHeaders: { "X-Foo": "bar" } };
  const customMap: CompatModelMap = new Map([["m1", row]]);
  const overrideMap: CompatModelMap = new Map();
  assert.ok(anyUpstreamHeadersBadge("m1", customMap, overrideMap));
  const emptyRow: CompatModelRow = { id: "m2", upstreamHeaders: {} };
  const emptyMap: CompatModelMap = new Map([["m2", emptyRow]]);
  assert.ok(!anyUpstreamHeadersBadge("m2", emptyMap, new Map()));
});

test("getProtoSlice returns custom compat over override", () => {
  const custom: CompatModelRow = {
    compatByProtocol: { openai: { normalizeToolCallId: true } },
  };
  const override: CompatModelRow = {
    compatByProtocol: { openai: { normalizeToolCallId: false } },
  };
  const result = getProtoSlice(custom, override, "openai");
  assert.equal(result?.normalizeToolCallId, true);
});

test("CODEX_REASONING_STRENGTH_OPTIONS has expected values", () => {
  const values = CODEX_REASONING_STRENGTH_OPTIONS.map((o) => o.value);
  assert.ok(values.includes("none"));
  assert.ok(values.includes("high"));
});

test("CODEX_ACCOUNT_SERVICE_TIER_VALUES contains expected tiers", () => {
  assert.ok(CODEX_ACCOUNT_SERVICE_TIER_VALUES.includes("default"));
  assert.ok(CODEX_ACCOUNT_SERVICE_TIER_VALUES.includes("flex"));
});

test("CODEX_GLOBAL_SERVICE_MODE_VALUES starts with none", () => {
  assert.equal(CODEX_GLOBAL_SERVICE_MODE_VALUES[0], "none");
  assert.ok(CODEX_GLOBAL_SERVICE_MODE_VALUES.includes("priority"));
});

test("getCodexServiceTierLabel returns a string for every mode (transitive import guard)", () => {
  for (const mode of CODEX_GLOBAL_SERVICE_MODE_VALUES) {
    assert.equal(typeof getCodexServiceTierLabel(tStub, mode), "string");
  }
});

test("normalizeCodexLimitPolicy defaults use5h and useWeekly to true", () => {
  assert.deepEqual(normalizeCodexLimitPolicy(null), { use5h: true, useWeekly: true });
  assert.deepEqual(normalizeCodexLimitPolicy({ use5h: false }), { use5h: false, useWeekly: true });
});

test("getCodexRequestDefaults returns reasoningEffort (transitive import guard)", () => {
  const result = getCodexRequestDefaults(null);
  assert.equal(typeof result.reasoningEffort, "string");
});

test("getClaudeCodeCompatibleRequestDefaults returns CC-compatible booleans", () => {
  const result = getClaudeCodeCompatibleRequestDefaults(null);
  assert.equal(typeof result.context1m, "boolean");
  assert.equal(typeof result.redactThinking, "boolean");
  assert.equal(typeof result.summarizeThinking, "boolean");
});

test("compatProtocolLabelKey maps protocol strings to i18n keys", () => {
  assert.equal(compatProtocolLabelKey("openai"), "compatProtocolOpenAI");
  assert.equal(compatProtocolLabelKey("claude"), "compatProtocolClaude");
  assert.equal(compatProtocolLabelKey("unknown"), "compatProtocolOpenAI");
});

test("extractCommandCodeCredentialInput extracts from JSON/URL/raw (transitive import guard)", () => {
  assert.equal(extractCommandCodeCredentialInput("  "), "");
  assert.equal(extractCommandCodeCredentialInput("rawtoken"), "rawtoken");
  assert.equal(extractCommandCodeCredentialInput(JSON.stringify({ apiKey: "abc123" })), "abc123");
});

test("normalizeAndValidateHttpBaseUrl validates http/https URLs", () => {
  const ok = normalizeAndValidateHttpBaseUrl("https://api.example.com/v1", "");
  assert.equal(ok.error, null);
  assert.equal(ok.value, "https://api.example.com/v1");
  const bad = normalizeAndValidateHttpBaseUrl("ftp://nope.com", "");
  assert.ok(bad.error !== null);
  const invalid = normalizeAndValidateHttpBaseUrl("not-a-url", "");
  assert.ok(invalid.error !== null);
});

test("SILICONFLOW_ENDPOINTS has global and china entries", () => {
  const ids = SILICONFLOW_ENDPOINTS.map((e) => e.id);
  assert.ok(ids.includes("siliconflow"));
  assert.ok(ids.includes("siliconflow-cn"));
});
