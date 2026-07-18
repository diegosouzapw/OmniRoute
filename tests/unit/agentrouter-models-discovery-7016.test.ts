import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { CLAUDE_CODE_COMPATIBLE_USER_AGENT } from "../../open-sse/services/claudeCodeCompatible.ts";

// Regression guard for #7016 — AgentRouter's "Import from /models" must hit the
// live /v1/models endpoint. Previously the provider had no PROVIDER_MODELS_CONFIG
// entry, so model discovery fell through to the local catalog and import reported
// "API unavailable — using local catalog". The live request must also carry the
// Claude Code wire image (the same one the chat path uses) or the gateway WAF
// rejects it; AgentRouter keeps its own x-api-key auth (#6056).

test("agentrouter has a live /v1/models discovery config", () => {
  const cfg = PROVIDER_MODELS_CONFIG.agentrouter;
  assert.ok(cfg, "expected an agentrouter entry in PROVIDER_MODELS_CONFIG");
  assert.equal(cfg.method, "GET");
  assert.equal(cfg.url, "https://agentrouter.org/v1/models");
  assert.equal(typeof cfg.buildHeaders, "function");
  assert.equal(typeof cfg.parseResponse, "function");
});

test("agentrouter discovery headers carry the Claude Code wire image + x-api-key", () => {
  const cfg = PROVIDER_MODELS_CONFIG.agentrouter;
  const headers = cfg.buildHeaders!("sk-agentrouter");

  // CC wire-image markers (mirrors the chat path — see agentrouter-cc-wire-image.test.ts).
  assert.equal(headers["User-Agent"], CLAUDE_CODE_COMPATIBLE_USER_AGENT);
  assert.equal(headers["x-app"], "cli");
  assert.equal(headers["anthropic-dangerous-direct-browser-access"], "true");
  assert.ok(headers["anthropic-beta"], "expected the CC anthropic-beta header");
  assert.ok(headers["X-Stainless-Package-Version"], "expected CC X-Stainless anchors");

  // CRUX: AgentRouter keeps its OWN x-api-key auth (NOT the CC Bearer).
  assert.equal(headers["x-api-key"], "sk-agentrouter");
  assert.equal(headers["Authorization"], undefined);
});

test("agentrouter discovery parseResponse maps an OpenAI-style model list", () => {
  const cfg = PROVIDER_MODELS_CONFIG.agentrouter;
  const models = cfg.parseResponse!({
    object: "list",
    data: [
      { id: "claude-opus-4-6", object: "model", owned_by: "anthropic" },
      { id: "glm-5.1", object: "model", owned_by: "zhipu" },
    ],
  });
  assert.deepEqual(
    models,
    [
      { id: "claude-opus-4-6", object: "model", owned_by: "anthropic" },
      { id: "glm-5.1", object: "model", owned_by: "zhipu" },
    ]
  );

  // Tolerant of the alternate `models` envelope shape too.
  assert.deepEqual(cfg.parseResponse!({ models: [{ id: "deepseek-v3.2" }] }), [
    { id: "deepseek-v3.2" },
  ]);
});

test("agentrouter discovery headers leak no Authorization variant (case-insensitive)", () => {
  const cfg = PROVIDER_MODELS_CONFIG.agentrouter;
  const headers = cfg.buildHeaders!("sk-agentrouter");
  const hasAuthVariant = Object.keys(headers).some((k) => k.toLowerCase() === "authorization");
  assert.equal(hasAuthVariant, false, "no Authorization/authorization header must survive");
});

test("agentrouter parseResponse handles a bare array response (#7016)", () => {
  const cfg = PROVIDER_MODELS_CONFIG.agentrouter;
  assert.deepEqual(cfg.parseResponse!([{ id: "claude-sonnet-4-6" }]), [
    { id: "claude-sonnet-4-6" },
  ]);
});
