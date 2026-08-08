#!/usr/bin/env node
import assert from "node:assert/strict";

const endpoint = "http://omniroute:20128/v1/messages";
const headers = {
  "anthropic-version": "2023-06-01",
  "content-type": "application/json",
  "x-api-key": "sk-local-devin-gateway",
};
const model = process.env.DEVIN_BRIDGE_MODEL || "devin-cli-agentic/swe-1-7";

async function request(prompt, extra = {}) {
  return fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      max_tokens: 256,
      messages: [{ role: "user", content: prompt }],
      ...extra,
    }),
  });
}

const textReply = await request("CONTRACT_TEXT");
assert.equal(textReply.status, 200);
assert.match(textReply.headers.get("content-type") || "", /application\/json/);
const textBody = await textReply.json();
assert.equal(textBody.type, "message");
assert.equal(textBody.role, "assistant");
assert.equal(textBody.stop_reason, "end_turn");
assert.deepEqual(textBody.content, [{ type: "text", text: "contract text" }]);

const toolReply = await request("CONTRACT_TOOL", {
  stream: true,
  tools: [
    {
      name: "Read",
      description: "Read a file",
      input_schema: {
        type: "object",
        properties: { file_path: { type: "string" } },
        required: ["file_path"],
        additionalProperties: false,
      },
    },
  ],
});
assert.equal(toolReply.status, 200);
assert.match(toolReply.headers.get("content-type") || "", /text\/event-stream/);
const toolStream = await toolReply.text();
const eventNames = toolStream
  .split("\n")
  .filter((line) => line.startsWith("event: "))
  .map((line) => line.slice(7));
assert.deepEqual(eventNames, [
  "message_start",
  "content_block_start",
  "content_block_delta",
  "content_block_stop",
  "message_delta",
  "message_stop",
]);
const toolEvents = toolStream
  .split("\n")
  .filter((line) => line.startsWith("data: "))
  .map((line) => JSON.parse(line.slice(6)));
const toolUse = toolEvents.find((event) => event.type === "content_block_start")?.content_block;
assert.equal(toolUse?.type, "tool_use");
assert.equal(toolUse?.name, "Read");
assert.match(toolUse?.id || "", /^tool_devin_/);

const repairedNarrativeReply = await request("CONTRACT_NARRATIVE_REPAIR", {
  tools: [
    {
      name: "Read",
      description: "Read a file",
      input_schema: {
        type: "object",
        properties: { file_path: { type: "string" } },
        required: ["file_path"],
        additionalProperties: false,
      },
    },
  ],
});
assert.equal(repairedNarrativeReply.status, 200);
const repairedNarrativeBody = await repairedNarrativeReply.json();
assert.equal(repairedNarrativeBody.stop_reason, "tool_use");
assert.equal(repairedNarrativeBody.content?.[0]?.type, "tool_use");
assert.equal(repairedNarrativeBody.content?.[0]?.name, "Read");

const continuationReply = await fetch(endpoint, {
  method: "POST",
  headers,
  body: JSON.stringify({
    model,
    max_tokens: 256,
    tools: [
      {
        name: "Read",
        description: "Read a file",
        input_schema: { type: "object", properties: {}, additionalProperties: true },
      },
    ],
    messages: [
      { role: "user", content: "CONTRACT_TOOL" },
      { role: "assistant", content: [toolUse] },
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUse.id,
            content: "CONTRACT_AFTER_TOOL",
          },
        ],
      },
    ],
  }),
});
assert.equal(continuationReply.status, 200);
const continuationBody = await continuationReply.json();
assert.equal(continuationBody.stop_reason, "end_turn");
assert.deepEqual(continuationBody.content, [{ type: "text", text: "contract continued" }]);

for (const marker of ["CONTRACT_ERROR", "CONTRACT_EXIT"]) {
  const failedReply = await request(marker);
  assert.equal(failedReply.status, 502);
  const failedBody = await failedReply.json();
  assert.equal(failedBody.error?.type, "server_error");
  assert.doesNotMatch(JSON.stringify(failedBody), /stack|anthropic|openai/i);
}

console.log("PASS: Anthropic Messages wire contracts and fail-closed errors passed");
