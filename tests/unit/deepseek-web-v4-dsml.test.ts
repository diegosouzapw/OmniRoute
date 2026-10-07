// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

const { parseDeepSeekToolCalls } = await import(
  "../../open-sse/translator/deepseekWebTools.ts"
);

const sampleTools = [
  {
    type: "function",
    function: {
      name: "execute_code",
      description: "Run python code",
      parameters: {
        type: "object",
        properties: {
          code: { type: "string" },
          reset: { type: "boolean" },
        },
        required: ["code"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "terminal",
      description: "Execute shell commands",
      parameters: {
        type: "object",
        properties: {
          command: { type: "string" },
          timeout: { type: "number" },
        },
        required: ["command"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "vision_analyze",
      description: "Analyze image",
      parameters: {
        type: "object",
        properties: {
          image_url: { type: "string" },
          question: { type: "string" },
        },
        required: ["image_url", "question"],
      },
    },
  },
];

test("deepseek-web: preserves plain text whitespace without tool tags", () => {
  const plain = "   \n  echo 'hello'   \n\n";
  const res = parseDeepSeekToolCalls(plain, "call", sampleTools);
  assert.equal(res.content, plain);
  assert.equal(res.toolCalls, null);
});

test("deepseek-web: parses native DeepSeek V4 DSML calls with fullwidth bars", () => {
  const raw = `<｜｜DSML｜｜ calls>
<｜｜DSML｜｜ invoke name="vision_analyze">
<｜｜DSML｜｜ parameter name="image_url" string="true">/path/to/img.jpg</｜｜DSML｜｜ parameter>
<｜｜DSML｜｜ parameter name="question" string="true">What is this?</｜｜DSML｜｜ parameter>
</｜｜DSML｜｜ invoke>
<｜｜DSML｜｜ invoke name="terminal">
<｜｜DSML｜｜ parameter name="command" string="true">adb devices</｜｜DSML｜｜ parameter>
</｜｜DSML｜｜ invoke>
</｜｜DSML｜｜ calls>This response is AI-generated, for reference only.`;

  const res = parseDeepSeekToolCalls(raw, "call_dsml", sampleTools);
  assert.equal(res.content, "");
  assert.ok(Array.isArray(res.toolCalls));
  assert.equal(res.toolCalls.length, 2);
  assert.equal(res.toolCalls[0].function.name, "vision_analyze");
  assert.equal(res.toolCalls[1].function.name, "terminal");
  const args0 = JSON.parse(res.toolCalls[0].function.arguments);
  assert.equal(args0.image_url, "/path/to/img.jpg");
  assert.equal(args0.question, "What is this?");
  const args1 = JSON.parse(res.toolCalls[1].function.arguments);
  assert.equal(args1.command, "adb devices");
});

test("deepseek-web: handles function_calls envelope variation", () => {
  const raw = `<｜DSML｜function_calls>
<｜DSML｜invoke name="terminal">
<｜DSML｜parameter name="command">uname -a</｜DSML｜parameter>
</｜DSML｜invoke>
</｜DSML｜function_calls>`;

  const res = parseDeepSeekToolCalls(raw, "call_fn", sampleTools);
  assert.equal(res.content, "");
  assert.ok(Array.isArray(res.toolCalls));
  assert.equal(res.toolCalls.length, 1);
  assert.equal(res.toolCalls[0].function.name, "terminal");
  assert.ok(!res.content.includes("function_calls"));
});

test("deepseek-web: only strips trailing disclaimer, preserving disclaimer inside argument payload", () => {
  const disclaimer = "This response is AI-generated, for reference only.";
  const raw = `<tool>{"name": "terminal", "arguments": {"command": "echo '${disclaimer}'"}}</tool>${disclaimer}`;

  const res = parseDeepSeekToolCalls(raw, "call_disc", sampleTools);
  assert.ok(Array.isArray(res.toolCalls));
  assert.equal(res.toolCalls.length, 1);
  const args = JSON.parse(res.toolCalls[0].function.arguments);
  assert.equal(args.command, `echo '${disclaimer}'`);
  assert.equal(res.content, "");
});

test("deepseek-web: auto-wraps bare <parameter> blocks and resolves tool via nameless schema matching", () => {
  const raw = `Bukti sudah lengkap.
<parameter name="code">from hermes_tools import terminal
terminal('df -h')</parameter>`;

  const res = parseDeepSeekToolCalls(raw, "call_bare", sampleTools);
  assert.equal(res.content, "Bukti sudah lengkap.");
  assert.ok(Array.isArray(res.toolCalls));
  assert.equal(res.toolCalls.length, 1);
  assert.equal(res.toolCalls[0].function.name, "execute_code");
  const args = JSON.parse(res.toolCalls[0].function.arguments);
  assert.ok(args.code.includes("terminal('df -h')"));
});

test("deepseek-web: recovers from hallucinated trailing </parameter> closing tag", () => {
  const raw = `Data inti sudah lengkap.
<tool>{"name": "terminal", "arguments": {"command": "docker ps"}}</parameter>
</tool>`;

  const res = parseDeepSeekToolCalls(raw, "call_trail", sampleTools);
  assert.equal(res.content, "Data inti sudah lengkap.");
  assert.ok(Array.isArray(res.toolCalls));
  assert.equal(res.toolCalls.length, 1);
  assert.equal(res.toolCalls[0].function.name, "terminal");
  const args = JSON.parse(res.toolCalls[0].function.arguments);
  assert.equal(args.command, "docker ps");
});

test("deepseek-web: strips trailing parameter metadata tags and leftover debris after tool calls", () => {
  const raw = `Baik — saya telusuri telegram MCP. Saya baca file sumbernya langsung dengan Python native (kanal yang paling andal), plus tail log stderr MCP.

<tool><parameter name="code">import json, re, os
from hermes_tools import terminal
print("hello")</parameter>
</tool><parameter name="arguments">{"name":"execute_code"}
</tool>`;

  const res = parseDeepSeekToolCalls(raw, "call_debris", sampleTools);
  assert.equal(
    res.content,
    "Baik — saya telusuri telegram MCP. Saya baca file sumbernya langsung dengan Python native (kanal yang paling andal), plus tail log stderr MCP."
  );
  assert.ok(Array.isArray(res.toolCalls));
  assert.equal(res.toolCalls.length, 1);
  assert.equal(res.toolCalls[0].function.name, "execute_code");
  assert.ok(!res.content.includes("parameter"));
  assert.ok(!res.content.includes("arguments"));
});
