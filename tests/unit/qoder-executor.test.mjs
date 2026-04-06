import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { QoderExecutor } from "../../open-sse/executors/qoder.ts";
import {
  buildQoderPrompt,
  getStaticQoderModels,
  mapQoderModelToLevel,
  normalizeQoderPatProviderData,
  parseQoderCliFailure,
  validateQoderCliPat,
} from "../../open-sse/services/qoderCli.ts";

function createTempDir() {
  const testRoot = path.join(os.tmpdir(), "omniroute-test-tmp");
  fs.mkdirSync(testRoot, { recursive: true });
  return fs.mkdtempSync(path.join(testRoot, "qoder-"));
}

function writeExecutable(dir, name, body) {
  const filePath = path.join(dir, name);
  fs.writeFileSync(filePath, body, "utf8");
  if (process.platform !== "win32") {
    fs.chmodSync(filePath, 0o755);
  }
  return filePath;
}

function createQoderCliScript(dir, name, mode) {
  if (process.platform === "win32") {
    const successJson = '{"message":{"content":"OK"}}';
    const successStream = [
      '{"message":{"content":"O"}}',
      '{"message":{"content":"OK"}}',
      '{"type":"result","done":true}',
    ].join("\\n");
    const body =
      mode === "invalid"
        ? `@echo off\r\nif "%1"=="--version" echo qodercli 0.1.37 & exit /b 0\r\necho Invalid API key 1>&2\r\nexit /b 1\r\n`
        : `@echo off\r\nif "%1"=="--version" echo qodercli 0.1.37 & exit /b 0\r\nset MODE=json\r\n:loop\r\nif "%1"=="" goto done\r\nif "%1"=="--output-format" (\r\n  set MODE=%2\r\n)\r\nshift\r\ngoto loop\r\n:done\r\nif "%MODE%"=="stream-json" (\r\n  echo ${successStream}\r\n) else (\r\n  echo ${successJson}\r\n)\r\nexit /b 0\r\n`;
    return writeExecutable(dir, `${name}.cmd`, body);
  }

  const successJson = `{"message":{"content":"OK"}}`;
  const successStream = `{"message":{"content":"O"}}\n{"message":{"content":"OK"}}\n{"type":"result","done":true}`;
  const body =
    mode === "invalid"
      ? `#!/bin/sh
if [ "$1" = "--version" ] || [ "$1" = "-v" ]; then
  echo "qodercli 0.1.37"
  exit 0
fi
echo "Invalid API key" >&2
exit 1
`
      : `#!/bin/sh
if [ "$1" = "--version" ] || [ "$1" = "-v" ]; then
  echo "qodercli 0.1.37"
  exit 0
fi
MODE=json
PREV=""
for ARG in "$@"; do
  if [ "$PREV" = "--output-format" ]; then
    MODE="$ARG"
  fi
  PREV="$ARG"
done
if [ "$MODE" = "stream-json" ]; then
  printf '%s\n' '${successStream}'
else
  printf '%s\n' '${successJson}'
fi
exit 0
`;

  return writeExecutable(dir, name, body);
}

test("QoderExecutor: constructor sets provider to qoder", () => {
  const executor = new QoderExecutor();
  assert.equal(executor.getProvider(), "qoder");
});

test("QoderExecutor: buildHeaders only keeps generic JSON and stream headers", () => {
  const executor = new QoderExecutor();
  assert.deepEqual(executor.buildHeaders({ apiKey: "pat" }, true), {
    "Content-Type": "application/json",
    Accept: "text/event-stream",
  });
  assert.deepEqual(executor.buildHeaders({ apiKey: "pat" }, false), {
    "Content-Type": "application/json",
  });
});

test("QoderExecutor: buildUrl uses the live qoder.com API base", () => {
  const executor = new QoderExecutor();
  assert.equal(
    executor.buildUrl("qoder-rome-30ba3b", false),
    "https://api.qoder.com/v1/chat/completions"
  );
});

test("normalizeQoderPatProviderData forces PAT + qodercli transport", () => {
  assert.deepEqual(normalizeQoderPatProviderData({ region: "sa-east-1" }), {
    region: "sa-east-1",
    authMode: "pat",
    transport: "qodercli",
  });
});

test("mapQoderModelToLevel maps static models to qodercli levels", () => {
  assert.equal(mapQoderModelToLevel("qoder-rome-30ba3b"), "qmodel");
  assert.equal(mapQoderModelToLevel("deepseek-r1"), "ultimate");
  assert.equal(mapQoderModelToLevel("qwen3-max"), "performance");
  assert.equal(mapQoderModelToLevel(""), null);
});

test("getStaticQoderModels exposes the static if/* catalog seed", () => {
  const models = getStaticQoderModels();
  assert.ok(models.some((model) => model.id === "qoder-rome-30ba3b"));
  assert.ok(models.some((model) => model.id === "deepseek-r1"));
});

test("buildQoderPrompt flattens transcript and warns against local tools", () => {
  const prompt = buildQoderPrompt({
    messages: [
      { role: "system", content: "Follow the user request." },
      {
        role: "user",
        content: [{ type: "text", text: "Reply with OK." }],
      },
      {
        role: "assistant",
        tool_calls: [
          {
            type: "function",
            function: { name: "pwd", arguments: "{}" },
          },
        ],
        content: "",
      },
    ],
    tools: [{ type: "function", function: { name: "pwd" } }],
  });

  assert.match(prompt, /Conversation transcript:/);
  assert.match(prompt, /USER:\nReply with OK\./);
  assert.match(prompt, /TOOL_CALL pwd: \{\}/);
  assert.match(prompt, /Do not call those tools yourself\./);
});

test("parseQoderCliFailure classifies auth, runtime and timeout failures", () => {
  assert.deepEqual(parseQoderCliFailure("Invalid API key"), {
    status: 401,
    message: "Invalid API key",
    code: "upstream_auth_error",
  });
  assert.deepEqual(parseQoderCliFailure("command not found: qodercli"), {
    status: 503,
    message: "command not found: qodercli",
    code: "runtime_error",
  });
  assert.deepEqual(parseQoderCliFailure("request timed out"), {
    status: 504,
    message: "request timed out",
    code: "timeout",
  });
});

test("validateQoderCliPat succeeds when qodercli returns a JSON response", async () => {
  const orig = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  try {
    const result = await validateQoderCliPat({ apiKey: "pat_test" });
    assert.deepEqual(result, { valid: true, error: null, unsupported: false });
  } finally {
    globalThis.fetch = orig;
  }
});

test("validateQoderCliPat returns invalid api key for auth failures", async () => {
  const orig = globalThis.fetch;
  globalThis.fetch = async () => new Response("Invalid API key", { status: 401 });
  try {
    const result = await validateQoderCliPat({ apiKey: "pat_bad" });
    assert.equal(result.valid, false);
    assert.ok(result.error != null && result.error.includes("401"));
    assert.equal(result.unsupported, false);
  } finally {
    globalThis.fetch = orig;
  }
});

test("QoderExecutor: non-stream calls return an OpenAI-compatible completion payload", async () => {
  const completionBody = JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion",
    created: 1234567890,
    model: "qoder-rome-30ba3b",
    choices: [{ index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  });
  const orig = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(completionBody, { status: 200, headers: { "Content-Type": "application/json" } });
  try {
    const executor = new QoderExecutor();
    const { response, url } = await executor.execute({
      model: "qoder-rome-30ba3b",
      body: { messages: [{ role: "user", content: "Reply with OK only." }] },
      stream: false,
      credentials: { apiKey: "pat_test" },
    });
    assert.ok(typeof url === "string" && url.startsWith("https://"));
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.object, "chat.completion");
    assert.equal(payload.choices[0].message.role, "assistant");
    assert.equal(payload.choices[0].message.content, "OK");
  } finally {
    globalThis.fetch = orig;
  }
});

test("QoderExecutor: stream calls emit OpenAI-compatible SSE chunks", async () => {
  const sseBody = [
    `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", created: 1234, model: "qoder-rome-30ba3b", choices: [{ index: 0, delta: { role: "assistant", content: "" }, finish_reason: null }] })}`,
    `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", created: 1234, model: "qoder-rome-30ba3b", choices: [{ index: 0, delta: { content: "O" }, finish_reason: null }] })}`,
    `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", created: 1234, model: "qoder-rome-30ba3b", choices: [{ index: 0, delta: { content: "K" }, finish_reason: null }] })}`,
    `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", created: 1234, model: "qoder-rome-30ba3b", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}`,
    "data: [DONE]",
    "",
  ].join("\n");
  const orig = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(sseBody, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  try {
    const executor = new QoderExecutor();
    const { response } = await executor.execute({
      model: "qoder-rome-30ba3b",
      body: { messages: [{ role: "user", content: "Reply with OK only." }] },
      stream: true,
      credentials: { apiKey: "pat_test" },
    });
    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /chat\.completion\.chunk/);
    assert.match(body, /"role":"assistant"/);
    assert.match(body, /"content":"O"/);
    assert.match(body, /"content":"K"/);
    assert.match(body, /\[DONE\]/);
  } finally {
    globalThis.fetch = orig;
  }
});
