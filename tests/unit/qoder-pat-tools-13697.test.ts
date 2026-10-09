import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "qoder-pat-tools-"));
process.env.DATA_DIR = dataDir;
process.env.REQUIRE_API_KEY = "false";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { createProviderConnection, deleteProviderConnectionsByProvider } =
  await import("../../src/lib/db/providers.ts");
const { QoderExecutor } = await import("../../open-sse/executors/qoder.ts");
const { resolveQoderAuthToken, qoderSupportsCallerTools, hasQoderCallerTools } =
  await import("../../open-sse/services/qoderCapabilities.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("transport detection preserves token precedence and legacy tool requests", () => {
  const credentials = {
    apiKey: " sk-http-fixture ",
    get accessToken(): string {
      throw new Error("a lower-priority token must not be materialized");
    },
  };
  assert.equal(resolveQoderAuthToken(credentials), "sk-http-fixture");
  assert.equal(qoderSupportsCallerTools(credentials), true);
  assert.equal(qoderSupportsCallerTools({ accessToken: " pt-oauth-fixture " }), false);
  assert.equal(qoderSupportsCallerTools({ refreshToken: "pt-refresh-fixture" }), false);
  assert.equal(hasQoderCallerTools({ functions: [{ name: "lookup" }] }), true);
  assert.equal(hasQoderCallerTools({ tools: [] }), false);
});

test("agent-required selection excludes PAT while plain chat retains the same account", async () => {
  await deleteProviderConnectionsByProvider("qoder");
  const pat = await createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name: "PAT",
    apiKey: "pt-fixture",
    isActive: true,
    providerSpecificData: { authMode: "pat", transport: "qodercli" },
  });
  const plain = await getProviderCredentials("qoder", null, [pat.id], "qwen3.8-max-preview");
  assert.equal(plain?.connectionId, pat.id);
  const tools = await getProviderCredentials("qoder", null, [pat.id], "qwen3.8-max-preview", {
    requireToolCalling: true,
  });
  assert.equal(tools, null);
});

test("agent-required selection retains an HTTP key in a mixed PAT/HTTP pool", async () => {
  await deleteProviderConnectionsByProvider("qoder");
  await createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name: "PAT first",
    apiKey: "pt-fixture",
    isActive: true,
    priority: 1,
  });
  const http = await createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name: "HTTP",
    apiKey: "sk-fixture-http",
    isActive: true,
    priority: 2,
  });
  const selected = await getProviderCredentials("qoder", null, null, "qwen3.8-max-preview", {
    requireToolCalling: true,
  });
  assert.equal(selected?.connectionId, http.id);
});

test("a PAT cooldown cannot make a tool request wait for an incompatible connection", async () => {
  await deleteProviderConnectionsByProvider("qoder");
  const pat = await createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name: "Cooling PAT",
    apiKey: "pt-cooling-fixture",
    isActive: true,
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
  });
  const selected = await getProviderCredentials("qoder", null, [pat.id], "qwen3.8-max-preview", {
    requireToolCalling: true,
  });
  assert.equal(selected, null);
});

test("PAT executor rejects caller tools before launching the local CLI", async () => {
  const previous = process.env.CLI_QODER_BIN;
  process.env.CLI_QODER_BIN = path.join(dataDir, "missing-qodercli");
  try {
    const { response } = await new QoderExecutor().execute({
      model: "qwen3.8-max-preview",
      stream: false,
      credentials: { apiKey: "pt-fixture" },
      body: {
        messages: [{ role: "user", content: "Call lookup" }],
        tools: [{ type: "function", function: { name: "lookup", parameters: { type: "object" } } }],
      },
    });
    assert.equal(response.status, 400);
    const payload = await response.json();
    assert.equal(payload.error.code, "tool_calling_unsupported");
    assert.match(payload.error.message, /PAT.*tool/i);
    assert.doesNotMatch(payload.error.message, /pt-fixture/);
  } finally {
    if (previous === undefined) delete process.env.CLI_QODER_BIN;
    else process.env.CLI_QODER_BIN = previous;
  }
});

test("agent combo skips a pinned PAT leg without spawning CLI and reaches its tool-capable fallback", async () => {
  const { createCombo } = await import("../../src/lib/db/combos.ts");
  const { handleChat } = await import("../../src/sse/handlers/chat.ts");
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  await deleteProviderConnectionsByProvider("qoder");
  const pat = await createProviderConnection({
    provider: "qoder",
    authType: "apikey",
    name: "Pinned PAT",
    apiKey: "pt-fixture",
    isActive: true,
  });
  await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Fallback",
    apiKey: "sk-fixture-fallback",
    isActive: true,
  });
  await createCombo({
    name: "qoder-pat-agent-fixture",
    strategy: "priority",
    models: [
      { model: "qwen3.8-max-preview", provider: "qoder", connectionId: pat.id },
      "openai/gpt-4.1",
    ],
  });
  const previousFetch = globalThis.fetch;
  const previousBin = process.env.CLI_QODER_BIN;
  const marker = path.join(dataDir, "cli-was-spawned");
  const stub = path.join(dataDir, "qodercli");
  fs.writeFileSync(
    stub,
    '#!/bin/sh\ncat >/dev/null\ntouch "$QODER_TEST_MARKER"\nprintf \'%s\\n\' \'{"type":"result","is_error":false,"result":"plain text"}\'\n',
    { mode: 0o755 }
  );
  process.env.CLI_QODER_BIN = stub;
  process.env.QODER_TEST_MARKER = marker;
  let dispatchedTools = false;
  globalThis.fetch = async (input, init) => {
    assert.match(String(input), /api\.openai\.com/);
    dispatchedTools = Array.isArray(JSON.parse(String(init?.body)).tools);
    return Response.json({
      id: "chatcmpl-fixture",
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call-fixture",
                type: "function",
                function: { name: "lookup", arguments: "{}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    });
  };
  try {
    const response = await handleChat(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qoder-pat-agent-fixture",
          stream: false,
          messages: [{ role: "user", content: "Call lookup" }],
          tools: [
            { type: "function", function: { name: "lookup", parameters: { type: "object" } } },
          ],
        }),
      })
    );
    const payload = await response.json();
    assert.equal(response.status, 200, JSON.stringify(payload));
    assert.equal(dispatchedTools, true);
    assert.equal(payload.choices[0].message.tool_calls[0].function.name, "lookup");
    assert.equal(fs.existsSync(marker), false);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBin === undefined) delete process.env.CLI_QODER_BIN;
    else process.env.CLI_QODER_BIN = previousBin;
    delete process.env.QODER_TEST_MARKER;
    flushProxyLogsSync();
  }
});
