import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_PUBLIC_MODELS,
  getClientVisibleAntigravityModelName,
  isUserCallableAntigravityModelId,
  resolveAntigravityModelId,
  toClientAntigravityModelId,
  toClientAntigravityQuotaModelId,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

function getPublicModel(id: string) {
  return ANTIGRAVITY_PUBLIC_MODELS.find((model) => model.id === id) as any;
}

// #3821-review LEDGER-5 — the upstream quota-bucket → client-tier remap is now the single
// source of truth here (was duplicated as an inline if-ladder in usage.ts). It operates on
// the UPSTREAM quota namespace, where `gemini-3.5-flash-low` is the Medium tier's bucket.
test("toClientAntigravityQuotaModelId maps upstream quota buckets to client tiers", () => {
  assert.equal(
    toClientAntigravityQuotaModelId("gemini-3.5-flash-extra-low"),
    "gemini-3.5-flash-low"
  );
  // Dual-meaning id: in the quota namespace this bucket is the Medium tier.
  assert.equal(toClientAntigravityQuotaModelId("gemini-3.5-flash-low"), "gemini-3.5-flash-medium");
  assert.equal(toClientAntigravityQuotaModelId("gemini-3-flash-agent"), "gemini-3.5-flash-high");
  // Non-tier ids fall back to the standard reverse alias map.
  assert.equal(toClientAntigravityQuotaModelId("gemini-3.1-pro"), "gemini-3-pro-preview");
  // Always-allowed bucket passes through unchanged.
  assert.equal(toClientAntigravityQuotaModelId("credits"), "credits");
  // Retired preview buckets are dropped (hidden from clients).
  assert.equal(toClientAntigravityQuotaModelId("gemini-3.5-flash-preview"), null);
  assert.equal(toClientAntigravityQuotaModelId("gemini-3-flash-preview"), null);
  assert.equal(toClientAntigravityQuotaModelId(""), null);
});

test("resolveAntigravityModelId maps the documented Antigravity aliases to upstream IDs", () => {
  assert.equal(resolveAntigravityModelId("gemini-3-pro-preview"), "gemini-3.1-pro");
  assert.equal(resolveAntigravityModelId("gemini-3-pro-image-preview"), "gemini-3-pro-image");
  assert.equal(
    resolveAntigravityModelId("gemini-2.5-computer-use-preview-10-2025"),
    "rev19-uic3-1p"
  );
  assert.equal(resolveAntigravityModelId("gemini-3.5-flash-low"), "gemini-3.5-flash-extra-low");
  assert.equal(resolveAntigravityModelId("gemini-3.5-flash-medium"), "gemini-3.5-flash-low");
  assert.equal(resolveAntigravityModelId("gemini-3.5-flash-high"), "gemini-3-flash-agent");
  // Backward-compat: retired flagship public id routes to the High tier upstream.
  assert.equal(resolveAntigravityModelId("gemini-3.5-flash-preview"), "gemini-3-flash-agent");
  assert.equal(resolveAntigravityModelId("gemini-claude-sonnet-4-5"), "claude-sonnet-4-6");
  assert.equal(resolveAntigravityModelId("gemini-claude-sonnet-4-5-thinking"), "claude-sonnet-4-6");
  assert.equal(
    resolveAntigravityModelId("gemini-claude-opus-4-5-thinking"),
    "claude-opus-4-6-thinking"
  );
  assert.equal(resolveAntigravityModelId("unknown-model"), "unknown-model");
});

test("toClientAntigravityModelId exposes client-visible aliases for known upstream IDs", () => {
  assert.equal(toClientAntigravityModelId("gemini-3.1-pro"), "gemini-3-pro-preview");
  assert.equal(toClientAntigravityModelId("gemini-3.5-flash-extra-low"), "gemini-3.5-flash-low");
  assert.equal(toClientAntigravityModelId("gemini-3-flash-agent"), "gemini-3.5-flash-high");
  assert.equal(toClientAntigravityModelId("gpt-oss-120b-medium"), "gpt-oss-120b-medium");
  assert.equal(toClientAntigravityModelId("claude-sonnet-4-6"), "claude-sonnet-4-6");
  assert.equal(toClientAntigravityModelId("claude-opus-4-6-thinking"), "claude-opus-4-6-thinking");
});

test("isUserCallableAntigravityModelId only allows public chat-capable model IDs", () => {
  assert.equal(isUserCallableAntigravityModelId("gemini-3-pro-preview"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro"), true);
  // Retired flagship id stays callable as a hidden backward-compat alias (routes to High),
  // even though it is no longer exposed in the public catalog.
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-preview"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3-flash-agent"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-flash-lite"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-pro"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash-lite"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash-thinking"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-pro-agent"), true);
  // #3184: Claude IS user-callable through the Antigravity OAuth provider (same backend as
  // `agy`, verified empirically). An earlier assumption that it was removed in Antigravity
  // 2.0 was wrong.
  assert.equal(isUserCallableAntigravityModelId("claude-opus-4-6-thinking"), true);
  assert.equal(isUserCallableAntigravityModelId("claude-sonnet-4-6"), true);
  assert.equal(isUserCallableAntigravityModelId("claude-sonnet-5"), true);
  // Antigravity 2.0.4 exposes Gemini 3.5 Flash as separate UI tiers.
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-high"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-low"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-low"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-medium"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-high"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-extra-low"), true);
  assert.equal(isUserCallableAntigravityModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserCallableAntigravityModelId("unknown-model"), false);
});

test("ANTIGRAVITY_PUBLIC_MODELS exposes captured Antigravity 2.0.1 names and capabilities", () => {
  // #3184: Claude is exposed in the antigravity catalog (same backend as `agy`, verified).
  assert.deepEqual(getPublicModel("claude-opus-4-6-thinking"), {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 (Thinking)",
    contextLength: 200000,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  });
  assert.equal(getPublicModel("claude-sonnet-4-6").name, "Claude Sonnet 4.6 (Thinking)");
  // claude-sonnet-5 was added to the Antigravity catalog alongside the existing Claude entries.
  assert.deepEqual(getPublicModel("claude-sonnet-5"), {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5 (Thinking)",
    contextLength: 200000,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  });
  assert.deepEqual(getPublicModel("gemini-3.5-flash-high"), {
    id: "gemini-3.5-flash-high",
    name: "Gemini 3.5 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  });
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-3.5-flash-medium"),
    "Gemini 3.5 Flash (Medium)"
  );
  assert.equal(getClientVisibleAntigravityModelName("gemini-2.5-flash"), "Gemini 2.5 Flash");
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-2.5-flash-lite"),
    "Gemini 2.5 Flash Lite"
  );
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-2.5-flash-thinking"),
    "Gemini 2.5 Flash Thinking"
  );
  assert.deepEqual(getPublicModel("gpt-oss-120b-medium"), {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  });
  assert.equal(getPublicModel("gemini-3-pro-image-preview").contextLength, undefined);
  assert.equal(
    getPublicModel("gemini-2.5-computer-use-preview-10-2025").maxOutputTokens,
    undefined
  );
});

test("ANTIGRAVITY_PUBLIC_MODELS has no duplicate model IDs", () => {
  const ids = ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id);
  const seen = new Set<string>();
  const duplicates = ids.filter((id) => {
    if (seen.has(id)) return true;
    seen.add(id);
    return false;
  });
  assert.deepEqual(duplicates, [], `duplicate model IDs found: ${duplicates.join(", ")}`);
});

test("AntigravityExecutor.transformRequest resolves alias models before dispatching upstream", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-3-pro-preview",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    { projectId: "project-1" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.model, "gemini-3.1-pro");
});

test("AntigravityExecutor.transformRequest maps Gemini 3.5 Flash tiers to live upstream IDs", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-3.5-flash-high",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    { projectId: "project-1" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  // The "High" tier resolves to the live upstream id; the request body is forwarded
  // under that id. (Dropped four assertions on modelConfigId/model_config_id — the
  // executor never sets those fields, so they were vacuously true and gave false
  // confidence. #3821-review LEDGER-10.)
  assert.equal(result.model, "gemini-3-flash-agent");
  assert.deepEqual(result.request.contents, [{ role: "user", parts: [{ text: "Hello" }] }]);
});

test("AntigravityExecutor.transformRequest sends Claude through Gemini-compatible Cloud Code schema", async () => {
  const executor = new AntigravityExecutor();
  const bridged = openaiToAntigravityRequest(
    "claude-opus-4-6-thinking",
    {
      messages: [{ role: "user", content: "Hello" }],
      max_completion_tokens: 32_000,
      temperature: 0.5,
      reasoning_effort: "high",
    },
    true,
    { projectId: "project-1" } as any
  );

  const result = await executor.transformRequest(
    "antigravity/claude-opus-4-6-thinking",
    bridged,
    true,
    {
      projectId: "project-1",
    }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const request = result.request as any;
  assert.deepEqual(request.contents, [{ role: "user", parts: [{ text: "Hello" }] }]);
  // Capped to MAX_ANTIGRAVITY_OUTPUT_TOKENS (16384) by the executor (#4636) to avoid
  // the Antigravity Cloud Code 400 on maxOutputTokens > 16384, overriding the
  // thinkingBudget+1 bump (which would otherwise be 32769).
  assert.equal(request.generationConfig.maxOutputTokens, 16384);
  assert.equal(request.generationConfig.temperature, 0.5);
  assert.equal(request.generationConfig.topK, 40);
  assert.equal(request.generationConfig.topP, 1);
  assert.equal(request.messages, undefined);
  assert.equal(request.system, undefined);
  assert.equal(request.max_tokens, undefined);
  assert.equal(request.stream, undefined);
  assert.equal(request.temperature, undefined);
  assert.equal(request.thinking, undefined);
  assert.equal(request.generationConfig.thinkingConfig, undefined);
});
