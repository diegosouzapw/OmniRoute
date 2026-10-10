import assert from "node:assert/strict";
import test from "node:test";
import { normalizeFactoryCompletionJson } from "../../open-sse/executors/factory/completionResponse.ts";

const FW = "\uFF5C";
const toolBlock = (name: string, argumentsMarkup: string) =>
  `<${FW}DSML${FW}:${name}>${argumentsMarkup}</${FW}DSML${FW}:${name}>`;
const tools = [
  {
    type: "function",
    function: { name: "write", parameters: { type: "object" } },
  },
];

test("Factory DSML tool calls use the current parser contract and preserve call IDs", () => {
  const markup = toolBlock("write", `<path>/tmp/note.txt</path>`);
  const body = {
    choices: [
      {
        message: { content: `before ${markup} after` },
        finish_reason: "stop",
      },
    ],
  };

  normalizeFactoryCompletionJson(body, "deepseek-v4-pro", tools);

  const choice = body.choices[0];
  const message = choice.message as {
    content: string;
    tool_calls: Array<{
      id: string;
      type: string;
      function: { name: string; arguments: string };
    }>;
  };
  assert.equal(message.content, "before  after");
  assert.equal(message.tool_calls.length, 1);
  assert.match(message.tool_calls[0].id, /^call_dsml_[a-f0-9]+$/);
  assert.equal(message.tool_calls[0].type, "function");
  assert.equal(message.tool_calls[0].function.name, "write");
  assert.deepEqual(JSON.parse(message.tool_calls[0].function.arguments), {
    path: "/tmp/note.txt",
  });
  assert.equal(choice.finish_reason, "tool_calls");
});

test("Factory leaves undeclared DSML calls visible and non-executable", () => {
  const markup = toolBlock("delete_everything", `<path>/</path>`);
  const body = {
    choices: [
      {
        message: { content: markup },
        finish_reason: "stop",
      },
    ],
  };

  normalizeFactoryCompletionJson(body, "deepseek-v4-pro", tools);

  assert.equal(body.choices[0].message.content, markup);
  assert.equal("tool_calls" in body.choices[0].message, false);
  assert.equal(body.choices[0].finish_reason, "stop");
});
