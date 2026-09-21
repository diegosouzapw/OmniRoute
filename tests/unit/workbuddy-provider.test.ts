import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";
import { requiresReasoningReplay } from "../../open-sse/services/reasoningCache.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import {
  combineContent,
  foldTrailingCommentary,
  mergeAdjacentAssistantMessages,
  mergeAdjacentUserMessages,
  normalizeToolSequence,
  repairChatHistory,
  replaceBodyStrings,
} from "../../open-sse/utils/strictChatHistory.ts";

/**
 * WorkBuddy's gateway accepts a single-turn request but rejects the replayed
 * history an agent client sends from turn two on, reporting each violation as a
 * generic code that reads like a transport fault (11148 tool_call_sequence_broken,
 * 11155 missing reasoning echo, 11128 unapproved channel).
 *
 * These tests cover the two opt-in registry flags that close that gap, the repair
 * module behind them, and the executor wiring that makes them take effect. The
 * blast-radius test at the end is the important one: the repair must be inert for
 * every provider that does not declare the flags.
 */

const SYSTEM = { role: "system", content: "You are Codex CLI." };
const USER = { role: "user", content: "read a.txt" };
const TOOLS = [
  { type: "function", function: { name: "read_file", parameters: { type: "object" } } },
];

function assistantWithCall(id: string, content = "Let me look.") {
  return {
    role: "assistant",
    content,
    tool_calls: [{ id, type: "function", function: { name: "read_file", arguments: "{}" } }],
  };
}

function toolResult(id: string, content: string) {
  return { role: "tool", tool_call_id: id, content };
}

function bodyWith(messages: unknown[]) {
  return { model: "deepseek-v4.1-flash", stream: true, tools: TOOLS, messages };
}

describe("workbuddy registry entry", () => {
  it("declares the replayed-history flags and the streaming requirement", () => {
    const entry = REGISTRY.workbuddy;
    assert.ok(entry, "workbuddy must be registered");
    assert.equal(entry.strictChatHistory, true);
    assert.equal(entry.forceStream, true);
    assert.deepEqual(entry.bodyStringReplacements, [
      ["Codex CLI", "the assistant"],
      ["codex_cli_rs", "assistant"],
      ["OpenAI", "the provider"],
      ["Codex", "the assistant"],
    ]);
    assert.equal(entry.baseUrl, "https://www.workbuddy.ai/v2/chat/completions");
    assert.equal(entry.headers?.["X-Product"], "SaaS");
  });

  it("does not hardcode a model roster", () => {
    const entry = REGISTRY.workbuddy;
    // The live roster is served by the authenticated catalogue, so the bundled
    // list must stay empty and unknown ids must pass through untouched.
    assert.deepEqual(entry.models, []);
    assert.equal(entry.passthroughModels, true);
  });

  it("needs no reasoning-replay declaration because the model pattern already matches", () => {
    // WorkBuddy's thinking models are DeepSeek V4 point releases; the shared
    // pattern matches them provider-agnostically, so the entry stays declarative.
    for (const model of ["deepseek-v4.1-flash", "deepseek-v4-pro", "deepseek-v4.2-flash"]) {
      assert.equal(
        requiresReasoningReplay({ provider: "workbuddy", model }),
        true,
        `${model} must require reasoning replay`
      );
    }
    // The legacy reasoner family has the inverse contract and must stay off.
    assert.equal(requiresReasoningReplay({ provider: "workbuddy", model: "deepseek-reasoner" }), false);
  });
});

describe("strictChatHistory helpers", () => {
  it("combines content without dropping multimodal parts", () => {
    assert.equal(combineContent("a", "b"), "a\nb");
    assert.equal(combineContent("", "b"), "b");
    assert.equal(combineContent(undefined, "b"), "b");
    const parts = combineContent([{ type: "image_url", image_url: { url: "u" } }], "caption");
    assert.deepEqual(parts, [{ type: "image_url", image_url: { url: "u" } }, { type: "text", text: "caption" }]);
  });

  it("merges an assistant turn the client split in two", () => {
    const split = [
      { role: "user", content: "hi" },
      { role: "assistant", content: "Thinking out loud." },
      assistantWithCall("call_1", ""),
    ];
    const merged = mergeAdjacentAssistantMessages(split) as Array<Record<string, unknown>>;
    assert.equal(merged.length, 2);
    assert.equal(merged[1].content, "Thinking out loud.");
    assert.ok(Array.isArray(merged[1].tool_calls));
  });

  it("never merges a preceding assistant that already carries tool_calls", () => {
    const messages = [assistantWithCall("call_1"), assistantWithCall("call_2")];
    assert.equal(mergeAdjacentAssistantMessages(messages), messages);
  });

  it("keeps one result per call, in call order, preferring the one with content", () => {
    const messages = [
      assistantWithCall("call_1"),
      toolResult("call_1", ""), // empty placeholder
      { role: "user", content: "hook note" },
      toolResult("call_1", "the real payload"), // late duplicate
    ];
    const out = normalizeToolSequence(messages) as Array<Record<string, unknown>>;
    assert.deepEqual(
      out.map((m) => m.role),
      ["assistant", "tool", "user"]
    );
    assert.equal(out[1].content, "the real payload");
    assert.equal(out[2].content, "hook note");
  });

  it("emits results in call order when the client answered out of order", () => {
    const messages = [
      {
        role: "assistant",
        content: "",
        tool_calls: [
          { id: "a", type: "function", function: { name: "f", arguments: "{}" } },
          { id: "b", type: "function", function: { name: "f", arguments: "{}" } },
        ],
      },
      toolResult("b", "B"),
      toolResult("a", "A"),
    ];
    const out = normalizeToolSequence(messages) as Array<Record<string, unknown>>;
    assert.deepEqual(
      out.filter((m) => m.role === "tool").map((m) => m.tool_call_id),
      ["a", "b"]
    );
  });

  it("preserves every part when merging neighbouring user turns", () => {
    const messages = [
      { role: "user", content: "look at this" },
      { role: "user", content: [{ type: "image_url", image_url: { url: "u" } }] },
    ];
    const out = mergeAdjacentUserMessages(messages) as Array<Record<string, unknown>>;
    assert.equal(out.length, 1);
    assert.deepEqual(out[0].content, [
      { type: "text", text: "look at this" },
      { type: "image_url", image_url: { url: "u" } },
    ]);
  });

  it("folds a trailing assistant message onto the turn's tool results", () => {
    const messages = [SYSTEM, USER, assistantWithCall("call_1", ""), toolResult("call_1", "hi"), { role: "assistant", content: "Done." }];
    const out = foldTrailingCommentary(messages, true) as Array<Record<string, unknown>>;
    assert.equal(out.length, 4);
    assert.equal(out[out.length - 1].role, "tool");
    assert.equal(out[2].content, "Done.");
  });

  it("drops the trailing assistant message when there is no tool-call turn to fold into", () => {
    const messages = [SYSTEM, { role: "user", content: "hi" }, { role: "assistant", content: "Commentary." }];
    const out = foldTrailingCommentary(messages, true) as Array<Record<string, unknown>>;
    assert.equal(out.length, 2);
    assert.equal(out[out.length - 1].role, "user");
  });

  it("leaves a payload alone when tools are not declared", () => {
    const messages = [SYSTEM, { role: "user", content: "hi" }, { role: "assistant", content: "Commentary." }];
    assert.equal(foldTrailingCommentary(messages, false), messages);
  });

  it("replaces strings throughout the body without touching keys or structure", () => {
    const body = { model: "m", "Codex": 1, messages: [{ role: "user", content: "Codex CLI said OpenAI" }] };
    const out = replaceBodyStrings(body, [["Codex CLI", "the assistant"], ["OpenAI", "the provider"]]) as Record<string, any>;
    assert.equal(out.messages[0].content, "the assistant said the provider");
    // The key is untouched: only string values are rewritten.
    assert.equal(out["Codex"], 1);
    assert.equal(out.model, "m");
  });
});

describe("repairChatHistory", () => {
  it("is identity when no flags are declared", () => {
    const body = bodyWith([SYSTEM, USER]);
    assert.equal(repairChatHistory(body), body);
    assert.equal(repairChatHistory(body, { repairSequence: false }), body);
  });

  it("produces a history the gateway accepts from turn two on", () => {
    const replayed = bodyWith([
      SYSTEM,
      USER,
      assistantWithCall("call_1", ""),
      toolResult("call_1", ""), // empty placeholder
      { role: "user", content: "hook note" },
      toolResult("call_1", "file contents"),
      { role: "assistant", content: "Done." },
    ]);

    const out = repairChatHistory(replayed, {
      bodyStringReplacements: REGISTRY.workbuddy.bodyStringReplacements,
      repairSequence: true,
    }) as Record<string, any>;

    // 1. The channel-identifying string is neutralized.
    assert.equal(out.messages[0].content, "You are the assistant.");
    // 2. Every call group is one result per call, in call order, with the real payload kept.
    const callIndex = out.messages.findIndex((m: any) => Array.isArray(m.tool_calls));
    assert.equal(out.messages[callIndex + 1].role, "tool");
    assert.equal(out.messages[callIndex + 1].content, "file contents");
    // 3. The payload no longer ends on an assistant message.
    assert.notEqual(out.messages[out.messages.length - 1].role, "assistant");
    // 4. Exactly one result survived for the single call.
    assert.equal(out.messages.filter((m: any) => m.role === "tool").length, 1);
  });
});

describe("executor wiring", () => {
  it("applies the repair for workbuddy through transformRequest", async () => {
    const executor = await getExecutor("workbuddy");
    const transformed = (await executor.transformRequest(
      "deepseek-v4.1-flash",
      bodyWith([
        { role: "system", content: "You are Codex CLI." },
        { role: "user", content: "read a.txt" },
        assistantWithCall("call_1", ""),
        toolResult("call_1", ""),
        { role: "assistant", content: "Done." },
      ]),
      true,
      { accessToken: "oauth-token", providerSpecificData: {} }
    )) as Record<string, any>;

    assert.equal(transformed.messages[0].content, "You are the assistant.");
    assert.notEqual(transformed.messages[transformed.messages.length - 1].role, "assistant");
    assert.equal(transformed.messages.filter((m: any) => m.role === "tool").length, 1);
  });
});

describe("model discovery", () => {
  it("reads the roster from the authenticated config, not a hardcoded list", () => {
    const config = PROVIDER_MODELS_CONFIG.workbuddy;
    assert.ok(config, "workbuddy must have a discovery entry");
    assert.equal(config.url, "https://www.workbuddy.ai/v3/config");
    assert.equal(config.method, "GET");
    assert.equal(config.headers["X-Product"], "SaaS");
    assert.equal(config.authHeader, "Authorization");
    assert.equal(config.authPrefix, "Bearer ");
  });

  it("maps the catalogue payload to ids and names", () => {
    const payload = {
      code: 0,
      msg: "OK",
      requestId: "abc",
      data: {
        agent: {},
        models: [
          { id: "deepseek-v4.1-flash", name: "DeepSeek V4.1 Flash", supportsToolCall: true },
          { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", supportsImages: true },
        ],
        features: null,
      },
    };
    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse(payload) as Array<{
      id: string;
      name: string;
      owned_by: string;
    }>;
    assert.deepEqual(
      models.map((m) => m.id),
      ["deepseek-v4.1-flash", "deepseek-v4-pro"]
    );
    assert.equal(models[0].name, "DeepSeek V4.1 Flash");
    assert.equal(models[0].owned_by, "workbuddy");
  });

  it("returns nothing for the unauthenticated payload the gateway actually sends", () => {
    // Observed live: an unauthenticated GET /v3/config answers with this exact
    // shape, so discovery must degrade to "no models" rather than inventing any.
    const observed = {
      code: 0,
      msg: "OK",
      requestId: "e3e4fa71-ced9-4d35-b5c1-0e976166fcc4",
      data: { agent: {}, models: null, mcp: {}, codebase: {}, features: null },
    };
    assert.deepEqual(PROVIDER_MODELS_CONFIG.workbuddy.parseResponse(observed), []);
  });

  it("accepts an object map, using the key as the id", () => {
    const payload = {
      data: {
        models: {
          "deepseek-v4.1-flash": { name: "DeepSeek V4.1 Flash" },
          "deepseek-v4-pro": {},
        },
      },
    };
    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse(payload) as Array<{
      id: string;
      name: string;
    }>;
    assert.deepEqual(
      models.map((m) => m.id),
      ["deepseek-v4.1-flash", "deepseek-v4-pro"]
    );
    // An entry with no name falls back to its id rather than being dropped.
    assert.equal(models[1].name, "deepseek-v4-pro");
  });

  it("drops an array entry that carries no id", () => {
    const payload = { data: { models: [{ name: "No id here" }, { id: "deepseek-v4.1-flash" }] } };
    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse(payload) as Array<{ id: string }>;
    assert.deepEqual(
      models.map((m) => m.id),
      ["deepseek-v4.1-flash"]
    );
  });

  it("reads a real catalogue entry, fields and all", () => {
    // Copied from the 26-entry catalogue the CLI ships in `cli/product.json`, so
    // the parser is pinned against what the product actually serves rather than
    // an invented fixture: the extra fields it ignores must not disturb it.
    const payload = {
      data: {
        models: [
          {
            credits: "x3.31 credits",
            id: "gpt-5.5",
            name: "GPT-5.5",
            vendor: "e",
            maxOutputTokens: 72000,
            maxInputTokens: 1000000,
            supportsToolCall: true,
            supportsImages: true,
            supportsReasoning: true,
            onlyReasoning: true,
            reasoning: { effort: "high", summary: "auto" },
            maxAllowedSize: 1000000,
            relatedModels: { lite: "default-model-lite", reasoning: "gpt-5.5" },
          },
        ],
      },
    };
    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse(payload) as Array<{
      id: string;
      name: string;
      owned_by: string;
    }>;
    assert.deepEqual(models, [{ id: "gpt-5.5", name: "GPT-5.5", owned_by: "workbuddy" }]);
  });

  it("keeps a chat entry that carries a non-media tag", () => {
    // `lite` and `craft` are catalogue tags on chat models, so a tag alone must
    // never be grounds for exclusion.
    const payload = {
      data: {
        models: [
          { id: "default-model-lite", name: "Default-Lite", tags: ["lite"] },
          { id: "balanced-model", name: "Balanced", tags: ["craft"] },
        ],
      },
    };
    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse(payload) as Array<{ id: string }>;
    assert.deepEqual(
      models.map((m) => m.id),
      ["default-model-lite", "balanced-model"]
    );
  });

  it("drops the media entries that share the catalogue array", () => {
    // The catalogue lists image and video models alongside chat models, tagged by
    // capability. They cannot serve a chat completion, so they must not reach the
    // roster: offering them would produce a model that fails on every request.
    const payload = {
      data: {
        models: [
          { id: "deepseek-v4.1-flash", name: "DeepSeek V4.1 Flash" },
          { id: "gemini-3.0-pro-image", name: "Gemini-3.0-Pro-Image", tags: ["text-to-image", "image-to-image"] },
          { id: "hunyuan-video-art", name: "Hunyuan-Video-Art", tags: ["text-to-video", "image-to-video"] },
        ],
      },
    };
    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse(payload) as Array<{ id: string }>;
    assert.deepEqual(
      models.map((m) => m.id),
      ["deepseek-v4.1-flash"]
    );
  });

  it("keeps the 20 chat entries of the shipped 26-entry catalogue", () => {
    // The id and tag projection of every entry in `cli/product.json`, so the
    // chat/media split is pinned against the real catalogue rather than a guess.
    const catalogue: Array<{ id: string; tags?: string[] }> = [
      { id: "default-model" },
      { id: "default-model-lite", tags: ["lite"] },
      { id: "gpt-5.5" },
      { id: "gpt-5.4" },
      { id: "gpt-5.3-codex" },
      { id: "gpt-5.1-codex" },
      { id: "gpt-5.1-codex-mini" },
      { id: "gemini-3.1-pro" },
      { id: "gemini-3.0-flash" },
      { id: "gemini-3.5-flash" },
      { id: "gemini-2.5-flash" },
      { id: "gemini-3.1-flash-lite" },
      { id: "gemini-2.5-pro" },
      { id: "deepseek-v3-2-volc" },
      { id: "glm-5.0" },
      { id: "kimi-k2.5" },
      { id: "gemini-3.0-pro-image", tags: ["text-to-image", "image-to-image"] },
      { id: "gemini-3.1-flash-image", tags: ["text-to-image", "image-to-image"] },
      { id: "gemini-2.5-flash-image", tags: ["text-to-image", "image-to-image"] },
      { id: "hunyuan-image-v3.0", tags: ["text-to-image"] },
      { id: "hunyuan-image-v2.0-general-edit", tags: ["image-to-image"] },
      { id: "hunyuan-video-art", tags: ["text-to-video", "image-to-video"] },
      { id: "fast-model" },
      { id: "balanced-model", tags: ["craft"] },
      { id: "primary-model" },
      { id: "deep-model" },
    ];
    assert.equal(catalogue.length, 26);

    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse({ data: { models: catalogue } }) as Array<{
      id: string;
    }>;
    assert.equal(models.length, 20);

    for (const dropped of [
      "gemini-3.0-pro-image",
      "gemini-3.1-flash-image",
      "gemini-2.5-flash-image",
      "hunyuan-image-v3.0",
      "hunyuan-image-v2.0-general-edit",
      "hunyuan-video-art",
    ]) {
      assert.ok(
        !models.some((m) => m.id === dropped),
        `${dropped} must not reach a chat roster`
      );
    }
  });

  it("maps the roster the gateway actually returns when authenticated", () => {
    // Observed live (2026-09-19) from the desktop app's own CloudProductManager
    // log, which prints the ids of every successful fetch. This is the populated
    // authenticated payload, and it barely overlaps the built-in catalogue in
    // cli/product.json: the cloud list replaces the built-in membership rather
    // than extending it, which is why the 6 media entries are absent here.
    const observed = [
      "default-model",
      "fast-model",
      "balanced-model",
      "primary-model",
      "deep-model",
      "kimi-k2.8-preview",
      "deepseek-v4.1-flash",
      "deepseek-v4.1-flash-sg",
      "gpt-6-astra",
      "hy4-preview-f",
      "hy4-preview",
      "hy3",
      "gpt-5.6-sol",
      "gpt-5.6-terra",
      "gpt-5.6-luna",
      "gpt-5.5",
      "gpt-5.4",
      "gemini-3.5-flash",
      "glm-5.3",
      "glm-5.2",
      "kimi-k3",
      "kimi-k2.6",
    ];
    assert.equal(observed.length, 22);

    const models = PROVIDER_MODELS_CONFIG.workbuddy.parseResponse({
      code: 0,
      msg: "OK",
      requestId: "abc",
      data: {
        agent: { agents: null },
        models: observed.map((id) => ({ id, name: id, supportsToolCall: true })),
        mcp: { enableFilterCount: 0 },
        codebase: { remote: { disabled: false } },
        features: null,
      },
    }) as Array<{ id: string; owned_by: string }>;

    assert.deepEqual(
      models.map((m) => m.id),
      observed
    );
    // Order is the gateway's, and every entry is attributed to the provider.
    assert.equal(models[0].owned_by, "workbuddy");
  });
});

describe("blast radius", () => {
  it("only workbuddy opts into the replayed-history repair", () => {
    const strict = Object.entries(REGISTRY)
      .filter(([, entry]) => entry.strictChatHistory === true)
      .map(([id]) => id);
    assert.deepEqual(strict, ["workbuddy"]);

    const withReplacements = Object.entries(REGISTRY)
      .filter(([, entry]) => (entry.bodyStringReplacements?.length ?? 0) > 0)
      .map(([id]) => id);
    assert.deepEqual(withReplacements, ["workbuddy"]);
  });

  it("leaves a provider that does not declare the flags untouched end to end", async () => {
    const executor = await getExecutor("openai");
    const body = bodyWith([
      { role: "system", content: "You are Codex CLI." },
      { role: "user", content: "hi" },
    ]);
    const transformed = (await executor.transformRequest("gpt-5.5", body, true, {
      apiKey: "sk-test",
      providerSpecificData: {},
    })) as Record<string, any>;

    // Neither the channel string nor the message shape is rewritten for a
    // provider that never asked for it.
    assert.equal(transformed.messages[0].content, "You are Codex CLI.");
  });
});
