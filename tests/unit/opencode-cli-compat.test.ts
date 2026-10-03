import test from "node:test";
import assert from "node:assert/strict";
import { applyOpencodeCliCompat } from "../../open-sse/executors/opencodeCliCompat.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

test("generic requests carry captured CLI prompt/tools without mutating caller messages", () => {
  const input = {
    messages: [
      { role: "system", content: "Responda em português." },
      { role: "user", content: "2+2?" },
    ],
  };
  const original = structuredClone(input);
  const output = applyOpencodeCliCompat(input, "openai") as Record<string, unknown>;
  assert.deepEqual(input, original);
  const messages = output.messages as Array<{ role: string; content: string }>;
  assert.match(messages[0].content, /^You are opencode/);
  assert.deepEqual(messages.slice(1, 3), input.messages);
  assert.equal(messages[0].content.includes("/home/rapha4lx"), false);
  assert.equal(messages[0].content.includes("<available_skills>"), false);
  assert.equal(output.max_tokens, 32000);
  assert.equal(output.stream, true);
  assert.deepEqual(output.stream_options, { include_usage: true });
  assert.equal((output.tools as unknown[]).length, 11);
  assert.match(messages.at(-1)!.content, /No tool execution is available/);
  assert.equal(applyOpencodeCliCompat(output, "openai"), output);
});

test("native main and title requests pass through unchanged", () => {
  for (const content of [
    "You are opencode, an interactive CLI tool",
    "You are a title generator.",
  ]) {
    const input = { messages: [{ role: "system", content }], stream: true };
    assert.equal(applyOpencodeCliCompat(input, "openai"), input);
  }
});

test("client tools, limits and output choices are preserved", () => {
  const input = {
    messages: [{ role: "user", content: "hi" }],
    tools: [{ type: "function", function: { name: "search" } }],
    max_tokens: 128,
    tool_choice: "none",
    response_format: { type: "json_object" },
  };
  const output = applyOpencodeCliCompat(input, "openai");
  assert.deepEqual(output.tools, input.tools);
  assert.equal(output.max_tokens, 128);
  assert.equal(output.tool_choice, "none");
  assert.deepEqual(output.response_format, input.response_format);
  assert.equal(applyOpencodeCliCompat(input, "openai-responses"), input);
});

test("free-tier headers use CLI public auth while keyed and paid requests retain auth", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({}, false, {}, "big-pickle");
  assert.equal(headers.Authorization, "Bearer public");
  assert.equal(headers["x-opencode-client"], "cli");
  assert.equal(
    executor.buildHeaders({ apiKey: "test-secret" }, true, {}, "big-pickle").Authorization,
    "Bearer test-secret"
  );
  assert.equal(executor.buildHeaders({}, true, {}, "gpt-5.6-luna").Authorization, undefined);
});

test("executor preserves native title and main tools without adding placeholders", () => {
  const executor = new OpencodeExecutor("opencode");
  const title = executor.transformRequest(
    "big-pickle",
    {
      model: "big-pickle",
      stream: true,
      messages: [{ role: "system", content: "You are a title generator." }],
    },
    true,
    {}
  );
  assert.equal(title.tools, undefined);
  const tools = [{ type: "function", function: { name: "read" } }];
  const main = executor.transformRequest(
    "big-pickle",
    {
      model: "big-pickle",
      stream: true,
      tools,
      messages: [{ role: "system", content: "You are opencode, an interactive CLI tool" }],
    },
    true,
    {}
  );
  assert.deepEqual(main.tools, tools);
});

test("CLI adaptation can be disabled without changing the caller body", () => {
  const previous = process.env.OPENCODE_CLI_COMPAT;
  try {
    process.env.OPENCODE_CLI_COMPAT = "off";
    const input = { messages: [{ role: "user", content: "hi" }] };
    assert.equal(applyOpencodeCliCompat(input, "openai"), input);
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_CLI_COMPAT;
    else process.env.OPENCODE_CLI_COMPAT = previous;
  }
});

test("Responses adaptation uses captured developer prompt and flattened tools", () => {
  const input = {
    model: "muse-spark-1.3-contributor-free",
    input: [{ role: "user", content: "OK" }],
    instructions: "Responda em português.",
    max_output_tokens: 256,
  };
  const result = applyOpencodeCliCompat(input, "openai-responses") as Record<string, unknown>;
  const items = result.input as Array<{ role: string; content: string }>;
  assert.equal(items[0].role, "developer");
  assert.match(items[0].content, /You are OpenCode, a coding agent/);
  assert.match(items[0].content, /Responda em português/);
  assert.deepEqual(items[1], input.input[0]);
  assert.equal(result.max_output_tokens, 256);
  assert.equal(result.store, false);
  assert.deepEqual(result.include, ["reasoning.encrypted_content"]);
  const tools = result.tools as Array<Record<string, unknown>>;
  assert.equal(tools.length, 11);
  assert.equal(tools[0].name, "bash");
  assert.equal(tools[0].function, undefined);
  assert.equal(applyOpencodeCliCompat(result, "openai-responses"), result);
  assert.equal(input.instructions, "Responda em português.");
});
