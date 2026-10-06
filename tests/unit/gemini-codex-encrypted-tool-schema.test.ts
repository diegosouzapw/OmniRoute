/**
 * antigravity/gemini returned [400] "Invalid JSON payload received.
 * Unknown name \"encrypted\" at 'request.tools[0].function_declarations[11].
 * parameters.properties[0].value': Cannot find field."
 *
 * Root cause: Codex's multi-agent collaboration tools (spawn_agent /
 * send_message / followup_task) mark their `message` parameter schema with a
 * non-standard `encrypted: true` annotation (JsonSchema::with_encrypted).
 * `encrypted` was NOT listed in `GEMINI_UNSUPPORTED_SCHEMA_KEYS`, so
 * `cleanJSONSchemaForAntigravity` left it in the function-declaration
 * parameters, and the Gemini/antigravity upstream (OpenAPI 3.0 schema subset)
 * rejects the unrecognized keyword with a hard 400. This only shows up when
 * routing Codex to an agy/Antigravity model because the OpenAI passthrough
 * path does not validate tool schemas.
 *
 * Fix: add `encrypted` to the unsupported-keys set so it is stripped at every level.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  cleanJSONSchemaForAntigravity,
  GEMINI_UNSUPPORTED_SCHEMA_KEYS,
} from "../../open-sse/translator/helpers/geminiHelper.ts";
import { openaiToGeminiRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

test("encrypted is stripped at all levels for antigravity/gemini schemas", () => {
  const schema = {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Message text to send to the target agent.",
        encrypted: true,
      },
      task_name: { type: "string" },
    },
    required: ["message"],
  };

  const cleaned = JSON.stringify(cleanJSONSchemaForAntigravity(schema));

  assert.ok(!cleaned.includes("encrypted"), "encrypted must be removed");
  assert.ok(cleaned.includes("message"), "unrelated properties must be preserved");
  assert.ok(cleaned.includes("task_name"), "unrelated properties must be preserved");
});

test("encrypted is in GEMINI_UNSUPPORTED_SCHEMA_KEYS", () => {
  assert.ok(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("encrypted"));
});

test("OpenAI -> Gemini request strips encrypted from Codex collaboration tool parameters", () => {
  const body = {
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        type: "function",
        function: {
          name: "collaboration.send_message",
          description: "send",
          parameters: {
            type: "object",
            properties: {
              message: { type: "string", description: "Message text", encrypted: true },
              recipient: { type: "string" },
            },
            required: ["message", "recipient"],
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
    !JSON.stringify(parameters).includes("encrypted"),
    "encrypted must not reach the upstream request"
  );
});
