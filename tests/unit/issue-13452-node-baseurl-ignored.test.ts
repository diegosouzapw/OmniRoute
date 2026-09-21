import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";

// Issue #13452 — Bug 2: a provider-node ("openai-compatible-*" /
// "anthropic-compatible-*") connection whose credentials carry no
// providerSpecificData.baseUrl (e.g. a connection created any way other than
// the exact POST /api/providers hydration branch, or the node-update
// backfill loop) used to silently fall back to the literal
// "https://api.openai.com/v1" / "https://api.anthropic.com/v1" instead of
// erroring or re-resolving the node's configured baseUrl. Real traffic meant
// for a local OpenAI-compatible endpoint (Ollama/vLLM/LM Studio) was instead
// sent to the real OpenAI API, carrying whatever string was stored as the
// "API key" as a Bearer token to a public third party.
//
// Fix: buildUrl() now fails loudly (throws) instead of defaulting, and the
// credential-selection read path (src/sse/services/auth.ts) self-heals by
// re-joining provider_nodes before a request ever reaches buildUrl().

test("issue #13452: DefaultExecutor openai-compatible buildUrl must not silently fall back to the real OpenAI API when providerSpecificData.baseUrl is absent", () => {
  const nodeId = "openai-compatible-chat-test-node";
  const executor = new DefaultExecutor(nodeId);

  // Simulates the credentials row a hand-created / non-hydrated connection
  // produces: no providerSpecificData.baseUrl at all, even though the node
  // itself (in provider_nodes) has baseUrl = "http://localhost:11434/v1".
  const credentialsWithoutHydration = { apiKey: "ollama" };

  assert.throws(
    () => executor.buildUrl("qwen3.6:35b-a3b", false, 0, credentialsWithoutHydration),
    /baseUrl/,
    "buildUrl() must fail loudly instead of silently defaulting an unhydrated openai-compatible " +
      "connection to the real OpenAI API — this WAS the reported bug (#13452)"
  );
});

test("issue #13452: BaseExecutor openai-compatible buildUrl must not silently fall back to the real OpenAI API when providerSpecificData.baseUrl is absent", () => {
  const executor = new BaseExecutor("openai-compatible-responses-test-node", {});

  assert.throws(() => executor.buildUrl("gpt-5.4", true, 0, { apiKey: "local-key" }), /baseUrl/);
});

test("issue #13452: DefaultExecutor anthropic-compatible buildUrl must not silently fall back to the real Anthropic API when providerSpecificData.baseUrl is absent", () => {
  const executor = new DefaultExecutor("anthropic-compatible-test-node");

  assert.throws(
    () => executor.buildUrl("claude-sonnet-4-6", true, 0, { apiKey: "local-key" }),
    /baseUrl/
  );
});

test("issue #13452 (control): providing providerSpecificData.baseUrl routes correctly (confirms the fallback, not buildUrl() itself, was the defect)", () => {
  const nodeId = "openai-compatible-chat-test-node-2";
  const executor = new DefaultExecutor(nodeId);

  const hydratedCredentials = {
    apiKey: "ollama",
    providerSpecificData: { baseUrl: "http://localhost:11434/v1" },
  };

  const url = executor.buildUrl("qwen3.6:35b-a3b", false, 0, hydratedCredentials);

  assert.equal(url, "http://localhost:11434/v1/chat/completions");
});
