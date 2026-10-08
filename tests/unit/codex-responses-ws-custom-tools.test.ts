import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { once } from "node:events";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ws-custom-tools-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "test-custom-tools-bridge";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");
const { createResponsesWsProxy } = await import("../../scripts/dev/responses-ws-proxy.mjs");

test.before(async () => {
  await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "WS custom tools fixture",
    accessToken: "test-oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { codexFingerprintMode: "off" },
    // A reused WS connection re-prepares (and re-acquires a lease) per logical
    // turn before releasing the previous one (scripts/dev/responses-ws-proxy.mjs
    // runPrepare). maxConcurrent must allow at least 2 in-flight leases for a
    // single session's sequential turns, matching how this account is
    // configured in practice — the default of 1 (unset) is for accounts that
    // never carry a multi-turn WS session.
    maxConcurrent: 2,
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function prepare(response: Record<string, unknown>) {
  const result = await POST(
    new Request("http://omniroute.local/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-ws-bridge-secret": "test-custom-tools-bridge",
      },
      body: JSON.stringify({
        action: "prepare",
        requestUrl: "http://omniroute.local/v1/responses",
        headers: {},
        response: { model: "codex/gpt-5.5", ...response },
      }),
    })
  );
  const body = await result.json();
  assert.equal(result.status, 200, JSON.stringify(body));
  assert.equal(body.response._nativeCodexPassthrough, undefined);
  // The base's per-account WS lease (non-queued, process-local; landed on
  // release/v3.8.51 after this branch's fork point) holds the connection's
  // single default slot until released. Release it here so each independent
  // `prepare()` call in this file does not starve the next one.
  await POST(
    new Request("http://omniroute.local/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-ws-bridge-secret": "test-custom-tools-bridge",
      },
      body: JSON.stringify({ action: "release", leaseId: body.leaseId }),
    })
  );
  return body.response;
}

const shell = {
  type: "custom",
  name: "probe_shell",
  description: "Test-only command tool",
  format: { type: "text" },
};

test("WS prepare preserves a required custom tool without a client-supplied internal flag", async () => {
  const body = await prepare({
    input: "Call probe_shell",
    tools: [shell],
    tool_choice: "required",
  });
  assert.deepEqual(body.tools, [shell]);
  assert.equal(body.tool_choice, "required");
});

test("WS prepare preserves grammar, function and namespace tools together", async () => {
  const tools = [
    {
      type: "custom",
      name: "apply_patch",
      format: { type: "grammar", syntax: "lark", definition: 'start: "patch"' },
    },
    { type: "function", name: "read_file", parameters: { type: "object", properties: {} } },
    {
      type: "namespace",
      name: "workspace",
      tools: [
        { type: "function", name: "list_files", parameters: { type: "object", properties: {} } },
      ],
    },
  ];
  const body = await prepare({ input: "Use the provided tools", tools });
  assert.deepEqual(body.tools, tools);
});

test("WS prepare retains custom tool call and output on the following turn", async () => {
  await prepare({ input: "Call probe_shell", tools: [shell] });
  const call = {
    type: "custom_tool_call",
    call_id: "call_probe",
    name: "probe_shell",
    input: "Get-Date",
  };
  const output = {
    type: "custom_tool_call_output",
    call_id: "call_probe",
    output: "2026-09-16",
  };
  const body = await prepare({
    input: [{ role: "user", content: "Call probe_shell" }, call, output],
    tools: [shell],
  });
  assert.deepEqual(body.tools, [shell]);
  assert.ok(body.input.some((item: Record<string, unknown>) => item.type === call.type));
  assert.deepEqual(
    body.input.find((item: Record<string, unknown>) => item.type === output.type),
    output
  );
});

test("a reused WebSocket preserves a custom tool through call, result and final response", async () => {
  const sent: Array<Record<string, unknown>> = [];
  const call = {
    type: "custom_tool_call",
    call_id: "call_roundtrip",
    name: "probe_shell",
    input: "Get-Date",
  };
  const result = {
    type: "custom_tool_call_output",
    call_id: call.call_id,
    output: "2026-09-16",
  };
  const upstream = {
    onmessage: null as ((event: { data: string }) => void) | null,
    onerror: null,
    onclose: null,
    close() {},
    send(data: string) {
      sent.push(JSON.parse(data));
      const turn = sent.length;
      setImmediate(() => {
        upstream.onmessage?.({
          data: JSON.stringify({
            type: "response.completed",
            response: {
              id: `resp_roundtrip_${turn}`,
              status: "completed",
              output:
                turn === 1
                  ? [call]
                  : [
                      {
                        type: "message",
                        role: "assistant",
                        content: [{ type: "output_text", text: result.output }],
                      },
                    ],
            },
          }),
        });
      });
    },
  };
  const server = http.createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const proxyOptions = {
    baseUrl: `http://127.0.0.1:${address.port}`,
    bridgeSecret: process.env.OMNIROUTE_WS_BRIDGE_SECRET,
    // Exercise real auth/preparation and the executor; provider responses and
    // unrelated asynchronous history persistence are deterministic test doubles.
    fetchImpl: (url: Parameters<typeof fetch>[0], init?: RequestInit) => {
      if (JSON.parse(String(init?.body)).action === "log") {
        return Promise.resolve(Response.json({ ok: true, logged: true }));
      }
      return POST(new Request(url, init));
    },
    wsFactory: async () => upstream,
  };
  const proxy = createResponsesWsProxy(proxyOptions);
  server.on("upgrade", (req, socket, head) => {
    void proxy.handleUpgrade(req, socket, head);
  });
  const ws = new WebSocket(`ws://127.0.0.1:${address.port}/v1/responses`);
  try {
    await once(ws, "open", { signal: AbortSignal.timeout(5000) });
    const first = once(ws, "message", { signal: AbortSignal.timeout(5000) });
    ws.send(
      JSON.stringify({
        type: "response.create",
        model: "codex/gpt-5.5",
        input: "Call probe_shell",
        tools: [shell],
        tool_choice: "required",
      })
    );
    const [firstEvent] = await first;
    const firstResponse = JSON.parse(String(firstEvent.data));
    assert.equal(firstResponse.type, "response.completed", JSON.stringify(firstResponse));
    assert.deepEqual(sent[0].tools, [shell]);
    assert.deepEqual(firstResponse.response.output, [call]);

    const second = once(ws, "message", { signal: AbortSignal.timeout(5000) });
    ws.send(
      JSON.stringify({
        type: "response.create",
        model: "codex/gpt-5.5",
        input: [{ role: "user", content: "Call probe_shell" }, call, result],
        tools: [shell],
      })
    );
    const [secondEvent] = await second;
    const secondResponse = JSON.parse(String(secondEvent.data));
    assert.equal(secondResponse.type, "response.completed", JSON.stringify(secondResponse));
    assert.equal(sent.length, 2);
    assert.deepEqual(sent[1].tools, [shell]);
    assert.ok(Array.isArray(sent[1].input));
    assert.deepEqual(
      sent[1].input.find((item: Record<string, unknown>) => item.type === result.type),
      result
    );
    assert.equal(secondResponse.response.output[0].content[0].text, result.output);
    assert.ok(sent.every((body) => !("_nativeCodexPassthrough" in body)));
  } finally {
    const closed = once(ws, "close", { signal: AbortSignal.timeout(5000) });
    ws.close();
    await closed;
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
