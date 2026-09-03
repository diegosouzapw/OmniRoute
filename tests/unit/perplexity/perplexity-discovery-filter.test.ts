import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDER_MODELS_CONFIG } from "../../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";

// Regression guard for #11060 — Perplexity's /v1/models endpoint lists the
// Agent API catalog (vendor-prefixed ids like "anthropic/claude-fable-5"), but
// chat requests always go to the classic /chat/completions endpoint, which only
// accepts the Sonar family. Without a PROVIDER_MODELS_CONFIG entry, generic
// model import pulled those agent-style ids into the connection's chat model
// list and every routed request failed with 400 "Invalid model". The discovery
// entry must exist and its parseResponse must keep only Sonar-family ids.

test("perplexity has a discovery entry in PROVIDER_MODELS_CONFIG", () => {
  const cfg = PROVIDER_MODELS_CONFIG.perplexity;
  assert.ok(cfg, "expected a perplexity entry in PROVIDER_MODELS_CONFIG");
  assert.equal(cfg.method, "GET");
  assert.equal(cfg.url, "https://api.perplexity.ai/v1/models");
  assert.equal(typeof cfg.parseResponse, "function");
});

test("perplexity parseResponse keeps only the Sonar family (#11060)", () => {
  const cfg = PROVIDER_MODELS_CONFIG.perplexity;
  const models = cfg.parseResponse({
    object: "list",
    data: [
      { id: "anthropic/claude-fable-5", object: "model", owned_by: "anthropic" },
      { id: "sonar-pro", object: "model", owned_by: "perplexity" },
      { id: "sonar", object: "model", owned_by: "perplexity" },
    ],
  }) as Array<{ id: string }>;

  assert.deepEqual(
    models.map((model) => model.id),
    ["sonar-pro", "sonar"]
  );
});

test("perplexity parseResponse keeps every Sonar variant and drops non-Sonar ids", () => {
  const cfg = PROVIDER_MODELS_CONFIG.perplexity;
  const models = cfg.parseResponse({
    data: [
      { id: "sonar-deep-research" },
      { id: "sonar-reasoning-pro" },
      { id: "sonar-pro" },
      { id: "sonar" },
      { id: "openai/gpt-5" },
      { id: "sonarish" },
    ],
  }) as Array<{ id: string }>;

  assert.deepEqual(
    models.map((model) => model.id),
    ["sonar-deep-research", "sonar-reasoning-pro", "sonar-pro", "sonar"]
  );
});

test("perplexity parseResponse tolerates empty and malformed payloads", () => {
  const cfg = PROVIDER_MODELS_CONFIG.perplexity;
  assert.deepEqual(cfg.parseResponse({ data: [] }), []);
  assert.deepEqual(cfg.parseResponse(undefined), []);
  assert.deepEqual(cfg.parseResponse({}), []);
});
