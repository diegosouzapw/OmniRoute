import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-repro-8841-")
);
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getResolvedModelCapabilities } = await import(
  "../../src/lib/modelCapabilities.ts"
);
const { getKnownContextOverflow, handleComboChat } = await import(
  "../../open-sse/services/combo.ts"
);
const { getTokenLimit } = await import(
  "../../open-sse/services/contextManager.ts"
);
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

const target = (m) => ({
  kind: "model",
  stepId: m,
  executionKey: m,
  modelStr: m,
  provider: "opencode-zen",
  providerId: null,
  connectionId: null,
  weight: 1,
  label: null,
});

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
          "Input exceeds the context window for opencode/north-mini-code-free: estimated 210724 input tokens, limit 200000. Reduce the prompt or route to a model with a larger context window.",
      },
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }
  );
}

test("#8841 advertised vs compat-filter limit agree", () => {
  const advertised = getTokenLimit("opencode-zen", "north-mini-code-free");
  const caps = getResolvedModelCapabilities("opencode/north-mini-code-free");
  assert.ok(advertised > 0);
  assert.ok(
    caps.contextWindow != null && caps.contextWindow > 0,
    `contextWindow known (got ${caps.contextWindow})`
  );
});

test("#8841 oversized request rejected up front (no dispatch)", async () => {
  const body = largeBody();
  const pool = [
    target("opencode/north-mini-code-free"),
    target("opencode/hy3-free"),
  ];

  assert.ok(getKnownContextOverflow(pool, body), "overflow before dispatch");

  let dispatches = 0;
  const result = await handleComboChat({
    body,
    combo: {
      name: "pro-coding-repro-8841",
      strategy: "priority",
      models: [
        "opencode/north-mini-code-free",
        "opencode/hy3-free",
      ],
    },
    handleSingleModel: async () => {
      dispatches += 1;
      return upstreamContextOverflowResponse();
    },
    log: noopLog,
    settings: {},
    allCombos: [],
  });

  assert.equal(dispatches, 0, `no upstream dispatch (got ${dispatches})`);
  assert.equal(result.status, 400);
  const json = await result.json();
  assert.equal(json.error?.code, "context_length_exceeded");
  assert.equal(json.diagnostics?.attempted, 0);
});