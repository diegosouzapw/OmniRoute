import assert from "node:assert/strict";
import http from "node:http";
import { once } from "node:events";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "codex-pool-http-e2e-secret-123456";
process.env.REQUIRE_API_KEY = "false";
process.env.OMNIROUTE_LOG_REQUEST_SHAPE = "0";

const providersDb = await import("../../../src/lib/db/providers.ts");
const chatRoute = await import("../../../src/app/api/v1/chat/completions/route.ts");

const CODEX_RESPONSES_URL = "https://chatgpt.com/backend-api/codex/responses";
const phase = process.env.CODEX_RESTART_PHASE;
const expectedId = process.env.CODEX_EXPECTED_CONNECTION_ID;
const originalFetch = globalThis.fetch;
const upstreamModels: string[] = [];

async function readIncomingBody(request: http.IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
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
        method: "POST",
        headers,
        body,
      });
      await bridgeRouteResponse(await chatRoute.POST(request), outgoing);
    } catch {
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

async function closeServer(server: http.Server) {
  if (!server.listening) return;
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
}

function successResponsesSse(model: string) {
  return (
    [
      {
        type: "response.created",
        response: {
          id: `resp-${model}`,
          object: "response",
          status: "in_progress",
          model,
          output: [],
        },
      },
      {
        type: "response.completed",
        response: {
          id: `resp-${model}`,
          object: "response",
          status: "completed",
          model,
          output: [],
        },
      },
    ]
      .map((event) => `data: ${JSON.stringify(event)}\n\n`)
      .join("") + "data: [DONE]\n\n"
  );
}

async function requestModel(url: string, model: string) {
  return originalFetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [{ role: "user", content: "Say hello" }],
    }),
  });
}

if (phase !== "before" && phase !== "after") {
  throw new Error("CODEX_RESTART_PHASE must be before or after");
}

let connectionId: string;
if (phase === "before") {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-pool-restart",
    email: "codex-pool-restart@example.test",
    accessToken: "mock-codex-access-token",
    refreshToken: "mock-codex-refresh-token",
    tokenType: "Bearer",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  connectionId = connection.id;
} else {
  const inventory = await providersDb.getProviderConnections({ provider: "codex" });
  assert.equal(inventory.length, 1);
  assert.equal(inventory[0].id, expectedId);
  connectionId = inventory[0].id;
}

const resetAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  if (url !== CODEX_RESPONSES_URL) return originalFetch(input, init);
  const requestBody = JSON.parse(String(init?.body || "{}")) as { model?: string };
  const model = String(requestBody.model || "");
  upstreamModels.push(model);
  if (model.includes("spark")) {
    return new Response(
      JSON.stringify({ error: { message: "Spark quota exhausted", type: "rate_limit_error" } }),
      {
        status: 429,
        headers: {
          "content-type": "application/json",
          "x-codex-5h-usage": "100",
          "x-codex-5h-limit": "100",
          "x-codex-5h-reset-at": resetAt,
          "x-codex-7d-usage": "1",
          "x-codex-7d-limit": "1000",
          "x-codex-7d-reset-at": new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      }
    );
  }
  return new Response(successResponsesSse(model), {
    status: 200,
    headers: { "content-type": "text/event-stream; charset=utf-8" },
  });
};

let server: http.Server | undefined;
try {
  const started = await startRouteServer();
  server = started.server;
  if (phase === "before") {
    const spark = await requestModel(started.url, "codex/gpt-5.3-codex-spark");
    await spark.text();
    assert.ok(upstreamModels.length > 0);
    assert.equal(
      upstreamModels.every((model) => model === "gpt-5.3-codex-spark"),
      true
    );
  } else {
    const spark = await requestModel(started.url, "codex/gpt-5.3-codex-spark");
    await spark.text();
    assert.equal(
      upstreamModels.length,
      0,
      "fresh process must restore Spark cooldown before fetch"
    );

    const normal = await requestModel(started.url, "codex/gpt-5.5");
    const body = await normal.text();
    assert.equal(normal.status, 200, body);
    assert.match(body, /"model":"gpt-5.5"/);
    assert.deepEqual(upstreamModels, ["gpt-5.5"]);
  }

  const inventory = await providersDb.getProviderConnections({ provider: "codex" });
  assert.deepEqual(
    inventory.map((connection) => connection.id),
    [connectionId]
  );
  console.log(`CODEX_RESTART_RESULT=${JSON.stringify({ phase, connectionId, upstreamModels })}`);
} finally {
  globalThis.fetch = originalFetch;
  if (server) await closeServer(server);
}
