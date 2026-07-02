import test from "node:test";
import assert from "node:assert/strict";

import { friendliaiProvider } from "../../open-sse/config/providers/registry/friendliai/index.ts";
import { novitaProvider } from "../../open-sse/config/providers/registry/novita/index.ts";

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
