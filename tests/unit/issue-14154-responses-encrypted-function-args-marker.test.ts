import test from "node:test";
import assert from "node:assert/strict";

// #14154 — Codex MultiAgent V2 treats a collaboration function_call's arguments as
// backend ciphertext UNLESS the item carries an explicit `encrypted_function_args: []`
// plaintext-delivery marker (codex-rs ToolCall::direct_source). The vendored ChatGPT-web
// bridge already emits that marker for spawn_agent/send_message/followup_task. The general
// Responses translator used for every non-OpenAI chat-format upstream does NOT.

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type NamespaceIdentity = { namespace: string; name: string };
type RuntimeState = ReturnType<typeof initState> & {
  requestToolIdentityMap?: Map<string, NamespaceIdentity>;
};

function identityMapFor(namespace: string, name: string) {
  const request = openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        {
          type: "additional_tools",
          tools: [{ type: "namespace", name: namespace, tools: [{ name }] }],
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
    },
    false,
    { provider: "any-provider" }
  ) as { _toolNameMap?: Map<string, NamespaceIdentity> };
  assert.ok(request._toolNameMap instanceof Map);
  return request._toolNameMap;
}

function collectToolEvents(
  name: string,
  callId: string,
  requestToolIdentityMap?: Map<string, NamespaceIdentity>
) {
  const state = initState(FORMATS.OPENAI_RESPONSES) as RuntimeState;
  state.requestToolIdentityMap = requestToolIdentityMap;
  return openaiToOpenAIResponsesResponse(
    {
      id: "chatcmpl-14154",
      model: "deepseek-chat",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: callId,
                type: "function",
                function: { name, arguments: '{"message":"Reply with exactly the word READY"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    },
    state
  );
}

type ResponseItem = {
  type: string;
  name: string;
  namespace?: string;
  encrypted_function_args?: unknown[];
};
type ResponseEvent = {
  event: string;
  data: { item?: ResponseItem; response?: { output?: ResponseItem[] } };
};

function doneItem(events: ResponseEvent[]) {
  const done = events.find((event) => event.event === "response.output_item.done");
  assert.ok(done?.data.item, "expected response.output_item.done");
  return done.data.item as ResponseItem;
}

test("collaboration spawn_agent function_call carries encrypted_function_args:[] plaintext marker (#14154)", () => {
  const wireName = "collaboration__spawn_agent";
  const events = collectToolEvents(
    wireName,
    "call_spawn_agent",
    identityMapFor("collaboration", "spawn_agent")
  ) as ResponseEvent[];
  const item = doneItem(events);

  assert.deepEqual(
    { namespace: item.namespace, name: item.name },
    { namespace: "collaboration", name: "spawn_agent" }
  );

  assert.deepEqual(
    item.encrypted_function_args,
    [],
    "function_call item for a collaboration spawn_agent/send_message/followup_task call " +
      "must carry encrypted_function_args: [] so Codex delivers the message as plaintext"
  );
});

test("non-collaboration namespace function_call never carries encrypted_function_args (#14154)", () => {
  const wireName = "search__web_search";
  const events = collectToolEvents(
    wireName,
    "call_web_search",
    identityMapFor("search", "web_search")
  ) as ResponseEvent[];
  const item = doneItem(events);

  assert.deepEqual(
    { namespace: item.namespace, name: item.name },
    { namespace: "search", name: "web_search" }
  );
  assert.equal(item.encrypted_function_args, undefined);
});

test("bare non-namespaced function_call never carries encrypted_function_args (#14154)", () => {
  const events = collectToolEvents("get_weather", "call_weather", undefined) as ResponseEvent[];
  const item = doneItem(events);

  assert.equal(item.namespace, undefined);
  assert.equal(item.encrypted_function_args, undefined);
});
