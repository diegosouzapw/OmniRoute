import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { writeFileSync } from "node:fs";

const isolatedRoot = path.join(process.cwd(), ".sandbox", "direct-acp-test");
process.env.HOME = path.join(isolatedRoot, "home");
process.env.DATA_DIR = path.join(isolatedRoot, "data");
process.env.SQLITE_FILE = path.join(isolatedRoot, "data", "storage.sqlite");
process.env.DEVIN_AGENTIC_HOME = process.env.HOME;
fs.mkdirSync(process.env.HOME, { recursive: true });
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });

const { assertLocalAcpUrl, buildDevinChildEnv, DevinCliAgenticExecutor } =
  await import("../../open-sse/executors/devin-cli-agentic.ts");
const { devin_cli_agenticProvider } =
  await import("../../open-sse/config/providers/registry/devin-cli-agentic/index.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

async function readResponseText(response: Response) {
  return await response.text();
}

function sandboxTmp(prefix: string) {
  const root = path.join(process.cwd(), ".sandbox", "unit-processes");
  fs.mkdirSync(root, { recursive: true });
  return fs.mkdtempSync(path.join(root, prefix));
}

test("Devin child environment is allowlisted and requires an isolated home", () => {
  const isolatedHome = path.join(process.cwd(), ".sandbox", "unit-home");
  const env = buildDevinChildEnv(
    { apiKey: "devin-test" },
    {
      HOME: "/Users/example",
      PATH: "/usr/bin:/bin",
      ANTHROPIC_AUTH_TOKEN: "must-not-leak",
      AWS_ACCESS_KEY_ID: "must-not-leak",
      GITHUB_TOKEN: "must-not-leak",
      DEVIN_AGENTIC_HOME: isolatedHome,
      DEVIN_BRIDGE_MOCK_LOG: "/evidence/mock-acp.jsonl",
    }
  );

  assert.equal(env.HOME, isolatedHome);
  assert.equal(env.PATH, "/usr/bin:/bin");
  assert.equal(env.WINDSURF_API_KEY, undefined);
  assert.equal(env.ANTHROPIC_AUTH_TOKEN, undefined);
  assert.equal(env.AWS_ACCESS_KEY_ID, undefined);
  assert.equal(env.GITHUB_TOKEN, undefined);
  assert.equal(env.DEVIN_BRIDGE_MOCK_LOG, "/evidence/mock-acp.jsonl");
  assert.equal(
    buildDevinChildEnv(
      {},
      {
        PATH: "/usr/bin",
        DEVIN_AGENTIC_HOME: isolatedHome,
        DEVIN_BRIDGE_MOCK_LOG: "/tmp/unsafe.jsonl",
      }
    ).DEVIN_BRIDGE_MOCK_LOG,
    undefined
  );
  assert.throws(
    () => buildDevinChildEnv({}, { PATH: "/usr/bin", DEVIN_AGENTIC_HOME: "/tmp/outside" }),
    /inside the bridge sandbox/
  );
});

test("Devin child environment derives only the trusted bridge proxy", () => {
  const isolatedHome = path.join(process.cwd(), ".sandbox", "unit-home");
  const trustedProxy = "http://network-guard:8080";
  const trusted = buildDevinChildEnv(
    {},
    {
      DEVIN_AGENTIC_HOME: isolatedHome,
      DEVIN_BRIDGE_PROXY_URL: trustedProxy,
      HTTP_PROXY: "http://user:password@host-proxy.example:3128",
      HTTPS_PROXY: "http://user:password@host-proxy.example:3128",
      ALL_PROXY: "socks5://host-proxy.example:1080",
      NO_PROXY: "metadata.internal",
    }
  );

  assert.equal(trusted.HTTP_PROXY, trustedProxy);
  assert.equal(trusted.HTTPS_PROXY, trustedProxy);
  assert.equal(trusted.ALL_PROXY, undefined);
  assert.equal(trusted.NO_PROXY, undefined);
  assert.equal(trusted.DEVIN_BRIDGE_PROXY_URL, undefined);

  const untrusted = buildDevinChildEnv(
    {},
    {
      DEVIN_AGENTIC_HOME: isolatedHome,
      DEVIN_BRIDGE_PROXY_URL: "http://user:password@network-guard:8080",
      HTTP_PROXY: "http://host-proxy.example:3128",
      HTTPS_PROXY: "http://host-proxy.example:3128",
    }
  );
  assert.equal(untrusted.HTTP_PROXY, undefined);
  assert.equal(untrusted.HTTPS_PROXY, undefined);
});

test("Devin agentic upstream is fixed to local ACP stdio", () => {
  assert.doesNotThrow(() => assertLocalAcpUrl("devin://acp/stdio"));
  assert.throws(() => assertLocalAcpUrl("https://api.anthropic.com"), /ACP stdio/);
  assert.throws(() => assertLocalAcpUrl("http://localhost:9999"), /ACP stdio/);
});

test("Devin agentic provider delegates auth only to the isolated CLI", () => {
  assert.equal(devin_cli_agenticProvider.authType, "none");
  assert.equal(devin_cli_agenticProvider.baseUrl, "devin://acp/stdio");
  assert.equal(devin_cli_agenticProvider.baseUrls, undefined);
});

test("Devin agentic provider resolves synthetic no-auth credentials without a DB row", async () => {
  const credentials = await getProviderCredentials("devin-cli-agentic");
  assert.equal(credentials?.connectionId, "noauth");
  assert.equal(credentials?.apiKey, null);
});

function writeMockDevin(tmpDir: string, responseText: string) {
  const framesFile = path.join(tmpDir, "frames.json");
  const argsFile = path.join(tmpDir, "args.json");
  const scriptFile = path.join(tmpDir, "mock-devin.cjs");
  const script = `#!/usr/bin/env node
const fs = require("fs");
const readline = require("readline");
const frames = [];
fs.writeFileSync(${JSON.stringify(argsFile)}, JSON.stringify(process.argv.slice(2)));
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
  if (!line.trim()) return;
  const msg = JSON.parse(line);
  frames.push(msg);
  fs.writeFileSync(${JSON.stringify(framesFile)}, JSON.stringify(frames, null, 2));
  if (msg.method === "initialize") {
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } }) + "\\n");
  } else if (msg.method === "session/new") {
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: {
      sessionId: "sess_agentic",
      modes: { currentModeId: "accept-edits", availableModes: [{ id: "accept-edits" }, { id: "ask" }] }
    } }) + "\\n");
  } else if (msg.method === "session/set_config_option") {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0",
      id: msg.id,
      result: { configOptions: [{ id: "mode", currentValue: "ask" }] }
    }) + "\\n");
  } else if (msg.method === "session/set_mode") {
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: {} }) + "\\n");
  } else if (msg.method === "session/prompt") {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0",
      method: "session/update",
      params: { update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: ${JSON.stringify(responseText)} } } }
    }) + "\\n");
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: { stopReason: "end_turn" } }) + "\\n");
  }
});
`;
  writeFileSync(scriptFile, script, { mode: 0o755 });
  return { scriptFile, framesFile, argsFile };
}

function writeScenarioMock(tmpDir: string, body: string) {
  const scriptFile = path.join(tmpDir, "mock-devin.cjs");
  writeFileSync(
    scriptFile,
    `#!/usr/bin/env node
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });
const send = (value) => process.stdout.write(JSON.stringify(value) + "\\n");
const safeModes = { currentModeId: "accept-edits", availableModes: [{ id: "accept-edits" }, { id: "ask" }] };
const sendSession = (msg, sessionId) => send({ jsonrpc: "2.0", id: msg.id, result: { sessionId, modes: safeModes } });
const acceptAskMode = (msg) => {
  if (msg.method === "session/set_mode") {
    send({ jsonrpc: "2.0", id: msg.id, result: {} });
    return true;
  }
  if (msg.method !== "session/set_config_option") return false;
  if (msg.params?.configId !== "mode" || msg.params?.type !== "id" || msg.params?.value !== "ask") {
    send({ jsonrpc: "2.0", id: msg.id, error: { code: -32602, message: "unsafe mode" } });
  } else {
    send({ jsonrpc: "2.0", id: msg.id, result: { configOptions: [{ id: "mode", currentValue: "ask" }] } });
  }
  return true;
};
${body}
`,
    { mode: 0o755 }
  );
  return scriptFile;
}

async function executeTextRequest(scriptFile: string, signal?: AbortSignal) {
  const oldBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  process.env.CLI_DEVIN_AGENTIC_BIN = scriptFile;
  try {
    return await new DevinCliAgenticExecutor().execute({
      model: "swe-1-7",
      stream: false,
      credentials: {},
      signal,
      body: { messages: [{ role: "user", content: "Say hello" }] },
    });
  } finally {
    if (oldBin === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
    else process.env.CLI_DEVIN_AGENTIC_BIN = oldBin;
  }
}

test("DevinCliAgenticExecutor returns Anthropic tool_use JSON and sends ACP frames", async () => {
  const tmpDir = sandboxTmp("devin-agentic-");
  const oldBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  const { scriptFile, framesFile, argsFile } = writeMockDevin(
    tmpDir,
    '<tool>{"name":"Read","arguments":{"file_path":"src/index.ts"}}</tool>'
  );
  process.env.CLI_DEVIN_AGENTIC_BIN = scriptFile;

  try {
    const executor = new DevinCliAgenticExecutor();
    const result = await executor.execute({
      model: "swe-1-7",
      stream: false,
      credentials: { apiKey: "devin-test" },
      body: {
        messages: [{ role: "user", content: [{ type: "text", text: "Read src/index.ts" }] }],
        tools: [
          {
            name: "Read",
            input_schema: {
              type: "object",
              required: ["file_path"],
              properties: { file_path: { type: "string" } },
              additionalProperties: false,
            },
          },
        ],
      },
    });

    assert.equal(result.response.status, 200, await result.response.clone().text());
    const json = JSON.parse(await readResponseText(result.response));
    assert.equal(json.stop_reason, "tool_use");
    assert.equal(json.content[0].type, "tool_use");
    assert.equal(json.content[0].name, "Read");
    assert.deepEqual(json.content[0].input, { file_path: "src/index.ts" });

    const frames = JSON.parse(fs.readFileSync(framesFile, "utf8"));
    assert.ok(frames.some((frame: { method?: string }) => frame.method === "initialize"));
    assert.ok(frames.some((frame: { method?: string }) => frame.method === "session/new"));
    assert.ok(
      !frames.some((frame: { method?: string }) => frame.method === "session/set_config_option")
    );
    assert.ok(frames.some((frame: { method?: string }) => frame.method === "session/prompt"));
    const initialize = frames.find((frame: { method?: string }) => frame.method === "initialize");
    assert.equal(initialize.params.protocolVersion, 1);
    assert.deepEqual(initialize.params.clientCapabilities, {});
    const prompt = frames.find((frame: { method?: string }) => frame.method === "session/prompt");
    const promptText = prompt.params.prompt[0].text;
    assert.match(promptText, /Devin Summarizer Bridge/);
    assert.match(promptText, /execution trace/i);
    assert.match(promptText, /client workspace is \/workspace/i);
    assert.match(promptText, /Read src\/index\.ts/);
    assert.deepEqual(JSON.parse(fs.readFileSync(argsFile, "utf8")), [
      "acp",
      "--agent-type",
      "summarizer",
    ]);
  } finally {
    if (oldBin === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
    else process.env.CLI_DEVIN_AGENTIC_BIN = oldBin;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("no-tools summarizer does not depend on mutable ACP permission modes", async () => {
  const tmpDir = sandboxTmp("devin-agentic-no-ask-mode-");
  const scriptFile = writeScenarioMock(
    tmpDir,
    `rl.on("line", (line) => {
  const msg = JSON.parse(line);
  if (msg.method === "initialize") send({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } });
  if (msg.method === "session/new") send({
    jsonrpc: "2.0",
    id: msg.id,
    result: {
      sessionId: "no-ask",
      modes: { currentModeId: "accept-edits", availableModes: [{ id: "accept-edits", name: "Code" }] }
    }
  });
  if (msg.method === "session/prompt") {
    send({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "no-ask", update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: "unsafe" } } } });
    send({ jsonrpc: "2.0", id: msg.id, result: { stopReason: "end_turn" } });
  }
});`
  );
  try {
    const result = await executeTextRequest(scriptFile);
    assert.equal(result.response.status, 200);
    const body = JSON.parse(await result.response.text());
    assert.equal(body.content[0].text, "unsafe");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("ACP client fails closed when session/new omits the session id", async () => {
  const tmpDir = sandboxTmp("devin-agentic-unconfirmed-ask-mode-");
  const scriptFile = writeScenarioMock(
    tmpDir,
    `rl.on("line", (line) => {
  const msg = JSON.parse(line);
  if (msg.method === "initialize") send({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } });
  if (msg.method === "session/new") send({ jsonrpc: "2.0", id: msg.id, result: {} });
});`
  );
  try {
    const result = await executeTextRequest(scriptFile);
    assert.equal(result.response.status, 502);
    const body = JSON.parse(await result.response.text());
    assert.equal(body.error.code, "missing_session_id");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("DevinCliAgenticExecutor returns Anthropic SSE for streaming Claude clients", async () => {
  const tmpDir = sandboxTmp("devin-agentic-sse-");
  const oldBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  const { scriptFile } = writeMockDevin(tmpDir, "Done");
  process.env.CLI_DEVIN_AGENTIC_BIN = scriptFile;

  try {
    const executor = new DevinCliAgenticExecutor();
    const result = await executor.execute({
      model: "swe-1-7",
      stream: true,
      credentials: {},
      body: { messages: [{ role: "user", content: [{ type: "text", text: "Say done" }] }] },
    });

    assert.equal(result.response.status, 200, await result.response.clone().text());
    const sse = await readResponseText(result.response);
    assert.match(sse, /event: message_start/);
    assert.match(sse, /event: content_block_delta/);
    assert.match(sse, /Done/);
    assert.match(sse, /event: message_stop/);
  } finally {
    if (oldBin === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
    else process.env.CLI_DEVIN_AGENTIC_BIN = oldBin;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("ACP client handles fragmented frames, multiple chunks, and stderr", async () => {
  const tmpDir = sandboxTmp("devin-agentic-fragmented-");
  const scriptFile = writeScenarioMock(
    tmpDir,
    `rl.on("line", (line) => {
  const msg = JSON.parse(line);
  if (acceptAskMode(msg)) return;
  if (msg.method === "initialize") send({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } });
  if (msg.method === "session/new") sendSession(msg, "fragmented");
  if (msg.method === "session/prompt") {
    process.stderr.write("bounded diagnostic\\n");
    const first = JSON.stringify({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "fragmented", update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: "Hel" } } } });
    process.stdout.write(first.slice(0, 13));
    setTimeout(() => {
      process.stdout.write(first.slice(13) + "\\n");
      send({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "fragmented", update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: "lo" } } } });
      send({ jsonrpc: "2.0", id: msg.id, result: { stopReason: "end_turn" } });
    }, 10);
  }
});`
  );
  try {
    const result = await executeTextRequest(scriptFile);
    assert.equal(result.response.status, 200, await result.response.clone().text());
    const body = JSON.parse(await result.response.text());
    assert.equal(body.content[0].text, "Hello");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("ACP client fails closed when Devin attempts an internal tool call", async () => {
  const tmpDir = sandboxTmp("devin-agentic-internal-tool-");
  const scriptFile = writeScenarioMock(
    tmpDir,
    `rl.on("line", (line) => {
  const msg = JSON.parse(line);
  if (acceptAskMode(msg)) return;
  if (msg.method === "initialize") send({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } });
  if (msg.method === "session/new") sendSession(msg, "internal-tool");
  if (msg.method === "session/prompt") {
    send({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "internal-tool", update: { sessionUpdate: "tool_call", toolCallId: "internal-1", title: "Read a.ts" } } });
    send({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "internal-tool", update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: "Done" } } } });
    send({ jsonrpc: "2.0", id: msg.id, result: { stopReason: "end_turn" } });
  }
});`
  );
  try {
    const result = await executeTextRequest(scriptFile);
    assert.equal(result.response.status, 502);
    const body = JSON.parse(await result.response.text());
    assert.equal(body.error.code, "devin_internal_tool_execution");
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("ACP client fails closed on protocol errors and early exit", async () => {
  const cases = [
    {
      name: "invalid-frame",
      code: "invalid_acp_frame",
      body: `rl.on("line", () => process.stdout.write("not-json\\n"));`,
    },
    {
      name: "rpc-error",
      code: "acp_error",
      body: `rl.on("line", (line) => { const msg = JSON.parse(line); send({ jsonrpc: "2.0", id: msg.id, error: { code: -32602, message: "bad request" } }); });`,
    },
    {
      name: "early-exit",
      code: "acp_early_exit",
      body: `rl.on("line", () => process.exit(7));`,
    },
  ];

  for (const scenario of cases) {
    const tmpDir = sandboxTmp(`devin-agentic-${scenario.name}-`);
    try {
      const result = await executeTextRequest(writeScenarioMock(tmpDir, scenario.body));
      assert.equal(result.response.status, 502, scenario.name);
      const body = JSON.parse(await result.response.text());
      assert.equal(body.error.code, scenario.code, scenario.name);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  }
});

test("ACP client times out, cancels, and terminates a stuck process", async () => {
  const tmpDir = sandboxTmp("devin-agentic-stuck-");
  const scriptFile = writeScenarioMock(tmpDir, `rl.on("line", () => {});`);
  const oldTimeout = process.env.DEVIN_AGENTIC_ACP_TIMEOUT_MS;
  try {
    process.env.DEVIN_AGENTIC_ACP_TIMEOUT_MS = "80";
    const timeoutResult = await executeTextRequest(scriptFile);
    assert.equal(timeoutResult.response.status, 504);
    assert.equal(JSON.parse(await timeoutResult.response.text()).error.code, "acp_timeout");

    process.env.DEVIN_AGENTIC_ACP_TIMEOUT_MS = "1000";
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 30);
    const cancelled = await executeTextRequest(scriptFile, controller.signal);
    assert.equal(cancelled.response.status, 499);
    assert.equal(JSON.parse(await cancelled.response.text()).error.code, "acp_cancelled");
  } finally {
    if (oldTimeout === undefined) delete process.env.DEVIN_AGENTIC_ACP_TIMEOUT_MS;
    else process.env.DEVIN_AGENTIC_ACP_TIMEOUT_MS = oldTimeout;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("premature tool narration is repaired once into a validated tool_use", async () => {
  const tmpDir = sandboxTmp("devin-agentic-repair-");
  const stateFile = path.join(tmpDir, "spawn-count");
  const scriptFile = writeScenarioMock(
    tmpDir,
    `const fs = require("fs");
const stateFile = ${JSON.stringify(stateFile)};
const count = Number(fs.existsSync(stateFile) ? fs.readFileSync(stateFile, "utf8") : "0") + 1;
fs.writeFileSync(stateFile, String(count));
rl.on("line", (line) => {
  const msg = JSON.parse(line);
  if (acceptAskMode(msg)) return;
  if (msg.method === "initialize") send({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } });
  if (msg.method === "session/new") sendSession(msg, "repair");
  if (msg.method === "session/prompt") {
    const text = count === 1
      ? '<summary>Current State: inspected math.js. The immediate next step was to read math.test.js, then fix the bug and run npm test.</summary>'
      : '<tool>{"name":"Read","arguments":{"file_path":"a.ts"}}</tool>';
    send({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "repair", update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text } } } });
    send({ jsonrpc: "2.0", id: msg.id, result: { stopReason: "end_turn" } });
  }
});`
  );
  const oldBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  process.env.CLI_DEVIN_AGENTIC_BIN = scriptFile;
  try {
    const result = await new DevinCliAgenticExecutor().execute({
      model: "swe-1-7",
      stream: false,
      credentials: {},
      body: {
        tools: [
          {
            name: "Read",
            input_schema: {
              type: "object",
              required: ["file_path"],
              properties: { file_path: { type: "string" } },
            },
          },
        ],
        messages: [{ role: "user", content: "Read a.ts" }],
      },
    });
    assert.equal(result.response.status, 200, await result.response.clone().text());
    assert.equal(JSON.parse(await result.response.text()).stop_reason, "tool_use");
    assert.equal(fs.readFileSync(stateFile, "utf8"), "2");
  } finally {
    if (oldBin === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
    else process.env.CLI_DEVIN_AGENTIC_BIN = oldBin;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("premature tool narration fails closed when the single repair is still narrative", async () => {
  const tmpDir = sandboxTmp("devin-agentic-repair-narrative-");
  const stateFile = path.join(tmpDir, "spawn-count");
  const scriptFile = writeScenarioMock(
    tmpDir,
    `const fs = require("fs");
const stateFile = ${JSON.stringify(stateFile)};
const count = Number(fs.existsSync(stateFile) ? fs.readFileSync(stateFile, "utf8") : "0") + 1;
fs.writeFileSync(stateFile, String(count));
rl.on("line", (line) => {
  const msg = JSON.parse(line);
  if (acceptAskMode(msg)) return;
  if (msg.method === "initialize") send({ jsonrpc: "2.0", id: msg.id, result: { protocolVersion: 1 } });
  if (msg.method === "session/new") sendSession(msg, "repair-narrative");
  if (msg.method === "session/prompt") {
    const text = count === 1
      ? "I'll start by reading the file."
      : "I'll read the file now, then run the tests.";
    send({ jsonrpc: "2.0", method: "session/update", params: { sessionId: "repair-narrative", update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text } } } });
    send({ jsonrpc: "2.0", id: msg.id, result: { stopReason: "end_turn" } });
  }
});`
  );
  const oldBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  process.env.CLI_DEVIN_AGENTIC_BIN = scriptFile;
  try {
    const result = await new DevinCliAgenticExecutor().execute({
      model: "swe-1-7",
      stream: false,
      credentials: {},
      body: {
        tools: [
          {
            name: "Read",
            input_schema: {
              type: "object",
              required: ["file_path"],
              properties: { file_path: { type: "string" } },
            },
          },
        ],
        messages: [{ role: "user", content: "Read a.ts" }],
      },
    });
    assert.equal(result.response.status, 502);
    const body = JSON.parse(await result.response.text());
    assert.equal(body.error.code, "unexecuted_tool_intent");
    assert.equal(fs.readFileSync(stateFile, "utf8"), "2");
  } finally {
    if (oldBin === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
    else process.env.CLI_DEVIN_AGENTIC_BIN = oldBin;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
