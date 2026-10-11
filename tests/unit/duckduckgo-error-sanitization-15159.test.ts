import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Socket } from "node:net";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-ddg-errors-15159-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(dataDir, "plugins");
const originalConnect = Socket.prototype.connect;
let socketAttempts = 0;
Socket.prototype.connect = function (): Socket {
  socketAttempts++;
  throw new Error("Unexpected network access in the DuckDuckGo error fixture");
};
const originalFetch = globalThis.fetch;
const {
  DuckDuckGoWebExecutor,
  STATUS_URL,
  CHAT_URL,
  MODELS_URL,
  __setDdgCircuitBreakerStateForTests,
} = await import("../../open-sse/executors/duckduckgo-web.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const variants = JSON.parse(
  fs.readFileSync(
    new URL("../fixtures/duckduckgo/challenge-variants.json", import.meta.url),
    "utf8"
  )
);
const challenge = variants["variant-0.js"].challengeBase64;
let statusCalls = 0;
let chatCalls = 0;

beforeEach(() => {
  __setDdgCircuitBreakerStateForTests(0, 0);
  statusCalls = 0;
  chatCalls = 0;
});

after(() => {
  globalThis.fetch = originalFetch;
  Socket.prototype.connect = originalConnect;
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  assert.equal(socketAttempts, 0);
});

async function executeError(status: number, payload: unknown) {
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = input instanceof Request ? input.url : String(input);
    if (url === MODELS_URL) {
      return Response.json({ models: [{ id: "gpt-5.4-mini", accessTier: ["free"] }] });
    }
    if (url === STATUS_URL) {
      statusCalls++;
      return new Response("", { headers: { "x-vqd-hash-1": challenge } });
    }
    if (url === CHAT_URL) {
      chatCalls++;
      return typeof payload === "string"
        ? new Response(payload, { status })
        : Response.json(payload, { status });
    }
    assert.equal(new URL(url).origin, "https://duck.ai");
    return new Response("<html></html>");
  };
  const result = await new DuckDuckGoWebExecutor().execute({
    model: "gpt-5.4-mini",
    body: { model: "gpt-5.4-mini", messages: [{ role: "user", content: "fixture" }] },
    stream: false,
    credentials: {},
  });
  const response = result instanceof Response ? result : result.response;
  assert.equal(response.status, status);
  assert.match(response.headers.get("content-type") ?? "", /application\/json/);
  const body = await response.json();
  assert.deepEqual(Object.keys(body), ["error"]);
  assert.deepEqual(Object.keys(body.error), ["message"]);
  assert.equal(typeof body.error.message, "string");
  return body.error.message as string;
}

const secret = "sk-fixture15159privatevalue123456";
const privatePath = "/srv/private-ddg15159/config.json";
const privateFrame = "at ddgPrivate15159 (/srv/private-ddg15159/worker.js:17:9)";
const unsafeText = `${secret} ${privatePath}\n    ${privateFrame}`;

function assertSanitized(message: string) {
  assert.ok(!message.includes(secret), "provider credential must not reach the executor response");
  assert.ok(!message.includes(privatePath), "private path must not reach the executor response");
  assert.ok(!message.includes(privateFrame), "stack frame must not reach the executor response");
  assert.ok(message.length > 0);
}

test("sanitizes ERR_BN_LIMIT overrideCode while preserving 418 and no retry", async () => {
  const message = await executeError(418, { type: "ERR_BN_LIMIT", overrideCode: unsafeText });
  assertSanitized(message);
  assert.match(message, /ERR_BN_LIMIT/);
  assert.equal(statusCalls, 1);
  assert.equal(chatCalls, 1);
});

test("sanitizes an arbitrary upstream error type while preserving its status", async () => {
  const message = await executeError(400, { type: `ERR_SYNTHETIC ${unsafeText}` });
  assertSanitized(message);
  assert.match(message, /^DuckDuckGo AI Chat error: ERR_SYNTHETIC/);
  assert.equal(chatCalls, 1);
});

test("keeps a benign anti-abuse error code and remediation hint", async () => {
  const message = await executeError(418, { type: "ERR_BN_LIMIT", overrideCode: "f46c" });
  assert.equal(
    message,
    "DuckDuckGo AI Chat anti-abuse challenge failed: ERR_BN_LIMIT (f46c). " +
      "Retry later or from a less rate-limited IP; DuckDuckGo is rejecting this anonymous session."
  );
  assert.equal(statusCalls, 1);
  assert.equal(chatCalls, 1);
});

test("keeps a benign arbitrary error type", async () => {
  const message = await executeError(400, { type: "ERR_INVALID_MODEL" });
  assert.equal(message, "DuckDuckGo AI Chat error: ERR_INVALID_MODEL");
});

test("does not reflect an unstructured upstream error body", async () => {
  const message = await executeError(400, `<html>${unsafeText}</html>`);
  assert.equal(message, "DuckDuckGo AI Chat returned HTTP 400");
});
