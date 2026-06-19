import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

// Proxy-context passthrough on execution paths:
//  1. combo targets must each run under their OWN connection's proxy
//  2. /v1/messages/count_tokens must apply the connection proxy to the
//     provider-side count call (it used to run with no proxy context at all)

const harness = await createChatPipelineHarness("proxy-context-passthrough");
const { buildClaudeResponse, buildRequest, combosDb, handleChat, resetStorage, seedConnection, settingsDb, toPlainHeaders } =
  harness;
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
const countTokensRoute = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

type TcpStub = { port: number; close: () => Promise<void> };

// T14 fast-fail does a real TCP reachability check on the proxy host before
// entering the proxy context — back each fake proxy with a real listener.
async function startTcpStub(): Promise<TcpStub> {
  const server = net.createServer((socket) => socket.destroy());
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("no tcp stub address");
  return {
    port: address.port,
    close: () =>
      new Promise<void>((resolve) => {
        server.close(() => resolve());
      }),
  };
}

function activeProxyUrl(): string | null {
  const resolved = resolveProxyForRequest("https://upstream.example/v1");
  return resolved?.proxyUrl ?? null;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("combo targets each execute under their own connection's proxy", async () => {
  const stubA = await startTcpStub();
  const stubB = await startTcpStub();

  try {
    const openaiConn = (await seedConnection("openai", {
      apiKey: "sk-openai-proxy-a",
    })) as any;
    const claudeConn = (await seedConnection("claude", {
      apiKey: "sk-claude-proxy-b",
    })) as any;
    await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });

    await proxiesDb.createProxyAndAssign(
      { name: "proxy-a", type: "http", host: "127.0.0.1", port: stubA.port },
      { scope: "account", scopeId: openaiConn.id }
    );
    await proxiesDb.createProxyAndAssign(
      { name: "proxy-b", type: "http", host: "127.0.0.1", port: stubB.port },
      { scope: "account", scopeId: claudeConn.id }
    );

    await combosDb.createCombo({
      name: "proxy-per-target-combo",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
      models: ["openai/gpt-4o-mini", "claude/claude-3-5-sonnet-20241022"],
    });

    const proxySeen: Record<string, string | null> = {};

    globalThis.fetch = async (_url: any, init: any = {}) => {
      const headers = toPlainHeaders(init.headers);
      const authHeader = headers.authorization ?? headers.Authorization;
      const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

      if (authHeader === "Bearer sk-openai-proxy-a") {
        proxySeen.openai = activeProxyUrl();
        return new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (apiKeyHeader === "sk-claude-proxy-b" || authHeader === "Bearer sk-claude-proxy-b") {
        proxySeen.claude = activeProxyUrl();
        return buildClaudeResponse("served through proxy-b");
      }

      throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
    };

    const response = await handleChat(
      buildRequest({
        body: {
          model: "proxy-per-target-combo",
          stream: false,
          messages: [{ role: "user", content: "proxy per target" }],
        },
      })
    );

    const body = (await response.json()) as any;
    assert.equal(response.status, 200);
    assert.equal(body.choices[0].message.content, "served through proxy-b");

    assert.ok(proxySeen.openai, "openai target must run inside a proxy context");
    assert.ok(
      proxySeen.openai!.includes(`127.0.0.1:${stubA.port}`),
      `openai target must use proxy-a (saw ${proxySeen.openai})`
    );
    assert.ok(proxySeen.claude, "claude target must run inside a proxy context");
    assert.ok(
      proxySeen.claude!.includes(`127.0.0.1:${stubB.port}`),
      `claude fallback target must use proxy-b (saw ${proxySeen.claude})`
    );
  } finally {
    await stubA.close();
    await stubB.close();
  }
});

test("count_tokens provider call runs inside the connection's proxy context", async () => {
  const stub = await startTcpStub();

  try {
    const claudeConn = (await seedConnection("claude", {
      apiKey: "sk-claude-count-tokens",
    })) as any;
    await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });

    await proxiesDb.createProxyAndAssign(
      { name: "proxy-count", type: "http", host: "127.0.0.1", port: stub.port },
      { scope: "account", scopeId: claudeConn.id }
    );

    let providerCallProxy: string | null | undefined;

    globalThis.fetch = async (url: any, _init: any = {}) => {
      const target = typeof url === "string" ? url : String(url);
      if (target.includes("count_tokens")) {
        providerCallProxy = activeProxyUrl();
        return new Response(JSON.stringify({ input_tokens: 42 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error(`unexpected upstream url: ${target}`);
    };

    const response = await countTokensRoute.POST(
      new Request("http://localhost/v1/messages/count_tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude/claude-3-5-sonnet-20241022",
          messages: [{ role: "user", content: "count me" }],
        }),
      })
    );

    const body = (await response.json()) as any;
    assert.equal(response.status, 200);
    assert.equal(body.source, "provider", "provider-side count should be used");
    assert.equal(body.input_tokens, 42);

    assert.ok(
      providerCallProxy,
      "count_tokens provider call must run inside the connection's proxy context"
    );
    assert.ok(
      providerCallProxy!.includes(`127.0.0.1:${stub.port}`),
      `count_tokens must use the account proxy (saw ${providerCallProxy})`
    );
  } finally {
    await stub.close();
  }
});
