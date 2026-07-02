/**
 * Regression test for #5166 (user-content-array 400 on Command Code / deepseek-v4-pro).
 *
 * When a client sends a user message whose `content` is an array of content parts
 * (e.g. [{type:"text",text:"Hello"},{type:"text",text:"World"}]), the raw array
 * must NOT reach the Command Code upstream — it requires user content to be a plain
 * string. The executor must normalise the array to a string before posting.
 *
 * NOTE: this file covers ONLY the user-content-array/400 symptom of #5166.
 * The 0-output-token symptom on mimo-v2.5-pro (reasoning-only models) is tracked
 * separately and is NOT addressed here.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-cmd-code-user-array-5166-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

function commandCodeStream(lines: unknown[]) {
  const text = lines.map((l) => JSON.stringify(l)).join("\n") + "\n";
  return new Response(text, { status: 200, headers: { "Content-Type": "application/x-ndjson" } });
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

// ── helpers ────────────────────────────────────────────────────────────────────

type FetchCall = { url: string; init: Record<string, unknown>; body: Record<string, unknown> };

function captureFetch(response: Response) {
  const calls: FetchCall[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    calls.push({ url: String(url), init: init as Record<string, unknown>, body: JSON.parse(String(init.body)) });
    return response;
  };
  return calls;
}

// ── failing tests (before fix, user content is the raw array) ──────────────

test(
  "#5166 user message with multi-part array content is flattened to a string (#5166)",
  async () => {
    const calls = captureFetch(
      commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
    );

    await getExecutor("command-code").execute({
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

    const posted = calls[0].body;
    const userMsg = (posted.params as Record<string, unknown[]>).messages[0] as Record<
      string,
      unknown
    >;

    // Must be a string — never an array — otherwise Command Code's upstream returns 400.
    assert.equal(
      typeof userMsg.content,
      "string",
      `user message content must be a string, got ${typeof userMsg.content}`
    );
    // Joined text parts with "\n"
    assert.equal(userMsg.content, "Hello\nWorld");
  }
);

test(
  "#5166 user message with single text-part array is flattened to a plain string",
  async () => {
    const calls = captureFetch(
      commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
    );

    await getExecutor("command-code").execute({
      model: "deepseek/deepseek-v4-pro",
      stream: false,
      credentials: { apiKey: "cc_test_key" },
      body: {
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: "Hi there" }],
          },
        ],
      },
    });

    const posted = calls[0].body;
    const userMsg = (posted.params as Record<string, unknown[]>).messages[0] as Record<
      string,
      unknown
    >;
    assert.equal(typeof userMsg.content, "string");
    assert.equal(userMsg.content, "Hi there");
  }
);

test(
  "#5166 user message with plain string content passes through unchanged (no regression)",
  async () => {
    const calls = captureFetch(
      commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
    );

    await getExecutor("command-code").execute({
      model: "deepseek/deepseek-v4-pro",
      stream: false,
      credentials: { apiKey: "cc_test_key" },
      body: {
        messages: [
          {
            role: "user",
            content: "Plain string message",
          },
        ],
      },
    });

    const posted = calls[0].body;
    const userMsg = (posted.params as Record<string, unknown[]>).messages[0] as Record<
      string,
      unknown
    >;
    assert.equal(typeof userMsg.content, "string");
    assert.equal(userMsg.content, "Plain string message");
  }
);

test(
  "#5166 user message with mixed parts (text + image_url) keeps only text parts",
  async () => {
    const calls = captureFetch(
      commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
    );

    await getExecutor("command-code").execute({
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

    const posted = calls[0].body;
    const userMsg = (posted.params as Record<string, unknown[]>).messages[0] as Record<
      string,
      unknown
    >;
    assert.equal(typeof userMsg.content, "string");
    // Only text parts extracted; image_url part is dropped (not a "text" type)
    assert.equal(userMsg.content, "Describe this:");
  }
);
