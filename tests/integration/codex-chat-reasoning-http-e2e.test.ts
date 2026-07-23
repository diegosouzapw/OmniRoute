import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";

const CODEX_RESPONSES_URL = "https://chatgpt.com/backend-api/codex/responses";
const ENCRYPTED_CONTENT_SENTINEL = "encrypted-codex-state:" + "A".repeat(910);
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-chat-http-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "codex-chat-http-e2e-secret-123456";
process.env.REQUIRE_API_KEY = "false";
process.env.OMNIROUTE_LOG_REQUEST_SHAPE = "0";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

const originalFetch = globalThis.fetch;

type RecordedRequest = {
  url: string;
  method: string;
  body: Record<string, unknown>;
};

function responsesEvents() {
  const response = {
    id: "resp_reasoning_http",
    object: "response",
    status: "in_progress",
    model: "gpt-5.6-sol",
    output: [],
  };
  return [
    { type: "response.created", response },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: {
        id: "rs_reasoning_http",
        type: "reasoning",
        encrypted_content: ENCRYPTED_CONTENT_SENTINEL,
        summary: [],
      },
    },
    {
      type: "response.output_item.done",
      output_index: 0,
      item: {
        id: "rs_reasoning_http",
        type: "reasoning",
        encrypted_content: ENCRYPTED_CONTENT_SENTINEL,
        summary: [],
      },
    },
    {
      type: "response.output_item.added",
      output_index: 1,
      item: { id: "msg_reasoning_http", type: "message", role: "assistant", content: [] },
    },
    {
      type: "response.content_part.added",
      item_id: "msg_reasoning_http",
      output_index: 1,
      content_index: 0,
      part: { type: "output_text", text: "", annotations: [] },
    },
    {
      type: "response.output_text.delta",
      item_id: "msg_reasoning_http",
      output_index: 1,
      content_index: 0,
      delta: "The answer is 42.",
    },
    {
      type: "response.output_text.done",
      item_id: "msg_reasoning_http",
      output_index: 1,
      content_index: 0,
      text: "The answer is 42.",
    },
    {
      type: "response.output_item.done",
      output_index: 1,
      item: {
        id: "msg_reasoning_http",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "The answer is 42.", annotations: [] }],
      },
    },
    {
      type: "response.completed",
      response: {
        ...response,
        status: "completed",
        output: [
          {
            id: "rs_reasoning_http",
            type: "reasoning",
            summary: [{ type: "summary_text", text: "I checked the contract. " }],
          },
          {
            id: "msg_reasoning_http",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "The answer is 42.", annotations: [] }],
          },
        ],
        usage: { input_tokens: 8, output_tokens: 9, total_tokens: 17 },
      },
    },
  ];
}

function mockResponsesSse() {
  const nativeFraming = process.env.CODEX_NATIVE_EVENT_FRAMING === "1";
  return responsesEvents()
    .map((event) => {
      const eventLine = nativeFraming ? `event: ${event.type}\n` : "";
      return `${eventLine}data: ${JSON.stringify(event)}\n\n`;
    })
    .join("");
}

async function readIncomingBody(request: http.IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request)
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

async function bridgeRouteResponse(response: Response, outgoing: http.ServerResponse) {
  outgoing.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  if (!response.body) {
    outgoing.end();
    return;
  }

  const reader = response.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!outgoing.write(value)) await once(outgoing, "drain");
    }
    outgoing.end();
  } finally {
    reader.releaseLock();
  }
}

async function startRouteServer() {
  const server = http.createServer(async (incoming, outgoing) => {
    try {
      if (incoming.method !== "POST" || incoming.url !== "/v1/chat/completions") {
        outgoing.writeHead(404).end();
        return;
      }

      const body = await readIncomingBody(incoming);
      const address = server.address();
      assert(address && typeof address !== "string");
      const headers = new Headers();
      for (const [name, value] of Object.entries(incoming.headers)) {
        if (Array.isArray(value)) value.forEach((item) => headers.append(name, item));
        else if (value !== undefined) headers.set(name, value);
      }
      const request = new Request(`http://127.0.0.1:${address.port}${incoming.url}`, {
        method: incoming.method,
        headers,
        body,
      });
      await bridgeRouteResponse(await chatRoute.POST(request), outgoing);
    } catch {
      // Mock route bridge: static body only — CodeQL flags ANY error-derived value here,
      // including error.message / String(error) (js/stack-trace-exposure #736/#737). The test
      // only asserts status===200, so the 500 body is never inspected.
      outgoing.writeHead(500, { "content-type": "text/plain" });
      outgoing.end("internal test route error");
    }
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  return { server, url: `http://127.0.0.1:${address.port}/v1/chat/completions` };
}

function parseSse(raw: string) {
  return raw
    .split(/\n\n+/)
    .map((block) =>
      block
        .split("\n")
        .find((line) => line.startsWith("data: "))
        ?.slice(6)
    )
    .filter((data): data is string => Boolean(data));
}

async function closeServer(server: http.Server) {
  if (!server.listening) return;
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
}

test("chat completions streams Codex Responses reasoning through real route HTTP", async () => {
  const recorded: RecordedRequest[] = [];
  let routeServer: http.Server | undefined;

  try {
    await providersDb.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "codex-http-reasoning",
      email: "codex-http@example.test",
      accessToken: "mock-codex-access-token",
      refreshToken: "mock-codex-refresh-token",
      tokenType: "Bearer",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });

    const routeHarness = await startRouteServer();
    routeServer = routeHarness.server;

    globalThis.fetch = async (input, init) => {
      const request = input instanceof Request ? input : new Request(input, init);
      if (request.url !== CODEX_RESPONSES_URL) {
        throw new Error(`Unexpected external fetch in Codex HTTP test: ${request.url}`);
      }
      recorded.push({
        url: request.url,
        method: request.method,
        body: JSON.parse(await request.text()) as Record<string, unknown>,
      });
      return new Response(mockResponsesSse(), {
        status: 200,
        headers: { "content-type": "text/event-stream; charset=utf-8" },
      });
    };

    const response = await originalFetch(routeHarness.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "codex/gpt-5.6-sol",
        stream: true,
        reasoning_effort: "high",
        messages: [{ role: "user", content: "What is the answer?" }],
      }),
    });
    const raw = await response.text();

    assert.equal(response.status, 200, raw);
    assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
    assert.equal(recorded.length, 1);
    assert.equal(recorded[0].url, CODEX_RESPONSES_URL);
    assert.equal(recorded[0].method, "POST");
    assert.deepEqual(recorded[0].body.reasoning, { effort: "high", summary: "auto" });
    assert.deepEqual(recorded[0].body.input, [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "What is the answer?" }],
      },
    ]);

    const chunks = parseSse(raw);
    assert.equal(chunks.at(-1), "[DONE]");
    const payloads = chunks.slice(0, -1).map((chunk) => JSON.parse(chunk));
    const reasoningContentDeltas = payloads
      .map((payload) => payload.choices?.[0]?.delta?.reasoning_content)
      .filter((content): content is string => Boolean(content));
    assert.equal(reasoningContentDeltas.length, 1);
    const reasoningContent = reasoningContentDeltas.join("");
    assert.match(reasoningContent, /encrypted (?:state|private reasoning)/i);
    assert(!raw.includes(ENCRYPTED_CONTENT_SENTINEL), raw);
    assert(!reasoningContent.includes(ENCRYPTED_CONTENT_SENTINEL), reasoningContent);
    assert(
      payloads.some((payload) => payload.choices?.[0]?.delta?.content === "The answer is 42.")
    );
    assert(!raw.includes("response.reasoning_summary_text.delta"), raw);
    assert(!raw.includes('"type":"error"'), raw);
    assert(!raw.includes('"error"'), raw);
  } finally {
    globalThis.fetch = originalFetch;
    if (routeServer) await closeServer(routeServer);
    core.closeDbInstance({ checkpointMode: null });
    await fsp.rm(TEST_DATA_DIR, { recursive: true, force: true });
  }
});
