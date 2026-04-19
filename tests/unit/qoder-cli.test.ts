import test from "node:test";
import assert from "node:assert/strict";

const qoderCli = await import("../../open-sse/services/qoderCli.ts");

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

test("validateQoderCliPat builds COSY headers and handles success, HTTP failures and fetch errors", async () => {
  const originalFetch = globalThis.fetch;

  // Test 1: Success path (ping OK + validation OK)
  {
    let callIndex = 0;
    globalThis.fetch = async (url, options = {}) => {
      callIndex++;
      const urlStr = String(url);
      // Ping request
      if (urlStr.includes("/ping")) {
        return new Response("pong", { status: 200 });
      }
      // Validation request
      return new Response("ok", { status: 200 });
    };

    const success = await qoderCli.validateQoderCliPat({
      apiKey: "pat-token",
      providerSpecificData: { validationModelId: "kimi-k2" },
    });
    assert.equal(success.valid, true);
    assert.equal(success.error, null);
    assert.equal(success.unsupported, false);
  }

  // Test 2: Auth failure (ping OK + validation 403)
  {
    globalThis.fetch = async (url) => {
      if (String(url).includes("/ping")) {
        return new Response("pong", { status: 200 });
      }
      return new Response("denied", { status: 403 });
    };

    const denied = await qoderCli.validateQoderCliPat({
      apiKey: "pat-token",
      providerSpecificData: { modelId: "qwen3-max" },
    });
    assert.equal(denied.valid, false);
    assert.match(denied.error!, /Authentication failed/);
    assert.equal(denied.unsupported, false);
  }

  // Test 3: Network error (ping fails)
  {
    globalThis.fetch = async () => {
      throw new Error("network down");
    };

    const failed = await qoderCli.validateQoderCliPat({ apiKey: "pat-token" });
    assert.equal(failed.valid, false);
    assert.match(failed.error!, /Cannot reach Qoder API/);
    assert.equal(failed.unsupported, false);
  }

  // Test 4: Non-auth 4xx treated as auth-pass
  {
    globalThis.fetch = async (url) => {
      if (String(url).includes("/ping")) {
        return new Response("pong", { status: 200 });
      }
      return new Response("bad request", { status: 400 });
    };

    const badRequest = await qoderCli.validateQoderCliPat({ apiKey: "pat-token" });
    assert.equal(badRequest.valid, true);
    assert.equal(badRequest.error, null);
  }

  // Test 5: Empty token returns clear error
  {
    await withEnv({ QODER_PERSONAL_ACCESS_TOKEN: undefined }, async () => {
      const noToken = await qoderCli.validateQoderCliPat({ apiKey: "" });
      assert.equal(noToken.valid, false);
      assert.match(noToken.error!, /No Qoder token provided/);
    });
  }

  // Test 6: Encrypted blob token is rejected with guidance
  {
    const blobToken = "x".repeat(600);
    const blobResult = await qoderCli.validateQoderCliPat({ apiKey: blobToken });
    assert.equal(blobResult.valid, false);
    assert.match(blobResult.error!, /encrypted auth blob/);
  }

  globalThis.fetch = originalFetch;
});

test("validateQoderCliPat succeeds when the validation endpoint returns OK", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes("/ping")) return new Response("pong", { status: 200 });
    return new Response("ok", { status: 200 });
  };

  try {
    const result = await qoderCli.validateQoderCliPat({ apiKey: "valid-pat" });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateQoderCliPat treats 5xx HTTP failures as valid bypass", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url).includes("/ping")) return new Response("pong", { status: 200 });
    return new Response("server error", { status: 500 });
  };

  try {
    const result = await qoderCli.validateQoderCliPat({ apiKey: "valid-pat" });
    assert.equal(result.valid, true);
    assert.match(result.error!, /HTTP 500.*treating PAT as valid/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
