// tests/unit/github-copilot-custom-model-target-format.test.ts
// GitHub Copilot custom models (custom-model dropdown, #2905) can carry a
// per-model targetFormat override resolving to "openai-responses" — e.g. a
// Codex-family custom model (gpt-5.6-terra/gpt-5.6-luna) that the operator
// wants routed through Copilot's native /responses endpoint instead of
// /chat/completions. GithubExecutor.buildUrl() only reads the static
// PROVIDER_MODELS registry via getModelTargetFormat("gh", model) and has no
// other way to see a custom model's override, so every custom Copilot model
// silently hit /chat/completions regardless of the dashboard's Target Format
// setting and got rejected upstream with "not accessible via the
// /chat/completions endpoint". Mirrors the zai/glm-coding-apikey fix (#7364)
// for the same class of bug.
import { test } from "node:test";
import assert from "node:assert/strict";
import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { resolveExecutionCredentials } from "../../open-sse/handlers/chatCore/executionCredentials.ts";

test("BUG: GithubExecutor.buildUrl ignores a per-model targetFormat:'openai-responses' override and still returns the chat/completions URL", () => {
  const executor = new GithubExecutor();
  const credentialsWithoutOverride = { apiKey: "test-token" };
  const url = executor.buildUrl("gpt-5.6-terra", false, 0, credentialsWithoutOverride);
  assert.ok(
    !url.endsWith("/responses"),
    "sanity check: with no override and a non-codex custom model id, buildUrl falls back to chat/completions"
  );
});

test("FIX: GithubExecutor.buildUrl honors providerSpecificData.targetFormat:'openai-responses' for a custom model", () => {
  const executor = new GithubExecutor();
  const credentialsWithOverride = {
    apiKey: "test-token",
    providerSpecificData: { targetFormat: "openai-responses" },
  };
  const url = executor.buildUrl("gpt-5.6-terra", false, 0, credentialsWithOverride);
  assert.ok(
    url.endsWith("/responses"),
    `expected the /responses endpoint when the override is set, got: ${url}`
  );
});

test("FIX: a Gemini/Claude custom model is never routed to /responses even with the override set (supportsResponsesEndpoint gate)", () => {
  const executor = new GithubExecutor();
  const credentialsWithOverride = {
    apiKey: "test-token",
    providerSpecificData: { targetFormat: "openai-responses" },
  };
  const url = executor.buildUrl("gemini-2.5-pro", false, 0, credentialsWithOverride);
  assert.ok(
    !url.endsWith("/responses"),
    "9router#1536 invariant: Gemini/Claude models must never route to /responses, even with a targetFormat override"
  );
});

const base = {
  credentials: { providerSpecificData: { foo: "bar" } } as Record<string, unknown>,
  nativeCodexPassthrough: false,
  endpointPath: "/v1/messages",
  ccSessionId: null,
};

test("github + resolved openai-responses targetFormat threads providerSpecificData.targetFormat", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "github",
    targetFormat: "openai-responses",
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, { foo: "bar", targetFormat: "openai-responses" });
});

test("github + default (non-responses) targetFormat does NOT inject a targetFormat override", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "github",
    targetFormat: "openai",
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, { foo: "bar" });
});

test("unrelated provider (openai) with targetFormat=openai-responses is untouched by the github branch", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "openai",
    targetFormat: "openai-responses",
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, { foo: "bar" });
});
