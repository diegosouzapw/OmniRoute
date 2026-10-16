import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-codex-passthrough-compaction-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const ENV_CONTEXT_LIMIT = "CONTEXT_LENGTH_CODEX";
const originalFetch = globalThis.fetch;
const originalEnvContext = process.env[ENV_CONTEXT_LIMIT];

let upstreamPayload: Record<string, unknown> | null = null;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.before(async () => {
  await resetStorage();
  process.env[ENV_CONTEXT_LIMIT] = "4000";

  await updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
  });

  globalThis.fetch = async (url: RequestInfo | URL, init: RequestInit = {}) => {
    if (String(url instanceof Request ? url.url : url).includes("/__omniroute_event")) {
      return new Response(null, { status: 204 });
    }
    if (init.body) {
      try {
        upstreamPayload = JSON.parse(String(init.body));
      } catch {
        upstreamPayload = null;
      }
    }
    return new Response(
      JSON.stringify({
        id: "resp-test",
        object: "response",
        model: "gpt-5.6-terra",
        status: "completed",
        output: [
          {
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "ok from upstream codex" }],
          },
        ],
        usage: { input_tokens: 1500, output_tokens: 5, total_tokens: 1505 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  if (originalEnvContext === undefined) {
    delete process.env[ENV_CONTEXT_LIMIT];
  } else {
    process.env[ENV_CONTEXT_LIMIT] = originalEnvContext;
  }
  await new Promise((r) => setTimeout(r, 200));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("native Codex passthrough compacts multi-turn Responses payloads when context threshold exceeded", async () => {
  upstreamPayload = null;

  // Build 10 turns of Responses API input[] (~5,000 estimated tokens, > 4,000 context limit)
  const input = [];
  for (let i = 0; i < 10; i++) {
    input.push({
      type: "message",
      role: "user",
      content: [
        {
          type: "input_text",
          text: `Turn ${i} user request: ` + "word ".repeat(250),
        },
      ],
    });
    input.push({
      type: "message",
      role: "assistant",
      content: [
        {
          type: "output_text",
          text: `Turn ${i} assistant reply: ` + "answer ".repeat(250),
        },
      ],
    });
  }

  const responsesBody = {
    model: "gpt-5.6-terra",
    input,
    stream: false,
  };

  const result = await handleChatCore({
    body: responsesBody,
    modelInfo: {
      provider: "codex",
      model: "gpt-5.6-terra",
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://api.openai.com",
      },
    },
    clientRawRequest: {
      endpoint: "/v1/responses",
      body: responsesBody,
      headers: new Headers({
        accept: "application/json",
        "content-type": "application/json",
      }),
    },
    userAgent: "codex_cli/1.0.0",
    isCombo: false,
    log: {
      debug() {},
      info() {},
      warn() {},
      error() {},
    },
  });

  assert.equal(
    result.success,
    true,
    `expected request to succeed, got error: ${(result as { error?: string }).error}`
  );
  assert.ok(upstreamPayload, "expected upstream request to be dispatched");
  assert.ok(
    Array.isArray(upstreamPayload.input),
    "expected native Responses input[] array upstream"
  );
  assert.ok(
    (upstreamPayload.input as unknown[]).length < input.length,
    `expected input turns to be compacted/pruned: original ${input.length}, upstream ${(upstreamPayload.input as unknown[]).length}`
  );
});
