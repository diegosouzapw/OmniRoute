import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeFunctionResponseData, sanitizeGeminiPartFunctionResponse } = await import(
  "../../open-sse/translator/request/openai-to-gemini/helpers.ts"
);
const { openaiToCloudCodeGeminiRequest } = await import(
  "../../open-sse/translator/request/openai-to-gemini.ts"
);
const { claudeToGeminiRequest } = await import(
  "../../open-sse/translator/request/claude-to-gemini.ts"
);
const { AntigravityExecutor } = await import(
  "../../open-sse/executors/antigravity.ts"
);
const {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
  clearGeminiThoughtSignatures,
} = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

test.beforeEach(() => {
  clearGeminiThoughtSignatures();
});

type UnknownRecord = Record<string, unknown>;

function findFunctionResponsePart(contents: UnknownRecord[]): UnknownRecord | undefined {
  for (const c of contents) {
    if (Array.isArray(c.parts)) {
      for (const p of c.parts) {
        if (p && typeof p === "object" && "functionResponse" in (p as UnknownRecord)) {
          return (p as UnknownRecord).functionResponse as UnknownRecord;
        }
      }
    }
  }
  return undefined;
}

test("sanitizeFunctionResponseData renames $ref and $-prefixed keys in nested structures while preserving primitives and normal keys", () => {
  assert.equal(sanitizeFunctionResponseData(null), null);
  assert.equal(sanitizeFunctionResponseData(undefined), undefined);
  assert.equal(sanitizeFunctionResponseData("plain text"), "plain text");
  assert.equal(sanitizeFunctionResponseData(42), 42);
  assert.equal(sanitizeFunctionResponseData(true), true);

  const input = {
    $ref: "#/components/schemas/RootError",
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "schema-id",
    name: "test-schema",
    count: 3,
    nested: {
      $ref: "#/components/schemas/NestedError",
      validKey: "value",
      deeper: {
        $defs: {
          item: {
            $ref: "#/definitions/Item",
            type: "string",
          },
        },
      },
    },
    items: [
      { $ref: "#/components/schemas/ItemOne", id: 1 },
      { regular: "item", $custom: "val" },
    ],
  };

  const expected = {
    _ref: "#/components/schemas/RootError",
    _schema: "http://json-schema.org/draft-07/schema#",
    _id: "schema-id",
    name: "test-schema",
    count: 3,
    nested: {
      _ref: "#/components/schemas/NestedError",
      validKey: "value",
      deeper: {
        _defs: {
          item: {
            _ref: "#/definitions/Item",
            type: "string",
          },
        },
      },
    },
    items: [
      { _ref: "#/components/schemas/ItemOne", id: 1 },
      { regular: "item", _custom: "val" },
    ],
  };

  assert.deepEqual(sanitizeFunctionResponseData(input), expected);
});

test("openaiToCloudCodeGeminiRequest converts tool message containing schema $ref into functionResponse with _ref", () => {
  const result = openaiToCloudCodeGeminiRequest(
    "gemini-3.8-flash",
    {
      messages: [
        { role: "user", content: "get schema definition" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_ref_1",
              type: "function",
              function: { name: "get_schema", arguments: "{}" },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_ref_1",
          content: { schema: { $ref: "#/components/schemas/BadRequestError" } },
        },
      ],
    },
    false
  );

  const contents = (result as { contents: UnknownRecord[] }).contents;
  assert.ok(Array.isArray(contents), "expected contents array");

  const functionResponse = findFunctionResponsePart(contents);
  assert.ok(functionResponse, "expected functionResponse part in contents");
  assert.equal(functionResponse.name, "get_schema");
  assert.deepEqual(functionResponse.response, {
    result: {
      schema: {
        _ref: "#/components/schemas/BadRequestError",
      },
    },
  });
});

test("claudeToGeminiRequest converts tool_result containing schema $ref into functionResponse with _ref", () => {
  const ns = "test-ns-ref-sanitization";
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_ref_1"), "SIG_REF_1");

  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: [{ type: "text", text: "fetch openapi schema" }] },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "need schema" },
            {
              type: "tool_use",
              id: "tu_ref_1",
              name: "fetch_schema",
              input: {},
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: "tu_ref_1",
              content: { schema: { $ref: "#/components/schemas/BadRequestError" } },
            },
          ],
        },
      ],
    },
    false,
    { _signatureNamespace: ns } as never
  );

  const contents = (result as { contents: UnknownRecord[] }).contents;
  assert.ok(Array.isArray(contents), "expected contents array");

  const functionResponse = findFunctionResponsePart(contents);
  assert.ok(functionResponse, "expected functionResponse part in contents");
  assert.equal(functionResponse.name, "fetch_schema");
  assert.deepEqual(functionResponse.response, {
    result: {
      schema: {
        _ref: "#/components/schemas/BadRequestError",
      },
    },
  });
});

test("AntigravityExecutor.transformRequest sanitizes functionResponse.response containing schema $ref into _ref", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents: [
        {
          role: "user",
          parts: [
            {
              functionResponse: {
                name: "get_schema",
                response: {
                  result: {
                    schema: {
                      $ref: "#/components/schemas/BadRequestError",
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
  };

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", body, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const contents = result.request.contents as Array<{
    role: string;
    parts: Array<{ functionResponse?: { response?: unknown } }>;
  }>;
  assert.ok(contents.length > 0);
  const fr = contents[0].parts[0].functionResponse;
  assert.deepEqual(fr?.response, {
    result: {
      schema: {
        _ref: "#/components/schemas/BadRequestError",
      },
    },
  });
});

test("sanitizeFunctionResponseData stops recursion at depth > 20", () => {
  let deeplyNested: Record<string, unknown> = { $ref: "level-deep" };
  for (let i = 0; i < 25; i++) {
    deeplyNested = { next: deeplyNested };
  }
  const sanitized = sanitizeFunctionResponseData(deeplyNested) as Record<string, unknown>;
  let cur: unknown = sanitized;
  for (let i = 0; i < 21; i++) {
    cur = (cur as Record<string, unknown>)?.next;
  }
  // Beyond depth 20, structure should be returned as-is (with $ref intact)
  let foundUnsanitized = false;
  while (cur && typeof cur === "object") {
    if ("$ref" in cur) {
      foundUnsanitized = true;
      break;
    }
    cur = (cur as Record<string, unknown>)?.next;
  }
  assert.equal(foundUnsanitized, true, "expected depth guard to halt sanitization past depth 20");
});

test("sanitizeGeminiPartFunctionResponse handles part with/without functionResponse cleanly", () => {
  const textPart = { text: "hello" };
  assert.equal(sanitizeGeminiPartFunctionResponse(textPart), textPart);

  const emptyFrPart = { functionResponse: { name: "test" } };
  assert.equal(sanitizeGeminiPartFunctionResponse(emptyFrPart), emptyFrPart);

  const frPart = {
    functionResponse: {
      name: "test",
      response: {
        $ref: "some-ref",
      },
    },
  };
  const sanitizedFr = sanitizeGeminiPartFunctionResponse(frPart);
  assert.deepEqual(sanitizedFr, {
    functionResponse: {
      name: "test",
      response: {
        _ref: "some-ref",
      },
    },
  });
});


