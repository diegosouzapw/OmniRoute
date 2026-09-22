/**
 * antigravity/gemini returned [400] "Invalid JSON payload received.
 * Unknown name \"~optional\" at 'tools[0].function_declarations[N].parameters
 * .properties[M].value': Cannot find field." -- taking down every model behind
 * it (this exact error killed the entire `default` combo fallback chain live).
 *
 * Root cause: `~`-prefixed keys are the Standard Schema convention (Zod 4+,
 * Valibot, ArkType) for internal/vendor metadata, namespaced with a leading
 * `~` specifically so it can never collide with a real user-defined schema
 * property name. A tool built from one of those libraries leaked a literal
 * `~optional` key into a property's subschema. `GEMINI_UNSUPPORTED_SCHEMA_KEYS`
 * already listed the plain `"optional"` string, but that exact-match check
 * doesn't catch the tilde-prefixed form, so `removeUnsupportedKeywords` left
 * it in place and Gemini's OpenAPI 3.0 schema subset rejects the whole
 * request on the unrecognized field.
 *
 * Fix: strip any `~`-prefixed key at every schema level, the same way `x-`
 * vendor extensions are already stripped, instead of only matching literal
 * keys in the denylist. This covers `~optional` and any other Standard
 * Schema metadata key the same libraries may emit.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { cleanJSONSchemaForAntigravity } from "../../open-sse/translator/helpers/geminiHelper.ts";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

test("~optional (and other tilde-prefixed Standard Schema keys) are stripped at all levels for antigravity/gemini schemas", () => {
  const schema = {
    type: "object",
    "~standard": { version: 1, vendor: "zod" },
    properties: {
      query: { type: "string" },
      value: { type: "string", "~optional": true, description: "the value" },
    },
  };

  const cleaned = JSON.stringify(cleanJSONSchemaForAntigravity(schema));

  assert.ok(!cleaned.includes("~optional"), "~optional must be removed");
  assert.ok(!cleaned.includes("~standard"), "~standard must be removed");
  assert.ok(cleaned.includes("query"), "unrelated properties must be preserved");
  assert.ok(
    cleaned.includes("the value"),
    "unrelated sibling keys on the same subschema must be preserved"
  );
});

test("OpenAI -> Gemini request strips ~optional from a tool parameter's subschema", () => {
  const body = {
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        type: "function",
        function: {
          name: "set_config",
          description: "set a config value",
          parameters: {
            type: "object",
            properties: {
              key: { type: "string" },
              value: { type: "string", "~optional": true },
            },
          },
        },
      },
    ],
  };

  const result = openaiToGeminiRequest("gemini-3.7-flash-low", body, false) as {
    tools?: Array<{ functionDeclarations?: Array<{ parameters: unknown }> }>;
  };

  const parameters = result.tools?.[0]?.functionDeclarations?.[0]?.parameters;
  assert.ok(parameters, "expected a translated function declaration");
  assert.ok(
    !JSON.stringify(parameters).includes("~optional"),
    "~optional must not reach the upstream request"
  );
});
