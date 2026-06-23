// Tests for optional modelId fallback on /api/provider-nodes/validate.
// Ports decolua/9router#315 (Doan Minh Tu).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-validate-modelid-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providerNodesValidateRoute = await import(
  "../../src/app/api/provider-nodes/validate/route.ts"
);

const originalFetch = globalThis.fetch;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

type FetchCall = { url: string; init: any };

function installFetchSequence(responses: Array<() => Response>) {
  const calls: FetchCall[] = [];
  let i = 0;
  globalThis.fetch = async (url: any, init: any = {}) => {
    calls.push({ url: String(url), init });
    const factory = responses[i++] ?? responses[responses.length - 1];
    return factory();
  };
  return calls;
}

function validate(body: Record<string, unknown>) {
  return providerNodesValidateRoute.POST(
    new Request("http://localhost/api/provider-nodes/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

test("openai-compatible: modelId fallback to /chat/completions succeeds when /models 404", async () => {
  const calls = installFetchSequence([
    () => new Response("not found", { status: 404 }),
    () => new Response(JSON.stringify({ id: "ok" }), { status: 200 }),
  ]);

  const res = await validate({
    baseUrl: "https://proxy.example.com/v1",
    apiKey: "sk-test",
    type: "openai-compatible",
    modelId: "my-model",
  });

  assert.equal(res.status, 200);
  const data = (await res.json()) as any;
  assert.equal(data.valid, true);
  assert.equal(data.method, "chat");
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://proxy.example.com/v1/models");
  assert.equal(calls[1].url, "https://proxy.example.com/v1/chat/completions");
  assert.equal(calls[1].init.method, "POST");
  const sent = JSON.parse(calls[1].init.body as string);
  assert.equal(sent.model, "my-model");
  assert.equal(sent.max_tokens, 1);
  assert.deepEqual(sent.messages, [{ role: "user", content: "ping" }]);
});

test("openai-compatible: 401 from /models skips chat fallback even when modelId set", async () => {
  const calls = installFetchSequence([() => new Response("nope", { status: 401 })]);

  const res = await validate({
    baseUrl: "https://proxy.example.com/v1",
    apiKey: "sk-test",
    type: "openai-compatible",
    modelId: "my-model",
  });

  assert.equal(res.status, 200);
  const data = (await res.json()) as any;
  assert.equal(data.valid, false);
  assert.equal(calls.length, 1);
  assert.match(String(data.error), /unauthorized/i);
});

test("openai-compatible: chat fallback failure returns descriptive error", async () => {
  installFetchSequence([
    () => new Response("not found", { status: 404 }),
    () => new Response("bad model", { status: 400 }),
  ]);

  const res = await validate({
    baseUrl: "https://proxy.example.com/v1",
    apiKey: "sk-test",
    type: "openai-compatible",
    modelId: "bad-model",
  });

  assert.equal(res.status, 200);
  const data = (await res.json()) as any;
  assert.equal(data.valid, false);
  assert.equal(data.method, "chat");
  assert.match(String(data.error), /invalid model|bad request/i);
});

test("openai-compatible: without modelId, 404 from /models returns helpful hint", async () => {
  installFetchSequence([() => new Response("nope", { status: 404 })]);

  const res = await validate({
    baseUrl: "https://proxy.example.com/v1",
    apiKey: "sk-test",
    type: "openai-compatible",
  });

  assert.equal(res.status, 200);
  const data = (await res.json()) as any;
  assert.equal(data.valid, false);
  assert.match(String(data.error), /models.*endpoint.*not found|model id/i);
});

test("anthropic-compatible: modelId fallback to /chat/completions on 404", async () => {
  const calls = installFetchSequence([
    () => new Response("not found", { status: 404 }),
    () => new Response(JSON.stringify({ id: "ok" }), { status: 200 }),
  ]);

  const res = await validate({
    baseUrl: "https://proxy.example.com/v1",
    apiKey: "sk-anthropic",
    type: "anthropic-compatible",
    modelId: "claude-3-opus",
  });

  assert.equal(res.status, 200);
  const data = (await res.json()) as any;
  assert.equal(data.valid, true);
  assert.equal(data.method, "chat");
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, "https://proxy.example.com/v1/chat/completions");
  assert.equal(calls[1].init.headers["x-api-key"], "sk-anthropic");
  assert.equal(calls[1].init.headers["anthropic-version"], "2023-06-01");
});
