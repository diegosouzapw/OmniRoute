import test from "node:test";
import assert from "node:assert/strict";

import { friendliaiProvider } from "../../../open-sse/config/providers/registry/friendliai/index.ts";
import { novitaProvider } from "../../../open-sse/config/providers/registry/novita/index.ts";

// These guards lock in two registry endpoint fixes validated live with real provider keys
// (Hard Rule #18 — real-environment test recorded in the PR):
//   - FriendliAI: a serverless `flp_*` token gets 403 Forbidden on the /dedicated path; the
//     /serverless path serves it. (#5430)
//   - Novita: the legacy /v3 base + the typo'd `ai-ai/…` model id both 404; /openai/v1 + the
//     `meta-llama/…` id return a clean OpenAI completion. (#5455)

test("#5430 FriendliAI targets the serverless OpenAI-compatible endpoint, not dedicated", () => {
  assert.ok(
    friendliaiProvider.baseUrl.includes("/serverless/v1/"),
    `baseUrl must use the serverless path, got: ${friendliaiProvider.baseUrl}`
  );
  assert.ok(
    !friendliaiProvider.baseUrl.includes("/dedicated/"),
    "baseUrl must not use the dedicated path (403s serverless keys)"
  );
  assert.equal(friendliaiProvider.modelsUrl, "https://api.friendli.ai/serverless/v1/models");
});

test("#5455 Novita targets the /openai/v1 endpoint with a valid model id", () => {
  assert.equal(novitaProvider.baseUrl, "https://api.novita.ai/openai/v1/chat/completions");
  assert.equal(novitaProvider.modelsUrl, "https://api.novita.ai/openai/v1/models");
  // The `ai-ai/` org does not exist — Novita uses `meta-llama/…`.
  assert.ok(
    novitaProvider.models.every((m) => !m.id.startsWith("ai-ai/")),
    "Novita model ids must not use the non-existent ai-ai/ org"
  );
  assert.ok(
    novitaProvider.models.some((m) => m.id === "meta-llama/llama-3.1-8b-instruct"),
    "Novita must list the valid meta-llama/llama-3.1-8b-instruct id"
  );
});

test("#5455 Novita catalog lists only live `status: 1` model ids from /openai/v1/models", () => {
  const ids = novitaProvider.models.map((m) => m.id);

  // Net-new ids seeded from the live public listing — each was MISSING from the
  // single-model registry entry before this catalog expansion (failing-before assertion).
  const expectedNewIds = [
    "deepseek/deepseek-v4-pro",
    "deepseek/deepseek-v4-flash",
    "deepseek/deepseek-v3.2",
    "moonshotai/kimi-k3",
    "moonshotai/kimi-k2.6",
    "zai-org/glm-5.2",
    "zai-org/glm-4.7",
    "minimax/minimax-m3",
    "qwen/qwen3.7-max",
    "qwen/qwen3-coder-480b-a35b-instruct",
    "xiaomimimo/mimo-v2.5-pro",
    "openai/gpt-oss-120b",
    "google/gemma-4-31b-it",
  ];
  for (const id of expectedNewIds) {
    assert.ok(ids.includes(id), `expected model id "${id}" to be present`);
  }

  // Retired generations (`status: 4` in the live listing) and the unnamespaced staging
  // ids it also returns must never reach the catalog.
  const mustNotBeListed = [
    "meta-llama/llama-3-8b-instruct",
    "zai-org/glm-4.5",
    "qwen/qwen2.5-7b-instruct",
    "bunny",
    "elephant",
    "dev/glm46",
    "ai_infer_test_2",
  ];
  for (const id of mustNotBeListed) {
    assert.ok(!ids.includes(id), `retired/staging model id "${id}" must not be listed`);
  }
});

test("Novita `supportsVision` reflects a live image request, not the listing's modalities", () => {
  // `openai/gpt-oss-120b` advertises `input_modalities: ["text","image"]` on
  // /openai/v1/models but answers "I cannot see the image" when actually sent one, so the
  // listing cannot be trusted as the source for this flag. Pinned so a future catalog
  // refresh that re-copies `input_modalities` wholesale fails here instead of shipping a
  // capability the model does not have.
  const byId = new Map(novitaProvider.models.map((m) => [m.id, m]));
  assert.equal(
    byId.get("openai/gpt-oss-120b")?.supportsVision,
    undefined,
    "gpt-oss-120b reports image input but cannot read images; it must not claim vision"
  );

  // Verified to return a correct description of a two-colour test image.
  for (const id of [
    "moonshotai/kimi-k3",
    "moonshotai/kimi-k2.7-code",
    "moonshotai/kimi-k2.6",
    "minimax/minimax-m3",
    "qwen/qwen3.6-plus",
    "qwen/qwen3.5-397b-a17b",
    "google/gemma-4-31b-it",
  ]) {
    assert.equal(byId.get(id)?.supportsVision, true, `${id} was verified to read images`);
  }
});

test("Novita catalog has no duplicate model ids and every entry carries a context window", () => {
  const ids = novitaProvider.models.map((m) => m.id);
  assert.equal(new Set(ids).size, ids.length, `duplicate Novita model ids: ${ids.join(", ")}`);

  for (const m of novitaProvider.models) {
    assert.ok(
      typeof m.contextLength === "number" && m.contextLength > 0,
      `model "${m.id}" must declare a positive contextLength`
    );
  }
});
