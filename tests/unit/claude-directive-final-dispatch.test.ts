import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-directive-dispatch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

type CapturedBody = {
  messages?: Array<Record<string, unknown>>;
  output_config?: Record<string, unknown>;
  system?: string | Array<Record<string, unknown>>;
};

function captureFetchBodies(): { bodies: CapturedBody[]; restore: () => void } {
  const bodies: CapturedBody[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    bodies.push(JSON.parse(String(init.body ?? "{}")) as CapturedBody);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  function restore(): void {
    globalThis.fetch = original;
  }

  return { bodies, restore };
}

async function executeClaude(body: Record<string, unknown>): Promise<Response> {
  return new DefaultExecutor("claude").execute({
    model: "claude-opus-5",
    body,
    stream: false,
    credentials: { accessToken: "sk-ant-oat-test-token" },
    clientHeaders: { "x-app": "cli" },
  });
}

test("final Claude dispatch hoists a leading non-empty system message", async () => {
  const { bodies, restore } = captureFetchBodies();

  try {
    await executeClaude({
      model: "claude-opus-5",
      max_tokens: 64,
      system: [{ type: "text", text: "Existing top-level prompt." }],
      tools: [
        {
          name: "lookup",
          description: "Look up a value",
          input_schema: { type: "object", properties: {} },
        },
      ],
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "Escaped initial prompt.",
              cache_control: { type: "ephemeral" },
            },
          ],
        },
        { role: "user", content: [{ type: "text", text: "hello" }] },
      ],
    });
  } finally {
    restore();
  }

  const captured = bodies.at(-1);
  assert.ok(captured, "fetch did not capture a request body");
  assert.equal(captured.messages?.[0]?.role, "user");
  assert.equal(
    captured.messages?.some((message) =>
      ["system", "developer"].includes(String(message.role).toLowerCase())
    ),
    false
  );
  assert.ok(Array.isArray(captured.system), "system must be serialized as content blocks");
  assert.deepEqual(
    captured.system.slice(-2),
    [
      { type: "text", text: "Existing top-level prompt." },
      {
        type: "text",
        text: "Escaped initial prompt.",
        cache_control: { type: "ephemeral", ttl: "1h" },
      },
    ],
    "existing and hoisted system prompts must retain their order and cache boundary"
  );
});

test("final Claude dispatch relocates leading directive-only messages", async () => {
  const { bodies, restore } = captureFetchBodies();
  const firstDirective = {
    role: "system",
    content: [],
    output_config: { effort: "medium" },
  };
  const laterDirective = {
    role: "system",
    content: [],
    output_config: { effort: "low" },
  };

  try {
    await executeClaude({
      model: "claude-opus-5",
      max_tokens: 64,
      messages: [
        firstDirective,
        { role: "developer", content: [] },
        { role: "user", content: "hello" },
        { role: "assistant", content: "hi" },
        laterDirective,
        { role: "user", content: "continue" },
      ],
    });
  } finally {
    restore();
  }

  const messages = bodies[0]?.messages;
  assert.ok(messages, "fetch did not capture a messages array");
  assert.equal(messages[0]?.role, "user");
  assert.equal(messages[0]?.content, "hello");
  assert.deepEqual(messages[1], firstDirective);
  assert.equal(
    messages.some((message) => message.role === "developer"),
    false
  );
  assert.deepEqual(messages[3], laterDirective, "valid later directive must retain its position");
});

test("final Claude dispatch folds a sole directive without overriding top-level output_config", async () => {
  const { bodies, restore } = captureFetchBodies();

  try {
    await executeClaude({
      model: "claude-opus-5",
      max_tokens: 64,
      output_config: { effort: "high" },
      messages: [
        {
          role: "system",
          content: [],
          output_config: { effort: "medium" },
        },
      ],
    });
  } finally {
    restore();
  }

  assert.deepEqual(bodies[0]?.messages, []);
  assert.deepEqual(bodies[0]?.output_config, { effort: "high" });
});
