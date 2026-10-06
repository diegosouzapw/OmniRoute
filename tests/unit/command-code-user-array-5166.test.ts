/**
 * #5166 (user-content-array 400 on Command Code / deepseek-v4-pro) context.
 *
 * The original regression was that a user message whose `content` was an array of
 * content parts reached the CLI-only /alpha/generate endpoint, which required
 * user content to be a plain string. Since #10265 the executor posts to the
 * documented /provider/v1/chat/completions endpoint, which natively speaks the
 * OpenAI chat.completions format — array content (text + image_url parts) is
 * valid there and passes through unchanged. These tests pin that OpenAI-shaped
 * passthrough.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cmd-code-user-array-5166-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

function okResponse() {
  return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

// ── helpers ────────────────────────────────────────────────────────────

type FetchCall = { url: string; init: Record<string, unknown>; body: Record<string, unknown> };

function captureFetch(response: Response) {
  const calls: FetchCall[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    calls.push({
      url: String(url),
      init: init as Record<string, unknown>,
      body: JSON.parse(String(init.body)),
    });
    return response;
  };
  return calls;
}

test("#5166 user message with multi-part array content passes through as an OpenAI array", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Hello" },
            { type: "text", text: "World" },
          ],
        },
      ],
    },
  });

  const userMsg = (calls[0].body.messages as Record<string, unknown>[])[0];
  // OpenAI array content is valid on /provider/v1 — forwarded as-is.
  assert.ok(Array.isArray(userMsg.content), "array content forwarded (no CLI flattening)");
  const parts = userMsg.content as Record<string, unknown>[];
  assert.equal(parts.length, 2);
  assert.equal(parts[0].text, "Hello");
  assert.equal(parts[1].text, "World");
});

test("#5166 user message with single text-part array passes through", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [{ role: "user", content: [{ type: "text", text: "Hi there" }] }],
    },
  });
  const userMsg = (calls[0].body.messages as Record<string, unknown>[])[0];
  const parts = userMsg.content as Record<string, unknown>[];
  assert.equal(parts.length, 1);
  assert.equal(parts[0].text, "Hi there");
});

test("#5166 user message with plain string content passes through unchanged", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Plain string message" }] },
  });
  const userMsg = (calls[0].body.messages as Record<string, unknown>[])[0];
  assert.equal(userMsg.content, "Plain string message");
});

test("#5166 user message with mixed parts (text + image_url) keeps all parts", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this:" },
            { type: "image_url", image_url: { url: "https://example.com/img.png" } },
          ],
        },
      ],
    },
  });
  const userMsg = (calls[0].body.messages as Record<string, unknown>[])[0];
  const parts = userMsg.content as Record<string, unknown>[];
  assert.equal(parts.length, 2, "text + image both preserved");
  assert.equal(parts[0].text, "Describe this:");
  assert.equal(parts[1].type, "image_url");
});
