import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  hasNativeCodexTurnBinding,
  isCodexOriginatedHeaders,
  isVerifiedNativeCodexRequest,
} from "../../open-sse/config/codexIdentity.ts";
import { chatgpt_web_codexProvider } from "../../open-sse/config/providers/registry/chatgpt-web-codex/index.ts";
import {
  decodeChatGptWebCodexSecrets,
  encodeChatGptWebCodexSecrets,
} from "../../open-sse/executors/chatgpt-web-codex/credentials.ts";
import {
  reasoningEffortOf,
  requireChatGptWebCodexRoute,
} from "../../open-sse/executors/chatgpt-web-codex/models.ts";
import {
  parseTunnelChecksum,
  parseTunnelRuntimeStatus,
} from "../../open-sse/executors/chatgpt-web-codex/tunnelClient.ts";
import {
  callTurnBroker,
  TurnBroker,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/turn-broker.ts";
import {
  CHATGPT_INLINE_CONTEXT_MAX_CHARS,
  compileChatGptWebPrompt,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/prompt.ts";
import type { CodexParsedRequest } from "../../open-sse/vendor/codex-chatgpt-web/types.ts";

test("registers the additive ChatGPT Web Codex provider and five fixed routes", () => {
  assert.equal(chatgpt_web_codexProvider.id, "chatgpt-web-codex");
  assert.deepEqual(
    chatgpt_web_codexProvider.models?.map((model) => model.id),
    ["instant", "medium", "high", "extra-high", "pro"]
  );
  assert.deepEqual(
    ["instant", "medium", "high", "extra-high", "pro"].map(
      (model) => requireChatGptWebCodexRoute(model).effort
    ),
    ["low", "medium", "high", "xhigh", "max"]
  );
  assert.equal(requireChatGptWebCodexRoute("pro").pro, true);
});

test("explicit Responses reasoning effort is read for mismatch preflight", () => {
  assert.equal(reasoningEffortOf({ reasoning: { effort: "high" } }), "high");
  assert.equal(reasoningEffortOf({ reasoning_effort: "xhigh" }), "xhigh");
});

test("Codex detection requires originator or Codex User-Agent", () => {
  assert.equal(isCodexOriginatedHeaders({ originator: "codex_cli_rs" }), true);
  assert.equal(isCodexOriginatedHeaders({ "user-agent": "codex_app/1.0" }), true);
  assert.equal(isCodexOriginatedHeaders({ "user-agent": "openai-node/4" }), false);
});

test("native ChatGPT Web Codex detection also requires thread and turn identity", () => {
  const headers = { originator: "codex_cli_rs" };
  const body = {
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({
        thread_id: "thread-1",
        turn_id: "turn-1",
      }),
    },
  };
  assert.equal(hasNativeCodexTurnBinding(body), true);
  assert.equal(isVerifiedNativeCodexRequest(body, headers), true);
  assert.equal(isVerifiedNativeCodexRequest({}, headers), false);
  assert.equal(isVerifiedNativeCodexRequest(body, { "user-agent": "openai-node/4" }), false);
  assert.equal(
    hasNativeCodexTurnBinding({
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({ turn_id: "turn-1" }),
      },
    }),
    false
  );
});

test("version two credentials contain storage state but not the raw Cookie", () => {
  const encoded = encodeChatGptWebCodexSecrets({
    storageState: { cookies: [{ name: "session", value: "secret" }], origins: [] },
    runtimeKey: "runtime-secret",
  });
  const parsed = JSON.parse(encoded) as Record<string, unknown>;
  assert.equal(parsed.version, 2);
  assert.equal("cookie" in parsed, false);
  assert.deepEqual(decodeChatGptWebCodexSecrets(encoded).storageState, parsed.storageState);
});

test("legacy Cookie credentials remain decodable for one-time validation", () => {
  assert.equal(
    decodeChatGptWebCodexSecrets(
      JSON.stringify({ version: 1, cookie: "Cookie: session=value", runtimeKey: "key" })
    ).cookie,
    "session=value"
  );
});

test("tunnel status is ready only when the process is running and healthy", () => {
  const ready = parseTunnelRuntimeStatus(
    JSON.stringify({ process_running: true, healthy: true, ready: true, runtime_state: "ready" })
  );
  assert.equal(ready.ok, true);
  assert.equal(
    parseTunnelRuntimeStatus(JSON.stringify({ process_running: false, healthy: true, ready: true }))
      .ok,
    false
  );
});

test("tunnel checksum parsing is pinned to the exact release asset", () => {
  const checksum = "a".repeat(64);
  assert.equal(
    parseTunnelChecksum(`${checksum}  tunnel-client.zip\n`, "tunnel-client.zip"),
    checksum
  );
  assert.throws(
    () => parseTunnelChecksum(`${checksum}  another.zip\n`, "tunnel-client.zip"),
    /no valid entry/
  );
});

test("turn broker holds a tool invocation and rejects wrong or duplicate results", async () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-cgw-broker-"));
  const socketPath = join(root, "runtime", "turn-broker.sock");
  const broker = TurnBroker.forSocket(socketPath);
  try {
    const token = await broker.register(
      {
        cwd: root,
        roots: [root],
        writableRoots: [root],
        sandboxPolicy: { type: "dangerFullAccess" },
        tools: [
          {
            name: "exec_command",
            description: "Run a command",
            parameters: { type: "object" },
          },
        ],
      },
      10_000
    );
    const claim = await callTurnBroker<{ bindingId: string }>(socketPath, {
      method: "claim",
      token,
    });
    const invocation = callTurnBroker<{ content: unknown[] }>(
      socketPath,
      {
        method: "invoke",
        bindingId: claim.bindingId,
        wireName: "exec_command",
        arguments: { cmd: "pwd" },
      },
      10_000
    );
    const [request] = await broker.nextToolBatch(token);
    assert.ok(request);
    assert.throws(() => broker.completeTool(token, "unknown-call", { content: [] }), /not pending/);
    broker.completeTool(token, request.callId, { content: [{ type: "text", text: root }] });
    assert.deepEqual(await invocation, { content: [{ type: "text", text: root }] });
    assert.throws(() => broker.completeTool(token, request.callId, { content: [] }), /not pending/);
  } finally {
    await broker.close();
    rmSync(root, { recursive: true, force: true });
  }
});

test("revoking a turn rejects a pending connector invocation", async () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-cgw-revoke-"));
  const socketPath = join(root, "runtime", "turn-broker.sock");
  const broker = TurnBroker.forSocket(socketPath);
  try {
    const token = await broker.register(
      {
        cwd: root,
        roots: [root],
        writableRoots: [root],
        sandboxPolicy: { type: "dangerFullAccess" },
        tools: [],
      },
      10_000
    );
    const claim = await callTurnBroker<{ bindingId: string }>(socketPath, {
      method: "claim",
      token,
    });
    const invocation = callTurnBroker(
      socketPath,
      {
        method: "invoke",
        bindingId: claim.bindingId,
        wireName: "exec_command",
        arguments: { cmd: "sleep 30" },
      },
      10_000
    );
    await broker.nextToolBatch(token);
    broker.revoke(token);
    await assert.rejects(invocation, /revoked/);
  } finally {
    await broker.close();
    rmSync(root, { recursive: true, force: true });
  }
});

function requestWithText(text: string): CodexParsedRequest {
  return {
    modelId: "gpt-5.6-sol",
    context: {
      messages: [{ role: "user", content: text, timestamp: 1 }],
    },
    stream: true,
    options: { reasoning: "high" },
  };
}

test("small contexts stay inline and large contexts become in-memory JSONL", () => {
  const capabilities = { localToolsEnabled: false, proAvailable: true };
  const small = compileChatGptWebPrompt(requestWithText("hello"), capabilities);
  assert.equal(small.contextAttachments.length, 0);
  assert.match(small.text, /<codex_context_json>/);

  const large = compileChatGptWebPrompt(
    requestWithText("x".repeat(CHATGPT_INLINE_CONTEXT_MAX_CHARS + 1)),
    capabilities
  );
  assert.equal(large.contextAttachments.length, 1);
  assert.equal(large.contextAttachments[0]?.mimeType, "application/x-ndjson");
  assert.match(large.contextAttachments[0]?.buffer.toString("utf8") || "", /"type":"manifest"/);
  assert.doesNotMatch(large.text, /x{1000}/);
});
