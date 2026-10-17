import assert from "node:assert/strict";
import test from "node:test";

import { opencode_goProvider } from "../../open-sse/config/providers/registry/opencode/go/index.ts";
import { opencode_zenProvider } from "../../open-sse/config/providers/registry/opencode/zen/index.ts";
import {
  OpencodeExecutor,
  parseEffortLevel,
  resolveOpencodeTargetFormat,
} from "../../open-sse/executors/opencode.ts";
import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";

// The OpenCode Go and Zen endpoint tables (opencode.ai/docs/go, opencode.ai/docs/zen)
// list every Grok model on the OpenAI Responses endpoint only, and the models.dev
// catalog OpenCode itself reads declares them with `@ai-sdk/openai` (Responses).
// Without a registry `targetFormat`, getModelTargetFormat() returns null,
// resolveOpencodeTargetFormat() falls back to "openai" and OpencodeExecutor.buildUrl()
// posts to /chat/completions, which the upstream rejects
// ("Model grok-4.6 is not supported for format oa-compat").
// Same failure class as #12196 (gpt-5.6-luna) and gpt-6-luna.

type Executor = OpencodeExecutor & { _requestFormat: string | null };

function urlFor(provider: string, model: string): string {
  const executor = new OpencodeExecutor(provider) as Executor;
  // Mirrors the first line of execute() (#11045).
  executor._requestFormat = resolveOpencodeTargetFormat(provider, model);
  return executor.buildUrl(model, true);
}

function headersFor(provider: string, model: string): Record<string, string> {
  const executor = new OpencodeExecutor(provider) as Executor;
  executor._requestFormat = resolveOpencodeTargetFormat(provider, model);
  return executor.buildHeaders({ apiKey: "sk-test" }, true, null, model) as Record<string, string>;
}

const GO_GROK_MODELS = ["grok-4.5", "grok-4.5-low", "grok-4.5-medium", "grok-4.5-high", "grok-4.6"];
const ZEN_GROK_MODELS = ["grok-4.6", "grok-build-0.1"];

test("opencode-go Grok models resolve to the openai-responses target format", () => {
  for (const model of GO_GROK_MODELS) {
    assert.equal(
      resolveOpencodeTargetFormat("opencode-go", model),
      "openai-responses",
      `opencode-go/${model} would be posted to /chat/completions`
    );
  }
});

test("opencode-go Grok models build the Go /responses URL with Bearer auth", () => {
  for (const model of GO_GROK_MODELS) {
    assert.equal(urlFor("opencode-go", model), "https://opencode.ai/zen/go/v1/responses");
    const headers = headersFor("opencode-go", model);
    assert.equal(headers["Authorization"], "Bearer sk-test");
    assert.equal(headers["x-api-key"], undefined);
  }
});

test("chatCore translates opencode-go Grok requests to the Responses shape", () => {
  for (const model of GO_GROK_MODELS) {
    const { targetFormat } = resolveChatCoreTargetFormat({
      provider: "opencode-go",
      resolvedModel: model,
      apiFormat: undefined,
      sourceFormat: "openai",
      customModelTargetFormat: undefined,
      providerSpecificData: null,
    });
    assert.equal(targetFormat, "openai-responses", `chatCore body format for ${model}`);
  }
});

test("opencode-go declares grok-4.6 as a reasoning model with its effort vocabulary", () => {
  const row = opencode_goProvider.models.find((m) => m.id === "grok-4.6");
  assert.ok(row, "opencode-go must register grok-4.6");
  assert.equal(row.targetFormat, "openai-responses");
  assert.equal(row.supportsReasoning, true);
  assert.deepEqual(row.supportedThinkingEfforts, ["low", "medium", "high", "xhigh"]);
});

test("opencode-zen Grok models route to the Zen /responses URL with Bearer auth", () => {
  for (const model of ZEN_GROK_MODELS) {
    const row = opencode_zenProvider.models.find((m) => m.id === model);
    assert.ok(row, `opencode-zen must register ${model}`);
    assert.equal(row.targetFormat, "openai-responses");
    assert.equal(resolveOpencodeTargetFormat("opencode-zen", model), "openai-responses");
    assert.equal(urlFor("opencode-zen", model), "https://opencode.ai/zen/v1/responses");
    // Zen's /responses endpoint authenticates with Bearer like chat: the x-api-key form
    // of #12633 answers 403 FreeTierError there (measured 2026-10-14).
    const headers = headersFor("opencode-zen", model);
    assert.equal(headers["Authorization"], "Bearer sk-test");
    assert.equal(headers["x-api-key"], undefined);
  }
});

// Controls: the change must not move chat- or messages-served siblings, and the
// grok-4.5 effort aliases must keep their #8353 suffix parsing.
test("control: non-Grok opencode-go models keep their endpoint family", () => {
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "kimi-k2.6"), "openai");
  assert.equal(
    urlFor("opencode-go", "kimi-k2.6"),
    "https://opencode.ai/zen/go/v1/chat/completions"
  );
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "qwen3.7-max"), "claude");
  assert.equal(urlFor("opencode-go", "qwen3.7-max"), "https://opencode.ai/zen/go/v1/messages");
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "kimi-k3"), "openai");
});

test("control: grok-4.5 effort aliases still parse to their base model", () => {
  assert.deepEqual(parseEffortLevel("grok-4.5-high"), { baseModel: "grok-4.5", effort: "high" });
  assert.deepEqual(parseEffortLevel("grok-4.5-low"), { baseModel: "grok-4.5", effort: "low" });
});
