// Regression for #12307: the semantic-cache signature ignored response_format /
// tools, so two temp=0 requests with identical messages but different response
// schemas shared a cache key — the second was served the first's stored body
// under a 200, violating the schema it asked for. The signature now folds an
// "output contract" (response_format, text.format, tools, tool_choice) into the
// digest when present, and stays byte-identical to the legacy key when absent
// so existing plain-chat cache entries survive the upgrade.
import test from "node:test";
import assert from "node:assert/strict";

const { generateSignature, outputContractOf } = await import("../../src/lib/semanticCache.ts");
const { storeSemanticCacheResponse } = await import(
  "../../open-sse/handlers/chatCore/semanticCacheStore.ts"
);
const { storeStreamingSemanticCacheResponse } = await import(
  "../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts"
);

const MESSAGES = [{ role: "user", content: "Describe a red bicycle." }];

const schemaOf = (properties: Record<string, unknown>) => ({
  type: "json_schema",
  json_schema: { name: "d", strict: true, schema: { type: "object", properties } },
});

test("different response schemas over identical messages produce different signatures", () => {
  const a = generateSignature("m", MESSAGES, 0, 1, "key",
    outputContractOf({ response_format: schemaOf({ value: { type: "string" } }) }));
  const b = generateSignature("m", MESSAGES, 0, 1, "key",
    outputContractOf({ response_format: schemaOf({ color: { type: "string" }, wheels: { type: "integer" } }) }));
  assert.notEqual(a, b);
});

test("identical response schemas still share a signature", () => {
  const contract = () => outputContractOf({ response_format: schemaOf({ value: { type: "string" } }) });
  assert.equal(
    generateSignature("m", MESSAGES, 0, 1, "key", contract()),
    generateSignature("m", MESSAGES, 0, 1, "key", contract())
  );
});

test("tools presence splits the signature from a tool-less request", () => {
  const withTools = generateSignature("m", MESSAGES, 0, 1, "key",
    outputContractOf({ tools: [{ type: "function", function: { name: "f", parameters: {} } }] }));
  const without = generateSignature("m", MESSAGES, 0, 1, "key", outputContractOf({}));
  assert.notEqual(withTools, without);
});

test("plain chat keeps the legacy signature — existing cache entries stay valid", () => {
  const legacy = generateSignature("m", MESSAGES, 0, 1, "key");
  const withNullContract = generateSignature("m", MESSAGES, 0, 1, "key", outputContractOf({ stream: true }));
  assert.equal(legacy, withNullContract);
});

test("outputContractOf returns null when no shape-determining field is present", () => {
  assert.equal(outputContractOf({ model: "m", messages: MESSAGES, temperature: 0 }), null);
  assert.equal(outputContractOf(null), null);
  assert.equal(outputContractOf("nonsense"), null);
});

test("outputContractOf collects the Responses-API text.format spelling too", () => {
  const contract = outputContractOf({ text: { format: { type: "json_schema", schema: {} } } });
  assert.ok(contract && typeof contract === "object");
  assert.ok("text_format" in (contract as Record<string, unknown>));
});

function recordingDeps() {
  const calls: unknown[][] = [];
  return {
    calls,
    deps: {
      isCacheableForWrite: () => true,
      isSmallEnoughForSemanticCache: () => true,
      generateSignature: (...args: unknown[]) => {
        calls.push(args);
        return "sig";
      },
      setCachedResponse: () => {},
    },
  };
}

test("non-streaming store path forwards the output contract to the signature", () => {
  const { calls, deps } = recordingDeps();
  const body = { messages: MESSAGES, temperature: 0, top_p: 1, response_format: schemaOf({ v: { type: "string" } }) };
  storeSemanticCacheResponse(
    { enabled: true, body, headers: {}, translatedResponse: { ok: true }, model: "m", apiKeyId: "key" },
    deps as never
  );
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0][5], outputContractOf(body));
});

test("streaming store path forwards the output contract to the signature", () => {
  const { calls, deps } = recordingDeps();
  const body = { messages: MESSAGES, temperature: 0, top_p: 1, response_format: schemaOf({ v: { type: "string" } }) };
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: { ok: true },
      body,
      headers: {},
      model: "m",
      apiKeyId: "key",
      streamUsage: null,
      log: null,
    } as never,
    deps as never
  );
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0][5], outputContractOf(body));
});
