import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-a2a-v1-compat-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const a2aRoute = await import("../../src/app/a2a/route.ts");
const agentCardRoute = await import("../../src/app/.well-known/agent-card.json/route.ts");

/**
 * The agent-card routes derive their base URL from `request.nextUrl.origin`
 * (S2 topology sanitisation, #11418), so the handler must be invoked with a
 * request the way Next.js does — a bare `GET()` throws on `nextUrl`.
 */
function makeCardRequest(
  url = "https://gateway.example.com/.well-known/agent-card.json"
): NextRequest {
  const request = new Request(url) as unknown as NextRequest;
  Object.defineProperty(request, "nextUrl", { value: new URL(url), configurable: true });
  return request;
}

function makeJsonRpcRequest(body: unknown): NextRequest {
  return new Request("http://localhost/a2a", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ a2aEnabled: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#10839: v1.0 SendMessage is aliased to message/send and reshapes the response", async () => {
  const res = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "1",
      method: "SendMessage",
      params: {
        skill: "provider-discovery",
        messages: [{ role: "user", content: "which providers support tools?" }],
      },
    })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    result?: {
      task?: {
        id: string;
        status?: { message?: { parts?: { text?: string }[] } };
        artifacts?: unknown;
      };
    };
    error?: unknown;
  };
  assert.equal(body.error, undefined, JSON.stringify(body));
  assert.ok(body.result?.task?.id, "v1.0 response must carry a task id");
  const text = body.result?.task?.status?.message?.parts?.[0]?.text;
  assert.equal(typeof text, "string");
  assert.ok((text as string).length > 0, "task.status.message.parts[].text must carry the reply");
  assert.ok(Array.isArray(body.result?.task?.artifacts));
});

test("#10839: v0.3 message/send keeps its existing top-level artifacts/metadata shape", async () => {
  const res = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "2",
      method: "message/send",
      params: {
        skill: "provider-discovery",
        messages: [{ role: "user", content: "which providers support tools?" }],
      },
    })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    result?: { task?: { id: string; state?: string }; artifacts?: unknown; metadata?: unknown };
  };
  assert.equal(body.result?.task?.state, "completed");
  assert.ok(Array.isArray(body.result?.artifacts), "v0.3 shape must keep top-level artifacts");
  // v0.3 responses must NOT carry the v1.0 status.message shape
  assert.equal((body.result?.task as Record<string, unknown> | undefined)?.status, undefined);
});

test("#10839: SendStreamingMessage no longer 404s (aliased to message/stream)", async () => {
  const res = await a2aRoute.POST(
    makeJsonRpcRequest({
      jsonrpc: "2.0",
      id: "3",
      method: "SendStreamingMessage",
      params: {
        skill: "provider-discovery",
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  assert.notEqual(res.status, 404);
  const contentType = res.headers.get("content-type") || "";
  assert.ok(
    contentType.includes("text/event-stream") || res.status === 200,
    `expected an SSE stream, got status=${res.status} content-type=${contentType}`
  );
});

test("#10839: GET /.well-known/agent-card.json serves a v1.0 card declaring both interfaces", async () => {
  const res = await agentCardRoute.GET(makeCardRequest());
  assert.equal(res.status, 200);
  const card = (await res.json()) as { supportedInterfaces?: { protocolVersion?: string }[] };
  assert.ok(Array.isArray(card.supportedInterfaces));
  const versions = (card.supportedInterfaces || []).map((i) => i.protocolVersion);
  assert.ok(versions.includes("1.0"), `expected 1.0 in ${JSON.stringify(versions)}`);
  assert.ok(versions.includes("0.3"), `expected 0.3 in ${JSON.stringify(versions)}`);
});
