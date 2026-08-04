/**
 * Vision / multimodal support tests for the Command Code executor.
 *
 * Verifies that vision-capable models (MiniMax M3, MiMo V2.5, Kimi K2, Qwen 3.x, GPT-5, Claude 3/4, Fable 5, Gemini 3.x, Stepfun, Fugu, etc.)
 * receive image parts in Command Code CLI format, while text-only
 * models strip images as before (no regression).
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
  return (
    (calls[0].body.params as Record<string, unknown[]>).messages as Record<string, unknown>[]
  )[0].content;
}

// ── vision models: image parts preserved in CC CLI format ─────────────

test("vision model minimax-m3 preserves image_url part as CC CLI {type:image}", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "MiniMaxAI/MiniMax-M3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What's in this?" },
            {
              type: "image_url",
              image_url: { url: "data:image/png;base64,iVBORw0KGgo=" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.ok(Array.isArray(content), "vision model user content must be an array");
  const parts = content as Record<string, unknown>[];
  assert.equal(parts.length, 2);

  // Text part preserved
  assert.equal(parts[0].type, "text");
  assert.equal(parts[0].text, "What's in this?");

  // Image part converted to CC CLI format
  assert.equal(parts[1].type, "image");
  assert.equal(parts[1].image, "data:image/png;base64,iVBORw0KGgo=");
});

test("vision model minimax-m3 preserves image_url with HTTP URL", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "minimax-m3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/photo.jpg" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.ok(Array.isArray(content));
  const parts = content as Record<string, unknown>[];
  assert.equal(parts.length, 2);
  assert.equal(parts[1].type, "image");
  assert.equal(parts[1].image, "https://example.com/photo.jpg");
});

test("vision model mimo-v2.5 preserves image parts", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "mimo-v2.5",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/img.png" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.ok(Array.isArray(content));
  const parts = content as Record<string, unknown>[];
  assert.equal(parts.length, 2);
  assert.equal(parts[1].type, "image");
});

test("vision model mimo-v2.5-pro is text-only (no image parts)", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "mimo-v2.5-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Hi" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/img.png" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  // mimo-v2.5-pro is text-only — content must be flattened to a plain string
  assert.equal(typeof content, "string");
  assert.equal(content, "Hi");
});

test("vision model mimo-v2-omni preserves image parts", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "mimo-v2-omni",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Check" },
            {
              type: "image_url",
              image_url: { url: "data:image/jpeg;base64,/9j/4AAQ=" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.ok(Array.isArray(content));
  const parts = content as Record<string, unknown>[];
  assert.equal(parts.length, 2);
  assert.equal(parts[1].type, "image");
  assert.equal(parts[1].image, "data:image/jpeg;base64,/9j/4AAQ=");
});

// ── non-vision models: images still stripped (no regression) ──────────

test("text-only model deepseek-v4-pro strips image_url parts", async () => {
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
            {
              type: "image_url",
              image_url: { url: "https://example.com/img.png" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  // Non-vision model: content is a plain string, images stripped
  assert.equal(typeof content, "string");
  assert.equal(content, "Hello");
});

test("text-only model deepseek-v4-flash strips image_url parts (no regression)", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "deepseek/deepseek-v4-flash",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Text only" },
            {
              type: "image_url",
              image_url: { url: "data:image/png;base64,AAA=" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.equal(typeof content, "string");
  assert.equal(content, "Text only");
});

// ── edge cases ────────────────────────────────────────────────────────

test("vision model with only image content emits empty text fallback", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "minimax-m3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: "data:image/png;base64,iVBOR=" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.ok(Array.isArray(content));
  const parts = content as Record<string, unknown>[];
  // Single image part preserved — no empty text injected because
  // the image itself keeps content non-empty.
  assert.equal(parts.length, 1);
  assert.equal(parts[0].type, "image");
  assert.equal(parts[0].image, "data:image/png;base64,iVBOR=");
});

test("vision model passes plain string content through unchanged", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "minimax-m3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [{ role: "user", content: "Plain string message" }],
    },
  });

  const content = userContent(calls);
  assert.equal(typeof content, "string");
  assert.equal(content, "Plain string message");
});

test("vision model honors body.model rewrite for vision detection", async () => {
  // #5166 scenario: body.model overwrites the execute model arg.
  // Vision detection must use the rewritten model id.
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  // execute() gets a non-vision combo model, body.model rewrites to a vision model
  await getExecutor("command-code").execute({
    model: "gpt-5.4-mini",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      model: "MiniMaxAI/MiniMax-M3",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/img.png" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  // body.model = MiniMax-M3 (vision) → images preserved
  assert.ok(Array.isArray(content));
  const parts = content as Record<string, unknown>[];
  assert.equal(parts.length, 2);
  assert.equal(parts[1].type, "image");
});

test("vision model with multiple image parts preserves all of them", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "minimax-m3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Compare" },
            {
              type: "image_url",
              image_url: { url: "https://example.com/a.jpg" },
            },
            {
              type: "image_url",
              image_url: { url: "https://example.com/b.jpg" },
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.ok(Array.isArray(content));
  const parts = content as Record<string, unknown>[];
  assert.equal(parts.length, 3);
  assert.equal(parts[0].type, "text");
  assert.equal(parts[1].type, "image");
  assert.equal(parts[1].image, "https://example.com/a.jpg");
  assert.equal(parts[2].type, "image");
  assert.equal(parts[2].image, "https://example.com/b.jpg");
});

test("vision model with image_url as plain string (no object wrapper) still works", async () => {
  const calls = captureFetch(
    commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
  );

  await getExecutor("command-code").execute({
    model: "minimax-m3",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Look" },
            {
              type: "image_url",
              image_url: "https://example.com/img.png",
            },
          ],
        },
      ],
    },
  });

  const content = userContent(calls);
  assert.ok(Array.isArray(content));
  const parts = content as Record<string, unknown>[];
  assert.equal(parts.length, 2);
  assert.equal(parts[1].type, "image");
  assert.equal(parts[1].image, "https://example.com/img.png");
});

// ── CC vision models (Command Code docs registry) ──────────────────

const VISION_CASES = [
  ["Kimi K2.6", "moonshotai/Kimi-K2.6"],
  ["Kimi K2.7 Code", "moonshotai/Kimi-K2.7-Code"],
  ["Kimi K2.5", "moonshotai/Kimi-K2.5"],
  ["Qwen 3.6 Plus", "Qwen/Qwen3.6-Plus"],
  ["Qwen 3.7 Plus", "Qwen/Qwen3.7-Plus"],
  ["Step 3.7 Flash", "stepfun/Step-3.7-Flash"],
  ["GPT-5.5", "gpt-5.5"],
  ["GPT-5.4", "gpt-5.4"],
  ["GPT-5.3 Codex", "gpt-5.3-codex"],
  ["GPT-5.4 Mini", "gpt-5.4-mini"],
  ["Claude Fable 5", "claude-fable-5"],
  ["Sakana Fugu Ultra", "sakana/fugu-ultra"],
  ["Claude Opus 4.7 (isVisionModelId)", "claude-opus-4-7"],
  ["Claude Sonnet 4.6 (isVisionModelId)", "claude-sonnet-4-6"],
  ["Gemini 3.5 Flash (isVisionModelId)", "google/gemini-3.5-flash"],
];

for (const [name, model] of VISION_CASES) {
  test(`vision model ${name} preserves image parts`, async () => {
    const calls = captureFetch(
      commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }])
    );
    await getExecutor("command-code").execute({
      model,
      stream: false,
      credentials: { apiKey: "cc_test_key" },
      body: {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Check" },
              {
                type: "image_url",
                image_url: { url: "https://example.com/img.png" },
              },
            ],
          },
        ],
      },
    });
    const content = userContent(calls);
    assert.ok(Array.isArray(content), `${name} user content must be an array`);
    const parts = content;
    assert.equal(parts.length, 2);
    assert.equal(parts[1].type, "image");
  });
}
