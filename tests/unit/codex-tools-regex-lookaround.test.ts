import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeCodexTools } from "../../open-sse/executors/codex/tools.ts";

// Port of 9router#1556: OpenAI/Codex Responses API rejects JSON Schema `pattern`
// fields containing regex lookaround (lookahead/lookbehind) with:
//   "Invalid JSON schema: regex lookaround is not supported. Found at $.properties.email.pattern."
// Clients (e.g. IDE agent harnesses) commonly emit lookahead patterns such as
// `^(?=.*@).+$` for "must contain an @". These must be stripped before the
// tool schema reaches the Codex/OpenAI Responses API.
test("normalizeCodexTools strips regex lookaround from function tool parameter patterns", () => {
  const body: Record<string, unknown> = {
    tools: [
      {
        type: "function",
        function: {
          name: "send_email",
          description: "Send an email",
          parameters: {
            type: "object",
            properties: {
              email: {
                type: "string",
                pattern: "^(?=.*@).+$",
              },
            },
          },
        },
      },
    ],
  };

  normalizeCodexTools(body);

  const tools = body.tools as Array<Record<string, unknown>>;
  const parameters = tools[0].parameters as Record<string, unknown>;
  const properties = parameters.properties as Record<string, unknown>;
  const emailSchema = properties.email as Record<string, unknown>;

  assert.equal(
    emailSchema.pattern,
    undefined,
    "lookaround pattern must be stripped, not forwarded upstream"
  );
});

test("normalizeCodexTools preserves plain (non-lookaround) regex patterns", () => {
  const body: Record<string, unknown> = {
    tools: [
      {
        type: "function",
        function: {
          name: "send_email",
          parameters: {
            type: "object",
            properties: {
              zip: { type: "string", pattern: "^[0-9]{5}$" },
            },
          },
        },
      },
    ],
  };

  normalizeCodexTools(body);

  const tools = body.tools as Array<Record<string, unknown>>;
  const parameters = tools[0].parameters as Record<string, unknown>;
  const properties = parameters.properties as Record<string, unknown>;
  const zipSchema = properties.zip as Record<string, unknown>;

  assert.equal(zipSchema.pattern, "^[0-9]{5}$");
});
