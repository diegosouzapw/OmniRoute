// Port of upstream decolua/9router@45240c19.
// Anthropic-compatible Claude-shape providers (MiniMax and friends) reject
// tools that carry a `type` field with error code 2013 ("invalid tool type").
// When a client sends Anthropic-format requests but the tools are still in
// OpenAI wire shape — `{ type: "function", function: { name, description,
// parameters } }` — prepareClaudeRequest() must normalize them to the
// Anthropic-native shape `{ name, description, input_schema }` before
// forwarding to non-Anthropic providers. For Anthropic itself ("claude")
// the shape is left untouched so first-party server-side tools like
// web_search_20250305 keep flowing.
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";

describe("prepareClaudeRequest tool-shape normalization for non-Anthropic providers", () => {
  const buildBody = () => ({
    model: "MiniMax-M2.7",
    messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    max_tokens: 256,
    tools: [
      // OpenAI wire shape inside an Anthropic-format request.
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get the weather",
          parameters: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"],
          },
        },
      },
      // Anthropic-native shape (no `type` field at all) — must pass through unchanged.
      {
        name: "lookup_user",
        description: "Find a user",
        input_schema: {
          type: "object",
          properties: { id: { type: "string" } },
          required: ["id"],
        },
      },
      // Built-in Anthropic server-side tool that non-Anthropic providers
      // must NOT receive at all.
      {
        type: "web_search_20250305",
        name: "web_search",
      },
    ],
  });

  test("folds function.{name,description,parameters} and drops `type` for minimax", () => {
    const body = buildBody();
    const result = prepareClaudeRequest(body as any, "minimax");
    assert.ok(Array.isArray(result.tools));
    // Built-in web_search_20250305 must be stripped for non-Anthropic providers.
    assert.equal(result.tools!.length, 2);

    const weather = result.tools!.find((t: any) => t.name === "get_weather") as any;
    assert.ok(weather, "get_weather tool must survive normalization");
    assert.equal(weather.type, undefined, "`type` must be stripped");
    assert.equal(weather.function, undefined, "`function` wrapper must be folded");
    assert.equal(weather.description, "Get the weather");
    assert.deepEqual(weather.input_schema, {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    });

    const lookup = result.tools!.find((t: any) => t.name === "lookup_user") as any;
    assert.ok(lookup, "lookup_user tool must survive normalization");
    assert.equal(lookup.type, undefined, "stray `type` must be stripped");
    assert.deepEqual(lookup.input_schema, {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    });
  });

  test("does NOT rewrite tool shape for first-party claude (keeps built-ins)", () => {
    const body = {
      model: "claude-sonnet-4-5",
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      max_tokens: 256,
      tools: [
        // Anthropic-native shape.
        {
          name: "lookup_user",
          description: "Find a user",
          input_schema: {
            type: "object",
            properties: { id: { type: "string" } },
            required: ["id"],
          },
        },
        // Built-in Anthropic server-side tool — MUST be preserved for first-party claude.
        {
          type: "web_search_20250305",
          name: "web_search",
        },
      ],
    };
    const result = prepareClaudeRequest(body as any, "claude");
    assert.ok(Array.isArray(result.tools));
    // Built-in web_search_20250305 must NOT be stripped for Anthropic-native upstream.
    const webSearch = result.tools!.find((t: any) => t.type === "web_search_20250305");
    assert.ok(webSearch, "web_search_20250305 must be preserved for claude");
    assert.equal(webSearch!.type, "web_search_20250305");
    // Anthropic-shape tool is untouched.
    const lookup = result.tools!.find((t: any) => t.name === "lookup_user") as any;
    assert.ok(lookup);
    assert.deepEqual(lookup.input_schema, {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
    });
  });
});
