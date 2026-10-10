import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dataDir = mkdtempSync(join(tmpdir(), "omr-history-12996-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = join(dataDir, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "1";
assert.equal(process.env.DATA_DIR, dataDir);

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { flattenNamespaceToolName } =
  await import("../../open-sse/translator/request/openai-responses/namespaceFlatten.ts");
const { extractRequestToolIdentityMap } =
  await import("../../open-sse/handlers/chatCore/requestToolIdentity.ts");
const { translateNonStreamingClientResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Identity = { namespace: string; name: string };
type Item = { type: string; namespace?: string; name: string };
type Event = {
  event: string;
  data: { item?: Item; response?: { output?: Item[] } };
};
const longIdentity = {
  namespace: `mcp__${"long_server_".repeat(8)}`,
  name: "read_configuration",
};
const wire = flattenNamespaceToolName(longIdentity.namespace, longIdentity.name);

function history(identity: Identity, callId = "old_call") {
  return { type: "function_call", ...identity, call_id: callId, arguments: "{}" };
}

function request(input: unknown[], tools: unknown[] = []) {
  const body = openaiResponsesToOpenAIRequest(
    "test-model",
    { input, tools, previous_response_id: "resp_previous" },
    true,
    { provider: "test-provider" }
  ) as Record<string, unknown>;
  const serialized = JSON.stringify(body);
  const ledger = extractRequestToolIdentityMap(body);
  assert.equal(serialized.includes("_namespaceToolIdentityMap"), false);
  assert.equal(serialized.includes("_toolNameMap"), false);
  return { ledger, body };
}

function streamedItems(ledger: Map<string, Identity> | null, name: string): Item[] {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  Object.assign(state, { requestToolIdentityMap: ledger });
  const events = openaiToOpenAIResponsesResponse(
    {
      id: "chatcmpl-history",
      model: "test-model",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              { index: 0, id: "new_call", type: "function", function: { name, arguments: "{}" } },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
    state
  ) as Event[];
  const added = events.find((event) => event.event === "response.output_item.added")?.data.item;
  const done = events.find((event) => event.event === "response.output_item.done")?.data.item;
  const completed = events.find((event) => event.event === "response.completed")?.data.response
    ?.output?.[0];
  assert.ok(added && done && completed, "all response lifecycle items must be emitted");
  return [added, done, completed];
}

function assertIdentity(items: Item[], expected: Identity) {
  for (const item of items) {
    assert.equal(item.namespace, expected.namespace);
    assert.equal(item.name, expected.name);
  }
}

test("request history restores a hash-truncated namespace in every streamed lifecycle item", () => {
  assert.equal(wire.length, 64);
  const { ledger } = request([history(longIdentity)]);
  assertIdentity(streamedItems(ledger, wire), longIdentity);
});

test("long leaf names also round-trip through request history", () => {
  const identity = { namespace: "mcp__server", name: "read".repeat(30) };
  const { ledger } = request([history(identity)]);
  assertIdentity(
    streamedItems(ledger, flattenNamespaceToolName(identity.namespace, identity.name)),
    identity
  );
});

test("the same history ledger restores non-streaming Responses output", () => {
  const { ledger, body } = request([history(longIdentity)]);
  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "chatcmpl-history",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              { id: "new_call", type: "function", function: { name: wire, arguments: "{}" } },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
    responsePayloadFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "test-provider",
    model: "test-model",
    requestBody: body,
    responseToolNameMap: null,
    requestToolIdentityMap: ledger,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "intermediate",
  });
  assertIdentity(
    result.response.output.filter((item: Item) => item.type === "function_call"),
    longIdentity
  );
  assert.equal(
    result.response.output.filter((item: Item) => item.type === "function_call").length,
    1
  );
});

test("current namespace declarations take precedence over historical aliases of the same wire name", () => {
  const declared = { namespace: "mcp__current", name: "read" };
  const name = flattenNamespaceToolName(declared.namespace, declared.name);
  const { ledger } = request(
    [history({ namespace: "mcp__old", name })],
    [{ type: "namespace", name: declared.namespace, tools: [{ name: declared.name }] }]
  );
  assertIdentity(streamedItems(ledger, name), declared);
});

for (const shape of ["responses", "chat"]) {
  test(`current ${shape} flat function declarations cannot acquire a historical namespace`, () => {
    const tool =
      shape === "responses"
        ? { type: "function", name: wire }
        : { type: "function", function: { name: wire, parameters: { type: "object" } } };
    const { ledger } = request([history(longIdentity)], [tool]);
    for (const item of streamedItems(ledger, wire)) {
      assert.equal(item.name, wire);
      assert.equal("namespace" in item, false);
    }
  });
}

test("a declared flat dot spelling takes precedence without losing the distinct historical wire spelling", () => {
  const dot = `${longIdentity.namespace}.${longIdentity.name}`;
  const { ledger } = request([history(longIdentity)], [{ type: "function", name: dot }]);
  for (const item of streamedItems(ledger, dot)) {
    assert.equal(item.name, dot);
    assert.equal("namespace" in item, false);
  }
  assertIdentity(streamedItems(ledger, wire), longIdentity);
});

test("repeated identical history remains unambiguous", () => {
  const { ledger } = request([history(longIdentity, "old_1"), history(longIdentity, "old_2")]);
  assertIdentity(streamedItems(ledger, wire), longIdentity);
});

test("conflicting historical identities never guess a namespace", () => {
  const name = "mcp__ambiguous__read";
  for (const identities of [
    [
      { namespace: "mcp__a", name },
      { namespace: "mcp__b", name },
    ],
    [
      { namespace: "mcp__b", name },
      { namespace: "mcp__a", name },
    ],
  ]) {
    const { ledger } = request(
      identities.map((identity, index) => history(identity, `old_${index}`))
    );
    for (const item of streamedItems(ledger, name)) {
      assert.equal(item.name, name);
      assert.equal("namespace" in item, false);
    }
  }
});

test("invalid and namespace-free history does not create identity evidence", () => {
  const { ledger } = request([
    history(longIdentity, ""),
    history({ namespace: longIdentity.namespace, name: "" }),
    history({ namespace: "", name: "flat" }),
  ]);
  assert.equal(ledger, null);
});

test("a later request with only previous_response_id cannot inherit another request's ledger", () => {
  const first = request([history(longIdentity)]);
  assert.ok(first.ledger?.has(wire));
  const second = request([]);
  assert.equal(second.ledger, null);
});
