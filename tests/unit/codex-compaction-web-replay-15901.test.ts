import test from "node:test";
import assert from "node:assert/strict";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";

const executor = new CodexExecutor();
const webItem = {
  type: "web_search_call",
  id: "ws_synthetic_15901",
  status: "completed",
  action: { type: "search", query: "OpenAI Responses documentation" },
};
const input = [
  webItem,
  { type: "message", role: "user", content: [{ type: "input_text", text: "Summarize only." }] },
];
const metadata = (request_kind: string) => ({
  "x-codex-turn-metadata": JSON.stringify({ request_kind }),
});
function transform(body: Record<string, unknown>, path = "/responses") {
  return executor.transformRequest("gpt-6.1-sol", body, true, {
    requestEndpointPath: path,
    providerSpecificData: {},
  });
}
function request(overrides: Record<string, unknown> = {}) {
  return {
    _nativeCodexPassthrough: true,
    input: structuredClone(input),
    instructions: "Summarize without using tools.",
    reasoning: { effort: "low", summary: "auto" },
    client_metadata: metadata("compaction"),
    tools: [],
    tool_choice: "none",
    ...overrides,
  };
}

for (const tools of [[], undefined]) {
  test(`#15901 real executor declares replay web search with tools=${JSON.stringify(tools)}`, () => {
    const body = request({ tools });
    const before = structuredClone(body);
    const result = transform(body);
    assert.deepEqual(result.tools, [{ type: "web_search" }]);
    assert.equal(result.tool_choice, "none");
    assert.deepEqual(result.input, before.input);
    assert.equal((result.reasoning as Record<string, unknown>).effort, "low");
    assert.deepEqual(body, before);
  });
}

test("#15901 inserted replay declaration disables previously required tools and preserves other tools", () => {
  const tool = { type: "file_search", vector_store_ids: ["vs_synthetic"] };
  const result = transform(request({ tools: [tool], tool_choice: "required" }));
  assert.deepEqual(result.tools, [tool, { type: "web_search" }]);
  assert.equal(result.tool_choice, "none");
  assert.deepEqual(result.input, input);
});

for (const type of ["web_search", "web_search_preview", "web_search_preview_2025_03_11"]) {
  test(`#15901 existing ${type} declaration is retained without duplication or choice rewrite`, () => {
    const tool = { type, search_context_size: "low" };
    const result = transform(request({ tools: [tool], tool_choice: "auto" }));
    assert.deepEqual(result.tools, [tool]);
    assert.equal(result.tool_choice, "auto");
    assert.deepEqual(result.input, input);
  });
}

test("#15901 applying the executor twice does not duplicate the declaration", () => {
  const once = transform(request());
  const twice = transform({ ...once, _nativeCodexPassthrough: true });
  assert.deepEqual(twice.tools, [{ type: "web_search" }]);
  assert.equal(twice.tool_choice, "none");
  assert.deepEqual(twice.input, input);
});

for (const overrides of [
  { client_metadata: metadata("turn") },
  { client_metadata: { "x-codex-turn-metadata": "{" } },
  { client_metadata: { "x-codex-turn-metadata": "null" } },
  { client_metadata: { "x-codex-turn-metadata": "[]" } },
  { client_metadata: { "x-codex-turn-metadata": { request_kind: "compaction" } } },
  { client_metadata: null },
  { input: [input[1]] },
  { input: [{ type: "file_search_call", id: "synthetic" }] },
  { tools: null },
  { tools: {} },
]) {
  test(`#15901 unrelated/malformed request receives no replay declaration: ${JSON.stringify(overrides)}`, () => {
    const result = transform(request({ ...overrides, tool_choice: "auto" }));
    assert.deepEqual(result.tools, "tools" in overrides ? overrides.tools : []);
    assert.equal(result.tool_choice, "auto");
  });
}

test("#15901 native compact endpoint receives no replay declaration", () => {
  const result = transform(request({ tool_choice: "auto" }), "/responses/compact");
  assert.deepEqual(result.tools, []);
  assert.equal(result.tool_choice, "auto");
  assert.equal(result.stream, undefined);
  assert.equal(result.client_metadata, undefined);
});

test("#15901 translated compaction also preserves the replay declaration through the final allowlist", () => {
  const result = transform(request({ _nativeCodexPassthrough: false }));
  assert.deepEqual(result.tools, [{ type: "web_search" }]);
  assert.equal(result.tool_choice, "none");
  assert.deepEqual(result.input, input);
});

test("#15901 normal turns retain the existing ID sanitization and tool filtering", () => {
  const result = transform(
    request({
      client_metadata: metadata("turn"),
      tools: [{ type: "web_search_preview_2025_03_11" }],
      tool_choice: "auto",
    })
  );
  assert.deepEqual(result.tools, []);
  assert.equal(result.tool_choice, "auto");
  assert.equal((result.input as Array<Record<string, unknown>>)[0].id, undefined);
});
