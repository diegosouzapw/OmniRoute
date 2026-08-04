import test from "node:test";
import assert from "node:assert/strict";

import {
  sanitizeAntigravityToolPayload,
  stripEnumDescriptions,
} from "../../open-sse/config/toolCloaking.ts";

type ToolDeclaration = {
  name: string;
  parameters?: Record<string, unknown>;
};

function hasKeyDeep(value: unknown, key: string): boolean {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some((entry) => hasKeyDeep(entry, key));
  const record = value as Record<string, unknown>;
  return (
    Object.hasOwn(record, key) || Object.values(record).some((entry) => hasKeyDeep(entry, key))
  );
}

test("Antigravity tool sanitization preserves declared and historical tool names", () => {
  const payload = {
    request: {
      tools: [
        {
          functionDeclarations: [
            {
              name: "workspace_read",
              description: "Read a file",
              parameters: { type: "OBJECT", properties: {} },
            },
            {
              name: "run_command",
              description: "Run a command",
              parameters: { type: "OBJECT", properties: {} },
            },
          ],
        },
      ],
      contents: [
        {
          role: "model",
          parts: [{ functionCall: { name: "workspace_read", args: { path: "/tmp/a" } } }],
        },
        {
          role: "user",
          parts: [{ functionResponse: { name: "workspace_read", response: { ok: true } } }],
        },
      ],
    },
  };

  const result = sanitizeAntigravityToolPayload(payload);
  const declarations = result.request.tools[0].functionDeclarations;

  assert.deepEqual(
    declarations.map((tool: ToolDeclaration) => tool.name),
    ["workspace_read", "run_command"],
    "only client-declared tools should remain, in their original order"
  );
  assert.equal(
    result.request.contents[0].parts[0].functionCall.name,
    "workspace_read",
    "functionCall names must remain aligned with declarations"
  );
  assert.equal(
    result.request.contents[1].parts[0].functionResponse.name,
    "workspace_read",
    "functionResponse names must remain aligned with declarations"
  );
  assert.equal("_toolNameMap" in result, false, "sanitization must not create a reverse cloak map");
  assert.equal(
    "includeServerSideToolInvocations" in result.request,
    false,
    "sanitization must not opt into undeclared server-side tools"
  );
});

test("stripEnumDescriptions removes enumDescriptions at every nesting level", () => {
  const schema = {
    type: "OBJECT",
    enumDescriptions: ["should be removed at root"],
    properties: {
      mode: {
        type: "STRING",
        enum: ["a", "b"],
        enumDescriptions: ["desc a", "desc b"],
      },
      nested: {
        type: "OBJECT",
        properties: {
          choice: {
            type: "STRING",
            enumDescriptions: ["deep desc"],
          },
        },
      },
      list: {
        type: "ARRAY",
        items: {
          type: "STRING",
          enumDescriptions: ["item desc"],
        },
      },
    },
    anyOf: [{ type: "STRING", enumDescriptions: ["anyOf desc"] }],
    allOf: [{ oneOf: [{ type: "NUMBER", enumDescriptions: ["oneOf desc"] }] }],
    $defs: {
      shared: { type: "BOOLEAN", enumDescriptions: ["definition desc"] },
    },
    additionalProperties: {
      type: "STRING",
      enumDescriptions: ["additionalProperties desc"],
    },
  };

  const stripped = stripEnumDescriptions(schema) as Record<string, unknown>;

  assert.equal(hasKeyDeep(stripped, "enumDescriptions"), false);
  assert.deepEqual(
    ((stripped.properties as Record<string, unknown>).mode as Record<string, unknown>).enum,
    ["a", "b"]
  );
  assert.ok(Array.isArray(schema.properties.mode.enumDescriptions), "input must not be mutated");
});

test("Antigravity tool sanitization strips enumDescriptions without changing declarations", () => {
  const payload = {
    request: {
      tools: [
        {
          functionDeclarations: [
            {
              name: "workspace_read",
              description: "Read a file",
              parameters: {
                type: "OBJECT",
                enumDescriptions: ["root-level"],
                properties: {
                  mode: {
                    type: "STRING",
                    enum: ["read", "write"],
                    enumDescriptions: ["read mode", "write mode"],
                  },
                },
              },
            },
          ],
        },
      ],
      contents: [],
    },
  };

  const result = sanitizeAntigravityToolPayload(payload);
  const declaration = result.request.tools[0].functionDeclarations[0] as ToolDeclaration;
  const parameters = declaration.parameters as {
    enumDescriptions?: unknown;
    properties: { mode: { enumDescriptions?: unknown; enum: string[] } };
  };

  assert.equal(declaration.name, "workspace_read");
  assert.equal("enumDescriptions" in parameters, false);
  assert.equal("enumDescriptions" in parameters.properties.mode, false);
  assert.deepEqual(parameters.properties.mode.enum, ["read", "write"]);
});
