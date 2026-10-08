import assert from "node:assert/strict";
import test from "node:test";

import { CursorExecutor, loadCursorWireModelIds } from "../../open-sse/executors/cursor.ts";
import { encodeAgentRunRequest } from "../../open-sse/utils/cursorAgentProtobuf.ts";
import { decodeFields } from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

function requestedModel(payload: Buffer, framed = false) {
  const agent = decodeFields(framed ? payload.subarray(5) : payload).find(
    (field) => field.fieldNumber === 1
  );
  assert.ok(agent);
  const requested = decodeFields(agent.bytes).find((field) => field.fieldNumber === 9);
  assert.ok(requested);
  const fields = decodeFields(requested.bytes);
  return {
    modelId: fields.find((field) => field.fieldNumber === 1)?.bytes.toString(),
    parameters: fields
      .filter((field) => field.fieldNumber === 3)
      .map((field) => {
        const param = decodeFields(field.bytes);
        return {
          id: param.find((value) => value.fieldNumber === 1)?.bytes.toString(),
          value: param.find((value) => value.fieldNumber === 2)?.bytes.toString(),
        };
      }),
  };
}

test("explicit OpenAI reasoning_effort uses Cursor ModelParameter for the model family", () => {
  for (const [modelId, effort, parameterId] of [
    ["grok-4.7", "low", "effort"],
    ["claude-opus-5", "xhigh", "effort"],
    ["gpt-5.6-sol", "high", "reasoning"],
  ]) {
    const request = encodeAgentRunRequest({ modelId, userText: "hi", reasoningEffort: effort });
    assert.deepEqual(requestedModel(request), {
      modelId,
      parameters: [{ id: parameterId, value: effort }],
    });
  }
});

test("an effort encoded in the model ID wins over an explicit conflicting effort", () => {
  assert.deepEqual(
    requestedModel(
      encodeAgentRunRequest({ modelId: "grok-4.7-low", userText: "hi", reasoningEffort: "high" })
    ),
    { modelId: "grok-4.7", parameters: [{ id: "effort", value: "low" }] }
  );
});

test("auto routing and non-effort model families do not receive invented parameters", () => {
  assert.deepEqual(
    requestedModel(
      encodeAgentRunRequest({ modelId: "auto", userText: "hi", reasoningEffort: "low" })
    ),
    { modelId: "default", parameters: [] }
  );
  assert.deepEqual(
    requestedModel(
      encodeAgentRunRequest({ modelId: "composer-2.5", userText: "hi", reasoningEffort: "max" })
    ),
    { modelId: "composer-2.5", parameters: [] }
  );
});

test("executor forwards Chat Completions and Responses effort to the agent wire", () => {
  const executor = new CursorExecutor("cursor");
  for (const requestBody of [
    { messages: [{ role: "user", content: "hi" }], reasoning_effort: "medium" },
    { messages: [{ role: "user", content: "hi" }], reasoning: { effort: "medium" } },
  ]) {
    const payload = executor.transformRequest("grok-4.7", requestBody, true, null);
    assert.deepEqual(requestedModel(Buffer.from(payload), true), {
      modelId: "grok-4.7",
      parameters: [{ id: "effort", value: "medium" }],
    });
  }
});

test("OpenAI-to-Cursor translation preserves explicit reasoning_effort through to RunRequest", async () => {
  const { translateRequest } = await import("../../open-sse/translator/index.ts");
  const { FORMATS } = await import("../../open-sse/translator/formats.ts");
  const body = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CURSOR,
    "grok-4.7",
    { messages: [{ role: "user", content: "hi" }], reasoning_effort: "low" },
    true,
    null,
    "cursor"
  );
  const payload = new CursorExecutor("cursor").transformRequest("grok-4.7", body, true, null);
  assert.deepEqual(requestedModel(Buffer.from(payload), true), {
    modelId: "grok-4.7",
    parameters: [{ id: "effort", value: "low" }],
  });
});

test("one-million context is sent as the verified context=1m model parameter", () => {
  const request = encodeAgentRunRequest({ modelId: "gpt-5.6-sol-high-1m", userText: "hi" });
  assert.deepEqual(requestedModel(request), {
    modelId: "gpt-5.6-sol",
    parameters: [
      { id: "context", value: "1m" },
      { id: "reasoning", value: "high" },
      { id: "fast", value: "false" },
    ],
  });
});

test("custom grok effort aliases do not masquerade as upstream live model ids", async () => {
  const ids = await loadCursorWireModelIds("cursor", async (provider, includeCustomModels) => {
    assert.equal(provider, "cursor");
    assert.equal(includeCustomModels, false, "custom aliases are not exact Cursor model ids");
    return { authoritative: true, models: [{ id: "grok-4.7" }] };
  });
  assert.deepEqual(
    requestedModel(
      encodeAgentRunRequest({ modelId: "grok-4.7-low", userText: "hi", liveCatalogIds: ids })
    ),
    { modelId: "grok-4.7", parameters: [{ id: "effort", value: "low" }] }
  );
});
