import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  OPENAI_RESPONSES_ERROR_FRAME,
  withEarlyStreamKeepalive,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";

const originalDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-terminal-code-"));
process.env.DATA_DIR = testDataDir;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const replayMessage = "The encrypted content could not be verified.";
let comboIndex = 0;

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  resetAllSemaphores();
});

test.after(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  resetAllSemaphores();
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

function failure(code?: string, message = replayMessage, status = 400) {
  return new Response(JSON.stringify({ error: { message, code } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function runCombo(strategy: string, responses: Response[]) {
  let attempts = 0;
  const name = `terminal-code-${strategy}-${comboIndex++}`;
  return handleComboChat({
    body: { model: "test-combo", messages: [{ role: "user", content: "hi" }], stream: true },
    combo: {
      name,
      strategy,
      models: responses.map((_, index) => `${index === 0 ? "codex" : "openai"}/${name}-${index}`),
      config: { maxRetries: 0 },
    },
    handleSingleModel: async () => {
      assert.ok(attempts < responses.length, "must not retry a request-scoped failure");
      return responses[attempts++];
    },
    isModelAvailable: async () => true,
    log,
    settings: {},
    allCombos: [],
  });
}

for (const strategy of ["priority", "round-robin"]) {
  test(`${strategy}: terminal reasoning replay code reaches the Responses SSE error frame`, async () => {
    let resolveResponse!: (response: Response) => void;
    const pending = new Promise<Response>((resolve) => {
      resolveResponse = resolve;
    });
    const stream = await withEarlyStreamKeepalive(pending, {
      thresholdMs: 1,
      intervalMs: 10,
      errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
    });
    resolveResponse(await runCombo(strategy, [failure("invalid_encrypted_content")]));
    assert.equal(stream.status, 200);
    const frames = [...(await stream.text()).matchAll(/^data: (.+)$/gm)];
    const frame = JSON.parse(frames.at(-1)![1]);
    assert.equal(frame.type, "error");
    assert.equal(frame.code, "invalid_encrypted_content");
    assert.match(frame.message, /encrypted content could not be verified/);
    if (strategy === "priority") assert.equal(frame.diagnostics.attempted, 1);
  });

  test(`${strategy}: aggregation preserves the final target's code after fallback`, async () => {
    const response = await runCombo(strategy, [
      failure("bad_request", "Other request rejection"),
      failure("invalid_encrypted_content"),
    ]);
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.error.code, "invalid_encrypted_content");
    assert.match(body.error.message, /Other request rejection/);
    assert.match(body.error.message, /encrypted content could not be verified/);
  });

  test(`${strategy}: a final uncoded error does not inherit an earlier target's code`, async () => {
    const response = await runCombo(strategy, [failure("invalid_encrypted_content"), failure()]);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.code, "bad_request");
  });

  test(`${strategy}: unrecognized upstream codes still pass through public sanitization`, async () => {
    const response = await runCombo(strategy, [failure("private_account_identifier")]);
    assert.equal((await response.json()).error.code, "bad_request");
  });

  test(`${strategy}: mixed auth and model failures keep the aggregate gateway verdict`, async () => {
    const response = await runCombo(strategy, [
      failure("invalid_api_key", "Invalid API key", 401),
      failure("invalid_encrypted_content"),
    ]);
    assert.equal(response.status, 502);
    assert.notEqual((await response.json()).error.code, "invalid_encrypted_content");
  });
}

test("priority: a body-specific terminal error keeps its code when fallback stops early", async () => {
  const response = await runCombo("priority", [
    failure("invalid_encrypted_content", "Invalid JSON: encrypted content could not be parsed"),
  ]);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, "invalid_encrypted_content");
});
