import assert from "node:assert/strict";
import fs from "node:fs";
import { Socket } from "node:net";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mid-system-16127-"));
const previousEnv = {
  DATA_DIR: process.env.DATA_DIR,
  HOME: process.env.HOME,
  OMNIROUTE_PLUGINS_DIR: process.env.OMNIROUTE_PLUGINS_DIR,
};
process.env.DATA_DIR = path.join(testRoot, "data");
process.env.HOME = path.join(testRoot, "home");
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testRoot, "plugins");
for (const dir of [process.env.DATA_DIR, process.env.HOME, process.env.OMNIROUTE_PLUGINS_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

const originalFetch = globalThis.fetch;
const originalDispatcher = getGlobalDispatcher();
const mockAgent = new MockAgent();
mockAgent.disableNetConnect();
setGlobalDispatcher(mockAgent);
mock.method(Socket.prototype, "connect", () => {
  throw new Error("Unexpected socket connection in #16127 regression");
});
globalThis.fetch = async () => {
  throw new Error("Unexpected fetch before #16127 transport fixture");
};

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { waitForCallLogSaves, closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

type Message = { role: string; content: string | Record<string, unknown>[] };
type CapturedBody = {
  model: string;
  system: Record<string, unknown>[];
  tools: Record<string, unknown>[];
  messages: Message[];
};

const USER_AGENT = "claude-code/2.1.295";
const INSTRUCTION = "Keep the next answer concise for turn";
const log = { debug() {}, info() {}, warn() {}, error() {} };

function stableSystemPrefix(blocks: Record<string, unknown>[]) {
  // BaseExecutor signs the serialized body with a changing five-digit CCH token.
  // Compare every other byte, including the billing version and all cached blocks.
  const [billing, ...rest] = blocks;
  assert.equal(typeof billing.text, "string");
  const text = String(billing.text);
  assert.ok(text.startsWith("x-anthropic-billing-header:"));
  assert.match(text, /; cch=[a-f0-9]{5};$/);
  return [
    { ...billing, text: text.replace(/; cch=[a-f0-9]{5};$/, "; cch=<body checksum>;") },
    ...rest,
  ];
}

test.after(async () => {
  assert.ok(await waitForCallLogSaves(30_000), "call-log writes should finish before cleanup");
  await closeCallLogSaves(2_000);
  core.resetDbInstance();
  globalThis.fetch = originalFetch;
  setGlobalDispatcher(originalDispatcher);
  await mockAgent.close();
  mock.restoreAll();
  for (const [key, value] of Object.entries(previousEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const [model, supportsMidSystem] of [
  ["claude-fable-5-1", true],
  ["claude-opus-5", true],
  ["claude-sonnet-5-5", true],
  ["claude-haiku-5-5", true],
  ["claude-sonnet-5", false],
  ["claude-sonnet-4-6", false],
  ["claude-haiku-4-5", false],
] as const) {
  test(`${model}: appended system instructions respect upstream model support (#16127)`, async () => {
    const captured: CapturedBody[] = [];
    globalThis.fetch = async (input, init) => {
      const url = new URL(input instanceof Request ? input.url : String(input));
      assert.equal(url.origin, "https://api.anthropic.com");
      assert.equal(url.pathname, "/v1/messages");
      assert.equal(init?.method, "POST");
      assert.equal(typeof init.body, "string");
      captured.push(JSON.parse(String(init.body)) as CapturedBody);
      return Response.json({
        id: `msg_16127_${captured.length}`,
        type: "message",
        role: "assistant",
        model,
        content: [{ type: "text", text: "OK" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 40, output_tokens: 1 },
      });
    };

    const system = [
      { type: "text", text: "You are a careful assistant.", cache_control: { type: "ephemeral" } },
    ];
    const tools = [
      {
        name: "Read",
        description: "Read a file",
        input_schema: { type: "object", properties: {} },
      },
    ];
    const messages: Message[] = [{ role: "user", content: "Read the files one at a time." }];
    const headers = new Headers({
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": USER_AGENT,
    });

    for (let turn = 1; turn <= 3; turn++) {
      messages.push(
        {
          role: "assistant",
          content: [{ type: "tool_use", id: `tool_${turn}`, name: "Read", input: {} }],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: `tool_${turn}`, content: `File ${turn}` }],
        },
        { role: "system", content: `${INSTRUCTION} ${turn}.` },
        { role: "user", content: `Continue after file ${turn}.` }
      );
      const body = { model, max_tokens: 64, stream: false, system, tools, messages };
      const result = await handleChatCore({
        body: structuredClone(body),
        modelInfo: { provider: "claude", model, extendedContext: false },
        credentials: { apiKey: "synthetic-key-16127", providerSpecificData: {} },
        log,
        clientRawRequest: { endpoint: "/v1/messages", body: structuredClone(body), headers },
        userAgent: USER_AGENT,
        connectionId: null,
        onCredentialsRefreshed() {},
        onRequestSuccess() {},
        onStreamFailure() {},
        onDisconnect() {},
        comboName: null,
      });
      assert.equal(result.success, true);
      await result.response.text();
      assert.equal(captured.length, turn, "each turn should produce exactly one upstream POST");
    }

    for (const [index, upstream] of captured.entries()) {
      const turn = index + 1;
      assert.equal(upstream.model, model);
      assert.equal(
        JSON.stringify(upstream.system).includes(INSTRUCTION),
        !supportsMidSystem,
        "only legacy models should hoist appended instructions into the top-level system prefix"
      );
      assert.deepEqual(upstream.tools, captured[0].tools, "the tool prefix stays stable");
      if (!supportsMidSystem) {
        assert.ok(upstream.messages.every((message) => message.role !== "system"));
        for (let earlier = 1; earlier <= turn; earlier++) {
          assert.ok(JSON.stringify(upstream.system).includes(`${INSTRUCTION} ${earlier}.`));
        }
        continue;
      }
      assert.deepEqual(
        stableSystemPrefix(upstream.system),
        stableSystemPrefix(captured[0].system),
        "the system prefix stays stable except for the request-body checksum"
      );
      assert.ok(
        upstream.system.some(
          (block) => block.text === system[0].text && block.cache_control != null
        ),
        "the original cached system block survives"
      );
      assert.deepEqual(
        upstream.messages.map((message) => message.role),
        [
          "user",
          ...Array.from({ length: turn }, () => ["assistant", "user", "system", "user"]).flat(),
        ]
      );
      for (let earlier = 1; earlier <= turn; earlier++) {
        assert.deepEqual(upstream.messages[earlier * 4 - 1], {
          role: "system",
          content: `${INSTRUCTION} ${earlier}.`,
        });
      }
    }
  });
}
