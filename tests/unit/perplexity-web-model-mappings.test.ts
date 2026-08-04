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
  assert.deepEqual(MODEL_MAP["pplx-gpt-5.6-terra"], ["copilot", "gpt56_terra"]);
  assert.deepEqual(MODEL_MAP["pplx-gpt-5.6-sol"], ["copilot", "gpt56_sol"]);
  assert.deepEqual(MODEL_MAP["pplx-grok-4.5"], ["copilot", "grok45low"]);
  assert.equal(THINKING_MAP["pplx-gpt-5.6-terra"], "gpt56_terra_thinking");
  assert.equal(THINKING_MAP["pplx-gpt-5.6-sol"], "gpt56_sol_thinking");
  assert.equal(THINKING_MAP["pplx-grok-4.5"], "grok45medium");
});

// ─── No catalog entry may post mode "search" ────────────────────────────────
// The backend downgrades "search" to CONCISE, drops model_preference and ends the
// stream with status:"FAILED" ("Error in processing query."), so a single "search"
// entry silently breaks that model.

test("MODEL_MAP: every entry uses copilot mode", () => {
  const offenders = Object.entries(MODEL_MAP)
    .filter(([, [mode]]) => mode !== "copilot")
    .map(([model, [mode]]) => `${model}=${mode}`);

  assert.deepEqual(offenders, []);
});

test("MODEL_MAP/THINKING_MAP: pplx-opus resolves to Claude Opus 5", () => {
  assert.deepEqual(MODEL_MAP["pplx-opus"], ["copilot", "claude50opus"]);
  assert.equal(THINKING_MAP["pplx-opus"], "claude50opusthinking");
});

// ─── The search hint is opt-in ──────────────────────────────────────────────
// It used to be appended to every system message and leaked into answers as
// meta-commentary, which is noise for coding clients.

test("buildQuery: search hint is off by default and opt-in via env", async () => {
  const { buildQuery } = await import("../../open-sse/executors/perplexity-web/protocol.ts");
  const parsed = { systemMsg: "You are terse.", history: [], currentMsg: "hi" };
  const HINT = "built-in web search";
  const prev = process.env.OMNIROUTE_PPLX_SEARCH_HINT;

  try {
    delete process.env.OMNIROUTE_PPLX_SEARCH_HINT;
    const off = JSON.parse(buildQuery(parsed, null));
    assert.deepEqual(off.instructions, ["You are terse."]);
    assert.equal(off.query, "hi");

    process.env.OMNIROUTE_PPLX_SEARCH_HINT = "1";
    const on = JSON.parse(buildQuery(parsed, null));
    assert.equal(on.instructions.length, 2);
    assert.ok(on.instructions[1].includes(HINT));

    process.env.OMNIROUTE_PPLX_SEARCH_HINT = "0";
    assert.equal(JSON.parse(buildQuery(parsed, null)).instructions.length, 1);
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_PPLX_SEARCH_HINT;
    else process.env.OMNIROUTE_PPLX_SEARCH_HINT = prev;
  }
});
