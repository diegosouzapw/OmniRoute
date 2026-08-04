// Cheaper Inference executor — the two behaviours that make /v1/responses work.
//
// Measured 2026-07-31 against api.cheaperinference.com with a live key:
//   POST /v1/responses {"model":"deepseek-v4-flash","input":"hi"}               -> 400
//   POST /v1/responses {"model":"deepseek-v4-flash","input":"hi","store":false} -> 200
// and chatCore.ts strips `store` for every provider !== "openai", so without this
// executor every Responses request through this gateway would 400.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CheaperInferenceExecutor } from "@omniroute/open-sse/executors/cheaperinference.ts";

const CREDENTIALS = { apiKey: "ir_live_test" } as never;

test("injects store:false on a Responses-tagged model", () => {
  const executor = new CheaperInferenceExecutor();
  // gpt-5.5 is tagged targetFormat:"openai-responses" in the registry.
  const out = executor.transformRequest(
    "gpt-5.5",
    { model: "gpt-5.5", input: "hi" },
    false,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.equal(out.store, false, "Responses requests must carry store:false");
});

test("overwrites a client-supplied store:true — the endpoint is stateless", () => {
  const executor = new CheaperInferenceExecutor();
  const out = executor.transformRequest(
    "gpt-5.5",
    { model: "gpt-5.5", input: "hi", store: true },
    false,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.equal(out.store, false, "store:true would 400 upstream; it must be forced to false");
});

test("does NOT inject store on a chat-completions model", () => {
  const executor = new CheaperInferenceExecutor();
  // deepseek-v4-flash has no targetFormat tag -> plain /v1/chat/completions.
  const out = executor.transformRequest(
    "deepseek-v4-flash",
    { model: "deepseek-v4-flash", messages: [{ role: "user", content: "hi" }] },
    false,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.ok(!("store" in out), "chat/completions rejects unknown params; do not add store there");
});

test("resolves the Responses URL only for Responses-tagged models", () => {
  const executor = new CheaperInferenceExecutor();
  assert.equal(
    executor.buildUrl("gpt-5.5", false, 0),
    "https://api.cheaperinference.com/v1/responses"
  );
  assert.equal(
    executor.buildUrl("deepseek-v4-flash", false, 0),
    "https://api.cheaperinference.com/v1/chat/completions"
  );
});

test("REGRESSION: targetFormat lookup resolves the provider ALIAS, not the id", async () => {
  // PROVIDER_MODELS is keyed by alias ("cinf"); PROVIDERS is keyed by id
  // ("cheaperinference"). Passing the raw provider id to getModelTargetFormat —
  // which is what executors/xai.ts does, safely, because there alias === id —
  // returns null here, silently downgrading every Responses model to
  // chat-completions and 400ing upstream. This asserts the two keyings really do
  // differ, so the alias resolution in the executor is not accidental.
  const { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS, getModelTargetFormat } = await import(
    "@omniroute/open-sse/config/providerModels.ts"
  );
  assert.equal(PROVIDER_ID_TO_ALIAS.cheaperinference, "cinf");
  assert.ok(PROVIDER_MODELS.cinf, "PROVIDER_MODELS is keyed by alias");
  assert.equal(PROVIDER_MODELS.cheaperinference, undefined, "…and NOT by provider id");
  assert.equal(getModelTargetFormat("cheaperinference", "gpt-5.5"), null);
  assert.equal(getModelTargetFormat("cinf", "gpt-5.5"), "openai-responses");
});

test("preserves the body the base executor already sanitized", () => {
  const executor = new CheaperInferenceExecutor();
  const out = executor.transformRequest(
    "gpt-5.5",
    { model: "gpt-5.5", input: "hi", temperature: 0.3, tools: [] },
    false,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.equal(out.model, "gpt-5.5");
  assert.equal(out.temperature, 0.3);
});
