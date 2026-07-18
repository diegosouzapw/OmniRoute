import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS, OAUTH_PROVIDERS, supportsApiKeyOnFreeProvider } =
  await import("../../src/shared/constants/providers.ts");
const { isManagedProviderConnectionId } = await import("../../src/lib/providers/catalog.ts");
const { PROVIDERS: oauthFlows } = await import("../../src/lib/oauth/providers/index.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { unwrapClinepassEnvelope } = await import("../../open-sse/utils/clinepassEnvelope.ts");
const { filterClinepassModels } = await import("../../open-sse/services/clinepassModels.ts");
const { parseUpstreamError, buildErrorBody } = await import("../../open-sse/utils/error.ts");

// ── Provider metadata (oauth-primary catalog; single provider) ──────────────
test("ClinePass is registered as an OAuth-primary provider with the canonical identity", () => {
  const cp = OAUTH_PROVIDERS.clinepass;
  assert.ok(cp, "OAUTH_PROVIDERS.clinepass must be defined (oauth-primary catalog)");
  assert.equal(cp.id, "clinepass");
  assert.equal(cp.name, "ClinePass");
  // Single provider — NO duplicate APIKEY_PROVIDERS entry. Dual-auth (OAuth sign-in
  // + Manual API key) is rendered by the dashboard's isOAuth branch (same as
  // cline/claude), not via FREE_APIKEY_PROVIDER_IDS (which would flip isOAuth off).
  assert.ok(
    !APIKEY_PROVIDERS.clinepass,
    "clinepass must NOT be in APIKEY_PROVIDERS (single provider)"
  );
});

test("ClinePass registry entry is oauth-primary (dual-auth) with Cline headers", () => {
  const entry = providerRegistry.clinepass;
  assert.ok(entry, "providerRegistry.clinepass must be defined");
  assert.equal(entry.id, "clinepass");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "oauth");
  assert.equal(entry.authHeader, "bearer");
  assert.ok(entry.oauth, "must carry the Cline OAuth urls (sign-in path)");
  assert.equal(entry.baseUrl, "https://api.cline.bot/api/v1/chat/completions");
  assert.equal(entry.extraHeaders?.["HTTP-Referer"], "https://cline.bot");
  assert.equal(entry.extraHeaders?.["X-Title"], "Cline");
});

test("ClinePass models are cline-pass/* and deepseek entries flag reasoning", () => {
  const models = providerRegistry.clinepass.models;
  const ids = models.map((m: { id: string }) => m.id);
  assert.ok(ids.length >= 8, "expect a non-trivial seed list");
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  for (const id of ids) {
    assert.ok(id.startsWith("cline-pass/"), `${id} must be in the cline-pass/ namespace`);
  }
  const deepseek = models.filter((m: { id: string }) => m.id.includes("deepseek"));
  assert.ok(deepseek.length >= 2, "expect the two DeepSeek V4 entries");
  for (const m of deepseek) {
    assert.equal((m as { supportsReasoning?: boolean }).supportsReasoning, true);
  }
});

// ── Envelope unwrap ──────────────────────────────────────────────────────────
test("unwrapClinepassEnvelope: success unwraps to data", () => {
  const inner = { id: "chatcmpl-1", choices: [] };
  const { body, error } = unwrapClinepassEnvelope({ success: true, data: inner }, "clinepass");
  assert.equal(error, null);
  assert.deepEqual(body, inner);
});

test("unwrapClinepassEnvelope: {success:false} yields an error", () => {
  const { body, error } = unwrapClinepassEnvelope(
    { success: false, error: "empty response content", statusCode: 502 },
    "clinepass"
  );
  assert.equal(body, null);
  assert.ok(error);
  assert.equal(error?.message, "empty response content");
  assert.equal(error?.status, 502);
});

test("unwrapClinepassEnvelope: nested error.message extracted", () => {
  const { error } = unwrapClinepassEnvelope(
    { success: false, error: { message: "quota exceeded" } },
    "clinepass"
  );
  assert.equal(error?.message, "quota exceeded");
});

test("unwrapClinepassEnvelope: non-clinepass provider passes through untouched", () => {
  const payload = { success: false, error: "boom" };
  const { body, error } = unwrapClinepassEnvelope(payload, "openai");
  assert.equal(error, null);
  assert.deepEqual(body, payload);
});

test("unwrapClinepassEnvelope: non-object / array / no-success passthrough", () => {
  assert.deepEqual(unwrapClinepassEnvelope("plain", "clinepass"), { body: "plain", error: null });
  assert.deepEqual(unwrapClinepassEnvelope([1, 2], "clinepass"), { body: [1, 2], error: null });
  const bare = { id: "x" };
  assert.deepEqual(unwrapClinepassEnvelope(bare, "clinepass"), { body: bare, error: null });
});

// ── Model filter ─────────────────────────────────────────────────────────────
test("filterClinepassModels keeps only cline-pass/* ids", () => {
  const out = filterClinepassModels([
    { id: "cline-pass/glm-5.2", name: "GLM" },
    { id: "openai/gpt-5.5" },
    { id: "cline-pass/deepseek-v4-pro" },
    { notId: true },
  ]);
  assert.deepEqual(out, [
    { id: "cline-pass/glm-5.2", name: "GLM" },
    { id: "cline-pass/deepseek-v4-pro", name: "cline-pass/deepseek-v4-pro" },
  ]);
  assert.deepEqual(filterClinepassModels("not-array"), []);
});

// ── Error sanitization (Rule #12 — no stack leak) ────────────────────────────
test("parseUpstreamError unwraps clinepass envelope error without leaking a stack", async () => {
  const upstream = new Response(
    JSON.stringify({ success: false, error: "upstream at /srv/x.js:1:1 failed" }),
    { status: 502, headers: { "content-type": "application/json" } }
  );
  const parsed = await parseUpstreamError(upstream, "clinepass");
  const body = buildErrorBody(502, parsed.message) as { error: { message: string } };
  assert.ok(!body.error.message.includes("at /"), "sanitized error must not include a stack frame");
});

// ── Dual-auth: clinepass accepts BOTH an API key (#5942) AND OAuth login ─────
test("ClinePass is also in the OAuth catalog (dual-auth: API-key + OAuth login)", () => {
  const cp = OAUTH_PROVIDERS.clinepass;
  assert.ok(cp, "OAUTH_PROVIDERS.clinepass must be defined for the OAuth login path");
  assert.equal(cp.id, "clinepass");
  assert.equal(cp.name, "ClinePass");
});

test("ClinePass reuses the Cline WorkOS OAuth flow (clinepass -> cline)", () => {
  assert.ok(oauthFlows.clinepass, "clinepass must map to an OAuth flow");
  assert.equal(
    oauthFlows.clinepass,
    oauthFlows.cline,
    "clinepass must reuse the cline OAuth flow 1:1 (same api.cline.bot host/token)"
  );
});

test("ClinePass is a single OAuth-primary provider (no duplicate catalog entry)", () => {
  assert.ok(OAUTH_PROVIDERS.clinepass, "OAuth catalog entry");
  assert.ok(!APIKEY_PROVIDERS.clinepass, "no duplicate APIKEY_PROVIDERS entry");
});

// ── Dual-auth API-key admission (POST /api/providers gate) ───────────────────
// clinepass is OAuth-primary (isOAuth=true → "Connect" opens the OAuth flow) but
// ALSO accepts a pasted BYOK API key. The API-key path must pass the managed-
// connection gate (isManagedProviderConnectionId) WITHOUT flipping isOAuth off.
// That means admitting it through the dedicated DUAL_AUTH set, NOT through
// FREE_APIKEY_PROVIDER_IDS (which would set providerSupportsPat=true → isOAuth=false
// and break the primary Connect→OAuth routing). Regression guard for the layout.
test("ClinePass API-key connections pass the managed gate while staying OAuth-primary", () => {
  assert.ok(
    isManagedProviderConnectionId("clinepass"),
    "POST /api/providers must accept a clinepass apikey connection (dual-auth BYOK path)"
  );
  assert.ok(
    !supportsApiKeyOnFreeProvider("clinepass"),
    "clinepass must NOT be in FREE_APIKEY_PROVIDER_IDS — that would flip isOAuth false"
  );
});

// ── Catalog ↔ registry alias consistency (routing prefix) ───────────────────
// The dashboard sends models as `<catalogAlias>/<modelId>` (e.g. "cp/cline-pass/glm-5.2").
// Routing resolves that prefix via ALIAS_TO_PROVIDER_ID, which is built from the REGISTRY
// alias (generateAliasMap). If the registry alias drifts from the catalog alias, the prefix
// won't resolve → executor falls back to PROVIDERS.openai → requests hit api.openai.com
// with the ClinePass key → a misleading OpenAI 401. cline keeps these in sync (both "cl");
// clinepass must too. Regression guard for the cp/cline-pass/* OpenAI-401 incident.
test("ClinePass registry alias matches the OAUTH_PROVIDERS catalog alias (routing prefix)", () => {
  const cp = OAUTH_PROVIDERS.clinepass;
  assert.ok(cp?.alias, "catalog alias must be defined");
  assert.equal(
    providerRegistry.clinepass.alias,
    cp.alias,
    "registry alias must equal catalog alias so <alias>/<model> resolves to clinepass"
  );
  assert.equal(providerRegistry.clinepass.alias, "cp");
});
