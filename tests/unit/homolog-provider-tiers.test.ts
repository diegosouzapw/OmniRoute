import { test } from "node:test";
import assert from "node:assert/strict";
import { pickSmokeModels } from "../../scripts/homolog/lib/providerTiers.mjs";

const CATALOG = [
  { id: "openai/gpt-5-mini" },
  { id: "openai/gpt-5" },
  { id: "anthropic/claude-sonnet-5" },
  { id: "mistral/mistral-small" },
  { id: "grok/grok-4-fast" },
];

test("1 modelo por provider crítico (o primeiro do catálogo)", () => {
  const picks = pickSmokeModels(CATALOG, ["openai", "anthropic", "grok"]);
  assert.deepEqual(
    picks.map((p) => p.model),
    ["openai/gpt-5-mini", "anthropic/claude-sonnet-5", "grok/grok-4-fast"]
  );
});

test("provider crítico ausente do catálogo vira miss reportável", () => {
  const picks = pickSmokeModels(CATALOG, ["openai", "nvidia"]);
  assert.equal(picks.find((p) => p.provider === "nvidia").model, null);
});
