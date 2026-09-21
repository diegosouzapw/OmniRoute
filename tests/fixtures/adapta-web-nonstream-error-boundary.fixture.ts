// This suite owns process-wide DATA_DIR, plugin, fetch, and DB state. It must run only inside
// the subprocess launched by tests/unit/adapta-web-nonstream-error-boundary.test.ts.
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { after, afterEach, describe, it } from "node:test";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-adapta-nonstream-error-"));
const TEST_PLUGINS_DIR = join(TEST_DATA_DIR, "plugins");
mkdirSync(TEST_PLUGINS_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const originalFetch = globalThis.fetch;
const { AdaptaWebExecutor } = await import("../../open-sse/executors/adapta-web.ts");

interface ErrorEnvelope {
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
  choices?: unknown[];
}

interface CompletionEnvelope {
  choices?: Array<{
    message?: {
      content?: string;
    };
    finish_reason?: string;
  }>;
}

function installAdaptaFetch(upstreamBody: string): void {
  const mockFetch = async (input: string | URL | Request): Promise<Response> => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;

    if (url === "https://clerk.agent.adapta.one/v1/client") {
      return Response.json({ response: { sessions: [{ id: "sess-fixture", status: "active" }] } });
    }

    if (url === "https://clerk.agent.adapta.one/v1/client/sessions/sess-fixture/tokens") {
      return Response.json({ jwt: "eyJ.fixture.signature" });
    }

    if (url === "https://agent.adapta.one/api/chat/stream/v1") {
      return new Response(upstreamBody, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    throw new Error(`Unexpected test fetch URL: ${url}`);
  };

  globalThis.fetch = mockFetch as typeof fetch;
}

afterEach(() => {
  globalThis.fetch = originalFetch;
});

after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

describe("Adapta Web non-stream error boundary", () => {
  it("returns a sanitized 502 when an HTTP 200 SSE body contains type:error", async () => {
    installAdaptaFetch(
      `data: ${JSON.stringify({
        type: "error",
        errorText:
          "SQLSTATE 42P01 private detail at /srv/omniroute/open-sse/executors/adapta-web.ts:481:9 Authorization: Bearer secret-token\n    at secret (/srv/omniroute/internal.ts:1:1)",
      })}\n\n`
    );

    const executor = new AdaptaWebExecutor();
    const result = await executor.execute({
      model: "adapta-one",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: { apiKey: "fixture-client-error" },
      signal: null,
    });

    assert.equal(result.response.status, 502);
    const payload = (await result.response.json()) as ErrorEnvelope;
    assert.equal(payload.error?.type, "server_error");
    assert.equal(payload.error?.code, "bad_gateway");
    assert.equal(payload.error?.message, "Adapta upstream error");
    assert.ok(!payload.error?.message?.includes("SQLSTATE"));
    assert.ok(!payload.error?.message?.includes("private detail"));
    assert.ok(!payload.error?.message?.includes("/srv/omniroute"));
    assert.ok(!payload.error?.message?.includes("secret-token"));
    assert.ok(!payload.error?.message?.includes("\n"));
    assert.equal(payload.choices, undefined);
  });

  it("preserves a normal non-stream completion assembled from text-delta events", async () => {
    installAdaptaFetch(
      [
        `data: ${JSON.stringify({ type: "text-delta", id: "quick-response", delta: "Loading" })}`,
        `data: ${JSON.stringify({ type: "text-delta", id: "answer", delta: "Hello" })}`,
        `data: ${JSON.stringify({ type: "text-delta", id: "answer", delta: " world" })}`,
        `data: ${JSON.stringify({ type: "done" })}`,
        "",
      ].join("\n\n")
    );

    const executor = new AdaptaWebExecutor();
    const result = await executor.execute({
      model: "adapta-one",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: { apiKey: "fixture-client-success" },
      signal: null,
    });

    assert.equal(result.response.status, 200);
    const payload = (await result.response.json()) as CompletionEnvelope;
    assert.equal(payload.choices?.[0]?.message?.content, "Hello world");
    assert.equal(payload.choices?.[0]?.finish_reason, "stop");
  });
});
