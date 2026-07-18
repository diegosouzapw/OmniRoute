import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";

const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");

// Kiro's first OpenAI-family models, announced 2026-07-14
// (kiro.dev/changelog/models): GPT-5.6 Sol / Terra / Luna, all sharing a
// 272k context window and a 128k max-output budget on the Kiro backend.
const GPT_5_6_KIRO_MODELS = ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"] as const;

test("kiro registry exposes the GPT-5.6 Sol/Terra/Luna model ids", () => {
  const ids = new Set((REGISTRY.kiro?.models || []).map((m) => m.id));
  for (const id of GPT_5_6_KIRO_MODELS) {
    assert.ok(ids.has(id), `kiro registry must expose "${id}"`);
  }
});

test("kiro GPT-5.6 models resolve the announced 272k context window", () => {
  for (const model of GPT_5_6_KIRO_MODELS) {
    const caps = getResolvedModelCapabilities({ provider: "kiro", model });
    assert.equal(caps.contextWindow, 272000, `${model} must resolve a 272k context window`);
  }
});

test("kiro GPT-5.6 models resolve a 128k max output budget", () => {
  for (const model of GPT_5_6_KIRO_MODELS) {
    const caps = getResolvedModelCapabilities({ provider: "kiro", model });
    assert.equal(caps.maxOutputTokens, 128000, `${model} must resolve a 128k max output`);
  }
});

test("kiro GPT-5.6 models resolve through the 'kr' provider alias too", () => {
  for (const model of GPT_5_6_KIRO_MODELS) {
    const caps = getResolvedModelCapabilities({ provider: "kr", model });
    assert.equal(caps.contextWindow, 272000, `${model} must resolve via the 'kr' alias`);
  }
});
