/**
 * antigravity/gemini returned [400] "Invalid JSON payload received.
 * Unknown name \"strict\" at 'request.tools[0].function_declarations[0].parameters':
 * Cannot find field."
 *
 * Root cause: OpenAI-convention clients (RubyLLM and others) embed
 * `strict: true/false` directly inside a tool's `parameters` JSON schema as part
 * of OpenAI's strict tool-calling mode. `strict` was NOT listed in
 * `GEMINI_UNSUPPORTED_SCHEMA_KEYS`, so `cleanJSONSchemaForAntigravity` left it in
 * the function-declaration parameters, and the Gemini/antigravity upstream
 * (OpenAPI 3.0 schema subset) rejects the unrecognized keyword with a hard 400.
 *
 * Fix: add `strict` to the unsupported-keys set so it is stripped at every level.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  cleanJSONSchemaForAntigravity,
  GEMINI_UNSUPPORTED_SCHEMA_KEYS,
} from "../../open-sse/translator/helpers/geminiHelper.ts";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

test("strict is stripped at all levels for antigravity/gemini schemas", () => {
  const schema = {
    type: "object",
    strict: true,
    properties: {
      query: { type: "string" },
      filters: { type: "object", strict: false, properties: {} },
    },
  };

  const cleaned = JSON.stringify(cleanJSONSchemaForAntigravity(schema));

  assert.ok(!cleaned.includes("strict"), "strict must be removed");
  assert.ok(cleaned.includes("query"), "unrelated properties must be preserved");
});

test("strict is in GEMINI_UNSUPPORTED_SCHEMA_KEYS", () => {
  assert.ok(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("strict"));
});

test("OpenAI -> Gemini request strips strict from OpenAI-style function tool parameters", () => {
  const body = {
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        type: "function",
        function: {
          name: "search_conversations",
          description: "search",
          parameters: { type: "object", strict: true, properties: { query: { type: "string" } } },
        },
      },
    ],
  };

  const result = openaiToGeminiRequest("gemini-3.5-flash-low", body, false) as {
    tools?: Array<{ functionDeclarations?: Array<{ parameters: unknown }> }>;
  };

  const parameters = result.tools?.[0]?.functionDeclarations?.[0]?.parameters;
  assert.ok(parameters, "expected a translated function declaration");
  assert.ok(!JSON.stringify(parameters).includes("strict"), "strict must not reach the upstream request");
});
