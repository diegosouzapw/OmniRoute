import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_PUBLIC_MODELS,
  getClientVisibleAntigravityModelName,
  isDiscoverableAntigravityModelId,
  isUserCallableAntigravityModelId,
  resolveAntigravityModelId,
  toClientAntigravityModelId,
  toClientAntigravityQuotaModelId,
} from "../../../open-sse/config/antigravityModelAliases.ts";
import { AntigravityExecutor } from "../../../open-sse/executors/antigravity.ts";
import { openaiToAntigravityRequest } from "../../../open-sse/translator/request/openai-to-gemini.ts";

function getPublicModel(id: string) {
  return ANTIGRAVITY_PUBLIC_MODELS.find((model) => model.id === id) as any;
}

// #10537 retired the single-alias `gemini-3.7-flash` (which mapped to the upstream
// `gemini-3.7-flash-tiered`) in favor of three directly-callable tiered public models —
// the suffixed ids now work upstream without the collapsing alias. Keep this list in sync
// with ANTIGRAVITY_PUBLIC_MODELS/ANTIGRAVITY_MODEL_ALIASES instead of the retired bare id.
const EXPECTED_FLASH_TIERS = [
  ["gemini-3.7-flash-high", "Gemini 3.7 Flash (High)"],
  ["gemini-3.7-flash-medium", "Gemini 3.7 Flash (Medium)"],
  ["gemini-3.7-flash-low", "Gemini 3.7 Flash (Low)"],
] as const;

const RETIRED_FLASH_IDS = [
  "gemini-3.6-flash-low",
  "gemini-3.6-flash-medium",
  "gemini-3.6-flash-high",
  "gemini-3.5-flash",
  "gemini-3.5-flash-extra-low",
  "gemini-3.5-flash-low",
  "gemini-3-flash-agent",
  "gemini-3.5-flash-medium",
  "gemini-3.5-flash-high",
  "gemini-3.5-flash-preview",
] as const;

test("toClientAntigravityQuotaModelId preserves upstream Gemini Flash bucket IDs", () => {
  for (const [modelId] of EXPECTED_FLASH_TIERS) {
    assert.equal(toClientAntigravityQuotaModelId(modelId), modelId);
  }
  // Always-allowed bucket passes through unchanged.
  assert.equal(toClientAntigravityQuotaModelId("credits"), "credits");
  // Retired preview buckets are dropped (hidden from clients).
  assert.equal(toClientAntigravityQuotaModelId("gemini-3.5-flash-preview"), null);
  assert.equal(toClientAntigravityQuotaModelId("gemini-3-flash-preview"), null);
  for (const retiredId of RETIRED_FLASH_IDS) {
    assert.equal(toClientAntigravityQuotaModelId(retiredId), null);
  }
  assert.equal(toClientAntigravityQuotaModelId(""), null);
});

test("resolveAntigravityModelId maps the documented Antigravity aliases to upstream IDs", () => {
  assert.equal(resolveAntigravityModelId("gemini-3-pro-image-preview"), "gemini-3-pro-image");
  for (const [modelId] of EXPECTED_FLASH_TIERS) {
    assert.equal(resolveAntigravityModelId(modelId), "gemini-3.7-flash-tiered");
  }
  assert.equal(resolveAntigravityModelId("gemini-3.7-flash"), "gemini-3.7-flash-tiered");
  assert.equal(resolveAntigravityModelId("gemini-3.7-flash-tiered"), "gemini-3.7-flash-tiered");
  assert.equal(resolveAntigravityModelId("gpt-oss-120b"), "gpt-oss-120b-medium");
  assert.equal(resolveAntigravityModelId("gemini-claude-sonnet-4-5"), "claude-sonnet-4-6");
  assert.equal(resolveAntigravityModelId("gemini-claude-sonnet-4-5-thinking"), "claude-sonnet-4-6");
  assert.equal(
    resolveAntigravityModelId("gemini-claude-opus-4-5-thinking"),
    "claude-opus-4-6-thinking"
  );
  assert.equal(resolveAntigravityModelId("unknown-model"), "unknown-model");
});

test("toClientAntigravityModelId preserves public upstream IDs", () => {
  for (const [modelId] of EXPECTED_FLASH_TIERS) {
    assert.equal(toClientAntigravityModelId(modelId), modelId);
  }
  assert.equal(toClientAntigravityModelId("gpt-oss-120b-medium"), "gpt-oss-120b-medium");
  assert.equal(toClientAntigravityModelId("claude-sonnet-4-6"), "claude-sonnet-4-6");
  assert.equal(toClientAntigravityModelId("claude-opus-4-6-thinking"), "claude-opus-4-6-thinking");
});

test("isUserCallableAntigravityModelId only allows public chat-capable model IDs", () => {
  // Retired ids and their former upstream targets are neither aliased nor callable.
  assert.equal(isUserCallableAntigravityModelId("gemini-3-pro-preview"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro"), false);
  for (const retiredId of RETIRED_FLASH_IDS) {
    assert.equal(isUserCallableAntigravityModelId(retiredId), false);
  }
  for (const [modelId] of EXPECTED_FLASH_TIERS) {
    assert.equal(isUserCallableAntigravityModelId(modelId), true);
  }
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-flash-lite"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-pro"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash-lite"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash-thinking"), false);
  assert.equal(isUserCallableAntigravityModelId("gemini-pro-agent"), true);
  // #3184: Claude IS user-callable through the Antigravity OAuth provider (same backend as
  // `agy`, verified empirically). An earlier assumption that it was removed in Antigravity
  // 2.0 was wrong.
  assert.equal(isUserCallableAntigravityModelId("claude-opus-4-6-thinking"), true);
  assert.equal(isUserCallableAntigravityModelId("claude-sonnet-4-6"), true);
  assert.equal(isUserCallableAntigravityModelId("claude-sonnet-5"), false);
  // The advertised pro-high discovery slot rejects content requests; use pro-agent High.
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-high"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-pro-agent"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-low"), true);
  assert.equal(isUserCallableAntigravityModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserCallableAntigravityModelId("unknown-model"), false);
});

test("isDiscoverableAntigravityModelId accepts new live chat models without a static catalog entry", () => {
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.8-flash-high"), true);
  assert.equal(isDiscoverableAntigravityModelId("claude-sonnet-5"), true);
  assert.equal(isDiscoverableAntigravityModelId("gemini-new-live-tier"), true);

  for (const retiredId of RETIRED_FLASH_IDS) {
    assert.equal(isDiscoverableAntigravityModelId(retiredId), false);
  }

  assert.equal(isDiscoverableAntigravityModelId("tab_flash_lite_preview"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.1-flash-image"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-3.1-flash-tts-preview"), false);
  assert.equal(isDiscoverableAntigravityModelId("gemini-2.5-flash-preview-tts"), false);
  assert.equal(isDiscoverableAntigravityModelId(""), false);
});

test("ANTIGRAVITY_PUBLIC_MODELS exposes current live names and capabilities", () => {
  // #3184: Claude is exposed in the antigravity catalog (same backend as `agy`, verified).
  // #7129: Opus 4.6, Sonnet 4.6, and Sonnet 5 graduated to a 1M-token context window at GA
  // (Anthropic docs, platform.claude.com/docs/en/build-with-claude/context-windows: "Claude
  // Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5, and Claude Sonnet 4.6 have a
  // 1M-token context window ... on the Claude API, Amazon Bedrock, Google Cloud, and Microsoft
  // Foundry" — Google Cloud coverage extends to the Antigravity-hosted ids exercised here).
  assert.deepEqual(getPublicModel("claude-opus-4-6-thinking"), {
    id: "claude-opus-4-6-thinking",
    name: "Claude Opus 4.6 (Thinking)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  });
  assert.equal(getPublicModel("claude-sonnet-4-6").name, "Claude Sonnet 4.6 (Thinking)");
  assert.equal(getPublicModel("claude-sonnet-4-6").contextLength, 1048576);
  assert.equal(getPublicModel("claude-sonnet-5"), undefined);
  for (const [modelId, displayName] of EXPECTED_FLASH_TIERS) {
    assert.deepEqual(getPublicModel(modelId), {
      id: modelId,
      name: displayName,
      contextLength: 1048576,
      maxOutputTokens: 65536,
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
    });
    assert.equal(getClientVisibleAntigravityModelName(modelId), displayName);
  }
  for (const retiredId of RETIRED_FLASH_IDS) {
    assert.equal(getPublicModel(retiredId), undefined);
  }
  assert.deepEqual(getPublicModel("gpt-oss-120b-medium"), {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  });
  assert.equal(getPublicModel("gemini-3-pro-image-preview"), undefined);
  assert.equal(getPublicModel("gemini-3.1-flash-image"), undefined);
  assert.equal(getPublicModel("gemini-2.5-computer-use-preview-10-2025"), undefined);
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

test("AntigravityExecutor.transformRequest preserves Gemini Flash upstream IDs", async () => {
  const executor = new AntigravityExecutor();
  for (const [modelId] of EXPECTED_FLASH_TIERS) {
    const result = await executor.transformRequest(
      `antigravity/${modelId}`,
      {
        request: {
          contents: [{ role: "user", parts: [{ text: "Hello" }] }],
        },
      },
      true,
      { projectId: "project-1" }
    );

    if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
    assert.equal(result.model, resolveAntigravityModelId(modelId));
    assert.deepEqual(result.request.contents, [{ role: "user", parts: [{ text: "Hello" }] }]);
  }
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
  // The thinkingBudget+1 bump lands on 32769 and survives, because this model
  // declares a limit above it. Asserting the declared limit first means a
  // catalogue change fails here with the reason rather than with a bare number
  // mismatch. The old fallback of 16384 (#4636) now applies only to models the
  // catalogue does not know, which is the case the Antigravity 400 was about.
  const declared = ANTIGRAVITY_PUBLIC_MODELS.find(
    (m) => m.id === "claude-opus-4-6-thinking"
  )?.maxOutputTokens;
  assert.equal(declared, 65536, "claude-opus-4-6-thinking's declared output limit moved");
  assert.equal(request.generationConfig.maxOutputTokens, 32769);
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
