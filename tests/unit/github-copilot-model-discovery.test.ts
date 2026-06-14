/**
 * Issues #3120 / #3121 — GitHub Copilot model discovery (thanks @gabrielmoreira).
 *
 * #3120: "Import Models" never refreshes the Copilot model list because the
 *        `github` (Copilot) provider had a STATIC hardcoded catalog and no live
 *        discovery source.
 * #3121: That static catalog advertised models (e.g. gemini previews) that the
 *        account is not entitled to, so testing them returned upstream 400s.
 *
 * Fix: discover the catalog live from https://api.githubcopilot.com/models using
 * the Copilot bearer + Copilot chat headers, parse `data[].id` into managed
 * models, and fall back to the static catalog only when the live fetch fails.
 *
 * These tests target the discovery helper directly (injected fetch) so they need
 * no HTTP server or DB.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  GITHUB_COPILOT_MODELS_URL,
  parseGitHubCopilotModels,
  fetchGitHubCopilotModels,
} = await import("../../open-sse/services/githubCopilotModels.ts");

// A representative slice of a real Copilot /models response. Crucially it
// includes models the account IS entitled to, and OMITS gemini previews to
// prove non-entitled models are not advertised (#3121).
const MOCK_COPILOT_MODELS_RESPONSE = {
  data: [
    {
      id: "gpt-5.4",
      name: "GPT-5.4",
      model_picker_enabled: true,
      policy: { state: "enabled" },
      capabilities: { type: "chat", limits: { max_context_window_tokens: 128000 } },
    },
    {
      id: "claude-sonnet-4.5",
      name: "Claude Sonnet 4.5",
      model_picker_enabled: true,
      capabilities: { type: "chat" },
    },
    {
      // embeddings model — not a chat model; discovery should still surface the id
      id: "text-embedding-3-small",
      name: "Embedding V3 small",
      capabilities: { type: "embeddings" },
    },
  ],
};

test("#3120 parseGitHubCopilotModels maps data[].id into managed models", () => {
  const models = parseGitHubCopilotModels(MOCK_COPILOT_MODELS_RESPONSE);
  const ids = models.map((m) => m.id);
  assert.ok(ids.includes("gpt-5.4"), "gpt-5.4 must be discovered");
  assert.ok(ids.includes("claude-sonnet-4.5"), "claude-sonnet-4.5 must be discovered");
  const gpt = models.find((m) => m.id === "gpt-5.4");
  assert.ok(gpt, "gpt-5.4 entry present");
  assert.equal(gpt.name, "GPT-5.4");
  assert.equal(gpt.owned_by, "github");
});

test("#3121 a model NOT in the live response is not advertised (entitlement filtering)", () => {
  const models = parseGitHubCopilotModels(MOCK_COPILOT_MODELS_RESPONSE);
  const ids = models.map((m) => m.id);
  // gemini-3.1-pro-preview is in the OLD static catalog but NOT entitled here.
  assert.ok(
    !ids.includes("gemini-3.1-pro-preview"),
    "non-entitled gemini preview must NOT be advertised"
  );
});

test("#3120 fetchGitHubCopilotModels does a live fetch and returns parsed models", async () => {
  let capturedUrl = "";
  let capturedHeaders: Record<string, string> = {};
  const fakeFetch = (async (url: string, init: RequestInit) => {
    capturedUrl = String(url);
    capturedHeaders = (init?.headers as Record<string, string>) || {};
    return new Response(JSON.stringify(MOCK_COPILOT_MODELS_RESPONSE), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as unknown as typeof fetch;

  const result = await fetchGitHubCopilotModels({
    token: "copilot-tok-abc",
    fetchImpl: fakeFetch,
  });

  assert.equal(capturedUrl, GITHUB_COPILOT_MODELS_URL);
  assert.equal(
    capturedHeaders.Authorization,
    "Bearer copilot-tok-abc",
    "must authenticate with the Copilot bearer token"
  );
  // Copilot chat headers must be present (e.g. copilot-integration-id).
  assert.ok(capturedHeaders["copilot-integration-id"], "must send Copilot integration header");
  assert.equal(result.source, "api");
  const ids = result.models.map((m) => m.id);
  assert.ok(ids.includes("gpt-5.4"));
  assert.ok(!ids.includes("gemini-3.1-pro-preview"));
});

test("#3120/#3121 fetch falls back to static catalog when the live fetch fails", async () => {
  const fakeFetch = (async () =>
    new Response("nope", { status: 503 })) as unknown as typeof fetch;
  const fallback = [
    { id: "gpt-5.4", name: "GPT-5.4" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro" },
  ];

  const result = await fetchGitHubCopilotModels({
    token: "copilot-tok-abc",
    fetchImpl: fakeFetch,
    fallbackModels: fallback,
  });

  assert.equal(result.source, "fallback");
  assert.deepEqual(
    result.models.map((m) => m.id),
    ["gpt-5.4", "gemini-3.1-pro-preview"],
    "offline/failed discovery must preserve the static catalog"
  );
});

test("fetch falls back when no token is provided (unauthed refresh stays safe)", async () => {
  let called = false;
  const fakeFetch = (async () => {
    called = true;
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;

  const result = await fetchGitHubCopilotModels({
    token: "",
    fetchImpl: fakeFetch,
    fallbackModels: [{ id: "gpt-5.4", name: "GPT-5.4" }],
  });

  assert.equal(called, false, "must not fetch without a token");
  assert.equal(result.source, "fallback");
  assert.deepEqual(result.models.map((m) => m.id), ["gpt-5.4"]);
});
