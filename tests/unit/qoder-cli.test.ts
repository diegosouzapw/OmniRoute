import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const qoderCli = await import("../../open-sse/services/qoderCli.ts");

/**
 * Write a fake `qodercli` binary and point CLI_QODER_BIN at it (see the twin
 * helper in qoder-executor.test.ts). The stub authenticates unless the PAT
 * contains "bad", covering both `--list-models` (validation) and `--print`.
 */
function withStubQoderCli(fn: () => void | Promise<void>) {
  const prevBin = process.env.CLI_QODER_BIN;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "qodercli-stub-"));
  const stub = path.join(dir, "qodercli");
  fs.writeFileSync(
    stub,
    [
      "#!/bin/sh",
      'is_bad() { case "$QODER_PERSONAL_ACCESS_TOKEN" in *bad*) return 0;; *) return 1;; esac; }',
      'case "$*" in',
      "  *--list-models*)",
      '    if is_bad; then echo "Not logged in · Please run /login"; exit 0; fi',
      '    printf "MODEL\\nAuto\\nQwen3-Coder\\n"; exit 0;;',
      "  *--print*)",
      "    cat >/dev/null;",
      '    if is_bad; then printf \'{"type":"result","subtype":"success","is_error":true,"result":"Not logged in · Please run /login"}\\n\'; exit 0; fi',
      '    printf \'{"type":"result","subtype":"success","is_error":false,"result":"OK from stub"}\\n\'; exit 0;;',
      "esac",
      "exit 0",
    ].join("\n"),
    { mode: 0o755 }
  );
  process.env.CLI_QODER_BIN = stub;
  const restore = () => {
    if (prevBin === undefined) delete process.env.CLI_QODER_BIN;
    else process.env.CLI_QODER_BIN = prevBin;
    fs.rmSync(dir, { recursive: true, force: true });
  };
  return Promise.resolve().then(fn).finally(restore);
}

function withEnv(
  overrides: Record<string, string | undefined | null>,
  fn: () => void | Promise<void>
) {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined || value === null) {
      delete process.env[key];
    } else {
      process.env[key] = String(value);
    }
  }

  return Promise.resolve()
    .then(fn)
    .finally(() => {
      for (const [key, value] of previous.entries()) {
        if (value === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = value;
        }
      }
    });
}

test("qoder cli env helpers honor explicit command and workspace overrides", async () => {
  await withEnv(
    {
      CLI_QODER_BIN: " custom-qoder ",
      QODER_CLI_WORKSPACE: "/tmp/qoder-workspace",
      OMNIROUTE_QODER_WORKSPACE: "/tmp/ignored",
    },
    () => {
      assert.equal(qoderCli.getQoderCliCommand(), "custom-qoder");
      assert.equal(qoderCli.getQoderCliWorkspace(), "/tmp/qoder-workspace");
    }
  );

  await withEnv(
    {
      CLI_QODER_BIN: undefined,
      QODER_CLI_WORKSPACE: undefined,
      OMNIROUTE_QODER_WORKSPACE: "/tmp/fallback-workspace",
    },
    () => {
      assert.equal(qoderCli.getQoderCliCommand(), "qodercli");
      assert.equal(qoderCli.getQoderCliWorkspace(), "/tmp/fallback-workspace");
    }
  );
});

test("qoder cli provider metadata helpers normalize PAT transport and detect transport type", () => {
  assert.deepEqual(qoderCli.normalizeQoderPatProviderData({ region: "us" }), {
    region: "us",
    authMode: "pat",
    transport: "qodercli",
  });

  assert.equal(qoderCli.isQoderCliTransport({ transport: "qodercli" }), true);
  assert.equal(qoderCli.isQoderCliTransport({ authMode: "pat" }), true);
  assert.equal(qoderCli.isQoderCliTransport({ transport: "http-legacy", authMode: "pat" }), false);
  assert.equal(qoderCli.isQoderCliTransport({ transport: "http" }), false);
});

test("qoder cli static models are copied and model-to-level mapping covers major families", () => {
  const models = qoderCli.getStaticQoderModels();
  const snapshot = qoderCli.getStaticQoderModels();

  models[0].name = "mutated";

  assert.notEqual(snapshot[0].name, "mutated");
  assert.equal(qoderCli.mapQoderModelToLevel("deepseek-r1"), "ultimate");
  assert.equal(qoderCli.mapQoderModelToLevel("qwen3-max-preview"), "performance");
  assert.equal(qoderCli.mapQoderModelToLevel("kimi-k2-0905"), "kmodel");
  assert.equal(qoderCli.mapQoderModelToLevel("qwen3-coder-plus"), "qmodel");
  assert.equal(qoderCli.mapQoderModelToLevel("qoder-rome-30ba3b"), "qmodel");
  assert.equal(qoderCli.mapQoderModelToLevel("totally-unknown"), "auto");
  assert.equal(qoderCli.mapQoderModelToLevel(""), null);
});

test("buildQoderPrompt flattens mixed content, tool calls, tool results and JSON output instructions", () => {
  const prompt = qoderCli.buildQoderPrompt({
    tools: [
      { type: "function", function: { name: "lookup_weather" } },
      { type: "function", function: { name: "" } },
      { name: "anthropic_tool" },
    ],
    response_format: {
      type: "json_schema",
      json_schema: { schema: { type: "object", properties: { city: { type: "string" } } } },
    },
    messages: [
      { role: "system", content: "Top level system" },
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image" },
          { type: "input_image", image_url: "ignored" },
        ],
      },
      {
        role: "assistant",
        content: "Thinking aloud",
        tool_calls: [
          {
            function: {
              name: "lookup_weather",
              arguments: '{"city":"Sao Paulo"}',
            },
          },
        ],
      },
      {
        role: "tool",
        name: "lookup_weather",
        content: [{ type: "text", text: "26C and sunny" }],
      },
    ],
  });

  assert.match(
    prompt,
    /Caller-side tools are available externally: lookup_weather, anthropic_tool/
  );
  assert.match(prompt, /Return only valid JSON matching this schema/);
  assert.match(prompt, /SYSTEM:\nTop level system/);
  assert.match(prompt, /USER:\nDescribe this image\n\[Image omitted\]/);
  assert.match(prompt, /TOOL_CALL lookup_weather: \{"city":"Sao Paulo"\}/);
  assert.match(prompt, /TOOL \(lookup_weather\):\n26C and sunny/);
  assert.match(prompt, /Reply now with the assistant response only\./);
});

test("buildQoderPrompt supports input arrays and json_object responses", () => {
  const prompt = qoderCli.buildQoderPrompt({
    response_format: { type: "json_object" },
    input: [{ role: "user", content: [{ type: "input_text", text: "hello from input" }] }],
  });

  assert.match(prompt, /Return only valid JSON\./);
  assert.match(prompt, /Conversation transcript:/);
  assert.match(prompt, /USER:\nhello from input/);
});

test("qoder cli payload helpers normalize envelope text and completion payload shapes", () => {
  assert.equal(
    qoderCli.extractTextFromQoderEnvelope({
      message: { content: "hello" },
    }),
    "hello"
  );
  assert.equal(
    qoderCli.extractTextFromQoderEnvelope({
      content: [
        { type: "text", text: "hi" },
        { type: "ignored", text: "drop" },
        { text: " there" },
      ],
    }),
    "hi there"
  );
  assert.equal(qoderCli.extractTextFromQoderEnvelope(null), "");

  const completion = qoderCli.buildQoderCompletionPayload({
    model: "qwen3-coder-plus",
    text: "Ship it",
  });
  assert.equal(completion.object, "chat.completion");
  assert.equal(completion.model, "qwen3-coder-plus");
  assert.equal(completion.choices[0].message.content, "Ship it");

  const chunk = qoderCli.buildQoderChunk({
    id: "chunk-1",
    model: "qoder-rome-30ba3b",
    created: 123,
    delta: { content: "partial" },
    finishReason: "stop",
  });
  assert.deepEqual(chunk, {
    id: "chunk-1",
    object: "chat.completion.chunk",
    created: 123,
    model: "qoder-rome-30ba3b",
    choices: [
      {
        index: 0,
        delta: { content: "partial" },
        finish_reason: "stop",
      },
    ],
  });
});

test("qoder cli failure parsing classifies auth, timeout and generic upstream errors", async () => {
  assert.deepEqual(qoderCli.parseQoderCliFailure("Invalid API key"), {
    status: 401,
    message: "Invalid API key",
    code: "upstream_auth_error",
  });
  assert.deepEqual(qoderCli.parseQoderCliFailure("", "request timeout"), {
    status: 504,
    message: "request timeout",
    code: "timeout",
  });
  assert.deepEqual(qoderCli.parseQoderCliFailure("bad gateway", "more context"), {
    status: 502,
    message: "bad gateway\nmore context",
    code: "upstream_error",
  });

  const authResponse = qoderCli.createQoderErrorResponse({
    status: 401,
    message: "denied",
    code: "upstream_auth_error",
  });
  const providerResponse = qoderCli.createQoderErrorResponse({
    status: 502,
    message: "boom",
    code: "upstream_error",
  });

  assert.equal(authResponse.status, 401);
  assert.deepEqual(await authResponse.json(), {
    error: {
      message: "denied",
      type: "authentication_error",
      code: "upstream_auth_error",
    },
  });
  assert.equal(providerResponse.status, 502);
  assert.deepEqual(await providerResponse.json(), {
    error: {
      message: "boom",
      type: "provider_error",
      code: "upstream_error",
    },
  });
});

test("validateQoderCliPat returns valid when qodercli lists models for the PAT", async () => {
  await withStubQoderCli(async () => {
    const result = await qoderCli.validateQoderCliPat({ apiKey: "pt-valid-token" });
    assert.deepEqual(result, { valid: true, error: null, unsupported: false });
  });
});

test("validateQoderCliPat rejects a PAT that qodercli reports as not logged in", async () => {
  await withStubQoderCli(async () => {
    const result = await qoderCli.validateQoderCliPat({ apiKey: "pt-bad-token" });
    assert.equal(result.valid, false);
    assert.match(result.error!, /not authorized|integrations/i);
  });
});

test("validateQoderCliPat rejects an encrypted auth blob without spawning", async () => {
  const blobToken = "x".repeat(600);
  const result = await qoderCli.validateQoderCliPat({ apiKey: blobToken });
  assert.equal(result.valid, false);
  assert.match(result.error!, /encrypted auth blob/i);
});

test("validateQoderCliPat requires a token", async () => {
  const result = await qoderCli.validateQoderCliPat({ apiKey: "" });
  assert.equal(result.valid, false);
  assert.match(result.error!, /No Qoder token/i);
});

test("validateQoderCliPat surfaces a clear error when qodercli is missing", async () => {
  const prevBin = process.env.CLI_QODER_BIN;
  process.env.CLI_QODER_BIN = "/nonexistent/qodercli-please-fail";
  try {
    const result = await qoderCli.validateQoderCliPat({ apiKey: "pt-valid-token" });
    assert.equal(result.valid, false);
    assert.match(result.error!, /qodercli|CLI_QODER_BIN|not found/i);
  } finally {
    if (prevBin === undefined) delete process.env.CLI_QODER_BIN;
    else process.env.CLI_QODER_BIN = prevBin;
  }
});

test("runQoderCli drives the stub binary and returns its JSON envelope", async () => {
  await withStubQoderCli(async () => {
    const run = await qoderCli.runQoderCli({
      token: "pt-valid-token",
      prompt: "hello",
      stream: false,
      model: "qwen3-coder-plus",
    });
    assert.equal(run.ok, true);
    const parsed = qoderCli.parseQoderCliResult(run.stdout);
    assert.equal(parsed.isError, false);
    assert.equal(parsed.text, "OK from stub");
  });
});

test("parseQoderCliResult extracts text, flags errors and tolerates banner noise", () => {
  assert.deepEqual(
    qoderCli.parseQoderCliResult('{"type":"result","is_error":false,"result":"pong"}'),
    { text: "pong", isError: false, errorMessage: "" }
  );

  const errored = qoderCli.parseQoderCliResult(
    '{"type":"result","is_error":true,"result":"Not logged in"}'
  );
  assert.equal(errored.isError, true);
  assert.equal(errored.errorMessage, "Not logged in");

  // Leading banner/log lines before the JSON envelope must still parse.
  const noisy = qoderCli.parseQoderCliResult(
    'starting qodercli...\nwarming up\n{"type":"result","is_error":false,"result":"hi"}'
  );
  assert.equal(noisy.text, "hi");
  assert.equal(noisy.isError, false);

  const empty = qoderCli.parseQoderCliResult("   ");
  assert.equal(empty.isError, true);
});

test("parseQoderCliFailure classifies qodercli auth output as 401", () => {
  for (const msg of [
    "Not logged in · Please run /login",
    "Failed to fetch model list: auth.exchangeJobToken failed: invalid personal token format",
  ]) {
    const failure = qoderCli.parseQoderCliFailure(msg);
    assert.equal(failure.status, 401, msg);
    assert.equal(failure.code, "upstream_auth_error", msg);
  }
});
