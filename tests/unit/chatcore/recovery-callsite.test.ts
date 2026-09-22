import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-recovery-callsite-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const accountFallback = await import("../../../open-sse/services/accountFallback.ts");
const { runAsProbe } = await import("../../../src/shared/utils/probeOrigin.ts");
const { handleChatCore } = await import("../../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const PRIMARY_MODEL = "claude-sonnet-5";
const CONN = "conn-t5";

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

function requestedModel(init?: RequestInit): string {
  try {
    const body = JSON.parse(String(init?.body || "{}"));
    return typeof body.model === "string" ? body.model : "";
  } catch {
    return "";
  }
}

function isPrimaryModel(model: string): boolean {
  return model === PRIMARY_MODEL || model.endsWith(`/${PRIMARY_MODEL}`);
}

function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: { message, type: "invalid_request_error" } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function claudeSseOk(model: string): Response {
  return new Response(
    [
      "event: message_start",
      `data: ${JSON.stringify({
        type: "message_start",
        message: {
          id: "msg_ok",
          type: "message",
          role: "assistant",
          model,
          usage: { input_tokens: 1, output_tokens: 0 },
        },
      })}`,
      "",
      "event: content_block_start",
      `data: ${JSON.stringify({
        type: "content_block_start",
        index: 0,
        content_block: { type: "text", text: "" },
      })}`,
      "",
      "event: content_block_delta",
      `data: ${JSON.stringify({
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "ok" },
      })}`,
      "",
      "event: content_block_stop",
      `data: ${JSON.stringify({
        type: "content_block_stop",
        index: 0,
      })}`,
      "",
      "event: message_delta",
      `data: ${JSON.stringify({
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 1 },
      })}`,
      "",
      "event: message_stop",
      `data: ${JSON.stringify({ type: "message_stop" })}`,
      "",
    ].join("\n"),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

function buildRequest(stream: boolean) {
  const body = {
    model: PRIMARY_MODEL,
    messages: [{ role: "user", content: "hello" }],
    max_tokens: 16,
    stream,
  };
  return {
    body: structuredClone(body),
    modelInfo: { provider: "claude", model: PRIMARY_MODEL, extendedContext: false },
    credentials: {
      apiKey: "test-key",
      connectionId: CONN,
      providerSpecificData: {},
    },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: stream ? "text/event-stream" : "application/json",
        "content-type": "application/json",
      }),
    },
    userAgent: "unit-test",
  };
}

const FAMILY = [
  PRIMARY_MODEL,
  "claude-sonnet-4-6",
  "claude-sonnet-4-5-20250929",
  "claude-sonnet-4-20250514",
];

function anyFamilyLocked(): boolean {
  return FAMILY.some((m) => accountFallback.isModelLocked("claude", CONN, m));
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  accountFallback.clearAllModelLockouts();
  core.resetDbInstance();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("stream 404 on primary retries the family sibling and returns 200", async () => {
  let fetchCount = 0;
  const sentModels: string[] = [];
  globalThis.fetch = async (_url, init) => {
    fetchCount += 1;
    const model = requestedModel(init);
    sentModels.push(model);
    if (isPrimaryModel(model)) {
      return jsonError(404, "model is not available");
    }
    return claudeSseOk(model || "claude-sonnet-4-6");
  };

  const result = await handleChatCore(buildRequest(true));
  assert.equal(fetchCount, 2);
  assert.equal(result.success, true);
  assert.equal(result.status ?? 200, 200);
  assert.equal(isPrimaryModel(sentModels[0] || ""), true);
  assert.equal(isPrimaryModel(sentModels[1] || ""), false);
});

test("stream 404 on primary and sibling locks the exhausted model once", async () => {
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return jsonError(404, "model is not available");
  };

  const result = await handleChatCore(buildRequest(true));
  assert.equal(result.success, false);
  assert.equal(result.status, 404);
  assert.equal(fetchCount >= 2, true, "family fallback must send at least once more");
  assert.equal(anyFamilyLocked(), true);
});

test("probe isolation skips lock when every family member 404s", async () => {
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    return jsonError(404, "model is not available");
  };

  const result = await runAsProbe(() => handleChatCore(buildRequest(true)));
  assert.equal(result.success, false);
  assert.equal(result.status, 404);
  assert.equal(fetchCount >= 1, true);
  assert.equal(anyFamilyLocked(), false);
});

test("successful family fallback does not lock the primary model", async () => {
  globalThis.fetch = async (_url, init) => {
    const model = requestedModel(init);
    if (isPrimaryModel(model)) {
      return jsonError(404, "model is not available");
    }
    return claudeSseOk(model || "claude-sonnet-4-6");
  };

  const result = await handleChatCore(buildRequest(true));
  assert.equal(result.success, true);
  assert.equal(anyFamilyLocked(), false);
});

test("abort on the first send does not rotate to a second account", async () => {
  let fetchCount = 0;
  globalThis.fetch = async () => {
    fetchCount += 1;
    const err = new Error("The operation was aborted.");
    err.name = "AbortError";
    throw err;
  };

  const result = await handleChatCore(buildRequest(true));
  assert.equal(fetchCount, 1);
  assert.equal(result.status, 499);
  assert.equal(anyFamilyLocked(), false);
});
