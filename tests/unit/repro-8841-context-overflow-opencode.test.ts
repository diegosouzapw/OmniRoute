import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repro-8841-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getTokenLimit } = await import("../../open-sse/services/contextManager.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

function largeBody() {
  return {
    messages: [{ role: "user", content: "x".repeat(840_000) }],
    max_tokens: 8192,
  };
}

function upstreamContextOverflowResponse() {
  return new Response(
    JSON.stringify({
      error: {
        code: "context_length_exceeded",
        message:
          "Input exceeds the context window for opencode/mimo-v2.5-free: estimated 210724 input tokens, limit 200000. Reduce the prompt or route to a model with a larger context window.",
      },
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}

test("#8841 advertised vs compat-filter limit agree", () => {
  const advertised = getTokenLimit("opencode-zen", "mimo-v2.5-free");
  const caps = getResolvedModelCapabilities("opencode/mimo-v2.5-free");
  assert.ok(advertised > 0);
  assert.ok(
    caps.contextWindow != null && caps.contextWindow > 0,
    `contextWindow known (got ${caps.contextWindow})`
  );
});

test("no-auth oc executor refuses callers without the OpenCode client identity", async () => {
  const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
  let dispatched = 0;
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  delete process.env.HTTP_PROXY;
  delete process.env.HTTPS_PROXY;
  delete process.env.http_proxy;
  delete process.env.https_proxy;
  globalThis.fetch = (async () => {
    dispatched += 1;
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  try {
    const exec = new OpencodeExecutor("opencode");
    const result = (await exec.execute({
      model: "north-mini-code-free",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      signal: null,
      credentials: { apiKey: "sk-test", accessToken: null, connectionId: "noauth" },
      log: noopLog,
    })) as { response: Response };
    assert.strictEqual(result.response.status, 403);
    assert.strictEqual(dispatched, 0);
  } finally {
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
  }
});

test("#8841 real upstream context overflow remains a fatal 400 after dispatch", async () => {
  const body = largeBody();
  let dispatches = 0;
  const result = await handleComboChat({
    body,
    combo: {
      name: "pro-coding-repro-8841",
      strategy: "priority",
      models: [
        { model: "opencode/north-mini-code-free" },
        { model: "opencode/north-mini-code-free" },
      ],
    },
    handleSingleModel: async () => {
      dispatches += 1;
      return upstreamContextOverflowResponse();
    },
    log: noopLog,
    settings: {},
    allCombos: [],
    requestHeaders: {
      "user-agent": "opencode/1.18.31",
      "User-Agent": "opencode/1.18.31",
      "x-opencode-session": "ses_abc123",
      "x-opencode-session-id": "ses_abc123",
    },
  });

  assert.equal(dispatches, 1, "real upstream overflow must short-circuit fallback");
  assert.equal(result.status, 400);
  const json = await result.json();
  assert.equal(json.error?.code, "context_length_exceeded");
});
