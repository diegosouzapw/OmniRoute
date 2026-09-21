import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { discoverBedrockNativeModels } from "../../open-sse/services/bedrock.ts";

// ─── #12915 — every Bedrock vendor prefix must resolve a context window ──────
// Bedrock ids are "<vendor>.<model>", optionally behind a cross-region profile
// prefix ("global.openai.gpt-5.6-sol"). The known-limits lookup used to peel
// only "anthropic.", so imported openai.* models carried no inputTokenLimit and
// the pre-flight context check fell back to a 200k default — rejecting 1M-context
// models locally, before the request ever reached AWS.

function bedrockFetcher(): (url: string, init: RequestInit) => Promise<Response> {
  return async (url: string) => {
    const body = url.includes("/inference-profiles")
      ? { inferenceProfileSummaries: [] }
      : {
          modelSummaries: [
            {
              modelId: "global.openai.gpt-5.6-sol",
              modelName: "GPT-5.6 Sol",
              providerName: "OpenAI",
              responseStreamingSupported: true,
            },
            {
              modelId: "global.anthropic.claude-opus-4-6-v1",
              modelName: "Claude Opus 4.6",
              providerName: "Anthropic",
              responseStreamingSupported: true,
            },
          ],
        };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
}

describe("Bedrock model discovery (#12915)", () => {
  it("carries a context window for openai.* models, not just anthropic.*", async () => {
    const { models } = await discoverBedrockNativeModels({
      apiKey: "test-key",
      providerSpecificData: { region: "eu-west-1" },
      fetcher: bedrockFetcher(),
    });

    const openai = models.find((m) => m.id === "global.openai.gpt-5.6-sol");
    const anthropic = models.find((m) => m.id === "global.anthropic.claude-opus-4-6-v1");

    // 1_050_000 and 1_000_000 differ, so a lookup that silently answered with the
    // anthropic model's limit would not pass either assertion.
    assert.equal(openai?.inputTokenLimit, 1_050_000);
    assert.equal(openai?.outputTokenLimit, 128_000);
    // The anthropic path must keep working unchanged.
    assert.equal(anthropic?.inputTokenLimit, 1_000_000);
  });
});
