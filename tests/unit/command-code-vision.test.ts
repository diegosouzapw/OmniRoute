/**
 * Vision / multimodal support tests for the Command Code executor.
 *
 * Since #10265 the executor posts to the documented /provider/v1/chat/completions
 * endpoint, which speaks the standard OpenAI chat.completions format. User image
 * content (OpenAI `image_url` parts and Anthropic Messages-style source blocks)
 * passes through unchanged — the endpoint natively understands both shapes, so
 * there is no CLI-specific conversion (and no CLI-wire image stripping) left to
 * verify. These tests pin that passthrough plus the #10809 wire-model
 * normalization, which still applies to /provider/v1.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cmd-code-vision-"));
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

function userContent(calls: FetchCall[]): unknown {
  return (calls[0].body.messages as Record<string, unknown>[])[0].content;
}

function wireModel(calls: FetchCall[]): string {
  return calls[0].body.model as string;
}

// ── wire model normalization (#10809) ────────────────────────────────

test("#10809: command-code/mimo-v2.5 wire model is normalized to xiaomi/mimo-v2.5", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "command-code/mimo-v2.5",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { model: "command-code/mimo-v2.5", messages: [{ role: "user", content: "hi" }] },
  });
  assert.equal(wireModel(calls), "xiaomi/mimo-v2.5");
});

test("#10809: cmd/mimo-v2.5 (alias prefix) is also normalized", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "cmd/mimo-v2.5",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { model: "cmd/mimo-v2.5", messages: [{ role: "user", content: "hi" }] },
  });
  assert.equal(wireModel(calls), "xiaomi/mimo-v2.5");
});

test("#10809: already vendor-prefixed wire ids pass through unchanged", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "command-code/deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      model: "command-code/deepseek/deepseek-v4-pro",
      messages: [{ role: "user", content: "hi" }],
    },
  });
  assert.equal(wireModel(calls), "deepseek/deepseek-v4-pro");
});

// ── image content passthrough (OpenAI /provider/v1 surface) ──────────

test("image_url parts pass through unchanged (text + image preserved)", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "MiniMaxAI/MiniMax-M3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What's in this?" },
            { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgo=" } },
          ],
        },
      ],
    },
  });

  const content = userContent(calls) as Record<string, unknown>[];
  assert.equal(content.length, 2);
  assert.equal(content[0].type, "text");
  assert.equal(content[1].type, "image_url", "image_url part preserved as-is");
  assert.equal((content[1].image_url as { url: string }).url, "data:image/png;base64,iVBORw0KGgo=");
});

test("Anthropic Messages-style source image blocks pass through unchanged", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "xiaomi/mimo-v2.5",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Gambar apa ini?" },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/png",
                data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
              },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls) as Record<string, unknown>[];
  assert.equal(content.length, 2, "text + image parts preserved");
  assert.equal(content[1].type, "image");
  assert.equal((content[1].source as { type: string }).type, "base64");
  assert.equal(
    (content[1].source as { data: string }).data,
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
  );
});

test("Anthropic source.url image block passes through unchanged", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "xiaomi/mimo-v2.5",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Look" },
            { type: "image", source: { type: "url", url: "https://example.com/img.png" } },
          ],
        },
      ],
    },
  });

  const content = userContent(calls) as Record<string, unknown>[];
  assert.equal(content.length, 2);
  assert.equal(content[1].type, "image");
  assert.deepEqual(content[1].source, { type: "url", url: "https://example.com/img.png" });
});

test("multiple image parts are all preserved", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "minimax-m3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Compare" },
            { type: "image_url", image_url: { url: "https://example.com/a.jpg" } },
            { type: "image_url", image_url: { url: "https://example.com/b.jpg" } },
          ],
        },
      ],
    },
  });

  const content = userContent(calls) as Record<string, unknown>[];
  assert.equal(content.length, 3);
  assert.equal(content[1].type, "image_url");
  assert.equal(content[2].type, "image_url");
});

test("plain string content passes through unchanged", async () => {
  const calls = captureFetch(okResponse());
  (await getExecutor("command-code")).execute({
    model: "minimax-m3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Plain string message" }] },
  });

  const content = userContent(calls);
  assert.equal(typeof content, "string");
  assert.equal(content, "Plain string message");
});

test("text-only model still forwards image parts (passthrough, no CLI stripping)", async () => {
  // The /provider/v1 OpenAI surface accepts image content for any model id; the
  // executor forwards content untouched, so there is no text-only stripping.
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
            { type: "image_url", image_url: { url: "https://example.com/img.png" } },
          ],
        },
      ],
    },
  });

  const content = userContent(calls) as Record<string, unknown>[];
  assert.equal(content.length, 2, "content array forwarded unchanged");
  assert.equal(content[1].type, "image_url");
});
