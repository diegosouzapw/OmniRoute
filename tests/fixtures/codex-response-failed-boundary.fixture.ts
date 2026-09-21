// This suite intentionally owns process-wide DATA_DIR, plugin, and DB state. It must run only
// inside the subprocess launched by tests/unit/codex-response-failed-boundary.test.ts.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import type { CodexWreqWebSocket } from "../../open-sse/executors/codex/appServerClient.ts";
import type { AdapterEvent } from "../../open-sse/vendor/codex-chatgpt-web/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-boundary-data-"));
const TEST_PLUGINS_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-codex-boundary-plugins-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;
process.env.APP_LOG_TO_FILE = "false";

const { CodexExecutor, __setCodexWebSocketTransportForTesting, encodeResponseSseEvent } =
  await import("../../open-sse/executors/codex.ts");
const { CodexAppServerExecutor } = await import("../../open-sse/executors/codex-app-server.ts");
const { bridgeToResponsesSSE, buildResponseJSON } =
  await import("../../open-sse/vendor/codex-chatgpt-web/bridge.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const PUBLIC_MESSAGE = "Codex provider request failed";
const HOSTILE_MESSAGE =
  "token=codex-secret-value at /srv/omniroute/private/config.json\nforged-log: admin=true";

type FailedPayload = {
  type: "response.failed";
  response: {
    error: {
      code: string | null;
      message: string;
      status_code?: number;
      type?: string;
    };
  };
};

function responseFailedPayload(sse: string): FailedPayload {
  for (const line of sse.split("\n")) {
    if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
    const parsed = JSON.parse(line.slice("data: ".length)) as Record<string, unknown>;
    if (parsed.type === "response.failed") return parsed as FailedPayload;
  }
  assert.fail(`response.failed frame missing from: ${sse}`);
}

function assertPublicFailure(
  payload: FailedPayload,
  expected: { code: string; type: string; statusCode?: number }
): void {
  assert.equal(payload.response.error.message, PUBLIC_MESSAGE);
  assert.equal(payload.response.error.code, expected.code);
  assert.equal(payload.response.error.type, expected.type);
  if (expected.statusCode !== undefined) {
    assert.equal(payload.response.error.status_code, expected.statusCode);
  }
  assert.ok(!JSON.stringify(payload).includes(HOSTILE_MESSAGE));
  assert.ok(!JSON.stringify(payload).includes("codex-secret-value"));
  assert.ok(!JSON.stringify(payload).includes("/srv/omniroute/private"));
}

async function executeCodexWebSocketFailure(
  websocket: Parameters<typeof __setCodexWebSocketTransportForTesting>[0]
): Promise<string> {
  __setCodexWebSocketTransportForTesting(websocket);
  try {
    const result = await new CodexExecutor().execute({
      model: "gpt-5.5",
      body: { model: "gpt-5.5", input: "hello" },
      stream: true,
      credentials: {
        accessToken: "test-token",
        providerSpecificData: { codexTransport: "websocket" },
      },
    });
    return await result.response.text();
  } finally {
    __setCodexWebSocketTransportForTesting(undefined);
  }
}

async function executeAppServerFailure(stream: boolean): Promise<Response> {
  const socket: CodexWreqWebSocket = {
    send(data: string) {
      const frame = JSON.parse(data) as Record<string, unknown>;
      if (frame.id == null || typeof frame.method !== "string") return;
      queueMicrotask(() => {
        if (frame.method === "thread/start") {
          socket.onmessage?.({
            data: JSON.stringify({
              jsonrpc: "2.0",
              id: frame.id,
              result: { thread: { id: "thread-public-boundary" } },
            }),
          });
          return;
        }
        if (frame.method === "turn/start") {
          socket.onmessage?.({
            data: JSON.stringify({
              jsonrpc: "2.0",
              id: frame.id,
              result: { turn: { id: "turn-public-boundary", status: "inProgress" } },
            }),
          });
          setTimeout(() => {
            socket.onmessage?.({
              data: JSON.stringify({
                jsonrpc: "2.0",
                method: "error",
                params: { error: { message: HOSTILE_MESSAGE } },
              }),
            });
          }, 0);
          return;
        }
        socket.onmessage?.({
          data: JSON.stringify({ jsonrpc: "2.0", id: frame.id, result: {} }),
        });
      });
    },
    close() {},
    onmessage: null,
    onerror: null,
    onclose: null,
  };
  const executor = new CodexAppServerExecutor({ websocketFn: async () => socket });
  const result = await executor.execute({
    model: "gpt-5.5",
    body: { input: "hello" },
    stream,
    credentials: {
      providerSpecificData: {
        codexTransport: "app-server",
        codexAppServerUrl: "ws://codex-app-server.test:1456",
        codexAppServerToken: "test-app-server-token",
      },
    },
  });
  return result.response;
}

test.after(() => {
  __setCodexWebSocketTransportForTesting(undefined);
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.rmSync(TEST_PLUGINS_DIR, { recursive: true, force: true });
});

test("Codex same-format error event emits only a fixed public failure contract", () => {
  const result = encodeResponseSseEvent(
    JSON.stringify({
      type: "error",
      status_code: 502,
      error: {
        code: "secret_backend_code_9182",
        type: "secret_backend_type_7731",
        message: HOSTILE_MESSAGE,
      },
    })
  );

  assert.equal(result.terminal, true);
  assertPublicFailure(responseFailedPayload(result.sse), {
    code: "upstream_server_error",
    type: "server_error",
    statusCode: 502,
  });
});

test("Codex same-format quota classification survives while its raw message does not", () => {
  const result = encodeResponseSseEvent(
    JSON.stringify({
      type: "response.failed",
      response: {
        status: "failed",
        error: { code: "usage_limit_reached", message: HOSTILE_MESSAGE },
      },
    })
  );

  assertPublicFailure(responseFailedPayload(result.sse), {
    code: "usage_limit_reached",
    type: "rate_limit_error",
    statusCode: 429,
  });
});

test("Codex same-format failures reject contradictory allowlisted status, code and type", () => {
  const wrongStatus = responseFailedPayload(
    encodeResponseSseEvent(
      JSON.stringify({
        type: "response.failed",
        status_code: 502,
        response: {
          status: "failed",
          error: {
            code: "invalid_api_key",
            type: "rate_limit_error",
            message: HOSTILE_MESSAGE,
          },
        },
      })
    ).sse
  );
  assertPublicFailure(wrongStatus, {
    code: "upstream_server_error",
    type: "server_error",
    statusCode: 502,
  });

  const wrongType = responseFailedPayload(
    encodeResponseSseEvent(
      JSON.stringify({
        type: "response.failed",
        status_code: 401,
        response: {
          status: "failed",
          error: {
            code: "invalid_api_key",
            type: "rate_limit_error",
            message: HOSTILE_MESSAGE,
          },
        },
      })
    ).sse
  );
  assertPublicFailure(wrongType, {
    code: "invalid_api_key",
    type: "authentication_error",
    statusCode: 401,
  });
});

test("Codex WebSocket in-flight error event cannot expose transport details", async () => {
  const socket = {
    send() {
      queueMicrotask(() => socket.onerror?.({ message: HOSTILE_MESSAGE }));
    },
    close() {},
    onmessage: null as ((event: { data: unknown }) => void) | null,
    onerror: null as ((event: { message?: string }) => void) | null,
    onclose: null as (() => void) | null,
  };
  const sse = await executeCodexWebSocketFailure(async () => socket);

  assertPublicFailure(responseFailedPayload(sse), {
    code: "upstream_websocket_error",
    type: "provider_error",
  });
});

test("Codex WebSocket connection failure cannot expose exception details", async () => {
  const sse = await executeCodexWebSocketFailure(async () => {
    throw new Error(HOSTILE_MESSAGE);
  });

  assertPublicFailure(responseFailedPayload(sse), {
    code: "upstream_websocket_connect_failed",
    type: "provider_error",
  });
});

test("Codex App Server streaming failure is projected before the HTTP 200 SSE boundary", async () => {
  const response = await executeAppServerFailure(true);
  assert.equal(response.status, 200);

  assertPublicFailure(responseFailedPayload(await response.text()), {
    code: "codex_app_server_turn_failed",
    type: "provider_error",
  });
});

test("Codex App Server non-streaming failure is projected before the HTTP 200 JSON boundary", async () => {
  const response = await executeAppServerFailure(false);
  assert.equal(response.status, 200);
  const body = (await response.json()) as FailedPayload["response"] & { status: string };

  assert.equal(body.status, "failed");
  assertPublicFailure(
    { type: "response.failed", response: body },
    {
      code: "codex_app_server_turn_failed",
      type: "provider_error",
    }
  );
});

test("ChatGPT Web Playwright adapter failures keep safe routing metadata without raw text", async () => {
  async function* browserEvents(): AsyncGenerator<AdapterEvent> {
    yield {
      type: "error",
      message: HOSTILE_MESSAGE,
      status: 502,
      errorType: "server_error",
      code: "chatgpt_submission_ambiguous",
      retryable: false,
    };
  }

  const sse = await new Response(bridgeToResponsesSSE(browserEvents(), "gpt-5.5")).text();
  assertPublicFailure(responseFailedPayload(sse), {
    code: "chatgpt_submission_ambiguous",
    type: "server_error",
  });
});

test("Codex bridge projects message-only adapter failures before SSE serialization", async () => {
  async function* messageOnlyEvents(): AsyncGenerator<AdapterEvent> {
    yield { type: "error", message: HOSTILE_MESSAGE };
  }

  const sse = await new Response(bridgeToResponsesSSE(messageOnlyEvents(), "gpt-5.5")).text();
  assertPublicFailure(responseFailedPayload(sse), {
    code: "upstream_server_error",
    type: "server_error",
  });
});

test("Codex batch bridge projects message-only adapter failures before JSON serialization", () => {
  const body = buildResponseJSON(
    [{ type: "error", message: HOSTILE_MESSAGE }],
    "gpt-5.5"
  ) as FailedPayload["response"] & { status: string };

  assert.equal(body.status, "failed");
  assertPublicFailure(
    { type: "response.failed", response: body },
    {
      code: "upstream_server_error",
      type: "server_error",
    }
  );
});

test("Codex bridge exceptions cannot serialize raw exception messages", async () => {
  async function* throwingEvents(): AsyncGenerator<AdapterEvent> {
    throw new Error(HOSTILE_MESSAGE);
  }

  const sse = await new Response(bridgeToResponsesSSE(throwingEvents(), "gpt-5.5")).text();
  assertPublicFailure(responseFailedPayload(sse), {
    code: "upstream_server_error",
    type: "server_error",
  });
});

test("Codex batch bridge applies the same public failure projector", () => {
  const body = buildResponseJSON(
    [
      {
        type: "error",
        message: HOSTILE_MESSAGE,
        status: 502,
        errorType: "server_error",
        code: "chatgpt_submitted_turn_failed",
        retryable: false,
      },
    ],
    "gpt-5.5"
  ) as FailedPayload["response"] & { status: string };

  assert.equal(body.status, "failed");
  assertPublicFailure(
    { type: "response.failed", response: body },
    {
      code: "chatgpt_submitted_turn_failed",
      type: "server_error",
    }
  );
});
