import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";

// A combo that falls back from grok-cli to codex replays Grok Build's reasoning items
// (Codex CLI / desktop run with `store: false`). Probed against Codex through the router:
//   400 The encrypted content for item rs_<uuid> could not be verified. Reason: Encrypted
//   content could not be decrypted or parsed.
// Grok names its reasoning items `rs_<uuid>` and its server-side tool reasoning `tco_…` (the
// blob starts with `tco_` too); both are rejected, and Codex answers 200 once they are gone.

type JsonRecord = Record<string, unknown>;

const GROK_REASONING = {
  type: "reasoning",
  id: "rs_097f708d-faf9-91f8-9cec-bbd2447a485b",
  summary: [],
  encrypted_content: "U358W4-grok-blob",
};
const GROK_TOOL_REASONING = {
  type: "reasoning",
  id: "tco_7b1c2d3e-4f50-6172-8394-a5b6c7d8e9f0_call-0a1b2c3d-4e5f-6071-8293-a4b5c6d7e8f9-0",
  summary: [],
  encrypted_content: "tco_7b-grok-tool-blob",
};
const OPENAI_REASONING = {
  type: "reasoning",
  id: "rs_0ace61e8ac94df2a016ab3bddd086487d0b29ca58423f85d49",
  summary: [],
  encrypted_content: "gAAAAABo-openai-blob",
};

const user = (text: string) => ({
  type: "message",
  role: "user",
  content: [{ type: "input_text", text }],
});
const assistant = {
  type: "message",
  role: "assistant",
  content: [{ type: "output_text", text: "144" }],
};
const webSearchCall = {
  type: "web_search_call",
  status: "completed",
  action: { type: "search", query: "node lts" },
};

function transformInput(
  input: unknown[],
  nativeCodexPassthrough: boolean,
  requestEndpointPath = "/responses"
): JsonRecord[] {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.6",
    { _nativeCodexPassthrough: nativeCodexPassthrough, input, stream: true, store: false },
    true,
    { requestEndpointPath } as never
  ) as JsonRecord;
  return result.input as JsonRecord[];
}

const reasoningIds = (input: JsonRecord[]) =>
  input.filter((item) => item.type === "reasoning").map((item) => item.id);

for (const native of [true, false]) {
  const label = native ? "native passthrough" : "other Responses client";

  test(`codex drops Grok Build rs_<uuid> reasoning from the replay (${label})`, () => {
    const out = transformInput([user("12*12?"), GROK_REASONING, assistant, user("13*13?")], native);

    assert.equal(
      out.some((item) => item.type === "reasoning"),
      false
    );
    assert.equal(JSON.stringify(out).includes("grok-blob"), false);
  });

  test(`codex drops Grok Build tco_ tool reasoning, with or without its id (${label})`, () => {
    const { id: _id, ...idLess } = GROK_TOOL_REASONING;
    const out = transformInput(
      [user("search"), webSearchCall, GROK_TOOL_REASONING, idLess, assistant, user("ok")],
      native
    );

    assert.equal(
      out.some((item) => item.type === "reasoning"),
      false
    );
    assert.equal(JSON.stringify(out).includes("grok-tool-blob"), false);
  });

  test(`codex keeps its own reasoning next to Grok's and the other Grok items (${label})`, () => {
    const out = transformInput(
      [
        user("search"),
        GROK_REASONING,
        webSearchCall,
        GROK_TOOL_REASONING,
        assistant,
        OPENAI_REASONING,
        user("ok"),
      ],
      native
    );

    assert.deepEqual(reasoningIds(out), [OPENAI_REASONING.id]);
    assert.equal(
      out.find((item) => item.type === "reasoning")?.encrypted_content,
      "gAAAAABo-openai-blob"
    );
    assert.equal(
      out.some((item) => item.type === "web_search_call"),
      true
    );
  });
}

test("codex drops Grok Build reasoning from /responses/compact requests too", () => {
  const out = transformInput(
    [user("12*12?"), GROK_REASONING, assistant, GROK_TOOL_REASONING, user("compact")],
    true,
    "/responses/compact"
  );

  assert.equal(
    out.some((item) => item.type === "reasoning"),
    false
  );
});

test("codex leaves no item pointing at a dropped Grok reasoning item", () => {
  // Codex rejects a function_call whose id refers to a reasoning item that is not replayed.
  const functionCall = {
    type: "function_call",
    id: "fc_5d1e2f3a-4b5c-6d7e-8f90-a1b2c3d4e5f6",
    call_id: "call_1",
    name: "exec_command",
    arguments: "{}",
  };
  const out = transformInput(
    [
      user("run it"),
      GROK_REASONING,
      functionCall,
      { type: "function_call_output", call_id: "call_1", output: "ok" },
    ],
    true
  );

  assert.deepEqual(
    out.map((item) => item.type),
    ["message", "function_call", "function_call_output"]
  );
  assert.equal(out[1].id, undefined);
});

test("codex replays its own reasoning unchanged when no Grok item is present", () => {
  const out = transformInput([user("12*12?"), OPENAI_REASONING, assistant, user("13*13?")], true);

  assert.deepEqual(
    out.filter((item) => item.type === "reasoning"),
    [OPENAI_REASONING]
  );
});

test("codex does not mutate the caller's input (combo fallback reuses it)", () => {
  const input = [user("12*12?"), GROK_REASONING, GROK_TOOL_REASONING, assistant, user("13*13?")];
  const snapshot = structuredClone(input);

  transformInput(input, true);

  assert.deepEqual(input, snapshot);
});
