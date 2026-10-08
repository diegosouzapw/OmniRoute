import test from "node:test";
import assert from "node:assert/strict";
import { GheCopilotExecutor } from "../../open-sse/executors/ghe-copilot.ts";
import { gheCopilotProvider } from "../../open-sse/config/providers/registry/ghe-copilot/index.ts";
import { GHE_COPILOT_TARGET } from "../../src/mitm/targets/ghe-copilot.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { GithubExecutor } from "../../open-sse/executors/github.ts";

test("GHE Copilot registry exposes Claude Opus 5", () => {
  const opus5 = gheCopilotProvider.models.find((model) => model.id === "claude-opus-5");

  assert.deepStrictEqual(opus5, {
    id: "claude-opus-5",
    name: "Claude Opus 5",
    contextLength: 1000000,
    maxOutputTokens: 64000,
    // #14732 declared the thinking-effort tiers on the first-party Claude registries
    // (GHE Copilot included) — intentional contract change.
    supportsReasoning: true,
    supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
    supportsXHighEffort: true,
    unsupportedParams: ["temperature", "top_p", "top_k"],
  });
});

test("GHE_COPILOT_TARGET has correct id and patterns", () => {
  assert.strictEqual(GHE_COPILOT_TARGET.id, "ghe-copilot");
  assert.deepStrictEqual(GHE_COPILOT_TARGET.endpointPatterns, [
    "/chat/completions",
    "/v1/chat/completions",
    "/responses",
  ]);
});

test("buildUrl uses gheUrl for chat/completions with credentials", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };
  const url = executor.buildUrl("gpt-4o", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/chat/completions");
});

test("buildUrl uses gheUrl for responses endpoint with codex model", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };
  const url = executor.buildUrl("gpt-4o-codex", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/responses");
});

test("buildUrl uses responses endpoint for gpt-5.4-mini and gpt-5.6-sol", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };
  assert.strictEqual(
    executor.buildUrl("gpt-5.4-mini", true, 0, credentials),
    "https://ghe.company.com/responses"
  );
  assert.strictEqual(
    executor.buildUrl("ghe-copilot/gpt-5.6-sol", true, 0, credentials),
    "https://ghe.company.com/responses"
  );
});

test("buildUrl routes unregistered GPT-6 models to the Responses endpoint", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };

  assert.strictEqual(
    executor.buildUrl("ghe-copilot/gpt-6-luna", true, 0, credentials),
    "https://ghe.company.com/responses"
  );
});

// Ids the PR's buildUrl regex (`^gpt-6`) sends to /responses. Unregistered, so
// they have no catalog targetFormat — the body must still be Responses-shaped.
const UNREGISTERED_GPT6_MODELS = [
  "ghe-copilot/gpt-6-luna",
  "gpt-6-sol",
  "gpt-6-astra",
  "gpt-6-luna-high",
];

function outboundBody(
  executor: GheCopilotExecutor,
  model: string,
  credentials: ProviderCredentials
): Record<string, unknown> {
  const bare = model.startsWith("ghe-copilot/") ? model.slice("ghe-copilot/".length) : model;
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "ghe-copilot",
    resolvedModel: bare,
    apiFormat: undefined,
    sourceFormat: "openai",
    customModelTargetFormat: undefined,
    providerSpecificData: credentials.providerSpecificData,
  });
  const translated = translateRequest(
    "openai",
    targetFormat,
    bare,
    {
      model: bare,
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 16,
    },
    true,
    credentials,
    "ghe-copilot"
  );
  return executor.transformRequest(model, translated, true, credentials) as Record<string, unknown>;
}

test("GPT-6 requests routed to /responses send a Responses body, not chat completions", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };

  for (const model of UNREGISTERED_GPT6_MODELS) {
    assert.strictEqual(
      executor.buildUrl(model, true, 0, credentials),
      "https://ghe.company.com/responses",
      `${model} URL`
    );
    const sent = outboundBody(executor, model, credentials);
    assert.ok(
      Array.isArray(sent.input),
      `${model} must send Responses input, got keys ${Object.keys(sent).join(",")}`
    );
    assert.equal(sent.messages, undefined, `${model} must not send chat-completions messages`);
    assert.equal(sent.max_tokens, undefined, `${model} must not send chat-completions max_tokens`);
    assert.equal(sent.max_output_tokens, 16);
  }
});

test("models this PR did not move keep chat-completions bodies and URLs", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };

  for (const model of ["gpt-4o", "gemini-3.7-flash"]) {
    assert.strictEqual(
      executor.buildUrl(model, true, 0, credentials),
      "https://ghe.company.com/chat/completions"
    );
    const sent = outboundBody(executor, model, credentials);
    assert.ok(Array.isArray(sent.messages), `${model} must keep chat-completions messages`);
    assert.equal(sent.input, undefined, `${model} must not be rewritten to Responses input`);
  }

  // github.com Copilot did not gain the gpt-6 URL regex. Its body stays chat.
  assert.equal(getModelTargetFormat("gh", "gpt-6-luna"), null);
  assert.equal(getModelTargetFormat("github", "gpt-6-luna"), null);
  const github = new GithubExecutor();
  assert.equal(
    github.buildUrl("gpt-6-luna", true, 0, { apiKey: "test-token" }),
    "https://api.githubcopilot.com/chat/completions"
  );
});

test("buildUrl routes Claude to the native /v1/messages shim (not chat/completions)", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };
  // Claude must ALWAYS use the Anthropic-native shim (prompt-cache token counts +
  // lossless tool_use/tool_result/thinking blocks), same as github.com Copilot.
  assert.strictEqual(
    executor.buildUrl("claude-opus-5", true, 0, credentials),
    "https://ghe.company.com/v1/messages"
  );
});

test("buildUrl uses chat/completions endpoint for gemini models", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };
  // Gemini has no native shim on Copilot — it stays on /chat/completions.
  assert.strictEqual(
    executor.buildUrl("gemini-3.7-flash", true, 0, credentials),
    "https://ghe.company.com/chat/completions"
  );
});

test("buildUrl handles gheUrl with trailing slash", () => {
  const exec = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com/",
    clientId: "test",
    clientSecret: "test",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com/" },
  };
  const url = exec.buildUrl("gpt-4o", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/chat/completions");
});

test("buildUrl handles gheUrl already containing /chat/completions", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com/chat/completions" },
  };
  const url = executor.buildUrl("gpt-4o", true, 0, credentials);
  assert.strictEqual(url, "https://ghe.company.com/chat/completions");
});

test("buildUrl throws without gheUrl in credentials", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = { providerSpecificData: {} };
  assert.throws(() => executor.buildUrl("gpt-4o", true, 0, credentials), {
    message: "GHE Copilot executor requires gheUrl in providerSpecificData",
  });
});

test("refreshCopilotToken delegates to GHE token endpoint", async () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
    copilotToken: "test-token",
  };

  const result = await executor.refreshCopilotToken("github-access-token", undefined, credentials);
  assert.strictEqual(result, null);
});

test("refreshGitHubToken delegates to GHE OAuth endpoint", async () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const credentials: ProviderCredentials = {
    providerSpecificData: { gheUrl: "https://ghe.company.com" },
  };

  const result = await executor.refreshGitHubToken("refresh-token", undefined, credentials);
  assert.strictEqual(result, null);
});

test("executor extends GithubExecutor", () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  assert.strictEqual(executor.constructor.name, "GheCopilotExecutor");
  assert.strictEqual(executor.getProvider(), "ghe-copilot");
  assert.strictEqual(executor.config.baseUrl, "https://api.githubcopilot.com/chat/completions");
});

test("isValidGheUrl accepts https enterprise hosts and rejects malformed or non-https input", async () => {
  const { isValidGheUrl } = await import("../../src/shared/validation/providerSpecificData.ts");
  assert.equal(isValidGheUrl("https://github.mycorp.example"), true);
  assert.equal(isValidGheUrl("https://10.0.0.5"), true); // on-prem GHE on private IP is the primary use case
  assert.equal(isValidGheUrl("http://github.mycorp.example"), false);
  assert.equal(isValidGheUrl("javascript:alert(1)"), false);
  assert.equal(isValidGheUrl("not a url"), false);
});

test("GheCopilotExecutor.execute does not trigger identity fallback on 403", async () => {
  const executor = new GheCopilotExecutor({
    gheUrl: "https://ghe.company.com",
    clientId: "test-client",
    clientSecret: "test-secret",
  });
  const originalFetch = globalThis.fetch;
  let callCount = 0;
  const seenIntegrationIds: string[] = [];

  globalThis.fetch = async (_url, init: RequestInit = {}) => {
    callCount++;
    const headers = init.headers as Record<string, string>;
    seenIntegrationIds.push(headers["copilot-integration-id"]);
    return new Response(
      JSON.stringify({ message: "Access denied: Enterprise Copilot 403 Forbidden" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const credentials: ProviderCredentials = {
      accessToken: "ghe-token",
      providerSpecificData: {
        gheUrl: "https://ghe.company.com",
        copilotToken: "copilot-token",
      },
    };

    const result = await executor.execute({
      model: "gpt-4o",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials,
    });

    assert.equal(callCount, 1, "GHE Copilot must never retry on 403");
    assert.deepEqual(seenIntegrationIds, ["copilot-developer-cli"]);
    const res = result as { response: Response };
    assert.equal(res.response.status, 403);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
