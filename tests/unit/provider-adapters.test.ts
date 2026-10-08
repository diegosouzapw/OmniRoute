import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ProviderRouter,
  parseProviderConfig,
  publicProviderConfigs,
} from "../../open-sse/services/providerAdapters.ts";

describe("provider adapters", () => {
  it("parses YAML and redacts credentials", () => {
    const config = parseProviderConfig(
      "providers:\n  - id: cloud\n    kind: openai\n    baseUrl: https://api.openai.com/v1\n    model: gpt-4o\n    apiKey: secret"
    );
    assert.equal(config.providers.length, 1);
    assert.equal(publicProviderConfigs(config)[0].apiKey, undefined);
  });

  it("routes OpenAI, Anthropic, and local requests", async () => {
    const router = new ProviderRouter(
      parseProviderConfig(
        "providers:\n  - id: openai\n    kind: openai\n    baseUrl: https://api.openai.com/v1\n    model: gpt-4o\n    apiKey: oa-key\n  - id: claude\n    kind: anthropic\n    baseUrl: https://api.anthropic.com/v1\n    model: claude-sonnet\n    apiKey: an-key\n  - id: local\n    kind: local\n    baseUrl: http://localhost:11434/v1\n    model: llama3"
      )
    );
    const calls: Array<{ url: string; init: RequestInit }> = [];
    const fakeFetch = async (url: string | URL, init?: RequestInit) => {
      calls.push({ url: String(url), init: init! });
      return new Response("{}");
    };
    const request = { messages: [{ role: "user", content: "hi" }] };
    await router.complete(request, "openai", fakeFetch);
    await router.complete(request, "claude", fakeFetch);
    await router.complete(request, "local", fakeFetch);
    assert.equal(calls[0].url, "https://api.openai.com/v1/chat/completions");
    assert.equal(calls[1].url, "https://api.anthropic.com/v1/messages");
    assert.equal((calls[1].init.headers as Record<string, string>)["x-api-key"], "an-key");
    assert.equal(calls[2].url, "http://localhost:11434/v1/chat/completions");
  });
});
