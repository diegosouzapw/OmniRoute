import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-perplexity-models-"));

const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");
const { MODEL_MAP, THINKING_MAP } =
  await import("../../open-sse/executors/perplexity-web/protocol.ts");

test("Perplexity Web registers the refreshed model catalog", () => {
  const models = PROVIDER_MODELS["pplx-web"];
  assert.ok(models, "pplx-web should be in PROVIDER_MODELS");
  assert.equal(models.length, 11);

  const modelIds = models.map((model) => model.id);
  const expectedModelIds = [
    "pplx-auto",
    "pplx-gpt-5.6-terra",
    "pplx-gpt-5.6-sol",
    "pplx-sonnet",
    "pplx-opus",
    "pplx-gemini",
    "pplx-nemotron",
    "pplx-sonar",
    "pplx-kimi",
    "pplx-glm",
    "pplx-grok-4.5",
  ];
  assert.deepEqual([...modelIds].sort(), expectedModelIds.sort());
});

test("every advertised Perplexity Web model has an explicit internal mapping", () => {
  const missing = PROVIDER_MODELS["pplx-web"].filter((model) => !MODEL_MAP[model.id]);
  assert.deepEqual(missing, []);
  assert.deepEqual(MODEL_MAP["pplx-gpt-5.6-terra"], ["search", "gpt56_terra"]);
  assert.deepEqual(MODEL_MAP["pplx-gpt-5.6-sol"], ["search", "gpt56_sol"]);
  assert.deepEqual(MODEL_MAP["pplx-grok-4.5"], ["search", "grok45low"]);
  assert.equal(THINKING_MAP["pplx-gpt-5.6-terra"], "gpt56_terra_thinking");
  assert.equal(THINKING_MAP["pplx-gpt-5.6-sol"], "gpt56_sol_thinking");
  assert.equal(THINKING_MAP["pplx-grok-4.5"], "grok45medium");
});
