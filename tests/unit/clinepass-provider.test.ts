import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { unwrapClinepassEnvelope } = await import("../../open-sse/utils/clinepassEnvelope.ts");
const { filterClinepassModels } = await import("../../open-sse/services/clinepassModels.ts");
const { parseUpstreamError, buildErrorBody } = await import("../../open-sse/utils/error.ts");

// ── Provider metadata (Zod-validated APIKEY catalog) ─────────────────────────
test("ClinePass is registered as an API-key provider with the canonical identity", () => {
  const cp = APIKEY_PROVIDERS.clinepass;
  assert.ok(cp, "APIKEY_PROVIDERS.clinepass must be defined");
  assert.equal(cp.id, "clinepass");
  assert.equal(cp.alias, "clinepass");
  assert.equal(cp.name, "ClinePass");
  assert.equal(cp.website, "https://cline.bot");
  assert.equal(
    (cp as { notice?: { apiKeyUrl?: string } }).notice?.apiKeyUrl,
    "https://app.cline.bot/settings/api-keys"
  );
});

test("ClinePass registry entry uses OpenAI format with bearer apikey auth + Cline headers", () => {
  const entry = providerRegistry.clinepass;
  assert.ok(entry, "providerRegistry.clinepass must be defined");
  assert.equal(entry.id, "clinepass");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
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
