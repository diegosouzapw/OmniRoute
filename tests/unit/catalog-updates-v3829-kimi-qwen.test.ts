// Regression guard for two catalog fixes shipped in v3.8.29:
//
// 1. Task 1 — moonshotai/kimi-k2.7-code added to the kimi-coding-apikey (kmca)
//    provider catalog (KIMI_CODING_SHARED.models in open-sse/config/providers/shared.ts).
//    Requested by @hana189 in discussion #3737.
//
// 2. Bug #3 (issue #3931) — qwen-web missing from PROVIDER_MODELS_CONFIG in
//    src/app/api/providers/[id]/models/route.ts, so the model discovery page for
//    the web-cookie provider returned nothing. Identified by @thezukiru in #3895.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

// ── Task 1: kimi-k2.7-code in kmca (kimi-coding-apikey) ───────────────────────

test("kmca (kimi-coding-apikey) catalog includes moonshotai/kimi-k2.7-code", () => {
  const models = getModelsByProviderId("kmca");
  const ids = new Set(models.map((m) => m.id));
  assert.ok(
    ids.has("moonshotai/kimi-k2.7-code"),
    "moonshotai/kimi-k2.7-code missing from kmca — add to KIMI_CODING_SHARED.models in shared.ts"
  );
});

test("kmca kimi-k2.7-code has 262144 context length and maxOutputTokens", () => {
  const models = getModelsByProviderId("kmca");
  const model = models.find((m) => m.id === "moonshotai/kimi-k2.7-code");
  assert.ok(model, "moonshotai/kimi-k2.7-code not found in kmca catalog");
  assert.equal(model.contextLength, 262144, "kimi-k2.7-code contextLength must be 262144");
  assert.equal(model.maxOutputTokens, 262144, "kimi-k2.7-code maxOutputTokens must be 262144");
});

test("kmca still exposes kimi-k2.6 and kimi-k2.6-thinking alongside the new model", () => {
  const ids = new Set(getModelsByProviderId("kmca").map((m) => m.id));
  assert.ok(ids.has("kimi-k2.6"), "kimi-k2.6 must still be present");
  assert.ok(ids.has("kimi-k2.6-thinking"), "kimi-k2.6-thinking must still be present");
  assert.ok(ids.has("moonshotai/kimi-k2.7-code"), "moonshotai/kimi-k2.7-code must be present");
});

// ── Bug #3 / issue #3931: qwen-web in PROVIDER_MODELS_CONFIG ──────────────────

// PROVIDER_MODELS_CONFIG was extracted from the discovery route into the
// discovery/ leaf (refactor: split provider-models discovery route). The
// source-guard follows the config to its new home.
const CONFIG_FILE = path.join(
  "src",
  "app",
  "api",
  "providers",
  "[id]",
  "models",
  "discovery",
  "providerModelsConfig.ts"
);

test("PROVIDER_MODELS_CONFIG contains a qwen-web entry (issue #3931 bug #3)", () => {
  const src = fs.readFileSync(CONFIG_FILE, "utf-8");
  assert.match(
    src,
    /"qwen-web"\s*:/,
    '"qwen-web" key missing from PROVIDER_MODELS_CONFIG in discovery/providerModelsConfig.ts'
  );
});

test("qwen-web PROVIDER_MODELS_CONFIG entry targets chat.qwen.ai/api/v2/models", () => {
  const src = fs.readFileSync(CONFIG_FILE, "utf-8");
  assert.match(
    src,
    /chat\.qwen\.ai\/api\/v2\/models/,
    "qwen-web discovery URL must be https://chat.qwen.ai/api/v2/models"
  );
});

test("qwen-web parseResponse handles Qwen nested data.data structure", () => {
  const mockResponse = {
    data: {
      data: [
        { id: "qwen3.7-plus", name: "Qwen3.7-Plus", owned_by: "qwen" },
        { id: "qwen3-235b-a22b", name: "Qwen3-235B-A22B", owned_by: "qwen" },
        { id: "qwen3-coder-480b", name: "Qwen3-Coder-480B" },
      ],
    },
  };

  // parseResponse logic matches PROVIDER_MODELS_CONFIG["qwen-web"].parseResponse
  const innerData: Array<Record<string, unknown>> =
    (mockResponse?.data?.data as Array<Record<string, unknown>>) ||
    (mockResponse?.data as unknown as Array<Record<string, unknown>>) ||
    [];
  const models = innerData
    .map((item) => ({
      id: (item.id || item.name) as string,
      name: (item.name || item.id) as string,
      owned_by: (item.owned_by || "qwen") as string,
    }))
    .filter((m) => m.id);

  assert.equal(models.length, 3);
  assert.equal(models[0].id, "qwen3.7-plus");
  assert.equal(models[0].name, "Qwen3.7-Plus");
  assert.equal(models[0].owned_by, "qwen");
  assert.equal(models[2].owned_by, "qwen", "owned_by defaults to 'qwen' when absent");
});

test("qwen-web parseResponse handles flat data array fallback", () => {
  const mockResponse = {
    data: [{ id: "qwen3.7-plus", name: "Qwen3.7-Plus" }],
  };

  const innerData: Array<Record<string, unknown>> =
    (mockResponse?.data as unknown as { data?: Array<Record<string, unknown>> })?.data ||
    (mockResponse?.data as unknown as Array<Record<string, unknown>>) ||
    [];
  const models = innerData
    .map((item) => ({
      id: (item.id || item.name) as string,
      name: (item.name || item.id) as string,
      owned_by: (item.owned_by || "qwen") as string,
    }))
    .filter((m) => m.id);

  assert.equal(models.length, 1);
  assert.equal(models[0].id, "qwen3.7-plus");
});
