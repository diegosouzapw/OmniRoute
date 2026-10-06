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
    "pplx-grok-4.6",
  ];
  assert.deepEqual([...modelIds].sort(), expectedModelIds.sort());

  const modelNames = new Map(models.map((model) => [model.id, model.name]));
  assert.equal(modelNames.get("pplx-gemini"), "Gemini 3.7 Flash (via Perplexity)");
  assert.equal(modelNames.get("pplx-kimi"), "Kimi K3 (via Perplexity)");
  assert.equal(modelNames.get("pplx-grok-4.6"), "Grok 4.6 (via Perplexity)");
});

test("every advertised Perplexity Web model has an explicit internal mapping", () => {
  const missing = PROVIDER_MODELS["pplx-web"].filter((model) => !MODEL_MAP[model.id]);
  assert.deepEqual(missing, []);
  assert.deepEqual(MODEL_MAP["pplx-gpt-5.6-terra"], ["copilot", "gpt56_terra"]);
  assert.deepEqual(MODEL_MAP["pplx-gpt-5.6-sol"], ["copilot", "gpt56_sol"]);
  assert.deepEqual(MODEL_MAP["pplx-gemini"], ["copilot", "gemini37flash"]);
  assert.deepEqual(MODEL_MAP["pplx-kimi"], ["copilot", "kimik3thinking"]);
  assert.deepEqual(MODEL_MAP["pplx-grok-4.6"], ["copilot", "grok46low"]);
  assert.deepEqual(MODEL_MAP["pplx-opus"], ["copilot", "claude50opus"]);
  assert.equal(THINKING_MAP["pplx-gemini"], "gemini37flashthinking");
  assert.equal(THINKING_MAP["pplx-opus"], "claude50opusthinking");
  assert.equal(THINKING_MAP["pplx-gpt-5.6-terra"], "gpt56_terra_thinking");
  assert.equal(THINKING_MAP["pplx-gpt-5.6-sol"], "gpt56_sol_thinking");
  assert.equal(THINKING_MAP["pplx-kimi"], "kimik3thinking");
  assert.equal(THINKING_MAP["pplx-grok-4.6"], "grok46medium");
  assert.equal(MODEL_MAP["pplx-grok-4.5"], undefined);
  assert.equal(THINKING_MAP["pplx-grok-4.5"], undefined);
});
